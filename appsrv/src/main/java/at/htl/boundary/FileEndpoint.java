package at.htl.boundary;

import at.htl.control.CourseRepository;
import at.htl.control.FileRepository;
import at.htl.control.UsageRepository;
import at.htl.entity.Course;
import at.htl.entity.D_File;
import at.htl.entity.Usage;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.jboss.logging.Logger;

import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.transaction.UserTransaction;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Paths;

@RequestScoped
@Produces(MediaType.APPLICATION_JSON)
@Consumes({"video/mp4", MediaType.APPLICATION_OCTET_STREAM, "video/quicktime", "audio/mpeg"})
@Path("/file")

public class FileEndpoint {
    @Inject
    FileRepository fileRepository;

    @Context
    HttpHeaders requestHeaders;

    @Inject
    UserTransaction transaction;

    @Inject
    UsageRepository usageRepository;

    @Inject
    CourseRepository courseRepository;

    @Inject
    Logger logger;

    @ConfigProperty(name = "QUARKUS_ENV", defaultValue = "dev")
    String quarkusEnv;

    @GET
    @Path("/findall")
    @RolesAllowed("TEACHER")
    public Response findAll() {
        return Response.ok(fileRepository.listAll()).build();
    }

    /**
     * https://mkyong.com/webservices/jax-rs/file-upload-example-in-resteasy/
     */
/*    @POST
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Path("/")
    @RolesAllowed("TEACHER")
    public Response uploadFile(MultipartFormDataInput input, @Context UriInfo uri) throws IOException {
        String fileName;
        D_File file = null;

        Map<String, List<InputPart>> uploadForm = input.getFormDataMap();
        List<InputPart> inputParts = uploadForm.get("file");

        for (InputPart inputPart : inputParts) {
            try {
                MultivaluedMap<String, String> header = inputPart.getHeaders();
                fileName = fileRepository.getFileName(header);

                //convert the uploaded file to input stream
                InputStream inputStream = inputPart.getBody(InputStream.class, null);

                byte[] bytes = IOUtils.toByteArray(inputStream);

                file = fileRepository.writeFile(bytes, fileName);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        if (file != null) {
            JsonObjectBuilder builder = Json.createObjectBuilder()
                    .add("fileId", file.id);
            return Response
                    .ok(builder.build())
                    .build();
        } else {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("the file could not be persisted")
                    .build();
        }
    }*/
    @POST
    @Path("/{imagename}")
    @Transactional
    public Response upload2(InputStream inputStream,
                            @PathParam("imagename") String imagename,
                            @QueryParam("description") String description,
                            @QueryParam("courseId") long courseId) {

        String lastdir = imagename.contains(".mp4") || imagename.contains(".mov") ? "video/" : "audio/";
        Course course = courseRepository.find("id", courseId).stream().findFirst().orElse(null);
        String path = fileRepository.TARGET_UPLOAD_FOLDER + lastdir + course.level.description.toLowerCase() + "/" + course.title + "/";
        String absolutePath;
        if (quarkusEnv.equals("prod")) {
            absolutePath = "/var/www/html/assets/" + path;
        } else {
            absolutePath = Paths.get("").toAbsolutePath() + "/src/main/resources/META-INF/resources/" + path;
        }

        D_File fileEntry = fileRepository.createFile(imagename, path + imagename, description);
        File dir = new File(absolutePath);
        dir.mkdirs();
        File file = new File(absolutePath, imagename);
        System.out.println(file.getAbsolutePath());
        try (var os = new FileOutputStream(file)) {
            inputStream.transferTo(os);
        } catch (IOException e) {
            e.printStackTrace();
        }

        usageRepository.persist(new Usage(course, fileEntry));
        return Response.ok().entity(fileEntry).build();
    }

    @GET
    @Path("/{id}")
    @RolesAllowed({"STUDENT", "TEACHER"})
    public Response findById(@PathParam("id") long id) {
        return Response.ok(fileRepository.findById(id)).build();
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    //@RolesAllowed("TEACHER")
    public Response delete(@PathParam("id") Long id) {
        try {
            boolean exists = usageRepository.usageExistsInFile(id);
            if (exists) {
                usageRepository.deleteUsageByFileId(id);
            }
            fileRepository.deleteById(id);

            return Response
                    .ok()
                    .build();
        } catch (IllegalArgumentException e) {
            System.out.println(e);
            return Response
                    .status(400)
                    .header("Reason", "File with id " + id + " does not exist")
                    .build();
        }
    }
}

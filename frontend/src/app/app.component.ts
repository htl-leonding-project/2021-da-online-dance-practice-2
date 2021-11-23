import {Component, Input} from '@angular/core';
import {ContentService, DFile} from './content.service';
import {HttpClient, HttpEventType} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'frontend';
  videoSource = '';
  audioSource = '';
  audio: any;
  files: DFile[];
  fileName = '';

  constructor(private http: HttpClient, public contentService: ContentService) {
      this.files = [];

      contentService.getPath(32).subscribe(path => {
        console.log(path);
        this.videoSource = path;
      });

      contentService.getFiles().subscribe(files => {
      this.files = files;
    });
  }
  onFileSelected(event: any): void {

    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append('thumbnail', file);
      const upload$ = this.http.post('http://localhost:8080/api/file/upload', formData);
      upload$.subscribe();
    }
  }
}

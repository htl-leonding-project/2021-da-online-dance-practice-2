import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentService {


  constructor(public http: HttpClient) {

  }

  public getPath(id: number): Observable<string> {
    const pathsSubject: Subject<string> = new Subject<string>();

    this.http.get<DFile>('http://localhost:8080/api/file/' + id).subscribe(file => {
      const url = 'http://localhost:8080/api/' + file.path + '/' + file.name;
      pathsSubject.next(url);
    });
    return pathsSubject;
  }
  public getFiles(): Observable<Array<DFile>>{

    return this.http.get<Array<DFile>>('http://localhost:8080/api/file/');
  }
}

export interface DFile {
  id: number;
  name: string;
  path: string;
  contentType: string;
}

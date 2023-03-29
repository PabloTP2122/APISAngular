import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { tap, map } from 'rxjs/operators';
import { environment } from './../../environments/environment';

interface File {
  "originalname": string;
  "filename": string;
  "location": string;
}
let headers = new HttpHeaders({
  'Content-Type': 'multipart/form-data',
  'enctype': 'multipart/form-data'
});
@Injectable({
  providedIn: 'root'
})
export class FilesService {

  /* private apiUrl = environment.API_URL + '/api/v1/files'; */
  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/files';

  constructor(
    private http: HttpClient
  ) { }

  getFile(name: string, url: string, type: string) {
    return this.http.get(url, { responseType: 'blob' })
      .pipe(
        tap(
          content => {
            const blob = new Blob([content], { type });
            saveAs(blob, name);
          }
        ),
        map(() => true)
      );
  }
  uploadFile(file: Blob) {
    const dto = new FormData();
    dto.append('file', file);
    return this.http.post<File>(`${this.apiUrl}/upload`, dto
    /* , {
      headers
    } */);
  }
}

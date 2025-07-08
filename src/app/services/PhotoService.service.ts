import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { iPhoto } from '../models/Photo.model';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  private apiUrl = 'http://localhost:8080/photos';

  constructor(private readonly http: HttpClient) {}

  getPhotos(): Observable<iPhoto[]> {
    return this.http.get<iPhoto[]>(this.apiUrl);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { iCategory, iDataCategory } from '../models/Category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'https://beatrizfatecitu.duckdns.org/categories';

  constructor(private readonly http: HttpClient) {}

  getCategories(): Observable<iCategory[]> {
    return this.http.get<iCategory[]>(this.apiUrl);
  }

  getCategoryById(id: number): Observable<iCategory> {
    return this.http.get<iCategory>(`${this.apiUrl}/${id}`);
  }

  postCategory(category: iDataCategory): Observable<iCategory> {
    return this.http.post<iCategory>(this.apiUrl, category);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateCategory(category: iCategory): Observable<iCategory> {
    return this.http.put<iCategory>(`${this.apiUrl}/${category.id}`, category);
  }
}

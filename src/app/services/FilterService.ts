// src/app/services/category-filter.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FilterService {
  private selectedCategory = new BehaviorSubject<string | null>(null);
  selectedCategory$ = this.selectedCategory.asObservable();

  private favorites = new BehaviorSubject<boolean>(false);
  favorites$ = this.favorites.asObservable();

  private totalContacts = new BehaviorSubject<number>(0);
  totalContacts$ = this.totalContacts.asObservable();

  private searchTermSubject = new BehaviorSubject<string>('');
  searchTerm$ = this.searchTermSubject.asObservable();

  setSearchTerm(term: string) {
    this.searchTermSubject.next(term);
  }

  setCategory(categoryName: string | null) {
    this.selectedCategory.next(categoryName);
  }

  setFavorites(favorite: boolean) {
    this.favorites.next(favorite);
  }

  setTotalContacts(count: number) {
    this.totalContacts.next(count);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { iContact } from '../models/Contact';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private apiUrl = 'https://beatrizfatecitu.duckdns.org/contacts'; // ajuste se necessário

  constructor(private http: HttpClient) {}

  // GET: Buscar todos os contatos
  getContacts(): Observable<iContact[]> {
    return this.http.get<iContact[]>(this.apiUrl);
  }

  // GET: Buscar contato por ID
  getContactById(id: number): Observable<iContact> {
    return this.http.get<iContact>(`${this.apiUrl}/${id}`);
  }

  // POST: Criar novo contato
  createContact(iContact: iContact): Observable<iContact> {
    return this.http.post<iContact>(this.apiUrl, iContact);
  }

  // PUT: Atualizar contato por inteiro
  updateContact(id: number, iContact: iContact): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, iContact);
  }

  // PATCH: Atualização parcial
  patchContact(id: number, fields: Partial<iContact>): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}`, fields);
  }

  // DELETE: Excluir contato
  deleteContact(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // POST: Associar categoria ao contato
  addCategory(contactId: number, categoryId: number): Observable<iContact> {
    return this.http.post<iContact>(
      `${this.apiUrl}/${contactId}/categories/${categoryId}`,
      {}
    );
  }

  // DELETE: Remover categoria do contato
  removeCategory(contactId: number, categoryId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${contactId}/categories/${categoryId}`
    );
  }

  // POST: Associar endereço ao contato
  addAddress(contactId: number, addressId: number): Observable<iContact> {
    return this.http.post<iContact>(
      `${this.apiUrl}/${contactId}/addresses/${addressId}`,
      {}
    );
  }

  // DELETE: Remover endereço do contato
  removeAddress(contactId: number, addressId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${contactId}/addresses/${addressId}`
    );
  }

  // POST: Associar email ao contato
  addEmail(contactId: number, emailId: number): Observable<iContact> {
    return this.http.post<iContact>(
      `${this.apiUrl}/${contactId}/emails/${emailId}`,
      {}
    );
  }

  // DELETE: Remover email do contato
  removeEmail(contactId: number, emailId: number): Observable<iContact> {
    return this.http.delete<iContact>(
      `${this.apiUrl}/${contactId}/emails/${emailId}`
    );
  }

  // ============ SEARCHES ============
  searchByPartialName(name: string): Observable<iContact[]> {
    return this.http.get<iContact[]>(`${this.apiUrl}/search/name/partial`, {
      params: new HttpParams().set('name', name),
    });
  }

  searchByExactName(name: string): Observable<iContact[]> {
    return this.http.get<iContact[]>(`${this.apiUrl}/search/name/exact`, {
      params: new HttpParams().set('name', name),
    });
  }

  searchByPartialLastname(lastname: string): Observable<iContact[]> {
    return this.http.get<iContact[]>(`${this.apiUrl}/search/lastname/partial`, {
      params: new HttpParams().set('lastname', lastname),
    });
  }

  searchByExactLastname(lastname: string): Observable<iContact[]> {
    return this.http.get<iContact[]>(`${this.apiUrl}/search/lastname/exact`, {
      params: new HttpParams().set('lastname', lastname),
    });
  }

  searchByPartialNickname(nickname: string): Observable<iContact[]> {
    return this.http.get<iContact[]>(`${this.apiUrl}/search/nickname/partial`, {
      params: new HttpParams().set('nickname', nickname),
    });
  }

  searchByExactNickname(nickname: string): Observable<iContact[]> {
    return this.http.get<iContact[]>(`${this.apiUrl}/search/nickname/exact`, {
      params: new HttpParams().set('nickname', nickname),
    });
  }

  searchByPhone(phone: string): Observable<iContact[]> {
    return this.http.get<iContact[]>(`${this.apiUrl}/search/phone`, {
      params: new HttpParams().set('partialNumber', phone),
    });
  }

  searchByEmail(email: string): Observable<iContact[]> {
    return this.http.get<iContact[]>(`${this.apiUrl}/search/email`, {
      params: new HttpParams().set('partialEmail', email),
    });
  }

  searchByStreet(street: string): Observable<iContact[]> {
    return this.http.get<iContact[]>(`${this.apiUrl}/search/street`, {
      params: new HttpParams().set('partialStreet', street),
    });
  }

  searchByExactStreet(street: string): Observable<iContact[]> {
    return this.http.get<iContact[]>(
      `${this.apiUrl}/search/address/street/exact`,
      {
        params: new HttpParams().set('street', street),
      }
    );
  }

  searchByPartialNeighborhood(neighborhood: string): Observable<iContact[]> {
    return this.http.get<iContact[]>(
      `${this.apiUrl}/search/address/neighborhood/partial`,
      {
        params: new HttpParams().set('neighborhood', neighborhood),
      }
    );
  }

  searchByExactNeighborhood(neighborhood: string): Observable<iContact[]> {
    return this.http.get<iContact[]>(
      `${this.apiUrl}/search/address/neighborhood/exact`,
      {
        params: new HttpParams().set('neighborhood', neighborhood),
      }
    );
  }

  searchByPartialCity(city: string): Observable<iContact[]> {
    return this.http.get<iContact[]>(
      `${this.apiUrl}/search/address/city/partial`,
      {
        params: new HttpParams().set('city', city),
      }
    );
  }

  searchByExactCity(city: string): Observable<iContact[]> {
    return this.http.get<iContact[]>(
      `${this.apiUrl}/search/address/city/exact`,
      {
        params: new HttpParams().set('city', city),
      }
    );
  }

  searchByPartialState(state: string): Observable<iContact[]> {
    return this.http.get<iContact[]>(
      `${this.apiUrl}/search/address/state/partial`,
      {
        params: new HttpParams().set('state', state),
      }
    );
  }

  searchByExactState(state: string): Observable<iContact[]> {
    return this.http.get<iContact[]>(
      `${this.apiUrl}/search/address/state/exact`,
      {
        params: new HttpParams().set('state', state),
      }
    );
  }

  searchByPartialCountry(country: string): Observable<iContact[]> {
    return this.http.get<iContact[]>(
      `${this.apiUrl}/search/address/country/partial`,
      {
        params: new HttpParams().set('country', country),
      }
    );
  }

  searchByExactCountry(country: string): Observable<iContact[]> {
    return this.http.get<iContact[]>(
      `${this.apiUrl}/search/address/country/exact`,
      {
        params: new HttpParams().set('country', country),
      }
    );
  }

  searchByPartialZipCode(zipCode: string): Observable<iContact[]> {
    return this.http.get<iContact[]>(
      `${this.apiUrl}/search/address/zipcode/partial`,
      {
        params: new HttpParams().set('zipCode', zipCode),
      }
    );
  }

  searchByExactZipCode(zipCode: string): Observable<iContact[]> {
    return this.http.get<iContact[]>(
      `${this.apiUrl}/search/address/zipcode/exact`,
      {
        params: new HttpParams().set('zipCode', zipCode),
      }
    );
  }

  searchByFavorite(favorite: boolean): Observable<iContact[]> {
    return this.http.get<iContact[]>(`${this.apiUrl}/search/favorite`, {
      params: new HttpParams().set('favorite', favorite.toString()),
    });
  }

  searchByCategory(categoryName: string): Observable<iContact[]> {
    return this.http.get<iContact[]>(`${this.apiUrl}/search/category`, {
      params: new HttpParams().set('categoryName', categoryName),
    });
  }
}

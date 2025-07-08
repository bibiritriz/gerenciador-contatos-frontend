import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/ContactService';
import { iContact } from '../../models/Contact';
import { FilterService } from '../../services/FilterService';

@Component({
  selector: 'app-contacts',
  standalone: false,
  templateUrl: './contacts.html',
  styleUrl: './contacts.css',
})
export class Contacts implements OnInit {
  favorite: boolean = false;
  contacts: iContact[] = [];

  constructor(
    private contactService: ContactService,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.filterService.searchTerm$.subscribe((term) => {
      //Telefone
      if (Number(term)) {
        this.contactService.searchByPhone(term.toString()).subscribe({
          next: (contacts: iContact[]) => {
            this.contacts = contacts;
          },
        });
      }

      //Email
      if (term.includes('@')) {
        this.contactService.searchByEmail(term).subscribe({
          next: (contacts: iContact[]) => {
            this.contacts = contacts;
          },
        });
      }

      //Nome
      this.contactService.searchByPartialName(term).subscribe({
        next: (contacts: iContact[]) => {
          this.contacts = contacts;
        },
      });
    });

    this.filterService.selectedCategory$.subscribe((category) => {
      if (category) {
        this.contactService.searchByCategory(category).subscribe((contacts) => {
          this.contacts = contacts;
        });
      } else {
        this.getContacts();
      }
    });

    //Favorite
    this.filterService.favorites$.subscribe((favorite) => {
      if (favorite) {
        this.contactService.searchByFavorite(favorite).subscribe({
          next: (contacts: iContact[]) => {
            this.contacts = contacts;
          },
        });
      }
    });
  }

  toggleFavorite(favorite: boolean, id: number) {
    favorite = !favorite;
    this.contactService.patchContact(id, { favorite: favorite }).subscribe({
      next: () => {
        this.getContacts();
      },
    });
  }

  deleteContact(id: number) {
    this.contactService.deleteContact(id).subscribe({
      next: () => {
        this.getContacts();
      },
    });
  }

  getContacts() {
    this.contactService.getContacts().subscribe({
      next: (contacts: iContact[]) => {
        this.contacts = contacts;
        this.filterService.setTotalContacts(this.contacts.length);
      },
    });
  }
}

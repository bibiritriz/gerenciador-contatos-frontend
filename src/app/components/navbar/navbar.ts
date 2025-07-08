import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ContactService } from '../../services/ContactService.service';
import { FilterService } from '../../services/FilterService.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  @Output() toggle = new EventEmitter<void>();
  searchTerm: string = '';

  constructor(
    private filterService: FilterService,
    private contactService: ContactService
  ) {}
  ngOnInit(): void {
    this.contactService.getContacts().subscribe({
      next: (data) => {
        this.filterService.setTotalContacts(data.length);
      },
    });
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.filterService.setSearchTerm(input.value);
  }

  onToggleSidebar() {
    this.toggle.emit();
  }
}

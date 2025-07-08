import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from '../../services/CategoryService.service';
import { iCategory, iDataCategory } from '../../models/Category.model';
import { FilterService } from '../../services/FilterService.service';
import { ContactService } from '../../services/ContactService.service';
import { iContact } from '../../models/Contact.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit {
  @ViewChild('modalCreateCategory') modalAddCategory: any;
  @Output() categorySelected = new EventEmitter<string>();
  newCategoryName: string = '';
  editCategoryData: iCategory = {} as iCategory;
  totalContacts: number = 0;
  categories: iCategory[] = [];

  constructor(
    private readonly modalService: NgbModal,
    private readonly categoryService: CategoryService,
    private readonly filterService: FilterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.filterService.totalContacts$.subscribe((count) => {
      this.totalContacts = count;
    });
    this.getCategories();
  }

  onSelectCategory(category: iCategory | null) {
    const isOnHome = this.router.url === '/';

    const categoryName = category ? category.name : null;

    if (!isOnHome) {
      this.router.navigate(['/']).then(() => {
        this.filterService.setCategory(categoryName);
      });
    } else {
      this.filterService.setCategory(categoryName);
    }
  }

  selectFavorites(favorite: boolean) {
    this.filterService.setFavorites(favorite);
  }

  getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
    });
  }

  // getTotalContacts() {
  //   this.contactService.getContacts().subscribe({
  //     next: (contacts: iContact[]) => {
  //       this.filterService.setTotalContacts(contacts.length);
  //     },
  //   });
  // }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe({
      next: () => {
        this.getCategories();
      },
    });
  }

  resetCategoryState() {
    this.newCategoryName = '';
    this.editCategoryData = {} as iCategory;
  }

  openModal(templateRef: TemplateRef<any>, id?: number) {
    const modalRef = this.modalService.open(templateRef, {
      centered: true,
      size: 'sm',
    });
    modalRef.result.finally(() => {
      this.resetCategoryState();
    });
    if (id) {
      this.categoryService.getCategoryById(id).subscribe({
        next: (data: iCategory) => (
          (this.editCategoryData = data), (this.newCategoryName = data.name)
        ),
      });
    }
  }

  // getById(id: number) {
  //   let category: iCategory = {} as iCategory;
  //   this.categoryService.getCategoryById(id).subscribe({
  //     next: (data: iCategory) => (category = data),
  //   });
  //   return category;
  // }

  editCategory(modal: NgbActiveModal) {
    this.editCategoryData.name = this.newCategoryName.trim();
    if (this.editCategoryData.name) {
      this.categoryService.updateCategory(this.editCategoryData).subscribe({
        next: () => {
          this.getCategories();
          modal.close();
        },
      });
    }
  }

  createCategory(modal: NgbActiveModal) {
    const newCategory: iDataCategory = { name: this.newCategoryName };
    if (this.newCategoryName.trim()) {
      this.categoryService.postCategory(newCategory).subscribe({
        next: () => {
          this.getCategories();
          this.newCategoryName = '';
          modal.close();
        },
      });
    }
  }
}

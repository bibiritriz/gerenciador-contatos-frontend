import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  AbstractControl,
  Form,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { iPhone } from '../../models/Phone.model';
import { iEmail } from '../../models/Email.model';
import { iAddress } from '../../models/Address.model';
import { iCategory } from '../../models/Category.model';
import { CategoryService } from '../../services/CategoryService.service';
import { ContactService } from '../../services/ContactService.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PhotoService } from '../../services/PhotoService.service';
import { iPhoto } from '../../models/Photo.model';

@Component({
  selector: 'app-contact-form',
  standalone: false,
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css',
})
export class ContactForm implements OnInit {
  @ViewChild('modalAddCategory') modalAddCategory: any;
  newCategoryName: string = '';
  FormGroupContact: FormGroup;
  categoriesArray: iCategory[] = [];
  selectedCategory: iCategory = {} as iCategory;
  submitted: boolean = false;

  photos: iPhoto[] = [];

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private contactService: ContactService,
    private router: Router,
    private photoService: PhotoService,
    private activedRoute: ActivatedRoute
  ) {
    this.FormGroupContact = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      lastname: [''],
      nickname: [''],
      birthday: [''],
      note: [''],
      favorite: [false],
      phones: this.fb.array([], this.minLengthArray(1)),
      emails: this.fb.array([]),
      addresses: this.fb.array([]),
      categories: this.fb.array([]),
      photo: this.fb.group({
        id: [1],
        url: ['https://api.dicebear.com/7.x/lorelei/svg?seed=Beatriz'],
      }),
    });
  }

  ngOnInit(): void {
    this.submitted = false;

    let contactId = 0;
    if ((contactId = Number(this.activedRoute.snapshot.paramMap.get('id')))) {
      this.setContactById(contactId);
    }

    this.categoryService.getCategories().subscribe({
      next: (data: iCategory[]) => (this.categoriesArray = data),
    });
  }

  minLengthArray(min: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control instanceof FormArray) {
        const array = control.value as iPhone[];
        return array && array.length >= min ? null : { minLengthArray: true };
      }
      return null;
    };
  }

  getphotos() {
    this.photoService.getPhotos().subscribe({
      next: (data: iPhoto[]) => (this.photos = data),
    });
  }

  setContactById(id: number) {
    this.contactService.getContactById(id).subscribe({
      next: (contact) => {
        this.FormGroupContact.patchValue({
          id: contact.id,
          name: contact.name,
          lastname: contact.lastname,
          nickname: contact.nickname,
          birthday: contact.birthday,
          note: contact.note,
          favorite: contact.favorite,
          photo: contact.photo,
        });

        this.addresses.clear();
        contact.addresses.forEach((address) => {
          this.addAddress(address);
        });

        this.categories.clear();
        contact.categories.forEach((category) => {
          this.addCategoryForm(category);
        });

        this.phones.clear();
        contact.phones.forEach((phone) => {
          this.addPhone(phone);
        });

        this.emails.clear();
        contact.emails.forEach((email) => {
          this.addEmail(email);
        });
      },
    });
  }

  get photoUrl(): string {
    const { url } =
      this.FormGroupContact.get('photo')?.value ||
      'https://api.dicebear.com/7.x/lorelei/svg?seed=Beatriz';
    return url;
  }

  onSubmit() {
    this.submitted = true;
    const contact = this.FormGroupContact.value;
    if (this.FormGroupContact.valid) {
      if (contact.id) {
        this.contactService.updateContact(contact.id, contact).subscribe({
          next: () => {
            this.router.navigate(['']).then();
          },
        });
      } else {
        this.contactService
          .createContact(this.FormGroupContact.value)
          .subscribe({
            next: () => {
              this.router.navigate(['']).then();
            },
          });
      }
    }
  }

  openModal(templateRef: TemplateRef<any>) {
    this.modalService.open(templateRef, { centered: true, size: 'sm' });
  }

  openModalPhoto(templateRef: TemplateRef<any>) {
    this.modalService.open(templateRef, { centered: true, size: 'md' });
    this.getphotos();
  }

  setPhotoProfile(modal: NgbActiveModal, photo: iPhoto) {
    this.FormGroupContact.patchValue({ photo: photo });
    modal.close(photo);
  }

  addCategory(modal: NgbActiveModal) {
    if (this.selectedCategory.id) {
      this.addCategoryForm(this.selectedCategory);
      modal.close();
    }
  }

  isCategorySelected(categorie: iCategory): boolean {
    return this.categories.value.some((c: iCategory) => c.id === categorie.id);
  }

  get phones(): FormArray {
    return this.FormGroupContact.get('phones') as FormArray;
  }

  addPhone(phone?: iPhone) {
    this.phones.push(
      this.fb.group({
        id: [phone?.id || null],
        label: [phone?.label || ''],
        number: [phone?.number || '', Validators.required],
      })
    );
  }

  removeCategory(index: number): void {
    this.categories.removeAt(index);
  }

  removeAddress(index: number): void {
    this.addresses.removeAt(index);
  }

  removeEmail(index: number): void {
    this.emails.removeAt(index);
  }

  removePhone(index: number): void {
    this.phones.removeAt(index);
  }

  get emails(): FormArray {
    return this.FormGroupContact.get('emails') as FormArray;
  }

  addEmail(email?: iEmail) {
    this.emails.push(
      this.fb.group({
        id: [email?.id || null],
        label: [email?.label || ''],
        address: [email?.address || '', Validators.required],
      })
    );
  }

  get addresses(): FormArray {
    return this.FormGroupContact.get('addresses') as FormArray;
  }

  addAddress(address?: iAddress) {
    this.addresses.push(
      this.fb.group({
        id: [address?.id || null],
        country: [address?.country || ''],
        state: [address?.state || ''],
        city: [address?.city || ''],
        neighborhood: [address?.neighborhood || '', Validators.required],
        street: [address?.street || '', Validators.required],
        number: [address?.number || '', Validators.required],
        zipCode: [address?.zipCode || ''],
        complement: [address?.complement || ''],
      })
    );
  }

  get name(): AbstractControl {
    return this.FormGroupContact.get('name')!;
  }

  get categories(): FormArray {
    return this.FormGroupContact.get('categories') as FormArray;
  }

  addCategoryForm(category: iCategory) {
    this.categories.push(
      this.fb.group({
        id: category.id,
        name: category.name,
      })
    );
  }
}

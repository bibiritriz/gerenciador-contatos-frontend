import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Contacts } from './components/contacts/contacts';
import { ContactForm } from './components/contact-form/contact-form';

const routes: Routes = [
  {
    path: '',
    component: Contacts,
  },
  {
    path: 'create',
    component: ContactForm,
  },
  {
    path: 'edit/:id',
    component: ContactForm
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

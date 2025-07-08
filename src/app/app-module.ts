import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Sidebar } from './components/sidebar/sidebar';
import { Navbar } from './components/navbar/navbar';
import { Contacts } from './components/contacts/contacts';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ContactForm } from './components/contact-form/contact-form';

@NgModule({
  declarations: [App, Sidebar, Navbar, Contacts, ContactForm],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideNgxMask(),
  ],
  bootstrap: [App],
})
export class AppModule {}

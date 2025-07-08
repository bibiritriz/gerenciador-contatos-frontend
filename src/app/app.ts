import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css',
})
export class App {
  showSidebar = false;

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }
}

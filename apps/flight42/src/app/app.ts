import { Component, signal } from '@angular/core';
import { Headerbar } from './headerbar/headerbar';
import { Sidebar } from './sidebar/sidebar';

@Component({
  selector: 'app-root',
  imports: [Headerbar, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  greeting = signal('Hello Onkel Max!');
  silentGreeting = 'Hello Tante Mary!';

  constructor() {
    setTimeout(() => {
      this.greeting.set(
        'Hello Angular! :)'
      );
    }, 5_000);
    setTimeout(() => {
      this.silentGreeting = 'Hello React!';
    }, 6_000);
  }
}

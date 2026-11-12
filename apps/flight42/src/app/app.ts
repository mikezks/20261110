import { Component } from '@angular/core';
import { Headerbar } from './core/headerbar/headerbar';
import { Sidebar } from './core/sidebar/sidebar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    Headerbar, Sidebar,
    RouterOutlet
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}

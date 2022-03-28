import { AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { MaterialService } from '../classes/material.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements AfterViewInit {

@ViewChild('floating') floatingRef: ElementRef

  links = [
    {url: '/overview', name: 'Обзор'},
    {url: '/profile', name: 'Личный кабинет'},
    {url: '/history', name: 'История'},
    {url: '/order', name: 'Добавить обзор'},
    {url: '/categories', name: 'Категории'},
  ]

  constructor(private auth: AuthService, private router: Router) { }


  ngAfterViewInit(): void {
    MaterialService.initializeFloatingButton(this.floatingRef)
  }

  logout(event: Event) {
    event: event.preventDefault()
    this.auth.logout()
    this.router.navigate(['/login'])
  }
  

}

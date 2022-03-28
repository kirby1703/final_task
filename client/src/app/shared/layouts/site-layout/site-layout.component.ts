import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements OnInit {

  links = [
    {url: '/overview', name: 'Обзор'},
    {url: '/profile', name: 'Личный кабинет'},
    {url: '/history', name: 'История'},
    {url: '/order', name: 'Добавить обзор'},
    {url: '/categories', name: 'Категории'},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}

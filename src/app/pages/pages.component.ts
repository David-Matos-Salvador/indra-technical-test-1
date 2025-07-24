import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
  imports: [RouterOutlet]
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }

}

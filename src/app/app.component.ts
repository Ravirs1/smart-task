import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  theme: Theme = 'light-theme';
  title = 'design';
 

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly renderer: Renderer2
  ) {

  }

  ngOnInit() {
    this.renderer.addClass(this.document.body, this.theme)
  }
  backRoute() {
    window.history.back();
  }
  
toggleTheme() {
  const newTheme = this.theme == 'light-theme' ? 'dark-theme' : 'light-theme';
  this.document.body.classList.replace(this.theme, newTheme);
  this.theme = newTheme;
}
}

type Theme = 'light-theme' | 'dark-theme';

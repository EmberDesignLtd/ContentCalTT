import { Component, Renderer2 } from '@angular/core';
import { Icon } from './../../svg-icon/svg-icon/svg-icon.component';

enum Theme {
  DARK = 'dark-theme',
  LIGHT = 'light-theme',
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  EIcon = Icon;
  private darkTheme = true;

  constructor(private readonly renderer: Renderer2) {}

  toggleTheme(): void {
    this.darkTheme = !this.darkTheme;
    this.renderer.removeClass(
      document.body,
      this.darkTheme ? Theme.LIGHT : Theme.DARK
    );
    this.renderer.addClass(
      document.body,
      this.darkTheme ? Theme.DARK : Theme.LIGHT
    );
  }
}

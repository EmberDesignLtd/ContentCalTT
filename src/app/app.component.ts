import { ChangeDetectionStrategy, Component, Renderer2 } from '@angular/core';

enum Theme {
  DARK = 'dark-theme',
  LIGHT = 'light-theme',
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private darkTheme = true;

  constructor(private readonly renderer: Renderer2) {}

  // TODO(Munro): Move to relevant component/section
  toggleTheme() {
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

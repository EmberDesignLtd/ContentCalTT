import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

export enum IconSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export enum Icon {
  THEME_SWITCH = 'theme-switch',
  SORT = 'sort',
}

@Component({
  selector: 'app-svg-icon',
  templateUrl: './svg-icon.component.html',
  styleUrls: ['./svg-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SvgIconComponent implements AfterViewInit {
  @Input() iconId?: Icon;
  @Input() iconSize = IconSize.MEDIUM;
  @Input() flipped = false;

  ngAfterViewInit() {
    if (!this.iconId) {
      console.warn('No iconId has been passed as an @Input!');
    }
  }
}

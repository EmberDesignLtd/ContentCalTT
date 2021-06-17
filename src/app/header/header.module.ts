import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SvgIconModule } from './../svg-icon/svg-icon.module';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, SvgIconModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}

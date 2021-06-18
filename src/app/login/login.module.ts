import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from './../button/button.module';
import { CardModule } from './../card/card.module';
import { TitleModule } from './../title/title.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    ButtonModule,
    CardModule,
    CommonModule,
    FormsModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    TitleModule,
  ],
})
export class LoginModule {}

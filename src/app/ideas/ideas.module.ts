import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from './../button/button.module';
import { CardModule } from './../card/card.module';
import { TitleModule } from './../title/title.module';
import { IdeasRoutingModule } from './ideas-routing.module';
import { IdeasComponent } from './ideas/ideas.component';
import { UpdateOrNewIdeaComponent } from './update-or-new-idea/update-or-new-idea.component';

@NgModule({
  declarations: [IdeasComponent, UpdateOrNewIdeaComponent],
  imports: [
    ButtonModule,
    CardModule,
    CommonModule,
    IdeasRoutingModule,
    ReactiveFormsModule,
    TitleModule,
  ],
})
export class IdeasModule {}

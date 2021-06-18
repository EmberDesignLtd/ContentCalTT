import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IdeasRoutingModule } from './ideas-routing.module';
import { IdeasComponent } from './ideas/ideas.component';
import { UpdateOrNewIdeaComponent } from './update-or-new-idea/update-or-new-idea.component';

@NgModule({
  declarations: [IdeasComponent, UpdateOrNewIdeaComponent],
  imports: [CommonModule, IdeasRoutingModule, ReactiveFormsModule],
})
export class IdeasModule {}

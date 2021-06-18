import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IdeasRoutingModule } from './ideas-routing.module';
import { IdeasComponent } from './ideas/ideas.component';

@NgModule({
  declarations: [IdeasComponent],
  imports: [CommonModule, IdeasRoutingModule, ReactiveFormsModule],
})
export class IdeasModule {}

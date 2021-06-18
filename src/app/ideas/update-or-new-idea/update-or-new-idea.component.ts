import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IdeasService } from './../../services/ideas.service';

@Component({
  selector: 'app-update-or-new-idea',
  templateUrl: './update-or-new-idea.component.html',
  styleUrls: ['./update-or-new-idea.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateOrNewIdeaComponent {
  ideaForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    date: new FormControl(),
    tags: new FormControl([]),
  });

  constructor(private readonly ideasService: IdeasService) {}

  submit(): void {
    this.ideaForm.controls.date.setValue(new Date());
    this.ideasService.addNewEntry(this.ideaForm.value);
  }
}

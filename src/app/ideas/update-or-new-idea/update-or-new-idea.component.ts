import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Idea, IdeasService } from './../../services/ideas.service';

enum TagLabel {
  AWESOME = 'Awesome',
  PROGRESS = 'In Progess',
  APPROVED = 'Approved',
}
@Component({
  selector: 'app-update-or-new-idea',
  templateUrl: './update-or-new-idea.component.html',
  styleUrls: ['./update-or-new-idea.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateOrNewIdeaComponent {
  @Input() idea?: Idea;
  ideaForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    date: new FormControl(),
    tags: new FormArray([
      new FormControl({ label: TagLabel.AWESOME, value: false }),
      new FormControl({ label: TagLabel.PROGRESS, value: true }),
      new FormControl({ label: TagLabel.APPROVED, value: false }),
    ]),
  });

  constructor(private readonly ideasService: IdeasService) {}

  submit(): void {
    this.ideaForm.controls.date.setValue(new Date());
    this.ideasService.addNewEntry(this.ideaForm.value);
  }

  get tags(): FormControl[] {
    // TODO(Munro): Work out type issue;
    //@ts-ignore
    return this.ideaForm.controls.tags.controls;
  }
}

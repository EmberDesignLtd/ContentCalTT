import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
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
  @Input() set idea(_idea: Idea) {
    if (_idea.title) {
      this.updating = true;
      this.ideaForm.controls.title.setValue(_idea.title);
      this.ideaForm.controls.description.setValue(_idea.description);
      const tags = new FormArray([]);
      _idea.tags.forEach((element) => {
        tags.push(
          new FormControl({ label: element.label, value: element.value })
        );
      });
      this.ideaForm.controls.tags = tags;
    } else {
      this.updating = false;
    }
  }
  @Input() index = 0;
  @Output() close = new EventEmitter<void>();
  updating = false;
  toggleDeleteModal = false;

  ideaForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    date: new FormControl(),
    tags: new FormArray([
      new FormControl({ label: TagLabel.AWESOME, value: false }),
      new FormControl({ label: TagLabel.PROGRESS, value: false }),
      new FormControl({ label: TagLabel.APPROVED, value: false }),
    ]),
  });

  constructor(private readonly ideasService: IdeasService) {}

  removeIdea(): void {
    this.ideasService.removeIdea(this.index);
    this.closeModal();
  }

  closeModal(): void {
    this.close.emit();
  }

  openDeleteModal(): void {
    this.toggleDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.toggleDeleteModal = false;
  }

  submit(): void {
    this.ideaForm.controls.date.setValue(new Date());
    if (this.updating) {
      this.ideasService.updateEntry(this.index, { ...this.ideaForm.value });
    } else {
      this.ideasService.addNewEntry({ ...this.ideaForm.value });
    }
    this.closeModal();
  }

  updateTagValue(index: number): void {
    this.tags[index].value.value = !this.tags[index].value.value;
  }

  get tags(): FormControl[] {
    // TODO(Munro): Work out type issue;
    //@ts-ignore
    return this.ideaForm.controls.tags.controls;
  }
}

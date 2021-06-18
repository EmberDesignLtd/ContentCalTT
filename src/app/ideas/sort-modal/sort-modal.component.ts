import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';
import { DocumentEvent } from 'src/app/enums/document-events';
import { IdeaKey, IdeasService } from 'src/app/services/ideas.service';

export enum SortType {
  DATE = 'Date',
  TITLE = 'Title',
  NONE = '',
}

@Component({
  selector: 'app-sort-modal',
  templateUrl: './sort-modal.component.html',
  styleUrls: ['./sort-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortModalComponent {
  @HostListener(`${DocumentEvent.ESCAPE}`, ['$event']) onKeydownHandler() {
    this.closeModal(this.ESortType.NONE);
  }
  @Output() close = new EventEmitter<SortType>();
  readonly EIdeaKey = IdeaKey;
  readonly ESortType = SortType;

  constructor(private readonly ideasService: IdeasService) {}

  sortBy(key: IdeaKey, sortType: SortType): void {
    this.ideasService.sortBy(key);
    this.closeModal(sortType);
  }

  closeModal(sortType: SortType): void {
    this.close.emit(sortType);
  }
}

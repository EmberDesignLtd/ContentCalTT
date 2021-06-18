import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IdeaKey, IdeasService } from './../../services/ideas.service';

@Component({
  selector: 'app-ideas',
  templateUrl: './ideas.component.html',
  styleUrls: ['./ideas.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdeasComponent {
  readonly ideas$ = this.ideasService.store$;
  readonly EIdeaKey = IdeaKey;

  constructor(private readonly ideasService: IdeasService) {}

  sortBy(key: IdeaKey) {
    this.ideasService.sortBy(key);
  }
}

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Idea, IdeaKey, IdeasService } from './../../services/ideas.service';

const SEARCH_BAR = 'searchBar';

@Component({
  selector: 'app-ideas',
  templateUrl: './ideas.component.html',
  styleUrls: ['./ideas.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdeasComponent implements AfterViewInit, OnDestroy {
  readonly ideas$ = this.ideasService.store$;
  readonly EIdeaKey = IdeaKey;
  readonly searchTerm = new FormControl();
  private readonly destroys$ = new ReplaySubject<void>(1);
  @ViewChild(SEARCH_BAR) searchBar!: ElementRef;

  constructor(private readonly ideasService: IdeasService) {}

  sortBy(key: IdeaKey): void {
    this.ideasService.sortBy(key);
  }

  removeIdea(idea: Idea): void {
    this.ideasService.removeIdea(idea);
  }

  ngAfterViewInit(): void {
    if (this.searchBar.nativeElement) {
      this.searchTerm.valueChanges
        .pipe(
          debounceTime(100),
          distinctUntilChanged(),
          takeUntil(this.destroys$)
        )
        .subscribe((value) => this.ideasService.filterData(value));
    }
  }

  ngOnDestroy(): void {
    this.destroys$.next();
  }
}

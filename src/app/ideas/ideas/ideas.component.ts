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
import { SortType } from '../sort-modal/sort-modal.component';
import { Idea, IdeasService } from './../../services/ideas.service';
import { Icon } from './../../svg-icon/svg-icon/svg-icon.component';

const SEARCH_BAR = 'searchBar';

@Component({
  selector: 'app-ideas',
  templateUrl: './ideas.component.html',
  styleUrls: ['./ideas.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdeasComponent implements AfterViewInit, OnDestroy {
  @ViewChild(SEARCH_BAR) searchBar!: ElementRef;
  private readonly destroys$ = new ReplaySubject<void>(1);
  readonly ideas$ = this.ideasService.store$;
  readonly searchTerm = new FormControl();
  readonly EIcon = Icon;
  toggleNewIdeaModal_ = false;
  toggleSortModal_ = false;
  sortType = '';
  activeIdea: Idea = {} as Idea;
  activeIndex = -1;

  constructor(private readonly ideasService: IdeasService) {}

  toggleNewIdeaModal(idea?: Idea, index = 0): void {
    if (idea) {
      this.activeIdea = idea;
      this.activeIndex = index;
    }
    this.toggleNewIdeaModal_ = !this.toggleNewIdeaModal_;
    if (!this.toggleNewIdeaModal_) {
      this.activeIdea = {} as Idea;
      this.activeIndex = -1;
    }
  }

  toggleSortModal(sortType?: SortType): void {
    this.toggleSortModal_ = !this.toggleSortModal_;
    if (sortType) {
      this.sortType = sortType;
    }
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

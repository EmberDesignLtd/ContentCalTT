import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { MOCK_DATA } from './mock-starting-data';

export interface Idea {
  title: string;
  description: string;
  date: Date;
  tags: Tag[];
  [key: string]: any;
}

export interface Tag {
  value: boolean;
  label: string;
}

export enum IdeaKey {
  DATE = 'date',
  TITLE = 'title',
  DESCRIPTION = 'description',
  TAGS = 'tags',
}

@Injectable({ providedIn: 'root' })
export class IdeasService {
  private unfilteredState = MOCK_DATA;
  private readonly store_$ = new BehaviorSubject(MOCK_DATA);
  private readonly sortDirection = {
    [IdeaKey.DATE]: false,
    [IdeaKey.TITLE]: false,
    [IdeaKey.DESCRIPTION]: false,
    [IdeaKey.TAGS]: false,
  };
  readonly store$ = this.store_$.pipe(distinctUntilChanged());

  sortBy(key: IdeaKey): void {
    this.sortDirection[key] = !this.sortDirection[key];
    const storeState = [...this.store_$.value];
    if (this.sortDirection[key]) {
      storeState.sort((a, b) =>
        a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0
      );
    } else {
      storeState.sort((a, b) =>
        a[key] < b[key] ? 1 : b[key] < a[key] ? -1 : 0
      );
    }
    this.updateState(storeState);
  }

  filterData(searchValue: string): void {
    const _searchValue = searchValue.toLowerCase();
    let stateToFilter = [...this.unfilteredState];
    stateToFilter = stateToFilter.filter(
      (element) =>
        element.title.toLowerCase().includes(_searchValue) ||
        element.description.toLowerCase().includes(_searchValue) ||
        element.tags.some((element) =>
          element.label.toLowerCase().includes(_searchValue)
        )
    );
    this.updateState(stateToFilter);
  }

  updateEntry(ideaIndex: number, idea: Idea): void {
    const newState = [...this.store_$.value];
    newState[ideaIndex] = idea;
    this.updateUnfilteredState(newState);
    this.updateState(newState);
  }

  addNewEntry(ideaEntry: Idea): void {
    const newState = [...this.store_$.value, ideaEntry];
    this.updateUnfilteredState(newState);
    this.updateState(newState);
  }

  updateUnfilteredState(state: Idea[]) {
    this.unfilteredState = [...state];
  }

  removeIdea(ideaIndex: number): void {
    const newState = [...this.store_$.value];
    newState.splice(ideaIndex, 1);
    this.updateUnfilteredState(newState);
    this.updateState(newState);
  }

  private updateState(state: Idea[]): void {
    this.store_$.next([...state]);
  }
}

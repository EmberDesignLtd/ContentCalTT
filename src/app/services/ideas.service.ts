import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { MOCK_DATA } from './mock-starting-data';

export interface Idea {
  title: string;
  description: string;
  date: Date;
  tags: string[];
  [key: string]: any;
}

export enum IdeaKey {
  DATE = 'date',
  TITLE = 'title',
}

@Injectable({ providedIn: 'root' })
export class IdeasService {
  private readonly store_$ = new BehaviorSubject(MOCK_DATA);
  private readonly sortDirection = {
    [IdeaKey.DATE]: false,
    [IdeaKey.TITLE]: false,
  };
  readonly store$ = this.store_$.pipe(distinctUntilChanged());

  sortBy(key: IdeaKey) {
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

  private updateState(state: any): void {
    this.store_$.next([...state]);
  }
}

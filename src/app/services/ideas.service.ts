import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { MOCK_DATA } from './mock-starting-data';

export interface Idea {
  title: string;
  description: string;
  date: Date;
  tags: string[];
}

@Injectable({ providedIn: 'root' })
export class IdeasService {
  private readonly store_$ = new BehaviorSubject(MOCK_DATA);
  readonly store$ = this.store_$.pipe(distinctUntilChanged());

  private updateState(state: any): void {
    this.store_$.next([...state]);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // Given more time I'd implement a more robust login service with expiration tokens/OAuth as a third party example
  loggedIn = new BehaviorSubject(false);
}

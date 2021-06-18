import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // TODO(Munro): Implement a more realistic login behaviour with a expiration date & local storage
  loggedIn = new BehaviorSubject(true);
}

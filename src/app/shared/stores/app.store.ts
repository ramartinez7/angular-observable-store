import { environment } from 'src/environments/environment';
import { Notification } from './../models/notification.model';
import { AppState } from './../states/app.state';
import { Store } from 'rxjs-reactive-state';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class AppStore extends Store<AppState> {
  observer$: Observable<AppState>;

  constructor() {
    super(new AppState());
    this.logActions = environment.logState;
  }

  setNotification = (notification: Notification): void => this.change( { Notification: {...notification} } );

  getNotifications$ = (): Observable<Notification> => this.listen$('Notification');

}

import { Notification } from './../models/notification.model';
import { AppStore } from './../stores/app.store';
import { Observable } from 'rxjs';

export class AppFacade {

  constructor(private store: AppStore) { }

  setNotification = (notification: Notification): void => this.store.setNotification(notification);

  getNotifications$ = (): Observable<Notification> => this.store.getNotifications$();

}

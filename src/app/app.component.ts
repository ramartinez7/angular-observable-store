import { AppStore } from './shared/stores/app.store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import { PriorityType } from './shared/models/notification.model';
import { distinctUntilChanged } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy  {
  title = 'angular-observable-store';
  subscriptions = new Array<Subscription>();

  constructor(private appStore: AppStore, private messageService: NzMessageService, private notificationService: NzNotificationService) {}

  ngOnInit() {
    this.listenNotifications();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  listenNotifications() {
    this.subscriptions.push(this.appStore.getNotifications$()
    .pipe(
      distinctUntilChanged()
    )
    .subscribe(
      n => {
        if (n) {
          if (n.priority === PriorityType.NORMAL) {
            this.messageService.remove();
            this.messageService.create(n.type, n.content);
          } else {
            this.notificationService.remove();
            this.notificationService.create(n.type, n.title, n.content, {nzDuration: 5000});
          }
        }
      }
    ));
  }
}

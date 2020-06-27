import { AppStore } from './shared/stores/app.store';
import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import { PriorityType } from './shared/models/notification.model';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  title = 'angular-observable-store';

  constructor(private appStore: AppStore, private messageService: NzMessageService, private notificationService: NzNotificationService) {}

  ngOnInit() {
    this.listenNotifications();
  }

  listenNotifications() {
    this.appStore.getNotifications$()
    .pipe(
      distinctUntilChanged()
    )
    .subscribe(
      n => {
        if (n) {
          if (n.priority === PriorityType.NORMAL) {
            this.messageService.create(n.type, n.content);
          } else {
            this.notificationService.create(n.type, n.title, n.content, {nzDuration: 5000});
          }
        }
      }
    );
  }
}


export class Notification {
  constructor(
    public type: NotificationType,
    public content: string,
    public priority: PriorityType = PriorityType.NORMAL,
    public title: string = 'App Message'
    ) { }
}

export enum NotificationType {
  INFO = 'info',
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning'
}

export enum PriorityType {
  HIGH,
  NORMAL
}


export class Notification {
  constructor(
    public type: NotificationType,
    public content: string,
    public priority: PriorityType = PriorityType.NORMAL,
    public title: string = 'App Message'
    ) { }
}

export enum NotificationType {
  INFO = 'INFO',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  WARNING = 'WARNING'
}

export enum PriorityType {
  HIGH,
  NORMAL
}

import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ErrorInterceptorService {

    constructor() { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((err) => {
                this.notify('An error has ocurred', 'warning');
                return throwError(err);
            })
        );
    }

    notify(content: string, type: string) {
      console.log(content, type);
    }
}

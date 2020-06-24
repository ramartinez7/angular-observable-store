import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    let url = request.url;
    const body = JSON.stringify(request.body);

    // add host to all requests when not found
    if (!url.match(/^http(s)?:\/\/(.*)$/)) {
      const flag = url.split('/')[1];
      url = `${environment.urlApi}${url}`.replace(
        /([^:]\/)\/+/g,
        '$1'
      );
    }

    request = request.clone({ url, body });
    return next.handle(request);
  }
}

import {inject, Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

import {StateStorageService} from "../state-storage.service";
import {LoginService} from "../../service/login.service";

@Injectable()
export class AuthExpiredInterceptor implements HttpInterceptor {
  private loginService = inject(LoginService);
  private stateStorageService = inject(StateStorageService);
  private router = inject(Router);

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap({
        error: (err: HttpErrorResponse) => {
          if (err.status === 401 && err.url && !err.url.includes('api/account')) {
            this.stateStorageService.storeUrl(this.router.routerState.snapshot.url);
            this.loginService.logout();
            this.router.navigate(['/login']).then();
          }
        },
      }),
    );
  }
}

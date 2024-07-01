import {inject, Injectable} from "@angular/core";
import {AccountService} from "./account.service";
import {AuthServerProvider} from "./auth-jwt.service";
import {Account, Login} from "../model/account.model";
import {mergeMap, Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class LoginService {
  private accountService = inject(AccountService);
  private authServerProvider = inject(AuthServerProvider);

  login(credentials: Login): Observable<Account | null> {
    return this.authServerProvider.login(credentials).pipe(mergeMap(() => this.accountService.identity(true)));
  }

  logout(): void {
    this.authServerProvider
      .logout()
      .subscribe({
        complete: () => this.accountService.authenticate(null)
      });
  }
}

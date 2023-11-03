import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | UrlTree | boolean {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }
}
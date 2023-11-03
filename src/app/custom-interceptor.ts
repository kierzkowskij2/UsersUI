import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./service/auth.service";
import { Observable } from "rxjs";

@Injectable()
export class CustomInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.addAuthToken(request));
  }

  addAuthToken(request: HttpRequest<any>) {
    const token = this.authService.getToken();
    if(!token) {
        return request;
    }
    request = request.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
    console.log(request);
    return request;
  }
}
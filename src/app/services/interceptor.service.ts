import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const gameType = sessionStorage.getItem('game_type');
    const tokenId = sessionStorage.getItem('token');
    console.log("game_type", gameType);
    const updatedRequest = request.clone({
      headers: request.headers.set("game_type", "Some-dummyCode"),
    });
    const authReq = request.clone({
      headers: new HttpHeaders({
        'gameType': gameType ? gameType : "PUBG",
        'token': tokenId ? tokenId : ''
      })
    });
    // const updateReq = request.clone({
    //   headers: request.headers.append('game_type', gameType ? gameType : "pubg")
    // });
   return next.handle(authReq).pipe(
    tap(
      event => {
        //logging the http response to browser's console in case of a success
        if (event instanceof HttpResponse) {
          console.log("api call success :", event);
        }
      },
      error => {
        //logging the http response to browser's console in case of a failuer
        if (event instanceof HttpResponse) {
          console.log("api call error :", event);
        }
      }
    )
  );;

  }
}

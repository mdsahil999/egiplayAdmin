import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(public http: HttpClient) { }

  // postService(value: any, url: any) {
  //   let auth = this.getSessionOrLocalStorageValue('auth');
  //   // this.session.store('api_res_status', 'false');
  //   let httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Authorization': auth
  //     })
  //   };
  //   // let returnData = this.http.post(url, value, httpOptions);

  //   // returnData.subscribe(res => {
  //   //   console.log(res);
  //   //   if (res['status']) {
  //   //     this.session.store('api_res_status', res['status'].toString());
  //   //   }
  //   // });

  //   // return returnData;
  //   return this.http.post(url, value, httpOptions);
  // }

  postWitoutAuthService(value: any, url: any) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(url, value);
  }

  // postServiceWithParam(url) {
  //   let auth = this.getSessionOrLocalStorageValue('auth');
  //   // this.session.store('api_res_status', 'false');
  //   let httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Authorization': auth
  //     })
  //   };

  //   return this.http.post(url, httpOptions);
  // }
  getServiceWithParamWithoutAuth(url: any) {
    return this.http.get(url);
  }


  // getService(url) {

  //   // this.session.store('api_res_status', 'false');
  //   let auth = this.getSessionOrLocalStorageValue('auth');
  //   let httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Authorization': auth
  //     })
  //   };
  //   // let returnData = this.http.post(url, httpOptions);

  //   // returnData.subscribe(res => {
  //   //   console.log(res);
  //   //   if (res['status']) {
  //   //     this.session.store('api_res_status', res['status'].toString());
  //   //   }
  //   // });

  //   // return returnData;
  //   return this.http.get(url, httpOptions);
  // }
  getServiceWithoutAuth(url: any) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(url, httpOptions);
  }

  // putService(update_data, url) {
  //   // this.session.store('api_res_status', 'false');
  //   let httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Authorization': this.session.retrieve('jwt')
  //     })
  //   };
  //   // let returnData = this.http.post(url, httpOptions);

  //   // returnData.subscribe(res => {
  //   //   console.log(res);
  //   //   if (res['status']) {
  //   //     this.session.store('api_res_status', res['status'].toString());
  //   //   }
  //   // });

  //   // return returnData;
  //   return this.http.put(url, update_data, httpOptions);
  // }


  getFormUrlEncoded(toConvert : any) {
    const formBody = [];
    for (const property in toConvert) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(toConvert[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
  }

  // postServiceWithoutHeader(value, url) {
  //   let auth = this.getSessionOrLocalStorageValue('auth');
  //   // this.session.store('api_res_status', 'false');
  //   let httpOptions = {
  //     headers: new HttpHeaders({
  //       'Authorization': auth,
  //     })
  //   };

  //   // multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW
  //   // let returnData = this.http.post(url, value, httpOptions);

  //   // returnData.subscribe(res => {
  //   //   console.log(res);
  //   //   if (res['status']) {
  //   //     this.session.store('api_res_status', res['status'].toString());
  //   //   }
  //   // });

  //   // return returnData;
  //   return this.http.post(url, value, httpOptions);
  // }

  postServiceOnBoardedData(value: any, url: any) {
    return this.http.post(url, value);
  }

  postServiceForgotPassword(value: any, url: any) {
    return this.http.post(url, value);
  }
}

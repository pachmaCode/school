import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CorporativosService {

  apiListadoCorporativos = environment.apiURL+'/corporativos';
  auth_token = localStorage.getItem("tokenscloud")
  options: any;


  constructor(private http: HttpClient) {

  }

  headers: HttpHeaders = new HttpHeaders({
    "Authorization": `Bearer ${this.auth_token}`
  });

  obtenerCorporativos(): Observable<any> {
    return this.http
      .get<any>(
        this.apiListadoCorporativos,
        { headers: this.headers }
      );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Corporativo } from '../models/corporativo.model';
import { ContactoRequest } from '../models/contactonuevo.model';

@Injectable({
  providedIn: 'root'
})
export class CorporativoService {

  apiListadoCorporativos = environment.apiURL+'/corporativos/';
  apiContactos=environment.apiURL+'/contactos';
  auth_token = localStorage.getItem("tokenscloud")
  options: any;


  constructor(private http: HttpClient) {

  }

  headers: HttpHeaders = new HttpHeaders({
    "Authorization": `Bearer ${this.auth_token}`
  });

  obtenerCorporativoDetalle(id:string): Observable<any> {
    return this.http
      .get<any>(
        this.apiListadoCorporativos+id,
        { headers: this.headers }
      );
  }

  actualizarCorporativo(corporativoRequest: Corporativo) {
    return this.http
      .put<any>(
        this.apiListadoCorporativos+corporativoRequest.id, corporativoRequest,
        { headers: this.headers }
      );
  }

  crearContacto(contactoRequest: ContactoRequest){
    return this.http
      .post<any>(
        this.apiContactos, contactoRequest,
        { headers: this.headers }
      );
  }

  actualizarContacto(contactoRequest: ContactoRequest, idContacto:any){
    return this.http
      .put<any>(
        this.apiContactos+'/'+idContacto, contactoRequest,
        { headers: this.headers }
      );
  }

  eliminarContacto(idContacto:any){
    return this.http
      .delete<any>(
        this.apiContactos+'/'+idContacto,
        { headers: this.headers }
      );
  }
}
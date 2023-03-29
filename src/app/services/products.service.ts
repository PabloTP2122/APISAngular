import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { retry, retryWhen, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { environment } from '../../environments/environment';


import { Product, CreateProductDTO, UpdateProductDTO } from './../models/product.model';
import { checkTime } from '../interceptors/time.interceptor';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  //private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products';
  //  private apiUrl = 'https://api.escuelajs.co/api/v1/products';

  private apiUrl = `${environment.API_URL}/api/v1/products`;

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(this.apiUrl, { params, /* context: checkTime() */ })
      .pipe(
        retry(3)
      );
  }
  getProduct(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === HttpStatusCode.InternalServerError) {
            return throwError('Algo esta fallando en el servidor');
          }
          if (error.status === HttpStatusCode.NotFound) {
            return throwError('Este producto no existe');
          }
          if (error.status === HttpStatusCode.Unauthorized) {
            return throwError('Usted no tiene autorización');
          }
          return throwError('Ups algo salio mal');
        })
      )
  }
  getProductsByPage(limit: number, offset: number) {
    return this.http.get<Product[]>(`${this.apiUrl}`, {
      params: { limit, offset }
    });
  }
  create(dto: CreateProductDTO) {
    return this.http.post<Product>(this.apiUrl, dto);
  }
  update(id: string, dto: UpdateProductDTO) {
    // Si se elige put se tiene que envíar toda la información
    return this.http.put<Product>(`${this.apiUrl}/${id}`, dto);
  }
  delete(id: string) {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}

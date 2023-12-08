/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CreateUserDto } from '../../models/create-user-dto';
import { ResponseUserDto } from '../../models/response-user-dto';

export interface AuthControllerRegister$Params {
      body: CreateUserDto
}

export function authControllerRegister(http: HttpClient, rootUrl: string, params: AuthControllerRegister$Params, context?: HttpContext): Observable<StrictHttpResponse<ResponseUserDto>> {
  const rb = new RequestBuilder(rootUrl, authControllerRegister.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ResponseUserDto>;
    })
  );
}

authControllerRegister.PATH = '/auth/register';

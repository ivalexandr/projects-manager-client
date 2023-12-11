/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { authControllerLogin } from '../fn/auth/auth-controller-login';
import { AuthControllerLogin$Params } from '../fn/auth/auth-controller-login';
import { authControllerRefresh } from '../fn/auth/auth-controller-refresh';
import { AuthControllerRefresh$Params } from '../fn/auth/auth-controller-refresh';
import { authControllerRegister } from '../fn/auth/auth-controller-register';
import { AuthControllerRegister$Params } from '../fn/auth/auth-controller-register';
import { ResponseUserDto } from '../models/response-user-dto';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `authControllerRegister()` */
  static readonly AuthControllerRegisterPath = '/auth/register';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authControllerRegister()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authControllerRegister$Response(
    params: AuthControllerRegister$Params,
    context?: HttpContext
  ): Observable<StrictHttpResponse<ResponseUserDto>> {
    return authControllerRegister(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authControllerRegister$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authControllerRegister(
    params: AuthControllerRegister$Params,
    context?: HttpContext
  ): Observable<ResponseUserDto> {
    return this.authControllerRegister$Response(params, context).pipe(
      map((r: StrictHttpResponse<ResponseUserDto>): ResponseUserDto => r.body)
    );
  }

  /** Path part for operation `authControllerLogin()` */
  static readonly AuthControllerLoginPath = '/auth/login';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authControllerLogin()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authControllerLogin$Response(
    params: AuthControllerLogin$Params,
    context?: HttpContext
  ): Observable<StrictHttpResponse<ResponseUserDto>> {
    return authControllerLogin(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authControllerLogin$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authControllerLogin(
    params: AuthControllerLogin$Params,
    context?: HttpContext
  ): Observable<ResponseUserDto> {
    return this.authControllerLogin$Response(params, context).pipe(
      map((r: StrictHttpResponse<ResponseUserDto>): ResponseUserDto => r.body)
    );
  }

  /** Path part for operation `authControllerRefresh()` */
  static readonly AuthControllerRefreshPath = '/auth/refresh';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authControllerRefresh()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authControllerRefresh$Response(
    params: AuthControllerRefresh$Params,
    context?: HttpContext
  ): Observable<StrictHttpResponse<ResponseUserDto>> {
    return authControllerRefresh(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authControllerRefresh$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authControllerRefresh(
    params: AuthControllerRefresh$Params,
    context?: HttpContext
  ): Observable<ResponseUserDto> {
    return this.authControllerRefresh$Response(params, context).pipe(
      map((r: StrictHttpResponse<ResponseUserDto>): ResponseUserDto => r.body)
    );
  }
}

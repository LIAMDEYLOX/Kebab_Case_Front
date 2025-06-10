import {
  HttpRequest,
  HttpHandlerFn,
  HttpInterceptorFn
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const authService = inject(AuthService);

  // Skip if the request is to an external domain
  if (!request.url.includes('localhost:8000')) {
    return next(request);
  }

  // Get auth header from auth service
  const authHeader = authService.getAuthorizationHeader();

  // If no auth header, proceed with original request
  if (!authHeader) {
    return next(request);
  }

  // Clone the request and add the authorization header
  const authReq = request.clone({
    setHeaders: {
      Authorization: authHeader
    }
  });

  // Pass the cloned request with the auth header to the next handler
  return next(authReq);
};

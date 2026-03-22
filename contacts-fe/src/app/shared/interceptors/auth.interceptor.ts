import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Cookies from 'js-cookie';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  
  if (isPlatformBrowser(platformId)) {
    req = req.clone({
      withCredentials: true
    });
  }

  return next(req);
};

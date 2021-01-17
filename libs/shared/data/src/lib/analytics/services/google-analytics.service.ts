import { Injectable } from '@angular/core';

declare let gtag: (event: string, eventName: string, params: {}) => void;

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {
  public trackEvent(eventName: string, eventParams: {} ): void {
    gtag('event', eventName, eventParams);
  }
}

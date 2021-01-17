import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { GoogleAnalyticsService } from '@saq/shared/data';

@Component({
  selector: 'saq-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private titleService: Title,
              private analyticsService: GoogleAnalyticsService) { }

  ngOnInit(): void {
    this.titleService.setTitle('SAQ - Découvrez la sélection de vins, bières et spiritueux en ligne');
  }

  trackEvent(eventName: string, eventParams: {}): void {
    if (eventName) {
      this.analyticsService.trackEvent(eventName, eventParams);
    }
  }
}

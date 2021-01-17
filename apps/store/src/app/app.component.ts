import { Component, OnInit } from '@angular/core';
import { ConfigService, GoogleAnalyticsService } from '@saq/shared/data';

@Component({
  selector: 'saq-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SAQ';

  configKey = 'appSettings';
  config = {
    viewFilters: true,
    viewWidescreen: false
  };

  constructor(
    private configService: ConfigService,
    private analyticsService: GoogleAnalyticsService) {
    // Initialise app config;
    this.configService.config = configService.config || this.config;

    configService.changes$.subscribe((val) => {
      this.config = this.configService.config;
    });
  }

  ngOnInit(): void {
    this.config = this.configService.config;
  }

  toggleFilters(): void {
    this.config.viewFilters = !this.config.viewFilters;
    this.configService.config = this.config;
    this.analyticsService.trackEvent('filter_view', { active: this.config.viewFilters });
  }

  toggleWidescreen(): void {
    this.config.viewWidescreen = !this.config.viewWidescreen;
    this.configService.config = this.config;
    this.analyticsService.trackEvent('widescreen_view', { active: this.config.viewWidescreen });
  }
}

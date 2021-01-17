import {ModuleWithProviders, NgModule} from '@angular/core';
import {StoreService} from './store/api/store.service';
import {HttpClientModule} from '@angular/common/http';
import {ConfigService} from './app-state/services/config.service';
import {LoadingService} from './app-state/services/loading.service';
import {GoogleAnalyticsService} from './analytics/services/google-analytics.service';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule
  ],
  exports: []
})
export class DataModule {
  static forRoot(): ModuleWithProviders<DataModule> {
    return {
      ngModule: DataModule,
      providers: [
        StoreService,
        ConfigService,
        LoadingService,
        GoogleAnalyticsService
      ]
    };
  }
}

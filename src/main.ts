import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from './environments/environment';

import { AppComponent } from './app/app.component';
import { APP_ROUTES } from './app/app.routing';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';

if (environment.production) {
  enableProdMode();
}

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(RouterModule.forRoot(APP_ROUTES)),
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(ScrollingModule)
    // importProvidersFrom(CdkVirtualScrollViewport)
  ]
}).catch(err => console.error(err));

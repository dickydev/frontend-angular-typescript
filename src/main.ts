// src/main.ts

import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app-routing.module'; // Import routing module if you have one
import { provideRouter } from '@angular/router';
import { routes } from './app/app-routing.module'; // Import the routes directly
import { environment } from './environments/environment';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    HttpClientModule,
    provideRouter(routes), // Use provideRouter with routes
    provideHttpClient()
  ]
})
  .catch(err => console.error(err));

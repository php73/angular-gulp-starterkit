import { BrowserModule } from '@angular/platform-browser';
import { NgModule, isDevMode, Provider } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Environment } from './environments/environment';
import { ProductionEnvironment } from './environments/environment.prod';
import { DevelopmentEnvironment } from './environments/environment.dev';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    <Provider>{
      provide: Environment,
      useFactory: () => {
        return  isDevMode() ? new DevelopmentEnvironment() : new ProductionEnvironment()
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

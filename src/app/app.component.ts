import { Component } from '@angular/core';
import { Environment } from './environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  public title = 'app works!';

  constructor(public environment: Environment) {
  }
}

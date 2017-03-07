import { browser, $ } from 'protractor';

export class AngularGulpStarterkitPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return (<any>$('app-root h1')).getText();
  }
}

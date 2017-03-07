import { AngularGulpStarterkitPage } from './app.po';

describe('angular-gulp-starterkit App', function() {
  let page: AngularGulpStarterkitPage;

  beforeEach(() => {
    page = new AngularGulpStarterkitPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

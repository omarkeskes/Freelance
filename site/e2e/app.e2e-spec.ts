import { SitestartboisPage } from './app.po';

describe('sitestartbois App', function() {
  let page: SitestartboisPage;

  beforeEach(() => {
    page = new SitestartboisPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

import { AppPage } from './app.po';
import { browser, element, by } from 'protractor';

describe('ScrollCollapse Lib E2E Tests', function() {
  let page: AppPage;

  beforeEach(() => (page = new AppPage()));

  beforeEach(() => page.navigateTo());

  beforeEach(() => browser.executeScript('window.scrollTo(0,0)'));

  afterEach(() => {
    browser
      .manage()
      .logs()
      .get('browser')
      .then((browserLog: any[]) => {
        expect(browserLog).toEqual([]);
      });
  });

  const runTests = (height = 768) => {
    describe('scroll direction', () => {
      it('should add scrolling direction class', () => {
        page.scrollTo();
        expect(page.getNavElement().getAttribute('class')).not.toContain(
          'sn-scrolling-down',
        );
        expect(page.getNavElement().getAttribute('class')).not.toContain(
          'sn-scrolling-up',
        );

        page.scrollTo(0, 10);
        page.scrollTo(0, 200);
        expect(page.getNavElement().getAttribute('class')).toContain(
          'sn-scrolling-down',
        );
        expect(page.getNavElement().getAttribute('class')).not.toContain(
          'sn-scrolling-up',
        );

        page.scrollTo(0, 100);
        expect(page.getNavElement().getAttribute('class')).not.toContain(
          'sn-scrolling-down',
        );
        expect(page.getNavElement().getAttribute('class')).toContain(
          'sn-scrolling-up',
        );
      });
    });

    describe('minimise mode', () => {
      it('should add "sn-minimise" class', () => {
        page.scrollTo();
        page.scrollTo(0, 10);
        expect(page.getNavElement().getAttribute('class')).not.toContain(
          'sn-minimise',
        );

        page.scrollTo(0, 110);
        expect(page.getNavElement().getAttribute('class')).toContain(
          'sn-minimise',
        );
      });
    });

    describe('affix mode', () => {
      it('should add "sn-affix" class', () => {
        page.scrollTo();
        page.scrollTo(0, 10);
        expect(page.getBarElement().getAttribute('class')).not.toContain(
          'sn-affix',
        );

        page.scrollTo(0, height * 3);
        expect(page.getBarElement().getAttribute('class')).toContain(
          'sn-affix',
        );
      });
    });
  };

  runTests();

  describe('resize', () => {
    beforeEach(() => page.resize(1024, 600));

    runTests(600);
  });
});

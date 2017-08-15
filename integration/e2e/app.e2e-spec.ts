import { browser, element, by } from 'protractor';

describe('ScrollCollapse Lib E2E Tests', function () {

  beforeEach(() => browser.get(''));

  beforeEach(() => browser.executeScript('window.scrollTo(0,0)'));

  afterEach(() => {
    browser.manage().logs().get('browser').then((browserLog: any[]) => {
      expect(browserLog).toEqual([]);
    });
  });

  it('should display lib', () => {
    expect(element(by.css('p')).getText()).toContain('Amet tempor excepteur occaecat nulla.');
  });

  it('should show `sn-viewport-out` class', () => {
    expect(element(by.css('.small-element.sn-viewport-out')).isPresent()).toBeTruthy();

    browser.executeScript('window.scrollTo(0, window.innerHeight/2)');
    expect(element(by.css('.small-element.sn-viewport-out')).isPresent()).toBeFalsy();
  });

  it('should show `sn-viewport-in` class', () => {
    browser.executeScript('window.scrollTo(0, window.innerHeight/2)');
    expect(element(by.css('.small-element.sn-viewport-in')).isPresent()).toBeTruthy();

    browser.executeScript('window.scrollTo(0,0)');
    expect(element(by.css('.small-element.sn-viewport-in')).isPresent()).toBeFalsy();
  });

  it('should run event handler `onScrollCollapseChange`', () => {
    browser.executeScript('window.scrollTo(0, window.innerHeight/2)');
    expect(element(by.css('.small-element.highlight')).isPresent()).toBeTruthy();

    browser.executeScript('window.scrollTo(0,0)');
    expect(element(by.css('.small-element.highlight')).isPresent()).toBeFalsy();
  });

  it('should add `scroll-collapse` class to large element', () => {
    browser.executeScript('window.scrollTo(0, window.innerHeight * 2)');
    expect(element(by.css('.large-element.sn-viewport-in')).isPresent()).toBeTruthy();

    browser.executeScript('window.scrollTo(0,0)');
    expect(element(by.css('.large-element.sn-viewport-in')).isPresent()).toBeFalsy();
  });

});

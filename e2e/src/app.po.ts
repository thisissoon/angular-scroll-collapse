import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  scrollTo(x: number = 0, y: number = 0) {
    browser.executeScript(`window.scrollTo(${x}, ${y})`);
    browser.sleep(100);
  }

  resize(width: number, height: number) {
    browser.driver
      .manage()
      .window()
      .setSize(width, height);
    browser.sleep(100);
  }

  getNavElement() {
    return element(by.css('.nav'));
  }

  getBarElement() {
    return element(by.css('.bar'));
  }

  getOffsetBarElement() {
    return element(by.css('.bar--offset'));
  }
}

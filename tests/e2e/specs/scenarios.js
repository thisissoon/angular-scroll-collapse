'use strict';

/* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

describe('sn.smartNav', function() {
  describe('snSmartNav directive', function() {

    var nav = {},
        secondNav = {};

    beforeEach(function(){
      browser.manage().deleteAllCookies();
      browser.get('http://127.0.0.1:8000/');
      browser.waitForAngular();
      browser.driver.sleep(2000);
      nav = element.all(by.css('nav.first')).first();
      secondNav = element.all(by.css('nav.second')).first();
    });

    it('should not contain any classes from smartNav directive', function() {
      browser.executeScript('scrollTo(0,0)');
      browser.driver.sleep(2000);
      expect(nav.getAttribute('class')).not.toContain('scrolling-down');
      expect(nav.getAttribute('class')).not.toContain('scrolling-up');
      expect(nav.getAttribute('class')).not.toContain('minimised-mode');
    });

    it('should add "scrolling-down" class', function() {
      expect(nav.getAttribute('class')).not.toContain('scrolling-down');
      browser.executeScript('scrollTo(0,100)');
      browser.executeScript('scrollTo(0,200)');
      browser.executeScript('scrollTo(0,300)');
      browser.driver.sleep(2000);
      expect(nav.getAttribute('class')).toContain('scrolling-down');
    });

    it('should add "scrolling-up" class', function() {
      browser.executeScript('scrollTo(0,400)');
      browser.driver.sleep(2000);
      expect(nav.getAttribute('class')).not.toContain('scrolling-up');

      browser.executeScript('scrollTo(0,300)');
      browser.executeScript('scrollTo(0,200)');
      browser.executeScript('scrollTo(0,100)');
      browser.driver.sleep(2000);
      expect(nav.getAttribute('class')).toContain('scrolling-up');
    });

    it('should add "minimised-mode" class', function() {
      browser.executeScript('scrollTo(0,0)');
      browser.driver.sleep(2000);
      expect(nav.getAttribute('class')).not.toContain('minimised-mode');

      browser.executeScript('scrollTo(0,100)');
      browser.executeScript('scrollTo(0,200)');
      browser.executeScript('scrollTo(0,300)');
      browser.driver.sleep(2000);
      expect(nav.getAttribute('class')).toContain('minimised-mode');
    });

    it('should add "affix" class', function() {
      browser.executeScript('scrollTo(0,0)');
      browser.driver.sleep(2000);
      expect(secondNav.getAttribute('class')).not.toContain('affix');

      browser.executeScript('scrollTo(0,100)');
      browser.executeScript('scrollTo(0,200)');
      browser.driver.sleep(2000);
      expect(secondNav.getAttribute('class')).toContain('affix');

      browser.executeScript('scrollTo(0,300)');
      browser.driver.sleep(2000);
      expect(secondNav.getAttribute('class')).toContain('affix');
    });

  });
});

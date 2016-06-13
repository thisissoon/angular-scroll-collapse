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
      expect(nav.getAttribute('class')).not.toContain('sn-nav-scrolling-down');
      expect(nav.getAttribute('class')).not.toContain('sn-nav-scrolling-up');
      expect(nav.getAttribute('class')).not.toContain('sn-nav-minimise');
    });

    it('should add "sn-nav-scrolling-down" class', function() {
      expect(nav.getAttribute('class')).not.toContain('sn-nav-scrolling-down');
      browser.executeScript('scrollTo(0,100)');
      browser.executeScript('scrollTo(0,200)');
      browser.executeScript('scrollTo(0,300)');
      browser.driver.sleep(2000);
      expect(nav.getAttribute('class')).toContain('sn-nav-scrolling-down');
    });

    it('should add "sn-nav-scrolling-up" class', function() {
      browser.executeScript('scrollTo(0,400)');
      browser.driver.sleep(2000);
      expect(nav.getAttribute('class')).not.toContain('sn-nav-scrolling-up');

      browser.executeScript('scrollTo(0,300)');
      browser.executeScript('scrollTo(0,200)');
      browser.executeScript('scrollTo(0,100)');
      browser.driver.sleep(2000);
      expect(nav.getAttribute('class')).toContain('sn-nav-scrolling-up');
    });

    it('should add "sn-nav-minimised-mode" class', function() {
      browser.executeScript('scrollTo(0,0)');
      browser.driver.sleep(2000);
      expect(nav.getAttribute('class')).not.toContain('sn-nav-minimise');

      browser.executeScript('scrollTo(0,100)');
      browser.executeScript('scrollTo(0,200)');
      browser.executeScript('scrollTo(0,300)');
      browser.driver.sleep(2000);
      expect(nav.getAttribute('class')).toContain('sn-nav-minimise');
    });

    it('should add "sn-nav-affix" class', function() {
      browser.executeScript('scrollTo(0,0)');
      browser.driver.sleep(2000);
      expect(secondNav.getAttribute('class')).not.toContain('sn-nav-affix');

      browser.executeScript('scrollTo(0,100)');
      browser.executeScript('scrollTo(0,200)');
      browser.driver.sleep(2000);
      expect(secondNav.getAttribute('class')).toContain('sn-nav-affix');

      browser.executeScript('scrollTo(0,300)');
      browser.driver.sleep(2000);
      expect(secondNav.getAttribute('class')).toContain('sn-nav-affix');

      browser.executeScript('scrollTo(0,0)');
      browser.driver.sleep(2000);
      expect(secondNav.getAttribute('class')).not.toContain('sn-nav-affix');

    });

  });
});

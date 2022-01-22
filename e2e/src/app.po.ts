import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  navigateToURL(suburl): Promise<unknown> {
    return browser.get(browser.baseUrl + suburl) as Promise<unknown>;
  }

  clickButtonWithId(id) {
    return element(by.id(id)).click() as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.id('app-title')).getText() as Promise<string>;
  }
}
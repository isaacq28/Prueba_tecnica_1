import { Page, Locator } from '@playwright/test';

export class DatePickerPage {
  readonly page: Page;
  readonly iframeLocator: Locator;
  readonly dateInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.iframeLocator = page.frameLocator('.demo-frame');
    this.dateInput = this.iframeLocator.locator('#datepicker');
  }

  async open() {
    await this.page.goto('https://jqueryui.com/datepicker/');
  }

  async clickDateInput() {
    await this.dateInput.click();
  }

  async selectDay(day: string) {
    await this.iframeLocator.locator(`.ui-datepicker-calendar td >> text="${day}"`).click();
  }

  async goToNextMonth() {
    await this.iframeLocator.locator('.ui-datepicker-next').click();
  }

  async getInputValue() {
    return await this.dateInput.inputValue();
  }

  async tryToTypeDate(date: string) {
    await this.dateInput.fill(date);
  }
}

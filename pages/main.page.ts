import { Locator, Page } from '@playwright/test';

export class MainPage {
    readonly dzenBlock: Locator;
    readonly page: Page;
    readonly videoMenuButton: Locator;
    readonly avatarButton: Locator;
    readonly descriptionTitle: Locator;
    readonly cardTitle: Locator;
    readonly subscribeButton: Locator;
    readonly notActiveVideoIcon: Locator;
    readonly activeVideoIcon: Locator;

    constructor(page: Page) {
        this.page = page;
        this.dzenBlock = page.locator('//*[@aria-label="Лента Дзена"]');
        this.videoMenuButton = page.locator('[class*=navigation] [href=\'/video\']');
        this.avatarButton = page.locator('//*[contains(@class,"feed__item")]//article[1]//div[starts-with(@class, "avatar")]');
        this.descriptionTitle = page.locator('//*[contains(@class,"feed__item")]//article[1]//div[starts-with(@class, "card-part-description")]');
        this.cardTitle = page.locator('//*[contains(@class,"feed__item")]//article[1]//div[starts-with(@class, "card-part-title")]');
        this.subscribeButton = page.locator('//*[contains(@class,"feed__item")]//article[1]//div[starts-with(@class, "subscribe-button")]/button');
        this.notActiveVideoIcon = page.locator('//*[name()=\'use\' and @*=\'#video_showcase_acf7--inline\']');
        this.activeVideoIcon = page.locator('//*[name()=\'use\' and @*=\'#video_showcase_filled_f7a7--inline\']');
    }
}
import { Locator, Page } from '@playwright/test';

export class MainPage {
    readonly videoBlock: Locator;
    readonly page: Page;
    readonly videoMenuButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.videoBlock = page.locator('[class*=floor-card-video-block]');
        this.videoMenuButton = page.locator('[class*=navigation] [href=\'/video\']');
    }
}
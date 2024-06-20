import { Locator, Page } from '@playwright/test';

export class VideoWatchPage {
    readonly page: Page;
    readonly fullscreenToggle: Locator;
    readonly video: Locator;
    readonly subscribeButton: Locator;


    constructor(page: Page) {
        this.page = page;
        // this.fullscreenToggle = page.locator('button[class*=fullscreen-toggle]');
        this.fullscreenToggle = page.locator('//*[@data-testid="timeline-clickable-zone"]');
        this.video = page.locator('[class*=video-section]');
        this.subscribeButton = page.locator('[class*=videoViewerItemInfo] button');
    }
}
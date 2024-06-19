import { Locator, Page } from '@playwright/test';

export class VideoWatchPage {
    readonly page: Page;
    readonly fullscreenToggle: Locator;
    readonly video: Locator;


    constructor(page: Page) {
        this.page = page;
        this.fullscreenToggle = page.locator('button[class*=fullscreen-toggle]');
        this.video = page.locator('zen-ui-video-video-player__control-toggle');
    }
}
import { Locator, Page } from '@playwright/test';

export class VideoPage {
    readonly page: Page;
    readonly searchField: Locator;
    readonly activeMenuTitle: Locator;
    readonly openVideoButton: Locator;
    readonly activeMenuButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchField = page.locator('input[class*=search]');
        this.activeMenuTitle = page.locator('[class*=search] [class*=Active] span');
        this.openVideoButton = page.locator('#zen-row-0');
        this.activeMenuButton = page.locator('[class*=isActive]');
    }
}
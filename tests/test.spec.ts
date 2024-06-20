import { test, expect } from '@playwright/test';
import {MainPage} from "../pages/main.page";
import {VideoPage} from "../pages/video.page";
import {VideoWatchPage} from "../pages/videoWatch.page";

test('Check dzen video', async ({ page }) => {
    const mainPage = new MainPage(page);
    const videoPage = new VideoPage(page);
    await page.goto('https://dzen.ru/');
    await mainPage.videoBlock.scrollIntoViewIfNeeded();
    await expect(mainPage.avatarButton.first()).toBeVisible();
    await expect(mainPage.descriptionTitle).toBeVisible();
    await expect(mainPage.cardTitle.first()).toBeVisible();
    await mainPage.subscribeButton.first().hover({force: true});
    await expect(mainPage.subscribeButton.first()).toBeVisible();


    await mainPage.videoMenuButton.click();
    await expect(videoPage.activeMenuButton).toHaveText('Видео');
    //check logo

    //await expect(videoPage.searchField).toBeVisible();
    await videoPage.searchField.click();
    await videoPage.searchField.fill('Синий трактор');
    await page.keyboard.press('Enter');
    await expect(videoPage.activeMenuTitle).toContainText('Видео и ролики');
    await videoPage.openVideoButton.isVisible()
    await videoPage.openVideoButton.click()
    let popup = await videoPage.page.waitForEvent("popup");
    await popup.waitForLoadState('load')
    const videoWatchPage = new VideoWatchPage(popup);

    await videoWatchPage.video.waitFor({state: 'visible'})
    await videoWatchPage.video.hover()
    await videoWatchPage.fullscreenToggle.waitFor({state: 'visible'})
    await videoWatchPage.fullscreenToggle.waitFor({state: 'hidden'})
    await videoWatchPage.video.dblclick({force: true})
    expect((await videoWatchPage.video.boundingBox()).width).toBe(videoWatchPage.page.viewportSize().width)
});


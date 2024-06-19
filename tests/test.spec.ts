import { test, expect } from '@playwright/test';
import {MainPage} from "../pages/main.page";
import {VideoPage} from "../pages/video.page";
import {VideoWatchPage} from "../pages/videoWatch.page";

test('Check dzen video', async ({ page }) => {
    const mainPage = new MainPage(page);
    const videoPage = new VideoPage(page);
    const videoWatchPage = new VideoWatchPage(page);
    await page.goto('https://dzen.ru/');
    await mainPage.videoBlock.hover();
    await expect(mainPage.videoBlock).toContainText('Видео');
// check video
    await mainPage.videoMenuButton.click();
    await videoPage.searchField.isVisible();
    await videoPage.searchField.click();
    await videoPage.searchField.fill('Синий трактор');
    await page.keyboard.press('Enter');
   // await expect(videoPage.activeMenuTitle).toContainText('Видео и ролики');
    await videoPage.openVideoButton.isVisible()
    await videoPage.openVideoButton.click()
    await videoWatchPage.video.click();
    await videoWatchPage.fullscreenToggle.click();
});


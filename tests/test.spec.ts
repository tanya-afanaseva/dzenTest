import { test, expect } from '@playwright/test';
import {MainPage} from "../pages/main.page";
import {VideoPage} from "../pages/video.page";
import {VideoWatchPage} from "../pages/videoWatch.page";
import {allure} from "allure-playwright";
import {dzenData} from "../data";

const data = dzenData;

test.describe('Check dzen.ru', async () => {

    test.beforeEach(async ({page}) => {
        await page.goto(data.urls.baseUrl);
    });

    test('Check dzen main page', async ({ page }) => {
        const mainPage = new MainPage(page);
        await allure.step(`Check elements display`, async () => {
            await mainPage.dzenBlock.scrollIntoViewIfNeeded();
            await expect(mainPage.avatarButton.first()).toBeVisible();
            await expect(mainPage.descriptionTitle).toBeVisible();
            await expect(mainPage.cardTitle.first()).toBeVisible();
        });

        await allure.step(`Check subscribe button display`, async () => {
            await mainPage.subscribeButton.first().hover({force: true});
            await expect(mainPage.subscribeButton.first()).toBeVisible();
        });

    });

    test('Check dzen video page', async ({ page }) => {
        const mainPage = new MainPage(page);
        const videoPage = new VideoPage(page);
        await allure.step(`Check jump to video page`, async () => {
            await mainPage.notActiveVideoIcon.waitFor({state: 'visible'});
            await mainPage.activeVideoIcon.waitFor({state: 'hidden'});
            await mainPage.videoMenuButton.click();
            await videoPage.searchField.waitFor({state: 'visible'})
            await expect(videoPage.activeMenuButton).toHaveText(data.texts.menuVideo);
            await mainPage.notActiveVideoIcon.waitFor({state: 'hidden'});
            await mainPage.activeVideoIcon.waitFor({state: 'visible'});
        });

        await allure.step(`Check search video`, async () => {
            await videoPage.searchField.waitFor({state: 'visible'})
            await videoPage.searchField.click();
            await videoPage.searchField.fill(data.texts.searchBlueTractor);
            await page.keyboard.press(data.buttons.enter);
            await expect(videoPage.activeMenuTitle).toContainText(data.texts.videoAndClips);
            await videoPage.openVideoButton.isVisible()
        });

        await allure.step(`Check open and play video`, async () => {
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
    });
});


#! /usr/bin/env node

const puppeteer = require("puppeteer-core");

async function run() {
  // 1.打开浏览器
  const browser = await puppeteer.launch({
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", //本地浏览器地址
    headless: false, //打开浏览器
    defaultViewport: null, //全屏
  });

  const page = await browser.newPage();
  //   获取开始时间戳
  const startTime = performance.now();

  await page.goto("http://192.168.2.114:3002/login");

  console.log("页面打开时间", performance.now() - startTime);

  //   获取浏览器加载时间
  const timing = JSON.parse(
    await page.evaluate(() => {
      return JSON.stringify(window.performance.timing);
    })
  );

  //   1.页面dom渲染时间，等待输入框渲染完毕
  await page.waitForSelector(".login");
  console.log("页面dom渲染时间", performance.now() - startTime);

  //   2.链表操作,都是异步，操作也要等待
  const username = await page.waitForSelector("#basic_username");
  const password = await page.waitForSelector("#basic_password");

  await username.type("sxgzqx");
  await password.type("sxgzqx@123456");

  const loginButton = await page.$("#loginButton");
  await loginButton.click();

  //   等待页面跳转完成
  await page.waitForNavigation();

  console.log("登录完成时间", performance.now() - startTime);

  //   浏览器关掉
  await browser.close();
}

run();

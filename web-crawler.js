/*
 * @Author: tianxun@https://gitee.com/fummmi
 * @Date: 2024-06-03 16:46:58
 * @Description: Do not edit
 * @LastEditors: fumi 330696896@qq.com
 * @LastEditTime: 2024-06-03 17:00:04
 * @FilePath: \speedTest\web-crawler.js
 */
const puppeteer = require("puppeteer-core");
const fs = require("fs");

async function run() {
  // 1.打开浏览器
  const browser = await puppeteer.launch({
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", //本地浏览器地址
    headless: false, //打开浏览器
    defaultViewport: null, //全屏
    userDataDir: "./data",
  });

  const page = await browser.newPage();

  await page.goto(
    "https://www.bilibili.com/v/popular/rank/bangumi/?from_spmid=666.4.hotlist.more"
  );

  const titles = await page.$$eval(
    ".rank-list .rank-item .content .info .title",
    (links) => links.map((x) => x.innerHTML)
  );
  console.log(titles);

  //   将爬虫数据写入文件
  fs.writeFile("data.json", JSON.stringify(titles, null, "\t"), function (err) {
    if (err) {
      console.log(err);
    }
  });
}

run();

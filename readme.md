# 自动化测试

1. pnpm i puppeteer-core , 安装 puppeteer-core 依赖更小点。

2. 获取 dom 渲染完成时间,通过 page.waitForSelector(".login") ,即可等待该元素出现。

3. 通过 page.waitForSelector("#basic_username") 获取输入框，type 输入账号密码，loginButton.click()即可登录

4. await page.waitForNavigation(), 等待页面跳转，即可测试链式操作的所属于时间

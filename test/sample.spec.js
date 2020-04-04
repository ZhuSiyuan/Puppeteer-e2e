/*
 * Date: 2020/04/03
 * Author: zhusiyuan@stu.xjtu.edu.cn
 * Github: https://github.com/ZhuSiyuan
 */

/********************************************
Usage:
$ npm install
$ npm test

> puppeteer-demo@1.0.0 test /path/to/e2e-demo
> mocha test/bootstrap.js --recursive test --timeout 10000

  test my todo list
    ✓ should new todo correct (2527ms)
    ✓ should render todo correct
    ✓ should complete todo correct (105ms)
    ✓ should delete todo correct (151ms)

  4 passing (4s)
 *********************************************/

describe('test my todo list', function () {
    let page;
    let todoList;
    let todoListLength;

    before (async function () {
      page = await browser.newPage();
      await page.goto('http://127.0.0.1:7001/');
    });
  
    after (async function () {
      await page.close();
    });
    
    // 添加新的待办事项
    it('should new todo correct', async function() {
      // 先添加一个 todo item
      await page.click('#new-todo', {delay: 500}); // 点击输入框
      await page.type('#new-todo', 'new todo item', {delay: 50}); // 输入字符串“new todo item”
      await page.keyboard.press("Enter"); // 模拟回车按键，提交输入

      // 再添加一个 new todo item
      await page.click('#new-todo', {delay: 500}); // 点击输入框
      await page.type('#new-todo', 'new todo item', {delay: 50}); // 输入字符串“new todo item”
      await page.keyboard.press("Enter"); // 模拟回车按键，提交输入
      todoList = await page.waitFor('#todo-list'); // 获取 todoList
      const expectInputContent = await page.evaluate(todoList => todoList.lastChild.querySelector('label').textContent, todoList); // 获取 todoList 的最后一项的内容信息
      expect(expectInputContent).to.eql('new todo item'); // 其内容信息应为之前输入的“new todo item”
    }) 

    // 渲染所有待办事项
    it('should render todo correct', async function() {
      todoListLength = await page.$eval('#todo-list', todoList => todoList.children.length); // 获取 todoList 的 length
      expect(todoListLength).to.eql(2); // length 应为 2
    })

    // 已完成待办事项
    it('should complete todo correct', async function() {
      await page.click('#todo-list li:nth-last-child(1) input'); // 点击最后一个 li 的 已完成按钮
      await page.reload(); // 刷新页面
      let status = await page.$eval('#todo-list li:nth-last-child(1)', li => li.className); // 获取这个 li 的 className
      expect(status).to.eql('completed'); // className 应变成 completed
    })

    // 删除事项
    it('should delete todo correct', async function() {
      await page.hover('#todo-list li:nth-last-child(1)'); // 鼠标悬浮到 todoList 的 li 上
      await page.click('#todo-list li:nth-last-child(1) button'); // 点击删除的 li 的 button

      await page.reload(); // 刷新页面
      let todoListLengthAfterDelete = await page.$eval('#todo-list', todoList => todoList.children.length); // 获取 todoList 的 length
      expect(todoListLength - todoListLengthAfterDelete).to.eql(1); // 删除待办事项后，新的 todoList 的长度应为 删除前的 todoList 的长度 - 1

      // // 把剩下的那个 todo li 也删干净
      await page.hover('#todo-list li:nth-last-child(1)'); // 鼠标悬浮到 todoList 的 li 上
      await page.click('#todo-list li:nth-last-child(1) button'); // 点击删除的 li 的 button
    }) 

  });
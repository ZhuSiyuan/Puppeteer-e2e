# Puppeteer-e2e

### Usage:

First, start the "todo" server.

```bash
$ git clone https://github.com/koajs/todo.git
$ npm install
$ npm start
```

Second, test it.

```bash
$ git clone https://github.com/ZhuSiyuan/Puppeteer-e2e.git
$ npm install
$ npm test

> puppeteer-demo@1.0.0 test /path/to/Puppeteer-e2e
> mocha test/bootstrap.js --recursive test --timeout 10000

  test my todo list
    ✓ should new todo correct (2527ms)
    ✓ should render todo correct
    ✓ should complete todo correct (105ms)
    ✓ should delete todo correct (151ms)

  4 passing (4s)
```

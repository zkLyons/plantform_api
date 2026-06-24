const n=`---\r
title: 异步调用方式\r
sidebar_label: 异步调用\r
description: "Callback、Promise.then、async/await 三种异步调用方式详解"\r
---\r
\r
DigitalTwinAPI 的大部分接口是异步的，调用后需要等待服务端响应才能拿到结果。SDK 同时支持以下三种方式，**在同一个函数体内只能选择其中一种，不能混用**。\r
\r
---\r
\r
## 方式一：Callback 回调函数\r
\r
最基础的方式，逻辑简单易理解。当链式调用较多时，嵌套层级增加，可读性下降。\r
\r
\`\`\`js\r
fdapi.tag.delete('tag1', function () {\r
  fdapi.camera.get(function (cam) {\r
    let o = new TagData('tag1');\r
    o.coordinate = [cam.x, cam.y, 25.4];\r
    o.imagePath = '@path:/img/tutorials/tag.png';\r
    o.imageSize = [28, 28];\r
    o.text = '北京银行';\r
    o.showLine = true;\r
    fdapi.tag.add(o, function () {\r
      fdapi.tag.focus(o.id, 500, 0.2, function () {\r
        log('Test Finished.');\r
      }); // focus\r
    }); // add\r
  }); // get\r
}); // delete\r
\`\`\`\r
\r
---\r
\r
## 方式二：Promise then 链\r
\r
通过 \`.then()\` 解决回调嵌套，可读性优于回调方式。\r
\r
\`\`\`js\r
fdapi.tag.delete('tag1')\r
  .then(() => fdapi.camera.get())\r
  .then((cam) => {\r
    let o = new TagData('tag1');\r
    o.coordinate = [cam.x, cam.y, 25.4];\r
    o.imagePath = '@path:/img/tutorials/tag.png';\r
    o.imageSize = [28, 28];\r
    o.text = '北京银行';\r
    o.showLine = true;\r
    return fdapi.tag.add(o);\r
  })\r
  .then(() => fdapi.tag.focus('tag1', 500, 0.2))\r
  .then(() => {\r
    log('Test Finished.');\r
  });\r
\`\`\`\r
\r
---\r
\r
## 方式三：async/await（推荐）\r
\r
\`async/await\` 是 then 链的语法糖，可读性最高，推荐在新代码中使用。\r
\r
\`\`\`js\r
async function example() {\r
  await fdapi.tag.delete('tag1');\r
\r
  const cam = await fdapi.camera.get();\r
\r
  let o = new TagData('tag1');\r
  o.coordinate = [cam.x, cam.y, 25.4];\r
  o.imagePath = '@path:/img/tutorials/tag.png';\r
  o.imageSize = [28, 28];\r
  o.text = '北京银行';\r
  o.showLine = true;\r
\r
  await fdapi.tag.add(o);\r
  await fdapi.tag.focus(o.id, 500, 0.2);\r
\r
  log('Test Finished.');\r
}\r
\`\`\`\r
\r
---\r
\r
## 不使用异步的后果\r
\r
去掉异步等待后，多个请求会**并发发出**，服务端响应顺序不保证，后续操作可能拿到 \`undefined\`：\r
\r
\`\`\`js\r
// ❌ 错误示例：cam 是 Promise 对象，不是相机数据\r
fdapi.tag.delete('tag1');\r
const cam = fdapi.camera.get();  // 返回 Promise，不是结果\r
const o = new TagData('tag1');\r
o.coordinate = [cam.x, cam.y, 25.4];  // cam.x === undefined！\r
\`\`\`\r
\r
:::warning\r
异步接口的返回值是 \`Promise\`，不是直接结果。不加 \`await\` 或回调就取值，会得到 \`undefined\`。\r
:::\r
`;export{n as default};

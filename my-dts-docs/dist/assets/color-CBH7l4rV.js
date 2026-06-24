const r=`---\r
title: 颜色与 Color 对象\r
sidebar_label: 颜色系统\r
description: "DTS SDK 中颜色值的表示方式和使用方法"\r
---\r
\r
### 关于颜色参数格式的说明\r
\r
若需设置透明度时请使用数组类型参数。\r
\r
目前支持以下四种格式：\r
\r
\`\`\`js\r
// 1. 常量颜色（使用 Color 内置常量）\r
var constColor = Color.Red;\r
\r
// 2. RGB 字符串\r
var rgbColor = 'RGB(255, 255, 255)';\r
\r
// 3. 十六进制字符串\r
var hexColor = '#FFFEEE';\r
\r
// 4. 数组格式（支持透明度，值域 0~1）\r
// [R, G, B, A]  A=1 不透明，A=0 全透明\r
var colorArr = [0.5, 0.5, 0.5, 1];\r
var colorWithAlpha = [1, 0, 0, 0.5]; // 半透明红色\r
\`\`\`\r
\r
:::tip\r
需要设置透明度时，**必须使用数组格式**，其他格式不支持 Alpha 通道。\r
:::\r
\r
#### Color 内置常量示例\r
\r
\`\`\`js\r
Color.Red       // 红\r
Color.Green     // 绿\r
Color.Blue      // 蓝\r
Color.White     // 白\r
Color.Black     // 黑\r
Color.Yellow    // 黄\r
Color.Cyan      // 青\r
Color.Magenta   // 品红\r
\`\`\`\r
\r
#### 与 API 配合使用\r
\r
\`\`\`js\r
// 设置多边形填充色（半透明蓝色）\r
fdapi.polygon.add({\r
  id: 'poly_001',\r
  coordinate: [...],\r
  fillColor: [0, 0.5, 1, 0.6],\r
  outlineColor: '#00AAFF',\r
});\r
\`\`\`\r
`;export{r as default};

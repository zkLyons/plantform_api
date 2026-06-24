const r=`---\r
title: 相机控制教程\r
sidebar_label: 相机控制\r
description: "详细介绍相机飞行定位、环绕、导览、视角锁定等常见场景"\r
---\r
\r
### 二次开发中关于设置相机位置的几种方式\r
\r
在int.html页面中点击Camera Get可以看到输出信息如下：\r
\r
我们可以通过三种参数形式来调用camera.set方法\r
\r
ReuqestCamera\r
\r
#### 方式一：普通方式\r
\r
这是最常见的调用方式，代码如下：\r
\r
\`\`\`js\r
function test_camera_set() { //参数：x, y, z, pitch, yaw, flyTime fdapi.camera.set(492035.37, 2488806.75, 402.62, -15.0, -173.0, 0.2); }\r
\`\`\`\r
\r
#### 方式二：通过Object参数的形式\r
\r
可以直接复制camera.get的输出\r
\r
\`\`\`js\r
function test_camera_set_byObject() { let cam = { "x": 490088.281250, "y": 2485978.750000, "z": 1031.461914, "pitch": -39.462357, "yaw": -152.668823, "roll": 0.0 //该参数无用，会自动忽略 } fdapi.camera.set(cam, 0.2); }\r
\`\`\`\r
\r
#### 方式三：通过Array参数的形式\r
\r
可以直接复制camera.get输出里的camera数组来设置\r
\r
\`\`\`js\r
function test_camera_set_byArray() { //最后一个元素无用，会忽略 let cam = [488586.843750, 2486889.750000, 713.141602, -36.353725, -124.556442, -0.000004]; fdapi.camera.set(cam, 0.2); }\r
\`\`\`\r
\r
`;export{r as default};

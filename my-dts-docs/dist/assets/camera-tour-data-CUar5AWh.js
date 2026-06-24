const r=`---\r
title: CameraTourData\r
sidebar_label: CameraTourData\r
description: "CameraTourData 是相机导览（漫游）的数据描述对象，封装一条飞行路线的 ID、名称与关键帧数组，作为 CameraTour 播放的数据载体。"\r
---\r
\r
# CameraTourData\r
\r
CameraTourData 是相机导览（漫游）的数据描述对象，封装一条飞行路线的 ID、名称与关键帧数组，作为 CameraTour 播放的数据载体。\r
\r
## 业务场景 Skill\r
\r
> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。\r
\r
- **功能介绍**：CameraTourData 是相机导览（漫游）的数据描述对象，封装一条飞行路线的 ID、名称与关键帧数组，作为 CameraTour 播放的数据载体。\r
- **别名 / 不同行业叫法**：漫游数据 / 导览数据 / 巡游路线数据 / 飞行路线配置 / 关键帧动画数据。\r
- **适用行业**：展厅汇报、智慧城市、智慧园区、智慧交通、能源、应急指挥。\r
- **使用场景**：\r
  - 预先编排好一条城市/园区巡游路线并保存复用。\r
  - 为不同汇报主题维护多条命名漫游路线，按需切换播放。\r
  - 将外部规划的路径数据组装成关键帧数组生成漫游。\r
- **注意事项**：\r
  - ID 需唯一，避免与已有漫游冲突导致覆盖或播放异常。\r
  - keyFrames 内关键帧的 index 与 time 应递增有序，保证动画连贯。\r
  - 本对象仅为数据结构，需配合 CameraTour 的 add/play 才能生效。\r
\r
## 构造函数\r
\r
\`\`\`js\r
new CameraTourData(id, name, keyFrames)\r
\`\`\`\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 字符串类型的ID `;export{r as default};

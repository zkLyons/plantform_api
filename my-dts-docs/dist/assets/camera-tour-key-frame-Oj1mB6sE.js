const r=`---\r
title: CameraTourKeyFrame\r
sidebar_label: CameraTourKeyFrame\r
description: "CameraTourKeyFrame 是相机导览（漫游）的单个关键帧，描述某一时刻相机的到达时间、位置坐标与可选朝向，是构成飞行路线动画的最小单元。"\r
---\r
\r
# CameraTourKeyFrame\r
\r
CameraTourKeyFrame 是相机导览（漫游）的单个关键帧，描述某一时刻相机的到达时间、位置坐标与可选朝向，是构成飞行路线动画的最小单元。\r
\r
## 业务场景 Skill\r
\r
> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。\r
\r
- **功能介绍**：CameraTourKeyFrame 是相机导览（漫游）的单个关键帧，描述某一时刻相机的到达时间、位置坐标与可选朝向，是构成飞行路线动画的最小单元。\r
- **别名 / 不同行业叫法**：关键帧 / 漫游节点 / 路径点 / 飞行节点 / 机位帧。\r
- **适用行业**：展厅汇报、智慧城市、智慧园区、智慧交通、能源、应急指挥。\r
- **使用场景**：\r
  - 逐点设置巡游路线上的停留位置与视角，形成讲解动线。\r
  - 通过 time 控制各段飞行节奏，实现快进概览或慢速聚焦。\r
  - 不传朝向时由系统按相邻位置自动计算朝向，快速生成顺滑路径。\r
- **注意事项**：\r
  - 位置坐标须与工程坐标系一致，否则飞行轨迹偏移。\r
  - index 与 time 应在同一路线内有序递增，避免动画跳变。\r
  - rotation 为可选项；显式指定可获得更精准的视角控制。\r
\r
## 构造函数\r
\r
\`\`\`js\r
new CameraTourKeyFrame(index, time, location, rotation)\r
\`\`\`\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`index\` | \`number\` | 索引 |\r
| \`time\` | \`number\` | 帧播放抵达时间，单位：秒 |\r
| \`location\` | \`array\` | 关键帧位置坐标：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(float)，取值范围：[任意数值] |\r
| \`rotation\` | \`array\` | 可选参数，关键帧相`;export{r as default};

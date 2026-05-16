---
title: 利用Prompt生成酷炫网页工作流
date: 2026-05-01
category: 工具推荐
tags: [Prompt, AI, 网页设计]
---

AI快速生成审美高级的网页方法

目标：通过优质参考网站获取精准Prompt，借助AI工具快速生成审美高级的网页，高效完成网页制作。

总结：找对参考、抄对Prompt、选对AI工具

### Step 1：找参考网站，筛选适配Prompt

根据网页风格需求（如电影感、玻璃态、极简、SaaS官网），从参考网站中，找到对应风格的Prompt
##### 常用网址：
1. **Motionsites.ai**
    
    [https://motionsites.ai/](https://motionsites.ai/)

    网页 / 落地页专用 Prompt 库。
    
2. **DesignPrompts**
    
    [https://www.designprompts.dev/](https://www.designprompts.dev/)
    
    网页 / UI 风格库。
    
3. **UIPrompt（中文）**
    
    [https://uiprompt.art/](https://uiprompt.art/)
    
    中文 UI / 网页提示词，按风格分类。
    
4. **Claude Design（直接生成）**
    
    [https://claude.ai/design](https://claude.ai/design)
    
    不用找 Prompt，直接输需求。

### Step 2：复制Prompt，微调适配需求

1. 从参考网站复制目标Prompt，粘贴到文本编辑器；

2. 简单微调3个核心点，提升生成精准度：

- 补充技术栈；

- 明确风格细节：补充配色（如HSL色值）、字体、动效；

- 调整页面结构和内容：补充需要的模块（如背景、导航栏、Hero区），修改文字。

示例：在复制的Prompt末尾添加“使用React+Vite+TS+Tailwind CSS+shadcn/ui，配色为深海蓝（hsl(201,100%,13%)）、白色文字，字体用Instrument Serif（标题）和Inter（正文），包含全屏循环视频背景和玻璃态导航栏”。

### Step 3：用AI工具生成网页，简单迭代优化

1. AI生成后优化： 通用大模型使用微调后的Prompt生成代码。

2. 根据实际需求迭代代码：

3. 最终输出：生成可正常运行的网页。
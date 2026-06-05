---
title: JS - DOM
date: 2026-01-26
category: 前端开发
tags: [JavaScript]
---

**DOM** （ Document Object Model），文档对象模型，是浏览器将 HTML 文档解析成的**树形对象结构**， 是JS 操作网页的接口，可以将网页转为一个JS对象。

## 1. 核心概念

- JS 通过 DOM **增删改查**页面元素、样式、事件
- DOM树：文档的树形结构
- 节点（node）：DOM的最小组成单位
- 把整个 HTML 页面看作**一棵树**：文档 → 根节点 → 元素节点、文本节点、属性节点
## 2. 常见节点类型

- **文档节点（Document）**：
    - nodeType = 9
    - 代表整个 HTML 文档，文档树的顶层节点，根节点：`document`
- **元素节点（Element）**
    - nodeType = 1
    - HTML 标签：`<div>`、`<p>`、`<body>` 等
- **属性节点（Attribute）**
    - nodeType = 2
    - 元素的属性：`id`、`class`、`src` 等（比如`class='right'`）
- **文本节点（Text）**
    - nodeType = 3
    - 标签内的纯文本（含空格、换行）
- **注释节点（Comment）**
    - nodeType = 8
    - `<!-- 注释内容 -->`
- **文档类型节点（DocumentType）**
    - nodeType = 10
	- doctype标签：`<!DOCTYPE html>`
- **文档片段节点（DocumentFragment）**
    - nodeType = 11
    - 轻量级容器，用于批量操作节点，不渲染

## 3. 常用 API
- 选取元素后做增删改查等操作
### 选取元素

```javascript
document.getElementById('id')          // 按id选（单个元素）
document.getElementsByClassName('cls')  // 按class属性（返回集合）
document.getElementsByTagName('div')   // 按标签名（返回集合），传入*返回文档所有元素
document.getElementsByName("username") //按name属性（返回集合），用在表单，单选复选框
document.querySelector('.box')         // 按css（单个元素，默认第一个）
document.querySelectorAll('.item')     // 按css（多个元素，返回集合）
```

### 操作内容 

```javascript
let ele = document.getElementById('box')
ele.innerText = '我是文字'  // 纯文本
ele.innerHTML = "<h1>你好</h1>" // 操作元素内部的 HTML 代码，innerHTML可以识别标签，innerText会把标签识别为字符串
```
### 操作属性
```javascript

img.setAttribute('src', 'logo.png'); // 设置属性
ele.getAttribute('name')      // 获取属性

ele.className // 获取所有class（返回字符串）
ele.className = 'box' // 覆盖class，可有多个，ele.className ='box active'
ele.classList.add('active')  // 增加一个class
ele.classList.remove('active') // 删除一个class 
ele.classList.toggle('active') // 切换：有就删，没有就加 
ele.classList.contains('active')// 判断：有没有这个class（返回true/false）
```
### 操作css行内样式

```js
let box = document.querySelector('.box')

//1.setAttribute，style.cssText会覆盖元素之前所有的行内样式，不推荐
box.setAttribute('style', 'color:red; font-size:20px;');
box.style.cssText = "width: 200px; height: 200px; background: red; color: white;";

//2.直接修改元素的 style 属性 元素.style.样式名 = '值'
// 背景色
box.style.backgroundColor = 'red'

// 字体大小
box.style.fontSize = '20px'

// 宽度、高度
box.style.width = '300px'
box.style.height = '300px'

// 边距、定位
box.style.marginTop = '10px'
box.style.position = 'absolute'
box.style.top = '50px'
box.style.left = '50px'

// 显示隐藏
box.style.display = 'none'
box.style.display = 'block'
```

### 创建 / 插入 / 删除元素

```javascript
let div = document.createElement('div') // 创建元素
	document.createTextNode('我是文本')  //创建文本
	document.createAttribute('class')   //创建属性，一般用setAttribute
	document.createXXX                  //创建各种节点
parent.appendChild(div)                 // 末尾插入
parent.insertBefore(div, target)       // 指定位置插入
parent.removeChild(div)                // 删除指定节点
```
### 获取元素位置

```javascript
// 1. 获取元素相对于【视口窗口】的位置（最常用）
let rect = ele.getBoundingClientRect();//获取元素在浏览器窗口里的位置和大小
rect.top;    // 顶部到视口顶部
rect.left;   // 左侧到视口左侧
rect.right;  // 右侧到视口左侧
rect.bottom; // 底部到视口顶部
rect.width;  // 元素宽度
rect.height; // 元素高度

// 2. 获取元素相对于【整个文档页面】的位置
let docTop = ele.getBoundingClientRect().top + window.scrollY;
let docLeft = ele.getBoundingClientRect().left + window.scrollX;

// 3. 获取元素【自身尺寸】
ele.clientWidth;   // 可视宽 = content + padding（不含border/滚动条）
ele.clientHeight;  // 可视高 = content + padding（不含border/滚动条）
ele.offsetWidth;   // 宽 = content + padding + border
ele.offsetHeight;  // 高 = content + padding + border

// 4. 获取元素相对于【定位父元素】的位置
ele.offsetTop;   // 距离最近定位父级的顶部距离
ele.offsetLeft;  // 距离最近定位父级的左侧距离

// 5. 获取页面滚动距离
window.scrollY;  // 页面垂直滚动距离
window.scrollX;  // 页面水平滚动距离

// 6. 元素已滚动的距离（可读可写） 
ele.scrollTop; // 垂直滚动距离（内容向上卷走的像素） 
ele.scrollLeft; // 水平滚动距离（内容向左卷走的像素） 

// 7. 元素内容总大小（不含滚动条，只读） 
ele.scrollHeight; // 内容完整高度（超出可视区域也算） 
ele.scrollWidth; // 内容完整宽度
```

## 4. 两种 DOM 模式

1. **原生 DOM**：浏览器标准 API，兼容性最好，操作**真实页面节点**，频繁操作性能低
2. **虚拟 DOM（Virtual DOM）**：React/Vue 等框架使用
    - 用 JS 对象模拟 DOM 结构，先操作 JS 对象，批量变更再渲染到页面
    - 对比新旧差异（diff），**最小化更新真实 DOM**，提升性能
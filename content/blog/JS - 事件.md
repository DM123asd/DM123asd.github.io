---
title: JS - 事件
date: 2026-01-21
category: 前端开发
tags: [JavaScript]
---

- 什么是 JS 事件？
	- **用户做动作 → 浏览器触发 → JS 监听并执行代码**
	- 例：点击、鼠标移动、按键、输入、提交表单…

---

## 一. 事件绑定方式
### 1. HTML 行内事件

直接在标签上写 `onxxx`，简单直观，但HTML和JS没有分开，不利于结构与行为分离。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>行内事件</title>
</head>
<body>
    <!-- 点击触发弹窗 -->
    <button onclick="clickFn()">点击我</button>

    <script>
        function clickFn() {
            console.log('触发行内点击事件');
        }
    </script>
</body>
</html>
```

### 2、DOM0 级事件（元素.on 事件）

最常用写法，**同一个元素同一事件只能绑定一个处理函数**，后写的会覆盖前者。HTML和JS分离。
```html
<body>
    <button id="btn">点击按钮</button>
    <input type="text" id="inp" placeholder="输入内容">

    <script>
        // 1. 点击事件
        const btn = document.getElementById('btn');
        btn.onclick = function(e) {
            console.log('点击了按钮');
            console.log('事件源：', e.target); // e 为事件对象
        };

        // 2. 表单输入事件
        const inp = document.getElementById('inp');
        inp.oninput = function() {
            console.log('实时输入：', this.value);
        };
    </script>
</body>
```

### 3、DOM2 级事件（addEventListener ）

支持**绑定多个同类型事件**，不会覆盖，还可控制冒泡 / 捕获，企业开发首选。
```html
<body>
    <button id="btn">多次点击</button>
    <div id="box">鼠标移入移出测试</div>

    <script>
        const btn = document.getElementById('btn');
        const box = document.getElementById('box');

        // 同一元素绑定多个 click 事件，依次执行
        btn.addEventListener('click', () => {
            alert('第一个点击事件');
        });
        btn.addEventListener('click', () => {
            alert('第二个点击事件');
        });

        // 鼠标移入/移出事件
        box.addEventListener('mouseover', () => {
            box.style.background = 'skyblue';
        });
        box.addEventListener('mouseout', () => {
            box.style.background = '#ccc';
        });
    </script>
</body>
```

### 4. 事件代理

- 利用**事件冒泡**，给父元素绑定事件，统一管理所有子元素：
- 当父元素里面有多个子元素的时候，使用事件代理可以不需要给每个子元素写各自的函数。把子节点的监听函数定义到父节点上，父节点的监听函数统一处理多个子节点的事件。

```html
<body>
    <ul id="list">
        <li>列表项1</li>
        <li>列表项2</li>
        <li>列表项3</li>
    </ul>

    <script>
        const list = document.getElementById('list');
        // 只给父元素绑定一个事件
        list.addEventListener('click', function(e) {
            // 判断触发事件的是不是 li（使用大写）
            if (e.target.tagName === 'LI') {
                console.log('点击了：', e.target.innerText);
            }
        });
    </script>
</body>
```



---

## 二、event 事件对象

- 事件触发时，浏览器自动传给函数的对象，包含所有事件信息。
### 事件信息
```js
btn.onclick = function(e){
  // e 就是事件对象
  console.log(e)           
  e.target       // 返回触发事件的元素，获得元素后可修改元素e.target.innerHTML=''
  e.type         // 事件类型 click
}
```
### 事件冒泡

**子元素触发事件 → 父元素也会触发 → 一直往上到 document**

```js
// 点儿子 → 先输出儿子，再输出爸爸
son.onclick = function(){
  console.log('儿子')
}

parent.onclick = function(){
  console.log('爸爸')
}
e.preventDefault() // 阻止默认行为，不如阻止点击链接后跳转浏览器的行为
e.stopPropagation() // 阻止冒泡，子元素和父元素嵌套的时候，阻止触发父元素
```
---

## 三、鼠标、键盘、表单事件

### 1.  鼠标事件
```js
ele.onclick        // 单击
ele.ondblclick     // 双击
ele.onmouseenter   // 鼠标进入元素自身时触发（进入子节点不触发）
ele.onmouseleave   // 鼠标离开元素自身时触发（离开自己进入子节点不触发）
ele.onmouseover    // 鼠标进入（冒泡）（进入自身 + 进入子元素 都会触发）
ele.onmouseout     // 鼠标离开（冒泡）（离开自身 + 离开子元素 都会触发）
ele.onmousemove    // 鼠标移动
ele.onmousedown    // 按下
ele.onmouseup      // 松开
ele.wheel          // 滚轮
```

- 鼠标位置（event ）

```js
e.clientX / e.clientY   // 相对于视口
e.pageX / e.pageY       // 相对于整个网页页面
e.offsetX / e.offsetY   // 相对于当前元素
```

---

### 2.  键盘事件

```js
let input = document.querySelector('input')
input.onkeydown    // 按键按下
input.onkeyup      // 按键松开
input.onkeypress   // 按住
```

- 常用属性

```js
e.key       // 按了哪个键 'Enter' 'a'
e.keyCode   // 键码（Enter=13），得到唯一标识

e.ctrlKey   // 是否按了ctrl
e.shiftKey  // 是否按了shift
e.altKey    // 是否按了alt
```
- 例：
```html
<input type="text" id="inp" placeholder="按回车试试">
<script>
  let inp = document.getElementById('inp');

  inp.onkeydown = function(e) {
    console.log('你按下的键编号：', e.keyCode);

    // 判断：如果按下的是 回车（keyCode = 13）
    if (e.keyCode === 13) {
      alert('你按了回车键！');
    }

    // 判断：如果按下的是 ESC（keyCode = 27）
    if (e.keyCode === 27) {
      alert('你按了ESC键！');
    }
  };
</script>
```

---
### 3.  表单事件
- **form 表单对象**
	指 `<form>` 标签本身，是**整个表单容器**，负责整体提交、重置、绑定 `submit`/`reset` 事件。

- **表单成员（表单控件）**
    是 form 内部的子元素，比如 `<input>`、`<select>`、`<textarea>`、`<button>` 等，用来录入、选择数据。

```js
let input = document.getElementById('input');
const form = document.getElementById('myForm');
input.onfocus      // 获得焦点
input.onblur       // 失去焦点
input.oninput      // 正在输入（实时获取）
input.onchange     // 内容改变并失去焦点或回车才触发
input.onselect     // 文本被你用鼠标框选时
form.onsubmit      // 表单提交（必须阻止默认行为）
form.onreset       //表单重置
```

- 表单提交必写

```js
form.onsubmit = function(e){
  e.preventDefault() // 阻止页面刷新
  // 提交逻辑
}
```
- 事件属性
```js
e.type //获取事件名
e.target  //实际触发事件的元素
e.currentTarget  //绑定事件的元素
```
---


## 总结

1. **事件 = 用户动作**
2. **e = 事件对象，包含所有信息**
3. **冒泡 = 子传父**
4. **代理 = 父级管所有子元素**
5. **阻止默认 = 不让浏览器自动做事**
6. **阻止冒泡 = 不让事件往上跑**
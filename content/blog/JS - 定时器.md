---
title: JS - 定时器
date: 2026-01-10
category: 前端开发
tags: [JavaScript]
---

 JavaScript 里**最常用的定时器函数**，专门用来**延迟执行代码**、**重复执行代码**。

总结：
1. **setTimeout** = 延迟后执行1次
2. **setInterval** = 每隔一段时间重复执行
3. 都可以用 `clearTimeout` / `clearInterval` 停止
4. 时间单位是**毫秒**（1 秒 = 1000）
---

## 用法

### 1. setTimeout (要执行的函数，延迟毫秒数)

- **作用**：等待 N 毫秒后，执行一次代码。

```js
// 1秒（1000毫秒）后，只打印一次
setTimeout(() => {
  console.log("我1秒后才执行，只执行一次");
}, 1000);
```

### 2. setInterval (要执行的函数，间隔毫秒数)

- **作用**：每隔 N 毫秒，**循环执行**，不会自己停。

```js
// 每隔1秒，打印一次，无限循环
setInterval(() => {
  console.log("每隔1秒执行一次，一直跑");
}, 1000);
```
### 3.三种不同写法
#### 写法 1：函数引用

```js
function fn() {
  console.log('我执行了');
}

setTimeout(fn, 1000); 
```

#### 写法 2：匿名函数

```js
setTimeout(function() {
  console.log('我执行了');
}, 1000);
```

#### 写法 3：箭头函数

```js
setTimeout(() => {
  console.log('我执行了');
}, 1000);
```

## **这三种写法效果完全一样！**
---

## 清除定时器

两个函数都会返回一个**编号（ID）**，用这个编号可以**手动停止定时器**。

### 1.清除 setTimeout

- clearTimeout()
```js
// 保存定时器ID
const time1 = setTimeout(() => {
  console.log("我不会执行了");
}, 1000);

// 取消执行
clearTimeout(time1);
```

### 2.清除 setInterval

- clearInterval()
```js
const time2 = setInterval(() => {
  console.log("我在循环");
}, 1000);

// 停止循环
clearInterval(time2);
```

---

## 案例

### 1. 3 秒后自动关闭弹窗

```js
setTimeout(() => {
  alert("弹窗关闭");
}, 3000);
```

### 2. 每秒更新一次时间（时钟）

```js
setInterval(() => {
  console.log(new Date().toLocaleTimeString());
}, 1000);
```

### 3.慢慢淡化
```js
<!DOCTYPE html>
<html>
<body style="margin:0; background: lightblue;">

  <h1 style="text-align:center; margin-top: 100px; font-size: 50px;">
    点我慢慢淡化
  </h1>

  <script>
    // 初始透明度：1（完全不透明）
    let opacity = 1;

    // 每隔 30 毫秒执行一次，让透明度慢慢变小
    const timer = setInterval(() => {
      // 每次减少一点点
      opacity -= 0.01;
      
      // 把透明度设置给页面
      document.body.style.opacity = opacity;

      // 当透明度 <= 0 时，停止定时器
      if (opacity <= 0) {
        clearInterval(timer);
        console.log("淡化完成，定时器已停止");
      }
    }, 30); // 30毫秒刷新一次，看起来很顺滑
  </script>
</body>
</html>
```
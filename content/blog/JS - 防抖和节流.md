---
title: JS - 防抖和节流
date: 2026-01-17
category: 前端开发
tags: [JavaScript]
---


- **控制函数执行频率**的工具，专门解决：**频繁触发、疯狂执行**的问题。

1. **防抖**：频繁操作 → 只执行最后一次
2. **节流**：频繁操作 → 固定时间只执行一次
3. 都是**为了节省性能、避免卡顿**
4. 一般利用**setTimeout**实现
---

## 防抖（Debounce）
### 定义

- 在短时间内连续触发事件，只执行最后一次。只有当触发停止，并等待指定时间后，函数才会执行一次。
- 流程：**不停触发 → 一直等待 → 等你停下来 → 才执行最后一次**
- **应用场景**
	- 触发滚动事件
	- 搜索框输入（输完再请求）
	- 按钮疯狂点击

### 案例

- 在delay时间内重复触发事件，timer就会被clear，并且生成新的timer，所以fn直到最后一次触发事件（或停顿时间大于delay），timer没有被清除的时候才会运行函数
```js
// 防抖：等停了再执行
function debounce(fn, delay) {
  let timer = null;
  return function () {
	if (timer){
	    clearTimeout(timer); // 每次触发都清空之前的定时器
	  }
    timer = setTimeout(() => fn(), delay); // 重新计时
  };
}

//滚动事件
window.onscroll = debounce(scrollHandle,200)

funtion scrooHandle(){
	let scrollTop = document.documentElement.scrollTop;
	console.log(scrollTop);
}
```

---

## 节流（Throttle）

### 定义

- 在规定的时间周期内，不管触发事件多少次，只执行一次 ，执行后进入冷却时间，冷却结束才能再次执行。
- 流程：**连续不停触发 → 固定时间间隔内，仅执行 1 次，周期循环**
- 应用场景
	- 滚动加载（scroll）
	- 鼠标移动（mousemove）
	- 高频点击
	- 页面resize事件

### 案例

- 在触发一次fn时，canRun标记为false，之后等本次执行的时候setTimeout函数运行，让canRun重新变回ture，执行fn，循环往复
```js
// 节流函数
function throttle(fn, interval) {
    // 开关变量：标记是否可以执行，只在第一次调用 throttle()时执行一次
    let canRun = true;

    // 返回一个闭包函数
    return function() {
        // 如果正在冷却，直接返回，不执行
        if (!canRun) {
            return;// 函数立刻停止
        }
        
		// 立即执行要执行的函数
        fn();
        
        // 关闭开关，进入冷却
        canRun = false;
        
        // 延迟一段时间后，重新打开开关
        setTimeout(function() {
            canRun = true;
        }, interval);
    };
}
//滚动事件
window.onscroll = throttle(scrollHandle,200)

funtion scrooHandle(){
	let scrollTop = document.documentElement.scrollTop;
	console.log(scrollTop);
}

```
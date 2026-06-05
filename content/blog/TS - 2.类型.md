---
title: TS - 2.类型
date: 2026-01-30
category: 前端开发
tags: [TypeScript]
---
## 一.数据类型

### 1.基元类型

- string，number，boolean，这三个是 TypeScript / JavaScript 最核心的 3 个基元类型

```ts
//给变量加个类型注释
let str: string = "Hello, TypeScript!"; // 字符串
let num: number = 100;                  // 数字
let bool: boolean = true;               // 布尔
//不加类型注释，ts也能自动识别
let x = 10;
//在先定义后赋值的情况写需要写类型注释，否则会识别为any
let y: number;
y = 10;
```

### 2.数组

```ts
//1.简单写法
let arr: number[] = [1,2,3];
//2.泛型写法
let arr2: Array<string> = ["a","b","c"];
```

### 3. any和unknown

- 使用any可以不做任何类型检查
- any谨慎使用，any相关的类型推倒会被污染

```ts
let test: any = 123;
test = true;         
test = "字符串";     
test = [1,2,3];       
test = { name: "ts" }; 

let x:any = 10;
let y = x + 5;//y变成any
let y: number = x + 5;//y是number，any被截断
```

- unknown更加安全，会强迫你先判断再使用
- 当不知道值是什么类型时，优先使用 unknown

```ts
function fn(data: unknown) {
  // 1. 先判断是不是对象
  if (typeof data === 'object' && data !== null) {
    // 2. 再判断有没有 name
    if ('name' in data) {
      console.log(data.name);
    }
  }
}
```
### 4. 函数
#### 1. 函数声明

- TS 不知道 a、b 是什么 → 变成 any
```ts
function sum(a, b) {
	return a + b;
}
```

- 写上类型注释，a、b 限制为number类型

```ts
function sum(a: number, b: number) {
	return a + b;
}
```

-  TS 能自动推导 return 返回值类型，但定义return类型，可以防止写错代码return 类型，同时让代码简洁易懂

```ts
function sum(a: number, b: number): number {
	return a+b; 
}
```
#### 2. 匿名函数

- 通常赋值给变量，也叫**函数表达式**

```ts
const add = function(a: number, b: number): number {
  return a + b;
}
```

- 箭头函数

```ts
const add = (a: number, b: number): number => {
  return a + b;
}
```

### 5.对象

- 传入对象
```js
function printMessage(pt:{name: string, date: Date}): void {
	console.log(pt.name + " " + pt.date.toDateString());
}
//传入name和data
printMessage({name: "小风", date: new Date()});

  
//｜联合类型可以多选变量类型，可通过判断，给不同类型做不同的处理
//?可不传入变量，为了防止下方调用运行错误，可以通过??给个默认值，也可以通过写个判断
function printAge(pm:{name?: string, age: number | string}): void {
	if (typeof pm.age === "number") {
		console.log((pm.name ?? "无名氏") + " : " + pm.age + " years old.");
	} else {
		console.log((pm.name ?? "无名氏") + " is " + pm.age + " years old.");
	}
}
printAge({age: 30});
```

### 6. 类型别名和接口

- 类型别名：给**任意类型**起个别名
```ts
type Person = {
  name: string;
  age: number;
  greet(): void;
};
let person: Person;
```

- 接口（interface）：结构协议，只能描述对象 / 类的结构

```ts
interface Person {
  name: string;
  age: number;
  greet(): void;
};
let person: Person;
```

#### 1. interface 专门用来定义 **对象**

1. type 能定义**任何类型**：对象、联合类型、字符串…
2. interface 只能写对象/函数

- 定义对象 → 用 interface
- 定义联合类型 → 用 type

```ts
// type 全能
type Age = number | string; 
type Name = "小明" | "小红";

// interface 只能写对象/函数
interface Person { ... }
```

#### 2. interface 可以声明合并，type 不行

```ts
// interface 可以声明合并
interface Person { name: string }
interface Person{ age: number }
//interface用extends可扩展
interface Student extends Person { gender: string }

// type 重复定义会报错
type Person = { name: string }
//type Person = { age: number } 会报错
// type交叉扩展：Person & 新类型 
type Student = Person & { gender: string};
```
### 7. 类型断言
- 直接告诉ts类型，常用于值来自外部（DOM、接口、第三方方法），这类不可用类型注释的情况

```ts
let el = document.getElementById("app") as HTMLDivElement;

let el2 = <HTMLDivElement>document.getElementById("app");
```

### 8. 文字类型

```ts
let testString: string = "Hello, TypeScript!";
testString = "Hello, World!";

const constString: string = "Hello, TypeScript!";
// constString = "Hello, World!"; // ❌ 不能重新赋值

//字面量类型,即把字符串作为一个类型
//把 x 定义成一个只能等于 "hello" 的变量
let x: "hello" = "hello";
//可以限制变量只能是固定的几个值
let status: "success" | "error" | "loading"
//限定return的类型
function compare(a:string, b:string): -1 | 0 | 1 {
	return a === b ? 0 : (a < b ? -1 : 1);
}
//布尔文字类型
let b1: boolean = true;
let b2: boolean = false;
```

- 请求后端接口
```ts
function handleRequest(url: string, method: "GET" | "POST"|'GUESS'): void {
	console.log(`Handling ${method} request for ${url}`);
}

const req = {
	url:"http://example.com",
	method:"GET"
}
//method可能被识别为string，用类型断言限定
handleRequest(req.url, req.method as "GET" | "POST" | "GUESS");
```
### 9. null和undefined

```ts
let a: undefined = undefined; // 未定义
let b: null = null; // 空值
let c: void = undefined; // void类型只能赋值undefined

function doSomething(x:string|null): void {
	if (x === null) {
		console.log("x is null");
	} else {
		console.log("x is a string: " + x);
	}
}
```
### 10. 枚举

```ts
//如果不设定值，枚举的每个成员会自动从0开始递增。也可以手动设定值。
enum Color {
	Red,
	Green,
	Blue
}
let c1: Color = Color.Red;
console.log(c1); // 输出 0
```
### 11. BigInt 和Symbol

- BigInt：超大整数专用类型
- Symbol：生成一个绝对唯一、永不重复的值
	- 做对象的**私有属性**
	- 防止对象键名冲突
	- React 里的 `Symbol.for('react.element')` 
```ts
//字面量写法
let a: bigint = 100n;
//函数转换写法
const anotherHundred = BigInt(100);
//Symbol
let s1 = Symbol()
let s2 = Symbol()

console.log(s1 === s2) // false
//Symbol用法
Symbol(); // 空的
Symbol("name"); // 字符串
Symbol(123); // 数字 
Symbol(true); // 布尔 
Symbol({}); // 对象
```

### 12. union联合类型

```ts
type A = { a: number }
type B = { b: string }
type U = A | B

function f(u: U) {
  console.log(u.a) // ❌ 报错：B 没有 a，可通过类型缩小解决
}
```
### 13.never类型和穷尽性检查
#### never类型

	- 永远不会发生的类型
	- 永远不会有值
	- 永远不会执行到
	- 任何类型都不能赋值给 never
#### 穷尽性检查

- 可以通过在default 里赋值给 never，TS 就会强制穷尽所有情况

```ts
type Status = "success" | "error" | "loading";

//switch + default + 赋值给 never
function handle(status: Status) {
  switch (status) {
    case "success":
      return "成功";
    case "error":
      return "失败";
    case "loading":
      return "加载中";

    // 👇 穷尽性检查核心代码
    default:
      const _exhaustive: never = status;
      return _exhaustive;
  }
}
```

### 14. 显示写类型

- 能自动推断的不写，不能推断的必须写

- 什么时候 应该 显式写类型？

	1. 函数参数
	2. 函数返回值 → 建议写（复杂函数必须写）
	3. 变量没有初始值
	4. 对象 / 数组 结构复杂时
	5. 回调函数、公共方法、类接口 → 必须写

- 不需要显式标注的场景：有直接赋值的局部变量

---

## 二. 类型缩小

- 在代码块里，把不确定的类型 → 缩小成确定的类型。
```ts
function padleft(padding: number | string, input: string) :string{
	if (typeof padding === "number") {
		return " ".repeat(padding) + input;
	} else {
		return padding + input;
	}
}
```
### 1.类型守卫

- 靠 `typeof`/`instanceof`/`in` 或自定义函数收窄
#### ① typeof 类型守卫

- 判断基础类型
```ts
function printId(id: string | number) {
  if (typeof id === "string") {
    // id 一定是 string
    id.toUpperCase();
  } else {
    // id 一定是 number
    id.toFixed(2);
  }
}
```

####  ②instanceof 类型守卫（判断对象）

- 判断是不是由某个类构造出来的实例，比如变量是由 **class /new 出来的对象**
```ts
function doSomething(x: Date | string) {
  if (x instanceof Date) {
    console.log(x.getFullYear()); 
  } else {
    console.log(x.toUpperCase()); 
  }
}
```

#### ③ in 操作符缩小

- 有两个 / 多个相似的对象类型，但有各自独有的属性，用in缩小
```ts
type Fish = { swim: () => void };
type Bird = { fly: () => void };
type Human = { swim?: () => void; fly?: () => void };

function move(animal: Fish | Bird| Human) {
    if ("swim" in animal) {
        animal.swim();
    } else if ("fly" in animal) {
        animal.fly();
    } else {
        console.log("This animal can't swim or fly.");
    }
}
```

#### ④ 等值缩小
- 去掉 `null/undefined`
- 判断状态 / 字面量
- 写 `switch` 分支
```ts
//null
interface Container {
    value: number | null;
}
function multiplyValue(container:Container, factor: number){   
    if(container.value === null) { 
        console.log("Container is empty.");
    } else{
        console.log("Container has value: " + container.value);
        }
}

//字面量
type Status = "success" | "error" | "loading";
function handle(status: Status) {
  if (status === "success") {
    // 只有成功逻辑
  } else if (status === "error") {
    // 只有错误逻辑
  }
}
```

#### ⑤ 自定义类型守卫

- 写一段运行时检查逻辑→函数返回 **true** → 证明变量是这个类型→TS 就会信任你，把类型缩小指定的类型
- 类型谓词 = 自定义类型守卫的核心语法，写法固定：参数名 is 具体类型
- 用法：1.将后端返回的数据（unknown），用它转为固定类型。2. 区分复杂对象（interface 专用）3. 封装可复用的类型判断

```ts
function isUser(value: unknown): value is User {
  return typeof value === "object" && value !== null && "name" in value;
}

if (isUser(data)) {
  // TS 认定：data 一定是 User 类型
  data.name; 
}
```

### 2. 真值缩小

- 用 **if/&&/!!** 做真假判断，TS 自动剔除 **null/undefined/ 空串 / 0** 等假值，把类型变窄。
```ts
//用值做判断
function printAll(strs: string | string[] | null): void {
	if (strs) {
		if (typeof strs === "object") {
			for (const s of strs) {
				console.log(s);
			}
		} else {
			console.log(strs);
		}
	}
}

function multiplyAll(values: number[] | undefined, factor: number): number[] {
    if (!values) {
        return [];
    } else {
        return values.map(x => x * factor);
    }
}
```
### 3.分配缩小

- 发生在**赋值语句**
- 先定义一个**联合类型**变量，后面赋值什么，TS 就认定它是什么。
- **赋值动作本身就会缩小类型**，不需要额外 `if` 判断。
```ts
function getValue(): string | number {
  return Math.random() > 0.5 ? "hello" : 123;
}

let val = getValue(); 
// val: string | number

val = "test"; 
// 分配缩小：val 变成 string
val.trim();
```

### 4.控制流分析

- TS 跟着你的代码执行顺序，一步步自动分析变量的类型变化，这就叫控制流分析。
- 它是**所有类型缩小的底层原理** 
	- 控制流分析 = 大脑
	- 类型缩小 = 结果

- TS 用**控制流分析**去读代码，读完后自动把类型变窄 → 类型缩小

```ts
let x: string | number;

if (Math.random() > 0.5) {
  x = "hello";
  // TS 分析：x 一定是 string
} else {
  x = 123;
  // TS 分析：x 一定是 number
}
```
### 总结

| 名称                | 关键字 / 写法                     | 适用场景                                      |
| ----------------- | ---------------------------- | ----------------------------------------- |
| **typeof 缩小**     | `typeof x === "string"`      | 基础类型：`string / number / boolean / symbol` |
| **instanceof 缩小** | `x instanceof Date`          | 类 / 构造函数实例：`new Date()`、`class` 创建的对象     |
| **in 缩小**         | `"属性名" in obj`               | 区分**普通对象/接口**，根据**独有属性**判断类型              |
| **等值缩小**          | `x === "success"` / `switch` | 字面量类型、状态判断、精准排除 `null/undefined`          |
| **自定义类型守卫**       | `function isX(): x is 类型`    | **万能场景**：后端数据、复杂对象、interface、无法用内置守卫时     |
| **真值缩小**          | `if (x) {}` / `if (!x) {}`   | 排除假值：`null / undefined / 0 / "" / false`  |
| **分配缩小**          | 直接赋值：`x = 123`               | 先声明联合类型，后赋值确定类型                           |

---
title: TS - 3.函数
date: 2026-02-05
category: 前端开发
tags: [TypeScript]
---
## 一.函数类型表达式

- **用来定义函数格式的类型语法**
 
- 函数类型表达式 ： **(参数: 参数类型) => 返回值类型**
- 函数签名：参数个数 + 参数类型 + 返回值类型

- 这里可以类比类和对象，函数签名是一个通用的格式，调用函数签名的格式可以生成一个具体的函数。
#### 1. 用 type 或者interface定义
```ts
//type 1.小括号 + 箭头 → 纯函数类型
type Add = (a: number, b: number) => number;
//2.大括号 + 冒号 → 纯函数类型
type Fn = {
  (a: number): number; 
};
//3.大括号 + 属性 + 函数 → 带属性的函数
type Fn = {
  description: string;
  (a: number): boolean;
};

const add: Add = (x, y) => x + y;
//interface
interface Add1 { (a: number, b: number): number; }
```
- 调用函数签名案例
```ts
//定义一个带属性的函数签名
type DescribableFunction = {
    description: string;
    (someArg: number): boolean;
}
//传入一个函数，该函数的类型为已定义的 DescribableFunction 函数签名
function doSomething1(fn: DescribableFunction) {
    console.log(fn.description + " returned " + fn(6));
}
//传入的函数
function fn1(n: number) {
    console.log("Called with " + n);
    return true;
}
//设置函数属性
fn1.description = "This is a describable function";
//调用函数
doSomething1(fn1);
```
#### 2. 直接写在变量 / 参数里（内联）

```ts
const fn: (s: string) => boolean = (str) => str.length > 0;

```

#### 3.构造签名（construct signature）

- 构造签名 ：约束构造函数
- 写一个函数签名，这个函数签名是用来约束构造函数（class）的，生成对象的函数可以调用函数签名，传入构造函数和参数，生成并返回新对象
```ts
//1. 创建一个类，，JavaScript / TypeScript 里，类本质上就是个构造函数
class Ctor {
    s:string;
    /// 自己写 constructor：接收参数，初始化属性。如果不需要传参数可以不写。
    constructor(s: string) {
        this.s = s;
    }
}
//2. 写一个约束构造函数的函数签名
type SomeConstructor = {
    new (s: string): Ctor;
}
//3.写一个函数，接收类（构造函数）和参数，new创建对象
function fn2(ctor: SomeConstructor, str:string) {
    return new ctor(str);
}
//4.调用函数，传入类和参数，创建对象
const f = fn2(Ctor,"hello")
console.log(f.s);
```

- 函数调用和函数构造的综合案例

```ts
interface CallOrConstructor{
    //方式1：可以用 new 调用，传 string → 返回 Date
    new(s: string): Date;
    //方式2：可以直接调用，传 number → 返回 number
    (n?: number): string;
}

function fn3(date:CallOrConstructor) { 
    let d = new date("2020-01-01");
    let n = date(42); 
    console.log(d)
    console.log(n)
}
fn3(Date);
```

---

## 二. 泛型函数

- 泛型：用一个自己设定的符号（T / Type / 自定义）当 “类型占位符”。后面所有带这个符号的地方，必须是同一种类型。某种意义上检查的是一致性。
### 1. 类型推断

- TS 自动根据你传入的参数，确定泛型是什么类型
```ts

function firstElement1<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}
//传入字符，输出字符，传入数字输出数字
let s1 = firstElement1(["a", "b", "c"]);
let s2 = firstElement1([1, 2, 3]);
//可使用多个泛型
function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
  return arr.map(func);
}

const parsed = map(["1", "2", "3"], (n) => parseInt(n));
```

### 2. **限制条件（泛型约束）**

- 限制传入的类型必须包含某些属性
语法：**`<T extends 类型>`**

例子：必须是有 length 的类型（字符串 / 数组）

```ts
//T extends 匿名类型
function print<T extends { length: number }>(arg: T) {
  console.log(arg.length)
}
//T extends 声明类型
interface HasLength { 
	length: number;
} 

function print1<T extends HasLength>(arg: T) {
  console.log(arg.length)
}

print("abc") 
print([1,2,3])
print(123) //❌，报错数字没有 length
```
---

- 案例：传入传出受限

```ts
function minimunLength<Type extends { length: number }>(obj: Type, minimum: number): Type {
    if (obj.length >= minimum) {
        return obj;
    } else {
	    //返回带length属性的匿名对象
        return { length: minimum } as Type;
        //return { length: minimum }会报错，尽管符合Type
    }
}
console.log(minimunLength("Hello", 10));
console.log(minimunLength([1, 2, 3], 5));
```

### 3.指定类型参数

- 手动告诉 TS，泛型 Type 是什么类型
 ```ts 
function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
    return arr1.concat(arr2);
}
//用联合类型<string|number>指代Type，既可以是string，又可以是number
const arr = combine<string|number>(["string"], [1, 2, 3]);
console.log(arr);
 ```

### 4.编写优秀泛型函数的准则

1. 尽可能使用类型参数本身，而不是对其进行约束
	- 能用 T 就别写 T extends xxx
	- 不是所有函数都需要泛型
2. 尽可能少使用类型参数
	- 泛型越少，代码越简单、越不容易错
	
	```ts
	//泛型太多
	function combine<T, U, V>(a: T, b: U): V {}
	//泛型少，简单
	function combine<T>(a: T[], b: T[]): T[] {}
	```
	
3. 如果一个类型的参数只出现一次，重新考虑是否真的需要它

---

## 三. 可选参数

- 可传、可不传的参数
```ts
//不一定传入n
function f(n?:number) {
	console.log(n?.toFixed(2));//n不传入就不执行
}

//给一个默认值，如果不传值就是默认值
function f(n:number = 100) {
    console.log(n.toFixed(2));
    console.log(n.toExponential(2));
}
f(123);
```

- 写回调函数的时候，不要写可选参数，除非打算在不传递该参数的情况下调用函数。
---

## 四.函数重载

### 1. 基本语法
 
```
// 重载签名（可以写多个）（给 TS 看的规则）
function 函数名(参数): 返回值;
function 函数名(参数): 返回值;

// 实现签名（只能一个）（真正运行的代码）
function 函数名(参数) {
  // 真正逻辑
}
```

- 案例1

```ts
// 重载签名1
function foo(a: string): number;

// 重载签名2
function foo(a: number): string;

// 实现签名
function foo(a: any) {
  if (typeof a === "string") {
    return a.length;
  } else {
    return String(a);
  }
}
```

- 案例2
```ts
// 1. 重载签名1
function makeDate(timestamp: number): Date;
// 2. 重载签名2
function makeDate(m: number, d: number, y: number): Date;

// 3. 实现签名（真正的函数）,实现签名要包容重载签名
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp - 1, d);
  } else {
    return new Date(mOrTimestamp);
  }
}
//外部（TS）只能看到重载签名，看不到实现签名
makeDate(123); // ✅ 合法（匹配重载1） 
makeDate(1,2,3); // ✅ 合法（匹配重载2） 
makeDate(1,2); // ❌ 报错！！！尽管符合实现签名，但TS检查只匹配重载签名
```
### 2. 重点规则

1. 重载签名只定义类型，不写逻辑

2.  实现签名必须兼容所有重载的参数

3. 外部（TS）只能看到重载签名，看不到实现签名

4. 能用联合类型 | 或者泛型解决的问题，不要用函数重载

## 五. this的声明

- 如果你函数里用到 **this**，必须声明 this 类型
- this 可以让回调内部能拿到当前遍历的对象。
```ts
interface User {
  admin: boolean;
}

interface DB {
  // 定义：回调的 this 是 User
  filterUsers(filter: (this: User) => boolean): User[];
}

const db: DB = {
  filterUsers(filter) {
    // 假数据
    const user1: User = { admin: true };
    const user2: User = { admin: false };

    // 调用 filter，绑定 this！
    const result: User[] = [];

    if (filter.call(user1)) {
      result.push(user1); // this = user1
    }
    if (filter.call(user2)) {
      result.push(user2); // this = user2
    }
    return result;
  },
};

const admins = db.filterUsers(function (this: User) {
  return this.admin;
});

console.log(admins);
```

## 六. 几个基础、最常用的类型
- void object unknown never function
### 1. unknown 

- 不知道是什么类型（安全版 any）
- 暂时不知道它是什么，但我不会随便用它。必须判断后才能用。
```ts
let a: unknown = 123;
// 直接用 a.toFixed() 报错
if (typeof a === 'number') {
  a.toFixed(); // 可以用了
}
```

### 2. void 

- 函数没有返回值。

```ts
function fn(): void {
  console.log('hello');
  // 不能 return 东西
}
```

- 也在调用其他函数，但不需要函数返回值的时候使用。

```ts
//fn返回123
const fn = () => 123;
//调用cb但不返回值
function run(cb: () => void) {
  cb(); // 我只调用，不用返回值
}

run(fn);
```
### 3. never 

- 函数永远执行不完 / 必定报错。
```ts
function err(): never {
  throw new Error('报错');
  // 永远到不了这里
}
```

### 4. object

- object是一种对象类型，指的是任何不是基元的值
- 不是 string number boolean bigint symbol null undefined

```ts
let a: object = { name: 'zs' };
let b: object = [1, 2, 3];
let c: object = function() {};
```

### 5. Function
-  `Function` 是所有函数的通用类型
- 优点：能放任何函数
- 缺点：不安全，不检查参数 / 返回值
```ts
let fn: Function;

fn = (a: number, b: number) => a + b;

//全部都不报错
fn(1, 2); 
fn(1);    
fn();    
```

## 七. 参数展开运算符

### 1. 形参展开

- 接收任意多个参数，打包成数组

```ts
// 函数定义这里 ... 叫：形参展开（剩余参数）
function multiply(n:number,...m:number[]) {
    return m.map(x => n * x);
}
const a = multiply(2, 1, 2, 3);
console.log(a);
```

### 2. 实参展开

- 在调用的时候，把数组拆成一个个参数传给函数

```ts
function add(a: number, b: number) {
  return a + b;
}

const arr = [10, 20];

// 调用时 ... 叫：实参展开
add(...arr); 
// 等价于 add(10,20)

const args = [8,5] as const;
//会检查args的参数
const angle = Math.atan2(...args);
console.log(angle);
```

- 总结：

	- 形参展开（定义时 ...）：打包
	
	- 实参展开（调用时 ...）：拆包

### 3. 参数解构

- 传入一个对象 / 数组，在参数里拆成变量。
#### ① 对象参数解构

```ts
// 普通写法
function getUser(user: {name: string, age: number}) {
  console.log(user.name)
  console.log(user.age)
}

// 解构写法 
function getUser({ name, age }: {name: string, age: number}) {
  console.log(name)
  console.log(age)
}

// 调用
getUser({ name: "小明", age: 20 })
```

直接用属性，不用写 user.xxx

#### ② 数组参数解构

- 把传进来的数组，直接拆开，变成变量
```ts
//普通写法
function getNum(arr: number[]) {
  let a = arr[0];
  let b = arr[1];
  console.log(a, b)
}

// 解构数组
function getNum([a, b]: number[]) {
  console.log(a, b)
}

getNum([1, 2])
```


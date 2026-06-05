---
title: TS - 6.类
date: 2026-02-21
category: 前端开发
tags: [TypeScript]
---

## 一、类属性

- **实例属性**：实例对象独有，`new` 创建后分配内存

- **静态属性 static**：属于类本身， 使用`类名.属性` 访问

```ts
class Point {
    x: number;
    y: number;
	//静态属性
    static z: number = 0;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

const point = new Point(1, 2);
console.log(point.x, point.y);
```
## 二、readonly 只读属性

- **只读只能在两处赋值：声明处 / 构造函数内**，之后不可修改

```ts
class User {
  readonly id: number;
  readonly name = "admin"; // 声明初始化
  constructor(id: number) {
    this.id = id; // 构造器赋值合法
  }
}
const u = new User(1001);//构造函数内初始化
// u.id = 999 // 报错，readonly禁止修改
```

## 三、构造器 constructor

- 实例化时自动执行，**初始化实例字段**，一个类只能一个 `constructor`
- 可以在构造器里给默认值
```ts
class Point {
    x: number;
    y: number;
	//constructor给 x，y 默认值0
    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }
}
```

## 四、类方法

- 对象能调用的函数，方法里用 **this** 访问自己的属性。
- 方法可以带参数，可以有返回值。

```ts
class Point {
    x: number;
    y: number;

    scale(n: number): void {
        this.x *= n;
        this.y *= n;
    }

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }
}

const point = new Point(1, 2);
point.scale(2);
console.log(point.x, point.y);// 2 4
```

## 五、get /set 存取器

- get/set 可以可以控制属性的读写，添加判断逻辑。
- 只写get属性变成只读属性。
- get的返回值类型一定是可以分配给该属性set的类型。
```ts
class Thing{
    _size: number = 0;
    
    get size(): number {
        return this._size;
    }
    set size(value: number|string) {
        let num = Number(value);
        //isFinite检查用户输入是不是有效数字，防止计算出现无限大/不是数字 导致程序崩溃
        if (!Number.isFinite(num)){
            this._size = 0;
            return;
        }
        this._size = num;
    }
}
let t:Thing = new Thing();
t.size = 20;
console.log(t.size);// 20

t.size = "invalid";
console.log(t.size);// 0
```

## 六、索引签名

- **所有属性 + 所有方法 必须符合这个类型**
- 可以动态加任意属性
- 全局统一规则
```ts

class MyClass {
    // 索引签名：规定这个类里所有属性/方法，[s: string]
    [s: string]: boolean | ((s: string) => boolean);
    x = true;// 合法：boolean
    check(s: string) { // 合法：函数
        return this[s] as boolean;
    } 
} 
```

## 七、extends 类继承

`class 子类 extends 父类`

1. 子类构造器必须第一行 `super(参数)`：调用父类构造
2. 可重写父类方法，`super.方法()` 调用父类原版
	- 方法名**必须和父类一模一样**
	- 返回值、参数**类型要兼容父类**（不能乱改类型）
	- TS 推荐加关键字 `override`（强制校验写错报错）

```ts
class Animal {
  name: string;
  constructor(name: string) { this.name = name; }
  say() {}
}
// 继承
class Bird extends Animal {
  constructor(name: string) {
    super(name); // 必须调用父构造
  }
  // 重写
  override say() {
    super.say(); // 调用父类方法
    console.log("小鸟叫");
  }
}
```

- 单继承：TS 一个类只能 `extends` 一个父类

## 八、implements 实现接口

- 约束类结构，不是继承
- `implements 接口`：**类必须实现接口所有字段 / 方法**，只做类型约束，不继承代码

```ts
interface IUser {
  id: number;
  login(): void;
}
// 类必须补齐接口全部成员
class User implements IUser {
  id = 1;
  //可添加属性和方法
  age = 30;
  login() {}
}
```

- 区别：
	- `extends`：继承父类代码、属性、逻辑
	- `implements`：只遵守接口类型规范，无代码复用；一个类可 `implements 多个接口`

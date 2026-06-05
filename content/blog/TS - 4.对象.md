---
title: TS - 4.对象
date: 2026-02-10
category: 前端开发
tags: [TypeScript]
---
- **对象类型、可选属性、只读属性、索引签名、扩展类型、交叉类型、冲突处理、泛型对象**

## 一、对象类型

- 直接定义对象的**结构、属性名、属性类型**，约束对象必须包含指定属性且类型匹配。

```ts
//1.匿名对象类型
function greet(person:{name: string, age: number}){
    return `Hello ${person.name}, you are ${person.age} years old.`;
}
//2.接口定义对象类型
interface Person {
    name: string;
    age: number;
}

function greetWithInterface(person: Person){
    return `Hello ${person.name}, you are ${person.age} years old.`;
}
//类型别名定义对象类型
type PersonType = {
    name: string;
    age: number;
}

function greetWithType(person: PersonType){
    return `Hello ${person.name}, you are ${person.age} years old.`;
}

console.log(greet({name: "Alice", age: 30}));
console.log(greetWithInterface({name: "Bob", age: 25}));
console.log(greetWithType({name: "Charlie", age: 35}));
```

---
## 二、可选属性 `?`

- 属性名后加 `?`，表示**该属性可存在、可省略**。

```ts
type Shape ={ 
}

interface PaintOptions {
    shape: Shape;
    xPos?: number;
    yPos?: number;
}
//1.使用判断给可选属性赋值
// function paintShape(opts:PaintOptions){
//     let xPos = opts.xPos === undefined ? 0 : opts.xPos;
//     let yPos = opts.yPos === undefined ? 0 : opts.yPos;
//     console.log(`Painting shape at (${xPos}, ${yPos})`);
// }
//2.使用对象参数解构给可选属性赋值，shape:Shape此处的Shape不是类型而是shape的别名
function paintShape({shape:Shape, xPos = 0, yPos = 0}:PaintOptions){
   console.log(Shape);
    console.log(`Painting shape at (${xPos}, ${yPos})`);
}

const shape: Shape = {};
paintShape({shape});
paintShape({shape, xPos: 100});
paintShape({shape, yPos: 100});
paintShape({shape, xPos: 100, yPos: 100});
```

---
## 三、只读属性 `readonly`

- 属性前加 `readonly`，**仅允许初始化赋值，后续不可修改**。

```ts
type User = {
  readonly id: number
  name: string
}
//const 对象，不能换对象，如：u = { id: 2, name: "李四" }，但可以给属性赋值
const u: User = { id: 1, name: "张三" }
u.name = "李四" // 正常修改
// u.id = 2 // 报错：id 是只读属性
```

- `readonly` 只约束**属性本身**，不限制属性内部值（浅只读）。
```ts
type User = {
  readonly info: {
    name: string
    age: number
  }
}

const u: User = {
  info: { name: "张三", age: 20 }
}
//如果直接修改第一层属性会报错
//u.info = { name: "李四", age: 30 }

//不报错，能修改readonly属性内部的内容
u.info.name = "李四" 
u.info.age = 999;
```

---
## 四、索引签名

- 当对象**属性名不固定、数量不确定**（如字典、键值对）时使用。
- 语法：`[key: 键类型]: 值类型`
- 键常用类型：`string` / `number`

### 1. 字符串索引

```ts
// 任意字符串键，值都是 string
type Dict = {
  [key: string]: string
}

const dict: Dict = {
  a: "aaa",
  b: "bbb",
  123: "数字键也会转为字符串"
}
```

### 2. 数字索引

```ts
//键值对
type NumObj = {
  [index: number]: boolean
}
const arrLike: NumObj = { 0: true, 1: false }

//数组
interface StringArray {
    [index: number]: string;
}
//这里理解，数组作为类，属性也是一组键值对，每一个值其实都是对应一个index下标的属性
const myArray: StringArray = ["Alice", "Bob", "Charlie"];
const secondItem = myArray[1];
console.log(myArray[0]);
console.log(myArray[1]);
```

### 3. 固定属性 + 索引签名混用

- 固定属性类型**必须兼容**索引签名的值类型。
- 索引签名是 **“全包规则”**，规定了整个对象所有属性的类型。
```ts
type Mix = {
  name: string // 固定属性
  [key: string]: string // 索引签名
}
```
---
## 五、扩展类型（interface）

-  interface 继承（推荐用于对象结构扩展）

```ts
interface BaseUser {
  id: number
  name: string
}

// 扩展基础类型，新增属性
interface VipUser extends BaseUser {
  vipLevel: number
}

const vip: VipUser = { id: 1, name: "张三", vipLevel: 2 }
```

---
## 六、交叉类型 `&`（Type）

- **合并多个类型为一个**，新类型同时拥有所有类型的属性。可以合并type、interface、或者两者混用

- 语法：`TypeA & TypeB & ...`

```ts
interface Colorful {
    color: string;
}

interface Circle {
    radius: number;
}

type ColorfulCircle = Colorful & Circle;

const cc: ColorfulCircle = {
    color: "red",
    radius: 5
};
console.log(cc.color);
console.log(cc.radius);
```

---
## 七、冲突处理
### 1. 同名类型

- interface合并，type直接报错
```ts
//interface 同名类型合并
interface Sister{
    name: string;
}

interface Sister{
    age: number;
}

const sister: Sister = {
    name: "Alice",
    age: 30
};
console.log(sister.name);
console.log(sister.age);
//type 同名类型冲突，报错
type Brother = {
    name: string;
}

type Brother = {
    age: number;
}

const brother: Brother = {
    name: "Bob",
    age: 25
};
console.log(brother.name);
console.log(brother.age);   
```

### 2. 同名属性、冲突类型 

- type 同名属性类型冲突 → 变成 never，interface extends 冲突 → 直接报错
```ts
type A = { id: number }
type B = { id: string }
type C = A & B 
// C 中 id: number & string → never，无法创建实例
// const c: C = { id: 1 } // 直接报错
```

### 3. 同名属性、父子类型 

-  type/interface：同名属性、父子类型，都会自动取更窄的子类型
```ts
type A = { age: number }
type B = { age: 20 } // 字面量类型，是 number 子类型
type C = A & B 
// age 最终类型：20
const c: C = { age: 20 } // 仅能赋值 20
```

### 3. 同名属性、可选属性 + 必选属性冲突

- type/interface：必选属性会覆盖可选属性：

```ts
type A = { age?: number }
type B = { age: number }
type C = A & B 
// age: number（必选）
```

### 4. 只读属性冲突

`readonly` 相遇：**只要有一个只读，最终就是只读**。

---
## 八、泛型对象类型

- 用泛型代替固定的对象类型，让对象类型**复用、类型动态化**，适配不同数据结构。
### 1. 基础泛型对象

语法：`<T>` 定义泛型参数，替代固定类型

```ts
// 通用容器对象，value 类型由外部传入
type Container<T> = {
  id: number
  value: T
}

// T = string
const strBox: Container<string> = { id: 1, value: "hello" }
// T = number
const numBox: Container<number> = { id: 2, value: 100 }
```

### 2. 泛型 + 约束（`extends`）

限制泛型 `T` 必须满足某个对象结构：

```ts
// 约束 T 必须包含 name: string
type HasName = { name: string }
type UserBox<T extends HasName> = {
  data: T
}

const u: UserBox<{ name: "张三"; age: 20 }> = {
  data: { name: "张三", age: 20 }
}
```
### 3. 多泛型参数

```ts
type Pair<K, V> = {
  key: K
  value: V
}

const p: Pair<string, number> = { key: "count", value: 10 }
```

### 4. 泛型 + 索引签名（通用字典）

- 创建**任意键、任意值类型**的通用字典

```ts
type GenericDict<T> = {
  [key: string]: T
}

const numDict: GenericDict<number> = { a: 1, b: 2 }
const strDict: GenericDict<string> = { x: "hi" }
```

---

## 总结

1. **对象类型**：约束对象结构与类型
2. **可选属性 `?`**：属性可缺省
3. **只读 `readonly`**：属性不可二次赋值
4. **索引签名**：适配动态键名的字典对象
5. **扩展类型**：`interface extends` 复用结构
6. **交叉类型 `&`**：合并多类型
7. **冲突处理** ：四种冲突处理
8. **泛型对象**：类型参数化，实现类型复用与动态适配
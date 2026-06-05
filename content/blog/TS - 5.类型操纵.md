---
title: TS - 5.类型操控
date: 2026-02-17
category: 前端开发
tags: [TypeScript]
---
- 类型操纵 ：获取，筛选，改造已有的类型创建新类型。
- 泛型体系 → 类型运算符 (keyof/typeof/ 索引访问) → 条件类型
## 一、泛型

### 1. 泛型基础

- 泛型：通用类型变量，类型参数，实现一份代码适配多种类型，`<T>` 为通用类型变量。

```ts
// <T>：通用类型变量，占位类型
function hello<T>(arg: T): T {
  return arg
}
// 使用：TS自动推导T
hello('hello ts') // T = string
hello(123)       // T = number
```

### 2. 通用类型变量

- 仅约束变量、不固定类型
```ts
// T代表任意传入类型，此处要求arr一定传入一个数组，也可用(arr: Array<T>)表示
function getLen<T>(arr: T[]): number {
  return arr.length
}
getLen([1,2,3])    // T=number
getLen(['a','b'])  // T=string
```

### 3. 泛型类型

- 泛型函数：用泛型定义函数参数和返回值的类型
```ts
// 泛型类型别名
type GenFunc = <T>(x: T) => T
const fn: GenFunc = (v) => v

// 2.泛型函数
function indentity<Type>(arg: Type): Type {
    return arg;
}
// 3.给函数添加类型注解（函数签名），在 let myIdentity = identity 的基础上，强制约束变量必须符合这个函数签名
let myIndentity: <Type>(arg: Type) => Type = indentity;
```

### 4. 泛型类

- 类上加泛型，实例化时确定具体类型

```ts
class GenericNumber<NumType> {
//非空断言 
  zeroValue!: NumType;
  add!: (x: NumType, y: NumType) => NumType;

  constructor() {}
}

let myGeneric = new GenericNumber<number>();
myGeneric.zeroValue = 0;
myGeneric.add = function(x, y) { return x + y; };
console.log(myGeneric.add(myGeneric.zeroValue, 5));
```

### 5. 泛型约束 `extends`

- 限定 T 必须具备某些属性
- 实际上泛型T 是一个类型，extends 扩展了T类型，类型为T的参数类型要符合扩展后的T。


```ts
interface HasLen { length: number }
// T必须实现HasLen
function logLen<T extends HasLen>(arg: T) {
  console.log(arg.length)
}
logLen([1,2])
logLen('abc')
// logLen(123) // 报错，number无length
```

### 6. 泛型约束中使用类型参数

- 用一个类型参数约束另一个

```ts
// K 必须是 T 的键，keyof
function getVal<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}
//
const u = {name:'zs',age:18}
getVal(u,'name')
//getVal(u,'gender') ❌报错
```

### 7. 泛型中使用类类型

- 用于接收类的构造函数（构造器类型 new () => T）

```ts
//定义create函数，传入了类的构造函数，返回一个new对象
function create<T>(ctor: new()=>T): T {
  return new ctor()
}
class User {}
const u = create(User)
```

---
## 二、三大类型操作符

### 1. keyof

- 取对象所有键组成字面量联合类型
- 只能取keyof 类型的键为值
- 在映射类型组合时很有用
```ts
type Person1 = {name:string;age:number}
//只能把Person的键值分配给PKey
type PKey = keyof Person1 // "name"|"age"

const person1: PKey = "name";
const person2: PKey = "age";
```

### 2. typeof

- 从变量中取值的类型

```ts
const obj = {a:1,b:'hi'}
type ObjType = typeof obj // {a:number,b:string}


function getUser() {
  return { name: "zs", age: 18 }
}
// typeof函数可以得到函数类型
//ReturnType需要传入函数类型，获取函数的返回值类型
type User = ReturnType<typeof getUser>
```
- 函数签名，函数类型，函数别名都表示：(参数：类型) => 返回值类型
	1. 函数的身份证 → 函数签名
	2. 函数的类型 → 函数类型
	3. type 定义的别名 → 函数类型别名
### 3. 索引访问类型 `Type[Key]`：

- 取类的属性值为类型，即把类的属性的类型（string，number，boolean..）为字面量作为类型
 
```ts
type Person = {name:string;age:number}

type NameType = Person['name'] // string
type AllVal = Person[keyof Person] // string|number
```

---
## 三、条件类型

- 实现了利用泛型在类型内计算
-  根据条件判断、筛选、返回不同类型
-  三元表达式：`T extends U ? TrueType : FalseType`，其中`T extends U`是条件判断
### 1. 基础条件类型 

```ts
type IsStr<T> = T extends string ? true : false
type A = IsStr<'abc'> // true
type B = IsStr<123>   // false
```

- 可以把联合类型拆成具体的类型
```ts
interface NameId {
    name: string;
}
interface AgeId {
    age: number;
}
// 作用：根据传入的 T 类型，自动选择返回 AgeId 还是 NameId
// T 只能是 number 或 string（泛型约束）
type NameORAge<T extends number|string> = T extends number ? AgeId : NameId;
// T 是传入的参数类型（number / string）
// 返回值类型：NameORAge<T> → 自动匹配
function createLabel<T extends number|string>(input: T): NameORAge<T> {
    if (typeof input === "number") {
        return { age: input } as NameORAge<T>;
    } else {
        return { name: input } as NameORAge<T>;
    }
}
 
const label1 = createLabel(23);// { age: 23 }
const label2 = createLabel("Alice");// { name: "Alice" }
```
### 2. 条件类型约束

- 用条件配合 extends 做类型筛选

```ts
type FilterStr<T> = T extends string ? T : never
type Res = FilterStr<'a'|1|true> // "a"
```

### 3. 条件内类型推断 

- `infer X` 在 extends 分支里提取子类型
- `infer`可以看作一个选择器，三元表达式赋值语句给infer 后方 X 变量赋类型，返回X 
```ts
// 提取函数返回值类型，判断的位置T extends (...args:any[])，T extends 完整类型 ? 真 : 假
type GetReturn<T> = T extends (...args:any[])=>infer R ? R : never
type Fn = ()=>string
type Ret = GetReturn<Fn> // string

// 提取数组元素
type ItemType<T> = T extends Array<infer I> ? I : never
type Num = ItemType<number[]> // number
```

- 实例：提取无参函数的返回值类型
```ts
// 1. 定义一个“类型工具”：提取无参函数的返回值类型
// T extends (...args:never[])判断传入参数是不是never，无参返回R，有参返回never
type GetReturn<T> = T extends (...args:never[])=>infer R ? R : never
// 2. 定义一个无参函数类型：返回 string
type Fn = ()=>string
// 3. 用工具取出 Fn 的返回值类型 → string
type Ret = GetReturn<Fn>
// 4. 定义一个变量，类型必须是 string
const T1: Ret = "Hello, TypeScript!";
```
### 4. 分布式条件类型

- 条件类型遇到联合类型时，默认对联合中的每个成员分别计算，再把结果联合起来。
- 当条件左边是**裸泛型参数 T**，传入联合会逐个遍历运算

```ts
// 1.分布式条件类型
type ToArray<Type> = Type extends any ? Type[] : never;
type StrArrOrNumArr = ToArray<string | number>; // string[] | number[]，数组里要么全是字符串，要么全是数字

const strArr: StrArrOrNumArr = ["Hello", "World"];
const numArr: StrArrOrNumArr = [1, 2, 3];

// 2.非分布式条件类型
type ToArray2<Type> = [Type] extends [any] ? Type[] : never;
type StrArrOrNumArr2 = ToArray2<string | number>; // (string | number)[]，数组里可以字符串数字混着放
const strOrNumArr: StrArrOrNumArr2 = ["Hello", 1, "World", 2];
```

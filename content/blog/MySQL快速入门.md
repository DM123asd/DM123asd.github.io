---
title: MySQL快速入门
date: 2025-09-2
category: 后端开发
tags: [数据库]
---

- 管理关系型数据库的数据库管理系统DBMS
- 管理层级：MySQL-服务器-数据库-表格
### 增
##### 1.增加数据库
```MySQL
CREATE DATABASE 数据库名;
```
##### 2.增加表格 
```MySQL
USE 数据库名;
CREATE TABLE 表格名(
	#列名 数据类型 约束
	列名1 INT AUTO_INCREMENT PRIMARY KEY,
	列名2 VARCHAR() NOT NULL,
	列名3 DATE NULL
);
/*
NOT NULL 非空
NULL 默认NULL
AUTO_INCREMENT 自动递增数字
PRIMARY KEY 主键，唯一数据
*/
```
##### 3.增加数据
```MySQL
INSERT INTO 数据库名.表格名(
列名1,列名2,列名3)
VALUES(
数值1,数值2,数值3);
```
##### 4.增加列
```MySQL
ALTER TABLE 数据库名.表格名
ADD 列名 数据类型 默认条件;
```
##### 5.例：
```MySQL
#创建数据库
CREATE DATABASE egg;
#选择数据库
USE egg;
#创建表格，定义列名、数据类型和约束
CREATE TABLE eggs_record(
	id INT PRIMARY KEY AUTO_INCREMENT,
	egg_name VARCHAR(10) NOT NULL,
	sold DATE NULL
)
#增加数据
#1.完整写法
INSERT INTO egg.eggs_record(id,egg_name,sold)
VALUES(1,'鸡蛋','2020-01-01');
#2.省略列名
INSERT INTO egg.eggs_record
VALUES(2,'鸭蛋','2020-02-02');
#3.省略列名，使用默认值，空值
INSERT INTO egg.eggs_record
VALUES(default,'龟蛋',NULL);
#增加列
ALTER TABLE egg.eggs_record
ADD stock INT NULL;
```
### 改
```MySQL
#需要更改值的表格
UPDATE 数据库名.表格名
#更改的值
SET 值
#定位条件
WHERE 条件;
```
##### 例：
```MySQL
UPDATE egg.eggs_record
SET sold='2022-06-06'
WHERE id=3 
#MySQL中'='既是赋值也是相等
```
### 删
##### 1.删除行
```MySQL
#需要删除数据的表格
DELETE FROM 数据库名.表格名
#定位条件
WHERE 条件;
```
##### 2.删除表格
```MySQL
DROP TABLE 数据库名.表格名;
```
##### 3.删除数据库
```MySQL
DROP DATABASE 数据库名;
```
##### 4.例
```MySQL
#删除行
DELETE FROM egg.eggs_record
WHERE id = 1;
#删除表格
DROP TABLE egg.eggs_record;
#删除数据库
DROP DATABASE egg;
```
### 查
```MySQL
USE 数据库
```
##### 1.查看全部内容
```MySQL
SELECT *
FROM 表格名;
```
##### 2.查看某几列数据
```MySQL
SELECT 列名1,列名2
FROM 表格名;
```
##### 3.查询出某列的所有不重复的值
```MySQL
SELECT DISTINCT *
FROM 表格名;
```
##### 4. 排序方式
```MySQL
SELECT *
FROM 表格名
ORDER BY 列名 ASC;
#列名后ASC顺序：从小到大，DESC逆序：从大到小，不加默认ASC
```
##### 5.查找条件
```MySQL
SELECT *
FROM 表格名
WHERE 条件
ORDER BY 列名 ASC;
#条件可以用比较运算符和逻辑运算符 BETWEEN LIKE IN等等
```
##### 6.例：

```MySQL
USE Egg_database;
#查看全部内容
SELECT *
FROM Covid_month;
#查看某几列数据
SELECT Country, Confirmed, Continent
FROM  Covid_month;
#查询出某列的所有不重复的值
SELECT DISTINCT Continent
FROM Covid_month;
#增加查找条件:康复数>10000并且国家不是巴西，排序根据Confirmed值顺序排列
SELECT *
FROM Covid_month
WHERE Recovered >=10000 AND Country !='Brazil';
#WHERE Recovered BETWEEN 1000000 AND 1500000;数字在1000000-1500000
#WHERE Country IN ('Brazil','India');国家范围在巴西或印度
#WHERE Country LIKE 'B%';B开头的字符
#WHERE Country LIKE '%a';结尾是a的字符
#WHERE Country LIKE '__b%';第三个字母是b的字符
ORDER BY Confirmed ASC;
```

### 合并表格
##### 1. INNER JOIN内连接 交集 水平合并
- 只返回两个表中连接条件匹配的记录
```MySQL
USE 数据库
SELECT *
FROM 左侧表
INNER JOIN 右侧表
#LEFT JOIN 
#RIGHT JOIN
#FULL JOIN 
ON 条件;
```
##### 例：
```MySQL
USE  Egg_database;
SELECT *
#左侧
FROM Covid_month
#右侧
INNER JOIN Covid_total
#国家名为合并条件
ON Covid_month.Country = Covid_total.Country
```
##### 2.左连接 右连接 全外连接
- LEFT JOIN返回左表的所有记录，以及右表中匹配的记录。右表无匹配时，用 `NULL`填充
- RIGHT JOIN返回右表的所有记录，以及左表中匹配的记录。左表无匹配时，用 `NULL`填充
- FULL JOIN 返回左右两表中的所有记录。当某一边无匹配时，用 `NULL`填充。
```MySQL
USE  Egg_database;
SELECT *
#左侧表
FROM Covid_month
#右侧表 左连接
LEFT JOIN Covid_total
# RIGHT JOIN Covid_total
#表名后可用AS定义简写
# FULL JOIN Covid_total AS tt
ON Covid_month.Country = Covid_total.Country
```
##### 2. 并集 垂直合并
```MySQL
USE 数据库;
#两个SELECT后面必须是相同的列
SELECT 列名
FROM 上侧表名
#UNION 无重复值 UNION ALL有重复值
UNION 
SELECT 列名
FROM 下侧表名
```
##### 例
```MySQL
USE Egg_database;
#两个SELECT后面必须是相同的列
SELECT Country
FROM Covid_month 
#UNION 无重复值 UNION ALL有重复值
UNION 
SELECT Country
FROM Covid_total
```
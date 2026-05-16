---
title: 系统设计学习笔记：从单体到微服务
date: 2025-04-15
category: 系统设计
tags: [Architecture, Microservices]
---

梳理系统设计的核心概念。

## 单体架构

单体架构将所有功能打包在一个应用中：

```python
# 简单的单体应用示例
class OrderService:
    def create_order(self, items):
        # 处理订单
        pass

    def process_payment(self, order_id):
        # 处理支付
        pass

    def send_notification(self, user_id, message):
        # 发送通知
        pass
```

## CAP 定理

在分布式系统中，一致性(C)、可用性(A)和分区容错性(P)三者不可兼得：

$$C + A + P \leq 2$$

## 微服务架构

微服务架构将应用拆分为独立的服务：

```yaml
# docker-compose.yml
services:
  api-gateway:
    image: nginx
    ports:
      - "80:80"

  user-service:
    build: ./user-service
    ports:
      - "3001:3001"

  order-service:
    build: ./order-service
    ports:
      - "3002:3002"
```

## 总结

架构选择没有银弹，需要根据实际业务场景权衡。

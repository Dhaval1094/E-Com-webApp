# DynamoDB Guide

## What is DynamoDB?

DynamoDB is AWS NoSQL database service.

Used for:
- users
- products
- authentication data

---

# Create Table

Go to:

```text
AWS Console → DynamoDB
```

---

# Users Table

Primary key:

```text
email
```

---

# Products Table

Primary key:

```text
productId
```

---

# Example Product Item

```json
{
  "productId": "101",
  "name": "iPhone 15",
  "price": 800,
  "imageUrl": "S3_IMAGE_URL"
}
```

---

# Insert Data Manually

Go to:

```text
Explore Table Items → Create Item
```

---

# Scan Products in Express.js

```js
const data =
  await db.scan({
    TableName: "Products"
  }).promise();
```

---

# Insert User Example

```js
await db.put({
  TableName: "Users",
  Item: {
    email,
    password
  }
}).promise();
```

---

# Why DynamoDB?

Benefits:
- serverless
- scalable
- fast
- managed by AWS

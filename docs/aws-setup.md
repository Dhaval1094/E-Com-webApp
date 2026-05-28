# AWS Setup Guide for E-Commerce Demo App

## Introduction

This guide explains how to configure AWS services used in this project:

- AWS S3
- AWS EC2
- AWS DynamoDB
- Security Groups
- Static Website Hosting

---

# AWS Services Used

| Service | Purpose |
|---|---|
| S3 | Frontend hosting + product images |
| EC2 | Backend server hosting |
| DynamoDB | Database |
| IAM | Permissions |
| Security Groups | Firewall rules |

---

# Step 1 — Create S3 Bucket

## Open S3 Console

Go to:

```text
AWS Console → S3
```

Click:

```text
Create Bucket
```

---

# Bucket Configuration

Example bucket names:

```text
ecommerce-frontend-demo
ecommerce-product-images
```

Settings:
- Region: ap-south-1
- Disable Block Public Access
- Enable Static Website Hosting (frontend bucket)

---

# Step 2 — Upload Frontend Files

Upload:
- index.html
- style.css
- login.js
- products.js
- utils.js

---

# Step 3 — Enable Static Website Hosting

Go to:

```text
Bucket → Properties → Static Website Hosting
```

Enable:
- Static Website Hosting
- Index document: index.html

---

# Step 4 — Add Bucket Policy

Example public access policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicRead",
      "Effect": "Allow",
      "Principal": "*",
      "Action": ["s3:GetObject"],
      "Resource": [
        "arn:aws:s3:::YOUR_BUCKET_NAME/*"
      ]
    }
  ]
}
```

---

# Step 5 — Upload Product Images

Upload:
- iPhone.jpg
- MacBook.jpg
- Shoes.jpg

Copy:
```text
Object URL
```

Store URLs inside DynamoDB.

---

# Step 6 — Create EC2 Instance

Go to:

```text
AWS Console → EC2 → Launch Instance
```

Recommended:
- Ubuntu
- t3.micro
- Create key pair

---

# Security Group Rules

Allow:

| Port | Purpose |
|---|---|
| 22 | SSH |
| 3000 | Node.js backend |
| 80 | HTTP |

---

# Step 7 — Connect to EC2

```bash
ssh -i ecommerce-key.pem ubuntu@PUBLIC_IP
```

---

# Step 8 — Install Node.js

```bash
sudo apt update
sudo apt install nodejs npm -y
```

Verify:

```bash
node -v
npm -v
```

---

# Step 9 — Clone GitHub Repository

```bash
git clone YOUR_REPOSITORY_URL
```

---

# Step 10 — Start Backend Server

```bash
npm install
npm run dev
```

---

# Step 11 — Create DynamoDB Tables

Go to:

```text
AWS Console → DynamoDB
```

Create:

## Users Table

Primary key:
```text
email
```

---

## Products Table

Primary key:
```text
productId
```

---

# Step 12 — Add Product Data

Example item:

```json
{
  "productId": "101",
  "name": "iPhone 15",
  "price": 800,
  "imageUrl": "S3_IMAGE_URL"
}
```

---

# Final Deployment Flow

```text
Frontend (S3)
      ↓
Backend APIs (EC2)
      ↓
DynamoDB + S3 Images
```

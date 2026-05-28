# EC2 Deployment Guide

## What is EC2?

EC2 (Elastic Compute Cloud) is a virtual cloud server provided by AWS.

Used for:
- backend hosting
- Node.js applications
- APIs
- Express.js server

---

# Launch EC2 Instance

Go to:

```text
AWS Console → EC2 → Launch Instance
```

Recommended settings:

- Ubuntu
- t3.micro
- Allow SSH
- Allow HTTP
- Allow custom TCP 3000

---

# Create Key Pair

Download:

```text
ecommerce-key.pem
```

Move to safe location.

---

# Connect to EC2

```bash
chmod 400 ecommerce-key.pem
```

```bash
ssh -i ecommerce-key.pem ubuntu@PUBLIC_IP
```

---

# Install Required Packages

```bash
sudo apt update
sudo apt install nodejs npm git -y
```

---

# Clone Repository

```bash
git clone YOUR_GITHUB_REPO
```

---

# Install Dependencies

```bash
npm install
```

---

# Start Backend

```bash
npm run dev
```

---

# Check Running Server

Open:

```text
http://PUBLIC_IP:3000
```

---

# Common EC2 Commands

## Stop server

```bash
CTRL + C
```

---

## Restart server

```bash
npm run dev
```

---

## Pull latest GitHub changes

```bash
git pull
```

---

# Important Notes

## Public IP Changes

EC2 public IP changes after stop/start.

Solution:
- Elastic IP

---

# Security Groups

Security groups act like firewalls.

Allow:
- 22
- 80
- 3000

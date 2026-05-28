# Building a Full-Stack E-Commerce Demo App using Node.js, Express, DynamoDB, S3, and EC2

## Introduction

As a mobile application developer, I wanted to explore how modern web applications are built and deployed using cloud-native services.

This project demonstrates a complete end-to-end E-commerce demo application using:

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js + Express.js
- Database: AWS DynamoDB
- Image Storage: AWS S3
- Backend Hosting: AWS EC2
- Frontend Hosting: AWS S3 Static Website Hosting
- API Communication: AJAX, Fetch API, XMLHttpRequest

The goal was to understand:

- frontend-backend communication
- REST APIs
- cloud deployment
- AWS architecture
- static hosting vs server hosting
- database integration
- real-world application flow

---

# Final Project Architecture

```text
                    ┌──────────────────────┐
                    │      User Browser     │
                    │  (Frontend UI Pages)  │
                    └──────────┬───────────┘
                               │
                               │ HTTP Requests
                               ▼
                ┌─────────────────────────────┐
                │     AWS S3 Static Hosting    │
                │  HTML • CSS • JavaScript     │
                └──────────┬──────────────────┘
                           │
                           │ API Calls (Fetch/AJAX)
                           ▼
                ┌─────────────────────────────┐
                │        AWS EC2 Server        │
                │     Node.js + Express.js     │
                └──────────┬──────────────────┘
                           │
          ┌────────────────┴────────────────┐
          │                                 │
          ▼                                 ▼
┌──────────────────────┐      ┌────────────────────────┐
│    AWS DynamoDB      │      │        AWS S3          │
│ Users & Products DB  │      │   Product Images       │
└──────────────────────┘      └────────────────────────┘
```

---

# Request Flow Example

```text
User Opens Website
        ↓
Frontend Loaded from S3
        ↓
User Clicks Login / Products
        ↓
Frontend Sends API Request
        ↓
Express Server on EC2
        ↓
Fetch Data from DynamoDB
        ↓
Return JSON Response
        ↓
Frontend Updates UI
        ↓
Product Images Loaded from S3
```

---

# Technologies Used

| Technology | Purpose |
|---|---|
| HTML/CSS/JS | Frontend UI |
| Node.js | JavaScript runtime |
| Express.js | Backend APIs |
| DynamoDB | NoSQL database |
| AWS S3 | Frontend hosting + product images |
| AWS EC2 | Backend server hosting |
| AJAX/Fetch | Frontend-backend communication |
| GitHub | Source control |

---

# Project Features

- User Signup
- User Login
- Product Listing Page
- Product Images from S3
- Product Data from DynamoDB
- Responsive UI
- Backend APIs
- Frontend Hosting
- Backend Deployment
- AJAX API calls

---

# Folder Structure

```text
Ecommerce-WebApp-Demo/
│
├── Backend/
│   ├── server.js
│   └── routes/
│       ├── authRoutes.js
│       ├── productRoutes.js
│       └── orderRoutes.js
│
├── Frontend/
│   ├── index.html
│   ├── signup.html
│   ├── products.html
│   ├── login.js
│   ├── script.js
│   ├── products.js
│   ├── style.css
│   └── utils.js
│
├── package.json
└── README.md
```

---

# Step 1 — Backend Setup using Node.js and Express

Initialize project:

```bash
npm init -y
```

Install dependencies:

```bash
npm install express cors aws-sdk
```

Install nodemon:

```bash
npm install --save-dev nodemon
```

---

# Step 2 — Creating Express Server

## server.js

```js
const express = require("express");
const cors = require("cors");

const authRoutes =
  require("./routes/authRoutes");

const productRoutes =
  require("./routes/productRoutes");

const orderRoutes =
  require("./routes/orderRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

app.use(authRoutes);
app.use(productRoutes);
app.use(orderRoutes);

app.listen(3000, () => {
  console.log(
    "Server running on port 3000 🚀"
  );
});
```

---

# Understanding app.listen()

```js
app.listen(3000)
```

This starts the Express server.

Without this:
- backend APIs will not run
- browser cannot communicate with server

---

# Step 3 — Creating Backend Routes

We created separate route files for better project structure.

## authRoutes.js

Handles:
- signup
- login

## productRoutes.js

Handles:
- products APIs

## orderRoutes.js

Handles:
- order APIs

This follows modular backend architecture.

---

# Step 4 — Setting up DynamoDB

We created two DynamoDB tables.

## Users Table

Stores:
- email
- name
- password
- createdAt

## Products Table

Stores:
- productId
- name
- price
- imageUrl

---

# Example DynamoDB Product Item

```json
{
  "productId": "101",
  "name": "iPhone 15",
  "price": 800,
  "imageUrl": "https://bucket-name.s3.amazonaws.com/iphone15.jpg"
}
```

---

# Step 5 — Creating Signup API

```js
router.post("/signup", async (req, res) => {

  const {
    name,
    email,
    password
  } = req.body;

  await db.put({
    TableName: "Users",
    Item: {
      email,
      name,
      password,
      createdAt:
        new Date().toISOString()
    }
  }).promise();

  res.json({
    message:
      "Signup successful"
  });
});
```

---

# Step 6 — Creating Login API

```js
router.post("/login", async (req, res) => {

  const {
    email,
    password
  } = req.body;

  const user = await db.get({
    TableName: "Users",
    Key: { email }
  }).promise();

  if (!user.Item) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  if (
    user.Item.password !== password
  ) {
    return res.status(401).json({
      message: "Invalid password"
    });
  }

  res.json({
    message: "Login successful"
  });
});
```

---

# Step 7 — Frontend Development

We created:

- Login page
- Signup page
- Products page

using:

- HTML
- CSS
- JavaScript

---

# Step 8 — AJAX and API Communication

We used:

- XMLHttpRequest
- Fetch API
- JSON APIs

## Example AJAX Request

```js
const xhr = new XMLHttpRequest();

xhr.open(
  "POST",
  `${baseUrl}/login`
);

xhr.setRequestHeader(
  "Content-Type",
  "application/json"
);

xhr.send(JSON.stringify({
  email,
  password
}));
```

---

# Understanding Frontend-Backend Flow

```text
Frontend Form
      ↓
AJAX Request
      ↓
Express Backend API
      ↓
DynamoDB
      ↓
JSON Response
      ↓
Frontend UI Update
```

---

# Step 9 — Product Listing Page

Products are fetched from backend:

```js
const response =
  await fetch(`${baseUrl}/products`);
```

Backend fetches products from DynamoDB:

```js
const data =
  await db.scan({
    TableName: "Products"
  }).promise();
```

---

# Step 10 — Using AWS S3 for Product Images

Product images were uploaded to S3 bucket.

Each DynamoDB item stores:

```json
"imageUrl":
"https://bucket-name.s3.amazonaws.com/product.jpg"
```

Frontend directly loads images from S3.

---

# Why Use S3 for Images?

Benefits:

- scalable
- cheap storage
- fast delivery
- easy public access
- reduces backend load

---

# Step 11 — Frontend UI Improvements

We improved UI using:

- responsive cards
- navbar
- gradients
- hover animations
- loading spinner
- product details button

This made the demo look closer to a real E-commerce app.

---

# Step 12 — Loading Spinner

```css
.loader {
    border: 4px solid #f3f3f3;

    border-top:
      4px solid #4a90e2;

    border-radius: 50%;

    width: 35px;
    height: 35px;

    animation:
      spin 1s linear infinite;
}
```

Used during:

- login
- signup
- product loading

---

# Step 13 — Hosting Backend on AWS EC2

We launched:

- Ubuntu EC2 instance
- opened required ports:
  - 22 → SSH
  - 3000 → Node.js backend
  - 80 → HTTP

---

# Connecting to EC2

```bash
ssh -i ecommerce-key.pem ubuntu@PUBLIC_IP
```

---

# Cloning Repository on EC2

```bash
git clone REPOSITORY_URL
```

Install dependencies:

```bash
npm install
```

Run backend:

```bash
npm run dev
```

---

# Step 14 — Hosting Frontend on AWS S3

We enabled:

- static website hosting
- public access
- uploaded frontend files

Frontend became publicly accessible.

---

# Frontend Hosting Flow

```text
Browser
   ↓
S3 Static Website
   ↓
HTML/CSS/JS Loaded
   ↓
Frontend Calls EC2 APIs
```

---

# Understanding S3 vs EC2

## S3

Used for:

- static frontend hosting
- product images

Best for:

- HTML
- CSS
- JS
- images

---

## EC2

Used for:

- backend APIs
- Node.js runtime
- Express server
- business logic

Best for:

- authentication
- database communication
- APIs

---

# Why Separate Frontend and Backend?

Benefits:

- better scalability
- reduced backend load
- independent deployments
- cheaper hosting
- industry-standard architecture

---

# Challenges Faced

## 1. CORS Issues

Solved using:

```js
app.use(cors())
```

---

## 2. S3 Access Denied

Solved by:

- disabling block public access
- adding bucket policy

---

## 3. EC2 Public IP Changes

Issue:
- IP changed after restarting instance

Solution:
- Elastic IP

---

## 4. Browser Cache Issues

Solved using cache busting:

```html
style.css?v=2
```

---

# Concepts Learned

This project helped understand:

- REST APIs
- AJAX
- Fetch API
- Express Routing
- DynamoDB CRUD
- AWS Hosting
- Frontend-Backend Communication
- Cloud Architecture
- Static Hosting
- Backend Deployment
- API Integration

---

# Future Improvements

Possible enhancements:

- JWT authentication
- Add to Cart functionality
- Payment integration
- Admin dashboard
- Search and filters
- CloudFront CDN
- CI/CD pipeline
- HTTPS domain setup
- Docker deployment

---

# Final Summary

| Component | Purpose |
|---|---|
| HTML/CSS/JS | Frontend UI |
| Express.js | Backend APIs |
| Node.js | JavaScript runtime |
| DynamoDB | Database |
| S3 | Frontend hosting + images |
| EC2 | Backend server hosting |
| AJAX/Fetch | API communication |
| GitHub | Source control |

---

# Conclusion

This project demonstrates how modern full-stack applications are built using:

- frontend technologies
- backend APIs
- cloud services
- AWS infrastructure

By combining:

- S3
- EC2
- DynamoDB
- Express.js
- JavaScript

we created a complete E-commerce demo application with real-world architecture concepts.

This project was a great hands-on learning experience for understanding:

- cloud deployment
- backend development
- frontend integration
- AWS services
- scalable application architecture

---

# Additional Documentation

- [AWS Setup Guide](https://dhaval1094.github.io/E-Com-webApp/aws-setup)
- [Backend Guide](https://dhaval1094.github.io/E-Com-webApp/backend-guide)
- [DynamoDB Guide](https://dhaval1094.github.io/E-Com-webApp/dynamodb-guide)
- [S3 Hosting Guide](https://dhaval1094.github.io/E-Com-webApp/s3-hosting)
- [FAQs](https://dhaval1094.github.io/E-Com-webApp/FAQs)


# Author

**Dhaval Trivedi**
Mobile Application Developer - iOS, React-Native

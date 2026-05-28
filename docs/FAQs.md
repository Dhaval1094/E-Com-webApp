# FAQs

## 1. Why did we use EC2 for backend hosting?

EC2 is used to run backend server applications like:

- Node.js
- Express.js
- APIs
- authentication logic
- database communication

Unlike S3, EC2 can execute server-side code continuously.

---

## 2. Why did we use S3 for frontend hosting?

S3 is excellent for hosting static files such as:

- HTML
- CSS
- JavaScript
- images

Benefits:
- cheaper hosting
- scalable
- high availability
- easy deployment
- fast static content delivery

---

## 3. Why not host frontend directly on EC2?

Technically we can host frontend on EC2 as well.

But separating frontend and backend provides:

- better scalability
- lower server load
- easier deployments
- lower cost
- industry-standard architecture

This is how most modern applications are designed.

---

## 4. What is the difference between Express.js and EC2?

| Express.js | EC2 |
|---|---|
| Backend framework | Cloud virtual server |
| Creates APIs | Runs applications |
| Handles routes and requests | Hosts backend server |
| Software layer | Infrastructure layer |

Express runs *inside* the EC2 server.

---

## 5. Why use DynamoDB instead of SQL database?

DynamoDB is:

- fully managed
- scalable
- serverless
- fast for JSON-like data

It works very well for:
- authentication systems
- product catalogs
- NoSQL applications

---

## 6. Why store product images in S3 instead of DynamoDB?

DynamoDB is optimized for structured data, not large files.

S3 is better for:
- images
- videos
- static assets

This reduces database load and improves performance.

---

## 7. Why was CORS required in this project?

Frontend and backend were running on different origins:

- S3 frontend URL
- EC2 backend URL

Browsers block such requests by default for security.

We enabled CORS using:

```js
app.use(cors())
```

---

## 8. Why did the EC2 public IP change after restart?

By default, EC2 uses dynamic public IPs.

When instance stops/starts:
- public IP changes

Solution:
- attach an Elastic IP

Elastic IP remains fixed permanently.

---

## 9. Why did S3 images show “Access Denied”?

Because S3 buckets are private by default.

To make images public:
- disable block public access
- add bucket policy
- upload files correctly

---

## 10. Why did frontend changes not appear immediately?

This usually happens because of browser caching.

Solutions:
- hard refresh browser
- clear cache
- use versioning

Example:

```html
style.css?v=2
```

---

## 11. Why use AJAX / Fetch API?

AJAX allows frontend to communicate with backend APIs without reloading the page.

Used for:
- login
- signup
- fetching products
- dynamic UI updates

---

## 12. Can frontend and backend communicate without Express.js?

Yes.

Frontend can communicate directly with:
- serverless functions
- Firebase
- AWS Lambda
- API Gateway

But Express.js simplifies:
- routing
- middleware
- request handling
- API organization

---

## 13. Why use GitHub in this project?

GitHub helps with:

- source control
- version history
- collaboration
- deployment workflows
- EC2 code pull updates

---

## 14. Why use Nodemon during development?

Nodemon automatically restarts the Node.js server whenever code changes are detected.

This improves developer productivity.

---

## 15. Why use separate route files?

Separate route files improve:

- code organization
- readability
- scalability
- maintainability

Example:

- authRoutes.js
- productRoutes.js
- orderRoutes.js

```
````

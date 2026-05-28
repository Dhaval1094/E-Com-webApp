# S3 Frontend Hosting Guide

## Why Use S3?

S3 is best for hosting:
- HTML
- CSS
- JavaScript
- images

Benefits:
- low cost
- scalable
- high availability

---

# Create Bucket

Go to:

```text
AWS Console → S3
```

Click:
```text
Create Bucket
```

---

# Upload Frontend Files

Upload:
- index.html
- products.html
- style.css
- login.js

---

# Enable Static Website Hosting

Go to:

```text
Bucket → Properties
```

Enable:
```text
Static Website Hosting
```

Index document:
```text
index.html
```

---

# Disable Block Public Access

Go to:

```text
Permissions → Block Public Access
```

Disable:
```text
Block all public access
```

---

# Add Public Bucket Policy

```json
{
  "Version":"2012-10-17",
  "Statement":[
    {
      "Sid":"PublicRead",
      "Effect":"Allow",
      "Principal":"*",
      "Action":["s3:GetObject"],
      "Resource":[
        "arn:aws:s3:::YOUR_BUCKET/*"
      ]
    }
  ]
}
```

---

# Final Website URL

Example:

```text
http://bucket-name.s3-website.ap-south-1.amazonaws.com
```

---

# Updating Frontend

After code changes:
- upload updated files again
- refresh browser
- clear cache if needed

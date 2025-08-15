# AgriLink Backend API Documentation

## Overview
This document describes the backend API endpoints for the AgriLink agricultural management system.

## Authentication
The API uses JWT (JSON Web Tokens) for authentication. Tokens can be sent in:
- Authorization header: `Bearer <token>`
- HTTP-only cookies: `token=<token>`

## Base URL
- Development: `http://localhost:3000/api`

## Data Models

### User
- `id`: ObjectId
- `firstName`: String (required)
- `lastName`: String (required)
- `email`: String (required, unique)
- `password`: String (required, hashed)
- `userType`: 'farmer' | 'officer' (required)
- `phone`: String (optional)
- `isActive`: Boolean (default: true)
- `lastLogin`: Date (optional)
- `createdAt`: Date
- `updatedAt`: Date

### Farmer Profile
- `userId`: ObjectId (ref: User)
- `farmLocation`: Object (address, district, province, coordinates)
- `farmSize`: Number (acres)
- `cropTypes`: Array of strings
- `farmingExperience`: Number (years)
- `governmentId`: String (unique)
- `bankDetails`: Object (optional)
- `profileImage`: String (optional)
- `isVerified`: Boolean (default: false)
- **Backend Framework**: Node.js with Express.js / Python with FastAPI / Java Spring Boot
- **Database**: PostgreSQL (primary) + Redis (caching)
- **Authentication**: JWT tokens with refresh token mechanism
- **File Storage**: AWS S3 / Google Cloud Storage / Cloudinary
- **Real-time**: WebSocket / Server-Sent Events
- **Email Service**: SendGrid / AWS SES
- **Deployment**: Docker + AWS/GCP/Azure

### **Database Schema Highlights**
```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  password_hash VARCHAR NOT NULL,
  role ENUM('farmer', 'officer', 'admin'),
  name VARCHAR NOT NULL,
  phone VARCHAR,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Farmers table (extends users)
CREATE TABLE farmers (
  id UUID PRIMARY KEY REFERENCES users(id),
  farm_size VARCHAR,
  location VARCHAR,
  crops JSONB,
  status ENUM('pending', 'active', 'suspended'),
  total_submissions INTEGER DEFAULT 0,
  average_quality DECIMAL(3,2),
  total_earnings DECIMAL(10,2) DEFAULT 0
);

-- Crop submissions table
CREATE TABLE crop_submissions (
  id UUID PRIMARY KEY,
  farmer_id UUID REFERENCES farmers(id),
  crop_type VARCHAR NOT NULL,
  quantity DECIMAL(10,2),
  harvest_date DATE,
  quality_grade VARCHAR,
  status ENUM('pending', 'approved', 'rejected'),
  quality_score DECIMAL(3,2),
  price_per_unit DECIMAL(8,2),
  final_amount DECIMAL(10,2),
  submitted_at TIMESTAMP DEFAULT NOW(),
  reviewed_at TIMESTAMP,
  reviewed_by UUID REFERENCES users(id)
);
```

---

## 🔐 **Authentication & User Management APIs**

### **1. User Registration**
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890",
  "role": "farmer",
  "farmDetails": {
    "farmSize": "10 acres",
    "location": "District A, State B",
    "crops": ["Rice", "Wheat", "Corn"]
  }
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Registration successful. Verification email sent.",
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "john@example.com",
    "name": "John Doe",
    "role": "farmer",
    "status": "pending"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**What happens backend:**
- Validates email uniqueness
- Hashes password using bcrypt
- Creates user and farmer records
- Generates JWT access token (15 minutes) and refresh token (7 days)
- Sends welcome/verification email
- Returns user data and tokens

### **2. User Login**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "farmer",
    "status": "active"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### **3. Token Refresh**
```http
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### **4. Logout**
```http
POST /api/auth/logout
Authorization: Bearer <token>

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 👨‍🌾 **Farmer Dashboard APIs**

### **5. Farmer Dashboard Data**
```http
GET /api/farmer/dashboard
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "stats": {
    "totalSubmissions": 25,
    "pendingReviews": 3,
    "approvedSubmissions": 20,
    "rejectedSubmissions": 2,
    "totalEarnings": 125000.50,
    "averageQuality": 8.5,
    "thisMonthSubmissions": 5,
    "thisMonthEarnings": 25000.00
  },
  "recentSubmissions": [
    {
      "id": "sub_001",
      "cropType": "Rice",
      "quantity": 100,
      "status": "approved",
      "qualityScore": 9.0,
      "earnings": 5000,
      "submittedDate": "2025-08-10T10:30:00Z",
      "reviewedDate": "2025-08-12T14:20:00Z"
    }
  ],
  "notifications": [
    {
      "id": "not_001",
      "type": "submission_approved",
      "title": "Crop Submission Approved",
      "message": "Your rice submission has been approved with quality score 9.0",
      "isRead": false,
      "createdAt": "2025-08-12T14:20:00Z"
    }
  ],
  "upcomingEvents": [
    {
      "type": "fertilizer_delivery",
      "date": "2025-08-20",
      "description": "NPK fertilizer delivery scheduled"
    }
  ]
}
```

**Backend Process:**
- Aggregates farmer's submission data
- Calculates earnings and statistics
- Fetches recent notifications
- Returns paginated recent submissions

### **6. Submit Crop**
```http
POST /api/farmer/submissions
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "cropType": "Rice",
  "quantity": 100.5,
  "harvestDate": "2025-08-10",
  "qualityGrade": "A",
  "location": "Field A, Section 2",
  "notes": "First harvest of the season",
  "images": [File, File, File] // Max 5 images, 5MB each
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "submission": {
    "id": "sub_002",
    "farmerId": "123e4567-e89b-12d3-a456-426614174000",
    "cropType": "Rice",
    "quantity": 100.5,
    "status": "pending",
    "submittedAt": "2025-08-14T09:15:00Z",
    "estimatedReviewDate": "2025-08-16T09:15:00Z",
    "trackingNumber": "TT-2025-001002"
  },
  "message": "Crop submission successful. You will be notified when reviewed."
}
```

**Backend Process:**
- Validates farmer authentication and status
- Uploads images to cloud storage
- Creates submission record with unique ID
- Sends notification to assigned officers
- Triggers email confirmation to farmer

### **7. Get Farmer Submissions**
```http
GET /api/farmer/submissions?page=1&limit=10&status=all&sortBy=submittedAt&order=desc
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "submissions": [
    {
      "id": "sub_001",
      "cropType": "Rice",
      "quantity": 100,
      "qualityGrade": "A",
      "status": "approved",
      "qualityScore": 9.0,
      "pricePerUnit": 50.00,
      "totalAmount": 5000.00,
      "deductions": 0.00,
      "finalAmount": 5000.00,
      "submittedDate": "2025-08-10T10:30:00Z",
      "reviewedDate": "2025-08-12T14:20:00Z",
      "reviewComments": "Excellent quality rice, no issues found.",
      "images": [
        "https://storage.example.com/images/img1.jpg",
        "https://storage.example.com/images/img2.jpg"
      ],
      "officer": {
        "name": "Officer Smith",
        "id": "off_001"
      }
    }
  ],
  "pagination": {
    "total": 25,
    "page": 1,
    "limit": 10,
    "totalPages": 3,
    "hasNext": true,
    "hasPrev": false
  },
  "filters": {
    "statusCounts": {
      "pending": 3,
      "approved": 20,
      "rejected": 2
    }
  }
}
```

---

## 👮‍♂️ **Officer Dashboard APIs**

### **8. Officer Dashboard Data**
```http
GET /api/officer/dashboard
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "stats": {
    "pendingSubmissions": 15,
    "todayReviews": 8,
    "weekReviews": 45,
    "activeFarmers": 120,
    "pendingFarmers": 5,
    "totalFertilizerDistributed": 5000,
    "lowStockAlerts": 3
  },
  "pendingSubmissions": [
    {
      "id": "sub_003",
      "farmer": {
        "id": "farmer_001",
        "name": "John Doe",
        "phone": "+1234567890",
        "farmSize": "10 acres",
        "location": "District A"
      },
      "cropType": "Rice",
      "quantity": 150,
      "submittedDate": "2025-08-13T08:30:00Z",
      "priority": "high",
      "daysWaiting": 1,
      "images": ["url1", "url2"]
    }
  ],
  "recentActivities": [
    {
      "type": "submission_reviewed",
      "description": "Reviewed rice submission from John Doe",
      "timestamp": "2025-08-13T16:45:00Z"
    }
  ],
  "alerts": [
    {
      "type": "low_stock",
      "message": "NPK 10-26-26 fertilizer stock is below threshold",
      "severity": "warning"
    }
  ]
}
```

### **9. Get Pending Submissions for Review**
```http
GET /api/officer/submissions/pending?page=1&limit=20&priority=all&crop=all&sortBy=submittedAt
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "submissions": [
    {
      "id": "sub_003",
      "farmer": {
        "id": "farmer_001",
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "+1234567890",
        "farmSize": "10 acres",
        "location": "District A, State B",
        "farmingExperience": "5 years",
        "averageQuality": 8.2,
        "totalSubmissions": 25
      },
      "cropType": "Rice",
      "quantity": 150.0,
      "qualityGrade": "A",
      "harvestDate": "2025-08-12",
      "submittedDate": "2025-08-13T08:30:00Z",
      "location": "Field B, Section 1",
      "notes": "Second harvest of the season",
      "images": [
        {
          "id": "img_001",
          "url": "https://storage.example.com/submissions/img1.jpg",
          "type": "crop_sample",
          "uploadedAt": "2025-08-13T08:30:00Z"
        }
      ],
      "priority": "high",
      "daysWaiting": 1,
      "estimatedValue": 7500.00
    }
  ],
  "pagination": {
    "total": 15,
    "page": 1,
    "limit": 20,
    "totalPages": 1
  }
}
```

### **10. Review Crop Submission**
```http
POST /api/officer/submissions/{submissionId}/review
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "approved",
  "qualityScore": 8.5,
  "pricePerUnit": 52.00,
  "comments": "Good quality rice with minor moisture content issues",
  "deductions": [
    {
      "reason": "Moisture content slightly high",
      "percentage": 2,
      "amount": 156.00
    }
  ],
  "recommendations": [
    "Improve drying process",
    "Check storage conditions"
  ],
  "nextSteps": "approved_for_pickup"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "submission": {
    "id": "sub_003",
    "status": "approved",
    "qualityScore": 8.5,
    "pricePerUnit": 52.00,
    "totalAmount": 7800.00,
    "deductions": 156.00,
    "finalAmount": 7644.00,
    "reviewedAt": "2025-08-14T10:15:00Z",
    "reviewedBy": "off_001"
  },
  "notifications": {
    "farmerNotified": true,
    "emailSent": true,
    "smsScheduled": true
  },
  "message": "Submission reviewed successfully. Farmer has been notified."
}
```

**Backend Process:**
- Validates officer permissions
- Updates submission status and details
- Calculates final payment amount
- Creates audit log entry
- Sends real-time notification to farmer
- Triggers email and SMS notifications
- Updates farmer statistics
- Creates payment record for processing

---

## 🌾 **Fertilizer Distribution APIs**

### **11. Get Fertilizer Inventory**
```http
GET /api/fertilizer/inventory?category=all&status=all
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "inventory": [
    {
      "id": "fert_001",
      "name": "NPK 10-26-26",
      "category": "compound",
      "composition": {
        "nitrogen": 10,
        "phosphorus": 26,
        "potassium": 26
      },
      "currentStock": 500,
      "unit": "kg",
      "minThreshold": 100,
      "maxCapacity": 2000,
      "pricePerUnit": 25.00,
      "lastRestocked": "2025-08-01T09:00:00Z",
      "expiryDate": "2025-12-31",
      "status": "in_stock",
      "supplier": "AgriCorp Ltd",
      "location": "Warehouse A, Section 2"
    }
  ],
  "summary": {
    "totalItems": 15,
    "lowStockItems": 3,
    "outOfStockItems": 1,
    "totalValue": 125000.00
  }
}
```

### **12. Farmer Fertilizer Request**
```http
POST /api/fertilizer/requests
Authorization: Bearer <token>
Content-Type: application/json

{
  "fertilizers": [
    {
      "fertilizerId": "fert_001",
      "quantity": 50,
      "urgency": "medium",
      "purpose": "rice_cultivation"
    }
  ],
  "deliveryAddress": {
    "address": "Farm Address Line 1",
    "district": "District A",
    "state": "State B",
    "pincode": "123456"
  },
  "preferredDeliveryDate": "2025-08-20",
  "contactPerson": {
    "name": "John Doe",
    "phone": "+1234567890"
  },
  "additionalNotes": "Please deliver between 9 AM to 5 PM"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "request": {
    "id": "req_001",
    "requestNumber": "FR-2025-001",
    "farmerId": "farmer_001",
    "status": "pending",
    "totalCost": 1250.00,
    "estimatedDeliveryDate": "2025-08-22",
    "createdAt": "2025-08-14T11:30:00Z"
  },
  "message": "Fertilizer request submitted successfully. You will be notified once approved."
}
```

### **13. Officer Approve/Reject Fertilizer Request**
```http
PUT /api/fertilizer/requests/{requestId}/review
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "approved",
  "deliveryDate": "2025-08-22",
  "deliverySlot": "morning",
  "assignedVehicle": "TRK-001",
  "notes": "Approved for delivery. Vehicle assigned.",
  "modifications": [
    {
      "fertilizerId": "fert_001",
      "approvedQuantity": 45,
      "reason": "Limited stock availability"
    }
  ]
}
```

---

## 👥 **Farmer Management APIs**

### **14. Get All Farmers (Officer)**
```http
GET /api/officer/farmers?page=1&limit=20&status=all&search=&sortBy=name&order=asc
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "farmers": [
    {
      "id": "farmer_001",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "status": "active",
      "farmDetails": {
        "farmSize": "10 acres",
        "location": "District A, State B",
        "crops": ["Rice", "Wheat"],
        "farmingType": "organic"
      },
      "statistics": {
        "totalSubmissions": 25,
        "averageQuality": 8.5,
        "totalEarnings": 125000.50,
        "successRate": 92
      },
      "joinDate": "2025-01-15T00:00:00Z",
      "lastActivity": "2025-08-13T14:30:00Z",
      "documentsStatus": "verified",
      "riskLevel": "low"
    }
  ],
  "pagination": {
    "total": 120,
    "page": 1,
    "limit": 20,
    "totalPages": 6
  },
  "summary": {
    "totalFarmers": 120,
    "activeFarmers": 115,
    "pendingApproval": 3,
    "suspendedFarmers": 2
  }
}
```

### **15. Update Farmer Status**
```http
PUT /api/officer/farmers/{farmerId}/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "suspended",
  "reason": "Quality issues reported multiple times",
  "notes": "Temporary suspension pending investigation",
  "notifyFarmer": true
}
```

---

## 📊 **Reports & Analytics APIs**

### **16. Officer Analytics Dashboard**
```http
GET /api/officer/analytics?period=monthly&year=2025&month=8
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "overview": {
    "totalFarmers": 120,
    "activeFarmers": 115,
    "totalSubmissions": 500,
    "approvedSubmissions": 450,
    "rejectedSubmissions": 30,
    "pendingSubmissions": 20,
    "totalRevenue": 2500000.00,
    "averageQuality": 8.2,
    "fertilizerDistributed": 15000
  },
  "monthlyTrends": [
    {
      "month": "2025-08",
      "submissions": 45,
      "revenue": 225000.00,
      "avgQuality": 8.3,
      "newFarmers": 5
    }
  ],
  "cropDistribution": [
    {
      "crop": "Rice",
      "percentage": 45,
      "submissions": 225,
      "revenue": 1125000.00
    },
    {
      "crop": "Wheat",
      "percentage": 30,
      "submissions": 150,
      "revenue": 750000.00
    }
  ],
  "qualityTrends": [
    {
      "date": "2025-08-01",
      "averageQuality": 8.1
    }
  ],
  "topPerformers": [
    {
      "farmerId": "farmer_001",
      "name": "John Doe",
      "submissions": 12,
      "avgQuality": 9.2,
      "earnings": 60000.00
    }
  ],
  "regionAnalysis": [
    {
      "region": "District A",
      "farmers": 35,
      "submissions": 150,
      "avgQuality": 8.5
    }
  ]
}
```

### **17. Export Reports**
```http
GET /api/reports/export?type=pdf&reportType=monthly&period=2025-08&filters={}
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "downloadUrl": "https://storage.example.com/reports/monthly-2025-08.pdf",
  "expiresAt": "2025-08-15T12:00:00Z",
  "reportId": "rep_001"
}
```

---

## 🔔 **Notifications APIs**

### **18. Get User Notifications**
```http
GET /api/notifications?page=1&limit=20&type=all&isRead=all
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "notifications": [
    {
      "id": "not_001",
      "type": "submission_approved",
      "title": "Crop Submission Approved",
      "message": "Your rice submission (SUB-001) has been approved with quality score 8.5",
      "isRead": false,
      "priority": "high",
      "createdAt": "2025-08-14T10:15:00Z",
      "actionUrl": "/submissions/sub_001",
      "metadata": {
        "submissionId": "sub_001",
        "qualityScore": 8.5,
        "amount": 7644.00
      }
    }
  ],
  "pagination": {
    "total": 25,
    "page": 1,
    "limit": 20,
    "unreadCount": 5
  }
}
```

### **19. Mark Notification as Read**
```http
PUT /api/notifications/{notificationId}/read
Authorization: Bearer <token>
```

### **20. Mark All Notifications as Read**
```http
PUT /api/notifications/mark-all-read
Authorization: Bearer <token>
```

---

## 📄 **Document Management APIs**

### **21. Upload Documents**
```http
POST /api/documents/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "category": "farmer_verification",
  "documents": [File, File],
  "metadata": {
    "farmerId": "farmer_001",
    "documentType": "identity_proof"
  }
}
```

### **22. Get Farmer Documents**
```http
GET /api/documents/farmer/{farmerId}?category=all&status=all
Authorization: Bearer <token>
```

### **23. Verify Document**
```http
PUT /api/documents/{documentId}/verify
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "verified",
  "notes": "All documents are valid and complete",
  "verifiedBy": "off_001"
}
```

---

## 🔄 **Real-time Features**

### **WebSocket Events**
```javascript
// Client connection
const socket = io('ws://localhost:3001', {
  auth: {
    token: 'jwt_token_here'
  }
});

// Events farmer can receive
socket.on('submission_reviewed', (data) => {
  // Handle submission review notification
});

socket.on('fertilizer_approved', (data) => {
  // Handle fertilizer request approval
});

// Events officer can receive
socket.on('new_submission', (data) => {
  // Handle new submission notification
});

socket.on('farmer_registered', (data) => {
  // Handle new farmer registration
});
```

---

## 🛡️ **Security & Authentication**

### **JWT Token Structure**
```json
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "userId": "123e4567-e89b-12d3-a456-426614174000",
    "email": "john@example.com",
    "role": "farmer",
    "iat": 1692014400,
    "exp": 1692015300
  }
}
```

### **Protected Route Middleware**
```javascript
// Pseudo-code for route protection
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

const requireRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
};
```

---

## 📈 **Performance Considerations**

### **Caching Strategy**
- **Redis Cache**: User sessions, frequently accessed data
- **Database Indexing**: User email, submission status, farmer ID
- **CDN**: Static assets, document storage
- **API Rate Limiting**: Prevent abuse and ensure fair usage

### **Database Optimization**
```sql
-- Key indexes for performance
CREATE INDEX idx_submissions_farmer_status ON crop_submissions(farmer_id, status);
CREATE INDEX idx_submissions_date ON crop_submissions(submitted_at DESC);
CREATE INDEX idx_farmers_status ON farmers(status);
CREATE INDEX idx_notifications_user_read ON notifications(user_id, is_read, created_at DESC);
```

---

## 🚀 **Deployment & Monitoring**

### **Environment Configuration**
```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/tech_triathlon
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your_super_secret_key
JWT_REFRESH_SECRET=your_refresh_secret_key
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# File Storage
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_S3_BUCKET=tech-triathlon-storage
AWS_REGION=us-east-1

# Email Service
SENDGRID_API_KEY=your_sendgrid_key
FROM_EMAIL=noreply@techriathlon.com

# SMS Service (optional)
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token

# Application
NODE_ENV=production
PORT=3001
CORS_ORIGIN=https://your-frontend-domain.com
```

### **Health Check Endpoint**
```http
GET /api/health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-08-14T12:00:00Z",
  "services": {
    "database": "connected",
    "redis": "connected",
    "storage": "accessible"
  },
  "version": "1.0.0"
}
```

---

## 📞 **Error Handling**

### **Standard Error Response Format**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Email is required"
      }
    ]
  },
  "timestamp": "2025-08-14T12:00:00Z",
  "requestId": "req_123456"
}
```

### **HTTP Status Codes**
- **200**: OK - Request successful
- **201**: Created - Resource created successfully
- **400**: Bad Request - Invalid input data
- **401**: Unauthorized - Authentication required
- **403**: Forbidden - Insufficient permissions
- **404**: Not Found - Resource not found
- **409**: Conflict - Resource already exists
- **422**: Unprocessable Entity - Validation failed
- **429**: Too Many Requests - Rate limit exceeded
- **500**: Internal Server Error - Server error

---

## 🎯 **Implementation Priority**

### **Phase 1 (MVP)**
1. Authentication & User Management
2. Basic Farmer Dashboard
3. Crop Submission APIs
4. Basic Officer Review System
5. Simple Notifications

### **Phase 2**
1. Fertilizer Distribution System
2. Advanced Analytics
3. Document Management
4. Real-time Updates
5. Mobile API optimizations

### **Phase 3**
1. Advanced Reporting
2. AgriLink Marketplace
3. Payment Integration
4. Advanced Security Features
5. Performance Optimizations

---

This comprehensive API documentation should guide your backend development team in creating a robust, scalable agricultural platform! 🌱

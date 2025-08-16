# 🌾 AgriLink - Agricultural Management Platform

A comprehensive Next.js-based agricultural management system that connects farmers with government officers, facilitating crop submissions, fertilizer distribution, and agricultural services.

## 🚀 Features

### 🔐 Authentication & User Management
- JWT-based authentication with secure HTTP-only cookies
- Role-based access control (Farmer/Officer)
- User registration and profile management
- Password encryption with bcrypt

### 🌱 Core Agricultural Features
- **Crop Submission System** - Track and manage crop submissions
- **Fertilizer Distribution** - Request and manage fertilizer allocation
- **Service Booking** - Book government agricultural services
- **Appointment Scheduling** - Schedule meetings with officers
- **Document Management** - Upload and manage agricultural documents
- **Real-time Notifications** - Stay updated with important notifications

### 📊 Dashboard & Analytics
- Role-specific dashboards for farmers and officers
- Real-time statistics and activity tracking
- Service usage analytics
- Notification management

### 🔍 Advanced Features
- Full-text search across multiple entities
- Geospatial location tracking
- File upload with validation
- Pagination and filtering
- Mobile-responsive design

## 🏗️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Material-UI
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with NextAuth.js
- **File Storage**: Local file system
- **Styling**: Material-UI with custom themes

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v18 or higher)
- npm or yarn package manager
- MongoDB Atlas account (or local MongoDB instance)
- Git

For Docker setup:
- Docker Desktop
- Docker Compose

## 🚀 Getting Started

### Method 1: Running Without Docker (Recommended for Development)

#### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd tech-triathlon
```

#### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

#### 3. Environment Setup
Create a `.env.local` file in the root directory:

```bash
# Database
MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NEXTAUTH_SECRET=your-nextauth-secret-key
NEXTAUTH_URL=http://localhost:3000

# File Upload
MAX_FILE_SIZE=10485760
UPLOAD_DIR=./public/uploads
```

#### 4. Create Upload Directory
```bash
mkdir -p public/uploads/documents
mkdir -p public/uploads/profiles
mkdir -p public/uploads/crops
```

#### 5. Run Development Server
```bash
npm run dev
# or
yarn dev
```

#### 6. Access the Application
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Method 2: Running With Docker

#### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd tech-triathlon
```

#### 2. Environment Setup
Create a `.env.local` file with the same variables as above.

#### 3. Build and Run with Docker Compose
```bash
# Build and start the container
docker-compose up --build

# Or run in detached mode
docker-compose up -d --build
```

#### 4. Access the Application
Open [http://localhost:3000](http://localhost:3000) in your browser.

#### 5. Stop the Application
```bash
# Stop the containers
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

### Alternative Docker Commands

#### Build the Docker Image
```bash
docker build -t agrilink-app .
```

#### Run the Container
```bash
docker run -p 3000:3000 --env-file .env.local agrilink-app
```





## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks

# Docker
docker-compose up --build    # Build and run with Docker
docker-compose down         # Stop Docker containers
```



## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret key for JWT tokens | Yes |
| `NEXTAUTH_SECRET` | NextAuth.js secret | Yes |
| `NEXTAUTH_URL` | Application URL | Yes |
| `MAX_FILE_SIZE` | Maximum file upload size | No (default: 10MB) |
| `UPLOAD_DIR` | File upload directory | No (default: ./public/uploads) |

### MongoDB Setup

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Replace `<username>` and `<password>` in the connection string
5. Add the connection string to your `.env.local` file

## 🔒 Security Features

- JWT-based authentication with HTTP-only cookies
- Password hashing with bcrypt (12 rounds)
- File upload validation and size limits
- Input sanitization and validation
- Role-based access control
- Secure headers and CORS configuration

## 📱 Usage

### For Farmers:
1. Register as a farmer
2. Complete your farm profile
3. Submit crop information
4. Request fertilizers
5. Book agricultural services
6. Upload required documents
7. Track application status

### For Officers:
1. Register as an officer
2. Manage service offerings
3. Review crop submissions
4. Process fertilizer requests
5. Schedule farmer appointments
6. Update application statuses
7. Generate reports

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Docker Production Deployment

```bash
# Build production image
docker build -t agrilink-prod .

# Run production container
docker run -p 3000:3000 --env-file .env.production agrilink-prod
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email support@agrilink.com or create an issue in the repository.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Material-UI for the component library
- MongoDB for the database solution
- All contributors and supporters of this project

---

**Made with ❤️ for the agricultural community**
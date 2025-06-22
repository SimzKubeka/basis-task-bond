# 🕵️ James Bond Mission Control - Ping Communication System

A Next.js-based web application that simulates a James Bond-themed mission control system where agents can send and receive "pings" (location-based messages) with coordinates and encrypted communications.

## 🎯 Overview

This application provides a secure, themed interface for agents to:

- **Send Pings**: Create location-based messages with GPS coordinates
- **View Communications**: Browse all sent pings in both card and table formats
- **Track Missions**: Monitor ping history and communication patterns
- **Authenticate**: Secure login/registration system for agent access

## ✨ Features

### 🔐 Authentication System

- **Agent Registration**: New agents can register for mission access
- **Secure Login**: JWT-based authentication with bcrypt password hashing
- **Session Management**: Persistent authentication across browser sessions
- **Protected Routes**: All mission features require authentication

### 📡 Ping Communication

- **Location Pings**: Send messages with GPS coordinates (latitude/longitude)
- **Random Coordinates**: Generate random locations for mission simulation
- **Message Content**: Include detailed mission reports with each ping
- **Parent-Child Relationships**: Respond to previous pings for conversation threads
- **Real-time Updates**: Immediate feedback on ping transmission

### 📊 Mission Dashboard

- **Recent Pings**: Card-based view of latest communications
- **All Pings Table**: Comprehensive list view with sorting capabilities
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Mission Statistics**: Track communication patterns and activity

### 🎨 James Bond Theming

- **Dark Interface**: Sleek, professional dark theme with green accents
- **Agent Terminology**: Mission control, secure uplink, clearance access
- **Responsive Navigation**: Sidebar and navbar with mobile optimization
- **Loading States**: Themed loading messages and animations
- **Error Handling**: Contextual error messages with recovery options

## 🏗️ Architecture

### Frontend (Next.js 15 + React 19)

- **App Router**: Modern Next.js file-based routing system
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Utility-first styling with custom dark theme
- **Client Components**: Interactive features with 'use client' directive
- **Error Boundaries**: Comprehensive error handling at multiple levels

### Backend (API Routes)

- **Authentication API**: `/api/auth` - Login and registration endpoints
- **Ping Management**: `/api/pings` - CRUD operations for ping communications
- **Individual Pings**: `/api/pings/[id]` - Specific ping operations

### Database (MongoDB + Mongoose)

- **User Model**: Agent authentication and profile data
- **Ping Model**: Location, message, timestamp, and relationship data
- **Data Validation**: Mongoose schemas with proper validation

### Security Features

- **JWT Tokens**: Secure authentication with JSON Web Tokens
- **Password Hashing**: bcryptjs for secure password storage
- **Protected Routes**: Authentication middleware for secure access
- **Input Validation**: Server-side validation for all user inputs

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB database (local or cloud)
- npm, yarn, pnpm, or bun package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd basis-task-bond
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Database Setup**

   - Ensure MongoDB is running
   - The application will automatically create collections on first use

5. **Start Development Server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Access the Application**
   Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
basis-task-bond/
├── app/                          # Next.js App Router
│   ├── (authenticated)/          # Protected routes
│   │   ├── all-pings/           # Ping history table view
│   │   ├── dashboard/           # Main mission control
│   │   ├── send-ping/           # Ping creation interface
│   │   ├── error.tsx            # Authenticated error boundary
│   │   ├── loading.tsx          # Authenticated loading state
│   │   └── layout.tsx           # Authenticated layout wrapper
│   ├── api/                     # API routes
│   │   ├── auth/                # Authentication endpoints
│   │   └── pings/               # Ping management endpoints
│   ├── error.tsx                # Global error boundary
│   ├── loading.tsx              # Global loading component
│   ├── not-found.tsx            # 404 error page
│   ├── page.tsx                 # Home/login page
│   └── layout.tsx               # Root layout
├── components/                   # Reusable React components
│   ├── LoginForm.tsx            # Authentication form
│   ├── NavBar.tsx               # Navigation header
│   ├── PingCard.tsx             # Individual ping display
│   ├── PingTable.tsx            # Tabular ping view
│   ├── RegisterForm.tsx         # Registration form
│   └── Sidebar.tsx              # Navigation sidebar
├── lib/                         # Utility libraries
│   ├── auth.ts                  # Authentication utilities
│   ├── dbConnect.ts             # Database connection
│   ├── models/                  # Mongoose models
│   │   ├── Ping.ts              # Ping data model
│   │   └── User.ts              # User data model
│   └── pingData.ts              # Ping data utilities
├── styles/                      # Global styles
│   └── globals.css              # Tailwind CSS configuration
└── public/                      # Static assets
```

## 🎮 Usage Guide

### For New Agents (Registration)

1. Navigate to the home page
2. Click "Need access clearance? Register"
3. Fill in your agent credentials
4. Submit to create your mission account

### For Existing Agents (Login)

1. Enter your credentials on the home page
2. Click "LOGIN TO MISSION CONTROL"
3. Access your secure dashboard

### Sending Pings

1. Navigate to "Send Ping" from the sidebar
2. Click "Generate Coordinates" for random location
3. Enter your mission message
4. Optionally respond to the last ping
5. Click "Send Ping" to transmit

### Viewing Communications

- **Dashboard**: Recent pings in card format
- **All Pings**: Complete history in table format
- **Individual Pings**: Click on ping cards for details

## 🛠️ Development

### Available Scripts

```bash
npm run dev      # Start development server with Turbopack
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint for code quality
```

### Key Technologies

- **Next.js 15.3.4**: React framework with App Router
- **React 19**: Latest React with concurrent features
- **TypeScript 5**: Type-safe development
- **Tailwind CSS 4**: Modern utility-first CSS
- **MongoDB 6.17**: NoSQL database
- **Mongoose 8.16**: MongoDB object modeling
- **JWT 9.0.2**: JSON Web Token authentication
- **bcryptjs 3.0.2**: Password hashing
- **react-hot-toast 2.5.2**: Toast notifications
- **react-icons 5.5.0**: Icon library

### Code Quality

- **ESLint**: Code linting and style enforcement
- **TypeScript**: Static type checking
- **Prettier**: Code formatting (via Tailwind CSS)

## 🔧 Configuration

### Environment Variables

- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token signing

### Tailwind Configuration

- Custom dark theme with green accents
- Responsive breakpoints for mobile/desktop
- Custom font (Share Tech Mono) for terminal aesthetic

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎯 Mission Objectives

- ✅ Secure agent authentication system
- ✅ Location-based ping communications
- ✅ Real-time mission dashboard
- ✅ Responsive design for all devices
- ✅ James Bond-themed user experience
- ✅ Comprehensive error handling
- ✅ Type-safe development with TypeScript

---

**For mission support, contact your handler or create an issue in this repository.**

_"The name's Bond. James Bond."_ 🕵️

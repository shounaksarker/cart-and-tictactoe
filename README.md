# 🎯 Assignment Hub - Interactive Gaming & Product Management Platform

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15.4.5-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Prisma](https://img.shields.io/badge/Prisma-6.13.0-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2.8.2-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.23.12-0055FF?style=for-the-badge&logo=framer&logoColor=white)

**A modern, full-stack application combining interactive gaming with enterprise-grade CRUD operations**

[🎮 Live Demo](https://cart-tictac.shounakraj.com) • [📖 Documentation](https://github.com/shounaksarker/cart-and-tictactoe) • [🚀 Quick Start](#installation) • [💡 Features](#features)

</div>

---

## 🌟 Project Overview

**Assignment Hub** is a comprehensive web application that seamlessly integrates two distinct but powerful features:

### 🎮 **Interactive Tic-Tac-Toe Game**
- **Player Management**: Custom player name setup with validation
- **Match System**: Best-of-5 rounds tournament format
- **Smart Scoring**: Dynamic scoring system with match tracking
- **Persistent Leaderboard**: Historical performance tracking with Redux Persist
- **Victory Celebrations**: Animated victory screens with confetti effects

### 🛍️ **Advanced Product Management System**
- **Full CRUD Operations**: Create, Read, Update, Delete products
- **Advanced Filtering**: Multi-parameter search and filter system
- **Smart Pagination**: Optimized data loading with pagination
- **Real-time Search**: Instant search across product names and descriptions
- **Responsive Design**: Mobile-first design with fixed filter panels

---

## ✨ Features

### 🎯 **Core Functionality**

<table>
<tr>
<td width="50%">

#### 🎮 **Gaming Features**
- ✅ **Player Setup** with validation
- ✅ **Interactive Game Board** with animations
- ✅ **Real-time Score Tracking**
- ✅ **Match History & Statistics**
- ✅ **Leaderboard System**
- ✅ **Victory Animations & Confetti**
- ✅ **Responsive Mobile Gaming**

</td>
<td width="50%">

#### 🛍️ **Product Management**
- ✅ **Complete CRUD Operations**
- ✅ **Advanced Search & Filtering**
- ✅ **Price Range Filtering**
- ✅ **Category Management**
- ✅ **Image Upload Support**
- ✅ **Stock Management**
- ✅ **Active/Inactive Status**

</td>
</tr>
</table>

### 🎨 **Technical Excellence**

- **🚀 Performance**: Next.js 15 with Turbopack for lightning-fast development
- **🎭 Animations**: Framer Motion for smooth, professional animations
- **🎯 State Management**: Redux Toolkit with persistence for reliable state
- **🗃️ Database**: Prisma ORM with MySQL for robust data management
- **🎨 Styling**: Tailwind CSS 4 for modern, responsive design
- **🔒 Type Safety**: Full TypeScript implementation
- **📱 Responsive**: Mobile-first design with tablet and desktop optimization

---

## 🛠️ Tech Stack

### **Frontend**
```bash
🔹 Next.js 15.4.5          # React framework with App Router
🔹 React 19.1.0            # Latest React with concurrent features
🔹 TypeScript 5.0          # Static type checking
🔹 Tailwind CSS 4.0        # Utility-first CSS framework
🔹 Framer Motion 12.23.12  # Animation library
🔹 Lucide React 0.536.0    # Modern icon library
```

### **State Management**
```bash
🔹 Redux Toolkit 2.8.2     # Modern Redux with less boilerplate
🔹 React Redux 9.2.0       # React bindings for Redux
🔹 Redux Persist 6.0.0     # Persist Redux state
```

### **Backend & Database**
```bash
🔹 Prisma 6.13.0           # Modern database toolkit
🔹 MySQL 8.0               # Relational database
🔹 Next.js API Routes      # Serverless API endpoints
```

### **Form & Validation**
```bash
🔹 React Hook Form 7.62.0  # Performant forms library
🔹 Zod 4.0.14              # TypeScript-first schema validation
🔹 Hookform Resolvers 5.2.1 # Zod integration for forms
```

### **UI Components**
```bash
🔹 RC Slider 11.1.8        # Customizable range slider
🔹 Sonner 2.0.7            # Toast notifications
🔹 Custom Components       # Hand-crafted UI components
```

---

## 🚀 Installation

### **Prerequisites**

Ensure you have the following installed:
- **Node.js** 18.0 or higher
- **npm** or **yarn**
- **MySQL** 8.0 or higher (XAMPP, MAMP, or standalone)
- **Git**

### **1. Clone the Repository**

```bash
git clone https://github.com/shounaksarker/cart-and-tictactoe.git
cd cart-and-tictactoe
```

### **2. Install Dependencies**

```bash
npm install
# or
yarn install
```

### **3. Environment Setup**

Create a `.env` file in the root directory:

```env
# Database Configuration
DATABASE_URL="mysql://username:password@localhost:3306/crud_product"

# Next.js Configuration
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Optional: Development Settings
NODE_ENV="development"
```

### **4. Database Setup**

```bash
# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Seed the database (optional)
npm run db:seed
```

### **5. Start Development Server**

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application! 🎉

### **🌐 Live Demo**

Experience the application live at: **[cart-tictac.shounakraj.com](https://cart-tictac.shounakraj.com)**

---

## 📁 Project Structure

```
cart-and-tictactoe/
├── 📂 prisma/                  # Database schema and migrations
│   ├── schema.prisma          # Prisma database schema
│   ├── seed.ts               # Database seeding script
│   └── migrations/           # Database migration files
├── 📂 public/                 # Static assets
├── 📂 src/
│   ├── 📂 app/               # Next.js App Router
│   │   ├── 📂 api/           # API routes
│   │   │   └── 📂 products/  # Product CRUD endpoints
│   │   ├── 📂 game/          # Tic-tac-toe game page
│   │   ├── 📂 leaderboard/   # Leaderboard page
│   │   ├── 📂 products/      # Product management pages
│   │   ├── 📂 victory/       # Victory screen page
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Home page
│   │   └── globals.css       # Global styles
│   ├── 📂 components/        # Shared components
│   │   ├── 📂 navigation/    # Navigation components
│   │   └── 📂 providers/     # Context providers
│   ├── 📂 features/          # Feature-based modules
│   │   ├── 📂 tictactoe/     # Tic-tac-toe game logic
│   │   │   ├── 📂 components/ # Game components
│   │   │   ├── 📂 hooks/     # Game hooks
│   │   │   └── 📂 utils/     # Game utilities
│   │   └── 📂 products/      # Product management
│   │       ├── 📂 components/ # Product components
│   │       ├── 📂 hooks/     # Product hooks
│   │       └── 📂 utils/     # Product utilities
│   ├── 📂 store/             # Redux store configuration
│   │   ├── 📂 slices/        # Redux slices
│   │   ├── hooks.ts          # Typed Redux hooks
│   │   └── index.ts          # Store configuration
│   ├── 📂 types/             # TypeScript type definitions
│   ├── 📂 lib/               # Utility libraries
│   └── 📂 utils/             # Helper functions
├── package.json              # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── README.md               # Project documentation
```

---

## 🎮 Game Features

### **Tic-Tac-Toe Gameplay**

<div align="center">

| Feature | Description | Status |
|---------|-------------|--------|
| 🎯 **Player Setup** | Custom name validation & setup | ✅ Complete |
| 🎮 **Interactive Board** | Click-to-play with animations | ✅ Complete |
| 🏆 **Match System** | Best-of-5 rounds tournament | ✅ Complete |
| 📊 **Live Scoring** | Real-time score updates | ✅ Complete |
| 🎊 **Victory Screen** | Animated celebrations | ✅ Complete |
| 📈 **Leaderboard** | Persistent player statistics | ✅ Complete |

</div>

### **Game Rules**
- **Match Format**: Best of 5 rounds
- **Scoring**: Winner gets 2 points, loser gets 1 point
- **Victory Condition**: First player to win 3 rounds
- **Statistics**: Wins, losses, draws, and win rate tracking

---

## 🛍️ Product Management

### **CRUD Operations**

<div align="center">

| Operation | Endpoint | Description | Features |
|-----------|----------|-------------|----------|
| **CREATE** | `POST /api/products` | Add new product | ✅ Form validation, image upload |
| **READ** | `GET /api/products` | List products | ✅ Pagination, search, filtering |
| **UPDATE** | `PUT /api/products/[id]` | Update product | ✅ Partial updates, validation |
| **DELETE** | `DELETE /api/products/[id]` | Remove product | ✅ Confirmation dialog |

</div>

### **Advanced Filtering**

- **🔍 Search**: Product names and descriptions
- **🏷️ Categories**: Electronics, Clothing, Books, etc.
- **💰 Price Range**: Adjustable min/max with slider
- **📊 Status**: Active/Inactive products
- **📱 Responsive**: Fixed sidebar on desktop, floating button on mobile

---

## 🔧 Development Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npx prisma generate  # Generate Prisma client
npx prisma migrate   # Run database migrations
npx prisma studio    # Open Prisma Studio
npm run db:seed      # Seed database with sample data

# Type Checking
npx tsc --noEmit     # Check TypeScript types
```

---

## 🌐 API Endpoints

### **Products API**

```typescript
// GET /api/products - List products with filtering
Query Parameters:
- page: number (pagination)
- limit: number (items per page)  
- search: string (search term)
- category: string (filter by category)
- minPrice: number (minimum price)
- maxPrice: number (maximum price)
- isActive: boolean (active status)

// POST /api/products - Create new product
Body: {
  name: string,
  description: string,
  price: number,
  category: string,
  stock: number,
  imageUrl: string,
  tags: string[],
  isActive: boolean
}

// PUT /api/products/[id] - Update product
// DELETE /api/products/[id] - Delete product
```

---

## 🎨 Design Philosophy

### **Visual Design**
- **🎨 Modern UI**: Clean, minimalist design with subtle animations
- **🌈 Color Palette**: Purple-blue gradient theme with carefully chosen accents
- **📱 Mobile-First**: Responsive design that works on all screen sizes
- **⚡ Performance**: Optimized loading with skeleton screens and lazy loading

### **User Experience**
- **🎯 Intuitive Navigation**: Clear navigation with breadcrumbs
- **🔄 Real-time Feedback**: Instant validation and loading states
- **🎊 Micro-interactions**: Delightful animations and transitions
- **♿ Accessibility**: Semantic HTML with proper ARIA labels

---

## 🚀 Deployment

### **Vercel (Recommended)**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel

# Set environment variables in Vercel dashboard
# - DATABASE_URL
# - NEXTAUTH_SECRET
```

### **Docker**

```dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### **Development Guidelines**
- Follow the existing code style
- Add TypeScript types for new features
- Write meaningful commit messages
- Update documentation for new features

---

## 📋 Environment Variables

```env
# Required Environment Variables
DATABASE_URL="mysql://username:password@localhost:3306/database_name"

# Optional Environment Variables
NODE_ENV="development"          # development | production
NEXTAUTH_SECRET="your-secret"   # For authentication (if added)
NEXTAUTH_URL="http://localhost:3000"  # Base URL
```

---

## 🐛 Troubleshooting

### **Common Issues**

**Database Connection Error**
```bash
# Check MySQL service is running
# Verify DATABASE_URL is correct
# Run: npx prisma migrate dev
```

**Build Errors**
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

**Type Errors**
```bash
# Regenerate Prisma client
npx prisma generate
```

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Shounak Sarker**
- 🌐 Portfolio: [shounakraj.com](https://shounakraj.com)
- 💼 GitHub: [@shounaksarker](https://github.com/shounaksarker)
- 🚀 Live Project: [cart-tictac.shounakraj.com](https://cart-tictac.shounakraj.com)
- 📧 Contact: [GitHub Profile](https://github.com/shounaksarker)

---

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **Prisma Team** for the excellent ORM
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for smooth animations
- **Redux Toolkit** for simplified state management

---

<div align="center">

**⭐ If you find this project helpful, please give it a star! ⭐**

Made with ❤️ and lots of ☕

[Back to Top ⬆️](#-assignment-hub---interactive-gaming--product-management-platform)

</div>
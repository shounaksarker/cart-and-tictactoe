# Product Management CRUD Setup

## 🚀 Quick Start

This project includes a full-featured Product Management CRUD application with modern UI/UX.

### Prerequisites

- Node.js 18+ 
- MySQL database
- npm or yarn

### Database Setup

1. **Create MySQL Database:**
   ```sql
   CREATE DATABASE ifarmer_products;
   ```

2. **Update Environment Variables:**
   ```bash
   # Update .env file with your MySQL credentials
   DATABASE_URL="mysql://username:password@localhost:3306/ifarmer_products"
   ```

3. **Run Database Migration:**
   ```bash
   npx prisma migrate dev --name init
   ```

4. **Seed Sample Data (Optional):**
   ```bash
   npx prisma db seed
   ```

### Development

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Start Development Server:**
   ```bash
   npm run dev
   ```

3. **Access the Application:**
   - Open http://localhost:3000
   - Navigate to "Products CRUD" tab

## 🎯 Features

### ✅ Complete CRUD Operations
- **Create**: Add new products with full validation
- **Read**: View products with pagination, search, and filters
- **Update**: Edit existing product information
- **Delete**: Remove products with confirmation dialog

### 🔍 Advanced Search & Filtering
- **Real-time search** by product name
- **Category filtering** with sidebar
- **Price range filtering**
- **Status filtering** (Active/Inactive)
- **Responsive filters** with mobile support

### 📋 Product Management Features
- **Pagination** with customizable page sizes
- **Image preview** with fallback handling
- **Tag management** with add/remove functionality
- **Stock tracking** with validation
- **Status management** (Active/Inactive products)

### 🎨 Modern UI/UX
- **Responsive design** for all screen sizes
- **Smooth animations** with Framer Motion
- **Beautiful gradients** and modern styling
- **Loading states** and error handling
- **Toast notifications** for user feedback
- **Accessibility** focused design

### 🔒 Form Validation
- **Real-time validation** with Zod schema
- **Required field** validation
- **Data type** validation (numbers, URLs, etc.)
- **Length limits** and custom rules
- **User-friendly** error messages

## 📁 Project Structure

```
src/
├── app/
│   ├── api/products/           # API routes
│   └── products/               # Product pages
├── features/products/
│   └── components/             # Product components
├── store/slices/               # Redux store
├── types/                      # TypeScript types
└── lib/                        # Utilities (Prisma)
```

## 🛠 Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **State Management**: Redux Toolkit
- **Database**: MySQL with Prisma ORM
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Notifications**: Sonner

## 🎯 Usage

### Creating Products
1. Click "Add Product" button
2. Fill in all required fields
3. Add optional tags and set status
4. Submit to create the product

### Searching & Filtering
1. Use the search bar for real-time name search
2. Apply filters from the right sidebar
3. Use pagination to navigate through results

### Managing Products
1. View product details by clicking "View"
2. Edit products using the edit button
3. Delete products with confirmation dialog

## 🔧 Configuration

### Environment Variables
```env
DATABASE_URL="mysql://username:password@localhost:3306/ifarmer_products"
NEXTAUTH_URL="http://localhost:3000"  
NEXTAUTH_SECRET="your-secret-key-here"
```

### Database Schema
The application uses a single `Product` model with the following fields:
- `id`: Unique identifier
- `name`: Product name (required)
- `description`: Product description (required)
- `price`: Product price (required)
- `category`: Product category (required)
- `stock`: Stock quantity (default: 0)
- `imageUrl`: Product image URL (required)
- `tags`: Array of tags (optional)
- `isActive`: Product status (default: true)
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

## 🚀 Production Deployment

1. Set up production MySQL database
2. Update environment variables
3. Run database migrations
4. Build and deploy the application

```bash
npm run build
npm start
```

## 📝 Notes

- All form validations are client-side and server-side
- Images are loaded from external URLs with fallback handling
- The application includes proper error handling and loading states
- Mobile-responsive design works on all screen sizes
- Accessibility features included for better user experience
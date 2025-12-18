# IoT Store - E-Commerce Application

An e-commerce web application for selling IoT (Internet of Things) components and electronics. This is a full-stack application built with modern web technologies, featuring a responsive design, user authentication, shopping cart, order management, and admin features.

## Features

### Customer Features
- **Product Browsing**: View and search for IoT components with detailed information
- **Shopping Cart**: Add, remove, and manage items in your cart
- **User Authentication**: Register and login securely
- **Order Management**: Place orders and track your purchases
- **Payment Processing**: Secure PayPal payment integration
- **Product Reviews**: Leave and read customer reviews and ratings
- **User Profile**: Manage your personal information and address

### Admin Features
- **Product Management**: Add, edit, and delete products
- **Order Management**: View and manage all customer orders
- **User Management**: Manage customer accounts
- **Data Import/Export**: Seed or clear database with sample data
- **Admin Dashboard**: View statistics and manage store operations

## Technology Stack

### Backend
- **Framework**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) with bcrypt password hashing
- **File Upload**: Multer for image uploads
- **Utilities**: 
  - Dotenv for environment variables
  - CORS for cross-origin requests
  - Cookie-parser for session management

### Frontend
- **Framework**: React 18 with Vite
- **Routing**: React Router v6
- **State Management**: Redux Toolkit
- **Forms**: React Hook Form with Zod validation
- **UI Components**: Radix UI with Tailwind CSS
- **Styling**: Tailwind CSS with animations
- **Payment**: PayPal SDK integration
- **Icons**: Lucide React and React Icons
- **Data Table**: TanStack React Table

## Project Structure

```
e-commerce/
├── backend/                 # Express.js server
│   ├── config/             # Database configuration
│   ├── controllers/        # Request handlers for products, users, orders
│   ├── routes/             # API route definitions
│   ├── models/             # MongoDB data models
│   ├── middleware/         # Authentication and error handling
│   ├── datas/              # Sample data for seeding
│   ├── utils/              # Utility functions
│   ├── server.js           # Server entry point
│   └── seeder.js           # Database seeding script
│
└── frontend/               # React Vite application
    ├── src/
    │   ├── components/     # Reusable React components
    │   │   ├── admin/      # Admin-specific components
    │   │   ├── ui/         # UI component library
    │   │   └── widgets/    # Widget components
    │   ├── screens/        # Page components (Home, Product, Cart, etc.)
    │   ├── slices/         # Redux state slices
    │   ├── utils/          # Utility functions
    │   ├── assets/         # Images and static files
    │   ├── App.jsx         # Main app component
    │   └── main.jsx        # React entry point
    └── public/             # Static files
        └── uploads/        # User-uploaded files
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud instance like MongoDB Atlas)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd e-commerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   PAYPAL_ID_CLIENT=your_paypal_client_id
   NODE_ENV=development
   ```

4. **Seed the database** (optional)
   ```bash
   npm run data:import
   ```

## Running the Application

### Development Mode
Run both backend and frontend concurrently:
```bash
npm run dev
```

### Backend Only
```bash
npm run server
```

### Frontend Only
```bash
npm run client
```

### Production Mode
```bash
npm run build
npm start
```

## Available Scripts

- `npm start` - Start the production server
- `npm run server` - Start backend with nodemon (auto-reload)
- `npm run client` - Start frontend development server
- `npm run dev` - Run backend and frontend concurrently
- `npm run data:import` - Import sample data to MongoDB
- `npm run data:destroy` - Delete all sample data from MongoDB
- `npm run build` - Build for production

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Users
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details
- `GET /api/orders` - Get user orders
- `PUT /api/orders/:id/pay` - Update payment status

### Upload
- `POST /api/upload` - Upload product image

## Key Features Explained

### Authentication
- User registration and login with secure password hashing
- JWT tokens stored in secure HTTP-only cookies
- Protected routes for authenticated users and admins

### Shopping Cart
- Redux-based cart state management
- Persistent cart data
- Real-time cart updates

### Order Management
- Multi-step checkout process with shipping information
- Order summary and review
- PayPal payment integration
- Order tracking

### Admin Features
- Restricted admin-only routes
- Product CRUD operations
- Order and user management capabilities

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

Abed Nego

## Support

For issues and questions, please open an issue in the repository.

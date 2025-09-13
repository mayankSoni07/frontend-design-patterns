# MicroFrontend E-commerce Architecture

A complete microfrontend architecture project built with React.js, Next.js, TypeScript, Redux Toolkit, and Tailwind CSS.

## 🏗️ Architecture Overview

This project consists of 4 separate repositories:

- **`frontend-common/`** - Shared library with reusable components, utilities, hooks, types, and store setup
- **`home-to-cart/`** - Microfrontend for home, product listing, product details, and user profile
- **`checkout/`** - Microfrontend for checkout flow (address, payment, summary)
- **`order/`** - Microfrontend for order management, history, and returns

## 🛠 Tech Stack

- **React.js 18** + **Next.js 14** + **TypeScript**
- **Redux Toolkit** for state management
- **Tailwind CSS** for styling
- **Axios** with middleware for API handling
- **Server Side Rendering (SSR)** with `getServerSideProps`
- **Docker** for containerization

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Docker (optional)

### Option 1: Run with Docker Compose (Recommended)

```bash
# Clone the repository
git clone <repository-url>
cd MicroFrontend

# Build and start all services
docker-compose up --build

# Access the applications:
# Home/Cart: http://localhost:3001
# Checkout: http://localhost:3002  
# Orders: http://localhost:3003
```

### Option 2: Run Locally

```bash
# Install and build frontend-common first
cd frontend-common
npm install
npm run build

# Install and run each microfrontend
cd ../home-to-cart
npm install
npm run dev  # Runs on port 3001

cd ../checkout
npm install  
npm run dev  # Runs on port 3002

cd ../order
npm install
npm run dev  # Runs on port 3003
```

## 📁 Project Structure

```
MicroFrontend/
├── frontend-common/          # Shared library
│   ├── src/
│   │   ├── components/       # Button, Header, Footer, Loader, Card
│   │   ├── constants/        # API endpoints, configs
│   │   ├── utils/           # formatCurrency, dateFormatter
│   │   ├── hooks/           # useFetch, useAuth
│   │   ├── types/           # Shared TS interfaces
│   │   └── store/           # Redux Toolkit base store
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
├── home-to-cart/            # Microfrontend 1
│   ├── src/
│   │   ├── pages/           # /, /plp, /pdp, /profile
│   │   ├── components/      # ProductCard, CartSummary
│   │   ├── containers/      # HomeContainer
│   │   ├── redux/           # cartSlice, productSlice
│   │   └── middleware/      # cartMiddleware
│   └── ...
├── checkout/                # Microfrontend 2  
│   ├── src/
│   │   ├── pages/           # /, /address, /payment, /summary
│   │   ├── components/      # AddressForm, PaymentForm, OrderSummary
│   │   └── redux/           # checkoutSlice
│   └── ...
├── order/                   # Microfrontend 3
│   ├── src/
│   │   ├── pages/           # /, /order-list, /order-detail, /returns
│   │   ├── components/      # OrderCard, OrderTimeline, OrderStatusBadge
│   │   └── redux/           # orderSlice
│   └── ...
└── docker-compose.yml       # Orchestrates all services
```

## 🔄 Integration & Communication

### Shared Library Usage

Each microfrontend imports from `frontend-common`:

```typescript
import { Button, Header, Footer, formatCurrency, useFetch, useAuth } from 'frontend-common';
```

### State Management

- **Base store** in `frontend-common` with auth slice
- Each microfrontend **extends** the base store with local slices
- **Redux Toolkit** for predictable state updates

### API Middleware

Centralized axios configuration with:
- **Authentication** token handling
- **Request/response** interceptors
- **Error handling** and logging
- **Token refresh** logic

## 🌐 Routes & Navigation

### Home-to-Cart (Port 3001)
- `/` - Homepage with featured products
- `/plp` - Product listing page with filters
- `/pdp?id=<productId>` - Product details page
- `/profile` - User profile and cart management

### Checkout (Port 3002)
- `/` - Checkout overview
- `/address` - Shipping address selection
- `/payment` - Payment method selection  
- `/summary` - Order review and confirmation

### Order (Port 3003)
- `/` - Order management dashboard
- `/order-list` - Order history with filters
- `/order-detail?id=<orderId>` - Detailed order view
- `/returns` - Returns and refunds management

## 🐳 Docker Configuration

Each repository includes:
- **Dockerfile** for containerization
- **Multi-stage builds** for optimization
- **Volume mounts** for development
- **Environment variables** for configuration

## 🔧 Development

### Adding New Features

1. **Shared functionality** → Add to `frontend-common`
2. **Microfrontend-specific** → Add to respective repository
3. **Update dependencies** → Rebuild `frontend-common` and reinstall in microfrontends

### Code Organization

- **Components** - Reusable UI components
- **Containers** - Smart components with business logic
- **Redux slices** - State management per domain
- **Middleware** - Cross-cutting concerns (API, auth, logging)

### Best Practices

- **Absolute imports** with TypeScript paths
- **Isolated Redux slices** per microfrontend
- **Shared types** and interfaces in `frontend-common`
- **Consistent styling** with Tailwind CSS
- **SSR support** for better SEO and performance

## 📦 Deployment

### Production Build

```bash
# Build all services
docker-compose -f docker-compose.prod.yml up --build

# Or build individually
cd frontend-common && npm run build
cd home-to-cart && npm run build  
cd checkout && npm run build
cd order && npm run build
```

### Environment Variables

Set these in your deployment environment:
- `NEXT_PUBLIC_API_BASE_URL` - Backend API URL
- `NODE_ENV` - Environment (development/production)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For questions and support:
- Create an issue in the repository
- Check the documentation in each microfrontend's README
- Review the shared components in `frontend-common`

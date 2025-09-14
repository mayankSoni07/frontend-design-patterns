# Frontend Design Patterns - Microfrontend E-commerce Architecture


> A microfrontend architecture demonstrating modern e-commerce patterns with independent deployable services, shared component library, and unified state management with React.js, Next.js, TypeScript, Redux Toolkit, and Tailwind CSS.

## 🏗️ Architecture Overview

This project consists of 4 separate repositories:

- **`frontend-common/`** - Shared library with reusable components, utilities, hooks, types, and store setup
- **`home-to-cart/`** - Microfrontend for home, product listing, product details, and user profile
- **`checkout/`** - Microfrontend for checkout flow (address, payment, summary)
- **`order/`** - Microfrontend for order management, history, and returns

## 🛠 Tech Stack

### Core Technologies
- **[Next.js 14.0.0](https://nextjs.org/)** - React framework with SSR/SSG capabilities
- **[React 18.2.0](https://reactjs.org/)** - UI library with concurrent features
- **[TypeScript 5.0.0](https://www.typescriptlang.org/)** - Type-safe JavaScript

### State Management & API
- **[Redux Toolkit 1.9.7](https://redux-toolkit.js.org/)** - Predictable state container
- **[React Redux 8.1.3](https://react-redux.js.org/)** - React bindings for Redux
- **[Axios 1.6.0](https://axios-http.com/)** - HTTP client with interceptors

### Styling & UI
- **[Tailwind CSS 3.3.0](https://tailwindcss.com/)** - Utility-first CSS framework
- **[PostCSS 8.4.0](https://postcss.org/)** - CSS processing tool
- **[Autoprefixer 10.4.0](https://autoprefixer.github.io/)** - CSS vendor prefixing

### Development & Build Tools
- **[ESLint 8.0.0](https://eslint.org/)** - Code linting and formatting
- **[Docker](https://www.docker.com/)** - Containerization and deployment
- **[Docker Compose](https://docs.docker.com/compose/)** - Multi-container orchestration

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Docker (optional)

### Option 1: Run with Docker Compose (Recommended)

```bash
# Clone the repository
git clone <repository-url>
cd microfrontend-design-pattern

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
microfrontend-design-pattern/
├── frontend-common/              # Shared Component Library
│   ├── src/
│   │   ├── components/           # Button, Header, Footer, Loader, Card
│   │   │   ├── Button.tsx        # Reusable button component
│   │   │   ├── Card.tsx          # Generic card wrapper
│   │   │   ├── Footer.tsx        # Application footer
│   │   │   ├── Header.tsx        # Navigation header
│   │   │   └── Loader.tsx        # Loading spinner
│   │   ├── constants/            # API endpoints, app configs
│   │   ├── hooks/                # Custom React hooks (useFetch, useAuth)
│   │   ├── store/                # Redux Toolkit base store setup
│   │   ├── types/                # Shared TypeScript interfaces
│   │   ├── utils/                # Utility functions
│   │   └── index.ts              # Main export file
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
├── home-to-cart/                 # Product & Cart Microfrontend
│   ├── src/
│   │   ├── pages/                # Next.js pages
│   │   │   ├── index.tsx         # Homepage
│   │   │   ├── plp.tsx           # Product listing page
│   │   │   ├── pdp.tsx           # Product detail page
│   │   │   └── profile.tsx       # User profile & cart
│   │   ├── components/           # Feature-specific components
│   │   ├── containers/           # Smart components with business logic
│   │   ├── redux/                # Local state slices
│   │   ├── middleware/           # Custom middleware
│   │   └── styles/               # Tailwind CSS configuration
│   ├── package.json
│   ├── next.config.js
│   └── Dockerfile
├── checkout/                     # Checkout Flow Microfrontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── index.tsx         # Checkout overview
│   │   │   ├── address.tsx       # Shipping address
│   │   │   ├── payment.tsx       # Payment methods
│   │   │   └── summary.tsx       # Order confirmation
│   │   ├── components/           # Checkout-specific components
│   │   ├── redux/                # Checkout state management
│   │   └── styles/
│   ├── package.json
│   ├── next.config.js
│   └── Dockerfile
├── order/                        # Order Management Microfrontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── index.tsx         # Order dashboard
│   │   │   ├── order-list.tsx    # Order history
│   │   │   ├── order-detail.tsx  # Detailed order view
│   │   │   └── returns.tsx       # Returns & refunds
│   │   ├── components/           # Order-specific components
│   │   ├── redux/                # Order state management
│   │   └── styles/
│   ├── package.json
│   ├── next.config.js
│   └── Dockerfile
├── docker-compose.yml            # Multi-service orchestration
├── .gitignore
└── README.md
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

Configure these environment variables for each service:

```bash
# Required for all microfrontends
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
NODE_ENV=production

# Optional configuration
PORT=3000                    # Service port (overridden in docker-compose)
```

### Production Deployment

```bash
# Build optimized production images
docker-compose -f docker-compose.prod.yml up --build

# Or deploy individual services
docker build -t home-to-cart:prod -f home-to-cart/Dockerfile .
docker build -t checkout:prod -f checkout/Dockerfile .
docker build -t order:prod -f order/Dockerfile .
```

## 🧪 Testing

### Running Tests

```bash
# Run tests for all services
npm run test

# Run tests for specific service
cd home-to-cart && npm test
cd checkout && npm test
cd order && npm test

# Run tests with coverage
npm run test:coverage
```

### Test Structure

- **Unit Tests**: Component and utility function testing
- **Integration Tests**: Redux store and API middleware testing
- **E2E Tests**: Cross-microfrontend user flow testing

## 🚀 Performance & Optimization

### Key Features

- **Code Splitting**: Automatic route-based code splitting with Next.js
- **Tree Shaking**: Unused code elimination in production builds
- **Image Optimization**: Next.js automatic image optimization
- **Bundle Analysis**: Built-in bundle analyzer for size optimization

### Performance Metrics

- **Lighthouse Score**: 90+ across all metrics
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Bundle Size**: < 250KB per microfrontend

## 🔒 Security

### Implementation

- **CSP Headers**: Content Security Policy implementation
- **HTTPS Only**: Secure communication in production
- **Input Validation**: Client and server-side validation
- **XSS Protection**: React's built-in XSS prevention

## 🤝 Contributing

### Development Workflow

1. **Fork** the repository
2. **Clone** your fork locally
3. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
4. **Install** dependencies (`npm install` in each service)
5. **Make** your changes following the coding standards
6. **Test** your changes (`npm test`)
7. **Commit** with conventional commits (`git commit -m 'feat: add amazing feature'`)
8. **Push** to your branch (`git push origin feature/amazing-feature`)
9. **Open** a Pull Request with detailed description

### Coding Standards

- **TypeScript**: Strict mode enabled
- **ESLint**: Airbnb configuration with custom rules
- **Prettier**: Code formatting consistency
- **Conventional Commits**: Standardized commit messages

## 📊 Monitoring & Analytics

### Built-in Monitoring

- **Error Tracking**: Centralized error logging
- **Performance Monitoring**: Core Web Vitals tracking
- **User Analytics**: Privacy-focused usage analytics
- **API Monitoring**: Request/response time tracking

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🆘 Support & Documentation

### Getting Help

- 📖 **Documentation**: Check individual service READMEs
- 🐛 **Bug Reports**: [Create an issue](../../issues/new?template=bug_report.md)
- 💡 **Feature Requests**: [Request a feature](../../issues/new?template=feature_request.md)
- 💬 **Discussions**: [Join the discussion](../../discussions)

### Additional Resources

- **Architecture Decision Records**: `/docs/adr/`
- **API Documentation**: `/docs/api/`
- **Deployment Guide**: `/docs/deployment.md`
- **Troubleshooting**: `/docs/troubleshooting.md`

---

<div align="center">

**[⬆ Back to Top](#-frontend-design-patterns---microfrontend-e-commerce-architecture)**

Made with ❤️ by the Frontend Design Patterns Team

</div>

# Home-to-Cart Microfrontend

E-commerce microfrontend handling home page, product listing, product details, and user profile functionality.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Development mode
npm run dev  # Runs on http://localhost:3001

# Production build
npm run build
npm run start
```

## 📍 Routes

- **`/`** - Homepage with featured products and categories
- **`/plp`** - Product listing page with search and filters
- **`/pdp?id=<productId>`** - Product details page
- **`/profile`** - User profile with cart, orders, and addresses

## 🏗️ Architecture

```
src/
├── pages/              # Next.js pages
│   ├── index.tsx       # Homepage
│   ├── plp.tsx         # Product listing
│   ├── pdp.tsx         # Product details
│   ├── profile.tsx     # User profile
│   └── _app.tsx        # App wrapper
├── components/         # UI components
│   ├── ProductCard.tsx # Product display card
│   ├── CartSummary.tsx # Shopping cart summary
│   └── index.ts        # Component exports
├── containers/         # Smart components
│   └── HomeContainer.tsx
├── redux/              # State management
│   ├── slices/
│   │   ├── cartSlice.ts    # Shopping cart state
│   │   └── productSlice.ts # Product catalog state
│   └── store.ts        # Store configuration
├── middleware/         # Business logic
│   └── cartMiddleware.ts # Cart persistence
└── styles/
    └── globals.css     # Global styles
```

## 🛒 Features

### Homepage
- Featured products display
- Category navigation
- Hero section with call-to-action

### Product Listing (PLP)
- Search functionality
- Category filtering
- Pagination
- Stock availability filter
- Responsive grid layout

### Product Details (PDP)
- Product image gallery
- Detailed product information
- Quantity selection
- Add to cart functionality
- Related products (placeholder)

### User Profile
- Profile information management
- Shopping cart overview
- Order history integration
- Address management
- Account settings

### Shopping Cart
- Add/remove items
- Quantity updates
- Price calculations
- Persistent storage (localStorage)
- Checkout integration

## 🔄 State Management

### Cart Slice
```tsx
// Add item to cart
dispatch(addToCart({ product, quantity: 1 }));

// Update quantity
dispatch(updateQuantity({ id: itemId, quantity: 2 }));

// Remove item
dispatch(removeFromCart(itemId));
```

### Product Slice
```tsx
// Set products with pagination
dispatch(setProducts(paginatedResponse));

// Update filters
dispatch(updateFilters({ category: 'electronics' }));

// Set current product
dispatch(setCurrentProduct(product));
```

## 🎨 Components

### ProductCard
Displays product information with add-to-cart functionality:
```tsx
<ProductCard 
  product={product}
  onViewDetails={handleViewDetails}
/>
```

### CartSummary
Shows cart items and totals:
```tsx
<CartSummary onCheckout={handleCheckout} />
```

## 🌐 API Integration

Uses shared API client from `frontend-common`:
```tsx
const { data: products } = useFetch('/products?featured=true');
```

## 📱 Responsive Design

- Mobile-first approach
- Tailwind CSS for styling
- Responsive grid layouts
- Touch-friendly interactions

## 🔧 Configuration

### Environment Variables
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
NODE_ENV=development
```

### Next.js Config
- Custom port (3001)
- TypeScript support
- Tailwind CSS integration

## 🐳 Docker

```bash
# Build image
docker build -t home-to-cart .

# Run container
docker run -p 3001:3000 home-to-cart
```

## 🔗 Integration

### With Checkout
- Passes cart data via localStorage
- Redirects to checkout service (port 3002)

### With Orders
- Links to order history (port 3003)
- Reorder functionality

### With Frontend-Common
```tsx
import { 
  Button, 
  Header, 
  Footer, 
  formatCurrency,
  useFetch,
  useAuth 
} from 'frontend-common';
```

## 🧪 Development

### Adding New Products Features
1. Update `productSlice.ts` for new state
2. Create/modify components in `components/`
3. Add new pages in `pages/`
4. Update API integration

### Cart Functionality
- Cart state persists in localStorage
- Middleware handles automatic persistence
- Integrates with checkout flow

## 📊 Performance

- Server-side rendering (SSR)
- Image optimization
- Code splitting
- Lazy loading for large product lists

# Frontend Common - Shared Library

A shared library for the microfrontend architecture containing reusable components, utilities, hooks, types, and store configuration.

## 📦 Installation

```bash
npm install
npm run build
```

## 🏗️ Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx      # Configurable button component
│   ├── Header.tsx      # Application header
│   ├── Footer.tsx      # Application footer
│   ├── Loader.tsx      # Loading spinner
│   ├── Card.tsx        # Card container
│   └── index.ts        # Component exports
├── constants/          # Application constants
│   └── index.ts        # API endpoints, configs
├── utils/              # Utility functions
│   └── index.ts        # formatCurrency, dateFormatter, etc.
├── hooks/              # Custom React hooks
│   ├── useFetch.ts     # Data fetching hook
│   ├── useAuth.ts      # Authentication hook
│   └── index.ts        # Hook exports
├── types/              # TypeScript definitions
│   └── index.ts        # Shared interfaces and types
├── store/              # Redux store configuration
│   ├── index.ts        # Base store setup
│   ├── slices/         # Redux slices
│   │   └── authSlice.ts
│   └── middleware/     # API middleware
│       └── apiClient.ts
└── index.ts            # Main exports
```

## 🎨 Components

### Button
```tsx
import { Button } from 'frontend-common';

<Button variant="primary" size="md" onClick={handleClick}>
  Click me
</Button>
```

### Header
```tsx
import { Header } from 'frontend-common';

<Header 
  title="My App"
  user={user}
  onLogin={handleLogin}
  onLogout={handleLogout}
/>
```

## 🔧 Utilities

### Currency Formatting
```tsx
import { formatCurrency } from 'frontend-common';

const price = formatCurrency(29.99); // "$29.99"
```

### Date Formatting
```tsx
import { dateFormatter } from 'frontend-common';

const date = dateFormatter(new Date()); // "January 1, 2024"
```

## 🪝 Hooks

### useFetch
```tsx
import { useFetch } from 'frontend-common';

const { data, loading, error, refetch } = useFetch('/api/products');
```

### useAuth
```tsx
import { useAuth } from 'frontend-common';

const { user, login, logout, isAuthenticated } = useAuth();
```

## 🏪 Store

### Base Store Setup
```tsx
import { createBaseStore } from 'frontend-common';

// Extend with additional reducers
const store = createBaseStore({
  cart: cartReducer,
  products: productReducer,
});
```

### Auth Slice
Pre-configured authentication state management with actions for login, logout, and user updates.

## 🌐 API Client

Configured axios instance with:
- Authentication token handling
- Request/response interceptors
- Error handling
- Token refresh logic

```tsx
import { api } from 'frontend-common';

const response = await api.get('/products');
const newProduct = await api.post('/products', productData);
```

## 📝 Types

Shared TypeScript interfaces:
- `User` - User account information
- `Product` - Product data structure
- `CartItem` - Shopping cart item
- `Order` - Order information
- `Address` - Shipping address
- `PaymentMethod` - Payment method details

## 🚀 Usage in Microfrontends

1. Install as dependency:
```json
{
  "dependencies": {
    "frontend-common": "file:../frontend-common"
  }
}
```

2. Import and use:
```tsx
import { 
  Button, 
  Header, 
  formatCurrency, 
  useFetch, 
  createBaseStore 
} from 'frontend-common';
```

## 🔄 Development

### Building
```bash
npm run build
```

### Watching for changes
```bash
npm run dev
```

### Publishing updates
After making changes, rebuild and reinstall in dependent microfrontends:
```bash
npm run build
cd ../home-to-cart && npm install
cd ../checkout && npm install  
cd ../order && npm install
```

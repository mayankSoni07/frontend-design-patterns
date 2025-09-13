# Order Microfrontend

E-commerce microfrontend handling order management, order history, order tracking, and returns functionality.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Development mode
npm run dev  # Runs on http://localhost:3003

# Production build
npm run build
npm run start
```

## 📍 Routes

- **`/`** - Order management dashboard
- **`/order-list`** - Order history with filtering and pagination
- **`/order-detail?id=<orderId>`** - Detailed order view with tracking
- **`/returns`** - Returns and refunds management

## 🏗️ Architecture

```
src/
├── pages/              # Next.js pages
│   ├── index.tsx       # Order dashboard
│   ├── order-list.tsx  # Order history
│   ├── order-detail.tsx # Order details
│   ├── returns.tsx     # Returns management
│   └── _app.tsx        # App wrapper
├── components/         # UI components
│   ├── OrderCard.tsx       # Order display card
│   ├── OrderStatusBadge.tsx # Status indicator
│   ├── OrderTimeline.tsx   # Order progress timeline
│   └── index.ts            # Component exports
├── redux/              # State management
│   ├── slices/
│   │   └── orderSlice.ts   # Order state management
│   └── store.ts        # Store configuration
└── styles/
    └── globals.css     # Global styles
```

## 📦 Features

### Order Dashboard
- Quick access to order management features
- Order history overview
- Returns management
- Order tracking shortcuts

### Order History
- Paginated order list
- Status-based filtering
- Date range filtering
- Order search functionality
- Bulk actions (cancel, reorder)

### Order Details
- Complete order information
- Order status timeline
- Item-by-item breakdown
- Shipping and billing addresses
- Payment method details
- Tracking information
- Action buttons (cancel, return, reorder)

### Returns Management
- Return request history
- Return status tracking
- Refund information
- Return policy display
- Return request creation

## 🔄 State Management

### Order Slice
```tsx
// Load orders with pagination
dispatch(setOrders(paginatedResponse));

// Set current order for details
dispatch(setCurrentOrder(order));

// Update order status
dispatch(updateOrderStatus({ orderId, status: 'shipped' }));

// Apply filters
dispatch(updateFilters({ status: 'delivered' }));

// Handle pagination
dispatch(setPage(2));
```

## 🎨 Components

### OrderCard
Order summary display:
```tsx
<OrderCard 
  order={order}
  onViewDetails={handleViewDetails}
  onCancelOrder={handleCancel}
  onReorder={handleReorder}
/>
```

### OrderStatusBadge
Visual status indicator:
```tsx
<OrderStatusBadge status="shipped" size="lg" />
```

### OrderTimeline
Order progress visualization:
```tsx
<OrderTimeline order={order} />
```

## 📊 Order Status Flow

### Status Progression
1. **Pending** - Order placed, awaiting processing
2. **Processing** - Order being prepared
3. **Shipped** - Order dispatched
4. **Delivered** - Order completed
5. **Cancelled** - Order cancelled (any time before shipped)

### Status Actions
- **Pending/Processing**: Can cancel
- **Shipped**: Can track
- **Delivered**: Can return, reorder
- **Cancelled**: Can reorder

## 🔍 Filtering & Search

### Available Filters
- **Order Status**: All, Pending, Processing, Shipped, Delivered, Cancelled
- **Date Range**: From/To date selection
- **Search**: Order ID, product name search

### Pagination
- Configurable page size
- Page navigation
- Total count display

## 📱 Order Tracking

### Timeline Features
- Visual progress indicator
- Timestamp for each status
- Current status highlighting
- Estimated delivery dates

### Tracking Integration
- Package tracking links
- Carrier information
- Delivery notifications

## 🔄 Returns System

### Return Request Flow
1. **Initiate Return** - Select items and reason
2. **Pending Review** - Return request submitted
3. **Approved/Rejected** - Admin decision
4. **Completed** - Refund processed

### Return Reasons
- Defective item
- Wrong item received
- Changed mind
- Size/fit issues
- Damaged in shipping

### Refund Processing
- Automatic refund calculation
- Original payment method refund
- Processing time estimates
- Refund status tracking

## 🌐 API Integration

### Order Endpoints
```tsx
GET /orders              # List orders with filters
GET /orders/:id          # Get order details
PUT /orders/:id/cancel   # Cancel order
POST /orders/:id/return  # Create return request
```

### Data Fetching
```tsx
const { data: orders } = useFetch(`/orders?${queryParams}`);
```

## 🔗 Integration

### With Checkout
- Receives new orders from checkout flow
- Order confirmation handling

### With Home-to-Cart
- Reorder functionality adds items to cart
- Links back to product pages

### Authentication
- Requires user login
- User-specific order filtering
- Secure order access

## 🎯 User Experience

### Order Management
- Clear status indicators
- Easy-to-understand timeline
- Quick action buttons
- Responsive design

### Error Handling
- Network failure recovery
- Order not found handling
- Permission error messages

## 🐳 Docker

```bash
# Build image
docker build -t order .

# Run container
docker run -p 3003:3000 order
```

## 🔧 Configuration

### Environment Variables
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
NODE_ENV=development
```

## 📱 Responsive Design

- Mobile-optimized order cards
- Touch-friendly action buttons
- Responsive timeline component
- Accessible status indicators

## 🧪 Development

### Adding New Order Features
1. Update `orderSlice.ts` for new state
2. Create/modify components
3. Add new pages or routes
4. Update API integration

### Customizing Order Flow
- Modify status progression
- Update timeline component
- Adjust filtering options
- Add new order actions

## 📊 Analytics Ready

Prepared for tracking:
- Order view events
- Status change tracking
- Return request analytics
- User engagement metrics

## 🔒 Security

### Data Protection
- User-specific order access
- Secure order ID handling
- Protected return requests
- Authentication validation

### Privacy
- Order data encryption
- Secure API communication
- User consent handling

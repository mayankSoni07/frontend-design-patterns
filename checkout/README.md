# Checkout Microfrontend

E-commerce microfrontend handling the complete checkout flow including address selection, payment methods, and order confirmation.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Development mode
npm run dev  # Runs on http://localhost:3002

# Production build
npm run build
npm run start
```

## 📍 Routes

- **`/`** - Checkout overview and cart validation
- **`/address`** - Shipping address selection and management
- **`/payment`** - Payment method selection and management
- **`/summary`** - Order review and final confirmation

## 🏗️ Architecture

```
src/
├── pages/              # Next.js pages
│   ├── index.tsx       # Checkout overview
│   ├── address.tsx     # Address selection
│   ├── payment.tsx     # Payment methods
│   ├── summary.tsx     # Order confirmation
│   └── _app.tsx        # App wrapper
├── components/         # UI components
│   ├── AddressForm.tsx     # Address input form
│   ├── PaymentForm.tsx     # Payment method form
│   ├── OrderSummary.tsx    # Order totals display
│   ├── CheckoutProgress.tsx # Progress indicator
│   └── index.ts            # Component exports
├── redux/              # State management
│   ├── slices/
│   │   └── checkoutSlice.ts # Checkout flow state
│   └── store.ts        # Store configuration
└── styles/
    └── globals.css     # Global styles
```

## 🛒 Features

### Checkout Flow
- **Step 1**: Address selection/creation
- **Step 2**: Payment method selection/creation
- **Step 3**: Order review and confirmation
- Progress indicator throughout the flow

### Address Management
- Select from saved addresses
- Add new shipping addresses
- Edit existing addresses
- Set default address
- Form validation

### Payment Processing
- Multiple payment methods (Credit/Debit, PayPal, Bank Transfer)
- Secure card input with validation
- Save payment methods for future use
- PCI-compliant form handling

### Order Summary
- Real-time cart totals
- Shipping cost calculation
- Tax calculation
- Free shipping threshold
- Item-by-item breakdown

## 🔄 State Management

### Checkout Slice
```tsx
// Navigate between steps
dispatch(nextStep());
dispatch(previousStep());
dispatch(setStep('payment'));

// Address management
dispatch(setSelectedAddress(address));
dispatch(addAddress(newAddress));

// Payment management
dispatch(setSelectedPaymentMethod(method));
dispatch(addPaymentMethod(newMethod));

// Order placement
dispatch(placeOrder(orderId));
```

## 🎨 Components

### AddressForm
Address input with validation:
```tsx
<AddressForm 
  address={existingAddress}
  onSave={handleSaveAddress}
  onCancel={handleCancel}
  loading={isLoading}
/>
```

### PaymentForm
Payment method input:
```tsx
<PaymentForm 
  paymentMethod={existingMethod}
  onSave={handleSavePayment}
  onCancel={handleCancel}
  loading={isLoading}
/>
```

### CheckoutProgress
Visual progress indicator:
```tsx
<CheckoutProgress />
```

### OrderSummary
Cart totals and items:
```tsx
<OrderSummary />
```

## 💳 Payment Methods

### Supported Types
- **Credit Card** - Full card details with validation
- **Debit Card** - Similar to credit card
- **PayPal** - Redirect integration
- **Bank Transfer** - Manual processing

### Security Features
- Card number formatting and validation
- CVV validation
- Expiry date validation
- No sensitive data stored locally

## 🧮 Pricing Logic

### Calculations
```tsx
const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
const shipping = subtotal > 50 ? 0 : 9.99; // Free shipping over $50
const tax = subtotal * 0.08; // 8% tax rate
const total = subtotal + shipping + tax;
```

## 🔐 Security & Validation

### Form Validation
- Required field validation
- Email format validation
- Credit card number validation (Luhn algorithm)
- CVV format validation
- Expiry date validation

### Data Protection
- No credit card details stored in state
- Secure form handling
- Input sanitization

## 🌐 API Integration

### Endpoints Used
```tsx
// Address management
POST /addresses
PUT /addresses/:id
DELETE /addresses/:id

// Payment methods
POST /payment-methods
DELETE /payment-methods/:id

// Order processing
POST /orders
POST /payments/process
```

## 🔗 Integration

### With Home-to-Cart
- Receives cart data from localStorage
- Validates cart before checkout
- Redirects back if cart is empty

### With Order Service
- Creates order after successful payment
- Redirects to order confirmation
- Clears cart after successful order

### Authentication
- Requires user login
- Redirects to login if not authenticated
- Maintains session throughout checkout

## 🎯 User Experience

### Progressive Flow
1. **Cart Validation** - Ensures items exist
2. **Address Selection** - Required before payment
3. **Payment Method** - Required before summary
4. **Order Review** - Final confirmation
5. **Success Page** - Order confirmation

### Error Handling
- Form validation errors
- API error messages
- Network failure handling
- Graceful degradation

## 🐳 Docker

```bash
# Build image
docker build -t checkout .

# Run container
docker run -p 3002:3000 checkout
```

## 🔧 Configuration

### Environment Variables
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
NODE_ENV=development
```

## 📱 Responsive Design

- Mobile-optimized checkout flow
- Touch-friendly form inputs
- Responsive layout for all screen sizes
- Accessible form controls

## 🧪 Development

### Adding New Payment Methods
1. Update `PaymentForm.tsx` component
2. Add validation logic
3. Update `checkoutSlice.ts` state
4. Handle in order processing

### Customizing Checkout Flow
- Modify step order in `checkoutSlice.ts`
- Update progress component
- Adjust navigation logic

## 📊 Analytics Integration

Ready for analytics tracking:
- Step completion events
- Form abandonment tracking
- Payment method selection
- Order conversion tracking

# Rent App

A modern rent payment tracking application built with Next.js, TypeScript, and a comprehensive theme system.

## Features

- 🎨 **Theme System**: Comprehensive token-based design system with dark/light mode
- 🔐 **Authentication**: Secure password-based authentication using birthdays
- 💰 **Payment Tracking**: Track rent payments and amounts
- 📧 **Email Reminders**: Automated rent reminder emails
- 🧪 **Testing**: Jasmine-based test suite with automated CI/CD
- 🚀 **Production Ready**: Optimized for Vercel deployment

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd rent_app
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

4. Start the development server:

```bash
npm run dev
```

## Environment Variables

### Required for Production (Vercel)

1. **ROOMMATES_DATA**: JSON string containing private roommate data
   - This contains sensitive information (emails, birthdays) and should be kept private
   - Set this in your Vercel dashboard under Settings > Environment Variables

```bash
# Example of ROOMMATES_DATA format:
[
  {
    "email": "your-email@example.com",
    "id": "roommate-1",
    "name": "Example Name",
    "amount": 500,
    "venmoNote": "Rent payment - Example Name",
    "image": "https://example.com/image.jpg",
    "birthday": "29/11"
  }
]
```

2. **RESEND_API_KEY**: (Optional) API key for sending email reminders
   - Only required if you want to use the email reminder feature

### Setting up ROOMMATES_DATA for Vercel

1. **Generate the data** (if you have the roommates.ts file):

```bash
# The JSON data is already provided in scripts/roommates-data.json
cat scripts/roommates-data.json
```

2. **Copy the JSON output** and set it as the `ROOMMATES_DATA` environment variable in Vercel:
   - Go to your Vercel project dashboard
   - Navigate to Settings > Environment Variables
   - Add `ROOMMATES_DATA` as the name
   - Paste the JSON as the value (make sure it's all on one line)
   - Select "Production" environment
   - Save and redeploy

## Private Data Setup

The application separates public and private data for security:

- **Public Data** (`src/data/publicRoommates.ts`): Safe to expose to clients (names, amounts, images)
- **Private Data** (`src/data/roommates.ts`): Contains sensitive information (emails, birthdays)

The private data file is excluded from Git via `.gitignore` and should be loaded via environment variables in production.

## Testing

Run tests using Jasmine:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

### Test Coverage

- ✅ Utility functions (`roommateUtils`, `passwordUtils`, `venmoUtils`)
- ✅ Theme utilities
- ✅ Authentication logic
- ✅ Data validation

## Automated Testing and Deployment

The project uses GitHub Actions for CI/CD:

1. **Tests run automatically** on every push and pull request
2. **Deployment to Vercel** only occurs if all tests pass
3. **Environment variables** are automatically set up for CI

### GitHub Secrets Required

- `VERCEL_ORG_ID`: Your Vercel Organization ID
- `VERCEL_PROJECT_ID`: Your Vercel Project ID

## Theme System

The application uses a comprehensive token-based theme system:

### Color Tokens

- **Base colors**: Primary, secondary, accent, neutral
- **Semantic colors**: Success, warning, error, info
- **Mode-aware**: Automatic dark/light mode support

### Usage

```tsx
// Use theme-aware classes
<div className="theme-bg theme-text theme-border">
  <button className="theme-primary">Submit</button>
</div>
```

## API Routes

- `GET /api/roommates` - Get all public roommate data
- `GET /api/roommates/[id]` - Get specific roommate data
- `POST /api/auth` - Authenticate roommate (requires birthday password)
- `GET /api/send_reminders` - Send rent reminder emails

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is licensed under the MIT License.

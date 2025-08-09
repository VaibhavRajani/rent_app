This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Testing

This project includes a comprehensive test suite using Jasmine. To run tests:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

Tests cover:

- Utility functions (`roommateUtils`, `passwordUtils`, `venmoUtils`)
- Theme utilities
- Authentication and data handling
- Edge cases and error conditions

## Automated Testing and Deployment

This project uses GitHub Actions for automated testing and deployment. The workflow:

1. **Runs on every push** to `main` or `master` branches
2. **Runs on pull requests** to ensure code quality
3. **Runs tests first** - deployment only proceeds if tests pass
4. **Deploys to Vercel** automatically after successful tests

### Setup Requirements

To enable automated deployment, you need to set up GitHub Secrets in your repository:

1. Go to your GitHub repository → Settings → Secrets and variables → Actions
2. Add the following secrets:
   - `VERCEL_TOKEN`: Your Vercel authentication token
   - `VERCEL_ORG_ID`: Your Vercel organization ID
   - `VERCEL_PROJECT_ID`: Your Vercel project ID

### Getting Vercel Credentials

1. **VERCEL_TOKEN**:

   - Go to [Vercel Dashboard](https://vercel.com/account/tokens)
   - Create a new token with appropriate permissions

2. **VERCEL_ORG_ID** and **VERCEL_PROJECT_ID**:
   - Run `npx vercel link` in your project directory
   - The IDs will be added to your `.vercel/project.json` file

### Quick Setup

Run the setup script for guided setup:

```bash
./scripts/setup-vercel-secrets.sh
```

### Verification

After setting up the secrets:

1. **Make a test commit** and push to `main`/`master`
2. **Check GitHub Actions** tab to see the workflow running
3. **Verify the workflow**:
   - ✅ Tests run and pass
   - ✅ Linting passes
   - ✅ Build succeeds
   - ✅ Deployment to Vercel happens automatically

### Workflow Details

The GitHub Actions workflow (`.github/workflows/test-and-deploy.yml`):

- **Test Job**: Runs tests, linting, and builds the application
- **Deploy Job**: Only runs if tests pass and branch is `main`/`master`
- **Private Data Handling**: Automatically creates test data from template
- **Error Handling**: Fails fast if any step doesn't pass

## Private Data Setup

This application uses private roommate data that is not tracked in Git for security reasons. To set up the private data:

1. Copy the template file:

   ```bash
   cp src/data/roommates.ts.template src/data/roommates.ts
   ```

2. Edit `src/data/roommates.ts` with your actual roommate information:

   - Replace `your-email@example.com` with the actual email
   - Update names, amounts, Venmo notes, and profile images
   - Set birthdays in `DD/MM` format (e.g., "29/11" for November 29th)

3. The private data includes sensitive information like birthdays (used as passwords) and emails, so it's excluded from version control.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

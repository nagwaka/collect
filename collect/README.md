# Collect

Collect is a basic SaaS task management app built with React, Supabase, and Tailwind CSS.

## Features

- **Project Management**: Create and organize multiple projects
- **Task Tracking**: Add unlimited tasks within each project
- **Free Tier**: Up to 5 projects with unlimited tasks
- **Premium Plans**: Unlock unlimited projects
- **User Authentication**: Secure login and profile management
- **Responsive Design**: Works seamlessly across devices

## Technologies Used

- **Frontend**: React (Vite) + TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase
- **Payments**: PayPal integration
- **Router**: React Router DOM
- **UI Components**: Headless UI, Radix UI

## Prerequisites

- Node.js (LTS version)
- npm or yarn
- Supabase account
- PayPal Developer account

## Environment Setup

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/collect.git
cd collect
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## Database Setup

1. Create a new Supabase project
2. Run the migration script located in:
```
/supabase/migrations/20241028000000_create_base_schema.sql
```

This will set up all necessary tables with proper RLS policies.

## Building for Production

```bash
npm run build
# or
yarn build
```

## Key Features Breakdown

### Free Tier
- 5 projects maximum
- Unlimited tasks per project

### Paid Plans
- Unlimited projects
- All free tier features
- Priority support

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
# PACom [![Build](https://github.com/CSCI-5828-Foundations-Sftware-Engr/TeamBlume/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/CSCI-5828-Foundations-Sftware-Engr/TeamBlume/actions/workflows/main.yml)

Price comparator and aggregator for products from different retailers like Walmart, Best Buy, Amazon, Costco etc.

## Getting Started

### Local

- First, install the dependencies using yarn:

```bash
yarn
```

- Next, create `.env` file in the root directory and add the following environment variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
NEXT_PUBLIC_POSHOG_ID=
```

- Finally, run the development server:

```bash
yarn dev
```

### Docker

To run the app using docker, run the following commands:

```bash
docker build -t teamblume .
docker run -p 3000:3000 teamblume
```

## Tech Stack

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeScript](https://www.typescriptlang.org/)

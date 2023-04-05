# PACom [![Build](https://github.com/CSCI-5828-Foundations-Sftware-Engr/TeamBlume/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/CSCI-5828-Foundations-Sftware-Engr/TeamBlume/actions/workflows/main.yml)

Price aggregator and comparator for products from different retailers like Walmart, Best Buy, Amazon, Costco etc. It also analyses various product trends and predicts the price over the future to help users make informed purchasing decisions.

The web application uses Axios and Cheerio to collect the information of different prodicts and prices by scraping websites from various retailers. This information would be stored in the Postgres database and presented to the users along with a detailed analysis.

Users could then compare the prices of the same product across different retailers and make an informed decision on where to purchase it. In addition, the tool could also provide insights into product trends, such as which products are becoming more popular or which ones are expected to decrease in price in the future.

## Tech Stack

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostHog](https://posthog.com/)

Our application will be deployed on GloudCloud Platform.

Design Decisions:

We use Github projects to keep track of our tasks and user stories.

Work Distribution: 
 - Hemant Joshi - 
 - Nagarakshitha Bangalore Ramu - 
 - Sriharsha Reddy Yarasani - Frontend
 - Ajay Narasimha Mopidevi - Event Tracking and Analysis
 - Ashwin Ravindra - 


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

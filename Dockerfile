FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
    else echo "Lockfile not found." && exit 1; \
    fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG NEXT_PUBLIC_POSTHOG_KEY
ARG NEXT_PUBLIC_POSTHOG_HOST
ARG NEXT_POSTHOG_PERSONAL_KEY
ARG NEXT_PUBLIC_POSHOG_ID

ENV NEXT_TELEMETRY_DISABLED 1
RUN echo $NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_URL $NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY $NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NEXT_PUBLIC_POSTHOG_KEY $NEXT_PUBLIC_POSTHOG_KEY
ENV NEXT_PUBLIC_POSTHOG_HOST $NEXT_PUBLIC_POSTHOG_HOST
ENV NEXT_POSTHOG_PERSONAL_KEY $NEXT_POSTHOG_PERSONAL_KEY
ENV NEXT_PUBLIC_POSHOG_ID $NEXT_PUBLIC_POSHOG_ID

ENV NEXT_PUBLIC_API_MOCKING enabled
RUN yarn build

USER nextjs

EXPOSE 8080
ENV PORT 8080

CMD ["yarn", "start"]
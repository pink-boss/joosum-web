# Stage 1: Install Dependencies
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Stage 2: Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

# Stage 3: Production Image
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

# Install only production dependencies
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Copy build files
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next

EXPOSE 3000

CMD ["npm", "start"]

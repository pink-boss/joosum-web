# Dockerfile

# Stage 1: Install Dependencies
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Stage 2: Build
FROM node:18-alpine AS builder
WORKDIR /app

# 필요한 파일만 복사
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# .env.prod 파일을 .env.production으로 복사
COPY .env.prod ./.env.production

# 빌드 실행
RUN npm run build

# Stage 3: Production Image
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

# 프로덕션 의존성만 설치
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# 빌드 결과물 복사
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.mjs ./

EXPOSE 3000

CMD ["npm", "start"]

ARG NODE_RUNTIME_VERSION=22.11.0

FROM public.ecr.aws/docker/library/node:${NODE_RUNTIME_VERSION}-alpine AS base

ENV TURBO_TELEMETRY_DISABLED=1

RUN apk add --no-cache libc6-compat curl

FROM base AS builder

WORKDIR /app

COPY . .

RUN npx turbo prune app-portal app-cli app-worker --docker

FROM base AS installer

ENV NODE_ENV=production

WORKDIR /app

# First install the dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
RUN corepack enable && yarn install

COPY --from=builder /app/out/full/ .
# Use this to cache bust secrets mounted (env)
ARG CACHE_CHECKSUM
# Build the project
RUN --mount=type=secret,id=env,target=/app/apps/portal/.env.local \
    --mount=type=secret,id=env,target=/app/apps/worker/.env.local \
    --mount=type=secret,id=env,target=/app/packages/map-widgets/.env.local \
    yarn turbo build --filter=app-portal --filter=app-cli --filter=app-worker

FROM base AS runner

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

ENV NODE_ENV=production

ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/portal/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/portal/.next/static ./apps/portal/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/portal/public ./apps/portal/public
COPY --from=installer --chown=nextjs:nodejs --chmod=755 /app/apps/cli/dist/nexushome /bin
COPY --from=installer --chown=nextjs:nodejs /app/apps/worker/dist /worker

USER nextjs

EXPOSE 3000

ENV PORT=3000

ENV HOSTNAME="0.0.0.0"

CMD ["node", "./apps/portal/server.js"]

FROM node:14.17.1 as base

# Add package file
COPY package*.json ./

# Install server deps
RUN npm i

# Create dirs
RUN mkdir client

# Copy source
COPY server.js ./
COPY api ./api
COPY client/package.json ./client
COPY client/jsconfig.json ./client
COPY client/.env ./client
COPY client/src ./client/src
COPY client/public ./client/public

# Install client deps
RUN npm run client:modules

# Build dist
RUN npm run client:build

# Start production image build
FROM gcr.io/distroless/nodejs:14

# Copy node modules and build directory
COPY --from=base ./node_modules ./node_modules
COPY --from=base /server.js ./
COPY --from=base /api /api
COPY --from=base /client/build /client/build
COPY --from=base /client/src/constants /client/src/constants

# Expose port 3001
EXPOSE 3001
CMD ["server.js"]

FROM node:slim
# Use a slim Node.js image for a smaller footprint
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
COPY dist ./dist

# Install only production dependencies
RUN npm ci --only=production

# Set environment variables
ENV NODE_ENV=production

# Expose the application port
EXPOSE 3000

# Start the application using the built artifact
CMD ["node", "dist/app.js"]
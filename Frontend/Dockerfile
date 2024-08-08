# Step 1: Build the Angular app
FROM node:16 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
# Ensure production build is used
RUN npm run build -- --configuration=production

# Step 2: Serve the Angular app using Nginx
FROM nginx:alpine

COPY --from=build /app/dist/sword-in-stone /usr/share/nginx/html

# Copy custom nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173

# --host so Vite binds 0.0.0.0 and is reachable from outside the container
CMD ["npm", "run", "dev", "--", "--host"]

# Base Node.js leve
FROM node:20-bullseye-slim

# Define pasta de trabalho
WORKDIR /app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala dependências (incluindo dev para TS)
RUN npm install

# Copia todo o backend
COPY . .

# Compila TypeScript
RUN npm run build

# Exponha a porta esperada pelo Azure
EXPOSE 4000

# Define variável de ambiente para Azure
ENV PORT=4000
ENV WEBSITES_PORT=4000

# Inicia o backend
CMD ["npm", "start"]

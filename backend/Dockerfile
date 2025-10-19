# Base Node.js leve
FROM node:20-bullseye-slim

# Define pasta de trabalho
WORKDIR /app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala todas as dependências (prod + dev) para compilar TS
RUN npm install

# Copia todo o backend
COPY . .

# Compila TypeScript
RUN npm run build

# Expõe porta da API
EXPOSE 4000

# Inicia o backend
CMD ["npm", "start"]

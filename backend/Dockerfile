FROM node:20-bullseye-slim

WORKDIR /app

# Copiar backend e instalar dependências
COPY package*.json ./
RUN npm install
COPY . .

# Copiar frontend
COPY ../frontend ./frontend

# Compilar TypeScript
RUN npm run build

# Porta única para Azure
EXPOSE 8080
ENV PORT=8080
ENV WEBSITES_PORT=8080

# Iniciar backend (serve frontend)
CMD ["npm", "start"]

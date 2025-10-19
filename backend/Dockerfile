FROM node:20-bullseye-slim
WORKDIR /app

# Instalar dependências
COPY package*.json ./
RUN npm install

RUN npm install -g typescript

COPY . .

# Copiar frontend
COPY ../frontend ./frontend

# Compilar TypeScript **aqui**
RUN npm run build

# Porta para Azure
EXPOSE 8080
ENV PORT=8080
ENV WEBSITES_PORT=8080

# Iniciar backend (serve frontend)
CMD ["npm", "start"]

FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

# instalar dependências incluindo dev (TypeScript)
RUN npm install

# instalar TypeScript globalmente se precisar
RUN npm install -g typescript

COPY . .

# build do TypeScript
RUN npm run build

EXPOSE 4000

CMD ["node", "dist/index.js"]

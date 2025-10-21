FROM node:20-alpine

WORKDIR /spamware

COPY backend/ ./

COPY frontend/ ../frontend/
RUN npm run build

ENV PORT=4000
EXPOSE $PORT

CMD ["node", "dist/index.js"]

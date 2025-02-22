FROM node:18-alpine AS builder

WORKDIR /app

COPY ../../package.json ./

RUN npm install

COPY ../../ ./

RUN npm run ng build host-app --configuration=production

# Etapa de produção com Nginx
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

# Copia o build da nossa aplicação pro servidor nginx
COPY --from=builder /app/dist/host-app .

# Copia arquivo de configurações do nginx pro servidor
COPY projects/host-app/nginx.conf /etc/nginx/nginx.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]

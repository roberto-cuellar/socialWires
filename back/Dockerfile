 # Create image based on the official Node 6 image from the dockerhub
FROM node:latest as node

# Directorio de creacion
RUN mkdir -p /usr/src/app

# Directorio de trabajo
WORKDIR /usr/src/app

# Copy de las dependencias
COPY package.json /usr/src/app

# Instalacion de las dependencias
RUN npm install

# Copia de todo el contenido
COPY . /usr/src/app

# Se expone el puerto en el 
EXPOSE 4000

# Serve the app
CMD ["npm", "start"]
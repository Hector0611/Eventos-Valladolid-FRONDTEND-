# Usa una imagen oficial de Node.js
FROM node:18

# Crea y define el directorio de trabajo
WORKDIR /app

# Copia package.json y package-lock.json para que npm install se ejecute antes
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Ejecuta la construcción del proyecto
RUN npm run build

# Expone el puerto para que el servidor web esté accesible
EXPOSE 3000

# Comando para ejecutar la app en producción
CMD ["npm", "start"]

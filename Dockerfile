# Dockerfile pour AMD Parc Informatique Backend
# Image optimisée pour la production

# Image de base Node.js Alpine (légère et sécurisée)
FROM node:18-alpine

# Installer les dépendances système nécessaires
RUN apk add --no-cache dumb-init

# Créer l'utilisateur non-root pour la sécurité
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de configuration
COPY package*.json ./

# Installer les dépendances de production uniquement
RUN npm ci --only=production && npm cache clean --force

# Copier le code source
COPY . .

# Changer la propriété des fichiers
RUN chown -R nodejs:nodejs /app

# Passer à l'utilisateur non-root
USER nodejs

# Exposer le port
EXPOSE 10000

# Utiliser dumb-init pour gérer les signaux correctement
ENTRYPOINT ["dumb-init", "--"]

# Commande de démarrage
CMD ["npm", "start"]

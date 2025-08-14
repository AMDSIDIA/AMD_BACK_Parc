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

# Copier les fichiers de configuration en premier (pour le cache Docker)
COPY package*.json ./

# Installer les dépendances de production
# Utilise npm ci si package-lock.json existe, sinon npm install
RUN if [ -f package-lock.json ]; then \
        echo "Using npm ci (package-lock.json found)" && \
        npm ci --only=production && \
        npm cache clean --force; \
    else \
        echo "Using npm install (no package-lock.json)" && \
        npm install --only=production && \
        npm cache clean --force; \
    fi

# Copier le code source après l'installation des dépendances
COPY . .

# Changer la propriété des fichiers
RUN chown -R nodejs:nodejs /app

# Passer à l'utilisateur non-root
USER nodejs

# Exposer le port (Render fournira le port via process.env.PORT)
EXPOSE 10000

# Utiliser dumb-init pour gérer les signaux correctement
ENTRYPOINT ["dumb-init", "--"]

# Commande de démarrage
CMD ["npm", "start"]

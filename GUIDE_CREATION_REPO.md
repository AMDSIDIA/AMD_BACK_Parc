# Guide de Création du Repository Backend - AMD Parc Informatique

## 🚀 Création du Repository GitHub

### 1. Créer un nouveau repository sur GitHub

1. Allez sur [GitHub](https://github.com)
2. Cliquez sur "New repository" ou "New +" > "Repository"
3. Configurez le repository :
   - **Repository name** : `amd-parc-backend`
   - **Description** : `Backend API pour le système de gestion du parc informatique AMD International`
   - **Visibility** : Public (ou Private selon vos besoins)
   - **Initialize with** : Ne pas cocher (nous avons déjà les fichiers)

### 2. Cloner le repository localement

```bash
# Cloner le repository vide
git clone https://github.com/votre-username/amd-parc-backend.git
cd amd-parc-backend

# Copier tous les fichiers du dossier backend
cp -r ../Parc\ informatique/backend/* .

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "Initial commit: Backend API AMD Parc Informatique"

# Pousser vers GitHub
git push -u origin main
```

## 📁 Structure du Repository

```
amd-parc-backend/
├── config/
│   └── database.js              # Configuration PostgreSQL
├── models/
│   ├── User.js                  # Modèle utilisateur
│   ├── Incident.js              # Modèle incident
│   └── Inventory.js             # Modèle inventaire
├── scripts/
│   ├── migrate.js               # Script de migration
│   ├── seed.js                  # Script de seeding
│   └── db-test.js               # Script de test DB
├── server.js                    # Point d'entrée principal
├── package.json                 # Dépendances et scripts
├── package-lock.json            # Lock des dépendances
├── env.example                  # Variables d'environnement
├── .env                         # Variables d'environnement (local)
├── .gitignore                   # Fichiers à ignorer
├── Dockerfile                   # Configuration Docker
├── .dockerignore                # Fichiers à ignorer pour Docker
├── blueprint.yaml               # Configuration Blueprint
├── README.md                    # Documentation principale
├── API_DOCUMENTATION.md         # Documentation API
├── LICENSE                      # Licence MIT
├── README_DEPLOIEMENT.md        # Guide de déploiement
└── README_DEPLOIEMENT_POSTGRESQL.md # Guide PostgreSQL
```

## 🔧 Configuration Initiale

### 1. Variables d'Environnement

Créez un fichier `.env` basé sur `env.example` :

```bash
# Copier le fichier d'exemple
cp env.example .env

# Éditer les variables
nano .env
```

Variables à configurer :
```env
# Configuration de la base de données PostgreSQL
DATABASE_URL=postgresql://username:password@localhost:5432/amd_parc_db

# Configuration JWT
JWT_SECRET=votre_secret_jwt_tres_securise_2024

# Configuration du serveur
PORT=10000
NODE_ENV=development
```

### 2. Installation des Dépendances

```bash
# Installer les dépendances
npm install

# Vérifier l'installation
npm list
```

### 3. Configuration de la Base de Données

```bash
# Créer la base de données PostgreSQL
createdb amd_parc_db

# Exécuter les migrations
npm run db:migrate

# Seeding des données (optionnel)
npm run db:seed

# Tester la connexion
npm run db:test
```

## 🧪 Tests Locaux

### 1. Test de Connexion Base de Données

```bash
# Tester la connectivité
npm run db:test
```

### 2. Test du Serveur

```bash
# Démarrer en mode développement
npm run dev

# Dans un autre terminal, tester l'API
curl http://localhost:10000/api/health
```

### 3. Test de Création d'Incident

```bash
# Créer un incident de test
curl -X POST http://localhost:10000/api/incidents \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Test",
    "prenom": "User",
    "departement": "IT",
    "poste": "Développeur",
    "descriptionSouci": "Test incident"
  }'
```

## 🐳 Test avec Docker

### 1. Build de l'Image

```bash
# Construire l'image Docker
docker build -t amd-parc-backend .

# Vérifier l'image créée
docker images | grep amd-parc-backend
```

### 2. Test du Conteneur

```bash
# Exécuter le conteneur
docker run -p 10000:10000 --env-file .env amd-parc-backend

# Tester l'API
curl http://localhost:10000/api/health
```

## 🚀 Déploiement

### 1. Déploiement sur Blueprint

1. Connectez-vous à [Blueprint](https://blueprint.com)
2. Créez un nouveau projet
3. Connectez le repository `amd-parc-backend`
4. Configurez les variables d'environnement :
   ```env
   GIT_REPOSITORY=https://github.com/votre-username/amd-parc-backend
   JWT_SECRET=votre_secret_jwt_tres_securise_2024
   DB_PASSWORD=mot_de_passe_base_donnees_securise
   ```
5. Lancez le déploiement

### 2. Déploiement sur Render

1. Connectez-vous à [Render](https://render.com)
2. Créez un nouveau Web Service
3. Connectez le repository `amd-parc-backend`
4. Configurez :
   - **Build Command** : `npm install`
   - **Start Command** : `npm start`
   - **Environment** : Node
5. Ajoutez les variables d'environnement
6. Déployez

## 📋 Checklist de Création

### ✅ Repository GitHub
- [ ] Repository créé sur GitHub
- [ ] Nom : `amd-parc-backend`
- [ ] Description ajoutée
- [ ] Visibilité configurée

### ✅ Fichiers de Configuration
- [ ] `README.md` créé et configuré
- [ ] `.gitignore` configuré
- [ ] `Dockerfile` créé
- [ ] `blueprint.yaml` configuré
- [ ] `LICENSE` ajouté

### ✅ Configuration Locale
- [ ] Repository cloné localement
- [ ] Fichiers copiés depuis le projet principal
- [ ] Premier commit effectué
- [ ] Push vers GitHub

### ✅ Variables d'Environnement
- [ ] `.env` créé basé sur `env.example`
- [ ] `DATABASE_URL` configuré
- [ ] `JWT_SECRET` défini
- [ ] `PORT` configuré

### ✅ Base de Données
- [ ] Base de données PostgreSQL créée
- [ ] Migrations exécutées
- [ ] Seeding effectué (optionnel)
- [ ] Test de connectivité réussi

### ✅ Tests Locaux
- [ ] Dépendances installées
- [ ] Serveur démarre en mode développement
- [ ] API `/api/health` répond
- [ ] Création d'incident fonctionne

### ✅ Docker
- [ ] Image Docker buildée
- [ ] Conteneur démarre correctement
- [ ] API accessible depuis le conteneur

### ✅ Documentation
- [ ] `README.md` complet
- [ ] `API_DOCUMENTATION.md` créé
- [ ] Guides de déploiement ajoutés
- [ ] Scripts de test documentés

## 🔧 Commandes Utiles

### Développement
```bash
# Démarrer en développement
npm run dev

# Tester la base de données
npm run db:test

# Exécuter les migrations
npm run db:migrate

# Seeding des données
npm run db:seed
```

### Production
```bash
# Démarrer en production
npm start

# Build Docker
docker build -t amd-parc-backend .

# Exécuter Docker
docker run -p 10000:10000 --env-file .env amd-parc-backend
```

### Git
```bash
# Vérifier le statut
git status

# Ajouter les changements
git add .

# Commit
git commit -m "Description des changements"

# Push
git push origin main
```

## 🚨 Problèmes Courants

### Erreur de Connexion Base de Données
```bash
# Vérifier que PostgreSQL est démarré
sudo systemctl status postgresql

# Vérifier la variable DATABASE_URL
echo $DATABASE_URL

# Tester la connexion
npm run db:test
```

### Erreur de Port
```bash
# Vérifier si le port est libre
lsof -i :10000

# Changer le port dans .env
PORT=10001
```

### Erreur de Dépendances
```bash
# Supprimer node_modules et réinstaller
rm -rf node_modules package-lock.json
npm install
```

## 📞 Support

Pour toute question ou problème :
- **Email** : pascalouoba5@gmail.com
- **Téléphone** : +226 65494389 (incidents) / +226 65186681 (matériel)
- **Horaires** : Lun-Ven: 8h-18h

---

**Statut** : ✅ Prêt pour la création du repository  
**Dernière mise à jour** : $(date)  
**Version** : 1.0.0

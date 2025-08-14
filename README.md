# AMD Parc Informatique - Backend

Backend API pour le système de gestion du parc informatique AMD International.

## 🚀 Fonctionnalités

- **Gestion des incidents** : Création, suivi et résolution des tickets
- **Gestion des techniciens** : Attribution et suivi des interventions
- **Inventaire** : Gestion du matériel informatique
- **Authentification** : Système de connexion sécurisé avec JWT
- **API RESTful** : Interface complète pour le frontend

## 📋 Prérequis

- Node.js 18+ 
- PostgreSQL 15+
- npm ou yarn

## 🔧 Installation

### 1. Cloner le repository
```bash
git clone https://github.com/votre-username/amd-parc-backend.git
cd amd-parc-backend
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configuration de l'environnement
```bash
# Copier le fichier d'exemple
cp env.example .env

# Éditer les variables d'environnement
nano .env
```

### 4. Configuration de la base de données
```bash
# Créer la base de données PostgreSQL
createdb amd_parc_db

# Exécuter les migrations
npm run db:migrate

# Seeding des données (optionnel)
npm run db:seed
```

### 5. Démarrer le serveur
```bash
# Mode développement
npm run dev

# Mode production
npm start
```

## 🔧 Configuration

### Variables d'Environnement

Créez un fichier `.env` avec les variables suivantes :

```env
# Configuration de la base de données PostgreSQL
DATABASE_URL=postgresql://username:password@localhost:5432/amd_parc_db

# Configuration JWT
JWT_SECRET=votre_secret_jwt_tres_securise_2024

# Configuration du serveur
PORT=10000
NODE_ENV=development

# Configuration CORS (optionnel)
CORS_ORIGIN=http://localhost:3000
```

### Base de Données

Le backend utilise PostgreSQL avec les tables suivantes :

- **users** : Utilisateurs et techniciens
- **incidents** : Tickets et incidents
- **inventory** : Inventaire du matériel

## 📡 API Endpoints

### Authentification
- `POST /api/auth/login` - Connexion utilisateur

### Incidents
- `POST /api/incidents` - Créer un incident
- `GET /api/incidents` - Lister tous les incidents
- `PATCH /api/incidents/:ticketId/assign` - Attribuer un technicien
- `PATCH /api/incidents/:ticketId/status` - Mettre à jour le statut

### Tickets
- `GET /api/tickets` - Lister les tickets pour le suivi

### Techniciens
- `GET /api/technicians` - Lister tous les techniciens

### Inventaire
- `GET /api/inventory` - Lister l'inventaire
- `POST /api/inventory` - Ajouter un item
- `PATCH /api/inventory/:itemId` - Modifier un item

### Santé
- `GET /api/health` - Vérifier l'état du serveur

## 🗄️ Structure de la Base de Données

### Table `users`
```sql
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255),
  role VARCHAR(20) DEFAULT 'utilisateur',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Table `incidents`
```sql
CREATE TABLE incidents (
  ticket_id VARCHAR(20) PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  prenom VARCHAR(100) NOT NULL,
  departement VARCHAR(100) NOT NULL,
  poste VARCHAR(100) NOT NULL,
  description_souci TEXT NOT NULL,
  categorie VARCHAR(100) DEFAULT 'Incident technique',
  priorite VARCHAR(20) DEFAULT 'Moyenne',
  etat VARCHAR(20) DEFAULT 'En attente',
  technicien_id INTEGER REFERENCES users(user_id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Table `inventory`
```sql
CREATE TABLE inventory (
  item_id VARCHAR(20) PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  type VARCHAR(100) NOT NULL,
  status VARCHAR(50) DEFAULT 'Disponible',
  condition VARCHAR(50) DEFAULT 'Bon',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🚀 Déploiement

### Déploiement Local
```bash
# Build de l'application
npm run build

# Démarrage en production
NODE_ENV=production npm start
```

### Déploiement avec Docker
```bash
# Build de l'image
docker build -t amd-parc-backend .

# Exécution du conteneur
docker run -p 10000:10000 --env-file .env amd-parc-backend
```

### Déploiement sur Blueprint
1. Connectez le repository à Blueprint
2. Configurez les variables d'environnement
3. Déployez automatiquement

## 🧪 Tests

### Tests Manuels
```bash
# Test de santé
curl http://localhost:10000/api/health

# Test de création d'incident
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

### Tests Automatisés
```bash
# Exécuter les tests (à implémenter)
npm test
```

## 📊 Monitoring

### Logs
Les logs sont affichés dans la console avec différents niveaux :
- `INFO` : Informations générales
- `ERROR` : Erreurs et exceptions
- `DEBUG` : Informations de débogage (en développement)

### Métriques
- Temps de réponse des endpoints
- Nombre de requêtes par minute
- Utilisation de la base de données

## 🔒 Sécurité

### Authentification
- JWT (JSON Web Tokens) pour l'authentification
- Tokens avec expiration (8h par défaut)
- Validation des tokens sur les routes protégées

### CORS
Configuration CORS pour autoriser :
- `http://localhost:3000` (développement)
- `https://amd-parc.blueprint.com` (production)
- `https://api.amd-parc.blueprint.com` (production)

### Validation
- Validation des données d'entrée
- Sanitisation des requêtes
- Protection contre les injections SQL

## 🛠️ Scripts Disponibles

```bash
# Démarrage en développement
npm run dev

# Démarrage en production
npm start

# Migrations de base de données
npm run db:migrate

# Seeding des données
npm run db:seed

# Test de connectivité base de données
npm run db:test
```

## 📁 Structure du Projet

```
backend/
├── config/
│   └── database.js          # Configuration PostgreSQL
├── models/
│   ├── User.js             # Modèle utilisateur
│   ├── Incident.js         # Modèle incident
│   └── Inventory.js        # Modèle inventaire
├── scripts/
│   ├── migrate.js          # Script de migration
│   └── seed.js             # Script de seeding
├── server.js               # Point d'entrée principal
├── package.json            # Dépendances et scripts
├── env.example             # Variables d'environnement
└── README.md               # Documentation
```

## 🔧 Développement

### Ajout de Nouvelles Routes
1. Créer le modèle correspondant dans `models/`
2. Ajouter la route dans `server.js`
3. Tester avec Postman ou curl
4. Documenter l'endpoint

### Modification de la Base de Données
1. Créer un script de migration dans `scripts/`
2. Tester en local
3. Déployer avec `npm run db:migrate`

## 🚨 Dépannage

### Problèmes Courants

#### Erreur de Connexion Base de Données
```bash
# Vérifier la variable DATABASE_URL
echo $DATABASE_URL

# Tester la connexion
npm run db:test
```

#### Erreur de Port
```bash
# Vérifier si le port est libre
lsof -i :10000

# Changer le port dans .env
PORT=10001
```

#### Erreur JWT
```bash
# Vérifier la variable JWT_SECRET
echo $JWT_SECRET

# Régénérer un nouveau secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## 📞 Support

### Support Technique
- **Email** : pascalouoba5@gmail.com
- **Téléphone** : +226 65494389 (incidents) / +226 65186681 (matériel)
- **Horaires** : Lun-Ven: 8h-18h

### Documentation
- [Guide de déploiement](README_DEPLOIEMENT.md)
- [Guide PostgreSQL](README_DEPLOIEMENT_POSTGRESQL.md)
- [API Documentation](API_DOCUMENTATION.md)

## 📄 Licence

MIT License - Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

---

**Version** : 1.0.0  
**Dernière mise à jour** : $(date)  
**Maintenu par** : AMD International

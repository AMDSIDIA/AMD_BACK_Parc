# Documentation API - AMD Parc Informatique Backend

## 📡 Vue d'ensemble

L'API backend fournit une interface RESTful complète pour la gestion du parc informatique AMD International.

**Base URL** : `https://api.amd-parc.blueprint.com` (production)  
**Version** : 1.0.0  
**Format** : JSON

## 🔐 Authentification

L'API utilise JWT (JSON Web Tokens) pour l'authentification.

### Connexion
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Réponse réussie (200)** :
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "utilisateur": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "role": "administrateur"
  }
}
```

**Réponse d'erreur (401)** :
```json
{
  "message": "Email ou mot de passe incorrect"
}
```

### Utilisation du Token
Pour les routes protégées, incluez le token dans l'en-tête :
```http
Authorization: Bearer <token>
```

## 📋 Incidents

### Créer un incident
```http
POST /api/incidents
Content-Type: application/json

{
  "nom": "Dupont",
  "prenom": "Jean",
  "departement": "Informatique",
  "poste": "Développeur",
  "descriptionSouci": "Mon ordinateur ne démarre plus"
}
```

**Réponse réussie (201)** :
```json
{
  "message": "Incident créé avec succès",
  "ticket": {
    "id": "TICKET-2024-001",
    "nom": "Dupont",
    "prenom": "Jean",
    "departement": "Informatique",
    "poste": "Développeur",
    "description": "Mon ordinateur ne démarre plus",
    "etat": "En attente",
    "priorite": "Moyenne",
    "created_at": "2024-01-15T10:30:00Z"
  }
}
```

### Lister tous les incidents
```http
GET /api/incidents
Authorization: Bearer <token>
```

**Réponse (200)** :
```json
[
  {
    "ticket_id": "TICKET-2024-001",
    "nom": "Dupont",
    "prenom": "Jean",
    "departement": "Informatique",
    "poste": "Développeur",
    "description_souci": "Mon ordinateur ne démarre plus",
    "categorie": "Incident technique",
    "priorite": "Moyenne",
    "etat": "En attente",
    "technicien_id": null,
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  }
]
```

### Attribuer un technicien
```http
PATCH /api/incidents/TICKET-2024-001/assign
Authorization: Bearer <token>
Content-Type: application/json

{
  "technicianId": 2
}
```

### Mettre à jour le statut
```http
PATCH /api/incidents/TICKET-2024-001/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "En cours"
}
```

## 🎫 Tickets

### Lister les tickets pour le suivi
```http
GET /api/tickets
```

**Réponse (200)** :
```json
[
  {
    "ticket_id": "TICKET-2024-001",
    "nom": "Dupont",
    "prenom": "Jean",
    "departement": "Informatique",
    "poste": "Développeur",
    "description_souci": "Mon ordinateur ne démarre plus",
    "etat": "En attente",
    "priorite": "Moyenne",
    "created_at": "2024-01-15T10:30:00Z"
  }
]
```

## 👨‍💻 Techniciens

### Lister tous les techniciens
```http
GET /api/technicians
```

**Réponse (200)** :
```json
[
  {
    "user_id": 2,
    "name": "Technicien Support",
    "email": "tech@amd.com",
    "role": "technicien",
    "created_at": "2024-01-01T00:00:00Z"
  }
]
```

## 📦 Inventaire

### Lister l'inventaire
```http
GET /api/inventory
```

**Réponse (200)** :
```json
[
  {
    "item_id": "ITEM-2024-001",
    "name": "Ordinateur portable Dell Latitude",
    "type": "Ordinateur",
    "status": "Disponible",
    "condition": "Bon",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
]
```

### Ajouter un item
```http
POST /api/inventory
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Écran 24 pouces",
  "type": "Écran",
  "status": "Disponible",
  "condition": "Bon"
}
```

### Modifier un item
```http
PATCH /api/inventory/ITEM-2024-001
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "En maintenance",
  "condition": "Moyen"
}
```

## 🏥 Santé

### Vérifier l'état du serveur
```http
GET /api/health
```

**Réponse (200)** :
```json
{
  "status": "OK",
  "message": "Serveur AMD Parc Informatique opérationnel",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## 📊 Codes de Statut HTTP

- **200** : Succès
- **201** : Créé avec succès
- **400** : Requête invalide
- **401** : Non authentifié
- **403** : Non autorisé
- **404** : Ressource non trouvée
- **500** : Erreur interne du serveur

## 🔍 Validation des Données

### Création d'incident
- `nom` : Requis, chaîne de caractères
- `prenom` : Requis, chaîne de caractères
- `departement` : Requis, chaîne de caractères
- `poste` : Requis, chaîne de caractères
- `descriptionSouci` : Requis, texte

### Connexion
- `email` : Requis, format email valide
- `password` : Requis, chaîne de caractères

## 🚨 Gestion des Erreurs

### Format d'erreur standard
```json
{
  "message": "Description de l'erreur",
  "errors": {
    "field": "Message d'erreur spécifique"
  }
}
```

### Exemples d'erreurs

**Validation échouée (400)** :
```json
{
  "errors": {
    "nom": "Le nom est obligatoire",
    "email": "Format d'email invalide"
  }
}
```

**Token invalide (403)** :
```json
{
  "message": "Token d'authentification invalide"
}
```

**Ressource non trouvée (404)** :
```json
{
  "message": "Incident non trouvé"
}
```

## 🔒 Sécurité

### CORS
L'API accepte les requêtes depuis :
- `http://localhost:3000` (développement)
- `https://amd-parc.blueprint.com` (production)
- `https://api.amd-parc.blueprint.com` (production)

### Rate Limiting
- 100 requêtes par minute par IP
- Headers de limitation inclus dans la réponse

### Headers de Sécurité
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection: 1; mode=block`

## 📝 Exemples d'Utilisation

### cURL

**Créer un incident** :
```bash
curl -X POST https://api.amd-parc.blueprint.com/api/incidents \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Dupont",
    "prenom": "Jean",
    "departement": "Informatique",
    "poste": "Développeur",
    "descriptionSouci": "Mon ordinateur ne démarre plus"
  }'
```

**Se connecter** :
```bash
curl -X POST https://api.amd-parc.blueprint.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@amd.com",
    "password": "password123"
  }'
```

### JavaScript (Fetch)

**Créer un incident** :
```javascript
const response = await fetch('https://api.amd-parc.blueprint.com/api/incidents', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    nom: 'Dupont',
    prenom: 'Jean',
    departement: 'Informatique',
    poste: 'Développeur',
    descriptionSouci: 'Mon ordinateur ne démarre plus'
  })
});

const data = await response.json();
```

**Lister les incidents (avec authentification)** :
```javascript
const response = await fetch('https://api.amd-parc.blueprint.com/api/incidents', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

const incidents = await response.json();
```

## 📞 Support

Pour toute question concernant l'API :
- **Email** : pascalouoba5@gmail.com
- **Téléphone** : +226 65494389 (incidents) / +226 65186681 (matériel)
- **Horaires** : Lun-Ven: 8h-18h

---

**Version** : 1.0.0  
**Dernière mise à jour** : $(date)  
**Maintenu par** : AMD International

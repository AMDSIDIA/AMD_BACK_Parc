#!/usr/bin/env node

/**
 * Script de test pour vérifier le Dockerfile
 * Usage: node test-dockerfile.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 Test du Dockerfile pour Render');
console.log('=' .repeat(60));

let allTestsPassed = true;

// Test 1: Vérifier que le Dockerfile existe
console.log('\n1️⃣ Vérification de l\'existence du Dockerfile...');
try {
  const dockerfilePath = path.join(__dirname, 'Dockerfile');
  if (fs.existsSync(dockerfilePath)) {
    console.log('✅ Dockerfile existe');
  } else {
    console.error('❌ Dockerfile manquant');
    allTestsPassed = false;
  }
} catch (e) {
  console.error(`❌ Erreur lors de la vérification du Dockerfile: ${e.message}`);
  allTestsPassed = false;
}

// Test 2: Vérifier le contenu du Dockerfile
console.log('\n2️⃣ Vérification du contenu du Dockerfile...');
try {
  const dockerfilePath = path.join(__dirname, 'Dockerfile');
  const dockerfileContent = fs.readFileSync(dockerfilePath, 'utf8');
  
  // Vérifier Node 18 Alpine
  if (dockerfileContent.includes('FROM node:18-alpine')) {
    console.log('✅ Utilise Node 18 Alpine');
  } else {
    console.error('❌ N\'utilise pas Node 18 Alpine');
    allTestsPassed = false;
  }
  
  // Vérifier dumb-init
  if (dockerfileContent.includes('dumb-init')) {
    console.log('✅ dumb-init installé');
  } else {
    console.error('❌ dumb-init non installé');
    allTestsPassed = false;
  }
  
  // Vérifier l'utilisateur nodejs
  if (dockerfileContent.includes('adduser -S nodejs')) {
    console.log('✅ Utilisateur nodejs créé');
  } else {
    console.error('❌ Utilisateur nodejs non créé');
    allTestsPassed = false;
  }
  
  // Vérifier la logique npm ci/npm install
  if (dockerfileContent.includes('if [ -f package-lock.json ]')) {
    console.log('✅ Logique conditionnelle npm ci/npm install présente');
  } else {
    console.error('❌ Logique conditionnelle npm ci/npm install manquante');
    allTestsPassed = false;
  }
  
  // Vérifier --only=production
  if (dockerfileContent.includes('--only=production')) {
    console.log('✅ Installation des dépendances de production uniquement');
  } else {
    console.error('❌ Installation de toutes les dépendances');
    allTestsPassed = false;
  }
  
  // Vérifier le port
  if (dockerfileContent.includes('EXPOSE 10000')) {
    console.log('✅ Port 10000 exposé');
  } else {
    console.error('❌ Port non exposé');
    allTestsPassed = false;
  }
  
  // Vérifier l'utilisateur non-root
  if (dockerfileContent.includes('USER nodejs')) {
    console.log('✅ Utilisateur non-root configuré');
  } else {
    console.error('❌ Utilisateur root utilisé');
    allTestsPassed = false;
  }
  
} catch (e) {
  console.error(`❌ Erreur lors de la vérification du contenu: ${e.message}`);
  allTestsPassed = false;
}

// Test 3: Vérifier package.json
console.log('\n3️⃣ Vérification de package.json...');
try {
  const packagePath = path.join(__dirname, 'package.json');
  const packageContent = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  
  if (packageContent.scripts && packageContent.scripts.start) {
    console.log('✅ Script start défini');
  } else {
    console.error('❌ Script start manquant');
    allTestsPassed = false;
  }
  
  if (packageContent.dependencies) {
    const requiredDeps = ['express', 'pg', 'cors', 'jsonwebtoken', 'dotenv'];
    const missingDeps = requiredDeps.filter(dep => !packageContent.dependencies[dep]);
    
    if (missingDeps.length === 0) {
      console.log('✅ Toutes les dépendances requises présentes');
    } else {
      console.error(`❌ Dépendances manquantes: ${missingDeps.join(', ')}`);
      allTestsPassed = false;
    }
  } else {
    console.error('❌ Aucune dépendance définie');
    allTestsPassed = false;
  }
  
} catch (e) {
  console.error(`❌ Erreur lors de la vérification de package.json: ${e.message}`);
  allTestsPassed = false;
}

// Test 4: Vérifier package-lock.json
console.log('\n4️⃣ Vérification de package-lock.json...');
try {
  const packageLockPath = path.join(__dirname, 'package-lock.json');
  if (fs.existsSync(packageLockPath)) {
    const stats = fs.statSync(packageLockPath);
    console.log(`✅ package-lock.json existe (${(stats.size / 1024).toFixed(1)} KB)`);
    console.log('   → Le Dockerfile utilisera npm ci (plus rapide)');
  } else {
    console.log('⚠️ package-lock.json manquant');
    console.log('   → Le Dockerfile utilisera npm install');
  }
} catch (e) {
  console.error(`❌ Erreur lors de la vérification de package-lock.json: ${e.message}`);
  allTestsPassed = false;
}

// Test 5: Vérifier .dockerignore
console.log('\n5️⃣ Vérification de .dockerignore...');
try {
  const dockerignorePath = path.join(__dirname, '.dockerignore');
  if (fs.existsSync(dockerignorePath)) {
    const dockerignoreContent = fs.readFileSync(dockerignorePath, 'utf8');
    
    if (!dockerignoreContent.includes('package-lock.json')) {
      console.log('✅ package-lock.json non exclu par .dockerignore');
    } else {
      console.error('❌ package-lock.json exclu par .dockerignore');
      allTestsPassed = false;
    }
  } else {
    console.log('⚠️ .dockerignore manquant (optionnel)');
  }
} catch (e) {
  console.error(`❌ Erreur lors de la vérification de .dockerignore: ${e.message}`);
  allTestsPassed = false;
}

// Résultat final
console.log('\n' + '=' .repeat(60));
if (allTestsPassed) {
  console.log('🎉 Tous les tests sont passés ! Le Dockerfile est prêt pour Render.');
  console.log('\n📋 Configuration Render:');
  console.log('- Source Code: AMDSIDIA / AMD_BACK_Parc');
  console.log('- Language: Docker');
  console.log('- Root Directory: backend');
  console.log('- Branch: master');
  console.log('- Region: Oregon (US West)');
  console.log('\n🔧 Variables d\'environnement à configurer:');
  console.log('- NODE_ENV=production');
  console.log('- PORT=10000');
  console.log('- DATABASE_URL=postgresql://...');
  console.log('- JWT_SECRET=votre_secret');
  console.log('- CORS_ORIGIN=https://amd-parc.onrender.com');
} else {
  console.error('⚠️ Des problèmes ont été détectés. Veuillez les corriger.');
  process.exit(1);
}

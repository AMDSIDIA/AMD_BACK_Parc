#!/usr/bin/env node

/**
 * Script de test pour vérifier la configuration de déploiement Render
 * Usage: node test-deployment.js
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Test de configuration pour le déploiement Render');
console.log('=' .repeat(60));

let allChecksPassed = true;

// Vérification 1: package-lock.json existe
console.log('\n1️⃣ Vérification de package-lock.json...');
try {
  const packageLockPath = path.join(__dirname, 'package-lock.json');
  if (fs.existsSync(packageLockPath)) {
    const stats = fs.statSync(packageLockPath);
    console.log(`✅ package-lock.json existe (${(stats.size / 1024).toFixed(1)} KB)`);
  } else {
    console.error('❌ package-lock.json manquant');
    allChecksPassed = false;
  }
} catch (e) {
  console.error(`❌ Erreur lors de la vérification de package-lock.json: ${e.message}`);
  allChecksPassed = false;
}

// Vérification 2: Dockerfile utilise npm ci
console.log('\n2️⃣ Vérification du Dockerfile...');
try {
  const dockerfilePath = path.join(__dirname, 'Dockerfile');
  const dockerfileContent = fs.readFileSync(dockerfilePath, 'utf8');
  
  if (dockerfileContent.includes('npm ci --only=production')) {
    console.log('✅ Dockerfile utilise npm ci');
  } else {
    console.error('❌ Dockerfile n\'utilise pas npm ci');
    allChecksPassed = false;
  }
  
  if (dockerfileContent.includes('EXPOSE 10000')) {
    console.log('✅ Port 10000 exposé dans Dockerfile');
  } else {
    console.error('❌ Port 10000 non exposé dans Dockerfile');
    allChecksPassed = false;
  }
} catch (e) {
  console.error(`❌ Erreur lors de la vérification du Dockerfile: ${e.message}`);
  allChecksPassed = false;
}

// Vérification 3: .dockerignore n'exclut pas package-lock.json
console.log('\n3️⃣ Vérification de .dockerignore...');
try {
  const dockerignorePath = path.join(__dirname, '.dockerignore');
  const dockerignoreContent = fs.readFileSync(dockerignorePath, 'utf8');
  
  if (!dockerignoreContent.includes('package-lock.json')) {
    console.log('✅ package-lock.json non exclu par .dockerignore');
  } else {
    console.error('❌ package-lock.json est exclu par .dockerignore');
    allChecksPassed = false;
  }
} catch (e) {
  console.error(`❌ Erreur lors de la vérification de .dockerignore: ${e.message}`);
  allChecksPassed = false;
}

// Vérification 4: package.json contient les bonnes dépendances
console.log('\n4️⃣ Vérification de package.json...');
try {
  const packagePath = path.join(__dirname, 'package.json');
  const packageContent = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  
  const requiredDeps = ['express', 'pg', 'cors', 'jsonwebtoken', 'dotenv'];
  const missingDeps = requiredDeps.filter(dep => !packageContent.dependencies[dep]);
  
  if (missingDeps.length === 0) {
    console.log('✅ Toutes les dépendances requises sont présentes');
  } else {
    console.error(`❌ Dépendances manquantes: ${missingDeps.join(', ')}`);
    allChecksPassed = false;
  }
  
  if (packageContent.scripts.start) {
    console.log('✅ Script start défini');
  } else {
    console.error('❌ Script start manquant');
    allChecksPassed = false;
  }
} catch (e) {
  console.error(`❌ Erreur lors de la vérification de package.json: ${e.message}`);
  allChecksPassed = false;
}

// Vérification 5: render.yaml existe
console.log('\n5️⃣ Vérification de render.yaml...');
try {
  const renderPath = path.join(__dirname, 'render.yaml');
  if (fs.existsSync(renderPath)) {
    console.log('✅ render.yaml existe');
  } else {
    console.error('❌ render.yaml manquant');
    allChecksPassed = false;
  }
} catch (e) {
  console.error(`❌ Erreur lors de la vérification de render.yaml: ${e.message}`);
  allChecksPassed = false;
}

// Résultat final
console.log('\n' + '=' .repeat(60));
if (allChecksPassed) {
  console.log('🎉 Toutes les vérifications sont passées ! Le backend est prêt pour le déploiement Render.');
  console.log('\n📋 Prochaines étapes:');
  console.log('1. Commiter les changements: git add . && git commit -m "Fix: Configuration Render"');
  console.log('2. Pousser vers GitHub: git push origin main');
  console.log('3. Redéployer sur Render');
} else {
  console.error('⚠️ Des problèmes de configuration ont été détectés. Veuillez les corriger.');
  process.exit(1);
}

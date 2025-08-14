#!/usr/bin/env node

/**
 * Script de test de connectivité à la base de données PostgreSQL
 * Usage: node scripts/db-test.js
 */

require('dotenv').config();
const pool = require('../config/database');

async function testDatabaseConnection() {
  console.log('🔍 Test de connectivité à la base de données PostgreSQL');
  console.log('=' .repeat(60));
  
  try {
    // Test de connexion
    console.log('📡 Test de connexion...');
    const client = await pool.connect();
    console.log('✅ Connexion établie avec succès');
    
    // Test de requête simple
    console.log('🔍 Test de requête simple...');
    const result = await client.query('SELECT NOW() as current_time, version() as pg_version');
    console.log('✅ Requête exécutée avec succès');
    console.log(`   Heure actuelle: ${result.rows[0].current_time}`);
    console.log(`   Version PostgreSQL: ${result.rows[0].pg_version.split(' ')[0]}`);
    
    // Test des tables
    console.log('📋 Test des tables...');
    const tablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    
    if (tablesResult.rows.length > 0) {
      console.log('✅ Tables trouvées:');
      tablesResult.rows.forEach(row => {
        console.log(`   - ${row.table_name}`);
      });
    } else {
      console.log('⚠️  Aucune table trouvée');
    }
    
    // Test des permissions
    console.log('🔐 Test des permissions...');
    const permissionsResult = await client.query(`
      SELECT 
        current_user as current_user,
        current_database() as current_database,
        current_schema as current_schema
    `);
    
    console.log('✅ Permissions vérifiées:');
    console.log(`   Utilisateur: ${permissionsResult.rows[0].current_user}`);
    console.log(`   Base de données: ${permissionsResult.rows[0].current_database}`);
    console.log(`   Schéma: ${permissionsResult.rows[0].current_schema}`);
    
    // Libérer la connexion
    client.release();
    
    console.log('\n🎉 Tous les tests de connectivité sont passés avec succès !');
    console.log('✅ La base de données est opérationnelle');
    
  } catch (error) {
    console.error('❌ Erreur lors du test de connectivité:');
    console.error(`   Message: ${error.message}`);
    console.error(`   Code: ${error.code}`);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Suggestions:');
      console.log('   - Vérifiez que PostgreSQL est démarré');
      console.log('   - Vérifiez la variable DATABASE_URL');
      console.log('   - Vérifiez les paramètres de connexion');
    } else if (error.code === '28P01') {
      console.log('\n💡 Suggestions:');
      console.log('   - Vérifiez le nom d\'utilisateur et mot de passe');
      console.log('   - Vérifiez la variable DATABASE_URL');
    } else if (error.code === '3D000') {
      console.log('\n💡 Suggestions:');
      console.log('   - Vérifiez que la base de données existe');
      console.log('   - Créez la base de données si nécessaire');
    }
    
    process.exit(1);
  } finally {
    // Fermer le pool de connexions
    await pool.end();
  }
}

// Exécution du test
if (require.main === module) {
  testDatabaseConnection().catch(console.error);
}

module.exports = { testDatabaseConnection };

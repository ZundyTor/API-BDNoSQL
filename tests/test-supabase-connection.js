/**
 * Script para probar la conexión a Supabase
 * Ejecutar con: node tests/test-supabase-connection.js
 */

const supabaseConnection = require('../src/infrastructure/database/supabase/connection');

async function testSupabaseConnection() {
  console.log('\n🧪 PROBANDO CONEXIÓN A SUPABASE\n');
  console.log('='. repeat(50));

  try {
    // 1. Probar conexión básica
    console.log('\n1️⃣ Probando conexión básica...');
    await supabaseConnection.testConnection();

    // 2. Contar países
    console.log('\n2️⃣ Contando países en Supabase...');
    const countriesResult = await supabaseConnection.query(
      'SELECT COUNT(*) as total FROM countries'
    );
    console.log(`   ✅ Total de países: ${countriesResult. rows[0].  total}`);

    // 3. Contar ciudades
    console.log('\n3️⃣ Contando ciudades en Supabase...');
    const citiesResult = await supabaseConnection.query(
      'SELECT COUNT(*) as total FROM cities'
    );
    console.log(`   ✅ Total de ciudades: ${citiesResult.rows[0]. total}`);

    // 4. Probar JOIN
    console.log('\n4️⃣ Probando consulta JOIN...');
    const joinResult = await supabaseConnection.query(`
      SELECT 
        co.name AS pais,
        COUNT(c. id) AS total_ciudades
      FROM countries co
      LEFT JOIN cities c ON co.id = c.country_id
      GROUP BY co.name
      ORDER BY total_ciudades DESC
      LIMIT 3
    `);
    
    console.log('   ✅ Top 3 países con más ciudades:');
    joinResult.rows.forEach(row => {
      console.log(`      - ${row.pais}: ${row.total_ciudades} ciudades`);
    });

    // 5. Listar algunas ciudades
    console.log('\n5️⃣ Listando ciudades más pobladas...');
    const topCitiesResult = await supabaseConnection.query(`
      SELECT 
        c. name AS ciudad,
        c.population AS poblacion,
        co.name AS pais
      FROM cities c
      INNER JOIN countries co ON c.country_id = co.  id
      ORDER BY c.population DESC
      LIMIT 5
    `);
    
    console.log('   ✅ Top 5 ciudades por población:');
    topCitiesResult.rows.forEach((row, index) => {
      console.log(`      ${index + 1}. ${row.ciudad} (${row.pais}): ${row.poblacion. toLocaleString()} habitantes`);
    });

    console.log('\n' + '='.repeat(50));
    console.log('✅ TODAS LAS PRUEBAS EXITOSAS\n');

  } catch (error) {
    console.error('\n❌ ERROR EN LAS PRUEBAS:', error.message);
    console.error(error.stack);
  } finally {
    // Cerrar conexión
    await supabaseConnection.close();
    process.exit(0);
  }
}

// Ejecutar pruebas
testSupabaseConnection();
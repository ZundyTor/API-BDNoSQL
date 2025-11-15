/**
 * Prueba de conexión a PostgreSQL
 */

require('dotenv').config();
const postgresConnection = require('./src/infrastructure/database/postgresql/connection');

async function testPostgreSQL() {
  console.log('🧪 Probando conexión a PostgreSQL...\n');

  try {
    // ==========================================
    // PRUEBA 1: Conexión básica
    // ==========================================
    console.log('1️⃣ Probando conexión básica...');
    const isConnected = await postgresConnection.testConnection();
    
    if (!isConnected) {
      console.error('❌ No se pudo conectar a PostgreSQL');
      process.exit(1);
    }
    console.log('');

    // ==========================================
    // PRUEBA 2: Crear tabla
    // ==========================================
    console.log('2️⃣ Inicializando tabla de países...');
    await postgresConnection.initializeTables();
    console.log('');

    // ==========================================
    // PRUEBA 3: Verificar que la tabla existe
    // ==========================================
    console.log('3️⃣ Verificando estructura de la tabla...');
    const tableInfo = await postgresConnection.query(`
      SELECT column_name, data_type, character_maximum_length
      FROM information_schema.columns
      WHERE table_name = 'countries'
      ORDER BY ordinal_position;
    `);

    console.log('📋 Columnas de la tabla "countries":');
    tableInfo.rows.forEach(col => {
      console.log(`   - ${col.column_name}: ${col.data_type}`);
    });
    console.log('');

    // ==========================================
    // PRUEBA 4: Insertar un país de prueba
    // ==========================================
    console.log('4️⃣ Insertando país de prueba...');
    const testCountry = {
      id: 'test_' + Date.now(),
      name: 'Colombia',
      continent: 'América',
      capital: 'Bogotá',
      population: 51000000,
      language: 'Español',
      flag: '🇨🇴',
      area: 1141748,
      currency: 'Peso colombiano'
    };

    await postgresConnection.query(`
      INSERT INTO countries (id, name, continent, capital, population, language, flag, area, currency)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `, [
      testCountry.id,
      testCountry.name,
      testCountry.continent,
      testCountry.capital,
      testCountry.population,
      testCountry.language,
      testCountry.flag,
      testCountry.area,
      testCountry.currency
    ]);
    console.log('✅ País insertado correctamente');
    console.log('');

    // ==========================================
    // PRUEBA 5: Consultar el país insertado
    // ==========================================
    console.log('5️⃣ Consultando país insertado...');
    const result = await postgresConnection.query(
      'SELECT * FROM countries WHERE id = $1',
      [testCountry.id]
    );

    if (result.rows.length > 0) {
      console.log('✅ País encontrado:');
      console.log(result.rows[0]);
    }
    console.log('');

    // ==========================================
    // PRUEBA 6: Limpiar datos de prueba
    // ==========================================
    console.log('6️⃣ Limpiando datos de prueba...');
    await postgresConnection.query(
      'DELETE FROM countries WHERE id = $1',
      [testCountry.id]
    );
    console.log('✅ Datos de prueba eliminados');
    console.log('');

    console.log('🎉 Todas las pruebas de PostgreSQL pasaron correctamente');

  } catch (error) {
    console.error('❌ Error en las pruebas:', error.message);
    console.error(error.stack);
  } finally {
    // Cerrar conexiones
    await postgresConnection.close();
    process.exit(0);
  }
}

// Ejecutar las pruebas
testPostgreSQL(); 
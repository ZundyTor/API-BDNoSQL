/**
 * Pruebas del Repository de PostgreSQL
 */

require('dotenv').config();
const Country = require('./src/domain/entities/Country');
const CountryPostgreSQLRepository = require('./src/infrastructure/repositories/CountryPostgreSQLRepository');
const postgresConnection = require('./src/infrastructure/database/postgresql/connection');

async function testRepository() {
  console.log('🧪 Probando CountryPostgreSQLRepository...\n');

  const repository = new CountryPostgreSQLRepository();

  try {
    // Inicializar tabla
    await postgresConnection.initializeTables();

    // Limpiar datos previos
    await repository.deleteAll();
    console.log('🧹 Base de datos limpia\n');

    // ==========================================
    // PRUEBA 1: Crear países
    // ==========================================
    console.log('1️⃣ Creando países...');
    
    const colombia = new Country({
      name: 'Colombia',
      continent: 'América',
      capital: 'Bogotá',
      population: 51000000,
      language: 'Español',
      flag: '🇨🇴',
      area: 1141748,
      currency: 'Peso colombiano'
    });

    const mexico = new Country({
      name: 'México',
      continent: 'América',
      capital: 'Ciudad de México',
      population: 128000000,
      language: 'Español',
      flag: '🇲🇽',
      area: 1964375,
      currency: 'Peso mexicano'
    });

    const japon = new Country({
      name: 'Japón',
      continent: 'Asia',
      capital: 'Tokio',
      population: 125000000,
      language: 'Japonés',
      flag: '🇯🇵',
      area: 377975,
      currency: 'Yen'
    });

    await repository.create(colombia);
    await repository.create(mexico);
    await repository.create(japon);
    console.log('');

    // ==========================================
    // PRUEBA 2: Contar países
    // ==========================================
    console.log('2️⃣ Contando países...');
    const totalCountries = await repository.count();
    console.log(`📊 Total de países: ${totalCountries}`);
    console.log('');

    // ==========================================
    // PRUEBA 3: Buscar por ID
    // ==========================================
    console.log('3️⃣ Buscando país por ID...');
    const foundCountry = await repository.findById(colombia.id);
    console.log(`✅ País encontrado: ${foundCountry.toString()}`);
    console.log('');

    // ==========================================
    // PRUEBA 4: Buscar por nombre
    // ==========================================
    console.log('4️⃣ Buscando país por nombre...');
    const foundByName = await repository.findByName('México');
    console.log(`✅ País encontrado: ${foundByName.toString()}`);
    console.log('');

    // ==========================================
    // PRUEBA 5: Buscar todos
    // ==========================================
    console.log('5️⃣ Obteniendo todos los países...');
    const allCountries = await repository.findAll();
    console.log(`📋 Países encontrados (${allCountries.length}):`);
    allCountries.forEach(country => {
      console.log(`   ${country.toString()}`);
    });
    console.log('');

    // ==========================================
    // PRUEBA 6: Buscar por continente
    // ==========================================
    console.log('6️⃣ Buscando países de América...');
    const americanCountries = await repository.findByContinent('América');
    console.log(`🌎 Países de América (${americanCountries.length}):`);
    americanCountries.forEach(country => {
      console.log(`   ${country.toString()}`);
    });
    console.log('');

    // ==========================================
    // PRUEBA 7: Buscar por población mínima
    // ==========================================
    console.log('7️⃣ Buscando países con más de 100 millones de habitantes...');
    const populousCountries = await repository.findByMinPopulation(100000000);
    console.log(`👥 Países encontrados (${populousCountries.length}):`);
    populousCountries.forEach(country => {
      console.log(`   ${country.toString()}`);
    });
    console.log('');

    // ==========================================
    // PRUEBA 8: Actualizar país
    // ==========================================
    console.log('8️⃣ Actualizando población de Colombia...');
    const updatedCountry = await repository.update(colombia.id, {
      population: 52000000
    });
    console.log(`✅ País actualizado: ${updatedCountry.toString()}`);
    console.log('');

    // ==========================================
    // PRUEBA 9: Eliminar país
    // ==========================================
    console.log('9️⃣ Eliminando Japón...');
    const deleted = await repository.delete(japon.id);
    console.log(`✅ País eliminado: ${deleted}`);
    
    const countAfterDelete = await repository.count();
    console.log(`📊 Total de países después de eliminar: ${countAfterDelete}`);
    console.log('');

    console.log('🎉 Todas las pruebas del Repository pasaron correctamente');

  } catch (error) {
    console.error('❌ Error en las pruebas:', error.message);
    console.error(error.stack);
  } finally {
    await postgresConnection.close();
    process.exit(0);
  }
}

testRepository();
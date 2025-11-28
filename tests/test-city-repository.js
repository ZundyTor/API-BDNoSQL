/**
 * Pruebas del CityPostgreSQLRepository
 */

const CityPostgreSQLRepository = require('../src/infrastructure/repositories/CityPostgreSQLRepository');
const City = require('../src/domain/entities/City');
const postgresConnection = require('../src/infrastructure/database/postgresql/connection');

async function testCityRepository() {
  console.log('\n🧪 PRUEBAS DEL CITY REPOSITORY\n');
  console.log('='.repeat(50));

  let testCityId = null;
  let repository = null;

  try {
    // Crear pool de conexión (CORREGIDO)
    const pool = postgresConnection.getPool();
    repository = new CityPostgreSQLRepository(pool);

    // Test de conexión primero
    console.log('\n🔌 Probando conexión a PostgreSQL...');
    await postgresConnection.testConnection();

    // Test 1: Crear una ciudad
    console.log('\n1️⃣ Test: Crear ciudad');
    const newCity = new City({
      countryId: 'country_1764332757512_ndeau1y33', // Colombia (de Supabase)
      name: 'Cartagena',
      population: 1000000,
      isCapital: false,
      latitude: 10.3910485,
      longitude: -75.4794257
    });

    const createdCity = await repository.create(newCity);
    testCityId = createdCity. id;
    console.log('✅ Ciudad creada:', createdCity.name, '- ID:', createdCity.id);

    // Test 2: Obtener todas las ciudades
    console.log('\n2️⃣ Test: Obtener todas las ciudades');
    const allCities = await repository.findAll(5, 0);
    console.log(`✅ Total de ciudades obtenidas: ${allCities.length}`);
    allCities.forEach(city => {
      console.log(`   - ${city.name}: ${city.population. toLocaleString()} habitantes`);
    });

    // Test 3: Obtener ciudad por ID
    console.log('\n3️⃣ Test: Obtener ciudad por ID');
    const foundCity = await repository.findById(testCityId);
    if (foundCity) {
      console.log('✅ Ciudad encontrada:', foundCity.name);
    } else {
      console. log('❌ Ciudad no encontrada');
    }

    // Test 4: Obtener ciudades por país (Colombia)
    console.log('\n4️⃣ Test: Obtener ciudades de Colombia');
    const colombianCities = await repository.findByCountryId('country_1764332757512_ndeau1y33');
    console.log(`✅ Ciudades de Colombia: ${colombianCities.length}`);
    colombianCities.forEach(city => {
      console. log(`   - ${city.name}`);
    });

    // Test 5: Obtener solo capitales
    console.log('\n5️⃣ Test: Obtener solo capitales');
    const capitals = await repository.findCapitals(5);
    console.log(`✅ Capitales encontradas: ${capitals.length}`);
    capitals.forEach(city => {
      console.log(`   - ${city.name}: ${city.population.toLocaleString()} habitantes`);
    });

    // Test 6: Obtener ciudades con información del país (JOIN)
    console.log('\n6️⃣ Test: Obtener ciudades con países (JOIN)');
    const citiesWithCountry = await repository.findAllWithCountry(3);
    console.log(`✅ Ciudades con países: ${citiesWithCountry.length}`);
    citiesWithCountry.forEach(city => {
      console. log(`   - ${city.name} (${city.country.name} ${city.country.flag})`);
    });

    // Test 7: Actualizar ciudad
    console.log('\n7️⃣ Test: Actualizar ciudad');
    const updatedCity = await repository.update(testCityId, {
      population: 1050000,
      isCapital: false
    });
    console.log('✅ Ciudad actualizada:', updatedCity.name, '- Nueva población:', updatedCity.population.toLocaleString());

    // Test 8: Contar ciudades
    console.log('\n8️⃣ Test: Contar ciudades');
    const totalCities = await repository.count();
    console.log(`✅ Total de ciudades en la BD: ${totalCities}`);

    // Test 9: Buscar por nombre
    console.log('\n9️⃣ Test: Buscar ciudades por nombre');
    const searchResults = await repository.searchByName('Bog');
    console.log(`✅ Ciudades que contienen "Bog": ${searchResults.length}`);
    searchResults.forEach(city => {
      console.log(`   - ${city.name}`);
    });

    // Test 10: Eliminar ciudad de prueba
    console.log('\n🔟 Test: Eliminar ciudad de prueba');
    const deletedCity = await repository.delete(testCityId);
    if (deletedCity) {
      console.log('✅ Ciudad eliminada:', deletedCity. name);
    }

    console.log('\n' + '='.repeat(50));
    console.log('✅ TODAS LAS PRUEBAS COMPLETADAS\n');

  } catch (error) {
    console.error('\n❌ ERROR EN LAS PRUEBAS:', error.message);
    console.error(error.stack);
  } finally {
    // Cerrar conexión
    if (postgresConnection) {
      await postgresConnection. close();
      console.log('✅ Conexión cerrada');
    }
    process.exit(0);
  }
}

// Ejecutar pruebas
testCityRepository();
/**
 * Pruebas del Repository de MongoDB
 */

require('dotenv').config();
const Country = require('./src/domain/entities/Country');
const CountryMongoDBRepository = require('./src/infrastructure/repositories/CountryMongoDBRepository');
const mongoConnection = require('./src/infrastructure/database/mongodb/connection');

async function testMongoDBRepository() {
  console.log('🧪 Probando CountryMongoDBRepository...\n');

  const repository = new CountryMongoDBRepository();

  try {
    // Conectar y crear índices
    await mongoConnection.connect();
    await mongoConnection.createIndexes();

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

    const españa = new Country({
      name: 'España',
      continent: 'Europa',
      capital: 'Madrid',
      population: 47000000,
      language: 'Español',
      flag: '🇪🇸',
      area: 505990,
      currency: 'Euro'
    });

    const argentina = new Country({
      name: 'Argentina',
      continent: 'América',
      capital: 'Buenos Aires',
      population: 45000000,
      language: 'Español',
      flag: '🇦🇷',
      area: 2780400,
      currency: 'Peso argentino'
    });

    await repository.create(colombia);
    await repository.create(mexico);
    await repository.create(japon);
    await repository.create(españa);
    await repository.create(argentina);
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
    console.log('4️⃣ Buscando país por nombre (case-insensitive)...');
    const foundByName = await repository.findByName('MÉXICO'); // En mayúsculas
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
    // PRUEBA 7: Buscar por idioma
    // ==========================================
    console.log('7️⃣ Buscando países de habla española...');
    const spanishCountries = await repository.findByLanguage('Español');
    console.log(`🗣️ Países de habla española (${spanishCountries.length}):`);
    spanishCountries.forEach(country => {
      console.log(`   ${country.toString()}`);
    });
    console.log('');

    // ==========================================
    // PRUEBA 8: Buscar por población mínima
    // ==========================================
    console.log('8️⃣ Buscando países con más de 100 millones de habitantes...');
    const populousCountries = await repository.findByMinPopulation(100000000);
    console.log(`👥 Países encontrados (${populousCountries.length}):`);
    populousCountries.forEach(country => {
      console.log(`   ${country.toString()}`);
    });
    console.log('');

    // ==========================================
    // PRUEBA 9: Buscar por rango de población
    // ==========================================
    console.log('9️⃣ Buscando países con población entre 40M y 60M...');
    const rangeCountries = await repository.findByPopulationRange(40000000, 60000000);
    console.log(`📊 Países encontrados (${rangeCountries.length}):`);
    rangeCountries.forEach(country => {
      console.log(`   ${country.toString()}`);
    });
    console.log('');

    // ==========================================
    // PRUEBA 10: Contar por continente (Agregación)
    // ==========================================
    console.log('🔟 Contando países por continente...');
    const countByContinent = await repository.countByContinent();
    console.log('🌍 Distribución por continente:');
    Object.entries(countByContinent).forEach(([continent, data]) => {
      console.log(`   ${continent}: ${data.count} países, ${data.totalPopulation.toLocaleString()} habitantes`);
    });
    console.log('');

    // ==========================================
    // PRUEBA 11: Actualizar país
    // ==========================================
    console.log('1️⃣1️⃣ Actualizando población de Colombia...');
    const updatedCountry = await repository.update(colombia.id, {
      population: 52000000
    });
    console.log(`✅ País actualizado: ${updatedCountry.toString()}`);
    console.log('');

    // ==========================================
    // PRUEBA 12: Eliminar país
    // ==========================================
    console.log('1️⃣2️⃣ Eliminando Japón...');
    const deleted = await repository.delete(japon.id);
    console.log(`✅ País eliminado: ${deleted}`);
    
    const countAfterDelete = await repository.count();
    console.log(`📊 Total de países después de eliminar: ${countAfterDelete}`);
    console.log('');

    console.log('🎉 Todas las pruebas del Repository MongoDB pasaron correctamente');

  } catch (error) {
    console.error('❌ Error en las pruebas:', error.message);
    console.error(error.stack);
  } finally {
    await mongoConnection.close();
    process.exit(0);
  }
}

testMongoDBRepository();
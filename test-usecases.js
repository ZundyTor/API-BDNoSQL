/**
 * Pruebas de los Casos de Uso
 */

require('dotenv').config();

// Repositories
const CountryPostgreSQLRepository = require('./src/infrastructure/repositories/CountryPostgreSQLRepository');
const CountryMongoDBRepository = require('./src/infrastructure/repositories/CountryMongoDBRepository');

// Conexiones
const postgresConnection = require('./src/infrastructure/database/postgresql/connection');
const mongoConnection = require('./src/infrastructure/database/mongodb/connection');

// Casos de Uso
const CreateCountry = require('./src/application/useCases/CreateCountry');
const GetCountryById = require('./src/application/useCases/GetCountryById');
const GetAllCountries = require('./src/application/useCases/GetAllCountries');
const GetCountriesByContinent = require('./src/application/useCases/GetCountriesByContinent');
const UpdateCountry = require('./src/application/useCases/UpdateCountry');
const DeleteCountry = require('./src/application/useCases/DeleteCountry');

async function testUseCases() {
  console.log('🧪 Probando Casos de Uso...\n');

  // Inicializar repositories
  const repositories = {
    postgresql: new CountryPostgreSQLRepository(),
    mongodb: new CountryMongoDBRepository()
  };

  // Inicializar casos de uso
  const createCountry = new CreateCountry(repositories);
  const getCountryById = new GetCountryById(repositories);
  const getAllCountries = new GetAllCountries(repositories);
  const getCountriesByContinent = new GetCountriesByContinent(repositories);
  const updateCountry = new UpdateCountry(repositories);
  const deleteCountry = new DeleteCountry(repositories);

  try {
    // Inicializar bases de datos
    await postgresConnection.testConnection();
    await postgresConnection.initializeTables();
    await mongoConnection.connect();
    await mongoConnection.createIndexes();

    // Limpiar datos previos
    await repositories.postgresql.deleteAll();
    await repositories.mongodb.deleteAll();
    console.log('\n🧹 Bases de datos limpias\n');

    // ==========================================
    // PRUEBA 1: Crear país en ambas BD
    // ==========================================
    console.log('=' .repeat(50));
    console.log('1️⃣ CREAR PAÍS EN AMBAS BASES DE DATOS');
    console.log('='.repeat(50));
    
    const colombiaResult = await createCountry.execute({
      name: 'Colombia',
      continent: 'América',
      capital: 'Bogotá',
      population: 51000000,
      language: 'Español',
      flag: '🇨🇴',
      area: 1141748,
      currency: 'Peso colombiano'
    }, { database: 'both' });

    console.log('Resultado:', JSON.stringify(colombiaResult.databases, null, 2));

    // ==========================================
    // PRUEBA 2: Crear país solo en PostgreSQL
    // ==========================================
    console.log('\n' + '='.repeat(50));
    console.log('2️⃣ CREAR PAÍS SOLO EN POSTGRESQL');
    console.log('='.repeat(50));
    
    const mexicoResult = await createCountry.execute({
      name: 'México',
      continent: 'América',
      capital: 'Ciudad de México',
      population: 128000000,
      language: 'Español',
      flag: '🇲🇽',
      area: 1964375,
      currency: 'Peso mexicano'
    }, { database: 'postgresql' });

    console.log('Resultado:', JSON.stringify(mexicoResult.databases, null, 2));

    // ==========================================
    // PRUEBA 3: Crear país solo en MongoDB
    // ==========================================
    console.log('\n' + '='.repeat(50));
    console.log('3️⃣ CREAR PAÍS SOLO EN MONGODB');
    console.log('='.repeat(50));
    
    const japonResult = await createCountry.execute({
      name: 'Japón',
      continent: 'Asia',
      capital: 'Tokio',
      population: 125000000,
      language: 'Japonés',
      flag: '🇯🇵',
      area: 377975,
      currency: 'Yen'
    }, { database: 'mongodb' });

    console.log('Resultado:', JSON.stringify(japonResult.databases, null, 2));

    // ==========================================
    // PRUEBA 4: Obtener país por ID
    // ==========================================
    console.log('\n' + '='.repeat(50));
    console.log('4️⃣ OBTENER PAÍS POR ID');
    console.log('='.repeat(50));
    
    const foundInPostgres = await getCountryById.execute(
      colombiaResult.country.id, 
      { database: 'postgresql' }
    );
    console.log('Desde PostgreSQL:', foundInPostgres.name);

    const foundInMongo = await getCountryById.execute(
      colombiaResult.country.id, 
      { database: 'mongodb' }
    );
    console.log('Desde MongoDB:', foundInMongo.name);

    // ==========================================
    // PRUEBA 5: Obtener todos los países
    // ==========================================
    console.log('\n' + '='.repeat(50));
    console.log('5️⃣ OBTENER TODOS LOS PAÍSES');
    console.log('='.repeat(50));
    
    const allFromPostgres = await getAllCountries.execute({ database: 'postgresql' });
    console.log(`PostgreSQL: ${allFromPostgres.metadata.total} países`);

    const allFromMongo = await getAllCountries.execute({ database: 'mongodb' });
    console.log(`MongoDB: ${allFromMongo.metadata.total} países`);

    // ==========================================
    // PRUEBA 6: Filtrar por continente
    // ==========================================
    console.log('\n' + '='.repeat(50));
    console.log('6️⃣ FILTRAR POR CONTINENTE');
    console.log('='.repeat(50));
    
    const americanCountries = await getCountriesByContinent.execute(
      'América', 
      { database: 'postgresql' }
    );
    console.log(`Países de América: ${americanCountries.count}`);
    americanCountries.countries.forEach(c => console.log(`  - ${c.flag} ${c.name}`));

    // ==========================================
    // PRUEBA 7: Actualizar país
    // ==========================================
    console.log('\n' + '='.repeat(50));
    console.log('7️⃣ ACTUALIZAR PAÍS');
    console.log('='.repeat(50));
    
    const updated = await updateCountry.execute(
      colombiaResult.country.id,
      { population: 52000000 },
      { database: 'both' }
    );
    console.log(`Nueva población: ${updated.country.population.toLocaleString()}`);

    // ==========================================
    // PRUEBA 8: Eliminar país
    // ==========================================
    console.log('\n' + '='.repeat(50));
    console.log('8️⃣ ELIMINAR PAÍS');
    console.log('='.repeat(50));
    
    const deleted = await deleteCountry.execute(
      colombiaResult.country.id,
      { database: 'both' }
    );
    console.log('Resultado:', JSON.stringify(deleted.databases, null, 2));

    console.log('\n' + '='.repeat(50));
    console.log('🎉 TODAS LAS PRUEBAS COMPLETADAS EXITOSAMENTE');
    console.log('='.repeat(50));

  } catch (error) {
    console.error('\n❌ Error en las pruebas:', error.message);
    console.error(error.stack);
  } finally {
    await postgresConnection.close();
    await mongoConnection.close();
    process.exit(0);
  }
}

testUseCases();
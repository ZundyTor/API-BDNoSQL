/**
 * Prueba de conexión a MongoDB
 */

require('dotenv').config();
const mongoConnection = require('./src/infrastructure/database/mongodb/connection');

async function testMongoDB() {
  console.log('🧪 Probando conexión a MongoDB...\n');

  try {
    // ==========================================
    // PRUEBA 1: Conexión básica
    // ==========================================
    console.log('1️⃣ Probando conexión básica...');
    const isConnected = await mongoConnection.testConnection();
    
    if (!isConnected) {
      console.error('❌ No se pudo conectar a MongoDB');
      process.exit(1);
    }
    console.log('');

    // ==========================================
    // PRUEBA 2: Crear índices
    // ==========================================
    console.log('2️⃣ Creando índices...');
    await mongoConnection.createIndexes();
    console.log('');

    // ==========================================
    // PRUEBA 3: Obtener colección
    // ==========================================
    console.log('3️⃣ Obteniendo colección de países...');
    const countriesCollection = mongoConnection.getCollection('countries');
    console.log(`✅ Colección obtenida: ${countriesCollection.collectionName}`);
    console.log('');

    // ==========================================
    // PRUEBA 4: Insertar un documento de prueba
    // ==========================================
    console.log('4️⃣ Insertando documento de prueba...');
    const testCountry = {
      id: 'test_' + Date.now(),
      name: 'Colombia',
      continent: 'América',
      capital: 'Bogotá',
      population: 51000000,
      language: 'Español',
      flag: '🇨🇴',
      area: 1141748,
      currency: 'Peso colombiano',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const insertResult = await countriesCollection.insertOne(testCountry);
    console.log(`✅ Documento insertado con ID: ${insertResult.insertedId}`);
    console.log('');

    // ==========================================
    // PRUEBA 5: Consultar el documento
    // ==========================================
    console.log('5️⃣ Consultando documento insertado...');
    const foundCountry = await countriesCollection.findOne({ id: testCountry.id });
    
    if (foundCountry) {
      console.log('✅ Documento encontrado:');
      console.log(foundCountry);
    }
    console.log('');

    // ==========================================
    // PRUEBA 6: Actualizar el documento
    // ==========================================
    console.log('6️⃣ Actualizando documento...');
    const updateResult = await countriesCollection.updateOne(
      { id: testCountry.id },
      { $set: { population: 52000000, updatedAt: new Date() } }
    );
    console.log(`✅ Documentos modificados: ${updateResult.modifiedCount}`);
    console.log('');

    // ==========================================
    // PRUEBA 7: Eliminar el documento
    // ==========================================
    console.log('7️⃣ Eliminando documento de prueba...');
    const deleteResult = await countriesCollection.deleteOne({ id: testCountry.id });
    console.log(`✅ Documentos eliminados: ${deleteResult.deletedCount}`);
    console.log('');

    // ==========================================
    // PRUEBA 8: Estadísticas de la BD
    // ==========================================
    console.log('8️⃣ Obteniendo estadísticas...');
    await mongoConnection.getStats();
    console.log('');

    console.log('🎉 Todas las pruebas de MongoDB pasaron correctamente');

  } catch (error) {
    console.error('❌ Error en las pruebas:', error.message);
    console.error(error.stack);
  } finally {
    await mongoConnection.close();
    process.exit(0);
  }
}

testMongoDB();
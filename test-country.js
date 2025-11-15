// Importamos la entidad Country
const Country = require('./src/domain/entities/Country');

console.log('🧪 Probando la entidad Country...\n');

// ==========================================
// PRUEBA 1: Crear un país válido
// ==========================================
try {
  console.log('✅ PRUEBA 1: Crear un país válido');
  
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

  console.log(colombia.toString());
  console.log(`Densidad poblacional: ${colombia.getPopulationDensity()} hab/km²`);
  console.log('Objeto JSON:', colombia.toJSON());
  console.log('\n');
} catch (error) {
  console.error('❌ Error:', error.message);
}

// ==========================================
// PRUEBA 2: Intentar crear un país sin nombre
// ==========================================
try {
  console.log('❌ PRUEBA 2: Crear un país sin nombre (debe fallar)');
  
  const paisInvalido = new Country({
    continent: 'Europa',
    capital: 'Madrid',
    population: 47000000,
    language: 'Español'
  });
  
  console.log('⚠️ ERROR: No debería llegar aquí');
} catch (error) {
  console.log(`✅ Validación correcta: ${error.message}`);
  console.log('\n');
}

// ==========================================
// PRUEBA 3: Intentar crear un país con continente inválido
// ==========================================
try {
  console.log('❌ PRUEBA 3: Crear un país con continente inválido (debe fallar)');
  
  const paisInvalido = new Country({
    name: 'Atlantis',
    continent: 'Atlántico', // No existe este continente
    capital: 'Atlantis City',
    population: 10000,
    language: 'Atlantean'
  });
  
  console.log('⚠️ ERROR: No debería llegar aquí');
} catch (error) {
  console.log(`✅ Validación correcta: ${error.message}`);
  console.log('\n');
}

// ==========================================
// PRUEBA 4: Actualizar un país
// ==========================================
try {
  console.log('✅ PRUEBA 4: Actualizar información de un país');
  
  const mexico = new Country({
    name: 'México',
    continent: 'América',
    capital: 'Ciudad de México',
    population: 126000000,
    language: 'Español',
    flag: '🇲🇽',
    area: 1964375,
    currency: 'Peso mexicano'
  });

  console.log('Antes:', mexico.toString());
  
  // Actualizamos la población
  mexico.update({ population: 128000000 });
  
  console.log('Después:', mexico.toString());
  console.log('\n');
} catch (error) {
  console.error('❌ Error:', error.message);
}

console.log('🎉 Todas las pruebas completadas');
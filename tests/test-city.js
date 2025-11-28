/**
 * Pruebas de la entidad City
 */

const City = require('../src/domain/entities/City');

console.log('\n🧪 PRUEBAS DE LA ENTIDAD CITY\n');
console.log('='. repeat(50));

// Test 1: Crear ciudad válida
console.log('\n1️⃣ Test: Crear ciudad válida');
try {
  const city = new City({
    countryId: 'country_123',
    name: 'Bogotá',
    population: 8000000,
    isCapital: true,
    latitude: 4.7109886,
    longitude: -74.0721455
  });

  console.log('✅ Ciudad creada exitosamente:');
  console.log(JSON.stringify(city.toJSON(), null, 2));
} catch (error) {
  console.error('❌ Error:', error.message);
}

// Test 2: Validación - Nombre vacío
console.log('\n2️⃣ Test: Validación - Nombre vacío');
try {
  const city = new City({
    countryId: 'country_123',
    name: '',
    population: 1000000
  });
  console.log('❌ No debería llegar aquí');
} catch (error) {
  console.log('✅ Error capturado correctamente:', error.message);
}

// Test 3: Validación - Población negativa
console.log('\n3️⃣ Test: Validación - Población negativa');
try {
  const city = new City({
    countryId: 'country_123',
    name: 'Ciudad Test',
    population: -5000
  });
  console.log('❌ No debería llegar aquí');
} catch (error) {
  console.log('✅ Error capturado correctamente:', error.message);
}

// Test 4: Validación - Latitud inválida
console.log('\n4️⃣ Test: Validación - Latitud inválida');
try {
  const city = new City({
    countryId: 'country_123',
    name: 'Ciudad Test',
    population: 1000000,
    latitude: 100  // Fuera de rango [-90, 90]
  });
  console.log('❌ No debería llegar aquí');
} catch (error) {
  console.log('✅ Error capturado correctamente:', error.message);
}

// Test 5: Actualizar ciudad
console.log('\n5️⃣ Test: Actualizar ciudad');
try {
  const city = new City({
    countryId: 'country_123',
    name: 'Medellín',
    population: 2500000,
    isCapital: false
  });

  console.log('Ciudad original:', city.name, '- Población:', city.population);

  city.update({
    population: 2600000,
    isCapital: false
  });

  console.log('✅ Ciudad actualizada:', city.name, '- Población:', city.population);
} catch (error) {
  console. error('❌ Error:', error. message);
}

// Test 6: Métodos de utilidad
console.log('\n6️⃣ Test: Métodos de utilidad');
try {
  const city1 = new City({
    countryId: 'country_123',
    name: 'Tokio',
    population: 14000000,
    isCapital: true,
    latitude: 35.6761919,
    longitude: 139.6503106
  });

  const city2 = new City({
    countryId: 'country_123',
    name: 'Ciudad Sin Coordenadas',
    population: 500000
  });

  console.log('✅ Tokio tiene coordenadas:', city1.hasCoordinates());
  console. log('✅ Ciudad Sin Coordenadas tiene coordenadas:', city2.hasCoordinates());
  console.log('✅ Resumen de Tokio:', city1.getSummary());
} catch (error) {
  console.error('❌ Error:', error.message);
}

console.log('\n' + '='.repeat(50));
console.log('✅ TODAS LAS PRUEBAS COMPLETADAS\n');
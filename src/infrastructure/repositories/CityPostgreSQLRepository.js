/**
 * Repository: CityPostgreSQLRepository
 * Maneja todas las operaciones de base de datos para la entidad City
 * Compatible con PostgreSQL local y Supabase
 */

const City = require('../../domain/entities/City');
const postgresConnection = require('../database/postgresql/connection');

class CityPostgreSQLRepository {
  // ✅ SIN constructor, usa postgresConnection directamente

  /**
   * Crear una nueva ciudad
   */
  async create(city) {
    const query = `
      INSERT INTO cities (
        id, country_id, name, population, is_capital, 
        latitude, longitude, created_at, updated_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;

    const values = [
      city.id,
      city.countryId,
      city.name,
      city.population,
      city.isCapital,
      city.latitude,
      city.longitude,
      city.createdAt,
      city.updatedAt
    ];

    try {
      const result = await postgresConnection.query(query, values);
      console.log(`✅ Ciudad "${city.name}" creada en PostgreSQL`);
      return this. mapRowToCity(result.rows[0]);
    } catch (error) {
      console.error('Error al crear ciudad:', error.message);
      
      // Manejo específico de errores de PostgreSQL
      if (error. code === '23503') { // Foreign key violation
        throw new Error(`El país con ID ${city.countryId} no existe`);
      }
      
      if (error.code === '23505') { // Unique violation
        throw new Error('Ya existe una ciudad con ese ID');
      }
      
      throw new Error(`Error al crear ciudad: ${error. message}`);
    }
  }

  /**
   * Obtener todas las ciudades
   */
  async findAll(limit = 100, offset = 0) {
    const query = `
      SELECT * FROM cities
      ORDER BY population DESC
      LIMIT $1 OFFSET $2
    `;

    try {
      const result = await postgresConnection.query(query, [limit, offset]);
      return result.rows.map(row => this.mapRowToCity(row));
    } catch (error) {
      console.error('Error al obtener ciudades:', error.message);
      throw new Error(`Error al obtener ciudades: ${error.message}`);
    }
  }

  /**
   * Obtener ciudad por ID
   */
  async findById(id) {
    const query = 'SELECT * FROM cities WHERE id = $1';

    try {
      const result = await postgresConnection.query(query, [id]);
      
      if (result.rows.length === 0) {
        return null;
      }

      return this.mapRowToCity(result. rows[0]);
    } catch (error) {
      console. error('Error al buscar ciudad por ID:', error.message);
      throw new Error(`Error al buscar ciudad: ${error.message}`);
    }
  }

  /**
   * Obtener ciudades por país
   */
  async findByCountryId(countryId, limit = 50, offset = 0) {
    const query = `
      SELECT * FROM cities
      WHERE country_id = $1
      ORDER BY population DESC
      LIMIT $2 OFFSET $3
    `;

    try {
      const result = await postgresConnection.query(query, [countryId, limit, offset]);
      return result.rows.map(row => this.mapRowToCity(row));
    } catch (error) {
      console.error('Error al obtener ciudades por país:', error.message);
      throw new Error(`Error al obtener ciudades del país: ${error.message}`);
    }
  }

  /**
   * Obtener solo las capitales
   */
  async findCapitals(limit = 50, offset = 0) {
    const query = `
      SELECT * FROM cities
      WHERE is_capital = true
      ORDER BY population DESC
      LIMIT $1 OFFSET $2
    `;

    try {
      const result = await postgresConnection.query(query, [limit, offset]);
      return result.rows.map(row => this.mapRowToCity(row));
    } catch (error) {
      console.error('Error al obtener capitales:', error.message);
      throw new Error(`Error al obtener capitales: ${error.message}`);
    }
  }

  /**
   * Obtener ciudades con información del país (JOIN)
   */
  async findAllWithCountry(limit = 100, offset = 0) {
    const query = `
      SELECT 
        c.*,
        co.name as country_name,
        co.continent,
        co.flag
      FROM cities c
      INNER JOIN countries co ON c.country_id = co.id
      ORDER BY c.population DESC
      LIMIT $1 OFFSET $2
    `;

    try {
      const result = await postgresConnection.query(query, [limit, offset]);
      return result.rows.map(row => ({
        ... this.mapRowToCity(row),
        country: {
          id: row.country_id,
          name: row.country_name,
          continent: row.continent,
          flag: row.flag
        }
      }));
    } catch (error) {
      console.error('Error al obtener ciudades con países:', error.message);
      throw new Error(`Error al obtener ciudades con países: ${error.message}`);
    }
  }

  /**
   * Actualizar una ciudad
   */
  async update(id, cityData) {
    // Primero verificar si existe
    const existingCity = await this.findById(id);
    if (!existingCity) {
      return null;
    }

    // Actualizar solo los campos proporcionados
    const fields = [];
    const values = [];
    let paramCount = 1;

    if (cityData.name !== undefined) {
      fields.push(`name = $${paramCount}`);
      values.push(cityData.name);
      paramCount++;
    }

    if (cityData.population !== undefined) {
      fields.push(`population = $${paramCount}`);
      values.push(cityData.population);
      paramCount++;
    }

    if (cityData. isCapital !== undefined) {
      fields.push(`is_capital = $${paramCount}`);
      values.push(cityData. isCapital);
      paramCount++;
    }

    if (cityData.latitude !== undefined) {
      fields. push(`latitude = $${paramCount}`);
      values.push(cityData.latitude);
      paramCount++;
    }

    if (cityData.longitude !== undefined) {
      fields.push(`longitude = $${paramCount}`);
      values.push(cityData. longitude);
      paramCount++;
    }

    // Siempre actualizar updated_at
    fields.push(`updated_at = $${paramCount}`);
    values.push(new Date());
    paramCount++;

    // Agregar el ID como último parámetro
    values.push(id);

    const query = `
      UPDATE cities
      SET ${fields.join(', ')}
      WHERE id = $${paramCount}
      RETURNING *
    `;

    try {
      const result = await postgresConnection.query(query, values);
      console.log(`✅ Ciudad "${result.rows[0].name}" actualizada en PostgreSQL`);
      return this.mapRowToCity(result.rows[0]);
    } catch (error) {
      console.error('Error al actualizar ciudad:', error.message);
      throw new Error(`Error al actualizar ciudad: ${error.message}`);
    }
  }

  /**
   * Eliminar una ciudad
   */
  async delete(id) {
    const query = 'DELETE FROM cities WHERE id = $1 RETURNING *';

    try {
      const result = await postgresConnection.query(query, [id]);
      
      if (result.rows.length === 0) {
        return null;
      }

      console. log(`✅ Ciudad con ID "${id}" eliminada de PostgreSQL`);
      return this.mapRowToCity(result. rows[0]);
    } catch (error) {
      console. error('Error al eliminar ciudad:', error.message);
      throw new Error(`Error al eliminar ciudad: ${error.message}`);
    }
  }

  /**
   * Contar total de ciudades
   */
  async count() {
    const query = 'SELECT COUNT(*) as total FROM cities';

    try {
      const result = await postgresConnection.query(query);
      return parseInt(result. rows[0].total);
    } catch (error) {
      console.error('Error al contar ciudades:', error.message);
      throw new Error(`Error al contar ciudades: ${error.message}`);
    }
  }

  /**
   * Contar ciudades por país
   */
  async countByCountry(countryId) {
    const query = 'SELECT COUNT(*) as total FROM cities WHERE country_id = $1';

    try {
      const result = await postgresConnection.query(query, [countryId]);
      return parseInt(result.rows[0].total);
    } catch (error) {
      console.error('Error al contar ciudades del país:', error.message);
      throw new Error(`Error al contar ciudades del país: ${error. message}`);
    }
  }

  /**
   * Buscar ciudades por nombre (búsqueda parcial)
   */
  async searchByName(searchTerm, limit = 20) {
    const query = `
      SELECT * FROM cities
      WHERE LOWER(name) LIKE LOWER($1)
      ORDER BY population DESC
      LIMIT $2
    `;

    try {
      const result = await postgresConnection.query(query, [`%${searchTerm}%`, limit]);
      return result.rows.map(row => this.mapRowToCity(row));
    } catch (error) {
      console.error('Error al buscar ciudades:', error.message);
      throw new Error(`Error al buscar ciudades: ${error.message}`);
    }
  }

  /**
   * Mapear fila de base de datos a entidad City
   */
  mapRowToCity(row) {
    return new City({
      id: row.id,
      countryId: row.country_id,
      name: row.name,
      population: row.population,
      isCapital: row.is_capital,
      latitude: row.latitude,
      longitude: row.longitude,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    });
  }
}

module.exports = CityPostgreSQLRepository;
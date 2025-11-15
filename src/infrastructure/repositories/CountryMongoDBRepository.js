/**
 * Repository para la entidad Country en MongoDB
 * 
 * Este repositorio implementa las mismas operaciones que CountryPostgreSQLRepository
 * pero usando MongoDB (base de datos NoSQL).
 */

const Country = require('../../domain/entities/Country');
const mongoConnection = require('../database/mongodb/connection');

class CountryMongoDBRepository {
  
  constructor() {
    this.collectionName = 'countries';
  }

  /**
   * Obtiene la colección de países
   * @private
   * @returns {Collection} Colección de MongoDB
   */
  _getCollection() {
    return mongoConnection.getCollection(this.collectionName);
  }

  /**
   * Crea un nuevo país en la base de datos
   * @param {Country} country - Entidad Country a guardar
   * @returns {Promise<Country>} País guardado
   */
  async create(country) {
    try {
      // Validamos que sea una instancia de Country
      if (!(country instanceof Country)) {
        throw new Error('El parámetro debe ser una instancia de Country');
      }

      await mongoConnection.connect();
      const collection = this._getCollection();

      // Verificamos que no exista un país con el mismo nombre
      const existing = await collection.findOne({ 
        name: { $regex: new RegExp(`^${country.name}$`, 'i') } 
      });

      if (existing) {
        throw new Error(`Ya existe un país con el nombre "${country.name}"`);
      }

      // Convertimos la entidad a objeto plano
      const countryData = country.toJSON();

      // Insertamos en MongoDB
      const result = await collection.insertOne(countryData);
      
      console.log(`✅ País "${country.name}" creado en MongoDB`);
      
      // MongoDB agrega automáticamente _id, lo añadimos al objeto
      countryData._id = result.insertedId;
      
      return this._mapToEntity(countryData);
      
    } catch (error) {
      console.error('❌ Error al crear país en MongoDB:', error.message);
      throw error;
    }
  }

  /**
   * Busca un país por su ID
   * @param {string} id - ID del país
   * @returns {Promise<Country|null>} País encontrado o null
   */
  async findById(id) {
    try {
      await mongoConnection.connect();
      const collection = this._getCollection();

      const result = await collection.findOne({ id: id });

      if (!result) {
        return null;
      }

      return this._mapToEntity(result);
      
    } catch (error) {
      console.error('❌ Error al buscar país por ID:', error.message);
      throw error;
    }
  }

  /**
   * Busca un país por su nombre
   * @param {string} name - Nombre del país
   * @returns {Promise<Country|null>} País encontrado o null
   */
  async findByName(name) {
    try {
      await mongoConnection.connect();
      const collection = this._getCollection();

      // Búsqueda case-insensitive usando regex
      const result = await collection.findOne({ 
        name: { $regex: new RegExp(`^${name}$`, 'i') } 
      });

      if (!result) {
        return null;
      }

      return this._mapToEntity(result);
      
    } catch (error) {
      console.error('❌ Error al buscar país por nombre:', error.message);
      throw error;
    }
  }

  /**
   * Obtiene todos los países
   * @param {Object} options - Opciones de paginación
   * @param {number} options.limit - Límite de resultados
   * @param {number} options.offset - Desplazamiento
   * @returns {Promise<Country[]>} Lista de países
   */
  async findAll(options = {}) {
    try {
      await mongoConnection.connect();
      const collection = this._getCollection();

      const limit = options.limit || 100;
      const skip = options.offset || 0;

      // MongoDB usa skip en lugar de offset
      const results = await collection
        .find({})
        .sort({ name: 1 }) // 1 = ascendente, -1 = descendente
        .skip(skip)
        .limit(limit)
        .toArray();

      return results.map(doc => this._mapToEntity(doc));
      
    } catch (error) {
      console.error('❌ Error al obtener todos los países:', error.message);
      throw error;
    }
  }

  /**
   * Busca países por continente
   * @param {string} continent - Nombre del continente
   * @returns {Promise<Country[]>} Lista de países del continente
   */
  async findByContinent(continent) {
    try {
      await mongoConnection.connect();
      const collection = this._getCollection();

      const results = await collection
        .find({ continent: continent })
        .sort({ name: 1 })
        .toArray();

      return results.map(doc => this._mapToEntity(doc));
      
    } catch (error) {
      console.error('❌ Error al buscar países por continente:', error.message);
      throw error;
    }
  }

  /**
   * Busca países con población mayor a un valor dado
   * @param {number} minPopulation - Población mínima
   * @returns {Promise<Country[]>} Lista de países
   */
  async findByMinPopulation(minPopulation) {
    try {
      await mongoConnection.connect();
      const collection = this._getCollection();

      // $gte = Greater Than or Equal (mayor o igual que)
      const results = await collection
        .find({ population: { $gte: minPopulation } })
        .sort({ population: -1 }) // Orden descendente
        .toArray();

      return results.map(doc => this._mapToEntity(doc));
      
    } catch (error) {
      console.error('❌ Error al buscar países por población:', error.message);
      throw error;
    }
  }

  /**
   * Busca países por idioma
   * @param {string} language - Idioma a buscar
   * @returns {Promise<Country[]>} Lista de países
   */
  async findByLanguage(language) {
    try {
      await mongoConnection.connect();
      const collection = this._getCollection();

      // Búsqueda case-insensitive
      const results = await collection
        .find({ 
          language: { $regex: new RegExp(language, 'i') } 
        })
        .sort({ name: 1 })
        .toArray();

      return results.map(doc => this._mapToEntity(doc));
      
    } catch (error) {
      console.error('❌ Error al buscar países por idioma:', error.message);
      throw error;
    }
  }

  /**
   * Busca países dentro de un rango de población
   * @param {number} min - Población mínima
   * @param {number} max - Población máxima
   * @returns {Promise<Country[]>} Lista de países
   */
  async findByPopulationRange(min, max) {
    try {
      await mongoConnection.connect();
      const collection = this._getCollection();

      const results = await collection
        .find({ 
          population: { 
            $gte: min,  // Greater Than or Equal
            $lte: max   // Less Than or Equal
          } 
        })
        .sort({ population: -1 })
        .toArray();

      return results.map(doc => this._mapToEntity(doc));
      
    } catch (error) {
      console.error('❌ Error al buscar países por rango de población:', error.message);
      throw error;
    }
  }

   /**
   * Actualiza un país existente
   * @param {string} id - ID del país a actualizar
   * @param {Object} data - Datos a actualizar
   * @returns {Promise<Country|null>} País actualizado o null si no existe
   */
  async update(id, data) {
    try {
      await mongoConnection.connect();
      const collection = this._getCollection();

      // Primero buscamos si existe el país
      const existingCountry = await this.findById(id);
      
      if (!existingCountry) {
        return null;
      }

      // Actualizamos la entidad con los nuevos datos
      existingCountry.update(data);

      // Preparamos los datos para actualizar
      const updateData = existingCountry.toJSON();
      delete updateData.id; // No actualizamos el ID
      delete updateData.createdAt; // No actualizamos la fecha de creación
      
      // Aseguramos que updatedAt sea la fecha actual
      updateData.updatedAt = new Date();

      // Actualizamos en MongoDB usando $set
      const result = await collection.updateOne(
        { id: id },
        { $set: updateData }
      );

      if (result.modifiedCount === 0) {
        console.log('⚠️ No se modificó ningún documento');
      } else {
        console.log(`✅ País "${existingCountry.name}" actualizado en MongoDB`);
      }

      // Retornamos el país actualizado
      return await this.findById(id);
      
    } catch (error) {
      console.error('❌ Error al actualizar país:', error.message);
      throw error;
    }
  }

  /**
   * Elimina un país por su ID
   * @param {string} id - ID del país a eliminar
   * @returns {Promise<boolean>} True si se eliminó, false si no existía
   */
  async delete(id) {
    try {
      await mongoConnection.connect();
      const collection = this._getCollection();

      const result = await collection.deleteOne({ id: id });

      if (result.deletedCount === 0) {
        return false;
      }

      console.log(`✅ País con ID "${id}" eliminado de MongoDB`);
      return true;
      
    } catch (error) {
      console.error('❌ Error al eliminar país:', error.message);
      throw error;
    }
  }

  /**
   * Cuenta el total de países en la base de datos
   * @returns {Promise<number>} Número total de países
   */
  async count() {
    try {
      await mongoConnection.connect();
      const collection = this._getCollection();

      return await collection.countDocuments();
      
    } catch (error) {
      console.error('❌ Error al contar países:', error.message);
      throw error;
    }
  }

  /**
   * Cuenta países por continente
   * @returns {Promise<Object>} Objeto con el conteo por continente
   */
  async countByContinent() {
    try {
      await mongoConnection.connect();
      const collection = this._getCollection();

      // Agregación en MongoDB (similar a GROUP BY en SQL)
      const results = await collection.aggregate([
        {
          $group: {
            _id: '$continent',
            count: { $sum: 1 },
            totalPopulation: { $sum: '$population' }
          }
        },
        {
          $sort: { count: -1 }
        }
      ]).toArray();

      // Convertir a un formato más legible
      const countByContinent = {};
      results.forEach(item => {
        countByContinent[item._id] = {
          count: item.count,
          totalPopulation: item.totalPopulation
        };
      });

      return countByContinent;
      
    } catch (error) {
      console.error('❌ Error al contar países por continente:', error.message);
      throw error;
    }
  }

  /**
   * Elimina todos los países (útil para testing)
   * @returns {Promise<number>} Número de países eliminados
   */
  async deleteAll() {
    try {
      await mongoConnection.connect();
      const collection = this._getCollection();

      const result = await collection.deleteMany({});

      console.log(`✅ ${result.deletedCount} países eliminados de MongoDB`);
      return result.deletedCount;
      
    } catch (error) {
      console.error('❌ Error al eliminar todos los países:', error.message);
      throw error;
    }
  }

  /**
   * Convierte un documento de MongoDB a una entidad Country
   * @private
   * @param {Object} doc - Documento de MongoDB
   * @returns {Country} Entidad Country
   */
  _mapToEntity(doc) {
    return new Country({
      id: doc.id,
      name: doc.name,
      continent: doc.continent,
      capital: doc.capital,
      population: doc.population,
      language: doc.language,
      flag: doc.flag,
      area: doc.area,
      currency: doc.currency,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt
    });
  }
}

module.exports = CountryMongoDBRepository;
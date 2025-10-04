import { Model, ModelStatic, WhereOptions, FindOptions, CreationAttributes } from 'sequelize';
import { Transaction } from 'sequelize';

export interface IBaseRepository<T extends Model> {
  create(data: CreationAttributes<T>, transaction?: Transaction): Promise<T>;
  findById(id: number, options?: FindOptions): Promise<T | null>;
  findAll(options?: FindOptions): Promise<T[]>;
  update(id: number, data: Partial<CreationAttributes<T>>, transaction?: Transaction): Promise<[number, T[]]>;
  delete(id: number, transaction?: Transaction): Promise<number>;
  findOne(where: WhereOptions, options?: FindOptions): Promise<T | null>;
  findAndCountAll(options?: FindOptions): Promise<{ count: number; rows: T[] }>;
}

export abstract class BaseRepository<T extends Model> implements IBaseRepository<T> {
  protected model: ModelStatic<T>;

  constructor(model: ModelStatic<T>) {
    this.model = model;
  }

  async create(data: CreationAttributes<T>, transaction?: Transaction): Promise<T> {
    try {
      return await this.model.create(data, { transaction });
    } catch (error) {
      throw new Error(`Error creating record: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async findById(id: number, options?: FindOptions): Promise<T | null> {
    try {
      return await this.model.findByPk(id, options);
    } catch (error) {
      throw new Error(`Error finding record by ID: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async findAll(options?: FindOptions): Promise<T[]> {
    try {
      return await this.model.findAll(options);
    } catch (error) {
      throw new Error(`Error finding all records: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async update(id: number, data: Partial<CreationAttributes<T>>, transaction?: Transaction): Promise<[number, T[]]> {
    try {
      return await this.model.update(data, {
        where: { id } as WhereOptions,
        returning: true,
        transaction,
      });
    } catch (error) {
      throw new Error(`Error updating record: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async delete(id: number, transaction?: Transaction): Promise<number> {
    try {
      return await this.model.destroy({
        where: { id } as WhereOptions,
        transaction,
      });
    } catch (error) {
      throw new Error(`Error deleting record: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async findOne(where: WhereOptions, options?: FindOptions): Promise<T | null> {
    try {
      return await this.model.findOne({ where, ...options });
    } catch (error) {
      throw new Error(`Error finding record: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async findAndCountAll(options?: FindOptions): Promise<{ count: number; rows: T[] }> {
    try {
      return await this.model.findAndCountAll(options);
    } catch (error) {
      throw new Error(`Error finding and counting records: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}
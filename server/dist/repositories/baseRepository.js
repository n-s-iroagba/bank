"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    constructor(model) {
        this.model = model;
    }
    create(data, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.create(data, { transaction });
            }
            catch (error) {
                throw new Error(`Error creating record: ${error instanceof Error ? error.message : String(error)}`);
            }
        });
    }
    findById(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.findByPk(id, options);
            }
            catch (error) {
                throw new Error(`Error finding record by ID: ${error instanceof Error ? error.message : String(error)}`);
            }
        });
    }
    findAll(options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.findAll(options);
            }
            catch (error) {
                throw new Error(`Error finding all records: ${error instanceof Error ? error.message : String(error)}`);
            }
        });
    }
    update(id, data, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.update(data, {
                    where: { id },
                    returning: true,
                    transaction,
                });
            }
            catch (error) {
                throw new Error(`Error updating record: ${error instanceof Error ? error.message : String(error)}`);
            }
        });
    }
    delete(id, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.destroy({
                    where: { id },
                    transaction,
                });
            }
            catch (error) {
                throw new Error(`Error deleting record: ${error instanceof Error ? error.message : String(error)}`);
            }
        });
    }
    findOne(where, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.findOne(Object.assign({ where }, options));
            }
            catch (error) {
                throw new Error(`Error finding record: ${error instanceof Error ? error.message : String(error)}`);
            }
        });
    }
    findAndCountAll(options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.findAndCountAll(options);
            }
            catch (error) {
                throw new Error(`Error finding and counting records: ${error instanceof Error ? error.message : String(error)}`);
            }
        });
    }
}
exports.BaseRepository = BaseRepository;

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
exports.deleteCategorie = void 0;
const { Category } = require('../../db');
function deleteCategorie(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name } = req.params;
            Category.destroy({
                where: { "name": name }
            });
            return res.status(200).send(`The category ${name} has been deleted`);
        }
        catch (err) {
            return res.status(404).send(err);
        }
    });
}
exports.deleteCategorie = deleteCategorie;

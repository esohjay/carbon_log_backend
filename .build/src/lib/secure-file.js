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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptToString = exports.encryptFile = void 0;
const crypto_1 = __importDefault(require("crypto"));
const promises_1 = __importDefault(require("fs/promises"));
// const fs = require("fs").promises;
const algorithm = "aes-256-gcm";
const SECRET_SALT = process.env.SECRET_SALT;
const SECRET_PASSPHRASE = process.env.SECRET_PASSPHRASE;
if (!SECRET_SALT || !SECRET_PASSPHRASE) {
    throw new Error("Both SECRET_SALT and SECRET_PASSPHRASE must be defined.");
}
const secretKey = crypto_1.default.scryptSync(SECRET_PASSPHRASE, SECRET_SALT, 32); // salt can be random, but in this case we are just using a string
function encryptFile(inputPath, key = secretKey) {
    return __awaiter(this, void 0, void 0, function* () {
        const iv = crypto_1.default.randomBytes(16);
        const cipher = crypto_1.default.createCipheriv(algorithm, key, iv);
        const input = yield promises_1.default.readFile(inputPath, "utf8");
        const encrypted = Buffer.concat([
            cipher.update(input, "utf8"),
            cipher.final(),
        ]);
        const authTag = cipher.getAuthTag();
        const result = {
            iv: iv.toString("hex"),
            auth_tag: authTag.toString("hex"),
            data: encrypted.toString("base64"),
        };
        yield promises_1.default.writeFile(`${inputPath}.secure`, JSON.stringify(result));
        console.log(`Encrypted file written to ${inputPath}.secure!`);
    });
}
exports.encryptFile = encryptFile;
function decryptToString(inputPath, key = secretKey) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Decrypting ${inputPath}...`);
        const encryptedData = JSON.parse(yield promises_1.default.readFile(inputPath, "utf8"));
        const decipher = crypto_1.default.createDecipheriv(algorithm, key, Buffer.from(encryptedData.iv, "hex"));
        decipher.setAuthTag(Buffer.from(encryptedData.auth_tag, "hex"));
        const decrypted = Buffer.concat([
            decipher.update(Buffer.from(encryptedData.data, "base64")),
            decipher.final(),
        ]);
        return decrypted.toString("utf8");
    });
}
exports.decryptToString = decryptToString;

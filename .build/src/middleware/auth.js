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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdmin = exports.verifyUser = void 0;
const firebase_1 = require("../lib/firebase");
class AuthMiddleware {
    verifyUser(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            if (!token) {
                return res
                    .status(401)
                    .send({ message: "Token error, please check token." });
            }
            try {
                const decodedToken = yield firebase_1.auth.verifyIdToken(token);
                req.user = decodedToken;
                // console.log("Decode token ############", decodedToken);
                // console.log("req ############", req.user);
                return next();
            }
            catch (err) {
                console.log(err);
                return res.status(401).send(err);
            }
        });
    }
    verifyAdmin(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            if (!token) {
                return res
                    .status(401)
                    .send({ message: "Token error, please check token." });
            }
            try {
                const decodedToken = yield firebase_1.auth.verifyIdToken(token);
                if (decodedToken.admin === true) {
                    req.user = decodedToken;
                    return next();
                }
                else {
                    return res.status(401).send({ message: "Admin access only." });
                }
            }
            catch (err) {
                return res.status(401).send(err);
            }
        });
    }
}
_a = new AuthMiddleware(), exports.verifyUser = _a.verifyUser, exports.verifyAdmin = _a.verifyAdmin;

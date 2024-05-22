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
exports.deleteCollection = void 0;
const firebase_1 = require("../lib/firebase");
const deleteCollection = (collectionPath, batchSize) => __awaiter(void 0, void 0, void 0, function* () {
    const collectionRef = firebase_1.db.collection(collectionPath);
    const query = collectionRef.orderBy("__name__").limit(batchSize);
    return new Promise((resolve, reject) => {
        deleteQueryBatch(query, resolve).catch(reject);
    });
});
exports.deleteCollection = deleteCollection;
function deleteQueryBatch(query, resolve) {
    return __awaiter(this, void 0, void 0, function* () {
        const snapshot = yield query.get();
        const batchSize = snapshot.size;
        if (batchSize === 0) {
            // When there are no documents left, we are done
            resolve();
            return;
        }
        // Delete documents in a batch
        const batch = firebase_1.db.batch();
        snapshot.docs.forEach((doc) => {
            batch.delete(doc.ref);
        });
        yield batch.commit();
        // Recurse on the next process tick, to avoid
        // exploding the stack.
        process.nextTick(() => {
            deleteQueryBatch(query, resolve);
        });
    });
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePoint = void 0;
const calculatePoint = (emission) => {
    if (emission <= 25) {
        return 5;
    }
    else if (emission > 25 && emission <= 50) {
        return 10;
    }
    else if (emission > 50 && emission <= 75) {
        return 15;
    }
    else if (emission > 75 && emission <= 100) {
        return 20;
    }
    else {
        return 25;
    }
};
exports.calculatePoint = calculatePoint;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onKeyUp = exports.onKeyDown = exports.key = void 0;
exports.key = {};
window.addEventListener('keydown', (e) => {
    exports.key[e.key] = true;
});
window.addEventListener('keyup', (e) => {
    exports.key[e.key] = false;
});
function onKeyDown(key, callback) {
    window.addEventListener('keydown', () => {
        callback();
    });
}
exports.onKeyDown = onKeyDown;
function onKeyUp(key, callback) {
    window.addEventListener('keyup', () => {
        callback();
    });
}
exports.onKeyUp = onKeyUp;
//# sourceMappingURL=input.js.map
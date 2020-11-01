"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const boosh3D_1 = require("./boosh3D");
const main_1 = require("./scenes/main");
const titlescreen_1 = require("./scenes/titlescreen");
const game = new boosh3D_1.default();
game.addScene('main', main_1.default);
game.addScene('titlescreen', titlescreen_1.default);
game.setScene('titlescreen');
const music = require("./audio/spook.mp3").default;
let playing = false;
document.addEventListener('click', () => {
    if (!playing) {
        playing = true;
        new Audio(music).play();
    }
});
const btn = document.querySelector('#play');
btn.addEventListener('click', () => {
    game.setScene('main');
});
//# sourceMappingURL=index.js.map
import Boosh3D from './boosh3D';
import main from './scenes/main';
import titlescreen from './scenes/titlescreen';

const game = new Boosh3D('#render');

game.addScene('main', main);
game.addScene('titlescreen', titlescreen);
game.setScene('main');

const music = require("./audio/spook.mp3").default;

let playing = false;    
document.addEventListener('click', () => {
    if(!playing) {
        playing = true;
        new Audio(music).play()
    }
})

const btn = document.querySelector('#play')
btn.addEventListener('click', () => {
    game.setScene('main');
})

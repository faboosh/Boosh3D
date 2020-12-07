import Boosh3D from './lib/boosh3D';
import main from './scenes/main';
import test from './scenes/test';

export default function() :Boosh3D {
    const game = new Boosh3D('#render');

    game.addScene('main', main);
    game.addScene('test', test);
    return game;
};

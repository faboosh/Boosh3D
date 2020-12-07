import Boosh3D from './lib/boosh3D';
import main from './scenes/main';
import test from './scenes/test';

export default function() :Boosh3D {
    const renderer = new Boosh3D('#render');

    renderer.addScene('main', main);
    renderer.addScene('test', test);
    return renderer;
};

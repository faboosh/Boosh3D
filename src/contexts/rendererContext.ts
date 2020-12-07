import React, { createContext } from 'react';
import Boosh3D, { Scene } from '../engine/lib/boosh3D';

export type RendererContextType = {
    renderer: Boosh3D | null;
    setRenderer: (Boosh3D: Boosh3D) => void;
}

export const rendererContext = createContext<RendererContextType>({ renderer: new Boosh3D(), setRenderer: theme => console.warn('no theme provider') });
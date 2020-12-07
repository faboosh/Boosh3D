import React, { useState } from 'react';
import init from '../../engine';
import { rendererContext } from '../rendererContext';

export default function RendererProvider({ children }) {
    const [renderer, setRenderer] = useState(null)
    return (
        <rendererContext.Provider value={{ renderer, setRenderer }}>
            {children}
        </rendererContext.Provider>
    )
}

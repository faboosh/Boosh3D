import React, { useContext, useState, useEffect } from 'react'
import { rendererContext } from '../contexts/rendererContext';
import styled from 'styled-components';

const FPSCounter = styled.div`
    position: fixed;
    top: 20px;
    right: 20px;
    text-align: right;
    font-family: sans-serif;
    color: white;
`

export default function DebugMenu() {
    const { renderer } = useContext(rendererContext);
    const [FPS, setFPS] = useState(60);
    let previousFrameNum = 0;

    const samplesPerSecond = 4;

    function computeFPS() {
        setInterval(() => {
            const fps = (renderer.currentScene.numFrames - previousFrameNum) * samplesPerSecond;
            if (fps > 0) {
                setFPS(fps);
                previousFrameNum = renderer.currentScene.numFrames;
            }

        }, 1000 / samplesPerSecond)
    }

    useEffect(() => {
        if (renderer) {
            computeFPS()
        }
    }, [renderer])

    return (
        <FPSCounter>
            {FPS} FPS
        </FPSCounter>
    )
}

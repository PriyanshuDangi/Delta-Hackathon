import React, { useState } from 'react';
import { Canvas } from 'react-three-fiber';

import Box from '../threeComponents/Box';

function Render() {
    const [position, usePosition] = useState([4, 4, 6]);

    const moveCamera = () => {

    }

    return (
        <Canvas
            camera={{
                position: position
            }}>
            <ambientLight/>
            <pointLight position={[1, 1, 1]}/>
            <Box position={[0, 0, 0]} />
        </Canvas>
    );
}

export default Render;

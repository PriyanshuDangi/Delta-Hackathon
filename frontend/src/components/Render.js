import React, {useState} from 'react';
import {Canvas} from 'react-three-fiber';

import Box from '../threeComponents/Box';
import Ground from '../threeComponents/Ground';
import Sky from '../threeComponents/Sky';

function Render() {
    const [position, usePosition] = useState([10, 5, 0]);
    const [boxes, useBoxes] = useState([]);

    return (
        <Canvas
            camera={{
                position: position,
            }}
            color={'black'}>
            <ambientLight />
            <pointLight position={[100, 100, 100]} />
            <Sky />
            <Ground />
            <Box position={[0, 0, 0]} />
            {
                boxes.map(box => (
                    <Box position={box} />
                ))
            }
            {/* <orbitControls args={[camera, domElement]} /> */}
        </Canvas>
    );
}

export default Render;

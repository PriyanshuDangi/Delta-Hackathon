import React, { useEffect, useState } from "react";
// import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';
import { Canvas, useThree } from "react-three-fiber";
import { useSelector, Provider } from "react-redux";

import FirstPersonControls from "../threeComponents/FirstPersonController";
import store from "../app/store";

import Box from '../threeComponents/Box';
import Ground from '../threeComponents/Ground';
import Sky from '../threeComponents/Sky';

function Render() {
    const position = useSelector((state) => state.position);

    const [boxes, useBoxes] = useState([[5, 0, 5]]);

    return (
        <Canvas
            camera={{
                position: position,
            }}>>
            <Provider store={store}>
                <ambientLight />
                <pointLight position={[100, 100, 100]} />
                <FirstPersonControls movementSpeed={2} />
                <Sky />
                <Ground />
                <Box position={[0, 0, 0]} />
                {
                boxes.map(box => (
                    <Box position={box} />
                ))
            }
                {/* <TrackballControls/> */}
                {/* <orbitControls args={[camera, domElement]} /> */}
            </Provider>
        </Canvas>
    );
}

export default Render;

import React, {useEffect, useState} from 'react';
// import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';
import {Canvas, useThree} from 'react-three-fiber';
import {useSelector, Provider, useDispatch} from 'react-redux';

import FirstPersonControls from '../threeComponents/FirstPersonController';
import store from '../app/store';

import Box from '../threeComponents/Box';
import Ground from '../threeComponents/Ground';
import Sky from '../threeComponents/Sky';
import io from 'socket.io-client';
import City from '../threeComponents/City';

let socket;
function Render(props) {
    const position = useSelector((state) => state.position);
    const boxes = useSelector((state) => state.boxes);
    const dispatch = useDispatch();

    useEffect(() => {
        socket = io();
        socket.emit('new-user', {
            name: 'priyanshu',
            position,
        });
        socket.on('update-players', (data) => {
            console.log(data);
            console.log(socket.id);
            dispatch({type: 'update-boxes-position', boxes: data});
            console.log(boxes);
        });
        return () => {
            socket.disconnect();
        };
    }, []);
    let boxElem = null;
    if (boxes && socket) {
        let boxArray = Object.keys(boxes).filter((key) => {
            return key !== socket.id;
        });
        boxElem = boxArray.map(function (val, index) {
            return <Box position={[60 - boxes[val].position[0], 12, 0]} />;
        });
        //   console.log(boxArray)
        // console.log(boxes)
    }
    const moveEmit = () => {
        socket.emit('move', {
            name: 'priyanshu',
            position,
        });
        // console.log(City);
    };
    useEffect(() => {
        console.log(boxes);
    }, [boxes]);
    // console.log(position)
    // camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 10000 );
				// camera.position.set( 1000, 50, 1500 );
    return (
        <Canvas
            camera={{
                position: position,
                fov: 60,
                // far: 100
                // position: [0, 0,-100]
            }}>
            <Provider store={store}>
                <ambientLight />
                <pointLight position={[100, 100, 100]} />
                <FirstPersonControls movementSpeed={0.2} moveEmit={moveEmit} />
                <Sky />
                {/* <Ground /> */}
                {/* <Box position={[0, 0, 0]} /> */}
                <City />
                {boxElem}
                <Box position={[-60, 11, 0]} />
                {/* {boxes.map((box) => (
                    <Box position={box} />
                ))} */}
                {/* <TrackballControls/> */}
                {/* <orbitControls args={[camera, domElement]} /> */}
            </Provider>
        </Canvas>
    );
}

export default Render;

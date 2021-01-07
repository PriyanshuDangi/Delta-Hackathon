import React, {useEffect, useState} from 'react';
// import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';
import {Canvas, useThree} from 'react-three-fiber';
import {useSelector, Provider, useDispatch} from 'react-redux';
import * as THREE from 'three';
import FirstPersonControls from '../threeComponents/FirstPersonController';
import store from '../app/store';

import Box from '../threeComponents/Box';
import Ground from '../threeComponents/Ground';
import Sky from '../threeComponents/Sky';
import io from 'socket.io-client';
import Tower from '../threeComponents/tower';

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
            return <Box position={boxes[val].position} />;
        });
        //   console.log(boxArray)
        // console.log(boxes)
    }
    const moveEmit = () => {
        socket.emit('move', {
            name: 'priyanshu',
            position,
        });
    };
    useEffect(() => {
        console.log(boxes);
    }, [boxes]);
    let camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.set(position[0], position[1], position[2]);
    return (
        <Canvas
            // camera={{
            //     // position: position,
            //     position: [0, 10, -10]
            // }}
            camera
            >
            <Provider store={store}>
                <ambientLight />
                <pointLight position={[100, 100, 100]} />
                <FirstPersonControls movementSpeed={2} moveEmit={moveEmit} />
                <Sky />
                <Ground />
                {/* <Box position={[0, 0, 0]} /> */}
                <Tower />
                {boxElem}
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

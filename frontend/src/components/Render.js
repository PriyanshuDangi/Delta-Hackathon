import React, {useEffect, useState, useRef} from 'react';
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

import peer from '../webrtc/webrtcInit';

function Render(props) {
    const position = useSelector((state) => state.position);
    const boxes = useSelector((state) => state.boxes);
    const dispatch = useDispatch();

    let socket = useRef();

    useEffect(() => {
        socket.current = io();
        peer.on('open', id => {
            console.log(id)
            socket.current.emit('new-user', {
                name: 'priyanshu',
                position,
                peerId:id
            });
        })

        socket.current.on('update-players', (data) => {
            console.log(data);
            console.log(socket.current.id);
            dispatch({type: 'update-boxes-position', boxes: data});
            console.log(boxes);
        });
        return () => {
            socket.current.disconnect();
        };
    }, [socket]);

    // useEffect(() => {
    //     if (boxes && socket.current) {
    //         let boxArray = Object.keys(boxes).filter((key) => {
    //             return key !== socket.current.id;
    //         });
    //         boxElem = boxArray.map(function (val, index) {
    //             // return <Box position={[60 - boxes[val].position[0], 12, 0]} />;
    //             return <Box position={val.position} />
    //         });
    //         //   console.log(boxArray)
    //         // console.log(boxes)
    //     }
    // })
    const moveEmit = () => {
        socket.current.emit('move', {
            name: 'priyanshu',
            position,
        });
        // console.log(City);
    };
    // useEffect(() => {
    //     console.log(boxes);
    // }, [boxes]);
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
                <FirstPersonControls movementSpeed={10} moveEmit={moveEmit} />
                <Sky />
                {/* <Ground /> */}
                {/* <Box position={[0, 0, 0]} /> */}
                {/* <City /> */}
                <Ground />
                {
                    Object.keys(boxes).map((key) => {
                        // return <Box position={[60 - boxes[val].position[0], 12, 0]} />;
                        // return <Box position={boxes[key].position} />;
                        if (key !== socket.current.id)
                            return <Box position={boxes[key].position} />;
                        else 
                            return null;
                    })
                }
                {/* <Box position={[258, 12, -126]} /> */}
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

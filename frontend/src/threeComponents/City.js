import * as THREE from 'three';
import {useRef, useState, useEffect} from 'react';
import {useFrame, extend, useThree} from 'react-three-fiber';
// import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import cityModel from "../assets/scene.gltf";
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

// extend({OrbitControls});

function City(props) {

    const [model, setModel] = useState();
    useEffect(() => {
        new GLTFLoader().load('models/scene.gltf', setModel);  
    }, [])
    // console.log(model);

    // return (model ? <primitive object={model.scene} /> : null);
    // This reference will give us direct access to the mesh
    const mesh = useRef();

    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);

    // // Rotate mesh every frame, this is outside of React without overhead
    // // useFrame(() => {
    // //     mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
    // // });
    // const {
    //     camera,
    //     gl: {domElement},
    // } = useThree();
    // const c = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 100 );
    // camera.position.set( 500, 200, 100 );

    const terrain = useRef();
    return (
        <mesh
            visible
            position={[0, 0, 0]}
            rotation={[0, Math.PI/4, 0]}
            ref={terrain}
            receiveShadow={true}
            scale={[0.01, 0.01, 0.01]}
            >
            {/* <boxBufferGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} /> */}
            {model ? <primitive object={model.scene} position={[1000, 1000, 100]} /> : null}
            {/* <orbitControls args={[camera, domElement]} /> */}
        </mesh>
    );
}

export default City;

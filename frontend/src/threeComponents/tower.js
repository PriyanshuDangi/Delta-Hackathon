import {useEffect, useRef, useState} from 'react';
import {useFrame, extend, useThree} from 'react-three-fiber';
// import {OrbitControls} from 'three';
// import {useGLTF} from "@react-three/drei"
// import * as THREE from 'three';
// import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const Tower = () => {
    const mesh = useRef();
    const [tower, setTower] = useState();
    // const p = useGLTF('/scene.gltf');
    // console.log(p);
    useEffect(() => {
        // var loader = new THREE.GLTFLoader();
        new GLTFLoader().load('/models/tower/scene.gltf', setTower);
    }, []);
    // console.log(tower);
    // const {
    //     camera,
    //     gl: {domElement},
    // } = useThree();
    return (
        <mesh
            ref={mesh}
            // scale={[0.6, 0.6, 0.6]}
            position={[0, -50, 0]}>
                {tower ? <primitive object={tower.scene}/> : null}
            {/* <orbitControls args={[camera, domElement]} /> */}
        </mesh>
        
    );
}

export default Tower;
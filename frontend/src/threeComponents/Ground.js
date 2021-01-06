import * as THREE from 'three';
import React, {useRef, useMemo} from 'react';
import {useFrame} from 'react-three-fiber';

import groundImg from '../assets/images/grasslight-big.jpg';

const GROUND_HEIGHT = -50; // A Constant to store the ground height of the game.

// A Ground plane that moves relative to the player. The player stays at 0,0
function Terrain() {
    const terrain = useRef();

    //   useFrame(() => {
    //     terrain.current.position.z += 0.4;
    //   });
    const loader = new THREE.TextureLoader();
    const texture = useMemo(() => {
        return loader.load(groundImg);
    }, []);
    useMemo(() => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(25, 25);
        texture.anisotropy = 16;
        texture.encoding = THREE.sRGBEncoding;
    }, [texture]);

    // const { scene } = useThree();
    // scene.background = new THREE.Color( 0xcce0ff );
    // scene.fog = new THREE.Fog( 0xcce0ff, 500, 10000 );
    return (
        <mesh
            visible
            position={[0, GROUND_HEIGHT, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            ref={terrain}
            receiveShadow={true}>
            <planeBufferGeometry attach="geometry" args={[5000, 5000, 128, 128]} />
            {/* <meshStandardMaterial
        attach="material"
        color="green"
        roughness={1}
        metalness={0}
        wireframe
      /> */}
            <meshLambertMaterial attach="material" transparent>
                <primitive attach="map" object={texture} />
            </meshLambertMaterial>
        </mesh>
    );
}

export default Terrain;

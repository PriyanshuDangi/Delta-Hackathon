import {useRef, useState} from 'react';
import {useFrame, extend, useThree} from 'react-three-fiber';
// import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
// extend({OrbitControls});

import {OrbitControls} from '@react-three/drei';
import { useSelector } from 'react-redux';

function Box(props) {
    // This reference will give us direct access to the mesh
    const mesh = useRef();
    const position = useSelector((state) => state.position);

    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);

    // Rotate mesh every frame, this is outside of React without overhead
    // useFrame(() => {
    //     // mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
    //
    // });

    return (
        <mesh
            {...props}
            // position={position}
            // position={[-60, 11, 0]}
            ref={mesh}
            rotation={[0, 0, 0]}
            // scale={active ? [15, 15, 15] : [1, 1, 1]}
            onClick={(event) => setActive(!active)}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}>
            <boxBufferGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    );
}

export default Box;

import * as THREE from 'three';
import {useThree} from 'react-three-fiber';

const Sky = () => {
    const {scene} = useThree();
    scene.background = new THREE.Color(0xcce0ff);
    scene.fog = new THREE.Fog(0xcce0ff, 10000, 10000);

    return null;
};

export default Sky;

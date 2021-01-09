import {useRef, useState, useEffect} from 'react';
import {useFrame, useThree, extend} from 'react-three-fiber';
import {PointerLockControls} from '@react-three/drei';
import {useSelector, useDispatch} from 'react-redux';
import {Vector3} from 'three';

// A Ground plane that moves relative to the player. The player stays at 0,0
function FirstPersonController({movementSpeed, moveEmit}) {
    const dispatch = useDispatch();
    const controls = useRef();

    const position = useSelector((state) => state.position);
    const [direction, setDirection] = useState({
        left: false,
        right: false,
        up: false,
        down: false,
    });

    useFrame(() => {
        const dP = [0, 0, 0];
        const nP = [0, 0, 0];

        const d = new Vector3(0, 0, 0);
        controls.current.getDirection(d);

        const norm = Math.sqrt(d.x * d.x + d.z * d.z); // TODO: Use fast inverse square root
        const nD = [d.z / norm, 0, d.x / norm];
        const pD = [-nD[2], 0, nD[0]];

        for (let i = 0; i < 3; i++) {
            dP[i] = nD[i] * (direction.right - direction.left) + pD[i] * (direction.up - direction.down);
        }

        const n2 = Math.sqrt(dP[0] * dP[0] + dP[2] * dP[2]);
        for (let i = 0; i < 3; i++) {
            nP[i] = position[i] + dP[i] * movementSpeed;
        }
        // moveEmit(nP);
        dispatch({type: 'update-user-position', position: nP});

        moveEmit();
    });

    const {camera} = useThree();

    useEffect(() => {
        camera.position.x = -position[0];
        camera.position.z = position[2];
    }, [camera.position, position]);

    const keyDownHandler = (event) => {
        switch (event.key) {
            case 'ArrowUp':
            case 'w':
                setDirection({...direction, up: true});
                break;

            case 'ArrowDown':
            case 's':
                setDirection({...direction, down: true});
                break;

            case 'ArrowLeft':
            case 'a':
                setDirection({...direction, left: true});
                break;

            case 'ArrowRight':
            case 'd':
                setDirection({...direction, right: true});
                break;

            default:
                break;
        }
    };

    const keyUpHandler = (event) => {
        switch (event.key) {
            case 'ArrowUp':
            case 'w':
                setDirection({...direction, up: false});
                break;

            case 'ArrowDown':
            case 's':
                setDirection({...direction, down: false});
                break;

            case 'ArrowLeft':
            case 'a':
                setDirection({...direction, left: false});
                break;

            case 'ArrowRight':
            case 'd':
                setDirection({...direction, right: false});
                break;

            default:
                break;
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', keyDownHandler);
        document.addEventListener('keyup', keyUpHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
            document.removeEventListener('keyup', keyUpHandler);
        };
    });

    return <PointerLockControls ref={controls} />;
}

export default FirstPersonController;

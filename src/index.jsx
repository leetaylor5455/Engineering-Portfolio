import './style.css'
import ReactDOM from 'react-dom/client'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <Canvas
        shadows
        gl={ {
            antialias: true,
            toneMapping: THREE.CineonToneMapping,
            outputEncoding: THREE.sRGBEncoding
        } }
        camera={ {
            fov: 45,
            // position: { x: -2.0212413772157123, y: 2.764006126474612, z: 2.148791288982886},
            position: [-2.158023081202718, 2.8524733354388236, 2.0351712363311014],
            rotation: [-0.06938540148745342, -0.30965731870267377, -0.021174802563965082 ],
            // rotation:{
            //     "isEuler": true,
            //     "x": -0.13701194676054515,
            //     "y": -0.3057239960234838,
            //     "z": -0.041474561000159095,
            //     "_order": "XYZ"
            // }
        } }
    >
        <Experience />
    </Canvas>
)
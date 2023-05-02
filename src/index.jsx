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
            toneMapping: THREE.ACESFilmicToneMapping,
            outputEncoding: THREE.sRGBEncoding
        } }
        camera={ {
            fov: 45,
            // position: [0, 0, 0]
        } }
    >
        <Experience />
    </Canvas>
)
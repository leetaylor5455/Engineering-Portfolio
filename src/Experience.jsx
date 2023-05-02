import { useRef, useEffect } from 'react'
import { Environment, OrbitControls, useHelper, useGLTF, softShadows } from '@react-three/drei'
import * as THREE from 'three'

// (Animated) Model imports
import PrinterXAxis from './ModelComponents/PrinterXAxis'
import PrinterNozzle from './ModelComponents/PrinterNozzle'
import PrinterBed from './ModelComponents/PrinterBed'
import Ball from './ModelComponents/Ball'
import HeroText from './ModelComponents/HeroText'

// softShadows()

export default function Experience() {

    const directionalLight = useRef()
    useHelper(directionalLight, THREE.DirectionalLightHelper, 1)

    const setupShadows = (nodes) => {
        const obj2arr = Object.entries(nodes)
        for (let i = 0; i < obj2arr.length; i++) {
            let name = obj2arr[i][0]
            nodes[name].receiveShadow = true
            nodes[name].castShadow = true
        }
    }

    const room = useGLTF('./models/room.glb')
    const printerStaticParts = useGLTF('./models/printerstaticparts.glb')
    const bench = useGLTF('./models/bench.glb')
    const drawingAndParts = useGLTF('./models/drawingandparts.glb')

    useEffect(() => {
        setupShadows(room.nodes)
        setupShadows(bench.nodes)
        setupShadows(printerStaticParts.nodes)
        setupShadows(drawingAndParts.nodes)
    }, [])

    return <>
        <Environment
            // background
            files='./hdris/studio_small_09_4k.hdr'
        />
        <OrbitControls/>

        <directionalLight
            ref={ directionalLight } 
            position={ [ 4, 10, 5 ] } 
            shadow-normalBias={ 0.05 }
            shadow-mapSize={ [ 1024*6, 1024*6 ]}
            shadow-camera-far={ 50 }
            shadow-camera-top={ 20 } 
            shadow-camera-bottom={ -20 } 
            shadow-camera-right={ 10 }
            castShadow
        />
        {/* <ambientLight intensity={ 0.2 }/> */}
        <PrinterXAxis />
        <PrinterNozzle />
        <PrinterBed />
        <Ball />
        <HeroText />
        <primitive object={room.scene} />
        <primitive object={printerStaticParts.scene} />
        <primitive object={bench.scene} />
        <primitive object={drawingAndParts.scene} />
    </>
}

// useGLTF.preload('./models/workshop.glb')
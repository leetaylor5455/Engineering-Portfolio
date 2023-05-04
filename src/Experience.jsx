import { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Environment, OrbitControls, useHelper, useGLTF, softShadows, FirstPersonControls, PointerLockControls } from '@react-three/drei'
import * as THREE from 'three'

// (Animated) Model imports
import PrinterXAxis from './ModelComponents/PrinterXAxis'
import PrinterNozzle from './ModelComponents/PrinterNozzle'
import PrinterBed from './ModelComponents/PrinterBed'
import Ball from './ModelComponents/Ball'
import CutBall from './ModelComponents/CutBall'
import HeroText from './ModelComponents/HeroText'

// softShadows()

export default function Experience() {

    // Refs
    const directionalLightRef = useRef()

    // Helpers
    // useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1)

    const setupShadows = (nodes) => {
        const obj2arr = Object.entries(nodes)
        for (let i = 0; i < obj2arr.length; i++) {
            let name = obj2arr[i][0]
            nodes[name].receiveShadow = true
            nodes[name].castShadow = true
        }
    }

    // Load in static models
    const room = useGLTF('./models/room.glb')
    const printerStaticParts = useGLTF('./models/printerstaticparts.glb')
    const bench = useGLTF('./models/bench.glb')
    const drawingAndParts = useGLTF('./models/drawingandparts.glb')
    // const heroText = useGLTF('./models/herotext.glb')


    // Shadows
    useEffect(() => {
        setupShadows(room.nodes)
        setupShadows(bench.nodes)
        setupShadows(printerStaticParts.nodes)
        setupShadows(drawingAndParts.nodes)
        // setupShadows(heroText.nodes)
    }, [])

    // Animation
    const [bedPosition, setBedPosition] = useState(0)

    useFrame((state) => {
        setBedPosition(-0.059*Math.cos(state.clock.getElapsedTime()))
    })


    return <>
        <Environment
            // background
            files='./hdris/studio_small_09_4k.hdr'
        />
        {/* <OrbitControls/> */}
        {/* <PointerLockControls /> */}

        <directionalLight
            intensity={0.8}
            ref={ directionalLightRef } 
            position={ [ 4, 10, 2 ] } 
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

        <group position={ [0, 0, bedPosition]}>
            <PrinterBed />
            <CutBall />
        </group>
        <HeroText />
        {/* <primitive object={heroText.scene} /> */}
        <primitive object={room.scene} />
        <primitive object={printerStaticParts.scene} />
        <primitive object={bench.scene} />
        <primitive object={drawingAndParts.scene} />
    </>
}
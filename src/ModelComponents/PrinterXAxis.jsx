/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import PrinterNozzle from "./PrinterNozzle";

export default function PrinterXAxis(props) {

  const [YPosition, setYPosition] = useState()

  const { nodes, materials } = useGLTF("./models/printerxaxis.glb");
  return (
    <group position={ [0, -0.0965, 0] } dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.XAxisEnds.geometry}
        material={materials.Caps}
        position={[-0.8826, 2.6287, -0.2553]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.XAxisRods.geometry}
        material={materials["Stainless.001"]}
        position={[-0.8826, 2.6287, -0.2553]}
        scale={[0.0511, 0.0641, 0.0511]}
      />
      <PrinterNozzle animate/>
    </group>
  );
}

useGLTF.preload("./models/printerxaxis.glb");

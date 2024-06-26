import React, { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";
import * as PIXI3D from "pixi3d";

function initCube(scale, position, rotation, color) {
  let cube = PIXI3D.Mesh3D.createCube();
  cube.position.set(...position); // Set the position (x, y, z)
  cube.scale.set(...scale); // Set the scale (width, height, depth)
  const material = new PIXI3D.StandardMaterial();
  material.baseColor = new PIXI3D.Color(...(color ?? [0.85, 0.81, 0.73])); // RGB values between 0 and 1
  material.metallic = 0.2;
  material.roughness = 0.7;
  cube.material = material;
  console.log(cube.materials);
  cube.rotationQuaternion.setEulerAngles(...(rotation ?? [0, 0, 0]));

  return cube;
}

function initPolygon() {
  const geometry = Object.assign(new PIXI3D.MeshGeometry3D(), {
    positions: {
      buffer: new Float32Array([
        0, -2, 0,
        2, 0, 0,
        0, 2, 0,
      ]),
    },
  });

  // 메쉬 생성 및 재질 설정
  const material = new PIXI3D.StandardMaterial();
  material.baseColor = new PIXI3D.Color(1, 0, 0); // 빨간색
  const mesh = new PIXI3D.Mesh3D(geometry, material);
  return mesh;
}

const App = () => {
  const pixiContainer = useRef(null);
  useEffect(() => {
    if (pixiContainer.current.childNodes.length > 0) return;

    let app = new PIXI.Application({
      backgroundColor: 0xeceeef,
      resizeTo: window,
      antialias: true,
      resolution: window.devicePixelRatio || 1, // 해상도
      autoDensity: true, // 해상도 조정 자동화
      powerPreference: "high-performance", // 성능 우선 설정
    });
    pixiContainer.current.appendChild(app.view);
    // app.stage.addChild(initCube([50, 50, 0.01], [0, -5, 0], [-90, 0, 0], [0.3,0.3,0.3]));
    // app.stage.addChild(initCube([2, 2, 0.05], [0, -3, 2], [0, 0, 0]));
    // app.stage.addChild(initCube([2, 2, 0.05], [0, -3, -2], [0, 0, 0]));
    // app.stage.addChild(initCube([2, 2, 0.05], [0, -3, 0], [-90, 0, 0]));
    // app.stage.addChild(initCube([2, 2, 0.05], [0, -1, 0], [-90, 0, 0]));
    // app.stage.addChild(initCube([2, 2, 0.05], [0, -5, 0], [-90, 0, 0]));
    // app.stage.addChild(initCube([2, 2, 0.05], [0, 1, -2], [0, 0, 0]));
    // app.stage.addChild(initCube([2, 2, 0.05], [0, 1, 0], [0, 0, 0]));
    // app.stage.addChild(initCube([2, 1, 0.05], [0, 1, -1], [-90, 0, 0]));
    // app.stage.addChild(initCube([2, 1, 0.05], [0, 3, -1], [-90, 0, 0]));

    // 삼각형 지오메트리 생성
    app.stage.addChild(initPolygon());

    let dirLight = new PIXI3D.Light();
    dirLight.type = PIXI3D.LightType.directional;
    dirLight.intensity = 8;
    dirLight.color = new PIXI3D.Color(0.5, 0.5, 0.5);
    dirLight.rotationQuaternion.setEulerAngles(45, -40, 0);
    PIXI3D.LightingEnvironment.main.lights.push(dirLight);

    let dirLight2 = new PIXI3D.Light();
    dirLight2.type = PIXI3D.LightType.directional;
    dirLight2.intensity = 4;
    dirLight2.color = new PIXI3D.Color(0.5, 0.5, 0.5);
    dirLight2.rotationQuaternion.setEulerAngles(0, 140, 0);
    PIXI3D.LightingEnvironment.main.lights.push(dirLight2);

    new PIXI3D.CameraOrbitControl(app.view);
  }, []);

  return <div ref={pixiContainer} />;
};

export default App;

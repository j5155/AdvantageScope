// Copyright (c) 2021-2025 Littleton Robotics
// http://github.com/Mechanical-Advantage
//
// Use of this source code is governed by a BSD
// license that can be found in the LICENSE file
// at the root directory of this project.

import * as THREE from "three";
import { Line2 } from "three/examples/jsm/lines/Line2.js";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import { Field3dRendererCommand_TrajectoryObj } from "../../Field3dRenderer";
import ObjectManager from "../ObjectManager";

export default class TrajectoryManager extends ObjectManager<Field3dRendererCommand_TrajectoryObj> {
  private line: Line2;
  private length = 0;

  constructor(
    root: THREE.Object3D,
    materialSpecular: THREE.Color,
    materialShininess: number,
    mode: "low-power" | "standard" | "cinematic",
    isXR: boolean,
    requestRender: () => void
  ) {
    super(root, materialSpecular, materialShininess, mode, isXR, requestRender);

    this.line = new Line2(
      new LineGeometry(),
      new LineMaterial({ color: 0xff8c00, linewidth: 2, resolution: this.resolution })
    );
    this.root.add(this.line);
  }

  dispose(): void {
    this.root.remove(this.line);
    this.line.geometry.dispose();
    this.line.material.dispose();
  }

  setResolution(resolution: THREE.Vector2) {
    super.setResolution(resolution);
    this.line.material.resolution = resolution;
  }

  setObjectData(object: Field3dRendererCommand_TrajectoryObj): void {
    if (object.poses.length <= 1) {
      this.line.visible = false;
    } else {
      this.line.visible = true;
      this.line.material.color = new THREE.Color(object.color);
      this.line.material.linewidth = object.size === "bold" ? 6 : 2;
      if (object.poses.length !== this.length) {
        this.line.geometry.dispose();
        this.line.geometry = new LineGeometry();
        this.length = object.poses.length;
      }
      let positionData: number[] = [];
      object.poses.forEach((annotatedPose) => {
        let translation = annotatedPose.pose.translation;
        if (annotatedPose.annotation.is2DSource) {
          // 2D trajectories should be moved just above the carpet for cleaner rendering
          translation[2] = 0.02;
        }
        positionData = positionData.concat(translation);
      });
      this.line.geometry.setPositions(positionData);
      this.line.geometry.attributes.position.needsUpdate = true;
    }
  }
}

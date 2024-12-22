import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';

@Injectable({
  providedIn: 'root'
})
export class ModelTransformerService {
  centerModel(model: THREE.Object3D): void {
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.position.sub(center);
    model.updateMatrixWorld(true);
  }

  scaleModel(model: THREE.Object3D, scale: number = 1): void {
    model.scale.set(scale, scale, scale);
  }

  setupModel(gltf: GLTF): THREE.Object3D {
    const model = gltf.scene;
    this.centerModel(model);
    this.scaleModel(model);
    return model;
  }
}
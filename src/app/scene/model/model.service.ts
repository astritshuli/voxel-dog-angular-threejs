import { inject, Injectable } from '@angular/core';
import * as THREE from 'three';
import { ModelLoaderService } from './model-loader.service';
import { ModelTransformerService } from './model-transformer.service';

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  private modelLoader = inject(ModelLoaderService);
  private modelTransformer = inject(ModelTransformerService);

  loadModel(scene: THREE.Scene): void {
    this.modelLoader.loadGLTF('/assets/voxel_dog.glb').subscribe({
      next: (gltf) => {
        const model = this.modelTransformer.setupModel(gltf);
        scene.add(model);
      },
      error: (error) => {
        console.error('Error loading model:', error);
      }
    });
  }
}
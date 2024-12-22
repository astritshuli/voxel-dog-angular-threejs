import { Injectable, ElementRef, inject } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createScene, createCamera, createRenderer } from './scene/config/scene.config';
import { LightingService } from './scene/lighting/lighting.service';
import { ModelService } from './scene/model/model.service';
import { ControlsService } from './scene/controls/controls.service';

@Injectable({
  providedIn: 'root'
})

export class SceneService {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;
  private lightingService =  inject(LightingService);
  private modelService = inject(ModelService);
  private controlsService = inject(ControlsService);

  initialize(canvas: ElementRef<HTMLCanvasElement>): void {
    this.scene = createScene();
    this.camera = createCamera();
    this.renderer = createRenderer(canvas.nativeElement);
    this.controls = this.controlsService.setupControls(this.camera, this.renderer.domElement);
    
    this.lightingService.setupLighting(this.scene);
    this.modelService.loadModel(this.scene);

    this.animate();
  }

  private animate(): void {
    requestAnimationFrame(() => this.animate());
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  onResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
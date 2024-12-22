import { Injectable } from '@angular/core';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Observable, from } from 'rxjs';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';

@Injectable({
  providedIn: 'root'
})
export class ModelLoaderService {
  private loader = new GLTFLoader();

  loadGLTF(path: string): Observable<GLTF> {
    return from(
      new Promise<GLTF>((resolve, reject) => {
        this.loader.load(
          path,
          (gltf) => resolve(gltf),
          (progress) => {
            console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
          },
          (error) => reject(error)
        );
      })
    );
  }
}
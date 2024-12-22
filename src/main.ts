import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { SceneComponent } from './app/scene/scene.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SceneComponent],
  template: `
    <app-scene></app-scene>
  `
})
export class App {
}

bootstrapApplication(App);
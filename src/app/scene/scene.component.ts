import { Component, ElementRef, ViewChild, AfterViewInit, HostListener, inject } from '@angular/core';
import { SceneService } from '../scene.service';

@Component({
  selector: 'app-scene',
  standalone: true,
  template: `
    <canvas #canvas></canvas>
    <div class="instructions">Drag to rotate • Scroll to zoom</div>
  `,
  styleUrls: ['./scene.component.css']
})
export class SceneComponent implements AfterViewInit {
  @ViewChild('canvas') private canvasRef!: ElementRef<HTMLCanvasElement>;
  private sceneService=  inject(SceneService);


  ngAfterViewInit(): void {
    this.sceneService.initialize(this.canvasRef);
  }

  @HostListener('window:resize')
  onResize(): void {
    this.sceneService.onResize();
  }
}
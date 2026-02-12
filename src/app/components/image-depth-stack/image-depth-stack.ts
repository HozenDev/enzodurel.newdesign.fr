import { Component, input, signal } from '@angular/core';
import { ProjectImage } from '../../core/models/project.model';

interface ImageVM {
    data: ProjectImage;
    transform: string;
    isFreePositioned: boolean;
}

@Component({
    selector: 'app-image-depth-stack',
    imports: [],
    templateUrl: './image-depth-stack.html',
    styleUrl: './image-depth-stack.scss',
})
export class ImageDepthStack {
    images = input.required<ProjectImage[]>();
    protected imageVMs = signal<ImageVM[]>([]);

    ngOnInit() {
	this.initializeVMs();
    }

    private initializeVMs() {
	const vms = this.images().map(img => ({
	    data: img,
	    transform: this.buildBaseTransform(img),
	    isFreePositioned: !!img.position
	}));

	this.imageVMs.set(vms);
    }

    onMouseMove(event: MouseEvent) {
	const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();

	const x = (event.clientX - rect.left) / rect.width - 0.5;
	const y = (event.clientY - rect.top) / rect.height - 0.5;

	this.imageVMs.update(vms =>
	    vms.map(vm => ({
		...vm,
		transform: `
          ${this.buildBaseTransform(vm.data)}
          translateX(${x * vm.data.depth}px)
          translateY(${y * vm.data.depth}px)
      rotateX(${y * 0.2 * vm.data.depth}deg)
      rotateY(${x * 0.4 * vm.data.depth}deg)
        `
	    }))
	);
    }

    reset() {
	this.imageVMs.update(vms =>
	    vms.map(vm => ({
		...vm,
		transform: this.buildBaseTransform(vm.data)
	    }))
	);
    }

    private buildBaseTransform(img: ProjectImage): string {
	return `
      translate(${img.position?.x ?? 0}px, ${img.position?.y ?? 0}px)
      scale(${img.position?.scale ?? 1})
      rotate(${img.position?.rotation ?? 0}deg)
    `;
    }
}

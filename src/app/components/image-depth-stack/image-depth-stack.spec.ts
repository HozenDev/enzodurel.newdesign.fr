import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageDepthStack } from './image-depth-stack';

describe('ImageDepthStack', () => {
  let component: ImageDepthStack;
  let fixture: ComponentFixture<ImageDepthStack>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageDepthStack]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageDepthStack);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostarComponent } from './postar.component';

describe('PostarComponent', () => {
  let component: PostarComponent;
  let fixture: ComponentFixture<PostarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

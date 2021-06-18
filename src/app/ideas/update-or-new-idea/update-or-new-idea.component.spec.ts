import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOrNewIdeaComponent } from './update-or-new-idea.component';

describe('UpdateOrNewIdeaComponent', () => {
  let component: UpdateOrNewIdeaComponent;
  let fixture: ComponentFixture<UpdateOrNewIdeaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateOrNewIdeaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateOrNewIdeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

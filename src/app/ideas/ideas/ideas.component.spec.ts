import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { MockComponent } from 'ng-mocks';
import { BehaviorSubject } from 'rxjs';
import { IdeasService } from 'src/app/services/ideas.service';
import { Idea } from './../../services/ideas.service';
import { SvgIconComponent } from './../../svg-icon/svg-icon/svg-icon.component';
import { TagComponent } from './../../tag/tag/tag.component';
import { TitleComponent } from './../../title/title/title.component';
import { SortModalComponent } from './../sort-modal/sort-modal.component';
import { UpdateOrNewIdeaComponent } from './../update-or-new-idea/update-or-new-idea.component';
import { IdeasComponent } from './ideas.component';

enum Target {
  NEW_IDEA_BUTTON = '.new-idea',
  IDEA_CARD_BUTTON = '.idea',
  SORT_BUTTON = '.sort-button',
}

enum Method {
  TOGGLE_IDEA_MODAL = 'toggleNewIdeaModal',
  TOGGLE_SORT_MODAL = 'toggleSortModal',
}

const MOCK_DATA = [
  {
    title: 'Idea one',
    description: 'lorem ipsum',
    tags: [
      { label: 'Awesome', value: true },
      { label: 'In Progress', value: false },
      { label: 'Approved', value: false },
    ],
    date: new Date(2020, 1, 1),
  },
];

const MOCK_IDEA_SERVICE = {
  store$: new BehaviorSubject(MOCK_DATA),
};

fdescribe('IdeasComponent', () => {
  let component: IdeasComponent;
  let fixture: ComponentFixture<IdeasComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        IdeasComponent,
        MockComponent(SvgIconComponent),
        MockComponent(TitleComponent),
        MockComponent(TagComponent),
        MockComponent(UpdateOrNewIdeaComponent),
        MockComponent(SortModalComponent),
      ],
      providers: [
        {
          provide: IdeasService,
          useValue: MOCK_IDEA_SERVICE,
        },
      ],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeasComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  describe('toggleNewIdeaModal should', () => {
    it(
      'open the newIdea modal when clicked',
      waitForAsync(() => {
        fixture.whenStable().then(() => {
          spyOn(component, Method.TOGGLE_IDEA_MODAL).and.callThrough();
          const newIdeaButton = debugElement.query(
            By.css(Target.NEW_IDEA_BUTTON)
          );
          newIdeaButton.nativeElement.click();
          expect(component.toggleNewIdeaModal).toHaveBeenCalledTimes(1);
          expect(component.toggleNewIdeaModal).toHaveBeenCalledWith();
          expect(component.toggleNewIdeaModal_).toBeTruthy();
        });
      })
    );

    it(
      'open the newIdea with an idea model modal when clicked via the app-card button',
      waitForAsync(() => {
        fixture.whenStable().then(() => {
          spyOn(component, Method.TOGGLE_IDEA_MODAL).and.callThrough();
          const newIdeaButton = debugElement.query(
            By.css(Target.IDEA_CARD_BUTTON)
          );
          newIdeaButton.nativeElement.click();
          expect(component.toggleNewIdeaModal).toHaveBeenCalledTimes(1);
          expect(component.activeIdea).toEqual(MOCK_DATA[0]);
          expect(component.activeIndex).toBe(0);
          expect(component.toggleNewIdeaModal_).toBeTruthy();
        });
      })
    );

    it(
      'open the newIdea with an idea model modal when clicked via the app-card button and then reset when clicked again',
      waitForAsync(() => {
        fixture.whenStable().then(() => {
          spyOn(component, Method.TOGGLE_IDEA_MODAL).and.callThrough();
          const newIdeaButton = debugElement.query(
            By.css(Target.IDEA_CARD_BUTTON)
          );
          newIdeaButton.nativeElement.click();
          newIdeaButton.nativeElement.click();
          expect(component.activeIdea).toEqual({} as Idea);
          expect(component.activeIndex).toBe(-1);
        });
      })
    );
  });

  describe('toggleSortModal should', () => {
    it(
      'toggle the sortModal boolean',
      waitForAsync(() => {
        fixture.whenStable().then(() => {
          spyOn(component, Method.TOGGLE_SORT_MODAL).and.callThrough();
          const sortModalButton = debugElement.query(
            By.css(Target.SORT_BUTTON)
          );
          sortModalButton.nativeElement.click();
          expect(component.toggleSortModal).toHaveBeenCalledTimes(1);
        });
      })
    );
  });
});

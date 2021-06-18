import { TestBed } from '@angular/core/testing';
import { IdeaKey } from 'src/app/services/ideas.service';
import { IdeasService } from './ideas.service';

fdescribe('IdeasService', () => {
  let service: IdeasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdeasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('sortBy should', () => {
    it('sort the data structure by date', () => {
      service.sortBy(IdeaKey.DATE);
      const expectedDate = new Date(2021, 1, 1);
      service.store$.subscribe((data) => {
        expect(data[0].date).toEqual(expectedDate);
      });
    });
    it('sort the data structure by title and set the first item to be Idea four', () => {
      service.sortBy(IdeaKey.TITLE);
      const expectedTitle = 'idea four';
      service.store$.subscribe((data) => {
        expect(data[0].title.toLowerCase()).toBe(expectedTitle.toLowerCase());
      });
    });
    it('sort the data structure by title and set the first item to be Idea two', () => {
      service.sortBy(IdeaKey.TITLE);
      service.sortBy(IdeaKey.TITLE);
      const expectedTitle = 'idea two';
      service.store$.subscribe((data) => {
        expect(data[0].title.toLowerCase()).toBe(expectedTitle.toLowerCase());
      });
    });
  });

  describe('filterData should', () => {
    it('filter the data agaisnt the searchValue provided', () => {
      service.filterData('Idea one');
      service.store$.subscribe((data) => {
        expect(data.length).toBe(1);
      });
    });
    it('return the full list after a searchValue has been cleared', () => {
      service.filterData('Idea one');
      service.filterData('');
      service.store$.subscribe((data) => {
        expect(data.length).toBe(4);
      });
    });
  });

  describe('updateEntry should', () => {
    it('update the relevant index with the new value', () => {
      const updatedIdea = {
        title: 'New Title',
        description: 'new description',
        date: new Date(),
        tags: [],
      };
      service.updateEntry(2, updatedIdea);
      service.store$.subscribe((data) => {
        expect(data[2]).toEqual(updatedIdea);
      });
    });
  });

  describe('addNewEntry should', () => {
    it('add a new idea entry to the store', () => {
      const newIdea = {
        title: 'New Title',
        description: 'new entry',
        date: new Date(),
        tags: [],
      };
      service.addNewEntry(newIdea);
      service.store$.subscribe((data) => {
        expect(data[4]).toEqual(newIdea);
      });
    });
  });

  describe('removeIdea should', () => {
    it('remove the relevant entry based on the index', () => {
      service.removeIdea(2);
      service.store$.subscribe((data) => {
        expect(data.length).toBe(3);
      });
    });
  });
});

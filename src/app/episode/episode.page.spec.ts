import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EpisodePage } from './episode.page';

describe('EpisodePage', () => {
  let component: EpisodePage;
  let fixture: ComponentFixture<EpisodePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EpisodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

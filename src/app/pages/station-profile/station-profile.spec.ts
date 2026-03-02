import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationProfile } from './station-profile';

describe('StationProfile', () => {
  let component: StationProfile;
  let fixture: ComponentFixture<StationProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StationProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StationProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

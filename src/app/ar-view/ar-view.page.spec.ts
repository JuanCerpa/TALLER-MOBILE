import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArViewPage } from './ar-view.page';

describe('ArViewPage', () => {
  let component: ArViewPage;
  let fixture: ComponentFixture<ArViewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ArViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

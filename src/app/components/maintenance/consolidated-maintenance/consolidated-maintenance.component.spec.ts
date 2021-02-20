import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidatedMaintenanceComponent } from './consolidated-maintenance.component';

describe('ConsolidatedMaintenanceComponent', () => {
  let component: ConsolidatedMaintenanceComponent;
  let fixture: ComponentFixture<ConsolidatedMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsolidatedMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsolidatedMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

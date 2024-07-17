import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataMasterUserComponent } from './data-master-user.component';

describe('DataMasterUserComponent', () => {
  let component: DataMasterUserComponent;
  let fixture: ComponentFixture<DataMasterUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataMasterUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataMasterUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

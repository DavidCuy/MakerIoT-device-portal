import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigbarComponent } from './configbar.component';

describe('ConfigbarComponent', () => {
  let component: ConfigbarComponent;
  let fixture: ComponentFixture<ConfigbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

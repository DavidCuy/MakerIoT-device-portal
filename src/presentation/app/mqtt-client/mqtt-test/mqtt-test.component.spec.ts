import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MqttTestComponent } from './mqtt-test.component';

describe('MqttTestComponent', () => {
  let component: MqttTestComponent;
  let fixture: ComponentFixture<MqttTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MqttTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MqttTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

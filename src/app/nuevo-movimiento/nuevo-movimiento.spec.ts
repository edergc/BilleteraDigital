import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoMovimientoComponent } from './nuevo-movimiento';

describe('NuevoMovimientoComponent', () => {
  let component: NuevoMovimientoComponent;
  let fixture: ComponentFixture<NuevoMovimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevoMovimientoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NuevoMovimientoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Opt } from './opt';

describe('Opt', () => {
  let component: Opt;
  let fixture: ComponentFixture<Opt>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Opt]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Opt);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

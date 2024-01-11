import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterSelectorsComponent } from './footer-selectors.component';

describe('FooterSelectorsComponent', () => {
  let component: FooterSelectorsComponent;
  let fixture: ComponentFixture<FooterSelectorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterSelectorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FooterSelectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ElementRef, Injectable } from '@angular/core';
import { ZipCodeDirective } from './zip-code.directive';
import { TestBed } from '@angular/core/testing';

@Injectable()
export class MockElementRef {
  nativeElement: {} | undefined
}

describe('ZipCodeDirective', () => {
  let directive: ZipCodeDirective;
  let element: MockElementRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: ElementRef, useValue: new MockElementRef() }]
    });
    element = TestBed.inject(ElementRef);
    directive = new ZipCodeDirective(element);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});

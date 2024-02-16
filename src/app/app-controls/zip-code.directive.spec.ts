import { Component, DebugElement, ElementRef, Injectable } from '@angular/core';
import { ZipCodeDirective } from './zip-code.directive';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Injectable()
export class MockElementRef {
  nativeElement: {} | undefined
}
@Component({
  selector: 'app-test',
  template: '<input type="text" appZipCode />'
})
class TestComponent { }

describe('ZipCodeDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let directive: ZipCodeDirective;
  let directiveElm: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        ZipCodeDirective
      ],
      imports: [],
      providers: [
        { provide: ZipCodeDirective },
        { provide: ElementRef, useValue: new MockElementRef() }
      ]
    });
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    directiveElm = fixture.debugElement.query(By.directive(ZipCodeDirective));
    directive = TestBed.inject(ZipCodeDirective);
    fixture.detectChanges();
  });

  describe('on initialization', () => {
    it('should create an instance', () => {
      expect(directive).toBeTruthy();
    });
  });

  describe('onKeyDown', () => {
    const validKeys = ['-', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
      'Backspace', 'Tab', 'Enter', 'Escape', 'Delete', 'Home', 'End', 'ArrowLeft', 'ArrowRight'];
    const allLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
      'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const validCtrlKeys = ['a', 'c', 'v', 'x'];
    const invalidCtrlKeys = allLetters.filter(x => validCtrlKeys.indexOf(x) === -1);

    const parameters: Array<{ value: string, expected: boolean, ctrlKey?: boolean, shift?: boolean }> = [];
    validKeys.forEach(value => parameters.push({ value, expected: false }));
    validCtrlKeys.forEach(value => parameters.push({ value, ctrlKey: true, expected: false }));
    allLetters.forEach(value => parameters.push({ value, expected: true }));
    allLetters.forEach(value => parameters.push({ value, shift: true, expected: true }));
    invalidCtrlKeys.forEach(value => parameters.push({ value, ctrlKey: true, expected: true }));

    parameters.forEach(parameter => {
      const value = `${parameter.ctrlKey ? 'ctrl-' : ''}${parameter.shift ? 'shift-' : ''}${parameter.value}`;
      const expected = parameter.expected ? 'should' : 'should not';

      it(`when key is "${value}" ${expected} call preventDefault()`, () => {
        const mockEvent = {
          key: parameter.value,
          ctrlKey: parameter.ctrlKey,
          shift: parameter.shift,
          preventDefault() { }
        } as unknown as KeyboardEvent;

        mockEvent.preventDefault()

        const spy = spyOn(mockEvent, 'preventDefault');
        directive.onKeyDown(mockEvent);
        if (parameter.expected) {
          expect(spy).toHaveBeenCalled();
        } else {
          expect(spy).not.toHaveBeenCalled();
        }
      });
    });
  });

  describe('blockPaste', () => {
    let pasteValue: string;
    let event: KeyboardEvent;

    describe('when value is invalid', () => {
      beforeEach(() => {
        pasteValue = 'abcde-1234';
        directiveElm.nativeElement.value = pasteValue;
        const eventInit: KeyboardEventInit = {
          key: 'v',
          ctrlKey: true
        };
        event = new KeyboardEvent('paste', eventInit);
      });

      it('should call preventDefault', fakeAsync(() => {
        spyOn(event, 'preventDefault').and.stub();
        directiveElm.triggerEventHandler('paste', event);

        tick(500);
        fixture.whenStable().then(() => {
          expect(event.preventDefault).toHaveBeenCalled();
        });
      }));

      it('should set input value to empty string', fakeAsync(() => {
        spyOn(event, 'preventDefault').and.stub();
        directiveElm.triggerEventHandler('paste', event);

        tick(500);
        fixture.whenStable().then(() => {
          expect(
            directiveElm.nativeElement.value).toBe('');
        });
      }));
    });

    describe('when value is valid', () => {
      beforeEach(() => {
        pasteValue = '12345-1234';
        directiveElm.nativeElement.value = pasteValue;
        const eventInit: KeyboardEventInit = {
          key: 'v',
          ctrlKey: true
        };
        event = new KeyboardEvent('paste', eventInit);
      });

      it('should not call preventDefault', fakeAsync(() => {
        spyOn(event, 'preventDefault').and.stub();
        directiveElm.triggerEventHandler('paste', event);

        tick(500);
        fixture.whenStable().then(() => {
          expect(event.preventDefault).not.toHaveBeenCalled();
        });
      }));

      it('should not change input value', fakeAsync(() => {
        spyOn(event, 'preventDefault').and.stub();
        directiveElm.triggerEventHandler('paste', event);

        tick(500);
        fixture.whenStable().then(() => {
          expect(
            directiveElm.nativeElement.value).toBe(pasteValue);
        });
      }));
    });
  });
});

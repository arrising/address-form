import { PhoneNumberPipe } from './phone-number.pipe';

describe('PhoneNumberPipe', () => {
  let pipe: PhoneNumberPipe;
  beforeEach(() => {
    pipe = new PhoneNumberPipe();
  });
  
  describe('on initialization', () => {
    it('should create an instance', () => {
      expect(pipe).toBeTruthy();
    });
  });

  describe('transform', () => {
    const parameters = [
      {
        description: 'undefined',
        result: 'undefined',
        value: undefined
      },
      {
        description: 'empty string',
        result: 'empty string',
        value: ''
      },
      {
        description: 'an incomplete phone number',
        result: 'original value',
        value: '55555',
        expected: '55555'
      },
      {
        value: '5555555555',
        expected: '(555)555-5555'
      },
      {
        value: '15555555555',
        expected: '(555)555-5555'
      },
      {
        value: '+5555555555',
        expected: '(555)555-5555'
      },
      {
        value: '+15555555555',
        expected: '(555)555-5555'
      }
    ];

    parameters.forEach(parameter => {
      const expected = parameter.expected ? parameter.expected : parameter.value;
      const description = parameter.description ? parameter.description : `"${parameter.value}"`;
      const result = parameter.result ? parameter.result : `"${expected}"`;

      it(`when value is ${description} should return ${result}`, () => {
        expect(pipe.transform(parameter.value)).toBe(expected);
      });
    });
  });
});

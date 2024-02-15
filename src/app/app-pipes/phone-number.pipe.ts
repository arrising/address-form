import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {

  transform(rawNum: string): string | undefined {
    if (!rawNum || rawNum.length < 10) {
      return rawNum;
    }

    if (!rawNum.startsWith('+1')) {
      if (rawNum.startsWith('1')) {
        rawNum = "+" + rawNum;
      } else if (rawNum.startsWith('+')) {
        rawNum = "+1" + rawNum.slice(1);
      } else {
        rawNum = "+1" + rawNum;
      }
    }

    const areaCodeStr = rawNum.slice(2, 5);
    const midSectionStr = rawNum.slice(5, 8);
    const lastSectionStr = rawNum.slice(8);

    return `(${areaCodeStr})${midSectionStr}-${lastSectionStr}`;
  }
}

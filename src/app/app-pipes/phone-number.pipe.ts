import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {

  transform(value: string | undefined): string | undefined {
    if (!value || value.length < 10) {
      return value;
    }

    if (!value.startsWith('+1')) {
      if (value.startsWith('1')) {
        value = "+" + value;
      } else if (value.startsWith('+')) {
        value = "+1" + value.slice(1);
      } else {
        value = "+1" + value;
      }
    }

    const areaCodeStr = value.slice(2, 5);
    const midSectionStr = value.slice(5, 8);
    const lastSectionStr = value.slice(8);

    return `(${areaCodeStr})${midSectionStr}-${lastSectionStr}`;
  }
}

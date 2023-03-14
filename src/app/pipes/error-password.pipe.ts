import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'errorPassword',
})
export class ErrorPasswordPipe implements PipeTransform {
  transform(
    value:
      | {
          hasMinimumChars: boolean;
          hasNumber: boolean;
          hasSpecialChar: boolean;
          hasCapitalChar: boolean;
          hasSmallChar: boolean;
        }
      | undefined
  ): string | null {
    if (value) {
      const { hasMinimumChars, hasNumber, hasSpecialChar, hasCapitalChar, hasSmallChar } = value;
      const errorMessages = [
        !hasMinimumChars && 'Minimum of 8 characters',
        !hasNumber && 'Must contain at least 1 number character',
        !hasSpecialChar && 'Must contain at least 1 special character: "!@#$%^*()"',
        !hasCapitalChar && 'Must contain at least 1 capital character',
        !hasSmallChar && 'Must contain at least 1 small character',
      ].filter(Boolean) as string[];
      return errorMessages[0];
    }
    return null;
  }
}

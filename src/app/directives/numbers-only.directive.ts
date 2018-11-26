import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({ selector: '[NumbersOnly]' })
export class NumbersOnlyDirective {

  @Input() allowDecimals = true;
  @Input() allowSign = false;
  @Input() decimalSeparator = '.';

  previousValue = '';

  // --------------------------------------
  //  Regular expressions
  integerUnsigned = '^[0-9]*$';
  integerSigned = '^-?[0-9]+$';
  decimalUnsigned = '^[0-9]+(.[0-9]{8})?$';
  decimalSigned = '^-?[0-9]+(.[0-9]+)?$';

  constructor(private hostElement: ElementRef) { }

  @HostListener('change', ['$event']) onChange(e) {
    this.validateValue(this.hostElement.nativeElement.value);
  }

  @HostListener('paste', ['$event']) onPaste(e) {
      // get and validate data from clipboard
      const value = e.clipboardData.getData('text/plain');
      this.validateValue(value);
      e.preventDefault();
  }

  @HostListener('keydown', ['$event']) onKeyDown(e: KeyboardEvent) {

    const cursorPosition: number = e.target['selectionStart'];
    const originalValue: string = e.target['value'];
    const key: string = this.getName(e);
    const controlOrCommand = (e.ctrlKey === true || e.metaKey === true);
    const signExists = originalValue.includes('-');
    const separatorExists = originalValue.includes(this.decimalSeparator);

    // allowed keys apart from numeric characters
    const allowedKeys = [
        'Backspace', 'ArrowLeft', 'ArrowRight', 'Escape', 'Tab'
    ];

    if (separatorExists) {
        const decimalIndex = originalValue.indexOf('.');
        if (decimalIndex > -1) {
            const decimals = originalValue.substring(decimalIndex, originalValue.length + 1);
            console.log('Key Pressed: ' + key);
            // console.log('Does key exist in allowedkeys: ' + allowedKeys.indexOf(key) !== -1);
            if (decimals.length > 8 && !(allowedKeys.indexOf(key) !== -1)) {
                e.preventDefault();
            }
        }
    }

    // when decimals are allowed, add
    // decimal separator to allowed codes when
    // its position is not close to the the sign (-. and .-)
    const separatorIsCloseToSign = (signExists && cursorPosition <= 1);
    if (this.allowDecimals && !separatorIsCloseToSign && !separatorExists) {

        if (this.decimalSeparator === '.') {
            allowedKeys.push('.');
        } else {
            allowedKeys.push(',');
        }
    }

    // when minus sign is allowed, add its
    // key to allowed key only when the
    // cursor is in the first position, and
    // first character is different from
    // decimal separator
    const firstCharacterIsSeparator = (originalValue.charAt(0) !== this.decimalSeparator);
    if (this.allowSign && !signExists &&
        firstCharacterIsSeparator && cursorPosition === 0) {

        allowedKeys.push('-');
    }

    // allow some non-numeric characters
    if (allowedKeys.indexOf(key) !== -1 ||
        // Allow: Ctrl+A and Command+A
        (key === 'a' && controlOrCommand) ||
        // Allow: Ctrl+C and Command+C
        (key === 'c' && controlOrCommand) ||
        // Allow: Ctrl+V and Command+V
        (key === 'v' && controlOrCommand) ||
        // Allow: Ctrl+X and Command+X
        (key === 'x' && controlOrCommand)) {
        // let it happen, don't do anything
        return;
    }

    // save value before keydown event
    this.previousValue = originalValue;

    // allow number characters only
    const isNumber = (new RegExp(this.integerUnsigned)).test(key);
    if (isNumber) {
        return;
    } else {
        e.preventDefault();
    }
}

  validateValue(value: string): void {

    // choose the appropiate regular expression
    let regex: string;
    // tslint:disable-next-line:curly
    if (!this.allowDecimals && !this.allowSign) regex = this.integerUnsigned;
     // tslint:disable-next-line:curly
    if (!this.allowDecimals && this.allowSign) regex = this.integerSigned;
    // tslint:disable-next-line:curly
    if (this.allowDecimals && !this.allowSign) regex = this.decimalUnsigned;
    // tslint:disable-next-line:curly
    if (this.allowDecimals &&  this.allowSign) regex = this.decimalSigned;

    // when a numbers begins with a decimal separator,
    // fix it adding a zero in the beginning
    const firstCharacter = value.charAt(0);
    if (firstCharacter === this.decimalSeparator) {
        value = 0 + value;
    }
    // If there is no decimal, or the decimal is less than 8 digits, toFixed
    if (value.length > 0 && value.split(this.decimalSeparator).length < 2
        || value.split(this.decimalSeparator)[1].length < 8 ) {
        const val = Number(value);
        value = val.toFixed(8).toString();
    }

    // test number with regular expression, when
    // number is invalid, replace it with a zero
    const valid: boolean = (new RegExp(regex)).test(value);
    // console.log(`Value updated to: ${this.hostElement.nativeElement['value']}`);
    this.hostElement.nativeElement['value'] = valid ? value : 0;
  }

  getName(e): string {
    if (e.key) {
      return e.key;
    } else {
      // for old browsers
      if (e.keyCode && String.fromCharCode) {
        switch (e.keyCode) {
            case   8: return 'Backspace';
            case   9: return 'Tab';
            case  27: return 'Escape';
            case  37: return 'ArrowLeft';
            case  39: return 'ArrowRight';
            case 188: return ',';
            case 190: return '.';
            case 109: return '-'; // minus in numbpad
            case 173: return '-'; // minus in alphabet keyboard in firefox
            case 189: return '-'; // minus in alphabet keyboard in chrome
            default: return String.fromCharCode(e.keyCode);
        }
      }
    }
  }
}

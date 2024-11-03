import * as Yup from "yup";

function luhnValidation(cardNumber: string | undefined) {
  if (cardNumber) {
    const sanitized = cardNumber.replace(/\s+/g, "");

    let oddSum = 0;
    let evenSum = 0;

    for (let i = 0; i < sanitized.length; i++) {
      const digit = parseInt(sanitized[i], 10);

      let double;
      let doubleNum;

      if (i % 2 === 0) {
        double = digit * 2;
        const twoDigit = String(double).split("").map(Number);

        if (twoDigit.length > 1) {
          doubleNum = twoDigit.reduce((i, digit) => i + digit, 0);
          oddSum += doubleNum;
        } else {
          const int = Number(twoDigit);
          oddSum += int;
        }
      }

      if (i % 2 !== 0) {
        evenSum += digit;
      }
    }

    const result = evenSum + oddSum;

    return result % 10 === 0;
  }
}

Yup.addMethod(Yup.string, "luhn", function (errorMessage) {
  return this.test("luhn", errorMessage, function (value) {
    const { path, createError } = this;
    return (
      luhnValidation(value || "") ||
      createError({ path, message: errorMessage })
    );
  });
});

declare module "yup" {
  interface StringSchema {
    luhn(errorMessage: string): this;
  }
}

export const numberForText = (number) => {
    const stringNumber = number.toString();
    const reg10 = /^\d.\d1$/g;
    if(number === 1 || stringNumber.match(reg10) ) return 'товар';
    if(number > 1 && number < 5) return 'товара';
    if(number >= 5 || number === 0) return 'товаров';
    return "хер"
}
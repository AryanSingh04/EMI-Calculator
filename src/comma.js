
function addCommas(number) {
    // Convert number to string
    let numStr = number.toString();

    // Split the number into integer and decimal parts
    let parts = numStr.split('.');
    let integerPart = parts[0];
    let decimalPart = parts.length > 1 ? '.' + parts[1] : '';

    // Add commas to the integer part
    let formattedInteger = '';
    for (let i = integerPart.length - 1, j = 0; i >= 0; i--, j++) {
        formattedInteger = integerPart[i] + formattedInteger;
        // Add a comma after every third digit, but not if it's the first digit or if it's the last digit and it's followed by a decimal part
        if ((j + 1) % 3 === 0 && i !== 0 && !(i === 1 && decimalPart !== '')) {
            formattedInteger = ',' + formattedInteger;
        }
    }

    // Concatenate the integer and decimal parts
    return formattedInteger + decimalPart;
}
export default addCommas;
let negatives = [];
const max_number = 1000;

function findAndReplace(str) {
    return str.replace(/(\r\n|\n|\r|[;,*]|[^0-9])/gm, ",");
}

function splitString(str, separator) {
    return str.split(separator);
}

function sumNumbers(stringNumbers) {
    const array = splitString(stringNumbers, ",");
    let sum = 0;
    if (array.length > 0) {
        for (let i = 0; i < array.length; i++) {
            // Numbers bigger than 1000 should be ignored
            if (parseInt(array[i]) <= max_number)
                sum = sum + parseInt(array[i]);
        }
    }

    return sum;
}

function add(numbers) {
    // For an empty string it will return 0
    if (numbers.length === 0) return 0;

    let numbersString = findAndReplace(numbers);
    let array = splitString(numbersString, ",");

    if (array.some(x => x < 0)) {
        for (let i = 0; i < array.length; i++) {
            if (parseInt(array[i]) < 0) negatives.push(parseInt(array[i]));
        }
        throw new Error("negatives not allowed: " + JSON.stringify(negatives));
    }

    return sumNumbers(numbersString);
}

module.exports = add;

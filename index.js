const singleMap = new Map();
singleMap.set(1, 'one');
singleMap.set(2, 'two');
singleMap.set(3, 'three');
singleMap.set(4, 'four');
singleMap.set(5, 'five');
singleMap.set(6, 'six');
singleMap.set(7, 'seven');
singleMap.set(8, 'eight');
singleMap.set(9, 'nine');

const multiMap = new Map();
multiMap.set(1, 'ten');
multiMap.set(2, 'twenty');
multiMap.set(3, 'thirty');
multiMap.set(4, 'fourty');
multiMap.set(5, 'fifty');
multiMap.set(6, 'sixty');
multiMap.set(7, 'seventy');
multiMap.set(8, 'eighty');
multiMap.set(9, 'ninety');

const voc = new Map();
voc.set(1, 'hundread');
voc.set(2, 'thousand');
voc.set(3, 'million');
voc.set(4, 'billion');

const getResult = (number) => {
    let result = '';
    const num = parseFloat(number);
    const numToString = num.toLocaleString('en-US');
    const fullNumSplit = numToString.split('.');
    const categoryString = Array.from(fullNumSplit[0].split(','));

    for (const [i, v] of categoryString.entries()) {
        if (v[0] === '0') {
            v = Array.from(v).shift().join('');
        }
        result += `${getStringNumber(v)} ${(i + 1) === categoryString.length ? '' : voc.get((i-categoryString.length)*-1)} `;
    }

    result += fullNumSplit[1] ? `and ${getStringNumber(fullNumSplit[1])} cents` : '';

    return result;
}

function getStringNumber(v) {

    // check for zero
    switch (v.length) {
        case 1:
            return singleMap.get(parseInt(v));
        case 2:
            return multiMap.get(parseInt(v[0])) + ' ' + singleMap.get(parseInt(v[1]));
        case 3:
            return singleMap.get(parseInt(v[0])) + ' ' + voc.get(1) + ' ' + multiMap.get(parseInt(v[1])) + ' ' + singleMap.get(parseInt(v[2]));
    }

    return '';

}

document.forms.form.onsubmit = () => {
    const result = getResult(document.forms.form.num.value);
    document.getElementById('result').innerText = result;
    return false;
}
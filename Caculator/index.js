let resultDisplay = document.getElementById('result');
let btns = document.getElementsByClassName('btn');
let matchString = '';

for (let btn of btns) {
    btn.onclick = () => {
        switch (btn.innerText) {
            case '=':
                resultDisplay.innerText = eval(matchString);
                matchString = eval(matchString);
                break;
            case 'AC':
                matchString = '0';
                resultDisplay.innerText = '0';
                break;
            default:
                matchString += btn.innerText;
                resultDisplay.innerText = matchString;
        }
    };
}

// CALCULATOR 

const calcInput = document.querySelector('#calc-input')
const calcPattern = '[0-9+--*/%]'

calcInput.addEventListener("keypress", function(e){
    if(!e.key.match(calcPattern)){
        e.preventDefault()
    } 
    if(e.key == 'Enter'){
        calcInput.value = eval(calcInput.value)
    }
})

function calculatorButtons(i){
    switch(i){
        case 'del':
            calcInput.value = calcInput.value.slice(0, -1);
            break
        case 'c':
            calcInput.value = ""
            break
        case 'result':
            calcInput.value = eval(calcInput.value)
            break
        default: 
            calcInput.value += i;
            break
    }
}



// CROSS MULTIPLICATION

const crossMultiResult = document.querySelector('#cross-multi-result ')
var crossMultiA = 0, crossMultiB = 0, crossMultiC = 0

function crossMultiplication(i, val){
    switch(i){
        case 'a':
            crossMultiA = Number(val)
            break
        case 'b':
            crossMultiB = Number(val)
            break
        case 'c':
            crossMultiC = Number(val)
            break
    }

    if(crossMultiA > 0 && crossMultiB > 0 && crossMultiC > 0){
        crossMultiResult.innerHTML = (crossMultiB * crossMultiC / crossMultiA)
    } else {
        crossMultiResult.innerHTML = 'X'
    }
}



// TRANSLATOR

const translatorInputFrom = document.querySelector('#translator-input-from')
const translatorInputTo = document.querySelector('#translator-input-to')

const selectLangFrom = document.querySelector('#translator-select-lang-from')
const selectLangTo = document.querySelector('#translator-select-lang-to')

function translator(i){
    let textFrom = translatorInputFrom.value
    let textTo = translatorInputTo.value

    let langFrom = selectLangFrom.value
    let langTo = selectLangTo.value

    if(i == 1){
        // API: https://mymemory.translated.net/doc/spec.php
        fetch(`https://api.mymemory.translated.net/get?q=${textFrom}&langpair=${langFrom}|${langTo}`).then(res => res.json()).then(data => {
            translatorInputTo.value = data.responseData.translatedText
        })
    } else {
        translatorInputFrom.value = textTo
        translatorInputTo.value = textFrom

        selectLangFrom.value = langTo
        selectLangTo.value = langFrom
    }
}



// TIME

const clockPointH = document.querySelector('#clock-pointer-h');
const clockPointM = document.querySelector('#clock-pointer-m');
const clockPointS = document.querySelector('#clock-pointer-s');

const fullDateHours = document.querySelector('#full-date-hours');
const fullDateMonth = document.querySelector('#full-date-month');
const fullDateDate = document.querySelector('#full-date-date');

setInterval(updateTime, 1000);

function updateTime(){
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    fullDateHours.innerHTML = now.toLocaleTimeString();

    if(hours > 12){
        hours -= 12;
    };

    clockPointH.style.transform = `translateX(-50%) rotate(${((180*hours/6)+(15*minutes/30))}deg)`;
    clockPointM.style.transform = `translateX(-50%) rotate(${(180*minutes/30)}deg)`;
    clockPointS.style.transform = `translateX(-50%) rotate(${(180*seconds/30)}deg)`;

    let weekArray = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    let monthsArray = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    fullDateMonth.innerHTML = `${weekArray[now.getDay()]}, ${now.getDate()} de ${monthsArray[now.getMonth()]}`;
    fullDateDate.innerHTML = now.toLocaleDateString();
};



// SEARCH 

const searchInput = document.querySelector('#search-input');
const searchSites = document.querySelectorAll('#search-sites a');
const searchPreLinks = []

for (let i = 0; i < searchSites.length; i++){
    searchPreLinks.push(searchSites[i].href)
}

searchInput.addEventListener('change', ()=>{
    searchUpdateLinks(searchInput.value);
})

function searchUpdateLinks(pesquisa){
    console.log(searchSites)
    for (let i = 0; i < searchSites.length; i++){
        searchSites[i].href = searchPreLinks[i] + pesquisa; 
    }
}


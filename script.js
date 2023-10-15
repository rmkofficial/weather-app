const wrapper = document.querySelector('.wrapper');
inputPart = document.querySelector('.input-part');
infoTxt = inputPart.querySelector('.info-txt');
inputField = inputPart.querySelector('input');

inputField.addEventListener('keyup', (e) => {
    if (e.key == 'Enter' && inputField.value != '') {
        requestApi(inputField.value);
    }
});

function requestApi(city) {
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=14b596db390b68c40e74dbbb55bb25d0`;
    fetch(api).then(response => console.log(response.json()))
}



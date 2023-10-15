const wrapper = document.querySelector('.wrapper');
inputPart = document.querySelector('.input-part');
infoTxt = inputPart.querySelector('.info-txt');
inputField = inputPart.querySelector('input');
locationBtn = inputPart.querySelector('button');

inputField.addEventListener('keyup', (e) => {
    if (e.key == 'Enter' && inputField.value != '') {
        requestApi(inputField.value);
    }
});

locationBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        alert('Your browser not support geolocation api');
    }
});

function onSuccess(position) {
    const { latitude, longitude } = position.coords;
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=14b596db390b68c40e74dbbb55bb25d0`;
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
    alert(`Your location: ${latitude} ${longitude}`);
}

function onError(error) {
    infoTxt.innerHTML = error.message;
    infoTxt.classList.add('error');
}

function requestApi(city) {
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=14b596db390b68c40e74dbbb55bb25d0`;
    infoTxt.innerHTML = 'Getting weather details...';
    infoTxt.classList.add('pending');
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}

function weatherDetails(info) {
    if (info.cod === '404') {
        
        infoTxt.classList.replace('pending', 'error');
        infoTxt.innerHTML = `${inputField.value} isn't a valid city name`;
    }
}



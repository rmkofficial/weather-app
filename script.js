const wrapper = document.querySelector('.wrapper');
inputPart = document.querySelector('.input-part');
infoTxt = inputPart.querySelector('.info-txt');
inputField = inputPart.querySelector('input');
locationBtn = inputPart.querySelector('button');
weatherIcon = wrapper.querySelector('.weather-part img');
headerBtn = document.querySelector('header');

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
    } else {
        const city = info.name;
        const country = info.sys.country;
        const { description, id } = info.weather[0];
        const { feels_like, humidity, temp } = info.main;

        if (id == 800) {
            weatherIcon.src = './icons/clear.svg';
        } else if (id => 200 && id <= 232) {
            weatherIcon.src = './icons/storm.svg';
        } else if (id >= 600 && id <= 622) {
            weatherIcon.src = './icons/snow.svg';
        } else if (id >= 701 && id <= 781) {
            weatherIcon.src = './icons/haze.svg';
        } else if (id >= 801 && id <= 804) {
            weatherIcon.src = './icons/cloud.svg';
        } else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
            weatherIcon.src = './icons/rain.svg';
        }


        wrapper.querySelector('.temp .numb').innerText = Math.floor(temp - 273);
        wrapper.querySelector('.weather').innerText = description;
        wrapper.querySelector('.location span').innerText = `${city}, ${country}`;
        wrapper.querySelector('.temp .numb-2').innerText = Math.floor(feels_like - 273);
        wrapper.querySelector('.humidity span').innerText = `${humidity}%`;


        infoTxt.classList.remove('pending', 'error');
        wrapper.classList.add('active');
        headerBtn.style.cursor = 'pointer';
        inputField.value = '';
    }
}

headerBtn.addEventListener('click', () => {
    wrapper.classList.remove('active');
});



'use strict';

$(document).ready(function () {
	$('#body').show();
	$('#msg').hide();
});

$(document).ready(function () {
	$('.five-days-block').hide();
	$('.not-found').css('display', 'none');
	$('.day2').hide();
	$('.day3').hide();
	$('.day4').hide();
	$('.day5').hide();
});


$('.nav1').click(function () {
	$('.today-block').show();
	$('.five-days-block').hide();
	$('.not-found').css('display', 'none');
	$('.nav1').addClass('active-nav');
	$('.nav2').removeClass('active-nav');
});

$('.nav2').click(function () {
	$('.today-block').hide();
	$('.five-days-block').show();
	$('.not-found').css('display', 'none');
	$('.nav2').addClass('active-nav');
	$('.nav1').removeClass('active-nav');
});

$('.wd1').click(function () {
	$('.day1').addClass('active-w');
	$('.day2').removeClass('active-w');
	$('.day3').removeClass('active-w');
	$('.day4').removeClass('active-w');
	$('.day5').removeClass('active-w');
	$('.wd1').addClass('active-wb');
	$('.wd2').removeClass('active-wb');
	$('.wd3').removeClass('active-wb');
	$('.wd4').removeClass('active-wb');
	$('.wd5').removeClass('active-wb');
});

$('.wd2').click(function () {
	$('.day2').addClass('active-w');
	$('.day1').removeClass('active-w');
	$('.day3').removeClass('active-w');
	$('.day4').removeClass('active-w');
	$('.day5').removeClass('active-w');
	$('.wd2').addClass('active-wb');
	$('.wd1').removeClass('active-wb');
	$('.wd3').removeClass('active-wb');
	$('.wd4').removeClass('active-wb');
	$('.wd5').removeClass('active-wb');
});

$('.wd3').click(function () {
	$('.day3').addClass('active-w');
	$('.day1').removeClass('active-w');
	$('.day2').removeClass('active-w');
	$('.day4').removeClass('active-w');
	$('.day5').removeClass('active-w');
	$('.wd3').addClass('active-wb');
	$('.wd1').removeClass('active-wb');
	$('.wd2').removeClass('active-wb');
	$('.wd4').removeClass('active-wb');
	$('.wd5').removeClass('active-wb');
});

$('.wd4').click(function () {
	$('.day4').addClass('active-w');
	$('.day1').removeClass('active-w');
	$('.day2').removeClass('active-w');
	$('.day3').removeClass('active-w');
	$('.day5').removeClass('active-w');
	$('.wd4').addClass('active-wb');
	$('.wd1').removeClass('active-wb');
	$('.wd2').removeClass('active-wb');
	$('.wd3').removeClass('active-wb');
	$('.wd5').removeClass('active-wb');
});

$('.wd5').click(function () {
	$('.day5').addClass('active-w');
	$('.day1').removeClass('active-w');
	$('.day2').removeClass('active-w');
	$('.day3').removeClass('active-w');
	$('.day4').removeClass('active-w');
	$('.wd5').addClass('active-wb');
	$('.wd1').removeClass('active-wb');
	$('.wd2').removeClass('active-wb');
	$('.wd3').removeClass('active-wb');
	$('.wd4').removeClass('active-wb');
});


$(document).ready(function () {
	$('#searchTerm').keypress(function (e) {
		if (e.keyCode == 13)
			$('#searchButton').click();
	});
});

function search(callback) {
	$('#body').hide();
	$('#msg').show();
	let searchCity = document.getElementById("searchTerm").value;
	try {
		weather(searchCity);
		todayWeather(searchCity);
		let xhr = new XMLHttpRequest();
		xhr.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=' + searchCity + '&units=metric&APPID=9b0f8968979638ed09e533379a5e798f', false);
		xhr.send();
		let json = JSON.parse(xhr.responseText);
		let latI = json.coord.lat;
		let lonI = json.coord.lon;
		nearby(latI, lonI);
		$('.today-block').show();
		$('.five-days-block').hide();
		$('.not-found').css('display', 'none');

		$('.nav1').addClass('active-nav');
		$('.nav2').removeClass('active-nav');
		$('.nav1').css('display', 'list-item');
		$('.nav2').css('display', 'list-item');

		$('.day1').addClass('active-w');
		$('.day2').removeClass('active-w');
		$('.day3').removeClass('active-w');
		$('.day4').removeClass('active-w');
		$('.day5').removeClass('active-w');
		
		$('.wd1').addClass('active-wb');
		$('.wd2').removeClass('active-wb');
		$('.wd3').removeClass('active-wb');
		$('.wd4').removeClass('active-wb');
		$('.wd5').removeClass('active-wb');
	} catch (err) {
		$('.today-block').hide();
		$('.five-days-block').hide();
		$('.not-found').css('display', 'flex');
		$('#cur-city').html('');
		$('#searchTerm').attr('placeholder','Search');
		$('#searchTerm').val('');
		$('.not-found-descr').html('"' + searchCity + '"could not be found.<br>Please enter a different location.');

		if ($('.not-found').css('display', 'flex')) {
			$('.nav1').css('display', 'none');
			$('.nav2').css('display', 'none');
		}
	}
	callback();
};


function callbackF() {
	setTimeout(function () {
		$('#body').show();
		$('#msg').hide();
	}, 500);
};


$('#searchButton').on("click", function () {
	search(callbackF);
});



function curLocation() {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'https://ipinfo.io?token=7fd9848bc36493', false);
	xhr.send();
	let json = JSON.parse(xhr.responseText);
	let curCity = json.city;
	let curLoc = json.loc;
	let arCoord = curLoc.split(',', 2);
	let latC = arCoord[0];
	let lonC = arCoord[1];
	weather(curCity);
	todayWeather(curCity);
	nearby(latC, lonC);
};
curLocation();



let today = new Date();
let date = today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear();
$('.cur-date').text(date);
$('.cur-year').text(today.getFullYear());


function nearby(lat, lon) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://api.openweathermap.org/data/2.5/find?lat=' + lat + '&lon=' + lon + '&cnt=4&units=metric&APPID=9b0f8968979638ed09e533379a5e798f', false);
	xhr.send();
	let json = JSON.parse(xhr.responseText);
	console.log(json);
	document.querySelector('.nearby .block-contain').innerHTML = '';

	for (let i = 0; i < 4; i++) {

		document.querySelector('.nearby .block-contain').innerHTML += '<div class="nearby-city"></div>';

		let curCityN = json.list[i].name;
		document.querySelectorAll('.nearby .block-contain .nearby-city')[i].innerHTML += '<span class="nbc">' + curCityN + '</span>';

		let iconN = json.list[i].weather[0].icon;
		document.querySelectorAll('.nearby .block-contain .nearby-city')[i].innerHTML += '<img src="https://openweathermap.org/img/wn/' + iconN + '.png" alt="">';

		let yourTempN = Math.round(json.list[i].main.temp);
		document.querySelectorAll('.nearby .block-contain .nearby-city')[i].innerHTML += '<span class="tem">' + yourTempN + ' &deg;C' + '</span>';
	}
}



function todayWeather(citySearchCur) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=' + citySearchCur + '&units=metric&APPID=9b0f8968979638ed09e533379a5e798f', false);
	xhr.send();
	let json = JSON.parse(xhr.responseText);

	let curCity = json.name;
	let curCountry = json.sys.country;
	$('#cur-city').html(curCity + ', ' + curCountry);
	$('#searchTerm').attr('placeholder', curCity + ', ' + curCountry);
	$('#searchTerm').val('');

	let icon = json.weather[0].icon;
	$('.cur-weather-icon').attr('src', 'https://openweathermap.org/img/wn/' + icon + '.png');

	let yourIconState = json.weather[0].main;
	$('.cur-weather-state').html(yourIconState);

	let yourTemp = Math.round(json.main.temp);
	$('.temp').html(yourTemp + ' &deg;C');

	let sunrise = json.sys.sunrise;
	let sunriseVal = new Date(sunrise * 1000);
	$('.sunrise').html((sunriseVal.getHours() < 10 ? '0' : '') + sunriseVal.getHours() + ':' + (sunriseVal.getMinutes() < 10 ? '0' : '') + sunriseVal.getMinutes());

	let sunset = json.sys.sunset;
	let sunsetVal = new Date(sunset * 1000);
	$('.sunset').html((sunsetVal.getHours() < 10 ? '0' : '') + sunsetVal.getHours() + ':' + (sunsetVal.getMinutes() < 10 ? '0' : '') + sunsetVal.getMinutes());

	let dur = (sunsetVal.getTime() - sunriseVal.getTime()) / 3600000;
	let durH = Math.trunc(dur);
	let durM = Math.round((dur - durH) * 60);
	$('.duration').html((durH < 10 ? '0' : '') + durH + ':' + (durM < 10 ? '0' : '') + durM);

	let hum = json.main.humidity;
	let ws = json.wind.speed;
	let q = 1;
	let e = (hum / 100) * 6.105 * (Math.pow(2.71828182845905, (17.27 * yourTemp) / (237.7 + yourTemp)));
	let at = yourTemp + (+ 0.348 * e) - 0.7 * ws + ((+ 0.7) * (q / (ws + ( + 10))) - 4.25);

	document.querySelector('.current-weather .temp').innerHTML += '<br><span class="realfeelCur">Real feel '+Math.round(at)+'&deg;C</span>';
	
};






function weather(citySearchCur) {

	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://api.openweathermap.org/data/2.5/forecast?q=' + citySearchCur + '&units=metric&APPID=9b0f8968979638ed09e533379a5e798f', false);
	xhr.send();
	let json = JSON.parse(xhr.responseText);

	function hourly() {
		$('.hours-forecast').html('<span class="descr1">Today</span>');
		$('.icons-forecast').html('<span class="descr"></span>');
		$('.icons-n-forecast').html('<span class="descr">Forecast</span>');
		$('.temp-forecast').html('<span class="descr">Temp</span>');
		$('.realfeel').html('<span class="descr">Real feel</span>');
		$('.wind-forecast').html('<span class="descr">Wind</span>');
		let today = new Date();
		for (let i = 0; i < 40; i++) {
			let weatherDateJson = json.list[i].dt;
			let weatherDate = new Date(weatherDateJson * 1000);
			let weatherDateTime = weatherDate.getHours();
			let todayDay = weatherDate.getDate();
			let weatherDay = today.getDate();

			if (todayDay == weatherDay) {


				document.querySelector('.hours-forecast').innerHTML += '<span>' + Number(Number(weatherDateTime) - 2) + ':00' + '</span> ';

				let iconForecast = json.list[i].weather[0].icon;
				document.querySelector('.icons-forecast').innerHTML += '<div><img src="https://openweathermap.org/img/wn/' + iconForecast + '.png"></div>';

				let iconName = json.list[i].weather[0].main;
				document.querySelector('.icons-n-forecast').innerHTML += '<span>' + iconName + '</span>';

				let tempForecast = json.list[i].main.temp;
				document.querySelector('.temp-forecast').innerHTML += '<span>' + Math.round(tempForecast) + ' &deg;C' + '</span>';

				let windForecast = json.list[i].wind.speed;
				document.querySelector('.wind-forecast').innerHTML += '<span>' + windForecast.toFixed(1) + ' m/s' + '</span>';

				let humF = json.list[i].main.humidity;
				let q = 1;
				let e = (humF / 100) * 6.105 * (Math.pow(2.71828182845905, (17.27 * tempForecast) / (237.7 + tempForecast)));
				let at = tempForecast + (+ 0.348 * e) - 0.7 * windForecast + ((+ 0.7) * (q / (windForecast + ( + 10))) - 4.25);

				document.querySelector('.realfeel').innerHTML += '<span>'+Math.round(at)+'&deg;C</span>';
			}
	
		}

		if ($('.icons-forecast div img').length == 0) {
			$('.hourly-forecast').html('There is no current 3-hour forecast for today <b>&#9785;</b> <br> Come back tomorrow for more!');
			$('.hourly-forecast').css('text-align', 'center');
		}
	

	};
	hourly();

	function week() {

		for (let i = 0; i < 5; i++) {
			let arrayW = [];
			let arrayDW = [];
			let arrayM = [];
			let array = json.list;
			for (let i = 0; i < 40; i++) {
				let weatherDateJson = json.list[i].dt;
				let weatherDate = new Date(weatherDateJson * 1000);
				arrayW.push(weatherDate.getDate());
				arrayDW.push(weatherDate.getDay());
				arrayM.push(weatherDate.getMonth());
			}
			let today = new Date();
			let wDay = Number(today.getDate()) + i;

			function unique(arr) {
				let result = [];

				for (let str of arr) {
					if (!result.includes(str)) {
						result.push(str);
					}
				}
				return result;
			}

			let arrayWeek = unique(arrayW);
			let arrayDayWeek = unique(arrayDW);
			let arrayMonth = unique(arrayM);
			let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
			let month = ['', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

			function everyday() {
				$('.weekWD')[i].innerHTML = '';
				if (wDay == today.getDate()) {
					$('.weekWD')[i].innerHTML = 'Today<br>';
					let w = document.querySelectorAll('.days5 > div')[i];
					w.querySelector('.hours-forecastW').innerHTML = '<span class="descr1">Today</span>';
					if (arrayWeek[0] != today.getDate()) {
						$('.weekWD')[i].innerHTML = 'Tomorrow<br>';
						let w = document.querySelectorAll('.days5 > div')[i];
						w.querySelector('.hours-forecastW').innerHTML = '<span class="descr1">Tomorrow</span>';
					}
				} else {
					$('.weekWD')[i].innerHTML = days[arrayDayWeek[i]] + '<br>';
					let w = document.querySelectorAll('.days5 > div')[i];
					w.querySelector('.hours-forecastW').innerHTML = '<span class="descr1">' + days[arrayDayWeek[i]] + '</span>';
				}


				function hourly1() {

					let arWeek = arrayWeek[i];
					let w = document.querySelectorAll('.days5 > div')[i];
					let title = document.querySelectorAll('.weather5 > div')[i];

					w.querySelector('.icons-forecastW').innerHTML = '<span class="descr"></span>';
					w.querySelector('.icons-n-forecastW').innerHTML = '<span class="descr">Forecast</span>';
					w.querySelector('.temp-forecastW').innerHTML = '<span class="descr">Temp</span>';
					w.querySelector('.realfeelW').innerHTML = '<span class="descr">Real feel</span>';
					w.querySelector('.wind-forecastW').innerHTML = '<span class="descr">Wind</span>';

					for (let i = 0; i < 40; i++) {
						let arDate = String(array[i].dt_txt)[8] + String(array[i].dt_txt)[9];

						if (arWeek == arDate) {
							let arTime = String(array[i].dt_txt)[11] + String(array[i].dt_txt)[12] + String(array[i].dt_txt)[13] + String(array[i].dt_txt)[14] + String(array[i].dt_txt)[15];


							let m = String(array[i].dt_txt)[5] + String(array[i].dt_txt)[6]
							title.querySelector('.dateWD').innerHTML = month[m] + ' ' + arWeek;

							let dateForecast = json.list[i].dt_txt;
							w.querySelector('.hours-forecastW').innerHTML += '<span>' + arTime + '</span>';

							let iconForecast = json.list[i].weather[0].icon;
							w.querySelector('.icons-forecastW').innerHTML += '<div><img src="https://openweathermap.org/img/wn/' + iconForecast + '.png"></div>';

							let iconName = json.list[i].weather[0].main;
							w.querySelector('.icons-n-forecastW').innerHTML += '<span>' + iconName + '</span>';

							let tempForecast = json.list[i].main.temp;
							w.querySelector('.temp-forecastW').innerHTML += '<span>' + Math.round(tempForecast) + ' &deg;C' + '</span>';

							let windForecast = json.list[i].wind.speed;
							w.querySelector('.wind-forecastW').innerHTML += '<span>' + windForecast.toFixed(1) + ' m/s' + '</span>';
						
							let humF = json.list[i].main.humidity;
							let q = 1;
							let e = (humF / 100) * 6.105 * (Math.pow(2.71828182845905, (17.27 * tempForecast) / (237.7 + tempForecast)));
							let at = tempForecast + (+ 0.348 * e) - 0.7 * windForecast + ((+ 0.7) * (q / (windForecast + ( + 10))) - 4.25);

							w.querySelector('.realfeelW').innerHTML += '<span>'+Math.round(at)+'&deg;C</span>';
						}
					}
				};
				hourly1();
			};
			everyday();
		}
	};
	week();
};

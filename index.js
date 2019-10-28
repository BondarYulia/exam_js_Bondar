$(document).ready(function () {
	$('.five-days-block').hide();
	$('.not-found').hide();
	$('.day2').hide();
	$('.day3').hide();
	$('.day4').hide();
	$('.day5').hide();
});


$('.nav1').click(function () {
	$('.today-block').show();
	$('.five-days-block').hide();
	$('.not-found').hide();
	$('.nav1').addClass('active-nav');
	$('.nav2').removeClass('active-nav');
});

$('.nav2').click(function () {
	$('.today-block').hide();
	$('.five-days-block').show();
	$('.not-found').hide();
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


let today = new Date();
let date = today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear();

$('.cur-date').text(date);



function todayWeather() {

	let citySearchCur = 'Kyiv';

	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=' + citySearchCur + '&units=metric&APPID=9b0f8968979638ed09e533379a5e798f', false);
	xhr.send();
	if (xhr.status != 200) {
		console.log(xhr.status + ': ' + xhr.statusText);
	} else {
		console.log(xhr.responseText);
	}
	let json = JSON.parse(xhr.responseText);

	// CURRENT WEATHER TODAY

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
};
todayWeather();


let lat1 = $('#lat');
let lon1 = $('#lon');

function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else {
		x.innerHTML = "Geolocation is not supported by this browser.";
	}
}

function showPosition(position) {
	lat1.text(position.coords.latitude);
	lon1.text(position.coords.longitude);
}

getLocation();


function weather() {

	
	// let lat = 50;
	// let lon = 30;

	// let xhr = new XMLHttpRequest();
	// xhr.open('GET', 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=metric&APPID=9b0f8968979638ed09e533379a5e798f', false);

	let citySearchCur = 'Kyiv';

	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://api.openweathermap.org/data/2.5/forecast?q=' + citySearchCur + '&units=metric&APPID=9b0f8968979638ed09e533379a5e798f', false);
	xhr.send();
	if (xhr.status != 200) {
		console.log(xhr.status + ': ' + xhr.statusText);
	} else {
		console.log(xhr.responseText);
	}
	let json = JSON.parse(xhr.responseText);

	console.log(json);

	function hourly() {

		for (let i = 0; i < 40; i++) {
			let weatherDateJson = json.list[i].dt;
			let weatherDate = new Date(weatherDateJson * 1000);
			let weatherDateTime = weatherDate.getHours();
			let todayDay = weatherDate.getDate();
			let weatherDay = today.getDate();

			

			if (todayDay == weatherDay) {
				document.querySelector('.hours-forecast').innerHTML += '<span>' + weatherDateTime + ':00' + '</span> ';

				let iconForecast = json.list[i].weather[0].icon;
				document.querySelector('.icons-forecast').innerHTML += '<div><img src="https://openweathermap.org/img/wn/' + iconForecast + '.png"></div>';

				let tempForecast = json.list[i].main.temp;
				document.querySelector('.temp-forecast').innerHTML += '<span>' + Math.round(tempForecast) + ' &deg;C' + '</span>';

				let windForecast = json.list[i].wind.speed;
				document.querySelector('.wind-forecast').innerHTML += '<span>' + windForecast.toFixed(1) + ' m/s' + '</span>';
			}
		}

		if ($('.hours-forecast').text() == '') {
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
				if (wDay == today.getDate()) {
					$('.weekday')[i].innerHTML += '<span class="week-title">Today<br></span>';
				} else {
					$('.weekday')[i].innerHTML += '<span class="week-title">' + days[arrayDayWeek[i]] + '<br></span>';

				}
				$('.weekday')[i].innerHTML += '<span>' + month[arrayMonth[0]] + ' ' + wDay + '</span>';

				function hourly1() {

					// for (let i = 0; i < 40; i++) {
					// 	let weatherDateJson = json.list[i].dt;
					// 	let weatherDate = new Date(weatherDateJson * 1000);
					// 	let weatherDateTime = weatherDate.getHours();
					// 	let todayDay = weatherDate.getDate();
					// 	let weatherDay = today.getDate();

					// 	if (todayDay == weatherDay) {
					// 		document.querySelector('.hours-forecast').innerHTML += '<span>' + weatherDateTime + ':00' + '</span> ';

					// 		let iconForecast = json.list[i].weather[0].icon;
					// 		document.querySelector('.icons-forecast').innerHTML += '<div><img src="https://openweathermap.org/img/wn/' + iconForecast + '.png"></div>';

					// 		let tempForecast = json.list[i].main.temp;
					// 		document.querySelector('.temp-forecast').innerHTML += '<span>' + Math.round(tempForecast) + ' &deg;C' + '</span>';

					// 		let windForecast = json.list[i].wind.speed;
					// 		document.querySelector('.wind-forecast').innerHTML += '<span>' + windForecast.toFixed(1) + ' m/s' + '</span>';
					// 	}

					// }

					// if ($('.hours-forecast').text() == '') {
					// 	$('.hourly-forecast').html('There is no current 3-hour forecast for today <b>&#9785;</b> <br> Come back tomorrow for more!');
					// 	$('.hourly-forecast').css('text-align', 'center');
					// }

					let arWeek = arrayWeek[i];
					for (let i = 0; i < 40; i++) {
						let arDate = String(array[i].dt_txt)[8] + String(array[i].dt_txt)[9];
						if (arWeek = arDate) {

							// document.querySelector('.hours-forecastW').innerHTML += '<span>' + weatherDateTime + ':00' + '</span> ';

							let iconForecast = json.list[i].weather[0].icon;
							document.querySelector('.icons-forecastW').innerHTML += '<div><img src="https://openweathermap.org/img/wn/' + iconForecast + '.png"></div>';

							let tempForecast = json.list[i].main.temp;
							document.querySelector('.temp-forecastW').innerHTML += '<span>' + Math.round(tempForecast) + ' &deg;C' + '</span>';

							let windForecast = json.list[i].wind.speed;
							document.querySelector('.wind-forecastW').innerHTML += '<span>' + windForecast.toFixed(1) + ' m/s' + '</span>';
						}
					}


				};
				hourly1();

			};

			// if (arrayWeek[i] == wDay) {
			// 	everyday();
			// }
			// else if (arrayWeek[i] == wDay + 1) {
			everyday();
			// }

		}
	};
	week();

};

weather();













// $('.searchButton').on('click', function (){
// let citySearch = $('.searchTerm').val();

// let xhr = new XMLHttpRequest();
// xhr.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q='+ citySearch +'&units=metric&APPID=9b0f8968979638ed09e533379a5e798f', false);
// xhr.send();



// if (xhr.status != 200) {
// 	console.log( xhr.status + ': ' + xhr.statusText );
// } else {
// 	console.log( xhr.responseText );
// }

// console.log(JSON.parse(xhr.responseText));

// let json = JSON.parse(xhr.responseText);
// let yourIcon = json.weather[0].main; 
// let yourTemp = json.main.temp; 
// $('.cur-weather').text(yourIcon);
// $('.temp').text(yourTemp);

// console.log(yourIcon);
// console.log(yourTemp);

// })
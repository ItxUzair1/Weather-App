let button = document.querySelector(".image");
let input = document.querySelector("input");
let temp=document.querySelector('#temperature');
let image=document.querySelector(".weather-icon img")
let city=document.querySelector("#City");
let humidity=document.querySelector("h4");
let wind=document.querySelector("#wind");
let para=document.querySelector(".weather-information p");

button.addEventListener("click",()=>{
    let inp=input.value;
    if(inp==""){
        return;
    }else{    
       weather(inp); 
       input.value="";
    }
});


async function checkWeather(url){
    let response = await fetch(url);
    let data= await response.json();
    return data;
}

function calculateTempearture(temperature){
        let calculatedT=temperature-273.15;
        return calculatedT;
}



function weather(inp){
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${inp.toLowerCase()}&appid=52236569c4c50b7916b596f75937a18a`
    let request= checkWeather(url);
    request.then((result)=>{
    let tempearture=calculateTempearture(result.main.temp);
    temp.innerHTML=`<h1 id="temperature">${Math.round(tempearture)}<sup>o</sup>C</h1>`;
    setimage(result);
    city.innerText=result.name;
    humidity.innerText=`${result.main.humidity}%`;
    wind.innerText=`${Math.round(result.wind.speed * 1.60)} km/h`
    para.innerHTML=`<p>${result.weather[0].description} /Feels Like ${Math.round(calculateTempearture(result.main.feels_like))}</p>`
    })
    .catch((error)=>{
        alert("City Not Found");
    });
}

weather("Sukkur");


function setimage(result){
    let icon=result.weather[0].icon;
    if(icon=='01d'){
        image.src="clear.png";
    }
    else if(icon=="02d" ){
        image.src="DayfewClouds.png";
    }
    else if(icon=="03d" || icon=="03n"){
        image.src="ScatteredClouds.png";
    }
    else if(icon=="04d" || icon=="04n"){
        image.src="BrokenClouds.png";
    }
    else if(icon=="09d" || icon=="09n"){
        image.src="ShowerRain.jpg";
    }
    else if(icon=="10d"){
        image.src="DayRain.png";
    }
    else if(icon=="11d" || icon=="11n"){
        image.src="ThunderStorm.png";
    }
    else if(icon=="13d" || icon=="13n"){
        image.src="snow.png";
    }
    else if(icon=="50d"){
        image.src="DayHaze.png";
    }
    else if(icon=="50n"){
        image.src="NightHaze.png";
    }
    else if(icon=="10n"){
        image.src="NightRain.png";
    }
    else if(icon=="02n" ){
        image.src="NightFewClouds.png";
    }
    else if(icon=="01n" ){
        image.src="NightClearSky.png";
    }


  
 

}

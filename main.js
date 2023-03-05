let weather = {
    "apiKey": "d07100db02f6146ec3c58678e2c66765",

    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            + city 
            + "&appid=" 
            + this.apiKey
            )
            //store de api response/data in a json format
            .then((response) => response.json())
            //then display it from our display weather function
            .then((data) => this.displayWeather(data));
    },

    //function that will take in de weather data nd display de weather
    displayWeather: function(data) {
        //getting de datas from de json format storage
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name,icon,description,temp,humidity,speed)
        //to display de information on de page
        document.querySelector(".city").innerText = `Weather in ${name}`;
        document.querySelector(".icon").src = `https://openweathermap.org/img/wn/${icon}.png`
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = `${temp}°C`;
        document.querySelector(".humidity").innerText = `Humidity: ${humidity}%`;
        document.querySelector(".wind").innerText = `Wind speed: ${speed}km/h`;
        //when we call displayWeather(or choose a location) we remove de class loading
        document.querySelector(".weather").classList.remove("loading");
        //to get photos from the city de user inputed
        // document.body.style.backgroundImage = "url('https://images.unsplash.com/?" + name + "')"
    },

    //this function will get de content of de search bar(get the user input)
    search: function () {
        //get de user location
        const userLocation = document.querySelector(".search-bar").value
        //then search for it using de user input location
        this.fetchWeather(userLocation);
    }
};

//then add eventlistener to de de search button to get de city inputed by user
document.querySelector(".search button").addEventListener("click", function() {
    weather.search();
    document.querySelector(".search-bar").value = "";

});

//add eventlistener to enter key(searches if de user clicks on enter key inside de input)
document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        weather.search();
        document.querySelector(".search-bar").value = "";
    }
});

//when de page loads we call de weather.fetchWeather function
weather.fetchWeather("Lagos");

//notice dat when you load de page until de searches is finished youll be seeing a wrong info
//first we create a loading class which hides all de info when its loading for de first time
//then remove it here when we call de displayWeather

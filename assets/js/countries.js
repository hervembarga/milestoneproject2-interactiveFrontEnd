
// covid19 update
const baseURL = "https://covid19-api.org/api/status/"
function getCovidData(type,cb) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET",baseURL + type);
    xhr.send();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };
}
function writeToDocument(type) {
    var el = document.getElementById("data");
    el.innerHTML = '';
    getCovidData(type, function(data) {
    //    data.forEach(function(item){
            el.innerHTML += `<p>${data.country} ${data.cases}</p>`;
    //});
})
}

// Countries
/* 
fetch("https://covid19-api.org/api/status/US")
        .then(console.log(this.responseText));
$.getJSON ('https://covid19-api.org/api/diff/US', function(data){
         console.log(data);
     });
url for icon code
http://openweathermap.org/img/wn/10d@2x.png
*/
$(document).ready(function(){

    function countryInformationHTML(restCountry,covidData,weatherData){
        // print languages if there is more than one
        var i;
        var languages ="";
        for (i in restCountry[0].languages) {
            languages += restCountry[0].languages[i].name + "  ";
        }
        return `
        <div class="row">
                <div class="col">
                    <h2>${restCountry[0].name} <span><img src = ${restCountry[0].flag} width="80" height="30"/></span></h2>
                </div>   
        </div>
        <div class="row">
                <div class="col">
                    <h4>Capital ${restCountry[0].capital} , weather </h4>
                    <table class="table">
                <tbody>
                    <tr> 
                    <td colspan="3">As of ${new Date(weatherData[0].dt).toLocaleTimeString("en-US")}</td>
                    </tr>
                    <tr>
                        <td colspan="2">${Math.round((weatherData[0].main.temp)-273.15)} &#176;C</td>
                        <td><img src="https://openweathermap.org/img/wn/${weatherData[0].weather[0].icon}@2x.png"/></td>
                    </tr>
                    <tr>
                        <td>Feels like &nbsp ${Math.round((weatherData[0].main.feels_like)-273.15)} &#176;C</td>    
                        <td>Wind Speed ${Math.round(weatherData[0].wind.speed/3.6)} km/h</td>
                        <td>${weatherData[0].weather[0].description}</td>
                        </tr>
                </tbody>
                </table>
            
                </div>   
        </div>
        <div class="row">
            <div class="col-sm-6">
                <h4>About ${restCountry[0].name}</h4>
                <table class="table table-striped">
                <tbody>
                    <tr>
                        <td>Region</td>
                        <td>${restCountry[0].region}</td>
                    </tr>
                    <tr>
                        <td>Population</td>
                        <td>${restCountry[0].population.toLocaleString('en')}</td>
                    </tr>
                    <tr>
                        <td>Currency</td>
                        <td>${restCountry[0].currencies[0].name} &nbsp;&nbsp;<b>${restCountry[0].currencies[0].code}</b></td>
                    </tr>
                    <tr>
                        <td>Language</td>
                        <td>${languages}</td>
                    </tr>
                </tbody>
                </table>
            </div> 
            <div class="col-sm-6">
                <p>Covid-19 update</p>
                <table class="table table-striped">
                <tbody>
                    <tr>
                        <td>Cases</td>
                        <td>${covidData[0].cases.toLocaleString('en')}</td>
                    </tr>
                    <tr>
                        <td>Deaths</td>
                        <td>${covidData[0].deaths.toLocaleString('en')}</td>
                    </tr>
                    <tr>
                    <td>Recovered</td>
                    <td>${covidData[0].recovered.toLocaleString('en')}</td>
                    </tr>
                </tbody>
                </table>
            </div>  
        </div>
        `
    }

    function fetchRestCountriesInformation(){
        const city ="yaounde";
        const isoTwoCode = "cm";
        const urlRestCountry = 'https://restcountries.eu/rest/v2/alpha/'+isoTwoCode;
        const urlCovidData = 'https://covid19-api.org/api/status/'+isoTwoCode;
        const urlWeatherData = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=dfef8e6748c0490f42caed2456ead4a1';
        $.when($.getJSON(urlRestCountry), $.getJSON(urlCovidData), $.getJSON(urlWeatherData))
        .then(
            function(response1,response2,response3) {
            var restCountry = response1;
            var covidData = response2;
            var weatherData=response3;
            console.log(restCountry,covidData,weatherData);
           $("#about-country").html(countryInformationHTML(restCountry,covidData,weatherData));
        },
        function(errorResponse) {
            if (errorResponse.status === 404) {
                console.log(errorResponse);
            } else {
                console.log(errorResponse);
                
            }
        });
    }
 
    function photosPopularCitiesHTML(photosCities){
       var popularCities = ["Yaoundé","Douala","Garoua"];
        return `
        <div class="row">
                <div class="col">
                    <h2>Popular Cities</h2>
                </div>   
            </div>
            <div class="row">
                <div class="card-deck">
                    <div class="card">
                        <img src="${photosCities.results[0].urls.regular}" class="card-img-top" alt="${photosCities.results[0].alt_description}">
                        <div class="card-title">
                            <h5 class="card-title">${popularCities[0]}</h5>
                        </div>
                    </div>
                    <div class="card">
                        <img src="${photosCities.results[1].urls.regular}" class="card-img-top" alt="${photosCities.results[1].alt_description}">
                        <div class="class="card-footer"">
                        <h5 class="card-title">${popularCities[1]}</h5>
                        </div>
                    </div>
                    <div class="card">
                        <img src="${photosCities.results[2].urls.regular}" class="card-img-top" alt="${photosCities.results[2].alt_description}">
                        <div class="">
                        <h5 class="card-title">${popularCities[2]}</h5>
                        </div>
                    </div>
            </div>
        `}
     function photosTopPlacesHTML(photosPlaces){
       var topPlaces = ["Waza zoo - Garoua","Douche Place - Douala","Beach - Kribi"];
        return `
        <div class="row">
                <div class="col">
                    <h2>Top three places to visit</h2>
                </div>  
            </div>
            <div class="row">
                <div class="card-deck">
                    <div class="card">
                        <img src="${photosPlaces.results[3].urls.regular}" class="card-img-top" alt="${photosPlaces.results[3].alt_description}">
                        <div class="card-title">
                            <h5 class="card-title">${topPlaces[0]}</h5>
                        </div>
                    </div>
                    <div class="card">
                        <img src="${photosPlaces.results[4].urls.regular}" class="card-img-top" alt="${photosPlaces.results[4].alt_description}">
                        <div class="class="card-footer"">
                        <h5 class="card-title">${topPlaces[1]}</h5>
                        </div>
                    </div>
                    <div class="card">
                        <img src="${photosPlaces.results[5].urls.regular}" class="card-img-top" alt="${photosPlaces.results[5].alt_description}">
                        <div class="">
                        <h5 class="card-title">${topPlaces[2]}</h5>
                        </div>
                    </div>
            </div>
        `}  
    function fetchPhotosUnsplash(){
        const city ="cameroon";
        const urlUnsplash = 'https://api.unsplash.com/search/photos?query='+city+'&client_id=SwMNKvf-QEsIHr99Onvq9nUQ0IeO6bVMuoPaNNKDH0E';
        
        $.when($.getJSON(urlUnsplash))
        .then(
            function(response) {
            var photosUnsplash = response;
           console.log(photosUnsplash);
        $("#popular-cities").html(photosPopularCitiesHTML(photosUnsplash));
        $("#top-places").html(photosTopPlacesHTML(photosUnsplash));
        },
        function(errorResponse) {
            if (errorResponse.status === 404) {
                console.log(errorResponse);
            } else {
                console.log(errorResponse);
                
            }
        })
        ;

    }
    
    fetchRestCountriesInformation();
    fetchPhotosUnsplash();

    //$.getJSON("https://restcountries.eu/rest/v2/alpha/cm", function(result){
       // $("#country-name").html(result.name);
     // console.log(result);
    //});
    /*
    $.getJSON ('https://covid19-api.org/api/status/cm', function(data){
         console.log(data);
     });
     $.getJSON ( 'https://api.unsplash.com/search/photos?query=cameroon&client_id=SwMNKvf-QEsIHr99Onvq9nUQ0IeO6bVMuoPaNNKDH0E', function(data){
         console.log(data);
     });
  
      $.getJSON ('https://api.openweathermap.org/data/2.5/weather?q=yaounde&appid=dfef8e6748c0490f42caed2456ead4a1', function(data){
         console.log(data);
     });
    */
});
/*
     fetch('https://api.openweathermap.org/data/2.5/weather?q=toronto&appid=dfef8e6748c0490f42caed2456ead4a1')
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => alert("wrong place"));
*/
        



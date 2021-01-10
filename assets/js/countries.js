
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

*/
$(document).ready(function(){

    function countryInformationHTML(restCountry,covidData,weatherData){
        return `
        <div class="row">
                <div class="col">
                    <h2>${restCountry[0].name} <span><img src = ${restCountry[0].flag} width="80" height="30"/></span></h2>
                </div>   
        </div>
        <div class="row">
                <div class="col">
                    <p>${restCountry[0].capital} ${weatherData[0].main.temp}</p>
                </div>   
        </div>
        <div class="row">
            <div class="col-md-6">
                <p>Population and other info</p>
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
                        <td>${restCountry[0].languages[0].name}</td>
                    </tr>
                </tbody>
                </table>
            </div> 
            <div class="col-md-6">
                <p>Covid-19</p>
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
        const urlRestCountry = "https://restcountries.eu/rest/v2/alpha/fr";
        const urlCovidData = 'https://covid19-api.org/api/status/fr';
        const urlWeatherData = 'https://api.openweathermap.org/data/2.5/weather?q=toronto&appid=dfef8e6748c0490f42caed2456ead4a1';
        $.when($.getJSON(urlRestCountry), $.getJSON(urlCovidData), $.getJSON(urlWeatherData))
        //$.when($.getJSON(restCountry))
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
    fetchRestCountriesInformation();

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
        



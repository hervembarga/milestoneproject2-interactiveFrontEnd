

$(document).ready(function(){
    
    const country ="cameroon";
    $(".centered-text").html(country);
    //country iso two code
    const isoTwoCode = 'cm';
    // capital of the country
    const city ='yaounde';
    const popularCities = ["Yaoundé","Douala","Garoua"];
    const topPlaces = ["Waza zoo - Garoua","Douche Place - Douala","Beach - Kribi"];
    
    // these three constants are use in fetchRestCountriesInformation function
    const urlRestCountry = 'https://restcountries.eu/rest/v2/alpha/'+isoTwoCode;
    const urlCovidData = 'https://covid19-api.org/api/status/'+isoTwoCode;
    const urlWeatherData = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=dfef8e6748c0490f42caed2456ead4a1';
    // for Unsplash call API
    const urlUnsplash = 'https://api.unsplash.com/search/photos?query='+country+'&client_id=SwMNKvf-QEsIHr99Onvq9nUQ0IeO6bVMuoPaNNKDH0E';

    function countryInformationHTML(restCountry,covidData,weatherData){
        // print languages if there is more than one
        var i;
        var languages ="";
        for (i in restCountry[0].languages) {
            languages += restCountry[0].languages[i].name + "  ";
        }
        return `
        <div class="row">
                <div class="col-12">
                    <h2>${restCountry[0].name} <span><img src = ${restCountry[0].flag} width="80" height="30"/></span></h2>
                </div>   
        </div>
        <div class="row">
                <div class="col-12">
                    <h4>Capital ${restCountry[0].capital} , weather </h4>
                </div>
        </div>
        <div class="row">
            <div class="col-12 ">
                <table class="table border table-style">
                <tbody>
                    <tr> 
                        <td colspan="3">As of ${new Date(weatherData[0].dt).toLocaleTimeString("en-US")}</td>
                    </tr>
                    <tr>
                        <td id="weatherTempVal" colspan="2">${Math.round((weatherData[0].main.temp)-273.15)} <sup>&#176;C</sup></td>
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
        <div class="margin-20"></div>
        <div class="row">
            <div class="col-sm-6">
                <h4>About ${restCountry[0].name}</h4>
                <table class="table table-striped border table-style">
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
                        <td> ${languages}</td>
                    </tr>
                </tbody>
                </table>
            </div>
            <div class="margin-20"></div> 
            <div class="col-sm-6">
                <h4>Covid-19 update</h4>
                <table class="table table-striped border table-style">
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
    
    // photos extracted from Unsplash API call
    function photosPopularCitiesHTML(photosCities){
       var columnCityThumbnail = "";
        for (let i = 0; i < 3; ++i) {
            columnCityThumbnail += 
                 `<div class="col-sm-4">
                    <div class="img-thumbnail">
                        <div class="box">
                            <div class="content"> 
                                <img src="${photosCities.results[i].urls.regular}" class="card-img-top" alt="${photosCities.results[i].alt_description}">
                            </div> 
                        </div>
                        <div class="caption">
                            <h5>${popularCities[i]}</h5>
                        </div>
                    </div>
                    <div class=" margin-40"></div>
                </div>`
           /* console.log(columnCityThumbnail); */
        }
        return `
            <div class="row">
                <div class="col">
                    <h2>Popular Cities  <i class="fas fa-globe-africa"></i></h2>
                </div>   
            </div>
            <div class="margin-20"></div>
            <div class="row">
                ${columnCityThumbnail}
            </div>
    `}
    // photos extracted from Unsplash API call
     function photosTopPlacesHTML(photosPlaces){
       
        var columnPlaceThumbnail = "";
        for (let i = 3; i < 6; ++i) {
            columnPlaceThumbnail += 
                 `<div class="col-sm-4">
                    <div class="img-thumbnail">
                        <div class="box">
                            <div class="content"> 
                                <img src="${photosPlaces.results[i].urls.regular}" class="card-img-top" alt="${photosPlaces.results[i].alt_description}">
                            </div> 
                        </div>
                        <div class="caption">
                            <h5>${topPlaces[i-3]}</h5>
                        </div>
                    </div>
                    <div class=" margin-40"></div>
                </div>`
            console.log(columnPlaceThumbnail);
        }
        
        return `
            <div class="row">
                <div class="col">
                    <h2>Top three places to visit  <i class="fas fa-map-marked"></i></h2>
                </div>  
            </div>
            <div class="margin-20"></div>
            <div class="row">
                ${columnPlaceThumbnail}
            </div>       
    `}  
    
    
    function fetchPhotosUnsplash(){
        
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



});


    // google Maps

     let map;
      let places;
      let infoWindow;
      let markers = [];
      let autocomplete;
      const countryRestrict = { country: "cm" };
      const MARKER_PATH =
        "https://developers.google.com/maps/documentation/javascript/images/marker_green";
      const hostnameRegexp = new RegExp("^https?://.+?/");
      const countries = {
        cm: {
          center: { lat: 7.366863, lng: 12.650235 },
          zoom: 5.7,
        },
        eg: {
          center: { lat: 25.872909, lng: 28.479939 },
          zoom: 5.4,
        },
        et: {
          center: { lat: 7.361667, lng: 46.609468 },
          zoom: 5.3,
        },
        sn: {
          center: { lat: 13.914252, lng: -15.927780 },
          zoom: 6,
        },
        zm: {
          center: { lat: -17.316177, lng: 26.199102 },
          zoom: 5.5,
        }
      };

      function initMap() {
        map = new google.maps.Map(document.getElementById("mymap"), {
          zoom: countries["cm"].zoom,
          center: countries["cm"].center,
          mapTypeControl: false,
          panControl: false,
          zoomControl: false,
          streetViewControl: false,
        });
        infoWindow = new google.maps.InfoWindow({
          content: document.getElementById("info-content"),
        });
        // Create the autocomplete object and associate it with the UI input control.
        // Restrict the search to the default country, and to place type "cities".
        autocomplete = new google.maps.places.Autocomplete(
          document.getElementById("autocomplete"),
          {
            types: ["(cities)"],
            componentRestrictions: countryRestrict,
          }
        );
        places = new google.maps.places.PlacesService(map);
        autocomplete.addListener("place_changed", onPlaceChanged);
        // Add a DOM event listener to react when the user selects a country.
        document
          .getElementById("country")
          .addEventListener("change", setAutocompleteCountry);
      }

      // When the user selects a city, get the place details for the city and
      // zoom the map in on the city.
      function onPlaceChanged() {
        const place = autocomplete.getPlace();

        if (place.geometry) {
          map.panTo(place.geometry.location);
          map.setZoom(14);
          search();
        } else {
          document.getElementById("autocomplete").placeholder = "Enter a city";
        }
      }

      // Search for hotels in the selected city, within the viewport of the map.
      function search() {
        const search = {
          bounds: map.getBounds(),
          types: ["lodging"],
        };
        places.nearbySearch(search, (results, status, pagination) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            clearResults();
            clearMarkers();

            // Create a marker for each hotel found, and
            // assign a letter of the alphabetic to each marker icon.
            for (let i = 0; i < results.length; i++) {
              const markerLetter = String.fromCharCode(
                "A".charCodeAt(0) + (i % 26)
              );
              const markerIcon = MARKER_PATH + markerLetter + ".png";
              // Use marker animation to drop the icons incrementally on the map.
              markers[i] = new google.maps.Marker({
                position: results[i].geometry.location,
                animation: google.maps.Animation.DROP,
                icon: markerIcon,
              });
              // If the user clicks a hotel marker, show the details of that hotel
              // in an info window.
              markers[i].placeResult = results[i];
              google.maps.event.addListener(
                markers[i],
                "click",
                showInfoWindow
              );
              setTimeout(dropMarker(i), i * 100);
              addResult(results[i], i);
            }
          }
        });
      }

      function clearMarkers() {
        for (let i = 0; i < markers.length; i++) {
          if (markers[i]) {
            markers[i].setMap(null);
          }
        }
        markers = [];
      }

      // Set the country restriction based on user input.
      // Also center and zoom the map on the given country.
      function setAutocompleteCountry() {
        const country = document.getElementById("country").value;

        if (country == "all") {
          autocomplete.setComponentRestrictions({ country: [] });
          map.setCenter({ lat: 15, lng: 0 });
          map.setZoom(2);
        } else {
          autocomplete.setComponentRestrictions({ country: country });
          map.setCenter(countries[country].center);
          map.setZoom(countries[country].zoom);
        }
        clearResults();
        clearMarkers();
      }

      function dropMarker(i) {
        return function () {
          markers[i].setMap(map);
        };
      }

      function addResult(result, i) {
        const results = document.getElementById("results");
        const markerLetter = String.fromCharCode("A".charCodeAt(0) + (i % 26));
        const markerIcon = MARKER_PATH + markerLetter + ".png";
        const tr = document.createElement("tr");
        tr.style.backgroundColor = i % 2 === 0 ? "#F0F0F0" : "#FFFFFF";

        tr.onclick = function () {
          google.maps.event.trigger(markers[i], "click");
        };
        const iconTd = document.createElement("td");
        const nameTd = document.createElement("td");
        const icon = document.createElement("img");
        icon.src = markerIcon;
        icon.setAttribute("class", "placeIcon");
        icon.setAttribute("className", "placeIcon");
        const name = document.createTextNode(result.name);
        iconTd.appendChild(icon);
        nameTd.appendChild(name);
        tr.appendChild(iconTd);
        tr.appendChild(nameTd);
        results.appendChild(tr);
      }

      function clearResults() {
        const results = document.getElementById("results");

        while (results.childNodes[0]) {
          results.removeChild(results.childNodes[0]);
        }
      }

      // Get the place details for a hotel. Show the information in an info window,
      // anchored on the marker for the hotel that the user selected.
      function showInfoWindow() {
        const marker = this;
        places.getDetails(
          { placeId: marker.placeResult.place_id },
          (place, status) => {
            if (status !== google.maps.places.PlacesServiceStatus.OK) {
              return;
            }
            infoWindow.open(map, marker);
            buildIWContent(place);
          }
        );
      }

      // Load the place information into the HTML elements used by the info window.
      function buildIWContent(place) {
        document.getElementById("iw-icon").innerHTML =
          '<img class="hotelIcon" ' + 'src="' + place.icon + '"/>';
        document.getElementById("iw-url").innerHTML =
          '<b><a href="' + place.url + '">' + place.name + "</a></b>";
        document.getElementById("iw-address").textContent = place.vicinity;

        if (place.formatted_phone_number) {
          document.getElementById("iw-phone-row").style.display = "";
          document.getElementById("iw-phone").textContent =
            place.formatted_phone_number;
        } else {
          document.getElementById("iw-phone-row").style.display = "none";
        }

        // Assign a five-star rating to the hotel, using a black star ('&#10029;')
        // to indicate the rating the hotel has earned, and a white star ('&#10025;')
        // for the rating points not achieved.
        if (place.rating) {
          let ratingHtml = "";

          for (let i = 0; i < 5; i++) {
            if (place.rating < i + 0.5) {
              ratingHtml += "&#10025;";
            } else {
              ratingHtml += "&#10029;";
            }
            document.getElementById("iw-rating-row").style.display = "";
            document.getElementById("iw-rating").innerHTML = ratingHtml;
          }
        } else {
          document.getElementById("iw-rating-row").style.display = "none";
        }

        // The regexp isolates the first part of the URL (domain plus subdomain)
        // to give a short URL for displaying in the info window.
        if (place.website) {
          let fullUrl = place.website;
          let website = String(hostnameRegexp.exec(place.website));

          if (!website) {
            website = "http://" + place.website + "/";
            fullUrl = website;
          }
          document.getElementById("iw-website-row").style.display = "";
          document.getElementById("iw-website").textContent = website;
        } else {
          document.getElementById("iw-website-row").style.display = "none";
        }
      }
//}

        



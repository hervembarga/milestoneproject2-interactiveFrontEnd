
function initMap() {
        const countries = [{
          lat: 7.366863,
          lng: 12.650235,
          title:"Cameroon"
        },
        {
          lat: 25.872909,
          lng: 28.479939,
          title:"Egypt"
        },
        {
          lat: 7.361667,
          lng: 46.609468,
          title:"Ethiopia"
        },
        {
          lat: 13.914252,
          lng: -15.927780,
          title:"Senegal"
        },
        {
          lat: -17.316177,
          lng: 26.199102,
          title:"Zambia"
        }];
        const map = new google.maps.Map(document.getElementById("map"), {
          zoom: 3,
          center: countries[0],
          fullscreenControl: true,
          zoomControl: true,
          streetViewControl: false
        });
        countries.forEach(country => {
	    let marker = new google.maps.Marker({
          position: {lat:country.lat, lng:country.lng},
          map,
          title: country.title
        });
        marker.addListener("click", () => {
        window.open("/countries.html");
        });
    });
      }
      
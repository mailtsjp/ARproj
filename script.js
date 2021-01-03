window.onload = () => {
    const button = document.querySelector('button[data-action="change"]');
    button.innerText = '﹖';

    let places = staticLoadPlaces();
    renderPlaces(places);
};

function staticLoadPlaces() {
    return [
        {
            name: 'Remote Gifting', 
            location: {
                //Hme 
                //lat: 1.301180,
                 //lng: 103.899223,

            },
        },
    ];
}
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {   
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }
function showPosition(position) {
   // x.innerHTML = "Latitude: " + position.coords.latitude + 
    //"<br>Longitude: " + position.coords.longitude;
    return[
        {
        currgeolocname: 'Current geolocation',
        location: {
            lat =  position.coords.latitude,
            lng =  position.coords.longitude,
        },
        },
    ];

  }
var models = [
    
    {   
        //esta
        Lat:' 1.301180',
        Long: '103.899223',
        url: './assets/gift_box/scene.gltf',
        scale: '0.08 0.08 0.08',
        rotation: '0 180 0',
        info: 'giftbox, Lv. 5, HP 10/10',
        position: '1 -30 -60',
    },
    /*
    {
        url: './assets/cake/scene.gltf',
        info: 'cake, Lv. 5, HP 10/10',
        rotation: '0 90 0',
        position: '1 1 -10',
        scale: '0.2 0.2 0.2'
    },
    */
    {
        // Katong shopping
        Lat: '1.304610',
        Long: '103.900932',
        url: './assets/gift/scene.gltf',
        scale: '1 1 1',
        rotation: '0 180 0',
        info: 'gift, Lv. 5, HP 10/10',
        position: '1 1 1',
        
    },
    
    {
        //Shaws preschool 437893
        Lat: '1.297660',
        Long: '103.890520',
        url: './assets/articuno/scene.gltf',
        scale: '0.2 0.2 0.2',
        rotation: '0 180 0',
        info: 'Articuno, Lv. 80, HP 100/100',
        position: '1 1 80',
    },
    /*
    {
        url: './assets/dragonite/scene.gltf',
        scale: '0.08 0.08 0.08',
        rotation: '0 180 0',
        info: 'Dragonite, Lv. 5, HP 10/10',
        //position: '1 1 100',
    },
    */
];

var modelIndex = 0;
var setModel = function (model, entity) {
    if (model.scale) {
        entity.setAttribute('scale', model.scale);
    }

    if (model.rotation) {
        entity.setAttribute('rotation', model.rotation);
    }

    if (model.position) {
        entity.setAttribute('position', model.position);
    }

    entity.setAttribute('gltf-model', model.url);

    const div = document.querySelector('.instructions');
    div.innerText = model.info;
};
function whereami(){
    let pos = {};
    navigator.geolocation.getCurrentPosition((position)=> {
    //pos.lat = position.coords.latitude;
    //pos.lng = position.coords.longitude;
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    })
    console.log(pos); // this returns an object as well with properties but pos.lat or pos.lng returns undefined
    return pos;
};
function renderPlaces(currlatlong) {
    let scene = document.querySelector('a-scene');

        currlatlong.forEach((place) => {
        //let latitude = place.location.lat;
        //let longitude = place.location.lng;

        // Getting geoloation dynamically 
        //whereami();
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        //-------------------------------

        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);

        // Draw 3d model
        if((models[modelIndex].lat==1.301180) && (models[modelIndex].long == 103.899223))
                setModel(models[modelIndex], model);
        //-----------
        model.setAttribute('animation-mixer', '');

        document.querySelector('button[data-action="change"]').addEventListener('click', function () {
            var entity = document.querySelector('[gps-entity-place]');
            modelIndex++;
            var newIndex = modelIndex % models.length;
            setModel(models[newIndex], entity);
        });

        scene.appendChild(model);
    });
}

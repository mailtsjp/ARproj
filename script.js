window.onload = () => {
    const button = document.querySelector('button[data-action="change"]'); 
    button.innerText = 'vX9';
//--------------------
    var Array = [];

   if(navigator.geolocation) {
               
             
       navigator.geolocation.getCurrentPosition( function(position) {

         function handle_errors(error)  
         {  
             switch(error.code)  
             {  
                 case error.PERMISSION_DENIED: document.getElementById("status").innerHTML = "you did not share geolocation data";  
                 break;  

                 case error.POSITION_UNAVAILABLE: document.getElementById("status").innerHTML = "I could not detect current your position";  
                 break;  

                 case error.TIMEOUT: document.getElementById("status").innerHTML = "your browser has timed out";  
                 break;  

                 default: document.getElementById("status").innerHTML = "an unknown error has occurred.";  
                 break;  
             }  
         }  

            var lat = position.coords.latitude.toFixed(7);
            var lon = position.coords.longitude.toFixed(7);
            Array.push(lat, lon);
            //alert(Array.lat);
             renderPlaces(Array);
        }
    );
     
            } else {
               alert("Sorry, browser does not support geolocation!");
            }
   
}
 function errorHandler(err) {
            if(err.code == 1) {
               alert("Error: Access is denied!");
            } else if( err.code == 2) {
               alert("Error: Position is unavailable!");
            }
         }


function showLocation(position) {
    var latitude = position.coords.latitude; 
    var longitude = position.coords.longitude;
    alert("Latitude : " + latitude + " Longitude: " + longitude);
  return [
        {
            name: 'currlatlng',
            location: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            },
        },
    ];
  
 }


var models = [
  /*  
    {
        url: './assets/cake/scene.gltf',
        info: 'Default, Lv. 5, HP 10/10',
        rotation: '0 90 0',
        position: '1 1 -10',
        scale: '0.2 0.2 0.2'
    },
    */
    {   
        //esta
        Lat:' 1.3027636',
        Long: '103.8996186',
        url: './assets/gift_box/scene.gltf',
        scale: '0.08 0.08 0.08',
        rotation: '0 180 0',
        info: 'katong esta, Lv. 5, HP 10/10',
        position: '1 -30 -60',
    },
   
    {
        // Katong shopping
        Lat: '1.304610',
        Long: '103.900932',
        url: './assets/gift/scene.gltf',
        scale: '1 1 1',
        rotation: '0 180 0',
        info: 'katong mall, Lv. 5, HP 10/10',
        position: '1 1 1',
    },    
    {
        //
        Lat: '1.3082545',
        Long: '103.8857912',
        url: './assets/articuno/scene.gltf',
        scale: '0.2 0.2 0.2',
        rotation: '0 180 0',
        info: 'old airport rd, Lv. 80, HP 100/100',
        position: '1 1 80',
    },
    
    {   //Dover
        Lat: '1.3055407',
        Long: '103.7856252',
        url: './assets/dragonite/scene.gltf',
        scale: '0.08 0.08 0.08',
        rotation: '0 180 0',
        info: 'dover, Lv. 5, HP 10/10',
        //position: '1 1 100',
    },
    
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

function renderPlaces(Array) {

    let scene = document.querySelector('a-scene');

     Array.forEach((geoloccnt) => {
        var latitude = Array[0]; //latitude; 
        var longitude = Array[1]; //longitude;

        //var latitude = '1.3055407'; 
        //var longitude = '103.7856252';
       
        let model = document.createElement('a-entity');
       model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);

        //Draw 3d model
        //setModel(models[modelIndex], model);

        //Match geolocation
    if((models[modelIndex].lat==latitude) && (models[modelIndex].long == longitude)) 
      setModel(models[modelIndex], model);
        //Set 3d model attributes
        model.setAttribute('animation-mixer', '');
  
        //Listen to button to change 3d model
        document.querySelector('button[data-action="change"]').addEventListener('click', function () {
            var entity = document.querySelector('[gps-entity-place]');
            modelIndex++;
            var newIndex = modelIndex % models.length;
            setModel(models[newIndex], entity);
        });

        scene.appendChild(model);
    });
}
window.onload = () => {
    const button = document.querySelector('button[data-action="change"]'); 
    button.innerText = 'vX1';
//--------------------
      
   if(navigator.geolocation) {
               
             
       navigator.geolocation.getCurrentPosition( 
        function(position) {

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

            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
 
            renderPlaces(position);
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
    var latitude = position.coords.latitude.toFixed(6); 
    var longitude = position.coords.longitude.toFixed(6) ;
    alert("Latitude : " + latitude + " Longitude: " + longitude);
  return [
        {
            name: 'currlatlng',
            location: {
                lat: position.coords.latitude.toFixed(6) ,
                lng: position.coords.longitude.toFixed(6) ,
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

function renderPlaces(position) {

    let scene = document.querySelector('a-scene');

   // position.forEach((position) => {
        var latitude = position.latitude.toFixed(2); 
        var longitude = position.longitude;
       
        let model = document.createElement('a-entity');
       model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);

        alert(parseFloat(latitude).toFixed(6));
        alert(' : ');
        //alert(longitude.toFixed(6));
        //Draw 3d model
        setModel(models[modelIndex], model);

        //Match geolocation
    if((models[modelIndex].lat==latitude.toFixed(6)) && (models[modelIndex].long == longitude.toFixed(6))) 
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
   // });
}
window.onload = () => {
    const button = document.querySelector('button[data-action="change"]');
    button.innerText = ' Push ';

    let places = staticLoadPlaces();
    renderPlaces(places);
};

function staticLoadPlaces() {
    return [
        {
            name: 'Remote Gifting',
            location: {
                 lat: 1.301180,
                 lng: 103.899223,

                 
            },
        },
    ];
}

var models = [
    
    {
        url: './assets/gift_box/scene.gltf',
        scale: '0.05 0.05 0.05',
        info: 'Gift box, Lv. 5, HP 10/10',
        rotation: '0 90 0',
        position: '1 1 20',
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
        url: './assets/gift/scene.gltf',
        info: 'gift, Lv. 5, HP 10/10',
        scale: '0.50 0.50 0.50'
        rotation: '0 0 0',
        position: '1 1 20',
        
    },
    /*
    {
        url: './assets/articuno/scene.gltf',
        scale: '0.2 0.2 0.2',
        rotation: '0 180 0',
        info: 'Articuno, Lv. 80, HP 100/100',
        position: '1 1 80',
    },
    {
        url: './assets/dragonite/scene.gltf',
        scale: '0.08 0.08 0.08',
        rotation: '0 180 0',
        info: 'Dragonite, Lv. 5, HP 10/10',
        position: '1 1 100',
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

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);

        setModel(models[modelIndex], model);

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
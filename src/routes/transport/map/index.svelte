<svelte:head>
    <link href='https://api.mapbox.com/mapbox-gl-js/v1.11.1/mapbox-gl.css' rel='stylesheet' />
</svelte:head>

<header>
    <div id="head" class="py-5 px-16">
        <h1 class="text-3xl md:text-4xl xl:text-5xl text-primary-7 font-bold">Transportation</h1>
    </div>
    <div id="route" class="flex flex-row px-12 font-bold">
        <div class="py-5 px-4">
            <a href="/transport/map">
                <h2 class="text-primary-7">Map</h2>
            </a>
        </div>
        <br>
        <div class="py-5 px-4">
            <a href="/transport/route">
                <h2 class="text-neutral-2">Route</h2>
            </a>
        </div>
    </div>
</header>

<section id="map">
    <div class='py-5 px-16'>
        <div class="map">
            <Map 
            accessToken = {accToken} 
            bind:this={map} 
            on:recentre={e => console.log(e.detail.center.lat, e.detail.center.lng) } 
            options = {{center,zoom:8}}
            on:ready={setupMap}
            >
                <Marker lat={-6.479478974609833} lng={105.65398972972787} color=#123123 label="TANJUNGJAYA" popupClassName="class-name" />
                <NavigationControl />
                <GeolocateControl options={{ some: 'control-option' }} />
                <ScalingControl />
            </Map>
            <div id="filter-group" class="filter-group flex flex-col" bind:this={filter}></div>
        </div>
    </div>
</section>



<style type="text/postcss">
#head{

}
.map {
    width: 100%;
    height: 30rem;
    border-radius: 1rem;
}
.filter-group {
    position: relative;
    font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
    font-weight: 600;
    z-index: 1;
    border-radius: 3px;
    width: 30%;
    color: #000;
    top: 50px
}

</style>

<script>
    let map;
    let tmp
    let place = null;
	let center = { lat: -6.299999999996217, lng: 106.37091064453239};
    let accToken = "pk.eyJ1IjoicHJhd2lyb2h0IiwiYSI6ImNrY240emwwYzA3c3EzNWxtNnphdWw3eXAifQ.2mr_hj5PC5uLIe5MLr2qBw";
    let layers
    let filter
    import { Map, Geocoder, Marker, controls } from '@beyonk/svelte-mapbox';
    const { GeolocateControl, NavigationControl, ScalingControl } = controls

    function addFilter(filter,layerID){
        var box = document.createElement('div');
        box.class = 'flex flex-row m-5 p-2';
        
        var input = document.createElement('input');
        input.type = 'checkbox';
        input.id = layerID;
        input.checked = true;
        
        var label = document.createElement('label');
        label.setAttribute('for', layerID);
        label.textContent = layerID;

        box.appendChild(input);
        box.appendChild(label);
        filter.appendChild(box);
        // When the checkbox changes, update the visibility of the layer.
        input.addEventListener('change', function(e) {
            tmp.setLayoutProperty(
                layerID,
                'visibility',
                e.target.checked ? 'visible' : 'none'
            );
        });
    }

    function addRoute(map, url,name){
        map.addSource(name, {
            'type': 'geojson',
            'data': "images/" + url
        });
        map.addLayer({
            'id': name,
            'type': 'line',
            'source': name,
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-color': '#123123',
                'line-width': 3
            }
        });
    }
    function addPoint(map, url,name){
        map.addSource(name, {
            'type': 'geojson',
            'data': "images/" + url
        });
        map.addLayer({
            'id': name,
            'type': 'circle',
            'source': name,
            'paint': {
                'circle-radius': 4.5,
                'circle-color': '#B42222'
            }
        });
        console.log(map.getSource(name))
        // map.getSource(name).forEach(function(marker) {
        //     // create a DOM element for the marker
        //     var el = document.createElement('div');
        //     el.className = 'marker';
        //     el.style.backgroundImage =
        //     'url(https://placekitten.com/g/' +
        //     marker.properties.iconSize.join('/') +
        //     '/)';
        //     el.style.width = marker.properties.iconSize[0] + 'px';
        //     el.style.height = marker.properties.iconSize[1] + 'px';
            
        //     el.addEventListener('click', function() {
        //         window.alert(marker.properties.message);
        //     });
            
        //     // add marker to map
        //     new map.Marker(el)
        //     .setLngLat(marker.geometry.coordinates)
        //     .addTo(map);
        // });
    }

    function setupMap(){
        console.log("test");
        tmp = map.getMap();

        
        // Angkot Mandala
        addRoute(tmp,"trans_route_angkot_mandala.geojson","Angkot Mandala")
        // Angkot Rangkasbitung
        addRoute(tmp,"trans_route_angkot_rangkasbitung.geojson","Angkot Rangkasbitung")
        // Bus AC
        addRoute(tmp,"trans_route_bus_ac.geojson","Bus AC")
        // Bus Non AC
        addRoute(tmp,"trans_route_bus_non_ac.geojson","Bus Non AC")
        // Damri
        addRoute(tmp,"trans_route_damri.geojson","Damri")
        // Damri AC
        addRoute(tmp,"trans_route_damri_ac.geojson","Damri AC")
        // ELF
        addRoute(tmp,"trans_route_elf.geojson","ELF")
        // KRL
        addRoute(tmp,"trans_route_krl.geojson","KRL")
        // Ojek
        addRoute(tmp,"trans_route_ojek.geojson","Ojek")
        // Bandara
        addPoint(tmp,"trans_point_bandara.geojson","Bandara")
        // Poin Penting
        addPoint(tmp,"trans_point_poin_penting.geojson","Poin Penting")
        // Stasiun KRL
        addPoint(tmp,"trans_point_stasiun_krl.geojson","Stasiun KRL")
        // Terminal Bis
        addPoint(tmp,"trans_point_terminal_bis.geojson","Terminal Bis")
        layers = tmp.getStyle().layers
        for (let index = 111; index < layers.length; index++){
            const element = layers[index];
            console.log(element)
            addFilter(filter,element.id)
        }
    }
</script>
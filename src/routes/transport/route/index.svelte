<svelte:head>
    <link href='https://api.mapbox.com/mapbox-gl-js/v1.11.1/mapbox-gl.css' rel='stylesheet' />
</svelte:head>

<header>
    <div class="py-5 px-5">
        <h1>Transportation</h1>
    </div>
    <br>
    <div class="flex flex-row py-5 px-5 m-5">
        <div class="py-5 px-5">
            <a href="/transport/map">
                <h2>Map</h2>
            </a>
        </div>
        <br>
        <div class="py-5 px-5">
            <a href="/transport/route">
                <h2>Route</h2>
            </a>
        </div>
    </div>
</header>

<section id="map">
    <div class='p-10'>
        <div class="map">
            <Map 
            accessToken = {accToken} 
            bind:this={map} 
            on:recentre={e => console.log(e.detail.center.lat, e.detail.center.lng) } 
            options = {{center,zoom:8}}
            on:ready={addData}
            >
                <Marker lat={-6.479478974609833} lng={105.65398972972787} color=#123123 label="TANJUNGJAYA" popupClassName="class-name" />
                <NavigationControl />
                <GeolocateControl options={{ some: 'control-option' }} />
                <ScalingControl />
            </Map>
        </div>
    </div>
</section>



<style type="text/postcss">

.map {
    width: 100%;
    height: 30rem;
    border-radius: 1rem;
}

</style>

<script>
    let map;
    let tmp
    let place = null;
	let center = { lat: -6.299999999996217, lng: 106.37091064453239};
    let accToken = "pk.eyJ1IjoicHJhd2lyb2h0IiwiYSI6ImNrY240emwwYzA3c3EzNWxtNnphdWw3eXAifQ.2mr_hj5PC5uLIe5MLr2qBw";
    let filterGroup
    import { Map, Geocoder, Marker, controls } from '@beyonk/svelte-mapbox';
    const { GeolocateControl, NavigationControl, ScalingControl } = controls

    function addFilter(layerID){
        var input = document.createElement('input');
        input.type = 'checkbox';
        input.id = layerID;
        input.checked = true;
        filterGroup.appendChild(input);
        
        var label = document.createElement('label');
        label.setAttribute('for', layerID);
        label.textContent = layerID;
        filterGroup.appendChild(label);
        
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
    }

    function addData(){
        console.log("test");
        tmp = map.getMap();

        // KRL
        addRoute(tmp,"trans_route_krl.geojson","KRL")
        // Angkot Mandala
        addRoute(tmp,"trans_route_angkot_mandala.geojson","Angkot_Mandala")
        // Angkot Rangkasbitung
        addRoute(tmp,"trans_route_angkot_rangkasbitung.geojson","Angkot_Rangkasbitung")
        // Bus AC
        addRoute(tmp,"trans_route_bus_ac.geojson","Bus_AC")
        // Bus Non AC
        addRoute(tmp,"trans_route_bus_non_ac.geojson","Bus_Non_AC")
        // Damri
        addRoute(tmp,"trans_route_damri.geojson","Damri")
        // Damri AC
        addRoute(tmp,"trans_route_damri_ac.geojson","Damri_AC")
        // ELF
        addRoute(tmp,"trans_route_elf.geojson","ELF")
        // Ojek
        addRoute(tmp,"trans_route_ojek.geojson","Ojek")
        // Bandara
        addPoint(tmp,"trans_point_bandara.geojson","Bandara")
        // Poin Penting
        addPoint(tmp,"trans_point_poin_penting.geojson","Poin_Penting")
        // Stasiun KRL
        addPoint(tmp,"trans_point_stasiun_krl.geojson","Stasiun_KRL")
        // Terminal Bis
        addPoint(tmp,"trans_point_terminal_bis.geojson","Terminal_Bis")
    }
</script>
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
    <div class="map p-10">
        <Map 
        accessToken = {accToken} 
        bind:this={map} 
        on:recentre={e => console.log(e.detail.center.lat, e.detail.center.lng) } 
        options = {{center,zoom:8}}
        on:ready={addData}
        >
            <!-- <Marker lat={center.lat} lng={center.lng} color=#123123 label="My Location :)" popupClassName="class-name" /> -->
            <NavigationControl />
            <GeolocateControl options={{ some: 'control-option' }} />
            <ScalingControl />
        </Map>
    </div>
    <nav id="filter-group" class="filter-group" bind:this={filterGroup}></nav>
</section>



<style type="text/postcss">

.map {
    width: 100%;
    height: 30rem;
    border-radius: 20px;
}

.filter-group {
    font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
    font-weight: 600;
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 1;
    border-radius: 3px;
    width: 120px;
    color: #fff;
    }
     
    .filter-group input[type='checkbox']:first-child + label {
    border-radius: 3px 3px 0 0;
    }
     
    .filter-group label:last-child {
    border-radius: 0 0 3px 3px;
    border: none;
    }
     
    .filter-group input[type='checkbox'] {
    display: none;
    }
     
    .filter-group input[type='checkbox'] + label {
    background-color: #3386c0;
    display: block;
    cursor: pointer;
    padding: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
    }
     
    .filter-group input[type='checkbox'] + label {
    background-color: #3386c0;
    text-transform: capitalize;
    }
     
    .filter-group input[type='checkbox'] + label:hover,
    .filter-group input[type='checkbox']:checked + label {
    background-color: #4ea0da;
    }
     
    .filter-group input[type='checkbox']:checked + label:before {
    content: '✔';
    margin-right: 5px;
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
    function addData(){
        console.log("test");
        tmp = map.getMap();

        // KRL
        tmp.addSource('KRL', {
            'type': 'geojson',
            'data': "images/trans_krl.geojson"
        });
        tmp.addLayer({
            'id': 'krl',
            'type': 'line',
            'source': 'KRL',
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-color': '#123123',
                'line-width': 3
            }
        });
        addFilter('krl')
        // Angkot Mandala
        tmp.addSource('Angkot_Mandala', {
            'type': 'geojson',
            'data': "images/trans_route_angkot_mandala.geojson"
        });
        tmp.addLayer({
            'id': 'angkotmandala',
            'type': 'line',
            'source': 'Angkot_Mandala',
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-color': '#123123',
                'line-width': 3
            }
        });

        // Angkot Rangkasbitung
        tmp.addSource('Angkot_Rangkasbitung', {
            'type': 'geojson',
            'data': "images/trans_route_angkot_rangkasbitung.geojson"
        });
        tmp.addLayer({
            'id': 'angkotrangkasbitung',
            'type': 'line',
            'source': 'Angkot_Rangkasbitung',
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-color': '#123123',
                'line-width': 3
            }
        });

        // Bus AC
        tmp.addSource('Bus_AC', {
            'type': 'geojson',
            'data': "images/trans_route_bus_ac.geojson"
        });
        tmp.addLayer({
            'id': 'busac',
            'type': 'line',
            'source': 'Bus_AC',
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-color': '#123123',
                'line-width': 3
            }
        });

        // Bus Non AC
        tmp.addSource('Bus_Non_AC', {
            'type': 'geojson',
            'data': "images/trans_route_bus_non_ac.geojson"
        });
        tmp.addLayer({
            'id': 'busnonac',
            'type': 'line',
            'source': 'Bus_Non_AC',
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-color': '#123123',
                'line-width': 3
            }
        });

        // Damri
        tmp.addSource('Damri', {
            'type': 'geojson',
            'data': "images/trans_route_damri.geojson"
        });
        tmp.addLayer({
            'id': 'damri',
            'type': 'line',
            'source': 'Damri',
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-color': '#123123',
                'line-width': 3
            }
        });

        // Damri AC
        tmp.addSource('Damri_AC', {
            'type': 'geojson',
            'data': "images/trans_route_damri_ac.geojson"
        });
        tmp.addLayer({
            'id': 'damriac',
            'type': 'line',
            'source': 'Damri_AC',
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-color': '#123123',
                'line-width': 3
            }
        });

        // ELF
        tmp.addSource('ELF', {
            'type': 'geojson',
            'data': "images/trans_route_elf.geojson"
        });
        tmp.addLayer({
            'id': 'elf',
            'type': 'line',
            'source': 'ELF',
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-color': '#123123',
                'line-width': 3
            }
        });

        // Ojek
        tmp.addSource('Ojek', {
            'type': 'geojson',
            'data': "images/trans_route_ojek.geojson"
        });
        tmp.addLayer({
            'id': 'ojek',
            'type': 'line',
            'source': 'Ojek',
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-color': '#123123',
                'line-width': 3
            }
        });

        // Bandara
        tmp.addSource('Bandara', {
            'type': 'geojson',
            'data': "images/trans_point_bandara.geojson"
        });
        tmp.addLayer({
            'id': 'bandara',
            'type': 'circle',
            'source': 'Bandara',
            'paint': {
                'circle-radius': 6,
                'circle-color': '#B42222'
            }
        });

        // Poin Penting
        tmp.addSource('Poin_Penting', {
            'type': 'geojson',
            'data': "images/trans_point_poin_penting.geojson"
        });
        tmp.addLayer({
            'id': 'poinpenting',
            'type': 'circle',
            'source': 'Poin_Penting',
            'paint': {
                'circle-radius': 6,
                'circle-color': '#B42222'
            }
        });

        // Stasiun KRL
        tmp.addSource('Stasiun_KRL', {
            'type': 'geojson',
            'data': "images/trans_point_stasiun_krl.geojson"
        });
        tmp.addLayer({
            'id': 'stasiunkrl',
            'type': 'circle',
            'source': 'Stasiun_KRL',
            'paint': {
                'circle-radius': 6,
                'circle-color': '#B42222'
            }
        });

        // Terminal Bis
        tmp.addSource('Terminal_Bis', {
            'type': 'geojson',
            'data': "images/trans_point_terminal_bis.geojson"
        });
        tmp.addLayer({
            'id': 'terminalbis',
            'type': 'circle',
            'source': 'Terminal_Bis',
            'paint': {
                'circle-radius': 6,
                'circle-color': '#B42222'
            }
        });

        
    }
</script>
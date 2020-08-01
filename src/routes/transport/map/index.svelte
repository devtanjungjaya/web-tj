<svelte:head>
    <link href='https://api.mapbox.com/mapbox-gl-js/v1.11.1/mapbox-gl.css' rel='stylesheet' />
</svelte:head>

<header>
    <div id="head" class="py-4 px-16">
        <h1 class="text-3xl md:text-4xl xl:text-5xl text-primary-7 font-bold">Transportasi</h1>
    </div>
    <div id="route" class="flex flex-row px-12 font-bold">
        <div class="py-4 px-4">
            <a href="/transport/map">
                <h2 class="text-primary-7">Peta</h2>
            </a>
        </div>
        <br>
        <div class="py-4 px-4">
            <a href="/transport/route">
                <h2 class="text-neutral-2">Rute</h2>
            </a>
        </div>
    </div>
</header>

<section id="map">
    <div class='mapbox py-4 px-4 sm:px-8 md:px-16 flex flex-row'>
        <div class="map">
            <Map 
            accessToken = {accToken} 
            bind:this={map} 
            on:recentre={e => console.log(e.detail.center.lat, e.detail.center.lng) } 
            options = {{center,zoom:8}}
            on:ready={setupMap}
            >
                <!-- <Marker lat={-6.479478974609833} lng={105.65398972972787} color=#123123 label="TANJUNGJAYA" popupClassName="class-name" /> -->
                <NavigationControl />
                <GeolocateControl options={{ some: 'control-option' }} />
                <ScalingControl />
            </Map>
            
        </div>
        <div id="filter-group" class="filter-group flex flex-col bg-neutral-1 relative">
            <div class="px-4 align-middle text-neutral-5 sm:text-md md:text-lg font-bold relative">
                <h1 class="relative">Legenda</h1>
            </div>
            <div class="filter flex flex-col" bind:this={filter}>
                
            </div>
        </div>
    </div>
</section>



<style type="text/postcss">
#head{

}
.mapbox {
    height: 35rem;
    border-radius: 1rem;
}
.map{
    width:75%;
    height:100%;
    border-radius: 1rem;
}
.filter-group {
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
    width: 25%;
    max-height: 100%;
    padding-top: 1rem;
}
.filter {
    overflow-y: auto;
    padding-top: 1rem;
}


</style>

<script>
    let map;
    let tmp;
	let center = { lat: -6.29776399217107, lng: 106.21788113715388};
    let accToken = "pk.eyJ1IjoicHJhd2lyb2h0IiwiYSI6ImNrY240emwwYzA3c3EzNWxtNnphdWw3eXAifQ.2mr_hj5PC5uLIe5MLr2qBw";
    let layers;
    let filter;
    import { Map, Geocoder, Marker, controls } from '@beyonk/svelte-mapbox';
    const { GeolocateControl, NavigationControl, ScalingControl } = controls

    function addFilter(filter,layerID,color){
        var box = document.createElement('div');
        box.className = 'box flex flex-row py-2 px-4 hover:text-primary-7 hover:bg-neutral-2 align-middle text-neutral-5 text-sm font-bold';

        var input = document.createElement('input');
        input.type = 'checkbox';
        input.id = layerID;
        input.checked = true;
        input.className = "opacity-0";
        
        var label = document.createElement('label');
        label.setAttribute('for', layerID);
        label.textContent = layerID;

        var check = document.createElement('span');
        // check.textContent = "✔"
        check.style.marginRight = "5px";
        check.style.backgroundColor = color;
        check.className = "h-5 w-5 justify-center"

        box.appendChild(input);
        box.appendChild(check);
        box.appendChild(label);
        filter.appendChild(box);
        // When the checkbox changes, update the visibility of the layer.
        
        input.addEventListener('change', function(e) {
            tmp.setLayoutProperty(
                layerID,
                'visibility',
                e.target.checked ? 'visible' : 'none'
            );
            if(input.checked) {
                // check.innerHTML = "✔"
                check.style.backgroundColor = color
                box.style.fontStyle = "normal"
            }
            if(!input.checked) {
                // check.innerHTML = ""
                check.style.backgroundColor = "white"
                box.style.fontStyle = "italic"
            }
        });
    }
    
    function addRoute(map, url,name,color){
        
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
                'line-color': color,
                'line-width': 3
            }
        });
        addFilter(filter,name,color);
    }
    
    function addPoint(map, url, name, size, degree){
        let alamatpalsu = url +".png"
        map.loadImage(alamatpalsu,function(error,image){
            if(error) throw error;
            map.addImage(name,image)
        })
        map.addSource(name, {
            type: 'geojson',
            data: "images/" + url + ".geojson",
            cluster: true,
            clusterMaxZoom: 9, // Max zoom to cluster points on
            clusterRadius: 25 
        });
        map.addLayer({
            'id': name,
            'source': name,
            'type': 'symbol',
            'layout': {
                'icon-image': name,
                'icon-size': size,
                'icon-rotate': degree,
                'icon-ignore-placement': true,
                'icon-anchor': "bottom",
                "icon-optional": true,
            }
        });
        addFilter(filter,name,"grey");
    }

    function setupMap(){
        tmp = map.getMap();
        // Angkot Mandala
        addRoute(tmp,"trans_route_angkot_mandala.geojson","Angkot Mandala","#106e79")
        // Angkot Rangkasbitung
        addRoute(tmp,"trans_route_angkot_rangkasbitung.geojson","Angkot Rangkasbitung","#ff5500")
        // Bus AC
        addRoute(tmp,"trans_route_bus_ac.geojson","Bus AC","#ff0093")
        // Bus Non AC
        addRoute(tmp,"trans_route_bus_non_ac.geojson","Bus Non AC","#7e00be")
        // Damri
        addRoute(tmp,"trans_route_damri.geojson","Damri","#0310fc")
        // Damri AC
        addRoute(tmp,"trans_route_damri_ac.geojson","Damri AC","#00b4ff")
        // ELF
        addRoute(tmp,"trans_route_elf.geojson","ELF","#00b74d")
        // KRL
        addRoute(tmp,"trans_route_krl.geojson","KRL","#02a300")
        // Ojek
        addRoute(tmp,"trans_route_ojek.geojson","Ojek","#90aa00")
        // Bandara
        addPoint(tmp,"trans_point_bandara","Bandara",0.04,180)
        // Poin Penting
        addPoint(tmp,"trans_point_poin_penting","Poin Penting",0.0175,0)
        // Stasiun KRL
        addPoint(tmp,"trans_point_stasiun_krl","Stasiun KRL",0.04,180)
        // Terminal Bis
        addPoint(tmp,"trans_point_terminal_bus","Terminal Bus",0.3,0)
        // layers = tmp.getStyle().layers
        // for (let index = 111; index < layers.length; index++){
        //     const element = layers[index];
        //     // console.log(element)
        //     addFilter(filter,element.id)
        // }
        // var uniqueFeatures = getUniqueFeatures(features, "Nama_Term"); 
        // uniqueFeatures.forEach(function(feature) {
        //     var prop = feature.properties;
        //     console.log(prop.icon);
        // })
    }
</script>
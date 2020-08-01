<svelte:head>
    <link href='https://api.mapbox.com/mapbox-gl-js/v1.11.1/mapbox-gl.css' rel='stylesheet' />
</svelte:head>

<header>
    <div id="head" class="py-5 px-16">
        <h1 class="text-3xl md:text-4xl xl:text-5xl text-primary-7 font-bold">Transportasi</h1>
    </div>
    <div id="route" class="flex flex-row px-12 font-bold">
        <div class="py-5 px-4">
            <a href="/transport/map">
                <h2 class="text-primary-7">Peta</h2>
            </a>
        </div>
        <br>
        <div class="py-5 px-4">
            <a href="/transport/route">
                <h2 class="text-neutral-2">Rute</h2>
            </a>
        </div>
    </div>
</header>

<section id="map">
    <div class='mapbox py-5 px-16 flex flex-row'>
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
            
        </div>
        <div id="filter-group" class="filter-group flex flex-col" bind:this={filter}></div>
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
    border-radius: 3px;
    width: 25%;
    height:100%;
    max-height: 100%;
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

    function addFilter(filter,layerID){
        var box = document.createElement('div');
        box.className = 'box flex flex-row p-2';
        var input = document.createElement('input');
        input.type = 'checkbox';
        input.id = layerID;
        input.checked = true;
        input.className = "opacity-0";
        
        var label = document.createElement('label');
        label.setAttribute('for', layerID);
        label.textContent = layerID;
        label.className = "justify-center text-neutral-5 text-sm hover:text-primary-7 font-bold"

        var checkmark = document.createElement('span');
        checkmark.className = "h-5 w-5 bg-neutral-2 hover:bg-neutral-5"

        box.appendChild(input);
        box.appendChild(checkmark);
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
    }
    function addPoint(map, url, name, size){
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
                'icon-rotate': 180,
                'icon-ignore-placement': true,
            }
        });
        let x = map.getSource(name);
        console.log(x);

        // // buat nambah marker
        // x.features.forEach(function(marker) {
        // // create a DOM element for the marker
        //     var el = document.createElement('div');
        //     el.className = 'marker';
        //     el.style.backgroundImage = 'images/trans_icon_bandara.png'
        //     el.style.width = "0.5rem";
        //     el.style.height = "0.5rem"; 
        //     el.style.display = "block";
        //     el.style.borderRadius = "50%";
        //     el.style.cursor= "pointer";
        //     el.style.padding= "0";
        //     el.addEventListener('click', function() {
        //         window.alert(marker.properties.message);
        //     });
            
        //     // add marker to map
        //     new mapboxgl.Marker(el)
        //     .setLngLat(marker.geometry.coordinates)
        //     .addTo(map);
        // });
    }

    function setupMap(){
        tmp = map.getMap();
        // Angkot Mandala
        addRoute(tmp,"trans_route_angkot_mandala.geojson","Angkot Mandala","red")
        // Angkot Rangkasbitung
        addRoute(tmp,"trans_route_angkot_rangkasbitung.geojson","Angkot Rangkasbitung","#123123")
        // Bus AC
        addRoute(tmp,"trans_route_bus_ac.geojson","Bus AC","#817e7f")
        // Bus Non AC
        addRoute(tmp,"trans_route_bus_non_ac.geojson","Bus Non AC","#13e6ec")
        // Damri
        addRoute(tmp,"trans_route_damri.geojson","Damri","#3bd52a")
        // Damri AC
        addRoute(tmp,"trans_route_damri_ac.geojson","Damri AC","#da7c25")
        // ELF
        addRoute(tmp,"trans_route_elf.geojson","ELF","#c936a2")
        // KRL
        addRoute(tmp,"trans_route_krl.geojson","KRL","#000000")
        // Ojek
        addRoute(tmp,"trans_route_ojek.geojson","Ojek","#001cff")
        // Bandara
        addPoint(tmp,"trans_point_bandara","Bandara",0.04)
        // Poin Penting
        addPoint(tmp,"trans_point_poin_penting","Poin Penting",0.01)
        // Stasiun KRL
        addPoint(tmp,"trans_point_stasiun_krl","Stasiun KRL",0.04)
        // Terminal Bis
        addPoint(tmp,"trans_point_terminal_bus","Terminal Bus",0.04)
        layers = tmp.getStyle().layers
        for (let index = 111; index < layers.length; index++){
            const element = layers[index];
            // console.log(element)
            addFilter(filter,element.id)
        }
        var features = tmp.queryRenderedFeatures({layers: ['Terminal Bus']});
        console.log(features)
        // var uniqueFeatures = getUniqueFeatures(features, "Nama_Term"); 
        // uniqueFeatures.forEach(function(feature) {
        //     var prop = feature.properties;
        //     console.log(prop.icon);
        // })
    }
</script>
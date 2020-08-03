<script>
    import { Map, Geocoder, Marker, controls } from '@beyonk/svelte-mapbox';
    import Legends from "./Legends.svelte";
    const { GeolocateControl, NavigationControl, ScalingControl } = controls
    const accToken = "pk.eyJ1IjoicHJhd2lyb2h0IiwiYSI6ImNrY240emwwYzA3c3EzNWxtNnphdWw3eXAifQ.2mr_hj5PC5uLIe5MLr2qBw";
    let map;
    let tmp;
	export let center = { lat: -6.29776399217107, lng: 106.21788113715388};
    let layers;
    let colors = [];
    let check = [];
    let type = [];
    let typeURL = [];
    $: innerWidth = 0;
    
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
                'line-width': 4
            }
        });
        colors.push(color)
        check.push(true)
        typeURL.push(url)
        type.push("route")
        // addFilter(filter,name);
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
            clusterMaxZoom: 8, // Max zoom to cluster points on
            clusterRadius: 35 
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
        colors.push("#0ED7CD")
        check.push(true)
        typeURL.push(url)
        type.push("point")
        // addFilter(filter,name);
    }

    function setupMap(){
        tmp = map.getMap();
        // Angkot Mandala
        addRoute(tmp,"trans_route_angkot_mandala.geojson","Angkot Mandala","#d2b87d")
        // Angkot Rangkasbitung
        addRoute(tmp,"trans_route_angkot_rangkasbitung.geojson","Angkot Rangkasbitung","#69b664")
        // Bus AC
        addRoute(tmp,"trans_route_bus_ac.geojson","Bus AC","#4d9a94")
        // Bus Non AC
        addRoute(tmp,"trans_route_bus_non_ac.geojson","Bus Non AC","#b99cf8")
        // Damri
        addRoute(tmp,"trans_route_damri.geojson","Damri","#003466")
        // Damri AC
        addRoute(tmp,"trans_route_damri_ac.geojson","Damri AC","#a6ce90")
        // ELF
        addRoute(tmp,"trans_route_elf.geojson","ELF","#ce4c4c")
        // KRL
        addRoute(tmp,"trans_route_krl.geojson","KRL","#b9bf51")
        // Ojek
        addRoute(tmp,"trans_route_ojek.geojson","Ojek","#ff953f")
        // Bandara
        addPoint(tmp,"trans_point_bandara","Bandara",0.3,0)
        // Poin Penting
        addPoint(tmp,"trans_point_poin_penting","Poin Penting",0.3,0)
        // Stasiun KRL
        addPoint(tmp,"trans_point_stasiun_krl","Stasiun KRL",0.3,0)
        // Terminal Bis
        addPoint(tmp,"trans_point_terminal_bus","Terminal Bus",0.3,0)
        layers = tmp.getStyle().layers
        
    }
</script>

<style type="text/postcss">
    .mapbox {
        border-radius: 1rem;
    }
    .map{
        width:75%;
        height:100%;
        border-top-left-radius: 1rem;
        border-bottom-left-radius: 1rem;
        border-right-width: 0;
        overflow: hidden;
    }
</style>
<div class='h-96 md:h-128 mapbox py-4 px-4 sm:px-8 md:px-16 flex flex-row'>
    <div class="map border-1 border-neutral-4">
        <Map 
        accessToken = {accToken} 
        bind:this={map} 
        on:recentre={e => console.log(e.detail.center.lat, e.detail.center.lng) } 
        options = {{center,zoom:8}}
        on:ready={setupMap}
        >
            <!-- <Marker lat={-6.479478974609833} lng={105.65398972972787} color=transparent label="TANJUNGJAYA" popupClassName="class-name" /> -->
            <GeolocateControl position={"top-right"} options={{ some: 'control-option' }} />
            <NavigationControl />
            <ScalingControl />
        </Map>
        
    </div>
    <Legends map={tmp} layers={layers} colors={colors} check={check} type={type} typeURL={typeURL}/>
</div>

<svelte:window bind:innerWidth></svelte:window>
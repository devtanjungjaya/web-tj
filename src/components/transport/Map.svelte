<script>
    import { Map, controls } from '@beyonk/svelte-mapbox';
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
                'line-width': 4,
                'line-offset': 2
            }
        });
        colors.push(color)
        check.push(true)
        typeURL.push(url)
        type.push("route")
        // addFilter(filter,name);
    }
    
    function addPoint(mapbox, map, url, name){
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
                'icon-size': 0.3,
                'icon-ignore-placement': true,
                'icon-anchor': "bottom",
                "icon-optional": true,
            }
        });
        colors.push("#0ED7CD")
        check.push(true)
        typeURL.push(url)
        type.push("point")
        map.on('click', name, function(e) {
            var coordinates = e.features[0].geometry.coordinates.slice();
            var description = e.features[0].properties.description;

            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            var htmltext;
            if(description)
                htmltext= '<div class="flex flex-col items-center text-center"> <div class="h-12 w-12 md:h-24 md:w-24"><img src="'+url+'.png" class="w-full h-full" alt=""></div><p class="w-auto px-1 max-w-xs">' + description +'</p></div>';
            else 
                htmltext = '<div class="flex flex-col items-center"> <div class="h-12 w-12 md:h-24 md:w-24"><img src="'+url+'.png" class="" alt=""></div><p class="w-auto px-1">' + name +'</p></div>';
            
            let popup=new mapbox.Popup({anchor:'top', closeButton:false, maxWidth:"8rem"})
            .setLngLat(coordinates)
            .setHTML(htmltext)
            popup.addTo(tmp);
        });
    }

    function setupMap(){
        tmp = map.getMap();
        let mapbox = map.getMapbox();
        // Angkot Mandala
        addRoute(tmp,"trans_route_angkot_mandala.geojson","Angkot Mandala","#C62828")
        // Angkot Rangkasbitung
        addRoute(tmp,"trans_route_angkot_rangkasbitung.geojson","Angkot Rangkasbitung","#FBC02D")
        // Bus AC
        addRoute(tmp,"trans_route_bus_ac.geojson","Bus AC","#26A69A")
        // Bus Non AC
        addRoute(tmp,"trans_route_bus_non_ac.geojson","Bus Non AC","#B39DDB")
        // Damri
        addRoute(tmp,"trans_route_damri.geojson","Damri Bandara","#0D47A1")
        // Damri Merak
        addRoute(tmp,"trans_route_damri_merak.geojson","Damri Merak","#424242")
        // Damri Serang
        addRoute(tmp,"trans_route_damri_ac.geojson","Damri Serang","#A5D6A7")
        // ELF
        addRoute(tmp,"trans_route_elf.geojson","ELF","#33691E")
        // KRL
        addRoute(tmp,"trans_route_krl.geojson","KRL","#9E9D24")
        // Ojek
        addRoute(tmp,"trans_route_ojek.geojson","Ojek","#E65100")
        // Bandara
        addPoint(mapbox,tmp,"trans_point_bandara","Bandara")
        // Poin Penting
        addPoint(mapbox,tmp,"trans_point_poin_penting","Tujuan Akhir")
        // Stasiun KRL
        addPoint(mapbox,tmp,"trans_point_stasiun_krl","Stasiun KRL")
        // Terminal Bis
        addPoint(mapbox,tmp,"trans_point_terminal_bus","Terminal Bus")
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
            <ScalingControl position={"top-left"}/>
        </Map>
    </div>
    <Legends map={tmp} layers={layers} colors={colors} check={check} type={type} typeURL={typeURL}/>
</div>
<div class="header px-4 sm:px-8 md:px-16 text-xs sm:text-sm md:text-base">
    <h5>Peta ini merupakan rute perjalanan menuju Tanjungjaya dari Jabodetabek, Serang, dan Merak.</h5>
</div>
<svelte:window bind:innerWidth></svelte:window>
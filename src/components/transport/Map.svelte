<script>
    import { Map, controls } from '@beyonk/svelte-mapbox';
    import Legends from "./Legends.svelte";
    import MapStyle from "./MapStyle.svelte";
    import { element } from 'svelte/internal';
    const { GeolocateControl, NavigationControl, ScalingControl } = controls
    const mapboxAccessToken = "MAPBOX_ACCESS_TOKEN";
    let map;
    let tmp;
	export let center = { lat: -6.29776399217107, lng: 106.21788113715388};
    let layers;
    let colors = [];
    let check = [];
    let type = [];
    let typeURL = [];
    let transportations = [
        { url:"trans_route_angkot_mandala", nama:"Angkot Mandala", warna: "#C62828"},
        { url:"trans_route_angkot_rangkasbitung", nama:"Angkot Rangkasbitung", warna: "#FBC02D" },
        { url:"trans_route_bus_ac", nama:"Bus AC", warna: "#26A69A" },
        { url:"trans_route_bus_non_ac", nama:"Bus Non AC", warna: "#B39DDB" },
        { url:"trans_route_damri", nama:"Damri Bandara", warna: "#0D47A1" },
        { url:"trans_route_damri_merak", nama:"Damri Merak", warna: "#424242" },
        { url:"trans_route_damri_ac", nama:"Damri Serang", warna: "#A5D6A7" },
        { url:"trans_route_elf", nama:"ELF", warna: "#33691E" },
        { url:"trans_route_krl", nama:"KRL", warna: "#9E9D24" },
        { url:"trans_route_ojek", nama:"Ojek", warna: "#E65100" },
    ]
    let points = [
        { url:"trans_point_bandara", nama:"Bandara"},
        { url:"trans_point_poin_penting", nama:"Tujuan Akhir"},
        { url:"trans_point_stasiun_krl", nama:"Stasiun KRL"},
        { url:"trans_point_terminal_bus", nama:"Terminal Bus"},
    ]
    $: innerWidth = 0;
    
    function addRoute(map, url,name,color){
        
        map.addSource(name, {
            'type': 'geojson',
            'data': "images/" + url + ".geojson"
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
        transportations.forEach(element => {
            addRoute(tmp,element.url,element.nama,element.warna)
        });
        points.forEach(element =>{
            addPoint(mapbox,tmp,element.url,element.nama)
        });
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
<div class='h-64 sm:h-96 md:h-128 mapbox py-4 px-4 sm:px-8 md:px-16 flex flex-row'>
    <div class="map border-1 border-neutral-1">
        <Map 
        accessToken = {mapboxAccessToken} 
        bind:this={map} 
        on:recentre={e => console.log(e.detail.center.lat, e.detail.center.lng) } 
        options = {{center,zoom:8}}
        on:ready={setupMap}
        >
            <!-- <Marker lat={-6.479478974609833} lng={105.65398972972787} color=transparent label="TANJUNGJAYA" popupClassName="class-name" /> -->
            <GeolocateControl position={"top-right"} options={{ some: 'control-option' }} />
            <NavigationControl />
            <!-- <MapStyle map={tmp}/> -->
        </Map>
    </div>
    <Legends map={tmp} layers={layers} colors={colors} check={check} type={type} typeURL={typeURL}/>
</div>
<div class="header px-4 sm:px-8 md:px-16 text-md sm:text-lg md:text-xl text-neutral-5">
    <h5>Peta ini merupakan rute perjalanan menuju Tanjungjaya dari Jabodetabek, Serang, dan Merak.</h5>
</div>
<svelte:window bind:innerWidth></svelte:window>
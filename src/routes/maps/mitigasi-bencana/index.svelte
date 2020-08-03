<svelte:head>
    <link href='https://api.mapbox.com/mapbox-gl-js/v1.11.1/mapbox-gl.css' rel='stylesheet' />
</svelte:head>

<h1>Hello</h1>

<section>
    <div class="mapbox py-5 px-16 flex flex-row">
        <div class="map">
            <Map
                accessToken = {accToken}
                bind:this = {map}
                options = {{center,zoom:12}}
            >
            <Tsunami />
            </Map>
        </div>
    </div>
</section>

<style type="text/postcss">
    .map{
        width: 75%;
        height: 100%;
    }
    .mapbox{
        height: 35rem;
    }
</style>

<script id="map">
    import { Map, Geocoder, Marker, controls } from '@beyonk/svelte-mapbox'
    import Tsunami from './Tsunami.svelte'
    import Gempa from './Gempa.svelte'
    import Banjir from './Banjir.svelte'
    
    const { GeolocateControl, NavigationControl, ScalingControl } = controls

    let accToken = "pk.eyJ1IjoiZmVsaXgyNSIsImEiOiJja2Q0MWZrMmcwMjBkMnpzODFjYW1vbG83In0.IKpXqrohe3JR1bKq_3JSDA"
    let map;
    let center = { lat: -6.5116, lng: 105.6530};
    
    // function setupMap(){
    //     tmp = map.getMap();
        
    // }
</script>

<script>
    import { Map, controls } from '@beyonk/svelte-mapbox';
    import Legends from "./Legends.svelte";
    import MapStyle from "./MapStyle.svelte";
    import { element } from 'svelte/internal';
    import Transport from './Transport.svelte';
    import Location from './Location.svelte';
    const { GeolocateControl, NavigationControl, ScalingControl } = controls
    const mapboxAccessToken = "MAPBOX_ACCESS_TOKEN";
    let map;
    export let center = { lat: -6.2786535914060835, lng: 106.65458768013718};
    
    $: innerWidth = 0;
    
</script>

<style type="text/postcss">
    
</style>
<div class='h-64 sm:h-96 md:h-128 mapbox py-4 px-4 sm:px-8 md:px-16 flex flex-row'>
    <div class="map border-1 border-neutral-1 w-full overflow-hidden rounded-2xl">
        <Map 
        accessToken = {mapboxAccessToken} 
        bind:this={map} 
        options = {{center,zoom:8,attributionControl:false}}
        >
            <!-- <Marker lat={-6.479478974609833} lng={105.65398972972787} color=transparent label="TANJUNGJAYA" popupClassName="class-name" /> -->
            <GeolocateControl position={"top-left"} options={{ some: 'control-option' }} />
            <NavigationControl position={"top-left"}/>
            <Transport tmp={map}></Transport>
            <Location tmp={map}></Location>
            <Legends tmp={map}/>
            <!-- <MapStyle map={tmp}/> -->
        </Map>
    </div>
    
</div>
<div class="header px-4 sm:px-8 md:px-16 text-md sm:text-lg md:text-xl text-neutral-5">
    <h5>Peta ini merupakan rute perjalanan menuju Tanjungjaya dari Jabodetabek, Serang, dan Merak.</h5>
</div>
<svelte:window bind:innerWidth></svelte:window>
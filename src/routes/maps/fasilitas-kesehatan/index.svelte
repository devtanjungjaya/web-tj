
<section>
    <div class="mapbox py-5 px-16 flex flex-row rounded-2xl">
        <div class="map w-3/4 h-96 overflow-hidden rounded-l-2xl">
            <Map
                accessToken = {mapboxAccessToken}
                bind:this = {map}
                options = {{center,zoom:9}}
            >
            <NavigationControl />
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
    const { GeolocateControl, NavigationControl, ScalingControl } = controls
    const mapboxAccessToken = "MAPBOX_ACCESS_TOKEN";
    let map;
    let center = { lat: -6.5116, lng: 105.6530};
</script>

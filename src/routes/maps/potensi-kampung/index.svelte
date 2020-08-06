
<section>
    <div class="h-64 sm:h-96 md:h-128 mapbox py-4 px-4 sm:px-8 md:px-16 flex flex-row rounded-lg">
        <div class="map border-1 border-neutral-1 w-3/4 h-96 overflow-hidden rounded-l-lg">
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
</style>

<script id="map">
    import { Map, Geocoder, Marker, controls } from '@beyonk/svelte-mapbox'
    const { GeolocateControl, NavigationControl, ScalingControl } = controls
    const mapboxAccessToken = "MAPBOX_ACCESS_TOKEN";
    let map;
    let center = { lat: -6.5116, lng: 105.6530};
</script>


<Header url="mitigasi-bencana"/>

<section>
    <div class="h-64 sm:h-96 md:h-128 mapbox py-4 px-4 sm:px-8 md:px-16 flex flex-row rounded-2xl">
        <div class="map border-1 border-neutral-1 w-3/4 h-96 overflow-hidden rounded-l-2xl">
            <Map
                accessToken = {mapboxAccessToken}
                bind:this = {map}
                options = {{center,zoom:9}}
                style="mapbox://styles/mapbox/light-v10"
            >
                <NavigationControl />
                <Tsunami tmp={map}/>
                <Gempa tmp={map}/>
                <Banjir tmp={map}/>
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
    import Tsunami from '../../../components/maps//Tsunami.svelte'
    import Gempa from '../../../components/maps/Gempa.svelte'
    import Banjir from '../../../components/maps/Banjir.svelte'
    import Header from '../../../components/maps/Header.svelte'
    
    const { GeolocateControl, NavigationControl, ScalingControl } = controls
    const mapboxAccessToken = "MAPBOX_ACCESS_TOKEN";
    let map;
    let center = { lat: -6.5116, lng: 105.6530};

    const title = "Peta-Peta Khusus Buffer Zone KEK Tanjung Lesung"
    const description = "Peta-Peta Khusus Buffer Zone KEK Tanjung Lesung"
</script>

<svelte:head>
   <title>{title}</title>
   <meta name="description" content={description} />
   <meta property="og:title" content={title} />
   <meta property="og:type" content="website" />
   <meta property="og:description" content={description} />
   <meta property="og:image" content="images/landing-1.webp" />
   <meta name="twitter:title" content={title}>
   <meta name="twitter:description" content={description}>
   <meta name="twitter:image" content="images/landing-1.webp">
</svelte:head>

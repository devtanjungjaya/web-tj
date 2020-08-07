<Header url="fasilitas-kesehatan"/>
<section>
    <div class="h-64 sm:h-96 md:h-128 mapbox py-4 px-4 sm:px-8 md:px-16 flex flex-row">
        <div class="map border-1 border-neutral-1 w-full overflow-hidden rounded-2xl">
            <Map
                accessToken = {mapboxAccessToken}
                bind:this = {map}
                options = {{center,zoom:9}}
            >
            <NavigationControl position="top-left"/>
            <Legends map={map.getMap()} layers={map.getMap().getStyle().layers} colors={colors} check={check} type={type} typeURL={typeURL}/>
            </Map>
        </div>
    </div>
</section>


<style type="text/postcss">

</style>

<script id="map">
    import { Map, Geocoder, Marker, controls } from '@beyonk/svelte-mapbox'
    import Header from '../../../components/maps/Header.svelte'
    import Legends from '../../../components/maps/Legends.svelte'

    const { GeolocateControl, NavigationControl, ScalingControl } = controls
    const mapboxAccessToken = "MAPBOX_ACCESS_TOKEN";
    let map;
    let center = { lat: -6.5116, lng: 105.6530};
    let colors = []
    let check = []
    let type = []
    let typeURL = []
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
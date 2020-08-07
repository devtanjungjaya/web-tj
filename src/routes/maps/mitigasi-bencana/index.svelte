<style type="text/postcss">

</style>

<script id="map">
    import { Map, Geocoder, Marker, controls } from '@beyonk/svelte-mapbox'
    import Legends from '../../../components/maps/Legends.svelte'
    import Batasdesa from '../../../components/maps/Batasdesa.svelte'
    import Tsunami from '../../../components/maps//Tsunami.svelte'
    import Gempa from '../../../components/maps/Gempa.svelte'
    import Banjir from '../../../components/maps/Banjir.svelte'
    import Header from '../../../components/maps/Header.svelte'
    
    const { GeolocateControl, NavigationControl, ScalingControl } = controls
    const mapboxAccessToken = "MAPBOX_ACCESS_TOKEN";
    let map;
    let center = { lat: -6.493857222350371, lng: 105.7747242749806}; 
    let colors = [
        "#123123",
        "#321321",
    ]
    let check = [
        true,
        true,
    ]
    let type = [
        "fill","circle"
    ]
    let typeURL = [
        "",""
    ]
    let tmp = [];
    let layers = [];
    function setupMap(){
        console.log("aserehe")
        tmp = map.getMap();
        layers = tmp.getStyle().layers;
        console.log(layers)
    }
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


<Header url="mitigasi-bencana"/>

<section>
    <div class="h-64 sm:h-96 md:h-128 mapbox py-4 px-4 sm:px-8 md:px-16 flex flex-row rounded-2xl">
        <div class="map border-1 border-neutral-1 w-full h-96 overflow-hidden rounded-2xl">
            <Map
                accessToken = {mapboxAccessToken} 
                bind:this={map}
                on:recentre={e => console.log(e.detail.center.lat, e.detail.center.lng) } 
                options = {{center,zoom:9}}
                on:ready={setupMap}
            >
                <NavigationControl position="top-left"/>
                <Batasdesa tmp={map}/>
                <Tsunami tmp={map}/>
                <Gempa tmp={map}/>
                <Banjir tmp={map}/>
                <Legends map={map.getMap()} layers={map.getMap().getStyle().layers} colors={colors} check={check} type={type} typeURL={typeURL}/>
            </Map>
        </div>
    </div>
</section>


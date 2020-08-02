<script>
    import { Map, Geocoder, Marker, controls } from '@beyonk/svelte-mapbox';
    const { GeolocateControl, NavigationControl, ScalingControl } = controls
    const accToken = "pk.eyJ1IjoicHJhd2lyb2h0IiwiYSI6ImNrY240emwwYzA3c3EzNWxtNnphdWw3eXAifQ.2mr_hj5PC5uLIe5MLr2qBw";
    let map;
    let tmp;
	export let center = { lat: -6.29776399217107, lng: 106.21788113715388};
    let layers;
    let colors = [];
    let check = [];
    $: innerWidth = 0;

    function changeFunc(id,checked){
        tmp.setLayoutProperty(
            id,
            'visibility',
            checked ? 'none' : 'visible'
        );
    };

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
                'line-width': 3
            }
        });
        colors.push(color)
        check.push(true)
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
        // addFilter(filter,name);
    }

    function setupMap(){
        tmp = map.getMap();
        // Angkot Mandala
        addRoute(tmp,"trans_route_angkot_mandala.geojson","Angkot Mandala","#106e79")
        // Angkot Rangkasbitung
        addRoute(tmp,"trans_route_angkot_rangkasbitung.geojson","Angkot Rangkasbitung","#ff5500")
        // Bus AC
        addRoute(tmp,"trans_route_bus_ac.geojson","Bus AC","#ff0093")
        // Bus Non AC
        addRoute(tmp,"trans_route_bus_non_ac.geojson","Bus Non AC","#7e00be")
        // Damri
        addRoute(tmp,"trans_route_damri.geojson","Damri","#0310fc")
        // Damri AC
        addRoute(tmp,"trans_route_damri_ac.geojson","Damri AC","#00b4ff")
        // ELF
        addRoute(tmp,"trans_route_elf.geojson","ELF","#00b74d")
        // KRL
        addRoute(tmp,"trans_route_krl.geojson","KRL","#02a300")
        // Ojek
        addRoute(tmp,"trans_route_ojek.geojson","Ojek","#90aa00")
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
    height: 24rem;
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
.filter-group {
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
    width: 25%;
    max-height: 100%;
    padding-top: 1rem;
    border-left-width: 0;
    overflow: hidden;
}
.legenda {
    border-top-width: 0;
    border-left-width: 0;
    border-right-width: 0;
    padding-bottom: 1rem;
}
.filter {
    height: 100%;
    overflow-y: auto;
    padding-top: 1rem;
    font-size: 0.625rem;
}
.box {
    border-top-width: 0;
    border-left-width: 0;
    border-right-width: 0;
}
.checkbox {
    width: 100%;
    height: 100%;
    min-width: 100%;
    min-height: 100%;
}
</style>
<div class='mapbox py-4 px-4 sm:px-8 md:px-16 flex flex-row'>
    <div class="map border-1 border-neutral-4">
        <Map 
        accessToken = {accToken} 
        bind:this={map} 
        on:recentre={e => console.log(e.detail.center.lat, e.detail.center.lng) } 
        options = {{center,zoom:8}}
        on:ready={setupMap}
        >
            <!-- <Marker lat={-6.479478974609833} lng={105.65398972972787} color=transparent label="TANJUNGJAYA" popupClassName="class-name" /> -->
            <NavigationControl />
            <GeolocateControl options={{ some: 'control-option' }} />
            <ScalingControl />
        </Map>
        
    </div>
    <div id="filter-group" class="filter-group flex flex-col relative border-1 border-neutral-4">
        <div class="legenda border-1 border-neutral-2 px-2 sm:px-4 align-middle text-primary-7 text-xs sm:text-base md:text-lg font-bold relative">
            <h1 class="relative">Legenda</h1>
        </div>
        <div class="filter flex flex-col text-primary-6 p-0">
            {#each colors as color,i }
                {#if check[i]}
                    {#if innerWidth > 640}
                        <label class='box flex flex-row py-2 px-2 hover:text-primary-7 hover:bg-neutral-2 text-neutral-5 font-bold border-1 border-neutral-1 items-center last:border-0 sm:text-xs md:text-sm'>
                            <div class="h-3 w-3">
                                <div class="relative checkbox align-middle mx-1 rounded-full" style="--theme-color: {color}; background-color: var(--theme-color);"></div>
                            </div>
                            <input type="checkbox" class= "opacity-0" on:change={changeFunc(layers[111+i].id,check[i])} bind:checked={check[i]}>
                            <p class="overflow-hidden">{layers[111+i].id}</p>
                        </label>
                    {:else}
                        <label class='box flex flex-row py-2 px-2 hover:text-primary-7 hover:bg-neutral-2 align-middle text-neutral-5 font-bold border-2 items-center'  style="--theme-color: {color}; border-color: var(--theme-color);">
                            <p class="overflow-hidden">{layers[111+i].id}</p>
                            <input type="checkbox" class= "opacity-0" on:change={changeFunc(layers[111+i].id,check[i])} bind:checked={check[i]}>
                        </label>
                    {/if}
                {:else}
                    {#if innerWidth > 640}
                        <label class='box flex flex-row py-2 px-2 hover:text-primary-7 hover:bg-neutral-2 text-neutral-5 border-1 border-neutral-1 italic items-center last:border-0 sm:text-xs md:text-sm'>
                            <div class="h-3 w-3">
                                <div class="checkbox align-middle h-3 w-3 mx-1 bg-neutral-1 text-neutral-1 rounded-full"></div>
                            </div>
                            <input id={layers[111+i].id} type="checkbox" class= "opacity-0"  on:change={changeFunc(layers[111+i].id,check[i])} bind:checked={check[i]}>
                            <p class="overflow-hidden">{layers[111+i].id}</p>
                        </label>
                    {:else}
                    <label class='box flex flex-row py-2 px-2 hover:text-primary-7 hover:bg-neutral-2 text-neutral-5 border-1 border-neutral-1 italic items-center'>
                        <p class="w-full overflow-hidden">{layers[111+i].id}</p>
                        <input id={layers[111+i].id} type="checkbox" class= "opacity-0"  on:change={changeFunc(layers[111+i].id,check[i])} bind:checked={check[i]}>
                    </label>
                    {/if}
                    
                {/if}
            {/each}
        </div>
    </div>
</div>

<svelte:window bind:innerWidth></svelte:window>
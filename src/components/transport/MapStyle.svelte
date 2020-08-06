<script>
    export let map;
    let mapStyles =[
        {
            name:"streets",
            url:"mapbox://styles/mapbox/streets-v11"
        },{
            name:"light",
            url:"mapbox://styles/mapbox/light-v10"
        },{
            name:"dark",
            url:"mapbox://styles/mapbox/dark-v10"
        },{
            name:"outdoors",
            url:"mapbox://styles/mapbox/outdoors-v11"
        },{
            name:"satelite",
            url:"mapbox://styles/mapbox/satellite-v9"
        },
    ]
    function changeFunc(mapStyle){
        map.setStyle(mapStyle.url)
    }
</script>

<div class="z-100">
    <ul>
        {#each mapStyles as mapStyle,i}
        <li>
            {#if i == 0}
                <input id={mapStyle.name} type="radio" checked="checked">   
                {:else}
                <input id={mapStyle.name} type="radio">
            {/if}
            <label class="" for={mapStyle.name} on:click={changeFunc(mapStyle)}>
                {mapStyle.name}
            </label>
        </li>    
        {/each}
    </ul>
</div>
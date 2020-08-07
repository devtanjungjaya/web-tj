<script>
    export let tmp;
    let map = tmp.getMap();
    import { data } from "./DataKesehatan.svelte"
    data.forEach(element => {
        map.addSource(element.name,{
            type:"geojson",
            data: element.url
        })
        map.addLayer({

        })
    });
</script>
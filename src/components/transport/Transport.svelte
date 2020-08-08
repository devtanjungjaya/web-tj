<script>
    export let tmp;
    let map = tmp.getMap();
    import { dataTransportasi } from "./Data.svelte"
    dataTransportasi.forEach(element => {
        map.addSource(element.name, {
            'type': 'geojson',
            'data': "images/" + element.url + ".geojson"
        });
        map.addLayer({
            'id': element.name,
            'type': 'line',
            'source': element.name,
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-color': element.color,
                'line-width': 4,
                'line-offset': 2
            }
        });
    });
</script>
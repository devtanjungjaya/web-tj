<script>
    import { getContext } from 'svelte';
    import { key } from './mapbox.js';

    console.log('1')

    const { getMap } = getContext(key);

    const map = getMap();

    map.addSource('gempa',{
        'type': 'geojson',
        'data': "images/"
    })
    map.addLayer({
        
    })

    console.log('1')
</script>


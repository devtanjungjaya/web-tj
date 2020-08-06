<script>
    import { getContext } from 'svelte';
    import { key } from './mapbox.js';

    const { getMap } = getContext(key);

    let map = getMap();

    map.addSource('tsunami',{
        'type': 'geojson',
        'data': "images/peta-tsunami.geojson"
    })
    map.addLayer({
        'id': 'tsunami',
        'type': 'heatmap',
        'source': 'tsunami',
        'layout': {
            
        },
        'paint': {
            'heatmap-weight':[

            ],
            'heatmap-intensity': [

            ],
            'heatmap-color': [

            ]
        }
    })

</script>
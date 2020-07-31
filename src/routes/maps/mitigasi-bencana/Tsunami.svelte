<script>
    import map from './index.svelte'
    
    let peta = map.getMap();

    peta.addSource('tsunami',{
        'type': 'geojson',
        'data': "images/peta-tsunami.geojson"
    })
    peta.addLayer({
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
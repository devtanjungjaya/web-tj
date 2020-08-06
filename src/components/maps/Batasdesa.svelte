<script>
    export let tmp;
    let map = tmp.getMap();
    name = 'Batas Desa Tanjungjaya';

    map.addSource(name,{
        'type': 'geojson',
        'data': "images/peta-batas-desa.geojson"
    })
    map.addLayer({
        'id': name,
        'type': 'fill',
        'source': name,
        'layout': {
            
        },
        'paint': {
            'fill-color': '#088',
            'fill-opacity': 0.4
        }
    })

</script>
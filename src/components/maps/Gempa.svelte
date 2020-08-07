<script>
    export let tmp;
    let map = tmp.getMap();
    name = 'Titik Gempa Sekitar Tanjungjaya';

    map.addSource(name,{
        'type': 'geojson',
        'data': "images/peta-titik-gempa.geojson",
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 25 
    })
    map.addLayer({
        'id': name,
        'source': name,
        'type': 'circle',
        paint: {
            'circle-color': [
                'step',
                ['get', 'point_count'],
                '#51bbd6',
                100,
                '#f1f075',
                750,
                '#f28cb1'
            ],
            'circle-radius': [
                'step',
                ['get', 'point_count'],
                20,
                100,
                30,
                750,
                40
            ]
        }
    })
</script>


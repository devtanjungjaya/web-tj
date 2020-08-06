<script>
    export let tmp;
    let map = tmp.getMap();
    name = 'gempa';

    let alamatpalsu = "trans_point_stasiun_krl.png"
        map.loadImage(alamatpalsu,function(error,image){
            if(error) throw error;
            map.addImage(name,image)
        })
    map.addSource(name,{
        'type': 'geojson',
        'data': "images/trans_point_stasiun_krl.geojson"
    })
    map.addLayer({
        'id': name,
        'source': name,
        'type': 'symbol',
        'layout': {
            'icon-image': name,
            'icon-size': 0.3,
            'icon-ignore-placement': true,
            'icon-anchor': "bottom",
            "icon-optional": true,
        }
    })
</script>


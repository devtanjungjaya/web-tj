<script>
    export let tmp;
    let map = tmp.getMap();
    let mapbox = tmp.getMapbox();
    import { dataLokasi, dataBiaya } from "./Data.svelte"
    dataLokasi.forEach(element => {
        let alamatpalsu = element.url +".png"
        map.loadImage(alamatpalsu,function(error,image){
            if(error) throw error;
            map.addImage(element.name,image)
        })
        map.addSource(element.name, {
            type: 'geojson',
            data: "images/" + element.url + ".geojson",
            cluster: true,
            clusterMaxZoom: 8, // Max zoom to cluster points on
            clusterRadius: 35 
        });
        map.addLayer({
            'id': element.name,
            'source': element.name,
            'type': 'symbol',
            'layout': {
                'icon-image': element.name,
                'icon-size': 0.3,
                'icon-ignore-placement': true,
                'icon-anchor': "center",
                "icon-optional": true,
            }
        });
        map.on('click', element.name, function(e) {
            var coordinates = e.features[0].geometry.coordinates.slice();
            var description = e.features[0].properties.description;
            map.flyTo({
                    center: [
                        coordinates[0],
                        coordinates[1]
                    ],
                    essential:true
                })
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
            var htmltext;
            htmltext= '<div class="flex flex-col items-center text-center max-h-2xs overflow-y-auto"> '
                        + '<p class="w-full py-1 px-1 text-primary-7 font-extrabold text-sm">' + description +'</p>';
            htmltext = htmltext + '</div>';
            let popup=new mapbox.Popup({anchor:'bottom', closeButton:false, maxWidth:"12rem"})
            .setLngLat(coordinates)
            .setHTML(htmltext)
            if(description)popup.addTo(map);
        });
    });
</script>
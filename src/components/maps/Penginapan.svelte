<script>
    export let tmp;
    let map = tmp.getMap();
    let mapbox = tmp.getMapbox();
    import { data } from "./DataPenginapan.svelte"
    data.forEach(element => {
        if(element.type == "fill"){
            map.addSource(element.name,{
                type:"geojson",
                data: "images/"+element.url+".geojson"
            })
            map.addLayer({
                'id': element.name,
                'source': element.name,
                'type': 'fill',
                'paint': {
                    'fill-opacity': 0.8,
                    'fill-color': element.color
                }
            })
        }
        else{
            let alamatpalsu = element.url + ".png"
            map.loadImage(alamatpalsu,function(error,image){
                if(error) throw error;
                map.addImage(element.name,image)
            })
            map.addSource(element.name,{
                type:"geojson",
                data: "images/"+element.url+".geojson",
                cluster: true,
                clusterMaxZoom: 10, // Max zoom to cluster points on
                clusterRadius: 35
            })
            map.addLayer({
                'id': element.name,
                'source': element.name,
                'type': 'symbol',
                'layout': {
                    'icon-image': element.name,
                    'icon-size': 0.3,
                    'icon-ignore-placement': true,
                    "icon-optional": true,
                }
            })
            map.on('click', element.name, function(e) {
                var coordinates = e.features[0].geometry.coordinates.slice();
                map.flyTo({
                    center: [
                        coordinates[0],
                        coordinates[1]
                    ],
                    essential:true
                })
                var title = e.features[0].properties.title;
                var description = e.features[0].properties.description;
                
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }

                var htmltext;
                htmltext= '<div class="flex flex-col items-center text-center">' 
                        + '<p class="w-auto px-1 max-w-xs text-center text-primary-7 font-bold">'+ title +'</p>'
                        +'<p class="w-1/3 mr-1 font-bold">Nomor:</p>'
                        +'<p class="w-auto px-1 max-w-xs text-center">'+ description +'</p>'
                        +'</div>';

                let popup=new mapbox.Popup({anchor:'bottom', closeButton:false, maxWidth:"12rem"})
                .setLngLat(coordinates)
                .setHTML(htmltext)
                if(title) popup.addTo(map);
            });
        }

    });
</script>
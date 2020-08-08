<script>
    export let tmp;
    let map = tmp.getMap();
    let mapbox = tmp.getMapbox()
    import { data } from "./DataKesehatan.svelte"
    data.forEach(element => {
        console.log(element)
        map.addSource(element.name,{
            type:"geojson",
            data: "images/"+element.url+".geojson"
        })
        map.addLayer({
            'id': element.name,
            'source': element.name,
            'type': 'circle',
            'paint': {
                'circle-radius': 6,
                'circle-color': element.color
            },
        })
        map.on('click', element.name, function(e) {
            var coordinates = e.features[0].geometry.coordinates.slice();
            var nama = e.features[0].properties.nama;
            var alamat = e.features[0].properties.alamat;
            var jenis = e.features[0].properties.jenis;
            var poli = e.features[0].properties.poli;
            var ugd = e.features[0].properties.ugd;
            var fasilitas = e.features[0].properties.fasilitas;
            var nomor = e.features[0].properties.nomor;
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            var htmltext;
            if(element.name == "Apotek")
                htmltext= '<div class="flex flex-col items-center text-center">' 
                        + '<p class="w-auto px-1 max-w-xs text-center text-primary-7 font-bold">'+ nama +'</p>'
                        +'<p class="w-auto px-1 max-w-xs text-center">'+ alamat +'</p>'
                        +'</div>';
            else 
                htmltext = '<div class="flex flex-col items-center max-h-2xs overflow-y-auto">' 
                        + '<p class="w-auto px-1 text-center text-primary-7 font-bold">'+ nama +'</p>'
                        + '<div class="flex flex-row w-full px-1">'
                            +'<p class="w-1/3 mr-1 font-bold">Alamat:</p>'
                            +'<p class="w-2/3">'+ alamat +'</p>'
                        +'</div>'
                        + '<div class="flex flex-row w-full px-1">'
                            +'<p class="w-1/3 mr-1 font-bold">Jenis:</p>'
                            +'<p class="w-2/3">'+ jenis +'</p>'
                        +'</div>'
                        + '<div class="flex flex-row w-full px-1">'
                            +'<p class="w-1/3 mr-1 font-bold">Poli:</p>'
                            +'<p class="w-2/3">'+ poli +'</p>'
                        +'</div>'
                        + '<div class="flex flex-row w-full px-1">'
                            +'<p class="w-1/3 mr-1 font-bold">UGD:</p>'
                            +'<p class="w-2/3">'+ ugd +'</p>'
                        +'</div>'
                        + '<div class="flex flex-row w-full px-1">'
                            +'<p class="w-1/3 mr-1 font-bold">Fasilitas:</p>'
                            +'<p class="w-2/3">'+ fasilitas +'</p>'
                        +'</div>'
                        + '<div class="flex flex-row w-full px-1">'
                            +'<p class="w-1/3 mr-1 font-bold">Nomor:</p>'
                            +'<p class="w-2/3">'+ nomor +'</p>'
                        +'</div>'
                        +'</div>';
            
            let popup=new mapbox.Popup({anchor:'bottom', closeButton:false, maxWidth:"12rem"})
            .setLngLat(coordinates)
            .setHTML(htmltext)
            popup.addTo(map);
        });
    });
</script>
<script>
    export let tmp;
    let map = tmp.getMap();
    let data = [
        {
            name:"",
            url:"",
            color:"",
        },
    ]

    data.forEach(element => {
        map.addSource(element.name,{
            type:"geojson",
            data: element.url
        })
        map.addLayer({

        })
    });
</script>
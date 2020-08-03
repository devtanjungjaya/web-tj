<script>
    let kendaraan = [   
        {name: "KRL", rutes: [], prices: [] },
        {name: "Damri", rutes: [], prices: [] },
        {name: "Bus AC", rutes: [], prices: [] },
        {name: "Bus Non-AC", rutes: [], prices: [] },
        {name: "Angkot Rangkasbitung", rutes: [], prices: [] },
        {name: "Angkot Mandala", rutes: [], prices: [] },
        {name: "ELF Minibus Non-AC", rutes: [], prices: [] },
        {name: "Ojek", rutes: [], prices: [] }
    ]
    
    function addDetails(nama,rute,biaya){
        let tmp = 0;
        if(nama == "KRL") tmp = 0;
        if(nama == "Damri") tmp = 1;
        if(nama == "Bus AC") tmp = 2;
        if(nama == "Bus Non-AC") tmp = 3;
        if(nama == "Angkot Rangkasbitung") tmp = 4;
        if(nama == "Angkot Mandala") tmp = 5;
        if(nama == "ELF Minibus Non-AC") tmp = 6;
        if(nama == "Ojek") tmp = 7;
        kendaraan[tmp].rutes.push(rute)
        kendaraan[tmp].prices.push(biaya)
    }
    
    addDetails("KRL","Bogor (St. Bogor - St. Tanah Abang - St. Rangkasbitung)","Rp 14.000")
    addDetails("KRL","Tangerang (St. Tangerang - St. Duri - St. Tanah Abang - St. Rangkasbitung)","Rp 15.000")
    addDetails("KRL","Jakarta (St. Tanah Abang - St. Rangkasbitung)","Rp 8.000")
    addDetails("KRL","Depok (St. Depok - St. Tanah Abang - St. Rangkasbitung)","Rp 20.000")
    addDetails("KRL","Bekasi (St. Bekasi - St. Jatinegara - St. Duri - St. Tanah Abang - St. Rangkasbitung)","Rp 17.000")
    addDetails("Damri","Bandara (Bandara Soetta - Terminal Kadubanen)","Rp 70.000")
    addDetails("Damri","Serang (Terminal Pakupatan - Tanjung Lesung)","Rp 50.000")
    addDetails("Damri","Merak (Terminal Merak - Tanjung Lesung)","Rp 50.000")
    addDetails("Bus AC","Terminal Merak - Terminal Pakupatan","Rp 40.000")
    addDetails("Bus Non-AC","Terminal Kalideres - Terminal Labuan","Rp 40.000")
    addDetails("Angkot Rangkasbitung","Stasiun Rangkasbitung - Terminal Mandala","Rp 3.000")
    addDetails("Angkot Mandala","Terminal Mandala - Terminal Pandeglang","Rp 10.000")
    addDetails("ELF Minibus Non-AC","Terminal Pakupatan - Perempatan Citeureup","Rp 30.000")
    addDetails("Ojek","Citeureup - Kampung Wisata Cikadu","Rp 15.000")
</script>
<style>

</style>

<div class="px-4 sm:px-8 md:px-16 text-xs sm:text-sm md:text-base">
    <br>
    <br>
    <div class="header font-extrabold font-overpass text-primary-7 text-lg sm:text-2xl">
        <h5>Biaya Transportasi Tahun 2020</h5>
    </div>
    <br>
    {#each kendaraan as transport}
        <div class="Kendaraan">
            <h4 class="font-extrabold font-overpass text-primary-7">{transport.name} :</h4>
            <ul>
                {#each transport.rutes as rute,i}
                    <li class="flex flex-row font-overpass items-center py-2">
                        <div class="h-3 w-3 mr-2 rounded-full bg-primary-8"></div>
                        <div class="w-2/3 mr-10"> {rute} </div> 
                        <div class="w-1/4 font-overpass font-extrabold text-primary-8"> {transport.prices[i]}</div> 
                    </li>
                {/each}
            </ul>
        </div>      
        <br>  
    {/each}    
</div>
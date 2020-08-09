<script>
    import { dataBiaya,dataJadwal } from "./Data.svelte";

    let kendaraan = dataBiaya;
</script>
<style>
</style>


<div class="px-4 sm:px-8 md:px-16 mt-8 font-bold font-overpass text-neutral-4 text-xl sm:text-2xl md:text-3xl mb-8">
    <h5>Jam Keberangkatan Transportasi Tahun 2020</h5>
</div>
<div class="jadwal w-full px-3 sm:px-7 md:px-15 flex flex-row flex-wrap" style="justify-content: center">
    
    {#each dataJadwal as data}
        <div class=" w-64 my-2 p-4 mx-1 border-1 border-neutral-1 rounded-2xl">
            <h1 class="text-center font-bold text-primary-7">{data.nama}</h1>
            {#each data.jalur as element}
                <div class = "py-4">
                    <h1 class="text-center text-neutral-4 font-semibold">{element.rute}</h1>
                    <div class= "grid grid-cols-3 text-center">
                        {#each element.jam as time}
                            <span class="">{time}</span>
                        {/each}
                    </div>
                </div>
            {/each}
        </div>
    {/each}
</div>




<div class="px-4 sm:px-8 md:px-16 text-xs sm:text-sm md:text-base pt-8">
    <div class="header font-bold font-overpass text-neutral-4 text-xl sm:text-2xl md:text-3xl mb-8">
        <h5>Biaya Transportasi Tahun 2020</h5>
    </div>
    {#each kendaraan as transport}
        <div class="Kendaraan">
            <h4 class="font-extrabold font-overpass text-neutral-6 text-base sm:text-lg md:text-xl">
                {transport.name}:
            </h4>
            <ul>
                {#each transport.routes as rute,i}
                    <li class="flex flex-row font-overpass items-center py-2">
                        <div class="h-3 w-3 flex-shrink-0 mr-2 rounded-full bg-primary-7"></div>
                        <div class="w-2/3 mr-10 text-sm sm:text-base md:text-lg leading-snug text-neutral-5">
                            {rute}
                        </div> 
                        <div 
                            class="w-1/4 font-overpass font-extrabold text-primary-7 text-right 
                            text-sm sm:text-base md:text-lg"
                        >
                            Rp {transport.prices[i]}
                        </div> 
                    </li>
                {/each}
            </ul>
        </div>      
        <br>  
    {/each}    
</div>
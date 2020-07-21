<div class="flex flex-col">
    <span class="font-overpass font-bold text-neutral-5 text-2xl sm:text-3xl mb-6 sm:mb-6">Jam operasional</span>
    <div class="flex flex-col space-y-6">
        {#each hours as hour}
            <div class="flex flex-col font-overpass font-bold">
            <span class="text-primary-7 font-semibold text-xl sm:text-2xl leading-none">
                {formatTime(hour.open)}-{formatTime(hour.close)}
            </span>
            <span class="text-neutral-3 font-bold text-base sm:text-lg">
                {hour.description}
            </span>
            </div>
        {/each}
    </div>
 </div>

 <script>
     import formatRupiah from "../../utilities/currency";
     import parse from "date-fns/parse";
     import format from "date-fns/format";
     import id from "date-fns/locale/id"

     export let hours;

     const formatTime = (time) => format(parse(time, "h:mm a", new Date(), { locale: id }), 'H:mm')
 </script>
<script context="module">
   export async function preload({ params: { slug }, query }) {
      const res = await this.fetch(`products/${slug}.json`);
      const data = await res.json();
      if (res.status === 200) {
         const price = formatRupiah(data.prices[0].value);
         return { data: { ...data, price, ecommerce: "https://google.com" } };
      } else {
         this.error(res.status, data.message);
      }
   }
</script>

<script>
   import Decorator from "../../components/Decorator.svelte";
   import Carousel from '../../components/Carousel.svelte';
   import formatRupiah from "../../utilities/currency";

    export let data;
</script>

<div class="px-4 sm:px-8 md:px-16 py-6 sm:py-12 flex flex-col">
   <span class="font-bold font-overpass text-neutral-2 text-base sm:text-lg md:text-xl">PRODUK LOKAL</span>
   <span class="font-bold font-overpass text-primary-7 text-3xl sm:text-4xl md:text-5xl mt-1">{data.name}</span>
   <span class="font-bold font-overpass text-neutral-3 text-lg sm:text-xl md:text-2xl mb-5 sm:mb-10">{data.category}</span>

   <Carousel perPage={{ 1100: 3, 800: 2 }} dots={false}>
      {#each data.photos as photo, i}
         <div 
            class="px-1 sm:px-4"
            style="height: 360px"
         >
            <img class="object-cover w-full h-full rounded-2xl" src={photo} alt={`foto-produk-${i}`} />
         </div>
      {/each}
   </Carousel>

   <div class="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-32 mt-10 sm:mt-20">
      <div class="flex flex-col">
         <p class="font-open-sans text-neutral-5 text-lg sm:text-xl">{data.description}</p>
         <Decorator />
      </div>
      <div class="flex flex-col info-panel flex-shrink-0 self-start max-w-full space-y-6">
         <div class="flex flex-col border-1 border-neutral-1 rounded-2xl px-6 py-3">
            <span class="font-overpass font-bold text-neutral-3 text-base sm:text-lg">Harga</span>
            <span class="font-overpass font-bold text-primary-7 text-xl sm:text-2xl">{data.price}</span>
         </div>
         {#if data.ecommerce}
            <a 
               href={data.ecommerce}
               target="_blank" 
               rel="noopener noreferrer"
               class="flex border-1 border-neutral-1 rounded-2xl px-5 sm:px-6 py-3 sm:py-4 cursor-pointer hover:bg-gray-100"
            >
               <img class="w-6 h-6 sm:w-7 sm:h-7" src="ic_ecommerce.svg" alt="ecommerce"/>
               <span class="ml-3 font-overpass font-bold text-primary-8 text-lg sm:text-xl">Tautan toko daring</span>
            </a>
         {/if}
      </div>
   </div>
</div>

<style type="text/postcss">
.info-panel {
   width: 375px;
}
</style>
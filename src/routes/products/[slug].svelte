<script context="module">
   export async function preload({ params: { slug }, query }) {
      const res = await this.fetch(`products/${slug}.json`);
      const data = await res.json();
      if (res.status === 200) {
         const price = new Intl.NumberFormat('id-ID', { 
            style: 'currency', 
            currency: 'IDR' 
         }).format(data.prices[0].value);
         return { data: { ...data, price } };
      } else {
         this.error(res.status, data.message);
      }
   }
</script>

<script>
   import Decorator from "../../components/Decorator.svelte";
   import Carousel from '../../components/Carousel.svelte';

    export let data;
</script>

<div class="px-8 md:px-16 py-12 flex flex-col">
   <span class="font-bold font-overpass text-neutral-2 text-xl">PRODUK LOKAL</span>
   <span class="font-bold font-overpass text-primary-7 text-5xl mt-1">{data.name}</span>
   <span class="font-bold font-overpass text-neutral-3 text-2xl mb-10">{data.category}</span>

   <Carousel perPage={{ 1100: 3, 800: 2 }} dots={false}>
      {#each ['images/budaya.jpg', 'images/landing-1.jpg', 'images/alam.jpg', 'images/kerajinan.jpg'] as photo, i}
      <div class={i == 0 ? '' : 'pl-4'} style="height: 360px">
         <img class="object-cover w-full h-full rounded-2xl" src={photo} alt={`foto-produk-${i}`} />
      </div>
      {/each}
   </Carousel>

   <div class="flex flex-col lg:flex-row space-y-10 lg:space-y-0 lg:space-x-32 mt-20">
      <div class="flex flex-col">
         <p class="font-open-sans text-neutral-5 text-xl">{data.description}</p>
         <Decorator />
      </div>
      <div class="flex flex-col info-panel flex-shrink-0 self-start">
         <div class="flex flex-col border-2 border-neutral-1 rounded-2xl px-6 py-3">
            <span class="font-overpass font-bold text-neutral-3 text-lg">Harga</span>
            <span class="font-overpass font-bold text-primary-7 text-2xl">{data.price}</span>
         </div>
      </div>
   </div>
</div>

<style type="text/postcss">
.info-panel {
   width: 375px;
}
</style>
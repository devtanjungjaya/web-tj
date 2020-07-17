<script context="module">
   export async function preload({ params: { slug }, query }) {
      const res = await this.fetch(`destinations/${slug}.json`);
      const data = await res.json();
      if (res.status === 200) {
         return { data };
      } else {
         this.error(res.status, data.message);
      }
   }
</script>

<script>
   import Decorator from "../../components/Decorator.svelte";
   import Header from "../../components/Item/Header.svelte";
   import Photos from "../../components/Item/Photos.svelte";
   import Prices from "../../components/Item/Prices.svelte";
   import Facilities from "../../components/Item/Facilities.svelte";
   import Hours from "../../components/Item/Hours.svelte";
   import Map from "../../components/Item/Map.svelte";
   import Link from "../../components/Item/Link.svelte";
   import { onMount } from "svelte";

   let DOMPurify = null;

   onMount(async () => {
      DOMPurify = await import('dompurify');
   })

   export let data;
</script>

<div class="px-4 sm:px-8 md:px-16 py-6 sm:py-12 flex flex-col">
   <Header
      typeURL="destinations"
      type="DESTINASI WISATA"
      title={data.name}
      categories={data.categories}
   />
 
   <Photos photos={data.photos} />

   <div class="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-10 xl:space-x-32 mt-10 sm:mt-20">
      <div class="flex flex-col max-w-4xl">
         {#if DOMPurify}
            <p class="font-open-sans text-neutral-5 text-lg sm:text-xl">
               {@html DOMPurify.sanitize(data.description)}
            </p>
            <Decorator />
         {/if}
         <Facilities facilities={data.facilities} iconMap={data.facilityIconMap} />
         <Decorator />
         <Hours hours={data.hours} />
      </div>
      <div class="flex flex-col flex-shrink-0 self-start max-w-full space-y-6" style="width: 375px">
         <Prices prices={data.prices} />
         <Map {...data.coordinate} />
         {#if data.gmaps}
            <Link url={data.gmaps} icon="ic_gmaps.png" label="Buka lokasi di Google Maps" />
         {/if}
      </div>
   </div>
</div>
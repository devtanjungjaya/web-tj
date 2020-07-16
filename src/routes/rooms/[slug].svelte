<script context="module">
   export async function preload({ params: { slug }, query }) {
      const res = await this.fetch(`rooms/${slug}.json`);
      const data = await res.json();
      if (res.status === 200) {
         return { data };
      } else {
         console.log(data);
         this.error(res.status, data.message);
      }
   }
</script>

<script>
   import Decorator from "../../components/Decorator.svelte";
   import Contact from "../../components/Item/Contact.svelte";
   import Header from "../../components/Item/Header.svelte";
   import Photos from "../../components/Item/Photos.svelte";
   import Prices from "../../components/Item/Prices.svelte";
   import Link from "../../components/Item/Link.svelte";
   import Facilities from "../../components/Item/Facilities.svelte";
   import Map from "../../components/Item/Map.svelte";

   export let data;
</script>

<div class="px-4 sm:px-8 md:px-16 py-6 sm:py-12 flex flex-col">
   <Header
      typeURL="rooms"
      type="PENGINAPAN"
      title={data.name}
      categories={data.categories}
   />
 
   <Photos photos={data.photos} />

   <div class="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-10 xl:space-x-32 mt-10 sm:mt-20">
      <div class="flex flex-col max-w-4xl">
         <p class="font-open-sans text-neutral-5 text-lg sm:text-xl">{@html data.description}</p>
         <Decorator />
         <Facilities 
            label="Fasilitas kamar" 
            facilities={data.roomFacilities} 
            iconMap={data.roomFacilityIconMap} 
         />
         <Decorator />
         <Facilities 
            label="Fasilitas publik" 
            facilities={data.publicFacilities} 
            iconMap={data.publicFacilityIconMap} 
         />
         <!-- <Decorator /> -->
         <!-- <Contact {...data.contact} /> -->
         {#if data.notes}
            <Decorator />
            <div class="flex flex-col font-overpass">
               <span class="font-bold text-neutral-5 text-2xl sm:text-3xl mb-6 sm:mb-6">Catatan</span>
               <p class="font-open-sans font-normal text-neutral-5 text-lg sm:text-xl">
                  {@html data.notes}
               </p>
            </div>
         {/if}
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
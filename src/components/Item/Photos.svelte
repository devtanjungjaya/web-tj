<Carousel 
   perPage={{
      1600: photos.length >= 4 ? 4 : 3,
      1280: photos.length >= 3 ? 3 : 2, 
      768: photos.length >= 2 ? 2 : 1 
   }} 
   dots={false} 
   on:init={() => showPhoto = true}
>
   {#each photos as photo, i}
      <div 
         class="px-1 sm:px-4"
         style={`height: ${innerWidth >= 640 ? 360 : 250}px`}
      >
         <img 
            class="object-cover w-full h-full rounded-2xl bg-neutral-1"
            class:invisible={!showPhoto}
            src={photo.photoURI} 
            alt={`foto-item-${i+1}`}
            on:mousedown={handleMouseDown}
            on:mouseup={e => handleMouseUp(e, i)}
         />
      </div>
   {/each}
</Carousel>

{#if initialIndex != null}
   <PhotoDetail 
      {photos} 
      {initialIndex} 
      on:close={_ => initialIndex = null}
   />
{/if}

<svelte:head>
   {#if initialIndex != null}
      <style>
         body {
            overflow-y: hidden;
         }
      </style>
   {/if}
</svelte:head>

<svelte:window bind:innerWidth={innerWidth} />

<script>
   import Carousel from '../../components/Carousel.svelte';
   import PhotoDetail from "./PhotoDetail.svelte";

   export let photos;

   const delta = 6;

   let startX;
   let startY;
   let initialIndex = null;
   let innerWidth;
   let showPhoto = false;

   function handleMouseDown(event) {
      startX = event.pageX;
      startY = event.pageY;
   }

   function handleMouseUp(event, index) {
      const diffX = Math.abs(event.pageX - startX);
      const diffY = Math.abs(event.pageY - startY);

      if (diffX < delta && diffY < delta) {
         initialIndex = index;
      }
   }

</script>
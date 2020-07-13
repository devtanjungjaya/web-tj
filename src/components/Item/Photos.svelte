<Carousel perPage={{ 1100: 3, 800: 2 }} dots={false}>
    {#each photos as photo, i}
       <div 
          class="px-1 sm:px-4"
          style="height: 360px"
       >
          <img class="object-cover w-full h-full rounded-2xl" src={photo} alt={`foto-item-${i+1}`} />
       </div>
    {/each}
 </Carousel>

 <script>
     import Carousel from '../../components/Carousel.svelte';

     export let photos;
 </script>
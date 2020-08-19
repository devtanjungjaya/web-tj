<script context="module">
    export function preload({ params, query }) {
       return this.fetch(`contact.json`)
       .then(r => r.json())
       .then(contacts => {
          return { contacts };
       });
    }
</script>

<script>
    import Contact from '../../components/Contact.svelte';

    export let contacts;
</script>

<svelte:head>
    <title>Kontak</title>
</svelte:head>

<div class="flex flex-col font-overpass">
    <h1 class="text-3xl sm:text-5xl md:text-5xl text-primary-7 font-bold px-4 sm:px-8 md:px-16 lg:px-16 pt-8">Kontak</h1>

    <div class="grid lg:grid-cols-2">
        {#each contacts as contact}
            <Contact name={contact.admin} contacts={contact.contact} />
        {/each}
    </div>
    

</div>




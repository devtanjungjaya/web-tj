<svelte:head>
    <title>Kontak</title>
</svelte:head>

<div class="flex flex-col font-overpass">
    <h1 class="text-3xl sm:text-5xl md:text-5xl text-primary-7 font-bold px-4 sm:px-8 md:px-16 lg:px-16 pt-8">Kontak</h1>

    <div class="grid lg:grid-cols-2">
        <Contact name='Desa Wihbagus' phoneNumbers="0" email='felixogustino912@mail.ugm.ac.id' address='jalan-jalan tbsilalaji kajsdkf'/>
        <Contact name='Desa Wihbagus' phoneNumbers="0" email='coba@gmail.com' address='jalan-jalan'/>
        <Contact name='Desa Wihbagus' phoneNumbers="0" email='coba@gmail.com' address='jalan-jalan'/>
        <Contact name='Desa Wihbagus' phoneNumbers="0" email='coba@gmail.com' address='jalan-jalan'/>
        <Contact name='Desa Wihbagus' phoneNumbers="0" email='coba@gmail.com' address='jalan-jalan'/>
    </div>
    

</div>
<!-- <Contact name='Desa Wihbagus' phoneNumbers="0" email='coba@gmail.com' address='jalan-jalan'/> -->

<script>
    import Contact from '../components/Contact.svelte'
</script>
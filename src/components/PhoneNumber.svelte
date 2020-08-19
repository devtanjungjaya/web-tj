{#if whatsapp}
    <a 
        rel="external" 
        href={`https://wa.me/${phoneNumber}`}
        target="_blank noopener noreferrer" 
        class="flex items-center space-x-3 sm:space-x-6"
    >
        <img class="w-10 sm:w-12 h-10 sm:h-12" src="ic_whatsapp.svg" alt="phone" />
        <div class="flex flex-col space-y-2">
            <span class="font-bold text-neutral-3 text-base sm:text-lg leading-none">
                {whatsapp ? 'Klik untuk hubungi via WA' : 'No. Handphone'}
            </span>
            <span class="font-semibold text-primary-7 text-xl sm:text-2xl h-auto leading-none">
                +{phoneNumber}
            </span>
        </div>
    </a>
{:else}
    <div class="flex items-center space-x-3 sm:space-x-6">
        <div class="flex items-center justify-center rounded-full bg-primary-7 p-3">
            <img class="w-4 sm:w-6 h-4 sm:h-6" src="ic_phone.svg" alt="phone" />
        </div>
        <div class="flex flex-col space-y-2">
            <span class="font-bold text-neutral-3 text-base sm:text-lg leading-none">
                {whatsapp ? 'Klik untuk hubungi via WA' : 'No. Handphone'}
            </span>
            <span class="font-semibold text-primary-7 text-xl sm:text-2xl h-auto leading-none">
                +{phoneNumber}
            </span>
        </div>
    </div>
{/if}

<script>
    export let phoneNumber;
    export let whatsapp = false;
</script>
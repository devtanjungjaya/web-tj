<div class="flex flex-col font-overpass border-1 rounded-2xl max-w-lg m-4 sm:mx-8 sm:my-6 md:mx-16 md:my-12 lg:mx-16 lg:my-12 shadow p-5">    
        <span class="font-bold text-neutral-5 text-xl md:text-3xl lg:text-3xl border-b-2">{name}</span>
        <div class="flex flex-col mt-6 space-y-6">
            {#each phoneNumbers as phoneNumber, i}
                <div class="flex items-start space-x-6">
                    <div class="flex flex-shrink-0 items-center justify-center rounded-full bg-primary-7 p-2 sm:p-3 md:p-3 lg:p-3">
                        <img class="w-4 h-4 sm:w-6 sm:h-6 md:w-6 md:h-6 lg:w-6 lg:h-6" src="ic_phone.svg" alt="phone" />
                    </div>
                    <div class="flex flex-col">
                        <span class="font-bold text-neutral-3 text-sm md:text-lg lg:text-lg leading-none">
                            {`No. HP/Whatsapp ${phoneNumbers.length > 1 ? i+1 : ''}`}
                        </span>
                        <span class="font-semibold text-primary-7 text-lg hover:md:text-2xl lg:text-2xl">{phoneNumber}</span>
                    </div>
                </div>
            {/each}
            {#if email}
                <div class="flex items-start space-x-6">
                    <div class="flex flex-shrink-0 items-center justify-center rounded-full bg-primary-7 p-2 sm:p-3 md:p-3 lg:p-3">
                        <img class="w-4 h-4 sm:w-6 sm:h-6 md:w-6 md:h-6 lg:w-6 lg:h-6" src="ic_email.svg" alt="email" />
                    </div>
                    <div class="flex flex-col">
                        <span class="font-bold text-neutral-3 text-sm md:text-lg lg:text-lg leading-none">Email</span>
                        <span class="font-semibold text-primary-7 text-lg md:text-2xl lg:text-2xl">{email}</span>
                    </div>
                </div>
            {/if}
            {#if address}
                <div class="flex items-start space-x-6">
                    <div class="flex flex-shrink-0 items-center justify-center rounded-full bg-primary-7 p-2 sm:p-3 md:p-3 lg:p-3">
                        <img class="w-4 h-4 sm:w-6 sm:h-6 md:w-6 md:h-6 lg:w-6 lg:h-6" src="ic_address.svg" alt="address" />
                    </div>
                    <div class="flex flex-col">
                        <span class="font-bold text-neutral-3 text-sm md:text-lg lg:text-lg leading-none">Alamat</span>
                        <span class="font-semibold text-primary-7 text-lg md:text-2xl lg:text-2xl">{address}</span>
                    </div>
                </div>
            {/if}
        </div>
</div>


<script>
    export let name;
    export let phoneNumbers;
    export let email;
    export let address;
</script>
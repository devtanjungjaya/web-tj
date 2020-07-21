<div class="flex flex-col font-overpass border-1 rounded-2xl w-auto mx-16 my-8 shadow p-5">    
        <span class="font-bold text-neutral-5 text-3xl border-b-2">{name}</span>
        <div class="flex flex-col mt-6 space-y-6">
            {#each phoneNumbers as phoneNumber, i}
                <div class="flex items-center space-x-6">
                    <div class="flex items-center justify-center rounded-full bg-primary-7 p-3">
                        <img class="w-6 h-6" src="ic_phone.svg" alt="phone" />
                    </div>
                    <div class="flex flex-col">
                        <span class="font-bold text-neutral-3 text-lg leading-none">
                            {`No. HP/Whatsapp ${phoneNumbers.length > 1 ? i+1 : ''}`}
                        </span>
                        <span class="font-semibold text-primary-7 text-2xl">{phoneNumber}</span>
                    </div>
                </div>
            {/each}
            {#if email}
                <div class="flex items-center space-x-6">
                    <div class="flex items-center justify-center rounded-full bg-primary-7 p-3">
                        <img class="w-6 h-6" src="ic_email.svg" alt="email" />
                    </div>
                    <div class="flex flex-col">
                        <span class="font-bold text-neutral-3 text-lg leading-none">Email</span>
                        <span class="font-semibold text-primary-7 text-2xl">{email}</span>
                    </div>
                </div>
            {/if}
            {#if address}
                <div class="flex items-center space-x-6">
                    <div class="flex-none items-start justify-center rounded-full bg-primary-7 p-3">
                        <img class="w-6 h-6" src="ic_address.svg" alt="address" />
                    </div>
                    <div class="flex flex-col">
                        <span class="font-bold text-neutral-3 text-lg leading-none">Alamat</span>
                        <span class="font-semibold text-primary-7 text-2xl">{address}</span>
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
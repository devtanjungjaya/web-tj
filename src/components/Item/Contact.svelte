<div class="flex flex-col border-1 border-neutral-1 rounded-2xl p-5 font-overpass">
    <span class="font-bold text-neutral-5 text-lg sm:text-xl leading-tight max-w-sm">{name}</span>
    <div class="flex flex-col mt-6 space-y-6">
        {#each contacts as contact, i}
            <PhoneNumber {...contact} />
        {/each}
        {#if email}
            <div class="flex items-center space-x-3 sm:space-x-6">
                <div class="flex items-center justify-center rounded-full bg-primary-7 p-3">
                    <img class="w-4 sm:w-6 h-4 sm:h-6" src="ic_email.svg" alt="email" />
                </div>
                <div class="flex flex-col">
                    <span class="font-bold text-neutral-3 text-base sm:text-lg leading-none">Email</span>
                    <span class="font-semibold text-primary-7 text-xl sm:text-2xl">{email}</span>
                </div>
            </div>
        {/if}
    </div>
</div>

<script>
    import PhoneNumber from "../PhoneNumber.svelte";

    export let name;
    export let contacts;
    export let email;
</script>
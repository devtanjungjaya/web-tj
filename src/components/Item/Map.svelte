<div class="relative h-0 w-full" style="padding-bottom: 70%">
    <div class="rounded-2xl overflow-hidden w-full h-full absolute bg-neutral-1">
        <Map
            accessToken="pk.eyJ1IjoiZGV2dGFuanVuZ2pheWEiLCJhIjoiY2tjbTVpeTJuMmMwdDJ6bnh1cXBrc2N5ZSJ9.ROBeH7kg57aIpTHigEusmg"
            style="mapbox://styles/devtanjungjaya/ckcoyb0ow01461jo71ghluyok"
            options={{
                center: [lng, lat],
                zoom: 14
            }}
        >
            <Marker color="#0BA79F" lng={lng} lat={lat} />
        </Map>
    </div>
</div>

<script>
    import { Map, Marker } from '@beyonk/svelte-mapbox';

    export let lat;
    export let lng;
</script>
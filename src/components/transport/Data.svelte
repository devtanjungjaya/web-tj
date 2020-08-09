<script context = "module">
    export const dataTransportasi = [
        { url:"trans_route_angkot_mandala", name:"Angkot Mandala", color: "#C62828",type: "route",check: true},
        { url:"trans_route_angkot_rangkasbitung", name:"Angkot Rangkasbitung", color: "#FBC02D", type: "route",check: true},
        { url:"trans_route_bus_ac", name:"Bus AC", color: "#26A69A", type: "route",check: true },
        { url:"trans_route_bus_non_ac", name:"Bus Non AC", color: "#B39DDB", type: "route",check: true },
        { url:"trans_route_damri", name:"Damri Bandara", color: "#0D47A1", type: "route",check: true },
        { url:"trans_route_damri_merak", name:"Damri Merak", color: "#424242", type: "route",check: true },
        { url:"trans_route_damri_ac", name:"Damri Serang", color: "#A5D6A7", type: "route",check: true },
        { url:"trans_route_elf", name:"ELF", color: "#33691E", type: "route",check: true },
        { url:"trans_route_krl", name:"KRL", color: "#9E9D24", type: "route",check: true },
        { url:"trans_route_ojek", name:"Ojek", color: "#E65100", type: "route",check: true },
    ]
    export const dataLokasi = [
        { url:"trans_point_bandara", name:"Bandara", color: "#0BA79F", type: "point",check: true},
        { url:"trans_point_poin_penting", name:"Tujuan Akhir", color: "#0BA79F", type: "point",check: true},
        { url:"trans_point_stasiun_krl", name:"Stasiun KRL", color: "#0BA79F", type: "point",check: true},
        { url:"trans_point_terminal_bus", name:"Terminal Bus", color: "#0BA79F", type: "point",check: true},
    ]
    
    export const dataBiaya = [
        {
            name: "Angkot Mandala", titik:["Terminal Mandala", "Terminal Kadubanen / Terminal Pandeglang"], routes: ["Terminal Mandala - Terminal Pandeglang"], prices: ["10.000"] 
        },
        {
            name: "Angkot Rangkasbitung", titik:["Terminal Mandala","Stasiun Rangkasbitung"], routes: ["Stasiun Rangkasbitung - Terminal Mandala"], prices: ["3.000"] 
        },
        {
            name: "Bus AC", titik:["Terminal Terpadu Merak","Terminal Pakupatan"], routes: ["Terminal Merak - Terminal Pakupatan"], prices: ["40.000"] 
        },
        {
            name: "Bus Non-AC", titik:["Terminal Kalideres", "Terminal Labuan"], routes: ["Terminal Kalideres - Terminal Labuan"], prices: ["40.000"] 
        },
        {
            name: "Damri Bandara", titik:["Bandara Soekarno-Hatta","Terminal Kadubanen / Terminal Pandeglang"], routes: ["Bandara Soetta - Terminal Kadubanen",], prices: ["70.000"] 
        },
        {
            name: "Damri Merak", titik:["Terminal Terpadu Merak","Tanjung Lesung"], routes: ["Terminal Merak - Tanjung Lesung"], prices: ["50.000"] 
        },
        {
            name: "Damri Serang", titik:["Terminal Pakupatan","Tanjung Lesung"], routes: ["Terminal Pakupatan - Tanjung Lesung"], prices: ["50.000"] 
        },
        {
            name: "ELF Minibus Non-AC", titik:["Terminal Pakupatan","Persimpangan Citeureup"], routes: ["Terminal Pakupatan - Perempatan Citeureup"], prices: ["30.000"] 
        },
        {
            name: "KRL", 
            titik:[
                "Stasiun Bogor",
                "Stasiun Tanah Abang",
                "Stasiun Rangkasbitung",
                "Stasiun Duri",
                "Stasiun Tangerang",
                "Stasiun Depok",
                "Stasiun Bekasi",
                "Stasiun Jatinegara",
            ], 
            routes: [
                "Bogor (St. Bogor - St. Tanah Abang - St. Rangkasbitung)",
                "Tangerang (St. Tangerang - St. Duri - St. Tanah Abang - St. Rangkasbitung)",
                "Jakarta (St. Tanah Abang - St. Rangkasbitung)",
                "Depok (St. Depok - St. Tanah Abang - St. Rangkasbitung)",
                "Bekasi (St. Bekasi - St. Jatinegara - St. Duri - St. Tanah Abang - St. Rangkasbitung)"
            ], 
            prices: [
                "14.000",
                "15.000",
                "8.000",
                "20.000",
                "17.000",
            ] 
        },
        {
            name: "Ojek", titik:["Persimpangan Citeureup","Cikadu Edutourism Centre"], routes: ["Persimpangan Citeureup - Cikadu Edutourism Centre"], prices: ["15.000"] 
        }
    ]
    export const dataJadwal = [
        {
            nama:"Damri Bandara",
            jalur:[
                { 
                    rute: "Soetta - Kadubanen", 
                    jam:[
                        "09.30","10.30","11.30","12.30","13.30","16.30","17.30","18.30","19.30","20.30",
                    ],
                },
                { 
                    rute: "Kadubanen - Soetta", 
                    jam:[
                        "05.30","06.30","07.30","08.30","09.30","13.30","14.30","15.30","16.30","17.30",
                    ],
                },
            ],    
        },
        {
            nama:"Damri Serang",
            jalur:[
                { 
                    rute: "Pakupatan - Tanjung Lesung", 
                    jam:[
                        "03.00","12.00"
                    ],
                },
                { 
                    rute: "Tanjung Lesung - Pakupatan", 
                    jam:[
                        "06.00","12.00"
                    ],
                },
            ],    
        },
        {
            nama:"KRL",
            jalur:[
                { 
                    rute: "Jabodetabek - Rangkasbitung", 
                    jam:[
                        "05.50","06.35","07.50","08.55","09.35","10.50","12.05","12.50","13.40","14.30","17.25","18.20","19.45","20.00","21.45",
                    ],
                },
                { 
                    rute: "Rangkasbitung - Jabodetabek", 
                    jam:[
                        "05.50","06.35","07.50","08.55","09.35","10.50","12.05","12.50","13.40","14.30","17.25","18.20","19.45","20.00","21.45",
                    ],
                },
            ],    
        }
    ]
</script>

<template>
    <header class="w-full bg-[#283541] px-10 py-8">
        <router-link to="/" class="text-2xl font-bold ml-10">Where in the world?</router-link>
    </header>

    <main
        class="flex flex-col items-center justify-center w-full px-28 mt-16 gap-16 h-full max-lg:px-10 max-lg:mt-16 max-lg:items-start">
        <router-link to="/"
            class="inline-flex items-center gap-3 px-7 py-3 self-start bg-[#2f3e4b] rounded-md shadow-lg hover:bg-[#364857]">
            <svg fill="#fff" width="25px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 476.213 476.213" xml:space="preserve">
                <polygon points="476.213,223.107 57.427,223.107 151.82,128.713 130.607,107.5 0,238.106 130.607,368.714 151.82,347.5 
	                57.427,253.107 476.213,253.107 " />
            </svg>
            Back
        </router-link>
        <div class="inline-flex items-center justify-around w-full gap-10 max-lg:flex max-lg:flex-col max-lg:gap-12">
            <img class="h-[345px] w-[520px] rounded-sm max-lg:max-w-[420px] max-lg:w-full max-lg: max-lg:h-full" :src="flag" :alt="nativeName">
            <div class="flex flex-col items-start self-start gap-12 justify-center">
                <h1 class="font-bold text-2xl">{{ nativeName }}</h1>
                <div class="flex items-start justify-center gap-4 text-sm">
                    <div class="flex flex-col items-start justify-center gap-6">
                        <p class="font-medium">Population: <span class="font-thin">{{ population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</span></p>
                        <p class="font-medium">Region: <span class="font-thin">{{ region }}</span></p>
                        <p class="font-medium">Sub Region: <span class="font-thin">{{ subRegion }}</span></p>
                        <p class="font-medium">Capital: <span class="font-thin">{{ capital }}</span></p>
                    </div>
                    <div class="flex flex-col items-start justify-center gap-6">
                        <p class="font-medium">Top Level Domain: <span class="font-thin">{{
                        topLevelDomain }}</span></p>
                        <p class="font-medium">Currencies: <span class="font-thin">{{ formattedCurrencies }}</span></p>
                        <p class="font-medium">Languages: <span class="font-thin">{{ formattedLanguages }}</span></p>
                    </div>
                </div>
                <div class="flex flex-row gap-4 items-start flex-wrap font-medium max-w-[480px]">
                    <span>Borders: </span>
                    <!-- <div class="grid grid-flow-row grid-cols-3 gap-x-4 gap-y-4"> -->
                        <div class="flex flex-row flex-wrap gap-4 ">
                        <div class="w-fit px-6 text-center font-light py-2 place-self-center bg-[#2f3e4b] rounded-md shadow-lg hover:bg-[#364857]"
                            v-for="border in borderCountries" :key="border">
                            {{ border }}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </main>
</template>

<script>
import { ref } from 'vue';

export default {
    methods: {
        async fetchCountryData() {
            try {
                const response = await fetch("https://restcountries.com/v3.1/all");
                const countries = await response.json();
                this.countryMap = countries.reduce((map, country) => {
                    map[country.cca3] = country.name.common;
                    return map;
                }, {});
            } catch (error) {
                console.error("There was an error fetching the country data: ", error);
            }
        }
    },
    created() {
        this.fetchCountryData();
    },
    data() {
        return {
            flag: this.$route.query.flag || '',
            nativeName: this.$route.query.nativeName || '',
            population: this.$route.query.population || '',
            region: this.$route.query.region || '',
            subRegion: this.$route.query.subRegion || '',
            capital: ref(this.$route.query.capital.toString() || ''),
            topLevelDomain: ref(this.$route.query.topLevelDomain.toString() || ''),
            currencies: ref(this.$route.query.currencies ? JSON.parse(this.$route.query.currencies) : []),
            languages: ref(this.$route.query.languages ? JSON.parse(this.$route.query.languages) : []),
            borders: ref(this.$route.query.borders ? JSON.parse(this.$route.query.borders) : []),
            countryMap: {}
        };
    },
    computed: {
        formattedCurrencies() {
            return Object.entries(this.currencies)[0][0] || 'N/A';
        },
        formattedLanguages() {
            return Object.entries(this.languages).map(item => item[1]).sort().join(', ') || 'N/A';
        },
        borderCountries() {
            return this.borders.map(border => this.countryMap[border] || border);
        },
    }
};
</script>
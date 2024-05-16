<template>
    <header class="w-full bg-[#283541] px-10 py-8">
        <router-link to="/" class="text-2xl font-bold ml-10">Where in the world?</router-link>
    </header>

    <main
        class="flex flex-col items-center justify-center w-full px-28 gap-10 h-[90vh] max-lg:flex-col max-lg:items-start">
        <router-link to="/" class="inline-flex items-center gap-3 px-7 py-3 self-start bg-[#2f3e4b] rounded-md shadow-lg hover:bg-[#364857]">
            <svg fill="#fff" width="25px" version="1.1" id="Layer_1"
                xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 476.213 476.213" xml:space="preserve">
                <polygon points="476.213,223.107 57.427,223.107 151.82,128.713 130.607,107.5 0,238.106 130.607,368.714 151.82,347.5 
	            57.427,253.107 476.213,253.107 "/>
            </svg>
            Back
        </router-link>
        <div class="inline-flex items-center justify-around w-full">
            <img class="h-[365px] w-[580px]" :src="flag" :alt="nativeName">
            <div class="flex flex-col items-start justify-center">
                <h1 class="font-bold text-2xl">{{ nativeName }}</h1>
                <div class="flex items-start justify-center gap-4 text-lg">
                    <div class="flex flex-col items-start justify-center gap-6">
                        <p>Population: {{ population }}</p>
                        <p>Region: {{ region }}</p>
                        <p>Sub Region: {{ subRegion }}</p>
                        <p>Capital: {{ capital }}</p>
                    </div>
                    <div class="flex flex-col items-start justify-center gap-6">
                        <p>Top Level Domain: {{ topLevelDomain.replaceAll('"', '') }}</p>
                        <p>Currencies: {{ formattedCurrencies }}</p>
                        <p>Languages: {{ formattedLanguages }}</p>
                        <p>Borders: {{ formattedBorders }}</p>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    data() {
        return {
            flag: this.$route.query.flag || '',
            nativeName: this.$route.query.nativeName || '',
            population: this.$route.query.population || '',
            region: this.$route.query.region || '',
            subRegion: this.$route.query.subRegion || '',
            capital: this.$route.query.capital || '',
            topLevelDomain: this.$route.query.topLevelDomain.toString() || '',
            currencies: this.$route.query.currencies ? JSON.parse(this.$route.query.currencies) : [],
            languages: this.$route.query.languages ? JSON.parse(this.$route.query.languages) : [],
            borders: this.$route.query.borders ? JSON.parse(this.$route.query.borders) : []
        };
    },
    computed: {
        formattedCurrencies() {
            return Object.entries(this.currencies)[0][0] || 'N/A';
        },
        formattedLanguages() {
            return Object.entries(this.languages).map(item => item[1]).sort().join(', ') || 'N/A';
        },
        formattedBorders() {
            return this.borders || 'N/A';
        }
    }
};
</script>
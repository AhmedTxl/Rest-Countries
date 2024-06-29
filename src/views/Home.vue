<template>
    <header class="w-full bg-[#283541] px-10 py-8">
        <h1 class="text-2xl font-bold ml-10">Where in the world?</h1>
    </header>

    <main class="w-full">
        <div class="py-12 px-20">
            <!-- Search Input Field and Filter Options -->
            <div
                class="inline-flex items-center justify-between w-full max-lg:flex-col max-lg:items-start max-lg:gap-8">
                <div class="relative">
                    <span class="absolute inset-y-0 left-0 flex items-center pl-6">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-linecap="round"
                            stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24">
                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </span>
                    <input type="text" v-model="filterText"
                        class="ps-16 py-4 px-64 border-none text-base text-white shadow-md bg-[#283541] rounded-md pl-10 focus:outline-none hover:bg-[#2f3e4b]"
                        placeholder="Search for a country..." autocomplete="off" />
                </div>

                <ComboboxRoot v-model="v" class="relative">
                    <ComboboxAnchor
                        class="min-w-[160px] inline-flex items-center justify-between rounded leading-none h-14 gap-[5px] bg-[#283541] text-white shadow-[0_2px_10px] shadow-black/10 hover:bg-[#2f3e4b] focus:shadow-[0_0_0_2px] focus:shadow-black outline-none">
                        <ComboboxTrigger class="inline-flex items-center justify-center gap-12 px-8 w-full h-full">
                            <ComboboxLabel
                                class="!bg-transparent outline-none text-center text-white selection:bg-white placeholder-white">
                                Filter by Region
                            </ComboboxLabel>
                            <Icon icon="radix-icons:chevron-down" class="h-4 w-4 text-white" />
                        </ComboboxTrigger>
                    </ComboboxAnchor>

                    <ComboboxContent
                        class="absolute z-10 w-full mt-2 min-w-[160px] bg-[#283541] overflow-hidden rounded shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade">
                        <ComboboxViewport class="p-[5px]">
                            <ComboboxGroup>
                                <ComboboxItem v-for="(option, index) in regions" :key="index"
                                    class="leading-none text-white rounded-[3px] flex items-center h-12 pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-[#2f3e4b] data-[highlighted]:text-grass1"
                                    :value="option">
                                    <ComboboxItemIndicator
                                        class="absolute left-0 w-[25px] inline-flex items-center justify-center">
                                        <Icon icon="radix-icons:dot-filled" />
                                    </ComboboxItemIndicator>
                                    <span>
                                        {{ option }}
                                    </span>
                                </ComboboxItem>
                            </ComboboxGroup>
                        </ComboboxViewport>
                    </ComboboxContent>
                </ComboboxRoot>
            </div>

            <!-- A simple message inform that it still loads the data -->
            <div v-if="loading" class="loading">Loading...</div>

            <transition-group name="fade" tag="div"
                class="grid grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:place-items-center gap-20 mt-10"
                v-else>
                <div class="country w-[18.5em] shadow-lg" v-for="country in filteredCountries"
                    :key="country.name.common" @click="navigateTo(
                        country.flags.png,
                        country.name.common,
                        country.population,
                        country.region,
                        country.subregion,
                        country.capital,
                        country.tld,
                        country.currencies,
                        country.languages,
                        country.borders)">
                    <div class="flex flex-col items-center justify-center cursor-pointer">
                        <img class="h-44" :src="country.flags.png" :alt="country.name.common"
                            style="width: 100%; aspect-ratio: 3/2" />
                        <div class="w-full p-6 pb-12 bg-[#283541] rounded-b-md">
                            <h1 class="text-xl font-bold mb-4">{{ country.name.common }}</h1>
                            <h2 class="font-medium">
                                Population:
                                <span class="font-thin">{{
                        country.population
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }}
                                </span>
                            </h2>
                            <h2 class="font-medium">
                                Region: <span class="font-thin">{{ country.region }}</span>
                            </h2>
                            <h2 class="font-medium">
                                Capital:
                                <span class="font-thin">{{
                                        String(country.capital).replace(",", " ")
                                    }}</span>
                            </h2>
                        </div>
                    </div>
                </div>
            </transition-group>
        </div>
    </main>
</template>

<script setup>
import {
    ComboboxAnchor,
    ComboboxContent,
    ComboboxGroup,
    ComboboxItem,
    ComboboxItemIndicator,
    ComboboxLabel,
    ComboboxRoot,
    ComboboxTrigger,
    ComboboxViewport,
} from "radix-vue";
import { Icon } from "@iconify/vue";
import { ref, onMounted, computed, watch } from "vue";
import debounce from 'lodash/debounce';

const v = ref("All Regions");
const regions = [
    "All Regions",
    "Africa",
    "Americas",
    "Asia",
    "Europe",
    "Oceania",
];

const countries = ref([]);
const loading = ref(false);
const filterText = ref("");

// Debounce the filter function to improve performance
const debouncedFilterText = ref("");
const updateFilterText = debounce((text) => {
    debouncedFilterText.value = text;
    console.log("Debounced Filter Text Updated:", debouncedFilterText.value);
}, 300);

const filteredCountries = computed(() => {
    console.log("Filtering countries with text:", debouncedFilterText.value);
    return countries.value.filter((country) => {
        // Check if the country's name matches the filter text
        const nameMatches = country.name.common
            .toLowerCase()
            .includes(debouncedFilterText.value.toLowerCase());

        // Check if the country belongs to the selected region
        const regionMatches =
            v.value === "All Regions" || country.region === v.value;

        // Return true only if both conditions are met
        return nameMatches && regionMatches;
    });
});

onMounted(async () => {
    loading.value = true;
    try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        countries.value = await response.json();
    } catch (error) {
        console.error("There was an error fetching the countries: ", error);
    } finally {
        loading.value = false;
    }
});

watch(filterText, (newVal) => {
    console.log("Filter Text Changed:", newVal);
    updateFilterText(newVal);
});
</script>

<script>
export default {
    methods: {
        navigateTo(flg, nn, popu, reg, subreg, cap, tld, curr, langs, brdrs) {
            // Navigate to InfoPage
            this.$router.push({
                name: "info",
                query: {
                    flag: flg,
                    nativeName: nn,
                    population: popu,
                    region: reg,
                    subRegion: subreg,
                    capital: cap,
                    topLevelDomain: tld,
                    currencies: JSON.stringify(curr),
                    languages: JSON.stringify(langs),
                    borders: JSON.stringify(brdrs),
                },
            });
        },
    },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.35s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

img {
    border-radius: 6px 6px 0 0;
}

.country {
    transition: all 200ms, opacity 400ms;
}

.country:hover {
    transform: scale(1.1);
}
</style>

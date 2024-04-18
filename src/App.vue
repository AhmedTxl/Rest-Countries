


<template>
  <header class="w-full bg-[#283541] px-10 py-8">
    <h1 class="text-2xl font-bold ml-10">Where in the world?</h1>
  </header>
  
  <main>
    <div class=" px-20 py-12">
    <!-- Search Input Field and Filter Options -->
    <div class="inline-flex items-center justify-between w-full">
      <div class="relative">
        <span class="absolute inset-y-0 left-0 flex items-center pl-6">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </span>
        <input type="text" v-model="filterText" class="ps-16 py-4 px-64 border-none text-base text-white shadow-md bg-[#283541] rounded-md pl-10 focus:outline-none hover:bg-[#2f3e4b]" placeholder="Search for a country..." autocomplete="off">
      </div>
      
      
      <div class="flex bg-[#283541] justify-center items-start rounded-md px-8">
        <div class="w-[150px] text-white">
          <div class="relative w-full py-4">
            <button class="w-full peer flex items-center 
            ustify-between text-base font-normal">Filter by Region</button>
          <div
            class="absolute z-[99] top-[100%] left-[50%] translate-x-[-50%] 
            rounded-md overflow-hidden min-w-[200px] w-max 
            peer-focus:visible peer-focus:opacity-100 opacity-0 
            invisible duration-200 p-1 bg-[#283541] 
            shadow-lg text-xs md:text-sm">
            <div
              class="w-full block cursor-pointer hover:bg-[#25313b]
              hover:text-link px-3 py-2 rounded-md">
              Asia</div>
            <div
              class="w-full block cursor-pointer hover:bg-[#25313b]
              hover:text-link px-3 py-2 rounded-md">
              Europe
            </div>
            <div
              class="w-full block cursor-pointer hover:bg-[#25313b]
              hover:text-link px-3 py-2 rounded-md">
              Africa
            </div>
            <div
              class="w-full block cursor-pointer hover:bg-[#25313b]
              hover:text-link px-3 py-2 rounded-md">
              America
            </div>
            <div
              class="w-full block cursor-pointer hover:bg-[#25313b]
              hover:text-link px-3 py-2 rounded-md">
              Oceania</div>
          </div>
        </div>
      </div>
      </div>
    </div>
    
    
    <!-- A simple message inform that it still loads the data -->
    <div v-if="loading" class="loading">Loading...</div>
    
    <transition-group name="fade" tag="div" class="grid mt-10" v-else>
      <div
        class="country w-[18.5em] shadow-lg"
        v-for="country in filteredCountries"
        :key="country.name.common"
      >
        <div class="flex flex-col items-center justify-center ">
          <img class="h-44" :src="country.flags.png" :alt="country.name.common" style="width: 100%; aspect-ratio: 3/2;">
          <div class="w-full p-6 pb-12 bg-[#283541] rounded-b-md">
            <h1 class="text-xl font-bold mb-4">{{ country.name.common }}</h1>
            <h2 class="font-medium">Population: <span class="font-thin">{{ country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</span></h2>
            <h2 class="font-medium">Region: <span class="font-thin">{{ country.region }}</span></h2>
            <h2 class="font-medium">Capital: <span class="font-thin">{{ String(country.capital).replace(',', ' ') }}</span></h2>
          </div>
        </div>
      </div>
    </transition-group>
  </div>
  </main>
</template>
  
<script>
import { ref, onMounted, computed } from 'vue';

export default {
name: 'App',
setup() {
  const countries = ref([]);
  const loading = ref(false);
  const filterText = ref('');

  const filteredCountries = computed(() => {
    return countries.value.filter(country => {
      return country.name.common.toLowerCase().includes(filterText.value.toLowerCase());
    });
  });

  onMounted(async () => {
    loading.value = true;
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      countries.value = await response.json();
    } catch (error) {
      console.error('There was an error fetching the countries:', error);
    } finally {
      loading.value = false;
    }
  });

  return {
    countries,
    loading,
    filterText,
    filteredCountries,
  };
},
};
</script>
  
<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.35s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

img {
  border-radius: 6px 6px 0 0;
}

.country {
  transition:
  all 200ms,
  opacity 400ms;
}

.country:hover {
  transform: scale(1.1);
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4.5em;
}

</style>  
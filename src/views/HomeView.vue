<!-- eslint-disable no-unused-vars -->
<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input 
      type="text"
      v-model="searchQuery"
      @input="getSearchResults"
      placeholder="Search for a City or State" 
      class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]" />
   
  <ul
  class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]"
  v-if="mapboxSearchResults"
  >
    <p class="py-2" v-if="searchError">
    Sorry , Something Went Wrong
    </p>
  <p v-if="!serverError && mapboxSearchResults.length === 0">
    No Results Match your query
  </p>
  <template v-else>
    <li v-for="searchResult in mapboxSearchResults" :key="searchResult.id" class="py-2 cursor-pointer" @click="previewCity(searchResult)">
      {{ searchResult.place_name }}
    </li>
  </template>

  </ul>
   </div>
   <div class="flex flex-col gap-4">
  <Suspense>
  <CityList />
  <template #fallback>
    <CityCardSkeleton />
  </template>
  </Suspense>
   </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import CityList from '../components/CityList.vue';
import CityCardSkeleton from '../components/CityCardSkeleton.vue';

const router = useRouter()

const previewCity = (mapboxSearchResult) => {
  console.log(mapboxSearchResult);
  const [city, state] = mapboxSearchResult.place_name.split(',')
  router.push({
    name: "cityView",
    params: {
      state: state.replaceAll(" ",""),
      city:city
    },
    query: {
      lat: mapboxSearchResult.geometry.coordinates[1],
      lng: mapboxSearchResult.geometry.coordinates[0],
      preview:true,
          }
  })
}

const searchQuery = ref('');
const queryTimeout = ref(null);
const mapboxAPIKey = 'pk.eyJ1IjoiYWRhbWc5OTkiLCJhIjoiY2xmOGc1NjRvMTExMDNwcG92cmYxaDF6ciJ9.p5nHS7hPCcxlebme_8r1eA'
const mapboxSearchResults = ref(null);
const searchError = ref(null);

const getSearchResults = () => {
  console.log(searchQuery);
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async() => {
    if (searchQuery.value !== '') {
      try {
        const result = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIKey}&types=place`);
        console.log(mapboxSearchResults);
        mapboxSearchResults.value = result.data.features;
      } catch (e) {
        searchError.value = true;
      }
      return;
    }
    mapboxSearchResults.value = null;
  },300) 
}
</script>



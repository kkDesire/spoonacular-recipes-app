<template>
  <div>
    <NavBar />

    <UContainer v-if="recipe">
      <h1 class="mt-4 font-bold text-xl pt-12">
        {{ recipe.title }}
      </h1>
      <div class="flex flex-row gap-1 mt-2">
        <UBadge
          v-for="label in recipe.dishTypes"
          :label="label"
          :key="label"
          :variant="'subtle'"
        />
      </div>

      <section class="mt-4 flex flex-col md:flex-row-reverse gap-4 w-full">
        <NuxtImg class="object-cover w-full" :src="recipe.image" :alt="recipe.title" />
        <p class="text-lg max-w-[40ch]" v-html="recipe.summary" />
      </section>
      <div class="flex flex-col md:flex-row gap-2 md:gap-8">
        <section class="py-2 md:py-8 min-w-12">
          <div class="flex flex-col md:flex-row justify-between md:items-center">
            <h2 class="text-lg">Ingredients</h2>
          </div>
          <UTable class="mt-2" :rows="recipe.extendedIngredients" :columns="columns">
            <template #name-data="{ row }">
              <span class="flex flex-row gap-2 items-center">
                <NuxtImg
                  provider="spoonacular"
                  :src="row.image"
                  :height="20"
                  :width="20"
                  :alt="`Image of ${row.name}`"
                />
                {{ row.name }}
                ({{
                  [row.measures[unit].amount, row.measures[unit].unitLong]
                    .filter(Boolean)
                    .join(" ")
                }})
              </span>
            </template>
          </UTable>
        </section>
        <section class="py-2 md:py-8">
          <h2 class="text-lg">Steps</h2>
          <ol>
            <li
              v-for="{ number, step } in recipe.analyzedInstructions?.[0].steps"
              :key="number"
              class="flex items-baseline gap-2"
            >
              <span
                class="flex-shrink-0 inline-flex items-center justify-center rounded-full bg-primary-50 dark:bg-primary-400 dark:bg-opacity-190 text-primary-500 dark:text-primary-100 ring-1 ring-inset ring-primary-500 dark:ring-primary-400 ring-opacity-25 text-xs font-bold w-5 h-5"
              >
                {{ number }}
              </span>
              {{ step }}
            </li>
          </ol>
        </section>
      </div>

      <UButton external :to="recipe.sourceUrl">
        View riginal recipe on {{ recipe.sourceName }}
      </UButton>
    </UContainer>
  </div>
</template>
<script lang="ts" setup>
import type { InternalApi } from "nitropack";
const { data: recipe } = await useFetch("/api/recipes", {
  transform: (data) => data[(Math.random() * data.length) | 0],
});
const columnsToShow: Array<
  keyof InternalApi["/api/recipes"]["get"][number]["extendedIngredients"][number]
> = ["name"];

const columns = columnsToShow.map((col) => ({
  key: col,
  label: col,
}));

const metric = ref(true);
const unit = computed(() => (metric.value ? "metric" : "us"));

const colorModes = [
  {
    name: "System",
    value: "system",
  },
  {
    name: "Light",
    value: "light",
  },
  {
    name: "Dark",
    value: "dark",
  },
];
</script>

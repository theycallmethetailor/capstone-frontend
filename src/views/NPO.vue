<template>
    <v-container>
        <v-layout>
            <v-flex>
                <h1>This is the NPO View!</h1>
                <NPOCard :id="Number(id)" />
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import NPOCard from "../components/NPOCard.vue";
export default {
  name: "NPO",
  props: ["id"],
  components: {
    NPOCard
  }
};
</script>
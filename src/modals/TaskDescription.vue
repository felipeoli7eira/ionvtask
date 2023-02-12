<template>
    <ion-page>
        <ion-content>
            <p class="ion-no-margin">{{ task.optionalDescription }}</p>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">

import { IonContent, IonPage, modalController } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'TaskDescription',
    components: {
        IonContent,
        IonPage
    },

    props: { task: {} },

    data() {
        return {}
    },

    methods: {}
});

</script>

<style scoped>

ion-content {
    --background: #ffffff;
    --padding-top: 3rem;
    --padding-bottom: 3rem;
    --padding-start: 3rem;
    --padding-end: 3rem;
}

ion-content p {
    color: #000;
    font-size: 1rem;
    line-height: 1.4rem;
    text-align: justify;
}

</style>
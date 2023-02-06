<template>
    <ion-page>
        <ion-content>
            <ion-input v-model="task.title" type="text" placeholder="Defina um titulo"></ion-input>
            <ion-textarea v-model="task.optionalDescription" placeholder="Descreva com detalhes (opcional)"></ion-textarea>
            <ion-button :disabled="task.title.length === 0" @click="saveTask()" class="button-save-task">salvar</ion-button>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">

import { IonContent, IonPage, modalController, IonInput, IonTextarea, IonButton } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'CreateTask',
    components: {
        IonContent,
        IonPage,
        IonInput,
        IonTextarea,
        IonButton
    },

    data() {
        return {
            task: {
                title: '',
                optionalDescription: '',
                currentState: 'do'
            }
        }
    },

    methods: {

        async saveTask() {
            await modalController.dismiss({ task: this.task }, 'filled');
        },

    }
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

ion-input, ion-textarea {
    --padding-top: 20px;
    --padding-end: 20px;
    --padding-bottom: 20px;
    --padding-start: 20px;

    background-color: #f1f1f1;
    border-radius: 20px;
    color: #000;
    font-size: 1rem;
    font-weight: 400;
}

ion-input {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
}

ion-textarea {
    margin-top: 0.5rem;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}

.button-save-task {
    --border-radius: 50px;
    --background: #44CF6C;
    --background-activated: #53dd7a;
    font-size: 1rem;
    width: 140px;
    margin: 3rem auto 0 auto;
    display: block;
}

</style>
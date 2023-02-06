<template>
  <ion-page>
    <ion-content :fullscreen="true">

      <div class="tabs-box">
        <div @click="setSelectedMenu()" class="tab" :class="{ 'selected': tabSelected === 'list' }">
          <img src="./../assets/svg/icon-list.svg" alt="Icone de lista">
        </div>
        <div @click="setSelectedMenu('done')" class="tab" :class="{ 'selected': tabSelected === 'done' }">
          <img src="./../assets/svg/icon-check.svg" alt="Icone check">
        </div>
      </div>

      <ion-fab v-if="tabSelected === 'list'" slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button @click="addNewTask()">
          <img src="./../assets/svg/icon-add.svg" alt="Icone add">
        </ion-fab-button>
      </ion-fab>

    </ion-content>
  </ion-page>
</template>

<script lang="ts">

import { IonContent, IonPage, IonFab, IonFabButton, modalController } from '@ionic/vue';
import { defineComponent } from 'vue';

import CreateTask from './../modals/CreateTask.vue';

export default defineComponent({
  name: 'HomePage',
  components: {
    IonContent,
    IonPage,
    IonFab,
    IonFabButton
  },

  data() {
    return {
      tabSelected: 'list'
    }
  },

  methods: {
    setSelectedMenu(tabName = 'list') {
      this.tabSelected = tabName;
    },

    async addNewTask() {
      const modal = await modalController.create({
        component: CreateTask,
        mode: 'ios',
        breakpoints: [0, 0.25, 0.5],
        initialBreakpoint: 0.5
      });

      modal.present();

      // eslint-disable-next-line
      const modalResponse = await modal.onDidDismiss();
    }
  }
});

</script>

<style scoped>

ion-content {
  --background: #E0E2DB;
}

.tabs-box,
.tab {
  height: 70px;
  width: 100%;
}

.tabs-box {
  height: 70px;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.tab {
  display: grid;
  place-items: center;
  background: #CECECE;
}

.tab.selected {
  background: #E0E2DB;
}

.tab img {
  width: 30px;
}

ion-fab {
  bottom: 2rem;
  right: 2rem;
}

ion-fab-button {
  --background: #DFA92C;
  --background-activated: #e4ad2e;
  --background-hover: #e4ad2e;
  width: 55px;
  height: 55px;
}

</style>

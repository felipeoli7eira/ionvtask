<template>
  <ion-page>
    <ion-content :fullscreen="true" scroll-y="false">

      <div class="tabs-box">
        <div @click="setSelectedMenu()" class="tab" :class="{ 'selected': tabSelected === 'list' }">
          <img src="./../assets/svg/icon-list.svg" alt="Icone de lista">
        </div>
        <div @click="setSelectedMenu('done')" class="tab" :class="{ 'selected': tabSelected === 'done' }">
          <img src="./../assets/svg/icon-check.svg" alt="Icone check">
        </div>
      </div>

      <div class="tabs-container">
        <div v-if="tabSelected === 'list'" class="tab tab-tasks-list" :class="{ 'selected': tabSelected === 'list' }">
          <ul class="tasks">
            <li v-for="task of tasks" :key="task.id">
              <p class="ion-no-margin" @click="seeDescription(task.id)">{{ task.title }}</p>
              <span class="btn-done-task"></span>
            </li>
          </ul>
        </div>

        <div v-if="tabSelected === 'done'" class="tab tab-done-tasks" :class="{ 'selected': tabSelected === 'done' }">
          dones
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

import TaskDescriptionVue from '@/modals/TaskDescription.vue';
import { IonContent, IonPage, IonFab, IonFabButton, modalController } from '@ionic/vue';
import { defineComponent } from 'vue';
import CreateTask from './../modals/CreateTask.vue';
import Storage from './../services/storage';

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
      tabSelected: 'list',
      tasks: []
    }
  },

  async ionViewWillEnter() {
    this.tasks = Storage.read('tasks', []);
  },

  methods: {
    setSelectedMenu(tabName = 'list') {
      this.tabSelected = tabName;
    },

    getTasks() {
      return Storage.read('tasks', []);
    },

    async seeDescription(taskID: number) {
      const task: any = this.tasks.find((task: any) => task.id === taskID);

      const modal = await modalController.create({
        component: TaskDescriptionVue,
        mode: 'ios',
        breakpoints: [0, 0.25, 0.40, 1],
        initialBreakpoint: 0.25,
        componentProps: { task }
      });

      modal.present();

      modal.onDidDismiss();
    },

    async openModalFormNewTask() {
      const modal = await modalController.create({
        component: CreateTask,
        mode: 'ios',
        breakpoints: [0, 0.25, 0.5],
        initialBreakpoint: 0.5
      });

      modal.present();

      return modal.onDidDismiss();
    },

    async addNewTask() {

      // eslint-disable-next-line
      const modalResponse = await this.openModalFormNewTask();

      if (modalResponse.role === 'filled') {
        const tasks: any[] = this.getTasks();

        tasks.push({
          id: new Date().getTime(),
          title: modalResponse.data.task.title,
          optionalDescription: modalResponse.data.task.optionalDescription,
          currentState: modalResponse.data.task.currentState
        });

        Storage.define('tasks', tasks);

        this.tasks = this.getTasks();
      }

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

.tabs-container {
  height: 100%;
  overflow-y: auto;
  margin: 0;
}


ul.tasks {
  width: 100%;
  margin: 0;
  padding: 2rem;
  display: grid;
  gap: 1rem;
}

ul.tasks li {
  list-style: none;
  padding: 1.4rem;
  background-color: #ffffff;
  color: #000000;
  font-size: 1.1rem;
  border-radius: 100px;
  text-align: center;
  font-weight: 500;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

ul.tasks li p {
  width: 100%;
}

.btn-done-task {
  width: 25px;
  height: 25px;
  border-radius: 25px;
  border: 1px solid #ABABAB;
  background-color: #D9D9D9;
}

.btn-done-task:active {
  background-color: #44CF6C;
  border-color: #3FC064;
}

</style>

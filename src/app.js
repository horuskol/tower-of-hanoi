import Vue from 'vue';

import TowerGame from './components/tower-of-hanoi';

Vue.component('tower-of-hanoi', TowerGame);

var app = new Vue({
    el: '#app'
});

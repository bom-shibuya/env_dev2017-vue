'use strict';
import 'babel-polyfill';
// import 'whatwg-fetch';
// impot library
// import {
//   TweenMax,
//   TweenLite
// } from 'gsap';
// import ScrollToPlugin from 'ScrollToPlugin';
// import EasePack from 'EasePack';
// import modernizr from 'modernizr';
//
// console.log(modernizr);
import App from './components/App.vue';

import Vue from 'vue/dist/vue.esm';

new Vue({
  el: '#app',
  template: '<App />',
  components: {
    App
  }
});

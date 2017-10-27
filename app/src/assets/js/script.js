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

import Vue from 'vue/dist/vue.js';
import Test from './Test.vue';

new Vue({
  el: '#app',
  template: '<Test />',
  components: {
    Test
  }
});

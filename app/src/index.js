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
import Test from './components/Test.vue';

const Vue = require('vue/dist/vue.js');

new Vue({
  el: '#app',
  template: '<Test />',
  components: {
    Test
  }
});

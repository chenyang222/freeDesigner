/**
  @file: bootstrap script
  @date: 2016-07-25
*/

// bootstrap the app
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
let router = new Router();

// import dynamic app, need route map for app
export default App => {
    router.start(App, 'app');
    return router;
};


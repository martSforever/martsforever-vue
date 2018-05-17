import AppDeveloper from 'src/components/app-developer/app-developer.vue';
import AIconExample from 'src/example/a-icon/a-icon-example.vue';
import AButtonExample from 'src/example/a-button/a-button-example.vue';
import AInputExample from 'src/example/a-input/a-input-example';

export const router = {
  path: '/developer',
  name: 'AppDeveloper',
  component: AppDeveloper,
  children: [
    {path: '/', redirect: '/aIconExample'},
    {path: '/aIconExample', component: AIconExample, name: 'AIconExample'},
    {path: '/aButtonExample', component: AButtonExample, name: 'AButtonExample'},
    {path: '/aInputExample', component: AInputExample, name: 'AInputExample'},
  ]
};

export default {
  router
}

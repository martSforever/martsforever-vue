import AppDeveloper from 'src/components/app-developer/app-developer.vue';
import AIconExample from 'src/example/a-icon/a-icon-example.vue';
import AButtonExample from 'src/example/a-button/a-button-example.vue';
import AInputExample from 'src/example/a-input/a-input-example';
import AGridExample from 'src/example/a-grid/a-grid-example.vue';
import AScrollbarExample from 'src/example/a-scrollbar/a-scrollbar-example.vue';
import ATextareaExample from 'src/example/a-textarea/a-textarea-exmaple.vue';
import ACarouselExample from 'src/example/a-carousel/a-carousel-example.vue';

export const router = {
  path: '/developer',
  component: AppDeveloper,
  children: [
    {path: '/', component: AIconExample, name: 'AIconExample'},
    {path: '/aButtonExample', component: AButtonExample, name: 'AButtonExample'},
    {path: '/aInputExample', component: AInputExample, name: 'AInputExample'},
    {path: '/aIconExample', component: AIconExample, name: 'AIconExample'},
    {path: '/aGridExample', component: AGridExample, name: 'AGridExample'},
    {path: '/aScrollbarExample', component: AScrollbarExample, name: 'AScrollbarExample'},
    {path: '/aTextareaExample', component: ATextareaExample, name: 'ATextareaExample'},
    {path: '/aCarouselExample', component: ACarouselExample, name: 'ACarouselExample'},
  ]
};

export default {
  router
}

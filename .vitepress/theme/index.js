import DefaultTheme from 'vitepress/theme-without-fonts';
import './style.css';
import Layout from './layout.vue';

export default {
  extends: DefaultTheme,
  Layout,
};

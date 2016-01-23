import $ from 'jquery';
import App from './views/App';

window.$ = window.jQuery = $; // This is needed by Bootstrap.

$(() => {
  new App().render();
});

import Inferno from 'inferno';
import createRouter from './components/Router'
import css from './css/main.css';
import css2 from './css/animate.css';
import css3 from './css/modal.css';

Inferno.render(createRouter(), document.getElementById('app'));

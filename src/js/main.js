// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
//import * as bootstrap from 'bootstrap'

//import Alert from 'bootstrap/js/dist/alert'

// or, specify which plugins you need:
//import { Tooltip, Toast, Popover } from 'bootstrap'

import notfound from '../assets/404.svg';


import iamgedemo from '../assets/images/dynamic/2019-08-19.jpg';


/* slideshow library */
import { initializeSlideshow, initializeAutoSlideshow } from './lib/slideshow';
//import { showSlides, plusSlides, currentSlide } from './lib/slideshowgallery';
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the slide show
    initializeSlideshow();
  
  });
/*end slideshow */
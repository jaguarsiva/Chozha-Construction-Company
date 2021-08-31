
// Common
const html = document.querySelector('html');
const sections = document.querySelectorAll('section');

// Header
const nav = document.querySelector('nav');
const navList = document.querySelector('#navList');
const hamburger = document.querySelector('#hamburger');

// Projects
const projectsInner = document.querySelector('#projectsInner');
const modal = document.querySelector('#modal');
const modalContents = document.querySelector('#modalContents');
const closeButton = document.querySelector('#closeButton');
const modalImage = document.querySelector('#modalImage');
const modalCaption = document.querySelector('#modalCaption');

// Flags
let isObserverSet = false;
let isNavEventsSet = false;

function toggleHamburger() {
    hamburger.classList.toggle('is-active');
    nav.classList.toggle('is-open');
    html.classList.toggle('is-frozen');
}

const observer = new IntersectionObserver( entries => {
    entries.forEach( entry => {
        if( entry.isIntersecting ) {
            document.querySelector(`nav a.is-active`).classList.remove('is-active');
            document.querySelector(`a[href$="#${entry.target.className}"]`).classList.add('is-active');
        }
    });
}, { threshold: 0.5, rootMargin: '100px' });

function toggleModal() {
    html.classList.toggle('is-frozen');
    modal.classList.toggle('is-shown');
}

function setModalContents({ imgPath, altText, caption }) {
    modalImage.setAttribute('src', imgPath );
    modalImage.setAttribute('alt', altText );
    modalCaption.innerText = caption;
}

function closeModal() {
    toggleModal();
    setModalContents({
        imgPath: '',
        altText: '',
        caption: ''
    });
}

// Throttle Function Definition
function throttle( functionToThrottle, delayTime ) {
    let toThrottle = false;
    return function() {
        if( toThrottle ) return;
        functionToThrottle.apply(this, arguments);
        toThrottle = true;
        setTimeout( () => {
            toThrottle = false;
        }, delayTime );
    }
}

function init() {
    if( window.innerWidth < 768 ) {

        if( isNavEventsSet ) return;
        // Open and Closing of Nav
        hamburger.addEventListener('click', toggleHamburger );

        // Adding active class on nav links
        // Used Event delegation
        navList.addEventListener('click', event => {
            if( !event.target.matches('a') ) return;
            toggleHamburger();
            navList.querySelector('a.is-active').classList.remove('is-active');
            event.target.classList.add('is-active');
        });
        isNavEventsSet = true;
    }
    else {
        // Adding active class using observer
        if( isObserverSet ) return;

        sections.forEach( section => {
            observer.observe( section );
        });
        isObserverSet = true;
    }
}

const throttledInit = throttle( init, 600 );

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', () => {

    // Init Function called on Initial load...
    init();

    // Show projects image on modal
    // Used Event delegation
    projectsInner.addEventListener('click', event => {

        if( !event.target.matches('.btn-project') ) return;
        const project = projectsInner.querySelector('#project' + event.target.dataset.projectno);
        const projectImage = project.querySelector('img');
        const imageCaption = project.querySelector('figcaption');
        toggleModal();
        setModalContents({
            imgPath: projectImage.getAttribute('src'),
            altText: projectImage.getAttribute('alt'),
            caption: imageCaption.innerText
        });
    });

    modal.addEventListener('click', closeModal );
    closeButton.addEventListener('click', closeModal );
    modalContents.addEventListener('click', event => {
        event.stopPropagation();
    });
});

window.addEventListener('resize', throttledInit );

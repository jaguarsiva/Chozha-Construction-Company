
// Header
const nav = document.querySelector('nav');
const html = document.querySelector('html');
const navLinks = document.querySelectorAll('nav a');
const hamburger = document.querySelector('#hamburger');

// Projects
const projectButtons = document.querySelectorAll('.btn-project');
const projectsInner = document.querySelector('#projectsInner');
const modal = document.querySelector('#modal');
const modalContents = document.querySelector('#modalContents');
const modalImage = document.querySelector('#modalImage');
const modalCaption = document.querySelector('#modalCaption');
const closeButton = document.querySelector('#closeButton');

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', () => {

    // Hamburger
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('is-active');
        nav.classList.toggle('is-open');
        html.classList.toggle('is-frozen');
    });

    // Nav Links
    if( window.innerWidth < 768 ) {
        navLinks.forEach( link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('is-active');
                nav.classList.remove('is-open');
                html.classList.remove('is-frozen');
                document.querySelector('nav a.is-active').classList.remove('is-active');
                link.classList.add('is-active');
            });
        });
    }

    // Projects
    projectButtons.forEach( btn => {
        btn.addEventListener('click', () => {
            const project = projectsInner.querySelector('#project' + btn.dataset.projectno);
            const imgPath = project.querySelector('img').getAttribute('src');
            const altText = project.querySelector('img').getAttribute('alt');
            const caption = project.querySelector('figcaption').innerText;
            html.classList.add('is-frozen');
            modal.classList.add('is-shown');
            modalImage.setAttribute('src', imgPath );
            modalImage.setAttribute('alt', altText );
            modalCaption.innerText = caption;
        });
    });

    function closeModal() {
        modalImage.setAttribute('src', '' );
        modalImage.setAttribute('alt', '' );
        modalCaption.innerText = '';
        html.classList.remove('is-frozen');
        modal.classList.remove('is-shown');
    }

    closeButton.addEventListener('click', closeModal );
    modal.addEventListener('click', closeModal );
    modalContents.addEventListener('click', event => {
        event.stopPropagation();
    });

    // Observer
    if( 768 <= window.innerWidth ) {
        const sections = document.querySelectorAll('section');

        var observer = new IntersectionObserver( entries => {
            entries.forEach( entry => {
                if( entry.isIntersecting ) {
                    document.querySelector(`nav a.is-active`).classList.remove('is-active');
                    document.querySelector(`a[href$="#${entry.target.className}"]`).classList.add('is-active');
                }
            });
        }, { threshold: 0.5, rootMargin: '100px' });

        sections.forEach( section => observer.observe( section ) );
    }
});
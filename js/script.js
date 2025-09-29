// =======================
// VARIABLES GLOBALES
// =======================
// Je définis mes variables principales pour les animations
let isScrolling = false;

// =======================
// INITIALISATION
// =======================
// Je lance tout quand la page est chargée
document.addEventListener('DOMContentLoaded', function() {
    console.log('Je démarre mon portfolio parallax !');
    
    // J'initialise toutes mes fonctions
    initSmoothScroll();
    initParallaxEffects();
    initSkillsAnimation();
    initProjectsAnimation();
    initNavbarScroll();
    
    console.log('Toutes mes animations sont prêtes !');
});

// =======================
// SCROLL FLUIDE POUR LA NAVIGATION
// =======================
// Je rends la navigation fluide quand on clique sur les liens
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // J'empêche le comportement par défaut
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Je calcule la position en tenant compte de la navbar
                const offsetTop = targetSection.offsetTop - 80;
                
                // J'anime le scroll vers la section
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                console.log(`Je navigue vers ${targetId}`);
            }
        });
    });
}

// =======================
// EFFETS PARALLAX AU SCROLL
// =======================
// Je crée des effets parallax époustouflants
function initParallaxEffects() {
    const parallaxBg = document.querySelector('.parallax-bg');
    const heroContent = document.querySelector('.hero-content');
    
    // J'écoute le scroll pour animer l'arrière-plan
    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            // J'utilise requestAnimationFrame pour des performances optimales
            requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5; // Vitesse du parallax
                
                // Je bouge l'arrière-plan à une vitesse différente
                if (parallaxBg) {
                    parallaxBg.style.transform = `translate3d(0, ${rate}px, 0)`;
                }
                
                // Je crée un effet de fade sur le contenu hero
                if (heroContent) {
                    const opacity = Math.max(0, 1 - (scrolled / window.innerHeight));
                    heroContent.style.opacity = opacity;
                }
                
                isScrolling = false;
            });
            
            isScrolling = true;
        }
    });
}

// =======================
// ANIMATION DES BARRES DE COMPÉTENCES
// =======================
// J'anime les barres de compétences quand elles deviennent visibles
function initSkillsAnimation() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    // Je crée un observer pour détecter quand les éléments sont visibles
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Je récupère la largeur cible de la barre
                const targetWidth = entry.target.getAttribute('data-width');
                
                // J'anime la barre avec un délai pour l'effet cascade
                setTimeout(() => {
                    entry.target.style.width = targetWidth;
                    console.log(`J'anime la compétence : ${targetWidth}`);
                }, 200);
                
                // Je n'observe plus cet élément une fois animé
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5 // Je déclenche quand 50% de l'élément est visible
    });
    
    // J'observe toutes les barres de compétences
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// =======================
// ANIMATION DES CARTES PROJET
// =======================
// J'anime l'apparition des cartes de projet
function initProjectsAnimation() {
    const projectCards = document.querySelectorAll('.project-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Je crée un délai différent pour chaque carte
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    console.log(`J'affiche le projet ${index + 1}`);
                }, index * 200); // 200ms de délai entre chaque carte
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });
    
    // J'initialise toutes les cartes comme invisibles
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.6s ease-out';
        
        // J'observe chaque carte
        observer.observe(card);
    });
}

// =======================
// NAVBAR QUI CHANGE AU SCROLL
// =======================
// Je fais changer l'apparence de la navbar au scroll
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            // Je rends la navbar plus opaque quand on scroll
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
            console.log('Je change le style de la navbar');
        } else {
            // Je remet la transparence en haut de page
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// =======================
// CURSEUR PERSONNALISÉ
// =======================
// J'ajoute un curseur personnalisé pour l'effet wow
function initCustomCursor() {
    // Je crée un élément curseur personnalisé
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    // Je le fait suivre la souris
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Je change l'apparence sur les éléments cliquables
    const clickableElements = document.querySelectorAll('a, button, .project-card');
    
    clickableElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
        });
    });
}

// =======================
// EFFETS SONORES
// =======================
// J'ajoute des micro-interactions sonores
function addSoundEffects() {
    // Je peux ajouter des sons subtils aux interactions
    const buttons = document.querySelectorAll('button, .btn-primary, .btn-secondary');
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Ici je pourrais ajouter un petit son de clic
            console.log('Clic avec effet sonore !');
        });
    });
}

// =======================
// PERFORMANCE OPTIMIZATIONS
// =======================
// J'optimise les performances avec throttling
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// J'optimise l'événement scroll
const optimizedScrollHandler = throttle(function() {
    // Mes fonctions de scroll optimisées
    console.log('Scroll optimisé !');
}, 16); // 60fps

// =======================
// DEBUG ET DÉVELOPPEMENT
// =======================
// J'ajoute des fonctions utiles pour le debug
function debugAnimations() {
    console.log('État des animations :');
    console.log('- Parallax:', document.querySelector('.parallax-bg') ? 'OK' : 'KO');
    console.log('- Compétences:', document.querySelectorAll('.skill-progress').length);
    console.log('- Projets:', document.querySelectorAll('.project-card').length);
}

// Je lance le debug en mode développement
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    setTimeout(debugAnimations, 2000);
}

console.log('Portfolio Parallax chargé avec succès !');

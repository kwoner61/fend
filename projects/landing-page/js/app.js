/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/
      
/**
 * Define Global Variables
 * 
*/
let navList = {};
let activeSectionId = "section1";

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function addToNav(id, name, navFragment) {
    let navItem = document.createElement("li");
    let navItemLink = document.createElement("a");
    navItemLink.innerHTML = name;
    navItemLink.setAttribute("class", "menu__link");
    navItemLink.setAttribute("href", "./index.html#".concat(id));
    navItemLink.setAttribute("data-section-id", id);
    addClickEventListener(navItemLink);
    navItem.appendChild(navItemLink);
    navFragment.appendChild(navItem);
};

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNavList() {
    const sections = document.getElementsByTagName("section");
    let navListFragment = new DocumentFragment();
    for (const section of sections) {
        const sectionId = section.getAttribute("id");
        addToNav(sectionId, section.getAttribute("data-nav"), navListFragment);
    }
    navList.appendChild(navListFragment);
}

// Add class 'active' to section when near top of viewport
function onScroll(event) {
    const sections = document.getElementsByTagName("section");
    let nearestSection = {};
    let smallestTop = Number.MAX_VALUE;
    for (const section of sections) {
        const sectionId = section.getAttribute("id");
        const sectionTop = Math.abs(section.getBoundingClientRect().top);
        if (sectionTop < smallestTop) {
            smallestTop = sectionTop;
            nearestSection = section;
        }
    }
    let sectionClass = nearestSection.classList;
    if (!sectionClass.contains("section--active")) {
        sectionClass.add("section--active");
    }
    if (nearestSection.getAttribute("id") !== activeSectionId) {
        document.getElementById(activeSectionId).classList.remove("section--active");
        activeSectionId = nearestSection.getAttribute("id");
    }
}

// Scroll to anchor ID using scrollTO event
function onNavClick(event) {
    event.preventDefault();
    const sectionId = event.target.getAttribute("data-section-id");
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
}


/**
 * End Main Functions
 * Begin Events
 * 
*/
document.addEventListener('DOMContentLoaded', onDomContentLoaded);

// Build menu 
function onDomContentLoaded() {
    navList = document.querySelector("#navbar__list");
    navList.style.display = "none";
    buildNavList();
    navList.style.display = "block";
    addScrollEventListener();
};

// Scroll to section on link click
function addClickEventListener() {
    navList.addEventListener("click", onNavClick);
}

// Set sections as active
function addScrollEventListener() {
    window.addEventListener("scroll", onScroll);
}


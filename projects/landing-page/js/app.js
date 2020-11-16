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
const activeSectionClassName = "section--active";
const activeNavClassName = "menu__link--active";
let navList = {};
let isScrolling = false;

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

function toggleActiveNavLink(sectionId) {
    let navLinks = document.querySelectorAll(".menu__link");

    // Remove current active class
    for (let navLink of navLinks) {
        navLink.classList.remove(activeNavClassName);
    }

    let activeNavLink = document.querySelector("a[data-section-id=\"" + sectionId + "\"]");
    activeNavLink.classList.add(activeNavClassName);
}

function toggleActiveSection() {
    const sections = document.getElementsByTagName("section");
    const header = document.querySelector(".main__hero > h1");
    let currentHeightSum = 0;

    for (let section of sections) {
        section.classList.remove(activeSectionClassName);
    }

    if (window.scrollY <= header.offsetHeight / 2) {
        toggleActiveNavLink("home");
        return;
    }

    for (const section of sections) {
        currentHeightSum += section.offsetHeight;
        if (window.scrollY <= currentHeightSum) {
            section.classList.add(activeSectionClassName);
            toggleActiveNavLink(section.getAttribute("id"));
            return;
        }
    }
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
function buildNavList() {
    const sections = document.getElementsByTagName("section");
    let navListFragment = new DocumentFragment();
    addToNav("home", "Home", navListFragment);
    for (const section of sections) {
        const sectionId = section.getAttribute("id");
        addToNav(sectionId, section.getAttribute("data-nav"), navListFragment);
    }
    navList.appendChild(navListFragment);
}

// Add class 'active' to section when near top of viewport
function onScroll(event) {
    isScrolling = true;

	// Clear timeout while user is scrolling
	window.clearTimeout( isScrolling );

	// Set a timeout to run after scrolling ends
	isScrolling = setTimeout(toggleActiveSection, 150);
}

// Scroll to anchor ID using scrollTO event
function onNavClick(event) {
    event.preventDefault();
    let sectionId = event.target.getAttribute("data-section-id");

    // User clicks the Home button
    if (sectionId == "home") {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        const section = document.getElementById(sectionId);
        section.scrollIntoView({ behavior: 'smooth' });
    }
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
    toggleActiveSection();
};

// Scroll to section on link click
function addClickEventListener() {
    navList.addEventListener("click", onNavClick);
}

// Set sections as active
function addScrollEventListener() {
    window.addEventListener("scroll", onScroll);
}

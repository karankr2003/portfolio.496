window.addEventListener("load", () =>{
    document.querySelector(".main").classList.remove("hidden");
    document.querySelector(".home-section").classList.add("active");
    /*----page loader----*/
    document.querySelector(".page-loader").classList.add("fade-out");
    setTimeout(() =>{
        document.querySelector(".page-loader").style.display = "none";
    },600);
});

/*-----------------------toggle navbar------------------*/
const navToggler = document.querySelector(".nav-toggler");
navToggler.addEventListener("click", () =>{
   hideSection();
    toggleNavbar();
    document.body.classList.toggle("hide-scrolling");
});
function hideSection(){
    document.querySelector("section.active").classList.toggle("fade-out");
}
function toggleNavbar(){
    document.querySelector(".header").classList.toggle("active");
}

/*--------------------Active section------------------*/
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("link-item") && e.target.hash !== ""){
        //active the overlay
        document.querySelector(".overlay").classList.add("active");
        navToggler.classList.add("hide");
        if(e.target.classList.contains("nav-item")){
            toggleNavbar();
        }
        else{
            hideSection();
            document.body.classList.add("hide-scrolling");
        }
        setTimeout(() =>{
            document.querySelector("section.active").classList.remove("active","fade-out");
            document.querySelector(e.target.hash).classList.add("active");
            window.scrollTo(0,0);
            document.body.classList.remove("hide-scrolling");
            navToggler.classList.remove("hide");
            document.querySelector(".overlay").classList.remove("active");

        },500);
    }
});
/*--------------------About Tabs------------------*/ 

document.addEventListener("click", (e) =>{
    if(e.target.classList.contains("tab-item") && !e.target.classList.contains("active")){
        document.querySelector(".active").classList.remove("active");
        e.target.classList.add("active");
        const target = e.target.getAttribute("data-target");
        const activeTabContent = document.querySelector(".tab-content.active");
        if (activeTabContent !== null) {
            activeTabContent.classList.remove("active");
        }
        const targetTabContent = document.querySelector(target);
        if (targetTabContent !== null) {
            targetTabContent.classList.add("active");
        }
    }
});
window.addEventListener("popstate", (e) => {
    const sectionId = window.location.hash;
    if (sectionId) {
        document.querySelector("section.active").classList.remove("active", "fade-out");
        document.querySelector(sectionId).classList.add("active");
    }
});
                             
/*---------portfolio item details popup--------*/
document.addEventListener("click", (e) => {
    if(e.target.classList.contains("view-project-btn")){
        togglePortfolioPopup();
        document.querySelector(".portfolio-popup").scrollTop = (0,0);
        PortfolioItemDetails(e.target.parentElement);
    }
})
function togglePortfolioPopup(){
    document.querySelector(".portfolio-popup").classList.toggle("open");
    document.body.classList.toggle("hide-scrolling");
    document.querySelector(".main").classList.toggle("fade-out");
}
document.querySelector(".pp-close").addEventListener("click",togglePortfolioPopup) 

//hide popup when clicking outside of it
document.addEventListener("click", (e)=> {
    if(e.target.classList.contains("pp-inner")) {
        togglePortfolioPopup();
    }
});

function PortfolioItemDetails(portfolioItem) {
    document.querySelector(".pp-thumbnail img").src = 
    portfolioItem.querySelector(".portfolio-item-thumbnail img").src;

    document.querySelector(".pp-header h3").innerHTML =
    portfolioItem.querySelector(".portfolio-item-title").innerHTML;

    document.querySelector(".pp-body ").innerHTML =
    portfolioItem.querySelector(".portfolio-item-details").innerHTML;
}

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("link-item") && e.target.hash !== "") {
        e.preventDefault(); // prevent the default link behavior
        const target = e.target.hash;
        const section = document.querySelector(target);
        if (section !== null) {
            hideSection();
            document.body.classList.add("hide-scrolling");
            setTimeout(() => {
                document.querySelector("section.active").classList.remove("active", "fade-out");
                section.classList.add("active");
                window.scrollTo(0, 0);
                document.body.classList.remove("hide-scrolling");
                navToggler.classList.remove("hide");
                document.querySelector(".overlay").classList.remove("active");
                history.pushState(null, null, target); // update the browser's history
            }, 500);
        }
    }
});
let nav = document.getElementById('navbar');
window.onscroll = function () {
    if (document.body.scrollTop >= 400 || document.documentElement.scrollTop >= 400) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }
};

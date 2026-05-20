const nav = document.querySelector('.header__inner')

window.addEventListener('scroll' , function() {
    const navScroll = window.scrollY

    if(navScroll > 60) {
        nav.classList.add('fix');
    }
    else {
        nav.classList.remove('fix');
    }
})
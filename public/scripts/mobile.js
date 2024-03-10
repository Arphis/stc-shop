const mobileMenuBtnElement = document.getElementById('mobile-menu-btn');

const mobileMenuElement = document.getElementById('mobile-menu');
const swiperSection = document.querySelector('.trending')
function toggleMobileMenu () {

mobileMenuElement.classList.toggle('open');//adds the open class and then removes it with each click

swiperSection.classList.toggle('close');


}

mobileMenuBtnElement.addEventListener('click', toggleMobileMenu);
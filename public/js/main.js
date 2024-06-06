const buttons = document.querySelectorAll('.navigation .menu button');
const dropdowns = document.querySelectorAll('.dropdown');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const id = button.id;
    const dropdown = document.getElementById(`${id}-dropdown`);

    dropdown.classList.toggle('show');
    button.classList.toggle('active');
  });
});

dropdowns.forEach(dropdown => {
  dropdown.addEventListener('click', () => {
    const buttonId = dropdown.id.replace('-dropdown', '');
    const button = document.getElementById(buttonId);

    dropdown.classList.remove('show');
    button.classList.remove('active');
  });
});


window.addEventListener('scroll', () => {
  const navigation = document.querySelector('.navigation');
  if (window.scrollY > 8) {
    navigation.classList.add('scrolled');
  } else {
    navigation.classList.remove('scrolled');
  }
});


// if .navigation .mobile-menu button is clicked toggle the class 'show' on .navigation .menu
const mobileMenuButton = document.querySelector('.navigation .mobile-menu button');
const menu = document.querySelector('.navigation .menu');

mobileMenuButton.addEventListener('click', () => {
  menu.classList.toggle('show');
  // change text of button
  if (menu.classList.contains('show')) {
    mobileMenuButton.innerHTML = `Sluit menu <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 12H21M3 6H21M9 18H21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `;
  } else {
    mobileMenuButton.innerHTML = `Open menu <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 12H21M3 6H21M9 18H21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `;
  }
});
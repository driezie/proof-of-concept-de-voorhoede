// Als je scrollt, voeg een class toe aan de navigatiebalk
window.addEventListener('scroll', () => {
  const navigation = document.querySelector('.navigation');
  if (window.scrollY > 8) {
    navigation.classList.add('scrolled');
  } else {
    navigation.classList.remove('scrolled');
  }
});



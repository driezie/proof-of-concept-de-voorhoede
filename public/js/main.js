const buttons = document.querySelectorAll('.navigation .menu button');
const dropdowns = document.querySelectorAll('.dropdown');

buttons.forEach(button => {
  button.addEventListener('mouseover', () => {
    const id = button.id;
    const dropdown = document.getElementById(`${id}-dropdown`);

    dropdown.classList.add('show');
    button.classList.add('active');
  });

  button.addEventListener('mouseout', () => {
    const id = button.id;
    const dropdown = document.getElementById(`${id}-dropdown`);

    dropdown.addEventListener('mouseover', () => {
      dropdown.classList.add('show');
      button.classList.add('active');
    });

    dropdown.addEventListener('mouseout', () => {
      dropdown.classList.remove('show');
      button.classList.remove('active');
    });

    dropdown.classList.remove('show');
    button.classList.remove('active');
  });
});

dropdowns.forEach(dropdown => {
  dropdown.addEventListener('mouseover', () => {
    const buttonId = dropdown.id.replace('-dropdown', '');
    const button = document.getElementById(buttonId);

    dropdown.classList.add('show');
    button.classList.add('active');
  });

  dropdown.addEventListener('mouseout', () => {
    const buttonId = dropdown.id.replace('-dropdown', '');
    const button = document.getElementById(buttonId);

    dropdown.classList.remove('show');
    button.classList.remove('active');
  });
});


window.addEventListener('scroll', () => {
  const navigation = document.querySelector('.navigation');
  if (window.scrollY > 16) {
    navigation.classList.add('scrolled');
  } else {
    navigation.classList.remove('scrolled');
  }
});
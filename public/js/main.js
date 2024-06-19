// Als je scrollt, voeg een class toe aan de navigatiebalk
window.addEventListener('scroll', () => {
  const navigation = document.querySelector('.navigation');
  if (window.scrollY > 8) {
    navigation.classList.add('scrolled');
  } else {
    navigation.classList.remove('scrolled');
  }
});


const memberListElement = document.getElementById('memberList');
const vacancyListElement = document.getElementById('vacancyList');

// Function to fetch data from the API
async function fetchData(endpoint) {
  const response = await fetch(endpoint);
  return response.json();
}

// Function to update the members list
async function updateMembers() {
  const data = await fetchData('/api/members'); // Adjust the endpoint as necessary
  const newMemberList = document.createElement('div');

  data.forEach(member => {
    const memberItem = document.createElement('div');
    memberItem.className = 'item';
    memberItem.textContent = member.name; // Adjust based on your data structure
    newMemberList.appendChild(memberItem);
  });

  memberListElement.innerHTML = newMemberList.innerHTML;
}

// Function to update the vacancies list
async function updateVacancies() {
  const data = await fetchData('/api/vacancies'); // Adjust the endpoint as necessary
  const newVacancyList = document.createElement('div');

  data.forEach(vacancy => {
    const vacancyItem = document.createElement('div');
    vacancyItem.className = 'item';
    vacancyItem.textContent = vacancy.title; // Adjust based on your data structure
    newVacancyList.appendChild(vacancyItem);
  });

  vacancyListElement.innerHTML = newVacancyList.innerHTML;
}

// Function to periodically update both lists
function startLiveUpdates() {
  updateMembers();
  updateVacancies();

  setInterval(() => {
    document.startViewTransition(() => {
      updateMembers();
      updateVacancies();
    });
  }, 5000); // Update every 5 seconds
}

// Start the live updates when the page loads
document.addEventListener('DOMContentLoaded', startLiveUpdates);


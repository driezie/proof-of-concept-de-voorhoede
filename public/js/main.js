document.body.addEventListener('submit', formHandler)

async function toggleFavoriteClient(itemId, isLiked, isLikedId, apiUrl) {
  const url = isLiked ? `${apiUrl}/tm_likes/${isLikedId}` : `${apiUrl}/tm_likes`;
  const method = isLiked ? 'DELETE' : 'POST';
  const body = isLiked ? null : JSON.stringify({ playlist: itemId, user: 4 });

  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: body,
  });

  if (!response.ok) {
    throw new Error('Failed to update favorites');
  } else {
    console.log('Favorites updated successfully');
  }
}

function checkIfLiked(playlist, array) {
  const isLiked = array.some(likedPlaylist => likedPlaylist.playlist === playlist.id);
  return {
    ...playlist,
    isLiked: isLiked
  };
}

function updateFavorites() {
  const apiUrl = 'https://fdnd-agency.directus.app/items';

  fetch(`${apiUrl}/tm_playlist?fields=*.*.*.*`)
    .then(response => response.json())
    .then(playlistsData => {
      const playlists = playlistsData.data;

      return fetch(`${apiUrl}/tm_likes?filter={"user":"4"}`)
        .then(response => response.json())
        .then(likedPlaylistsData => {
          const likedPlaylists = likedPlaylistsData.data;

          const playlistsWithLikedStatus = playlists.map(playlist => {
            return checkIfLiked(playlist, likedPlaylists);
          });

          const likedPlaylistsOnly = playlistsWithLikedStatus.filter(playlist => playlist.isLiked);

          return fetch('/')
            .then(response => response.text())
            .then(updatedHtml => {
              if (document.startViewTransition) {
                document.startViewTransition(() => {
                  document.body.innerHTML = updatedHtml;
                });
              } else {
                document.body.innerHTML = updatedHtml;
              }
            });
        });
    })
    .catch(error => {
      console.error(error);
    });
}

function formHandler(e) {
  e.target.classList.add('loading');
  e.target.querySelector('button').setAttribute('disabled', 'disabled');

  const formData = new FormData(e.target);
  formData.append("enhanced", "true");
  const itemId = formData.get('itemId');
  const isLiked = formData.get('isLiked') === 'true'; // Assuming a boolean value is sent
  const isLikedId = formData.get('isLikedId');

  const apiUrl = 'https://fdnd-agency.directus.app/items';

  try {
    toggleFavoriteClient(itemId, isLiked, isLikedId, apiUrl); // Call toggleFavoriteClient here
    updateFavorites(); // Update favorites after toggling
  } catch (error) {
    console.error(error);
  }
  e.preventDefault();
}



// Left tabje

document.addEventListener('DOMContentLoaded', function() {
  // Variable creation
  const storiesButton = document.querySelector('.storiesButton');
  const playlistsButton = document.querySelector('.playlistsButton');
  const storiesContent = document.querySelector('.list-stories');
  const playlistsContent = document.querySelector('.list-playlists');
  playlistsContent.classList.add('hidden');

  storiesButton.addEventListener('click', function() {
    showStories();
  });

  playlistsButton.addEventListener('click', function() {
    showPlaylists();
  }); 


  // stories laten zien 
  function showStories() {
      storiesContent.classList.remove('hidden');
      playlistsContent.classList.add('hidden');
  }

  function showPlaylists() {
      playlistsContent.classList.remove('hidden');
      storiesContent.classList.add('hidden');
  }
});
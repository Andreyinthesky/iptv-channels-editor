import {deleteCookie} from "./cookieHelpers";

export function getDefaultChannel() {
  return {
    selected: false,
    attributes: {
      groupTitle: null,
      tvgId: null,
      tvgLogoPath: null,
      tvgName: null,
    },
    duration: -1,
    groupTitle: "Неизвестно",
    id: 0,
    path: "",
    title: "Канал #",
  };
}

export function loadPlaylistById(id) {
  if (!id)
    return;

  return fetch(`api/playlist/get/${id}`)
    .then(response => {
      if (response.status !== 200) {
        if (response.status === 404) {
          deleteCookie("currentPlaylistId");
        }
        return null;
      }
      return response.json();
    })
    .then(playlist => {
      if (!playlist || !playlist.id)
        return;

      if (!playlist.channels)
        playlist.channels = [];

      return playlist;
    })
    .catch(error => console.error('Error:', error));
}

export function savePlaylist(playlistId, playlist) {
  return fetch(`api/playlist/${playlistId}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(playlist),
  })
    .then(response => {
      if (response.status === 204) {
        console.log("saved successfully");
        return true;
      } else {
        console.error("Error: playlist is not saved, please try again");
      }
    })
    .catch(error => {
      console.error('Network error:', error);
    });
}

export function checkChannel(channel) {
  return fetch(`api/channel/check?path=${channel.path}`)
    .then(response => {
      return response.json();
    })
    .catch(error => console.error('Error:', error));
}

export function loadSampleChannels() {
  fetch('api/sampleChannels')
    .then(response => response.json())
    .catch(error => console.error('Error:', error));
};
  
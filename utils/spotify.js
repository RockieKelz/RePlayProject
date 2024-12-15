import AsyncStorage from '@react-native-async-storage/async-storage';

/*=======================================================
=            Authorization Logic            =
=======================================================*/
const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = "http://localhost:19006/Home";
const clientId = "fa3defefdad641c9bc8540d03281e562";
const params = new URLSearchParams(window.location.search);
export let code = params.get("code");
const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-follow-read",
  "user-modify-playback-state",
  "streaming",
  "user-read-email",
  "user-read-private",
  "user-library-read",
  "user-library-modify",
  "playlist-read-private",
  "playlist-read-collaborative"
];

//create code verifier
function generateCodeVerifier(length) {
  let value = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
      value += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return value;
}

//generate a SHA256 hash of the code verifier
async function generateCodeChallenge(codeVerifier) {
  const encoder = new TextEncoder().encode(codeVerifier);
  const data = await window.crypto.subtle.digest('SHA-256', encoder);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(data)]))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
}

//request authorization to for user to use spotify's data within the app 
export const handleLoginAuth =async ()=>{
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    AsyncStorage.setItem("verifier", verifier);
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", redirectUri);
    params.append("scope", scopes);
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    window.location = `${authEndpoint}?${params.toString()}`;
}

/*=======================================================
=            Token Logic            =
=======================================================*/

//get the access token from spotify 
export async function getAccessToken() {
  let verifier = await AsyncStorage.getItem("verifier");

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("grant_type", 'authorization_code');
  params.append("code", code);
  params.append("redirect_uri", redirectUri);
  params.append("code_verifier", verifier);

  const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params
  });

  const access_token = await result.json();
  return access_token.access_token;
}

//save the access token using async storage
export const saveAuthToken = async () => {
    const accessToken = await getAccessToken();
    try {
      await AsyncStorage.setItem("access_token", accessToken);
    } catch {
      console.log(error);
    }  
}

export const logOut = () => {
  AsyncStorage.removeItem('token_timestamp')
  AsyncStorage.removeItem('access_token')
  AsyncStorage.removeItem('refresh_token')
  AsyncStorage.removeItem('session')
  window.location.href='/'
}
const SPOTIFY_API_URL = "https://api.spotify.com/v1";

/*=======================================================
=            User Data Logic                     =
=======================================================*/
export async function fetchProfile(token) {
  const response = await fetch(`${SPOTIFY_API_URL}/me`, {
      method: "GET", 
      headers: { Authorization: `Bearer ${token}`,}
  });
  console.log(response);
  return await response.json();
}

export async function fetchUsersPlaylists(token) {
  try {
    const response = await fetch(`${SPOTIFY_API_URL}/me/playlists`, {
      method: "GET", 
      headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (response.status === 429) {
      const retryAfter = response.headers.get('Retry-After');
      console.log(`Rate limit exceeded. Retrying after ${retryAfter} seconds.`);
      setTimeout(() => fetchUsersPlaylists(token), retryAfter * 1000);
    } else if (response.ok) {
      console.log(response);
      return await response.json();
    } else {
      console.error('Error fetching playlists:', response.statusText);
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

export async function fetchRecentlyPlayed(token) {
  const response = await fetch(`${SPOTIFY_API_URL}/me/player/recently-played?limit=10`, {
    method: "GET", 
    headers: {
          Authorization: `Bearer ${token}`
        }
  });
  console.log(response);
  return await response.json();
}

export async function fetchUsersTopItems(type, token) {
  const response = await fetch(`${SPOTIFY_API_URL}/me/top/${type}?limit=10`, {
    method: "GET", 
    headers: {
          Authorization: `Bearer ${token}`
        }
  });
  console.log(response);
  return await response.json();
}

//can use user's top songs/artists to get recommendations 
export async function fetchRecommedations(top_artists, top_tracks, token) {
  const response = await fetch(`${SPOTIFY_API_URL}/recommendations?limit=10&seed_artists=${top_artists}&seed_tracks=${top_tracks}`, {
    method: "GET", 
    headers: {
          Authorization: `Bearer ${token}`
        }
  });
  console.log(response);
  return await response.json();
}
/* Fetch Artist, Albums, Songs for Library Page */
export async function fetchSavedTracks(token) {
  const response = await fetch(`${SPOTIFY_API_URL}/me/tracks`, {
    method: "GET", 
    headers: {
          Authorization: `Bearer ${token}`
        }
  });
  console.log(response);
  return await response.json();
}
export async function fetchSavedAlbums(token) {
  const response = await fetch(`${SPOTIFY_API_URL}/me/albums`, {
    method: "GET", 
    headers: {
          Authorization: `Bearer ${token}`
        }
  });
  console.log(response);
  return await response.json();
}
export async function fetchFollowedArtists(token) {
  const response = await fetch(`${SPOTIFY_API_URL}/me/following?type=artist`, {
    method: "GET", 
    headers: {
          Authorization: `Bearer ${token}`
        }
  });
  console.log(response);
  return await response.json();
}
/*=======================================================
=            Fetch Spotify Data Logic              =
=======================================================*/
export async function fetchPlaylist(playlist_id, token) {
  const response = await fetch(`${SPOTIFY_API_URL}/playlists/${playlist_id}`, {
    method: "GET", 
    headers: {
          Authorization: `Bearer ${token}`
        }
  });
  console.log(response);
  return await response.json();
}

export async function fetchNewReleases(token) {
  const response = await fetch(`${SPOTIFY_API_URL}/browse/new-releases?limit=10`, {
    method: "GET", 
    headers: {
          Authorization: `Bearer ${token}`
        }
  });
  console.log(response);
  return await response.json();
}

export async function fetchCategories(token) {
  const response = await fetch(`${SPOTIFY_API_URL}/browse/categories?limit=20`, {
    method: "GET", 
    headers: {
          Authorization: `Bearer ${token}`
        }
  });
  console.log(response);
  return await response.json();
}

export async function fetchCategorysPlaylists(category_id) {
  const response = await fetch(`${SPOTIFY_API_URL}/browse/categories/${category_id}/playlists`, {
    method: "GET", 
    headers: {
          Authorization: `Bearer ${savedToken}`
        }
  });
  console.log(response);
  return await response.json();
}

export async function fetchSearchResults(search_input, token) {
  const response = await fetch(`${SPOTIFY_API_URL}/search?q=${search_input}&type=artist,track,album`,{
    method: "GET", 
    headers: {
          Authorization: `Bearer ${token}`
        }
  });
  console.log(response);
  return await response.json();
}
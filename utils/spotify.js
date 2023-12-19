import AsyncStorage from '@react-native-async-storage/async-storage';

/*=======================================================
=            Authorization Logic            =
=======================================================*/
const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = "http://localhost:19006";
const clientId = "fa3defefdad641c9bc8540d03281e562";
const params = new URLSearchParams(window.location.search);
const code = params.get("code");
const scopes = [
      "user-read-currently-playing",
      "user-top-read",
      "user-modify-playback-state",
      "streaming",
      "user-read-email",
      "user-read-private",
      "user-library-read",
      "user-library-modify"
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
  const verifier = AsyncStorage.getItem("verifier");

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", redirectUri);
  params.append("code_verifier", verifier);

  const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params
  });

  const { access_token } = await result.json();
  return access_token;
}

//save the access token using async storage
export const saveAuthToken = async () => {

  const accessToken = await getAccessToken(clientId, code);
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
  window.location.href='/'
}
import { reducerCaseActions } from "./constants";

//Set up the initial state for app data
export const initialState = {
  token: null,
  userInfo: null,
  playlists: [],
  currentPlaying: null,
  playerState: false,
  selectedPlaylist: null,
  selectedPlaylistId: "37i9dQZF1E37jO8SiMT0yN",
};

//Change the app's state using the current state and reducer's case actions
const reducer = (state, action) => {
  switch (action.type) {
    case reducerCaseActions.SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case reducerCaseActions.SET_USER:
      return {
        ...state,
        userInfo: action.userInfo,
      };
      case reducerCaseActions.SET_ALBUMS:
      return {
        ...state,
        albums: action.albums,
      };
      case reducerCaseActions.SET_PLAYER_STATE:
        return {
          ...state,
          playerState: action.playerState,
        };
      case reducerCaseActions.SET_PLAYING:
        return {
          ...state,
          currentPlaying: action.currentPlaying,
        };
      case reducerCaseActions.SET_PLAYLISTS:
        return {
          ...state,
          playlists: action.playlists,
        };

    case reducerCaseActions.SET_PLAYLIST_ID:
      return {
        ...state,
        selectedPlaylistId: action.selectedPlaylistId,
      };
    case reducerCaseActions.SET_RECENTLYPLAYED:
      return {
        ...state,
        recentlyplayed: action.recentlyplayed,
      };     
    case reducerCaseActions.SET_SEARCHRESULTS:
      return {
        ...state,
        artists: action.artists,
        tracks: action.tracks,
        albums: action.albums,
      };
    default:
      return state;
  }
};

export default reducer;
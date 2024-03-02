import { reducerCaseActions } from "./constants";

//Set up the initial state for app data
export const initialState = {
  token: null,
  currentPlaying: null,
  featuredPlaylists: null,
  newReleases: null,
  playlists: [],
  playerState: false,
  recentlyplayed: null,
  selectedPlaylist: null,
  selectedPlaylistId: "37i9dQZF1E37jO8SiMT0yN",
  user: {
    displayName: null,
    userID:null,
    profileImage: null,
  },

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
        ...state, user: {
        displayName: action.displayName,
        userID: action.userID,
        profileImage: action.profileImage,}
      };
      case reducerCaseActions.SET_ALBUMS:
      return {
        ...state,
        albums: action.albums,
      };
      case reducerCaseActions.SET_FEATURED:
      return {
        ...state,
        featuredPlaylists: action.featuredPlaylists,
      };
      case reducerCaseActions.SET_NEWRELEASE:
      return {
        ...state,
        newReleases: action.newReleases,
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
    case reducerCaseActions.LOGOUT:
      return { ...initialState }
    default:
      return state;
  }
};

export default reducer;
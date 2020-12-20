export default {
    namespaced: true,
    state: () => {
        return {
            songlist: [],
            currentidx: 0,
            currentSongMsg: [],
            currentUrl:''
        }
    },
    mutations: {
        getListMut(state, itemlist) {
            state.songlist = itemlist
        },
        getCurrentMut(state, currentIdx) {
            state.currentidx = currentIdx;
        },
        currentMut(state, idx) {
            state.currentidx = idx
        },
        getCurrentSongMut(state, currentSong) {
            state.currentSongMsg = currentSong
        },
        getCurrentUrlMut(state, currentUrl) {
            state.currentUrl = currentUrl
         }

    }
}
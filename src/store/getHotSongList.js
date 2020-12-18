export default {
    namespaced: true,
    state: () => {
        return {
            songlist: [],
            currentidx: 0
        }
    },
    mutations: {
        getListMut(state, itemlist) {
            state.songlist = itemlist
        },
        getCurrentMut(state, currentsong) {
            state.currentidx = currentsong
        },
        currentMut(state, idx) {
            state.currentidx = idx
        }

    }
}
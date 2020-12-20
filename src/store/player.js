export default {
    namespaced: true,
    state: () => {
        return {
            isPlay: false,
            loop: 0,
            songmid: 0,
            loopData: [{
                    title: '列表循环',
                    icon: 'icon-loop'
                },
                {
                    title: '单曲循环',
                    icon: 'icon-danqu'
                },
                {
                    title: '随机播放',
                    icon: 'icon-random'
                },
            ]
        }
    },
    getters: {
        loopObj(state) {
            return state.loopData[state.loop]
        }
    },
    mutations: {
        isPlayMut(state, bool) {
            state.isPlay = bool
        },
        changeLoop(state) {
            if (state.loop == 2) {
                state.loop = 0;
            } else {
                state.loop++;
            }
        },
        changeSongmidMu(state, songmid) {
            state.songmid = songmid;
        }
    }
}
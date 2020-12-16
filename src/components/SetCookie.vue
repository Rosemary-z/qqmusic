<template>
  <van-button type="primary" @click="handleCookie">设置真实的cookie</van-button>
</template>
<script>
import request from "../utils/request";
export default {
  methods: {
    handleCookie() {
      request.post(`/hehe/user/setCookie`, {
        data: `pgv_pvid=6685567928; pac_uid=0_63c1c4ccda4fa; LW_uid=5155N8a4j0K7h575S9c7F2e4O3; eas_sid=A1R5L8g4j0i7k5Y5s9K7v2Q5E8; pgv_pvi=1780792320; tvfe_boss_uuid=a19e9b1d2c6d50ab; RK=DmREiooWbA; ptcz=7caabd42b120f092417bc270d1a568630ce14051413a8227c0c435fabd5b1970; LW_sid=S1U599b8p4B2Q4l6z1e8x2M2X4; o_cookie=1247562661; pgv_info=ssid=s6659148285; ts_uid=7873565815; pgv_si=s612987904; userAction=1; _qpsvr_localtk=0.4664982711167911; euin=oK-P7i4sowCsov**; tmeLoginType=2; ts_refer=www.baidu.com/link; uin=1247562661; psrf_qqunionid=; psrf_musickey_createtime=1607932797; psrf_qqaccess_token=49107BC2E7D8046B42C7894DADBC3326; psrf_qqrefresh_token=98D32C6829DA269D6AD3A33B2C8C9D21; qqmusic_key=Q_H_L_2qt6N-50eKCTzUe2wH6bbI9Vb6aEjcEvWTrFxGm9EX7mRotmKjNz-T64KtSCsVC; psrf_qqopenid=31C7E72069882E21474C9298A19F4DCF; qm_keyst=Q_H_L_2qt6N-50eKCTzUe2wH6bbI9Vb6aEjcEvWTrFxGm9EX7mRotmKjNz-T64KtSCsVC; psrf_access_token_expiresAt=1615708797; yqq_stat=0; yq_index=0; player_exist=1; ts_last=y.qq.com/portal/player.html; qqmusic_fromtag=66; yplayer_open=0`,
      });
    },
  },
};
</script>

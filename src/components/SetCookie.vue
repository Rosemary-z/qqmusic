<template>
  <van-button type="primary" @click="handleCookie">设置真实的cookie</van-button>
</template>
<script>
import request from "../utils/request";
export default {
  methods: {
    handleCookie() {
      request.post(`/hehe/user/setCookie`, {
        data: `yqq_stat=0; pgv_pvi=2862476288; pgv_si=s8540876800; pgv_info=ssid=s4122423708; ts_last=y.qq.com/; pgv_pvid=754985500; ts_uid=6132728503; _qpsvr_localtk=0.09918935556576458; RK=DmREjooGPC; ptcz=a78569e8fbc60e60714b1bfce9858b609d35bc9a59834b3975e3504f2b55d41a; psrf_access_token_expiresAt=1616303628; psrf_qqrefresh_token=98D32C6829DA269D6AD3A33B2C8C9D21; uin=1247562661; psrf_musickey_createtime=1608527628; psrf_qqaccess_token=49107BC2E7D8046B42C7894DADBC3326; euin=oK-P7i4sowCsov**; tmeLoginType=2; psrf_qqopenid=31C7E72069882E21474C9298A19F4DCF; qqmusic_key=Q_H_L_2mmBW-50eKSN_VxeEtAIH-lCPfjbCrmBIZwyPH8nnTq6gLOOlGfqoEBr7WlgbK3; qm_keyst=Q_H_L_2mmBW-50eKSN_VxeEtAIH-lCPfjbCrmBIZwyPH8nnTq6gLOOlGfqoEBr7WlgbK3; psrf_qqunionid=`,
      });
    },
  },
};
</script>

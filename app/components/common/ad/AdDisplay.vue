<template>
  <div class="ad-banner" v-if="!!adClientId">
    <ins
      class="adsbygoogle"
      :style="adStyle"
      :data-ad-client="adClient"
      :data-ad-slot="adSlot"
      :data-analytics-uacct="adUacct"
      :data-analytics-domain-name="adDomainName"
      :data-full-width-responsive="fullWidthResponsive"
      :data-adsbygoogle-status="this.show ? null : ''"
      :key="key"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "nuxt-property-decorator";

@Component
export default class AdDisplay extends Vue {
  private key: number = Math.random();
  private show: boolean = true;
  private fullWidthResponsive = false;

  private adSlot: string = "ADSENCE_BANER_ID";
  private adClientId: string = process.env.ADSENSE_CLIENT_ID || "";
  private adUacct: string = process.env.ADSENSE_ANALYTICS_ACCOUNT || "";
  private adDomainName: string = process.env.ADSENSE_DOMAIN_NAME || "";
  // ****************************************************
  // * computed
  // ****************************************************
  mounted() {
    if (process.browser) this.showAd();
  }

  private get adStyle() {
    return {
      display: "inline-block",
      width: "100%",
      height: "50px",
    };
  }
  // ****************************************************
  // * methods
  // ****************************************************
  showAd() {
    this.show = true;
    this.$nextTick(() => {
      try {
        // Once ad container (<ins>) DOM has (re-)rendered, requesst a new advert
        const win = window as any;
        (win.adsbygoogle = win.adsbygoogle || []).push({});
      } catch (error) {
        console.error(error);
      }
    });
  }
  updateAd() {
    if (!process.browser) return;
    // Reset the INS element
    this.show = false;
    // Show new ad on nextTick
    this.$nextTick(this.showAd);
  }
  // ****************************************************
  // * emit
  // ****************************************************
  @Watch("$route")
  private onChangeRoute(to, from) {
    if (to.fullPath === from.fullPath) return;

    this.updateAd();
  }
}
</script>

<style lang="scss" scoped>
// ****************************
// * Part
// ****************************
.ad-banner {
  width: 100%;
  height: 50px;
  background-color: white;
  color: white;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
}
// ****************************
// * Flex Layout
// ****************************
</style>
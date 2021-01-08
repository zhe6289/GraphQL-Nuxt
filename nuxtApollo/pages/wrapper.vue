<template>
  <div class="w-full h-full">
    <div class="relative">
      <div @click="showLists = !showLists" class="absolute text-gray-600 transition-all opacity-25 cursor-pointer hover:opacity-100 top-2 right-3">
        <font-awesome-icon :icon="['fas', 'th']" style="font-size: 30px"/>
      </div>
      <div class="absolute grid-items" :class="{fadeIn: showLists}">
        <ul>
          <li v-for="country in countries" :key="country.key">
            <img @click="onClickImportIframe(country)" :src="require(`~/static/images/flags/${country}.png`)" class="flag" alt="">
          </li>
        </ul>
      </div>
    </div>
    <div class="border-4 border-gray-600 border-double iframe-wrap">
      <iframe ref="iframe" :src="iframe.src" @load="onLoad()" frameborder="0" height="100%" width="100%">
        你的瀏覽器不支援 iframe
      </iframe>
    </div>
  </div>
</template>

<script>
import base64 from 'hi-base64'

export default {
  data() {
    return { 
      iframe: {
        src: '',
        loaded: false
      },
      showLists: false,
      countries: [
        //圖庫裏的國旗 png'DE',
        'DK',
        'DO',
        'EC',
        'EE',
        'EG',
        'ES',
        'FI',
        'FR',
        'GB',
        'GR',
        'HK',
        'HR',
        'HU',
        'ID',
        'IE',
        'SL',
        'TH',
        'TR',
        'TT',
        'TW',
        'UA',
        'US',
        'UY',
        'VE',
        'VI',
        'VN',
        'ZA'
      ]  
    }
  },
  async mounted() {
    await this.checkQuery()
  },
  methods: {
    // Handle Function
    onClickImportIframe(val) {
      this.showLists = false // 關閉選單
      switch (val) {
        case 'TW':
          this.iframe.src = 'https://web-operation-k8s-test.i17game.com/login?userId=48897362'
          break
        default:
          alert('暫無此網址')
          this.showLists = true // 不關閉
          break
      }
    },
    onLoad() {
      this.iframe.loaded = true
    },
    // Functional
    checkQuery() {
      const urlQuery = this.$route.query.url
      if (urlQuery) {
        const urlIframe = base64.decode(urlQuery)
        this.iframe.src = urlIframe
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.grid-items {
  position: absolute;
  top: 0px;
  z-index: 991;
  height: 448px;
  width: 328px;
  margin-top: 50px;
  right: 0px;
  margin-right: 27px;
  display: none;
  transition: opacity 0.15s ease-in-out;
  &.fadeIn {
    display: block;
    transition: opacity 0.15s ease-in-out;
  }
  ul {
    background: #fff;
    border: 1px solid rgba(0,0,0,0.2);
    border-radius: 8px;
    box-shadow: 0 1px 2px 0 rgba(60,64,67,.30), 0 2px 6px 2px rgba(60,64,67,.15);
    align-items: center;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    flex-direction: row;
    // height: 100%;
    height: inherit;
    overflow-y: auto;
    width: 100%;
    li {
      padding: 1.5rem 0;
      margin: 0 auto;
      width: calc(100% / 3);
      img {
        cursor: pointer;
        display: block;
        width: 100%;
        margin: 0 auto;
        max-width: 70px;
      }
    }
  }
}
.iframe-wrap {
  height: calc(100%);
}
</style>
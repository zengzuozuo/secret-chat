<template>
  <div id="app">
    <router-view/>
    <mu-popup position="top" popupClass="popup-top" :overlay="false" :open="$store.state.isShowTopPopup">{{$store.state.tipText}}</mu-popup>
    <mu-popup position="top" popupClass="popup-top-success" :overlay="false" :open="$store.state.isShowSuccess">{{$store.state.tipText}}</mu-popup>
    <div class="loading-shade" v-show="$store.state.loading">
      <div class="loading-box">
          <embed src='static/svg/loading.svg' type='image/svg+xml' pluginspage='http://www.adobe.com/svg/viewer/install/' />
      </div>
    </div>
    <mu-dialog :open="$store.state.isShowAlert" :title="$t('message.login4')">
      {{$store.state.alertText}}
      <mu-flat-button :label="$t('message.chatlist3')" slot="actions" primary @click.native="$store.state.isShowAlert = false"/>
    </mu-dialog>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

html,body,h1,h2,h3,h4,h5,h6,ul,li,div,p {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
  text-align: left;
}

.mu-raised-button-primary {
    background-color: #317ae2 !important;
}
.mu-flat-button-primary {
  color: #317ae2 !important;
}
.mu-text-field.focus-state {
  color: #317ae2 !important;
}

.popup-top {
    width: 100%;
    height: 48px;
    line-height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 375px;
    box-shadow: 0 0 10px #d5d5d5;
    background-color: #db2828 !important;
    color: #fff;
    border-radius: 2px;
}
.popup-top-success {
    width: 100%;
    height: 48px;
    line-height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 375px;
    box-shadow: 0 0 10px #d5d5d5;
    background-color: #317ae2 !important;
    color: #fff;
    border-radius: 2px;
}

.loading-shade {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .loading-box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 22%;
    height: 22%;
  }
}
</style>

<template>
  <div id="qrscanner">
    <qrcode-reader @init="onInit" @decode="onDecode">
      <modal :stuName="qr_stuName" :stuPg="qr_stuPg" v-show="isModalVisible" @close="closeModal"/>
      <router-link to="/" class="btn-floating btn-large waves-effect waves-light red center-btm">
        <i class="material-icons">close</i>
      </router-link>
    </qrcode-reader>
  </div>
</template>

<script>
  import db from './firebaseInit'
  import './vue-qrcode-reader/vue-qrcode-reader.css'
  import QrcodeReader from './vue-qrcode-reader/QrcodeReader'
  import Modal from './vue-qrcode-reader/Modal'

  export default {
    name: "qrscanner",
    components:{
      'qrcode-reader': QrcodeReader,
      'modal': Modal
    },
    data(){
      return {
        isModalVisible: false,
        qr_stuName: "",
        qr_stuPg: ""
      }
    },
    methods: {
      async onInit (promise) {
        // show loading indicator
        try {
          await promise
          // successfully initialized
        } catch (error) {
          if (error.name === 'NotAllowedError') {
            // user denied camera access permisson
          } else if (error.name === 'NotFoundError') {
            // no suitable camera device installed
          } else if (error.name === 'NotSupportedError') {
            // page is not served over HTTPS (or localhost)
          } else if (error.name === 'NotReadableError') {
            // maybe camera is already in use
          } else if (error.name === 'OverconstrainedError') {
            // passed constraints don't match any camera. Did you requested the front camera although there is none?
          } else {
            // browser is probably lacking features (WebRTC, Canvas)
          }
        } finally {
          // hide loading indicator
        }
      },
      onDecode(qr_key){
        var _this = this;
        db.collection('students').doc(qr_key)
          .get().then(function(Snapshot){
          _this.qr_stuName = Snapshot.data().name;
          _this.qr_stuPg = Snapshot.data().pg;
          _this.showModal();
        })
      },
      showModal: function(){
        this.isModalVisible = true
      },
      closeModal: function(){
        this.isModalVisible = false
      }
    }
  }

</script>

<style scoped>
  .center-btm{
    position: fixed;
    left: 50%;
    bottom: 20px;
    transform: translate(-50%, -50%);
    margin: 0 auto;
  }
</style>

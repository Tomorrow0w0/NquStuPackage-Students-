<template>
  <div id="edit-stu">
    <h3>編輯學生</h3>
    <div class="row">
      <form @submit.prevent="updateStudent" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input disabled type="text" v-model="stu_id" required>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="name" required>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="dept" required>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="phone" required>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="email" required>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="pg" required>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="date" required>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="info" required>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="qr" required>
          </div>
        </div>
        <button type="submit" class="btn">提交</button>
        <router-link to="/" class="btn grey">取消</router-link>
      </form>
    </div>
  </div>
</template>

<script>
  import db from "./firebaseInit"
  export default {
    name: "edit-stu",
    data(){
      return{
        "stu_id": null,
        "name": null,
        "dept": null,
        "phone": null,
        "email": null,
        "pg": null,
        "date": null,
        "info": null,
        "qr": null
      }
    },
    beforeRouteEnter(to, from, next){
      db.collection("students").where("stu_id", "==", to.params.stu_id).get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            next(vm => {
              vm.stu_id = doc.data().stu_id,
              vm.name = doc.data().name,
              vm.dept = doc.data().dept,
              vm.phone = doc.data().phone,
              vm.email = doc.data().email,
              vm.pg = doc.data().pg,
              vm.date = doc.data().date,
              vm.info = doc.data().info,
              vm.qr = doc.data().qr
            })
          })
        })
    },
    watch: {
      "$router": "fetchData"
    },
    methods: {
      fetchData(){
        db.collection("students").where("stu_id", "==", this.$route.params.stu_id)
          .get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.stu_id = doc.data().stu_id,
            this.name = doc.data().name,
            this.dept = doc.data().dept,
            this.phone = doc.data().phone,
            this.email = doc.data().email,
            this.pg = doc.data().pg,
            this.date = doc.data().date,
            this.info = doc.data().info,
            this.qr = doc.data().qr
          })
        })
      },
      updateStudent(){
        db.collection("students").where("stu_id", "==", this.$route.params.stu_id)
          .get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.update({
              "stu_id": this.stu_id,
              "name": this.name,
              "dept": this.dept,
              "phone": this.phone,
              "email": this.email,
              "pg": this.pg,
              "date": this.date,
              "info": this.info,
              "qr": this.qr
            })
            .then(() => {
              this.$router.push({name:'view-stu',
              params:{stu_id: this.stu_id}})
            })
          })
        })
      }
    }
  }
</script>

<style>

</style>

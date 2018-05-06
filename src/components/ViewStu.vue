<template>
  <div id="view-stu">
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>{{name}}</h4>
      </li>
      <li class="collection-item">
        學號:{{stu_id}}
      </li>
      <li class="collection-item">
        科系:{{dept}}
      </li>
      <li class="collection-item">
        手機:{{phone}}
      </li>
      <li class="collection-item">
        電郵:{{email}}
      </li>
      <li class="collection-item">
        包裹:{{pg}}
      </li>
      <li class="collection-item">
        日期:{{date}}
      </li>
      <li class="collection-item">
        狀態:{{info}}
      </li>
      <li class="collection-item">
        二維條碼:{{qr}}
      </li>
    </ul>
    <router-link to="/" class="btn grey">返回</router-link>
    <button @click="deleteStu" class="btn red">刪除</button>

    <div class="fixed-action-btn">
      <router-link v-bind:to="{name:'edit-stu',
      params:{stu_id:stu_id}}"
      class="btn-floating btn-large blue">
        <i class="fa fa-pencil"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
  import db from "./firebaseInit"
  export default {
    name: "view-stu",
    data(){
      return {
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
      deleteStu(){
        if(confirm ("確定刪除此學生?")) {
          db.collection("students").where("stu_id", "==", this.$route.params.stu_id)
            .get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              doc.ref.delete();
              this.$router.push('/')
            })
          })
        }
      }
    }
  }
</script>

<style>

</style>

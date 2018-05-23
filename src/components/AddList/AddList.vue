<template>
  <div id="add-list">
    <h3>新增學生</h3>
    <div class="row">
      <form @submit.prevent="saveStudent" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="stu_id" required>
            <label>學號 :</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="name" required>
            <label>姓名 :</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="dept" required>
            <label>科系 :</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="phone" required>
            <label>手機 :</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="email" required>
            <label>電郵 :</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="pg" required>
            <label>包裹 :</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="date" required>
            <label>日期 :</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="info" required>
            <label>狀態 :</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="qr" required>
            <label>二維條碼 :</label>
          </div>
        </div>
        <button type="submit" class="btn">提交</button>
        <router-link to="/" class="btn grey">取消</router-link>
      </form>
    </div>
  </div>
</template>

<script>
  import db from "../FirebaseLink/FirebaseInit"
  export default {
    name: "add-list",
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
    methods: {
      saveStudent(){
        db.collection("students").add({
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
          .then(docRef => this.$router.push("/"))
          .catch(error => console.log(error))
      }
    }
  };
</script>

<style>

</style>

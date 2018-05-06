<template>
  <div id="dashboard">
      <form class="col s12 sticky-top">
        <div class="input-field col s12">
          <i class="material-icons prefix">search</i>
          <input v-model="searchStu" @input="searchactive" id="search-text" type="text">
          <label for="search-text">{{selected}}</label>
        </div>
        <div class="row">
          <p class="col s4">
            <input v-model="selected" class="with-gap" name="group1" type="radio" id="r-dept" value="dept"/>
            <label for="r-dept">科系</label>
          </p>
          <p class="col s4">
            <input v-model="selected" class="with-gap" name="group1" type="radio" id="r-id" value="stu_id"/>
            <label for="r-id">學號</label>
          </p>
          <p class="col s4">
            <input v-model="selected" class="with-gap" name="group1" type="radio" id="r-name" value="name"/>
            <label for="r-name">姓名</label>
          </p>
        </div>
      </form>

      <div class="sticky-btm">
        <ul class="collection with-header">
          <li class="collection-header">
            <h5>學生名單</h5>
          </li>
          <li v-for="student in students"
              v-bind:key="student.id"
              class="collection-item">
            <div class="chip">{{student.dept}}</div>
            {{student.stu_id}}: {{student.name}}

            <router-link class="secondary-content"
                         v-bind:to="{ name: 'view-stu',
        params: { stu_id: student.stu_id }}">
              <i class="fa fa-eye"></i>
            </router-link>
          </li>
        </ul>
      </div>

    <div class="fixed-action-btn horizontal click-to-toggle">
      <a class="btn-floating btn-large red">
        <i class="fa fa-chevron-left"></i>
      </a>
      <ul>
        <li>
          <router-link to="/qrscanner" class="btn-floating brown lighten-1">
            <i class="material-icons">crop_free</i>
          </router-link>
        </li>
        <li>
          <router-link to="/new" class="btn-floating blue">
            <i class="fa fa-plus"></i>
          </router-link>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
  import db from './firebaseInit'

  export default {
    name: "dashboard",
    data(){
      return {
        students: [],
        searchStu: '',
        selected: '填選以下按鈕,再搜尋'
      }
    },
    created: function(){

      db.collection("students").orderBy("dept").get().then
      (querySnapshot => {
        querySnapshot.forEach(doc => {
         // console.log(doc);
          const data = {
            "id": doc.id,
            "stu_id": doc.data().stu_id,
            "name": doc.data().name,
            "dept": doc.data().dept,
            "phone": doc.data().phone,
            "email": doc.data().email,
            "pg": doc.data().pg,
            "date": doc.data().date,
            "info": doc.data().info,
            "qr": doc.data().qr
          }
          this.students.push(data)
        })
      })
    },
    methods: {
      searchactive(){

        var searchStu = this.searchStu;
        var selected = this.selected;

        if(searchStu!=''){
          this.students.length = 0;
          db.collection("students").where(selected, "==", searchStu)
            .get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
              // console.log(doc.data().stu_id);
              const data = {
                "id": doc.id,
                "stu_id": doc.data().stu_id,
                "name": doc.data().name,
                "dept": doc.data().dept,
                "phone": doc.data().phone,
                "email": doc.data().email,
                "pg": doc.data().pg,
                "date": doc.data().date,
                "info": doc.data().info,
                "qr": doc.data().qr
              }
              this.students.push(data)
            })
          })
        }else{
          this.students.length = 0;
          db.collection("students").orderBy("dept").get().then
          (querySnapshot => {
            querySnapshot.forEach(doc => {
              // console.log(doc.data().stu_id);
              const data = {
                "id": doc.id,
                "stu_id": doc.data().stu_id,
                "name": doc.data().name,
                "dept": doc.data().dept,
                "phone": doc.data().phone,
                "email": doc.data().email,
                "pg": doc.data().pg,
                "date": doc.data().date,
                "info": doc.data().info,
                "qr": doc.data().qr
              }
              this.students.push(data)
            })
          })
        }
      }
    }
  }
</script>

<style scoped>
  .sticky-top{
    padding: 2px 0 0 0;
    position: -webkit-sticky;
    position: sticky;
    top: 0px;
    z-index: 1;
    background-color: #fffded;
  }
  .sticky-btm{
    z-index: -1;
  }
</style>

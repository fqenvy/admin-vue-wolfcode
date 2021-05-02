<template>

  <el-container>
    <el-aside width="200px">

      <SideMenu></SideMenu>

    </el-aside>
    <el-container>
      <el-header>
        <strong>后台管理系统</strong>
        <div class="header-avatar">
          <el-avatar size="medium"
                     :src="userInfo.avatar"></el-avatar>
          <el-dropdown>
             <span class="el-dropdown-link">
               {{ userInfo.username }}<i class="el-icon-arrow-down el-icon--right"></i>
             </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <router-link to="/UserCenter">
                个人中心
                </router-link>
              </el-dropdown-item>

              <el-dropdown-item @click.native="logout">
                退出
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-link href="https://github.com/fqenvy" target="_blank">github</el-link>
        </div>
      </el-header>

      <el-main>
        <Tabs></Tabs>
        <div style="margin: 0 15px">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import SideMenu from "./includ/SideMenu";
import Tabs from "./includ/Tabs";

export default {
  name: "Home",
  components: {
    SideMenu,
    Tabs
  },
  data() {
    return {
      userInfo: {
        id: "",
        username: "",
        avatar: ""
      }
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      //没有后端参数，需要在mock中添加
      this.$axios.get("/sys/userInfo").then(res => {

        this.userInfo = res.data.data
      })
    },
    logout(){
      this.$axios.post("/logout").then(res =>{
        localStorage.clear()
        sessionStorage.clear()

        this.$store.commit("resetState")
        this.$router.push("/login")

      })
    }
  }

}
</script>

<style scoped>
.el-container {
  padding: 0;
  margin-left: 0;
  height: 100vh;
}

.el-header {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  line-height: 200px;
}

.el-main {
  color: #333;
  padding: 0;
}


.header-avatar {
  float: right;
  width: 210px;
  display: flex;
  /*将和在一起的元素分开*/
  justify-content: space-around;
  /*将元素剧中*/
  align-items: center;
}

/*将鼠标竖线变为👋*/
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}

a {
  text-decoration: none;
}


</style>
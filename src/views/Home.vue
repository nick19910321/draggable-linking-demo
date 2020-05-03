<template>
  <div class="home">
    <el-row :gutter="12">
      <el-col :span="8">
        <router-link class="home-link" to="/steps">
          <el-card shadow="hover">
            steps
          </el-card>
        </router-link>
      </el-col>
      <el-col :span="8">
        <router-link class="home-link" to="/install">
          <el-card shadow="hover">
            install
          </el-card>
        </router-link>
      </el-col>
      <el-col :span="8">
        <router-link class="home-link" to="/cmd">
          <el-card shadow="hover">
            cmd
          </el-card>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>

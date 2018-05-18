<template>
  <section>
<el-select v-model="selectValue.value1" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
<el-select v-model="selectValue.value2" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>






    <el-input v-model="msg"></el-input>
    <div class="columns is-multiline">
    <div class="column is-12">
        <label class="label">Email (1s delay)</label>
        <p class="control has-icon has-icon-right">
            <input name="email" v-validate="'required|email'" data-vv-delay="1000" :class="{'input': true, 'is-danger': errors.has('email') }" type="text" placeholder="Email">
            <i v-show="errors.has('email')" class="fa fa-warning"></i>
            <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
        </p>
    </div>
    <div class="column is-12">
        <label class="label">Name (0.5s delay)</label>
        <p class="control has-icon has-icon-right">
            <input name="name" v-validate="'required|alpha'" data-vv-delay="500" :class="{'input': true, 'is-danger': errors.has('name') }" type="text" placeholder="Name">
            <i v-show="errors.has('name')" class="fa fa-warning"></i>
            <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
        </p>
    </div>
</div>


    <h1>欢迎入坑, 不过能找到这里,说明你是可以的!</h1>
    <h1>vue+vue-router+axios+vuex+ElementUI</h1>
    <h2>您现在直接可以开始创作了, 但为了更好的编写您的项目, 请认真阅读官方文档.</h2>
    <h2>遇到问题, 请先结合文档示例认真思考, 也可以在群里交流讨论,大家都会热心的解答.</h2>
    <h3>欢迎加群Vue&ElementUI(337587497);</h3>
    <h1>Created By Jesse 2017/8/9</h1>
  </section>
</template>
<script>
export default {
  data() {
    return {
      msg: 'hahahaahahhß',
      selectValue: {
        value1: '选项4',
        value2: '选项2',
      },
      options: [
        {
          value: '选项1',
          label: '黄金糕',
        },
        {
          value: '选项2',
          label: '双皮奶',
        },
        {
          value: '选项3',
          label: '蚵仔煎',
        },
        {
          value: '选项4',
          label: '龙须面',
        },
        {
          value: '选项5',
          label: '北京烤鸭',
        }],
    };
  },
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style>
.index {
  width: 600px;
  height: 600px;
  margin: 0 auto;
  text-align: center;
  font-size: 30px;
}
.help{
    display: block;
    font-size: 11px;
    margin-top: 5px;
}
.help.is-danger{
  color: red
}
</style>

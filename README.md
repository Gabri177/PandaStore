# PandaStore 后台管理

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).


# Testing 

## 测试方法: 

* 进入控制台
* 用dir (windows系统) 或者 cd(mac系统) 进入Frontend 目录
* 确保已经安装npm后, 用命令`npm run dev' 运行
* 打开对应的链接
> 如果想要看具体的渲染效果, 请查看`src/api/manager`根据接口格式和请求的`URL`拦截请求并返回成功或错误代码来查看页面的渲染和通知

## Router

* 路径 `/`
	> 主页 index.vue
	> <br>页面路径: src/pages/index.vue
* 路径 `404`
	> 任何不存在相关配置的路径都会跳转逃404的配置页面
	> <br>页面路径: src/pages/404.vue
<template>
	<!-- <div class="planned_project"> -->
		
		<div class="tab1 echartall">
			<table class="tha">
				<tr>
					<th>国家级科技计划项目top10</th>
					<th>数量</th>
				</tr> 
				
			</table>
		<vue-seamless-scroll :data="list" class="seamless-warp">
			<table class="item">
				<tr v-for="(item,index) in list">
					<td class="companyName" v-text="item.type"></td>
					<td class="communityName" style="color: #00d1d9" v-text="item.num"></td>
				</tr>
			</table>
			</vue-seamless-scroll>
		</div>
	<!-- </div> -->
</template>
<script>
	export default {
		name:"planned_project",
		data(){
			return{
				list:[],
				
			}
		},
		mounted(){
			// this.getList()
		
		},
		methods: {
			getList(version,year,month){
				this.$api.getNationalProgram(version,year,month).then(res=>{
					if(res.data.length==0){
						return
					}
					this.list=res.data
				})
			},
			//滚动
			       scroll(){
			        let con1 = this.$refs.rollul;
			        con1[0].style.marginTop='30px';
			        this.animate=!this.animate;
			        var that = this; // 在异步函数中会出现this的偏移问题，此处一定要先保存好this的指向
			        setTimeout(function(){
			            that.list.push(that.list[0]);
			            that.list.shift();
			            con1[0].style.marginTop='0px';
			            that.animate=!that.animate;  // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了
			        },0)
			  }
		},
	}
</script>

<style scoped>
	.seamless-warp {
		height:80%;
		overflow: hidden;
		line-height: 20px;
		width:100%;
	}
	.tab1 table{
		width:100%;
	}
	.tab1 .tha tr th{
		width: 50%;
		text-align: center;
		line-height: 0.16rem;
		font-size: 0.16rem;
		color:#ffb400;
	}
	.tab1 tr td{
		width: 50%;
		text-align: center;
		font-size: 0.14rem;
		line-height: 0.28rem;
	}
	.tab1{
		/* padding: 1%; */
		width:100%;
		height:100%;		
	}

</style>

<template>
	<div class="planned_project">
		
		<div class="tab1 echartall">
			<table>
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
		<!-- <table class="tab1 echartall">
			<tr>
				<th>国家级科技计划项目top10</th>
				<th>数量</th>
			</tr>
			<!-- <tr v-for="item in list">
				<td>{{item.type}}</td>
				<td style="color: #00d1d9">{{item.num}}</td>
			</tr> -->
		<!-- </table> -->
		<div  class="tab2 echartall">
			<vue-seamless-scroll :data="list2" class="seamless-warp">
				<table class="item">
					<tr v-for="(item,index) in list2">
						<td style="width:20px;height:20px;background: #CCCCCC;border-radius: 50%;color: #000;">{{index}}</td>
						<td class="companyName" v-text="item.type"></td>
						<td class="communityName" style="color: #00d1d9" v-text="item.num"></td>
					</tr>
				</table>
				</vue-seamless-scroll>
		</div>
		
		<!-- <table class="tab2 echartall">
			<tr v-for="(item,index) in list2">
				<td style="width:20px;background: #CCCCCC;border-radius: 50%;color: #000;">{{index}}</td>
				<td>{{item.type}}</td>
				<td style="color: #00d1d9">{{item.num}}</td>
			</tr>
		</table> -->
	</div>
</template>
<script>
	export default {
		name:"planned_project",
		data(){
			return{
				list:[],
				list2:[],
			}
		},
		mounted(){
			this.getlist1()
			this.getlist2()
		},
		methods: {
			getlist1(){
				this.$api.getNationalProgram().then(res=>{
					this.list=res.data
				})
			},
			
			getlist2(){
				this.$api.getCompanyHonor().then(res=>{
					this.list2=res.data
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
		height: 180px;
		overflow: hidden;
		line-height: 20px;
		width:100%;
	}
	.planned_project{
		/* border-left: 2px solid #fff; */
		display: flex;
		width:1018px;
		/* margin-top: 1%; */
		justify-content: space-between;
	}
	.tab1 tr th{
		width: 20%;
		text-align: center;
		line-height: 20px;
		/* font-size: 20px; */
		color:#ffb400;
	}
	.tab1 tr td{
		width: 250px;
		text-align: center;
		overflow: hidden;
		line-height: 20px;
		text-overflow: ellipsis;
		white-space: nowrap
	}
	.tab1{
		padding: 1%;
		width:48%;
		height:190px;
		
		
	}
	.tab2{
		padding: 1%;
		width:48%;
		height:190px;
	}
	.tab2 tr td{
		width: 250px;
		text-align: center;
		overflow: hidden;
		/* line-height: 16px; */
		line-height: 20px;
		text-overflow: ellipsis;
		white-space: nowrap
	}
</style>

<template>
	<div class="echartall Qualification">
		<table class="tabth">
			<tr style="display: flex;justify-content: space-between;">
				<th>企业资质资质名称</th>
				<th>数量</th>
			</tr>
			<vue-seamless-scroll :data="list" class="seamless-warp">
				<table class="item">
					<tr v-for="item in list" style="display: flex;justify-content: space-between;">
						<td class="type">{{item.type}}</td>
						<td class="num" >{{item.num}}</td>
					</tr>
					
				</table>
			</vue-seamless-scroll>
		</table>
		
	</div>
</template>

<script>
	export default {
		name:"aptitude",
		data(){
			return{
				list:[]
			}
		},
		mounted(){
			this.getlist()
		},
		methods: {
			getlist(){
				this.$api.getCompanyQualification().then(res=>{
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
		height: 180px;
		overflow: hidden;
		/* line-height: 20px; */
	}
	.Qualification{
		width:400px;
		height:230px;
		
	}
	.tabth{
		width:400px;
		
	}
	table tr th{
		text-align: center;
		width:200px;
		line-height:35px;
		font-size: 18px;
		color:#ffb400;
	}

	table tr td{
		width:200px;
		text-align: center;
		
	}
	

</style>

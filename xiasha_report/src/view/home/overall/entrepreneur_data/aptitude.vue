<template>
	<div class="echartall aptitude">
		<table class="tabth">
			<tr class="tab1">
				<th>企业资质资质名称</th>
				<th>数量</th>
			</tr>
			
		</table>
		<vue-seamless-scroll :data="list" class="seamless-warp">
			<table class="item table2">
				<tr v-for="item in list">
					<td >{{item.type}}</td>
					<td  >{{item.num}}</td>
				</tr>
				
			</table>
		</vue-seamless-scroll>
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
			// this.getList()
		},
		methods: {
			getList(version,year,month){
				this.$api.getCompanyQualification(version,year,month).then(res=>{
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
		height: 80%;
		width:100%;
		overflow: hidden;
		/* line-height: 20px; */
	}
	.aptitude{
		width:100%;
		height:100%;
		
	}
	.tabth{
		width:100%;
		height:20%
		
	}
	table{
		width:100%;
	}
	tabth tr{
		width:100%;
	}


	.tabth .tab1 th{
		text-align: center;
		width:50%;
		/* line-height:px; */
		font-size: 0.14rem;
		color:#ffb400;
	}
	.table2{
		height:60%;
	}


	

</style>

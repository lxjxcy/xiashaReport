<template>
	<div class="echartall Qualification">
		<table class="tabth">
			<tr>
				<th>企业资质资质名称</th>
				<th>数量</th>
			</tr>
			<vue-seamless-scroll :data="list" class="seamless-warp">
				<table class="item">
					<tr v-for="item in list">
						<td class="type" v-text="item.type" ></td>
						<td class="num" v-text="item.num" ></td>
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
		height: 200px;
		overflow: hidden;
		/* line-height: 20px; */
	}
	.Qualification{
		
	}
	.tabth{
		width:260px;
		/* height:80px; */
		margin-right:10px;
		/* border:2px solid #fff; */
		/* margin-top: 60px; */
	}
	.tabth tr th{
		text-align: center;
		line-height:35px;
		font-size: 18px;
		color:#ffb400;
	}
	.item .type{
		width:100%
	}
	.item .num{
		width:100%
	}
	.item td{
		text-align: center;
	}
	

</style>

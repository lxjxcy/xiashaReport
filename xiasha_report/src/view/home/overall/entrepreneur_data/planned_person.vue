<template>
	<!-- <div class="planned_project"> -->
		
		
		<div  class="tab2 echartall plann-person">
			<vue-seamless-scroll :data="list2" class="seamless-warp">
				<table class="item">
					<tr v-for="(item,index) in list2">
						<td >{{index+1}}</td>
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
				
				list2:[],
				number:9,
			}
		},
		mounted(){
		
			// this.getList()
		},
		methods: {

			
			getList(version,year,month){
				this.$api.getYearMonthReport(version,year,month,this.number).then(res=>{
					if(res.data.length==0){
						return
					}
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
		height: 95%;

		overflow: hidden;
		line-height: 20px;
		width:100%;
	}
	.planned_project{
		/* border-left: 2px solid #fff; */
		display: flex;
		width:100%;
		/* margin-top: 1%; */
		justify-content: space-between;
	}

	.tab2{
		padding: 1%;
		width:100%;
		height:100%;
	}

</style>

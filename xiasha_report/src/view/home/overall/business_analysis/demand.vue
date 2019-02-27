<template>
	<div class="demand echartall">
		<div style="height: 221px">
			<table>
				<caption>{{title1}}</caption>
				<tr v-for="(item,index) in list1">
					<td class="indexcolor">{{index+1}}</td>
					<td>{{item.name}}</td>
					<td>{{item.num}}</td>
				</tr>
			</table>
		</div>
		
		<table>
			<caption>{{title2}}</caption>
			<tr v-for="(item,index) in list1">
				<td class="indexcolor">{{index+1}}</td>
				<td>{{item.name}}</td>
				<td>{{item.num}}</td>
			</tr>
		</table>
		
	</div>
</template>

<script>
	export default {
		name:"demand",
		data(){
			return{
				title1:"企业政策需求排行",
				title2:"企业服务需求排行",
				list1:[],
				list2:[]
			}
		},
		mounted(){
			// this.getlist(1)
		},
		methods:{
			getlist(id){
				
				this.getlist1(id)
				this.getlist2(id)
			},
			
			
			getlist1(id){
				this.$api.getPolicyNeed(id).then(res=>{
					this.list1=res.data
				})
			},
			getlist2(id){
				this.$api.getServiceNeed(id).then(res=>{
					this.list2=res.data
				})
			},
			
		}
		
	}
</script>

<style scoped>
.demand{
	width:292px;
	height:442px;
}
table{
	width:100%;
}
/* table{
	width:240px;
} */
table tr td{
	width:140px;
	text-align: center;
	/* line-height: 30px; */
	font-size: 14px;
	color:#00fff9;
	/* height:30px; */
}
table caption{
	width:100%;
	text-align: left;
	line-height: 60px;
	font-size: 20px;
	font-weight: 500;

}
.indexcolor{
	height:20px;
	width:20px;
	text-align: center;
	line-height: 20px;
	/* margin-right: 40px; */
	border-radius: 50%;
	background: #fbd676;
	color: #fff;
}
.haveborder2{
	height:50px;
	width:50px;
	border-radius: 50%;
	background: #a2be35;
	color: #fff;
}
.noborder{
	height:50px;
	width:50px;
	border-radius: 50%;
	background: #999;
	color: #fff;
}
</style>

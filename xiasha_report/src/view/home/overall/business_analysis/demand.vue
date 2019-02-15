<template>
	<div class="demand echartall">
		<table>
			<caption>{{title1}}</caption>
			<tr v-for="(item,index) in list1">
				<td>{{index+1}}</td>
				<td>{{item.type}}</td>
				<td>{{item.num}}</td>
			</tr>
		</table>
		<table>
			<caption>{{title2}}</caption>
			<tr v-for="(item,index) in list1">
				<td>{{index+1}}</td>
				<td>{{item.type}}</td>
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
			this.getlist(1)
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
	width:485px;
	height:205px;
	margin-bottom: 8px;
	/* margin:2px; */
	display: flex;
	justify-content: space-between;
	position: relative;

	/* padding-bottom: 3%; */
	/* border-left: 2px solid #fff;
	border-bottom: 2px solid #fff; */
}
table{
	width:240px;
}
table tr td{
	width:20%;
	text-align: center;
	line-height: 30px;
	font-size: 14px;
	color:#00fff9
}
table caption{
	text-align: left;
	line-height: 60px;
	font-size: 20px;
	font-weight: 500;
	padding-left:30px;
}
.haveborder1{
	height:50px;
	width:50px;
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

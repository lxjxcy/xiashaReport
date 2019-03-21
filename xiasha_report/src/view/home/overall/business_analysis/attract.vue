<template>
		<!-- <div class="attract"> -->
			<Charts :id="id" v-if="hackReset" class="echartall" :option="option" :height="height" :width="width"/>
		<!-- </div>		 -->
</template>
<script>
	import hackReset from "../../../../mixins/hackReset.js"
	export default {
		name:"attract",
		data() {
			return {
				id:"attract",
				width:"100%",
				height:"100%",
				option:{
					 title: {
						text: '招商需求分析',
						x:'left',
						 textStyle:this.$store.state.textStyle,
						
					},
					legend: {
						data:['剩余租赁面积','招商意向面积'],
						right: '3%',
						top: '10%',
						icon: "circle",
						textStyle:{
						color:['#fff'],
						},
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: this.xAxis,
						splitLine: {
							show: false
						}, //去除网格线
						axisLine: {
							lineStyle: {
								type: 'solid',
								color: '#30dbe3',
								width: '0'
							}
						},
					},
					textStyle:{
						color:'#fff',
					},
					yAxis: {
						type: 'value',
						name: '(单位：万平方米)',
						type: 'value',
						splitLine: {
							show: false
						}, //去除网格线
						axisLine: {
							lineStyle: {
								type: 'solid',
								color: '#30dbe3',
								width: '0'
							}
						},
					},
					series: []
				}
			}
		},
		mixins: [hackReset],
		mounted(){
			
		},
		methods: {
		 getlist(version,id,year,month){
			 this.hackReset = false
			 	this.$nextTick(() => {
			 	this.hackReset = true
			 })
			 this.$api.getIntention(version,id,year).then(res=>{
				 if(res.data.length==0){
				 	return
				 }
				this.savedata(res.data)
			 })
			},
			savedata(data){
				var list=[]
				var color=['#135acc','#fdb800'];
				// var type=["line","bar"]
				this.option.legend.color=color;
					data.forEach((e, i, a)=> {
						if(e.group==1){
							var group="剩余凭租面积"
						}else{
							var group="招商意向面积"
						}
						this.option.legend.data[i]=group;
						var numdata=[]
						var month=[]
						e.content.forEach((me,mi,ma)=>{
							numdata.push(me.num)
							month.push(me.month+'月')
						})
						this.option.xAxis.data=month
						if(e.content.length>1){
							list.push({
									name:group,
									type:'line',
									symbol: "none",
									smooth:true,
									// stack: '总量',
									x:20,
									barWidth : 20,//柱图宽度
									data:numdata,
									itemStyle: {//直线颜色
										normal: {
											color: color[i],
											areaStyle: {type: 'default'},
											lineStyle: {
												color: color[i],
											}
										}
									},
								
							})
						}else{
							list.push({
									name:group,
									type:'line',
									// symbol: "none",
									smooth:true,
									// stack: '总量',
									x:20,
									barWidth : 10,//柱图宽度
									data:numdata,
									itemStyle: {//直线颜色
										normal: {
											color: color[i],
											areaStyle: {type: 'default'},
											lineStyle: {
												color: color[i],
											}
										}
									},
								
							})
						}
						
							
					})
					this.option.series=list
			}
		}

		
	}
</script>

<style scoped>
	.attract{
		/* margin-left: 2%; */
	}


	

</style>

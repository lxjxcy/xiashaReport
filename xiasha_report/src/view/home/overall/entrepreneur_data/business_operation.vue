<template>
		<div class="business_operation">
			<Charts :id="id" class="echartall" :option="option" :height="height" :width="width"/>
		</div>		
</template>
<script>
	import echarts from "echarts"
	export default {
		name:"business_operation",
		data() {
			return {
				id:"business_operation",
				width:"400px",
				height:"250px",
				xAxis:['第一季度','第二季度','第三季度','第四季度'],
				clustering:[120, 132, 101, 134],
				incubator:[220, 182, 191, 433],
				technology:[220, 345, 191, 234],
				contrast:[
					{value:335, name:'主营业务收入'},
					{value:310, name:'企业税收'},
					{value:234, name:'研发投入'},
				],
				option:{
					 title: {
						text: '企业经营',
						x:'left',
						textStyle: {//主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
							// fontFamily: 'Arial, Verdana, sans...',
							fontSize: 18,
							backgroundColor:"#f0f",
							fontStyle: 'normal',
							fontWeight: 'normal',
							color:"#fff"
						},
						
					},
					legend: {
						data:[],
						right: '3%',
						top: '10%',
						icon : 'circle',
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
						data: [],
						
						splitLine: {
							show: false
						}, //去除网格线
						axisLine: {
							lineStyle: {
								type: 'solid',
								color: '#30dbe3',
								width: '1'
							}
						},
					},
					textStyle:{
						color:'#fff',
					},
					yAxis: {
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
// 		itemStyle: {
// 					normal: {
// 							color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
// 									offset: 0,
// 									color: "red" // 0% 处的颜色
// 							}, {
// 									offset: 0.6,
// 									color: "blue" // 60% 处的颜色
// 							}, {
// 									offset: 1,
// 									color: "yellow" // 100% 处的颜色
// 							}], false)
// 					}
// 			}
		mounted(){
			this.option.xAxis.data=this.xAxis;
			this.getlist()
			
		},
		methods: {
			getlist(){
				this.$api.getCompanynManage().then(res=>{
					var list=[]
					var color=['#ec6d6f','#ff0001','#00e3d9'];
					var type=['line','line','bar']
					this.option.legend.color=color;
						res.data.forEach((e, i, a)=> {
							this.option.legend.data[i]=e.manageType;	
							var numdata=[]
							var quarter=[]
							e.content.forEach((me,mi,ma)=>{
								numdata.push(me.num)
								// quarter.push('第'+me.quarter+'季度')
							})
							
								list.push({
										name:e.manageType,
										type:type[i],
										// stack: '总量',
										x:20,
										barWidth : 20,
										data:numdata,
										itemStyle: {//直线颜色
											normal: {
												color: color[i],
												lineStyle: {
													color: color[i],
												}
											}
										},
									
								})
						})
						// this.option.xAxis.data=quarter;
						this.option.series=list
				})
				
			}
		}
	}
</script>
<style scoped>
	.business_operation{
		/* padding: 0 2%;
		margin-right: 2% */
		/* border-left: 2px solid #fff */
	}

	

</style>

<template>
		<div class="attract">
			<Charts :id="id" class="echartall" :option="option" :height="height" :width="width"/>
		</div>		
</template>
<script>
	export default {
		name:"attract",
		data() {
			return {
				id:"attract",
				width:"580px",
				height:"230px",
				xAxis:['01月','02月','03月','04月','05月','06月','07月','08月','09月','10月','11月','12月'],
				clustering:[120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210],
				technology:[220, 345, 191, 234, 111, 42, 45,220, 182, 567, 655, 732, 330, 233],
				option:{
					 title: {
						text: '招商需求分析',
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
		mounted(){
			// this.getlist(1);
			this.option.xAxis.data=this.xAxis;
		},
		methods: {
		 getlist(id){
			 this.$api.getIntention(id).then(res=>{
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

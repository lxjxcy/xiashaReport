<template>
	<div class="financing ">
		<Charts :id="id" class="echartall" :option="option" :height="height" :width="width"/>
	</div>
	
</template>

<script>
	import echarts from "echarts"
	export default {
		name:"financing",
		data(){
			return{
				id:"financ",
				width:"100%",
				height:"250px",
				option:{
					title: {
							text: '企业融资情况',
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
						grid: {
							top:"20%",
							right: '4%',
							bottom: '1%',
							containLabel: true
						},
						xAxis: {
							type: 'value',
							show:false,
							boundaryGap: [0, 0.01],
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
						yAxis: {
							type: 'category',
							data: [],
							
							axisTick:{
								show:false
							},
							splitLine: {
								show: false
							}, //去除网格线
							axisLine: {
								show:false,
								lineStyle: {
									type: 'solid',
									color: '#fff',
									width: '0'
								}
							},
						},
						series: [
							{
								name: '',
								type: 'bar',
								barWidth: 14,
								
								data: [],
								itemStyle: {//直线颜色
										normal: {
											color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
													offset: 0,
													color: "#7d5b34" // 0% 处的颜色
											},
// 											{
// 													offset: 0.6,
// 													color: "#13e" // 60% 处的颜色
// 											},
											{
													offset: 1,
													color: "#ef2126" // 100% 处的颜色
											}], false),

											barBorderRadius: [10, 10, 10, 10],//圆角
											lineStyle: {
												color: "#13eefb"
											},
											label: {
												  show: true,
												  position: 'right',
												  textStyle: {
													color: 'white'
												},
											  }
										}
								},
							},
						]

				}
			}
		},
		mounted() {
			this.getlist()
		},
		methods:{
			getlist(){
				this.$api.getCompanynFinancing().then(res=>{
					var yAxisdata=[]
					var listnum=[]
					res.data.forEach((e, i, a)=> {
						yAxisdata.push(e.type)
						listnum.push(e.num)
					})
					this.option.yAxis.data=yAxisdata
					this.option.series[0].data=listnum
				})
			}
		}
	}
</script>

<style scoped>
.financing{
	height:260px;
	/* padding: 2%; */
}


</style>

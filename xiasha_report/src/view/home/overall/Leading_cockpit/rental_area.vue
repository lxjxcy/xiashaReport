<template>
	<div class="rental_area">
		<Charts :id="id" class="echartall" :option="option" :height="height" :width="width"/>
	</div>
	
</template>

<script>
	import echarts from "echarts"
	export default {
		name:"rental_area",
		data(){
			return{
				id:"rental_area",
				width:"100%",
				height:"210px",
				xAxis:['01月','02月','03月','04月','05月','06月','07月','08月','09月','10月','11月','12月',],
				data:[340, 532, 401, 222, 390, 120,45,340, 532, 401, 222, 390, 120,0],
				option:{
							title : {
								text: '在租面积（万平方米）',
								x:'left',
								textStyle: {
								fontSize: 20,
								 backgroundColor:'rgba(128, 128, 128, 0.1)', //rgba设置透明度0.1
								fontStyle: 'normal',
								fontWeight: 'normal',
								color:"#fff"
								},
							},
							textStyle:{
								color:'#fff',
							},
// 							tooltip : {
// 								trigger: 'item',
// 								formatter: "{c}%)"
// 							},
							grid: {
								left: '3%',
								right: '4%',
								bottom: '3%',
								containLabel: true,
								
							},
							
							xAxis: {
								type: 'category',
								 boundaryGap: false,
								axisLine: {
									lineStyle: {
										type: 'solid',
										color: '#fff',
										width: '1'
									}
								},
								
								splitLine: {
									show: false
								}, //去除网格线
								splitArea: {
									show: false
								}, //保留网格区域
								data: []
							},
							yAxis: {
								// name: '(万人)',
								type: 'value',
								splitLine: {
									show: false
								}, //去除网格线
								axisLine: {
									rotate:45,
									lineStyle: {
										type: 'solid',
										color: '#30dbe3',
										width: '1'
									}
								},
								
							},
							series: [{
								data: this.data,
								type: 'line',
								// symbol: "none",
								  smooth:true,
								 areaStyle: {normal: {
                                color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#affa1a'},
                                            // {offset: 0.5, color: '#8ca53f'},
                                            {offset: 1, color: '#99c247'}
                                        ]
                                )
                            }},
								itemStyle: {//直线颜色
									normal: {
										label : {
											show: false,
										},
										color: "#a5b83b",
									
										lineStyle: {
											color: "#a5b83b",
											width:0,
										}
									}
								},
							},
							{
							type: 'liquidFill',// 水波图
							data: [ //可以有多个水波
							{
								value: 0.5,//所占比例 0-1
								itemStyle: {
									color: 'rgb(233,240,254,.7)'
								}
							}],
							itemStyle: { color: "#0074d6" },//波线的阴影
							backgroundStyle :{color:'#00b3ff'},//球状的背景颜色
							radius: '40%',//水波图的半径
							center:["84%",'20.5%'],
							outline: {
								show: false //true显示水波图上的文字
							},
							label: {
								show: true, //不能对水波图设置事件
								formatter: function (value) {
									// console.log(value)
									return '剩余租赁\r\n\r\n'+'面积'+(value.value*100).toFixed(0)+"%";
								},
								position: ['50%', '30%'],
								textStyle: {
									color: '#fff',
									fontSize: 12,
									fontStyle: 'normal',
									fontWeight: 'normal',
								
									
								}
							},
										
						}]
					
					}
			}
		},
		mounted(){
			this.option.xAxis.data=this.xAxis;
			this.getlist()
		},
		methods:{
			getlist(){
				this.$api.getRentArea().then(res=>{
					var len=res.data.length-1
					this.option.series[1].data[0].value=1-res.data[len].percent;
					var numdata=[]
					var month=[]
					res.data.forEach((e,i,a)=>{
						numdata.push(e.num)
						month.push(e.month+'月')
					})
					this.option.series[0].data=numdata;					
				})
			}
		}	
	}
</script>

<style scoped>
	.rental_area{
		height:233px
		/* height:260px; */
	}


</style>

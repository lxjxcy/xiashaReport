<template>
	<div class="occupancy" >
		<Charts :id="id" v-if="hackReset"  :option="option" :height="height" :width="width"/>
	</div>
</template>
<script>	
import echarts from "echarts";
	export default {
		name:"occupancy",
		data() {
			return {
				id:"occupancys",
				hackReset:true,
				width:"850px",
				height:"200px",
				
				option:{
				    title : {
							text: '出租概率',
							x:'left',
							textStyle: {
								fontSize: 18,
								backgroundColor:"#f0f",
								fontStyle: 'normal',
								fontWeight: 'normal',
								color:"#fff"
							},
					},
					// color:['#BBDEFB',"#eee"],
					tooltip : {
						trigger: 'item',
					},
					grid: {
						left: '0',
						top:"-10"	
					},
// 					legend: {
// 						orient: 'vertical',
// 						left: '7%',
// 						show:true,
// 						icon : 'circle',
// 						borderColor :'#fff',
// 						top:'10%',
// 						// data:["2号楼","2号楼"],
// 						textStyle:{
// 								color:['#fff'],
// 					   },
// 						  formatter:(name)=>{
// 								return name+'\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t'
// 							}
// 					},
					textStyle:{
						color:'#fff',
					},
				series: [
					]
				},
				
			}
		},
		mounted(){
			// this.getlist(1)
		},
		methods: {
			getlist(id){
				this.$api.getReaBuilding(id).then(res=>{
					this.savedata(res.data)
					this.hackReset = false
						this.$nextTick(() => {
						this.hackReset = true
					})
				})
			},
			
			savedata(data){
				var needdata=[]
				data.forEach((e,i,a)=>{
					// var centerleft=i*60/100
					var center = 17*i+8;
					needdata.push({
					name: '',
					type: 'pie',
					radius: ['35%', '52%'],
				center: [center + "%", "50%"],//饼图的位置 
				avoidLabelOverlap: false,
				hoverAnimation:false,
				  label: { //  饼图图形上的文本标签
                normal: { // normal 是图形在默认状态下的样式
                    show: true,
                    position: 'center',
                    color: '#fff',
                    fontSize: 14,
										
                    // fontWeight: '100',
                    formatter: '{b}\n{c}%' // {b}:数据名； {c}：数据值； {d}：百分比
                }
            },
            data: [{
                    value: (e.rentalRate*100).toFixed(0)/100,
                    name: e.buildingName,
						itemStyle: {
			                normal: {
			                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
													{offset: 0, color: '#98d0db'  },
			//                    {offset: e.percent, color: '#2945b2' },
												{offset: 1, color: '#2945b2' },
												], false)
			                }
			            },
                    label:{
                        normal:{
                            show:true
                        }
                    }
                 },
                {
                    value: 100-(e.percent*100).toFixed(0)/100,
                    name: '',
									itemStyle: {
			                normal: {
			                    color:"#313131"
			                }
			            },
										label: {
                        normal: {
                        show: false
                        }
                    }
                }
            ]
					},
							{
								name: '',
								type: 'pie',
								radius: ['42%'],
								center: [center-0.5 + "%", "48%"],//饼图的位置 
								avoidLabelOverlap: false,
								hoverAnimation:false,
								label: { //  饼图图形上的文本标签
										normal: { // normal 是图形在默认状态下的样式
												show: true,
												position: 'center',
												color: '#fff',
												fontSize: 14,
												
												// fontWeight: '100',
												formatter: '{b}\n{c}%' // {b}:数据名； {c}：数据值； {d}：百分比
										}
								},
								data: [
										{
												value: 100,
												name: '',
											itemStyle: {
					                normal: {
					                    color:"#000"
					                }
					            },
												label: {
														normal: {
														show: false
														}
												}
										}
								]
							},)
						
				})
				this.option.series=needdata;
				
				
			}
		},
	}

</script>
<style scoped>
	.employees{
		/* padding:2%; */
	}
	
</style>
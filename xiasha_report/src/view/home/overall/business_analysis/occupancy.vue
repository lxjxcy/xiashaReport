<template>
	<!-- <div class="occupancy" > -->
		<Charts :id="id" v-if="hackReset"  :option="option" :height="height" :width="width"/>
	<!-- </div> -->
</template>
<script>	
// import hackReset from "../../../../mixins/hackReset.js"
import echarts from "echarts";
	export default {
		name:"occupancy",
		data() {
			return {
				id:"occupancys",
				hackReset:true,
				width:"100%",
				number:11,
				init:"",
				height:"100%",
				
				option:{
				    title : {
							text: '出租概率',
							x:'left',
							textStyle: this.$store.state.textStyle,
					},
					// color:['#BBDEFB',"#eee"],
					tooltip : {
						trigger: 'item',
					},
					grid: {
						left: '0',
						top:"-20"	,
						bottom:"0"
					},

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
		// mixins: [hackReset],
		methods: {
						clear(){
							window.clearInterval(this.init)
						},
						getlist(version,id,year,month,){
							this.clear()	
							this.$api.getYearMonthIdReport(version,id,year,month,this.number).then(res=>{
								if(res.data.length==0){
									return
								}
								this.hackReset = false
									this.$nextTick(() => {
									this.hackReset = true
								})
								// if(res.data.length/6)
								var arr=[]
								var len=res.data.length/6;
								if(len<=1){
									this.savedata(res.data)
								
									return;
								}
							
								for(var i=0;i<len;i++){
									var list=[]
									 list.push(res.data.slice(i*6,(i+1)*6))
									 arr.push(list)
								}
								// console.log(arr)
								this.savedata(arr[0][0])				
									var index=0;
								this.init=window.setInterval(()=>{
									index++;								
									if(index==arr.length){
										index=0
									}
									this.hackReset = false
										this.$nextTick(() => {
										this.hackReset = true
									})
									this.savedata(arr[index][0])															
								},3000)
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
					radius: ['48%', '65%'],
				center: [center + "%", "60%"],//饼图的位置 
				avoidLabelOverlap: false,
				hoverAnimation:false,

						label: {
							 normal: { 
								   position: 'center',
							formatter:(params)=>{
								var name=params.name
								var value=params.percent+"%";
								// return name+"\r\n"+value
									var arr = [
									'{a|'+name+'}',
									'{b|'+value+'}',
								]
								return arr.join('\n\n')
							},
							textStyle:{
								rich:{
									a:{
										fontSize:14,
										verticalAlign:'top',
										align:'left',
										color:"#bf9232",
									},
									b:{
										fontSize:14,
										align:'left',
										color:"#fff",
									}
								},
								}
							},
							
							
							
							
							color:"#fff",
								emphasis: {
										show: true
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
                    value: 100-(e.rentalRate*100).toFixed(0)/100,
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
								radius: ['54%'],
								center: [center-0.2 + "%", "59%"],//饼图的位置 
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

 
 <template>

 			<Charts :id="id" v-if="hackReset" class="echartall" :option="option" :height="height" :width="width"/>
 	
 </template>
 <script>	
 import hackReset from "../../../../mixins/hackReset.js"
 import echarts from "echarts"
 	export default {
 		name:"vacancy",
 		data() {
 			return {
 				id:"vacancy",
 				width:"100%",
 				height:"100%",
				number:15,
 				option:{
 					title : {
 						text: '空置面积占比分析',
 						x:'left',
 						textStyle: this.$store.state.textStyle,
 					},
 					grid: {
 						left: '0',
 						top:"2%"
 						
 						
 					},
 					tooltip: {
 						trigger: 'item',
 						formatter: "{a} <br/>{b}: {c} ({d}%)"
 					},
 					color:['#62b6ed','#ffb400','#66f084','#ff9e55'],
 					series: [
 						{
 							name:'访问来源',
 							type:'pie',
 							itemGap: 60,
 							radius: ['40%', '60%'],
 							center: ['50%', '60%'],//饼图的位置 
 							avoidLabelOverlap: false,
 							label: {
 								formatter:(params)=>{
 									var name=params.name
 									var value=params.percent+"%";
 									// return name+"\r\n"+value
 										var arr = [
 										'{a|'+name+'}',
 										'{b|（'+value+'）}',
 									]
 									return arr.join('\n')
 								},
 								textStyle:{
 									rich:{
 										a:{
 											fontSize:12,
 											verticalAlign:'top',
 											align:'left',
 										},
 										b:{
 											fontSize:12,
 											align:'left',
 											color:"#fff",
 										}
 									}
 								},
 								
 								
 								
 								
 								color:"#fff",
 									emphasis: {
 											show: true
 									}
 							},
 									labelLine:{  
 										normal:{  
 												length:10 
 										}  
 								}, 
								itemStyle:{
										borderWidth:5, //设置border的宽度有多大
										borderColor:'#252b35',
								},
			
 							data:[]
 						}
 					],
 				},			
 			}
 		},
		mixins: [hackReset],
 		mounted(){
 			// this.getlist(1)
 		
 		},
 		methods: {
 			getlist(version,id,year,month,){
				this.hackReset = false
					this.$nextTick(() => {
					this.hackReset = true
				})
 				this.$api.getYearMonthIdReport(version,id,year,month,this.number).then(res=>{
					if(res.data.length==0){
						return
					}
 					var data=[];
 					res.data.forEach((e, i, a)=> {
 						data.push({
 							value:e.num,
 							name:e.type
 						})
 					})
 					this.option.series[0].data=data;
 					
 				})
 			}
 		},
 	}
 
 </script>
 <style scoped>
 .containers{
	 height:260px;
 	/* margin-left: 2%; */
 
 }
 	
 </style>
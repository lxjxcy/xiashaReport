<template>
	<div class="scale">
		<ul style="overflow: hidden;">
			<li class="l  echartall" style="width:350px;">
				<Charts :id="id1"  :option="option1" :height="height" :width="width"/>
			</li>
			<li class="l" >
				<aptitude></aptitude>
			</li>
			<li class="l  echartall" style="width:350px;">
				<Charts :id="id2" :option="option2" :height="height" :width="width"/>
			</li>
		</ul>
		
	</div>
	
</template>

<script>
	import aptitude from "./aptitude.vue"
	export default {
		name:"scale",
		components:{
			aptitude
		},
		data(){
			return{
				id1:"scale1",
				id2:"scale2",
				width:"350px",
				height:"240px",
				option1:{
					 title : {
						text: '企业进驻数量类型占比top5',
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
							left: '3%',
							right: '4%',
							bottom: '3%',
							containLabel: true
						},
						tooltip : {
							trigger: 'item',
							formatter: "{a} <br/>{b} : {c} ({d}%)"
						},

					calculable : true,
					color:['#8600cc','#ff0000','#fdb800','#d717ff','#fff'],
					series : [
							 {
							name:'',
							type:'pie',
							radius : [25, 70],
							center : ['50%', '50%'],
							roseType : 'radius',
							label: {
								 formatter:(params)=>{
									 var name=params.name
									 var value=params.percent+"%";
									 return name+value
								 },
								 color:"#fff",
									emphasis: {
											show: true
									}
							},
									labelLine:{  
										normal:{  
												length:2 
										}  
								}, 
						 data:[]
					},
					
						
					]
				},
				option2:{
								 title : {
									text: '企业员工人数类型占比top5',
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
									left: '3%',
									right: '4%',
									bottom: '3%',
									containLabel: true
								},
								tooltip : {
									trigger: 'item',
									formatter: "{a} <br/>{b} : {c} ({d}%)"
								},
			
							calculable : true,
							color:['#8600cc','#ff0000','#fdb800','#d717ff','#fff'],
							series : [
								   {
			            name:'',
			            type:'pie',
			            radius : [25, 70],
			            center : ['50%', '50%'],
			            roseType : 'radius',
			            label: {
			               formatter:(params)=>{
			               	var name=params.name
			               	var value=params.percent+"%";
			               	return name+value
			               },
// 										  backgroundColor: '#fff',
//                     borderColor: '#fff',
//                     borderWidth: 1,
										color:"#fff",
// 										padding:4,
//                     borderRadius: 2,
									
			                emphasis: {
													shadowBlur: 10,
													shadowOffsetX: 0,
													shadowColor: 'rgba(0, 0, 0, 0.5)'
											}
									
			            },
			             labelLine:{  
												normal:{  
														length:2  
												}  
									}, 
			           data:[]
			        },
								
									
					]
				}
				
			}
		},
		mounted(){
			this.getlist1()
			this.getlist2()
		},
		methods:{

			getlist1(){
				this.$api.getCompanyTopNume().then(res=>{
						this.option1.series[0].data=this.getforeach(res.data)
				})
				
			},
			getlist2(){
				this.$api.getopEmployeesNume().then(res=>{
					this.option2.series[0].data=this.getforeach(res.data)

				})
				
			},
			getforeach(data){
				var seriesdata=[]
				data.forEach((e,i,a)=>{
					seriesdata.push({
						value:e.num,
						name:e.type,
					})
					
				})
				return seriesdata
			}
			
		}
		
	}
</script>

<style scoped>
	.scale{
		/* margin-top: 1%; */
		
	}

</style>

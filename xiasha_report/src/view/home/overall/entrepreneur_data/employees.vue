<template>
	<div class="employees">
		<Charts :id="id" class="echartall" :option="option" :height="height" :width="width"/>
		<!-- <div id="myChart" class="echartall" :style="{width: '100%', height: '220px'}"></div> -->
		
	</div>
	
</template>
<script>	
	export default {
		name:"employees",
		data() {
			return {
				id:"employees",
				width:"300px",
				height:"210px",
				num:"249人",
				option:{
				    title : {
						text: '',
						x:'left',
						textStyle: {
							fontSize: 20,
							backgroundColor:"#f0f",
							fontStyle: 'normal',
							fontWeight: 'normal',
							color:"#fff"
						},
					},
					color:['#80da81','#ff0000','#0091ff','#ff9200'],
					tooltip : {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend: {
						orient: 'vertical',
						right: '10px',
						icon : 'circle',
						top:'20%',
						textStyle:{
						color:['#fff'],
					    },
						  formatter:(name)=>{
							 var data=this.option.series[0].data
							 var total = 0;
							 var target;
							 for (var i = 0;i < data.length; i++) {
							 total += parseInt(data[i].value);
							 if (data[i].name == name) {
							 	target = data[i].value;
							 	}
							 }
							 return name + '   |   ' + (parseInt(target)/parseInt(total)*100).toFixed(2) + '%'+ '   |   '+target+"人"
							},
					},
					textStyle:{
						color:'#fff',
					},
					series : [
						{
							name: '',
							type: 'pie',
							radius: ['0%', '60%'],
							center: ['28%', '60%'],//饼图的位置 
							data:[],
							 textStyle:{//图例文字的样式
								color:'#fff',
								fontSize:16
							},
							
							
							itemStyle: {
								emphasis: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: 'rgba(0, 0, 0, 0.5)'
								},
								normal : {
									
									label : {
										show : false   ,//隐藏标示文字，
										
									},
									labelLine : {
										show : false   //隐藏标示线
									}
								}
							},
							
						}]
				}
			}
		},
		mounted(){
			this.getlist()
		},
		methods: {
			getlist(){
				this.$api.getCompanynmployeesNumn().then(res=>{
					var data=[];
					this.option.title.text='企业人数'+res.data.total+'人';
					var arr=res.data;
					arr.forEach((e, i, a)=> {
											
						if(e.educationName=="博士"){
							// a[i]["value"]=a[i].doctorNum.;
							data.push({
								value:e.doctorNum,
								name:e.educationName
							})
						}
						
					
						else if(e.educationName=="硕士"){
							// a[i]["value"]=a[i].masterNum.;
							data.push({
								value:e.masterNum,
								name:e.educationName
							})
						}
						else if(e.educationName=="本科"){
							// a[i]["value"]=a[i].undergraduateNum;
							data.push({
								value:e.undergraduateNum,
								name:e.educationName
							})
							
						}
						else{
							// a[i]["value"]=a[i].collegeNum;
							data.push({
								value:e.collegeNum,
								name:e.educationName
							})
						}
					})

					this.option.series[0].data=data
				})
			}

		},
	}

</script>
<style scoped>
	.employees{
		height:230px;
		/* padding:1% 2%; */
	}
	
</style>
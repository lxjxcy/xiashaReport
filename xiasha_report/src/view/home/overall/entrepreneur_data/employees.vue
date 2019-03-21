<template>
	<!-- <div class="employees"> -->
		<Charts :id="id" v-if="hackReset" class="echartall" :option="option" :height="height" :width="width"/>
		<!-- <div id="myChart" class="echartall" :style="{width: '100%', height: '220px'}"></div> -->
		
	<!-- </div> -->
	
</template>
<script>	
	export default {
		name:"employ",
		data() {
			return {
				id:"employees",
				width:"100%",
				height:"100%",
				hackReset:true,
				num:"249人",
				option:{
				    title : {
						text: '',
						x:'left',
						textStyle: this.$store.state.textStyle,
					},
					color:['#80da81','#ff0000','#0091ff','#ff9200'],
					tooltip : {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend: {
						orient: 'vertical',
						right: '5px',
						icon : 'circle',
						top:'35%',
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
							radius: ['0%', '50%'],
							center: ['20%', '60%'],//饼图的位置 
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
			// this.getList()
		},
		methods: {
			getList(version,year,month){
				this.hackReset = false
					this.$nextTick(() => {
					this.hackReset = true
				})
				this.$api.getCompanynmployeesNumn(version,year,month).then(res=>{
					if(res.data.length==0){
						return
					}
					var data=[];
				
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
					var  total=0;
						data.forEach((e,i,a)=>{
							total += parseInt(e.value);
						})
						this.option.title.text='企业人数'+total+'人';
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
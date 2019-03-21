<template>
			<Charts :id="id" v-if="hackReset" class="echartall" :option="option" :height="height" :width="width"/>	
</template>
<script>	
	export default {
		name:"price_contrast",
		data() {
			return {
				id:"price_contrast",
				width:"100%",
				height:"100%",
				hackReset:true,
				number:22,
				option:{
					title : {
						text: '租金收入比对（万元）',
						x:'left',
						textStyle: this.$store.state.textStyle,
					},
					grid: {
						left: '3%',
						right: '4%',
						top:"35%",
						bottom: '3%',
						containLabel: true,
						
					},
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b}: {c} ({d}%)"
					},
					legend: {
						orient: 'vertical',
						left: '45%',
						icon : 'circle',
						top:'30%',
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
								return name + '   |   ' + (parseInt(target)/parseInt(total)*100).toFixed(2) + '%'+ '   |   ￥'+target;
							},
					},
					color:['#00975f','#00889c','#a52a5d','#ff9200',"#d62000"],
					series: [
						{
							name:'访问来源',
							type:'pie',
							itemGap: 60,
							
							// radius : '60%',
							radius: ['40%', '60%'],
							center: ['20%', '60%'],//饼图的位置 
							avoidLabelOverlap: false,
							label: {
								normal: {
									 show: true,
									position: 'center', 
									textStyle:{
									color:"#fff",
										},
									  formatter:function (argument) {
											var html;
											html='租金收入\r\n\r\n'+'项目对比';
											return html;
										},　
								},
								emphasis: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: 'rgba(0, 0, 0, 0.5)'
								},
							},
							labelLine: {
								normal: {
									show: false
								}
							},
							data:[]
						}
					],
				},			
			}
		},
		mounted(){
			// this.getList()
		
		},
		methods: {
			lengeds(name){
				// console.log(name)
				var data=this.option.series[0].data
				var total = 0;
				var target;
				for (var i = 0, l = data.length; i < l; i++) {
				total += data[i].value;
				if (data[i].name == name) {
					target = data[i].value;
					}
				}
				return name + '   |   ' + ((target/total)*100).toFixed(2) + '%'+ '   |   ￥'+target;
			},
			getList(version,year,month){
				this.hackReset = false
					this.$nextTick(() => {
					this.hackReset = true
				})
				this.$api.getYearMonthReport(version,year,month,this.number).then(res=>{
					if(res.data.length==0){
						return
					}
					var data=[];					
					res.data.forEach((e, i, a)=> {
						data.push({
							value:e.num,
							name:e.communityName
						})
					})
					// console.log(data)
					this.option.series[0].data=data
					
				})
			}
		},
	}

</script>
<style scoped>
.price_contrast{
	height:33%;
}
	
</style>
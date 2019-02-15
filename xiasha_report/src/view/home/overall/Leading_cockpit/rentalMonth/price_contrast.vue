<template>
	<div>
		<div class="price_contrast">
			<Charts :id="id" class="echartall" :option="option" :height="height" :width="width"/>
		</div>
	</div>	
</template>
<script>	
	export default {
		name:"price_contrast",
		data() {
			return {
				id:"price_contrast",
				width:"100%",
				height:"200px",
				option:{
					title : {
						text: '租金收入比对',
						x:'left',
						textStyle: {//主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
							// fontFamily: 'Arial, Verdana, sans...',
							fontSize: 20,
							backgroundColor:"#f0f",
							fontStyle: 'normal',
							fontWeight: 'normal',
							color:"#fff"
						},
					},
					grid: {
						left: '0',
						top:"2%"
						
						
					},
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b}: {c} ({d}%)"
					},
					legend: {
						orient: 'vertical',
						right: '2%',
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
							radius: ['40%', '70%'],
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
			this.getlist()
		
		},
		methods: {
			lengeds(name){
				console.log(name)
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
			getlist(){
				this.$api.getRentCompare().then(res=>{
					var data=[];
					
					res.data.forEach((e, i, a)=> {
						data.push({
							value:e.num,
							name:e.communityName
						})
					})
					console.log(data)
					this.option.series[0].data=data
					
				})
			}
		},
	}

</script>
<style scoped>
.price_contrast{
	height:210px;
}
	
</style>
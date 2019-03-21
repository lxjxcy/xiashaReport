<template>

	<div :style="{height:'100%',width:'100%'}" id="chart-panel" class="echartall " ref="myxiasha"></div>
		

	
</template>

<script>
	import echarts from "echarts"
	// import jinhuajson from "@/assets/map.json"
	import jinhuajson from "@/assets/map1.json"
	// import {createjs }from "createjs"
	// import createjs from "https://code.createjs.com/1.0.0/easeljs.min.js"
	export default {
		name:"xiashaMap",
		data(){
			return{
				min:0,
				max:0,
				number:27,
				geoCoordMap:{
					'文创园':[120.3441300000,30.3002700000],
					'海聚中心':[120.3739930000,30.3070200000],
					'生命科技中心':[120.3139200000,30.3002500000],
					'孵化器':[120.3778839160,30.3098892722],
					'服务外包':[120.3682750000,30.3088070000],	
				},
				data: [],
				init:'',
			}
		},
		// mixins:["jinhua"],
		mounted(){
			// this.getList()
		},
		methods:{
			convertData(data){
				var res = [];
				for (var i = 0; i < data.length; i++) {
						var geoCoord = this.geoCoordMap[data[i].name];
						if (geoCoord) {
								res.push({
										name: data[i].name,
										value: geoCoord.concat(data[i].value)
								});
						}
				}
				
				return res;
		},
		getList(version,year,month){
			window.clearInterval(this.init)
			this.$api.getYearMonthReport(version,year,month,this.number).then(res=>{
				if(res.data.length==0){
					return
				}
				var data=res.data;
				var list=[]
				var valueList=[];
				data.forEach((e,i,a)=>{
					list.push({
						name:e.communityName,
						value:e.num,
					})
					valueList.push(Number(e.num))
				})
			
				this.max= eval("Math.max(" + valueList.toString() + ")");
				this.min = eval("Math.min(" + valueList.toString() + ")");	
				this.data=list;
				this.getMap()
				
			})
		},
			getMap(){		
				// this.axios.get("../../../../../../static/jinhua.json").then(res=>{
					echarts.registerMap('金华', jinhuajson);
					let myxiasha = echarts.init(this.$refs.myxiasha);
					let left = false, top = false, priority = 'top'
					// 自定义tooltip配置属性
					let config = {
						ecBoxId: 'chart-panel',
						lineColor: '#fff',
						L1: {
							time: 0.3,
							long: 40
						},
						L2: {
							time: 0.3,
							long: 40
						},
						text: {
							time: 0.5,
							text: '',
							font: '14px Arial',
							color: '#fff',
							padding: [10, 10],
							width: 120,
							height: 60,
							lineHeight: 24,
							backgroundColor: 'rgba(50, 50, 50, 0.8)'
						}
					}

					
					const canvasAnimation = params => {
						setTimeout(function() {
							config.text.text = `地点：${params.name}\n数量：${params.value[2]}`
							new myTooltip('tCanvas', config)
						}, 0);
					}

					// 计算tooltip位置
					const getPosOrSize = (type, point) => {
						let x1 = config.L1.long * Math.sin(Math.PI / 4)
						let width = x1 + config.L2.long + config.text.width,
							height = x1 + config.text.height / 2
						if (type === 'size') {
							config.width = width
							config.height = height
							return {
								width,
								height
							}
						} else {
							let box = document.getElementById(config.ecBoxId),
								bw = box.offsetWidth,
								bh = box.offsetHeight,
								x = point[0],
								y = point[1]
							left = false
							if (x + width >= bw / 1.2) {
								x = x - width - 5
								left = true
							}
							if (priority === 'top') {
								// L1向上
								top = true
								y = y - height - 5
								if (y <= 0) {
									y = point[1]
									top = false
								}
								return [x, y]
							} else {
								top = false
								if (y + height >= bh) {
									y = y - height - 5
									top = true
								}
								return [x, y]
							}
						}
					}
					
					class myTooltip {
						constructor (id, config) {
							this.config = config
							this.totalTime = 0
							this.stage = new createjs.Stage(id)
							this.timeline = new TimelineMax({repeat: 0})
							this.g = new createjs.Graphics()
							this.lineShape = new createjs.Shape(this.g)
							this.textShape = new createjs.Shape()
							this.stage.addChild(this.lineShape, this.textShape)
							this.init()
							this.begin()
							this.update()
						}
						init () {
							this.start = [0, 0]
							if (left) {
								this.start[0] = this.config.width 
							}
							if (top) {
								this.start[1] = this.config.height
							}
						}
						begin () {
							this.L1()
							this.L2()
							this.addText()
						}
						L1 () {
							let me = this
							let c = me.config
							let tl = new TimelineMax()
							let scale = {s: 0},
							x = c.L1.long * Math.sin(Math.PI / 4)
							if (left) {
								if (top) {
									this.L1End = [me.start[0] - x, me.start[1] - x]
								} else {
									this.L1End = [me.start[0] - x, me.start[1] + x]
								}
							} else {
								if (top) {
									this.L1End = [x, me.start[1] - x]
								} else {
									this.L1End = [x, x]
								}
							}
							
							tl.to(scale, c.L1.time, {
								s: 1,
								onUpdate () {
									let s = scale.s
									if (left) {
										if (top) {
											me.g.c().s(c.lineColor).mt(...me.start).lt(me.start[0] - x * s, me.start[1] - x * s)
										} else {
											me.g.c().s(c.lineColor).mt(...me.start).lt(me.start[0] - x * s, me.start[1] + x * s)
										}
									} else {
										if (top) {
											me.g.c().s(c.lineColor).mt(...me.start).lt(x * s, me.start[1] - x * s)
										} else {
											me.g.c().s(c.lineColor).mt(...me.start).lt(x * s, x * s)
										}
									}
									me.update()
								}
							})
							this.timeline.add(tl, this.totalTime)
							this.totalTime += c.L1.time
						}
						L2 () {
							// 只跟左右有关，只判断left
							let me = this
							let c = me.config
							let tl = new TimelineMax()
							let scale = {s: 0}
							tl.to(scale, c.L2.time, {
								s: 1,
								onUpdate () {
									let s = scale.s
									if (left) {
										me.g.c().s(c.lineColor).mt(...me.start).lt(...me.L1End).lt(me.L1End[0] - c.L2.long * s, me.L1End[1])
									} else {
										me.g.c().s(c.lineColor).mt(...me.start).lt(...me.L1End).lt(me.L1End[0] + c.L2.long * s, me.L1End[1])
									}
									me.update()
								}
							})
							this.timeline.add(tl, this.totalTime)
							this.totalTime += c.L2.time
						}
						addText () {
							// text框只与L2end有关，只需判断left即可，top不影响
							let me = this
							let c = me.config
							let tl = new TimelineMax()
							let scale = {s: 0},
								L2End = [me.L1End[0] + c.L2.long, me.L1End[1]]
							if (left) {
								L2End = [me.L1End[0] - c.L2.long, me.L1End[1]]
							}
							tl.to(scale, c.text.time, {
								s: 1,
								onStart () {
									let x = 0, y = 0
									if (left) {
										x = L2End[0] - c.text.width
									} else {
										x = L2End[0]
									}
									me.g.c().s(c.lineColor).mt(...me.start).lt(...me.L1End).lt(...L2End)
									me.text = new createjs.Text(c.text.text, c.text.font, c.text.color)
									me.text.alpha = 0
									me.text.lineHeight = c.text.lineHeight
									me.text.x = x + c.text.padding[0]
									me.text.y = L2End[1] - c.text.height / 2 + c.text.padding[1]
									me.stage.addChild(me.text)
									me.textShape.graphics.c().f(c.text.backgroundColor).rr(x, L2End[1] - c.text.height / 2, c.text.width, c.text.height, 5)
									me.textShape.alpha = 0
									me.update()
								},
								onUpdate () {
									me.text.alpha = scale.s
									me.textShape.alpha = scale.s
									me.update()
								}
							})
							this.timeline.add(tl, this.totalTime)
						}
						update () {
							this.stage.update()
						}
					}
				myxiasha.setOption({
					// backgroundColor: '#404a59',
					title: {
						text: '企业数量',
						x:'left',
						textStyle: {
							fontSize: 16,
							backgroundColor:"#f0f",
							fontStyle: 'normal',
							fontWeight: 'normal',
							color:"#fff"
						},
						
					},
					  tooltip : {
							trigger: 'item',
							triggerOn: 'click',
							backgroundColor: 'transparent',
							alwaysShowContent: true,
							position (pos) {
									let position = getPosOrSize('pos', pos)
									return position
							},
					
							formatter (params,p,a) {
								 canvasAnimation(params)
								let size = getPosOrSize('size')
								let tooltipDom = `<canvas id="tCanvas" width="${size.width}" height="${size.height}">123</canvas>`
								return tooltipDom

							}
						},
						legend: {
							show:false
						},
					grid: {
						left: '10%',
						top:"10%",
						bottom:"10%"
					},
					visualMap: { //图例值控制
						min : this.min,
						max : this.max,
						calculable : true,
						color: ['#ff3333', 'orange', 'yellow','lime','aqua'],
						textStyle:{
							color:'#fff'
						}
					},
					
					geo: {
						map: '金华',
						label: {
							emphasis: {
								show: true
							}
						},
						roam: true,
						zoom: 1,
						itemStyle: {
							normal: {
								areaColor: '#323c48',
								borderColor: '#111'
							},
							emphasis: {
								areaColor: '#2a333d'
							}
						}
					},
					// series:series
					series : [
						{
							name: 'Top 10',
							type: 'effectScatter',
							coordinateSystem: 'geo',
// 							data: convertData(this.data.sort(function (a, b) {
// 								return b.value - a.value;
// 							}).slice(0, 50)),
							data: this.convertData(this.data.sort((a, b)=> {
									return b.value - a.value;
							})),

							
							symbolSize: function (val) {
									return 10 ;
							},
							showEffectOn: 'render',
							rippleEffect: {
								period:3,   //动画时间，值越小速度越快
									brushType: 'stroke', //波纹绘制方式 stroke, fill
									// scale:    //波纹圆环最大限制，值越大波纹越大
							},
							hoverAnimation: true,
								label: {
									normal: {
										formatter: '{b}',
										position: 'right',
										show: true
									}
								},
								itemStyle: {
									normal: {
										color: '#f0f',
										shadowBlur: 10,
										shadowColor: '#333'
									}
								},
								zlevel: 1
						},
					]
				})
				var index = 0
				this.init=window.setInterval(()=> {
					myxiasha.dispatchAction({
						type: 'showTip',//提示
						seriesIndex: 0,
						dataIndex: index
					});
						index++;
						if (index >=this.data.length) {
								index = 0							
						}
				}, 3000);

window.addEventListener('resize', e => {
    let tCanvas = document.getElementById('tCanvas')
    if (tCanvas) {
        tCanvas.style.display = 'none'
    }
})
					
					
					
					
					
					
				// })

				 
				
				
			},
			
			// 计算tooltip位置

		
		},
　　　　destroyed: function() {
　　　　			window.clearInterval(this.init)
　　　　},
		
	}
</script>

<style scoped>
	.maps{
		margin:10px;
		height:100%;
	}

</style>

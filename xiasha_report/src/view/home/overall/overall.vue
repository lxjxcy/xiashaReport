<template>
	<ul class="out-work">			
		<li style="height:100%;width:1408px">
			<LeadingCockpit ref="leadData"></LeadingCockpit>
		</li>
		<li style="height:100%;width:1408px">
			<entrepreneurData ref="enteData"></entrepreneurData>
		</li>
		<li style="height:100%;width:1408px">
			<businessAnalysis ref="businData"></businessAnalysis>
		</li>
		<li style="height:100%;width:1408px">
			<industryAnalysis ref="indusData"></industryAnalysis>
		</li>
	</ul>

</template>
<script>
	// import 
	import util from "../../../common/js/tool.js"
	import LeadingCockpit  from "./Leading_cockpit/leading_cockpit.vue"
	import entrepreneurData from "./entrepreneur_data/entrepreneur_data.vue"
	import businessAnalysis from "./business_analysis/business_analysis.vue"
	import industryAnalysis from "./industry_analysis/industry_analysis.vue"
	

	export default {
		name:"overall",
		components:{
			LeadingCockpit,
			entrepreneurData,
			businessAnalysis,
			industryAnalysis
		},
		data(){
			return{
				version:this.$store.state.version,
				year:this.$store.state.year,
				month:this.$store.state.month,
				websock: null,
				
			}
		},
		created(){
           //页面刚进入时开启长连接
          this.initWebSocket()
		},
　　　　destroyed: function() {
　　　　//页面销毁时关闭长连接
　　　　　　this.websocketclose();
　　　　},
		watch: {
			"$store.state.version":function(ov,nv){
				// if(ov!=nv){
					this.requestAllData(this.$store.state.version,this.$store.state.year,this.$store.state.month)
				// }
				
				
			}			 
		},
		mounted(){
			var id=util.parseUrlData(window.location.href)
			if(!id){
				var year=id.hasOwnProperty('year')
				if(year){
					this.year=id.year,
					this.$store.state.year=id.year
				}
				var month=id.hasOwnProperty('month')
				if(month){
					this.month=id.month
					this.$store.state.month=id.month	
				}
				var version=id.hasOwnProperty('version')
				if(version){
					this.version=id.version;
					this.$store.state.version=id.version
				}
			}
			this.requestAllData(this.version,this.year,this.month)
		},
		methods:{
			//随机两位数
			rnd(n, m){
				var random = Math.floor(Math.random()*(m-n+1)+n);
				return random;
			},
			//更新数据
			requestAllData(version,year,month){	
				
				
				this.$refs.leadData.requestData(version,year,month)
				this.$refs.enteData.requestData(version,year,month)				
				this.$refs.businData.requestData(version,year,month)
				// this.$refs.indusData.requestData(version,year,month)				
			},
			initWebSocket(){ //初始化weosocket 　　　
　　　　　　const wsuri = 'ws://101.37.124.231:8081/audit/websocket/'+this.rnd(1,50);//ws地址
　　　　　　　　this.websock = new WebSocket(wsuri); 
　　　　　　　　this.websock.onopen = this.websocketonopen;
　　　　　　　　this.websock.onerror = this.websocketonerror;
　　　　　　　　this.websock.onmessage = this.websocketonmessage; 
　　　　　　　　this.websock.onclose = this.websocketclose;
　　　　   },
			websocketonopen() {
　　　　　　　　console.log("WebSocket连接成功");
　　　　　　},
　　　　　　websocketonerror(e) { //错误
 　　　　　　 console.log("WebSocket连接发生错误");
　　　　　　},
			websocketonmessage(e){ 
				console.log(e)
				var mes=e.data;
				if(mes.indexOf("&&")!=-1){
					var list=mes.split('&&')
					this.$store.state.year=list[0]
					this.$store.state.month=list[1]
					this.$store.state.version=list[2]
				}
// 				
				//数据接收 
// 　　　　　　　　const redata = JSON.parse(e.data);
　　　　　　　　　//注意：长连接我们是后台直接1秒推送一条数据， 
					//但是点击某个列表时，会发送给后台一个标识，后台根据此标识返回相对应的数据，
				//这个时候数据就只能从一个出口出，所以让后台加了一个键，例如键为1时，是每隔1秒推送的数据，为2时是发送标识后再推送的数据，以作区分
// 　　　　　　　　console.log(redata.value); 
　　　　　　	}, 

　　　　　　websocketsend(agentData){//数据发送 
　　　　　　　　this.websock.send(agentData); 
　　　　　　}, 

　　　　　 websocketclose(e){ //关闭 
　　　　　　　　console.log("connection closed (" + e.code + ")"); 
　　　　　},

		}
		

	}

</script>
<style scoped>
/* li{
	margin: 5px;
} */

	.out-work{
		height:100%;
				width:5632px;
				display: flex;
				justify-content: space-between;
	}







</style>
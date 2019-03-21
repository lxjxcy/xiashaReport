<template>
	<div class="business_analysis">
		<div style="display: flex;justify-content: flex-start;height:25%" class="comm-padd">
			<ul class="title echartall" style="height:100%;width: 60%;">
				<ul style="height:20%;margin-bottom: 0.1rem;">
					<li v-for="(item,index) in list" @click="getId(item,index)">
						<!-- <span :class="ifselect==index+1?'yesSelect':'noSelect'">{{item.communityName}}</span> -->
					
					<span v-if="ifselect==index+1" class="yesSelect">{{item.communityName}}</span>
					</li>
				</ul>
				<li style="height:80%;" class="comm-padd"><occupancy  ref="occupancyChild"></occupancy></li>
			</ul>
			
			<div style="height:100%;width: 40%; padding-left:0.06rem;box-sizing: border-box;">
				<custom ref="customChild"></custom>		
			</div>					
		</div>
		<div style="display: flex;justify-content: flex-start;height:75%;width:100%">
				<div style="width:80%">
					<ul style="display: flex;justify-content: flex-start;height:55%">
						<li style="width:48%;" class="comm-padd"><income ref="incomeChild"></income></li>
						<li style="width:52%;" class="comm-padd"><attract ref="attractChild"></attract></li>
					</ul>
					<ul style="display: flex;justify-content: flex-start;height:45%">
							<li style="width:40%;" class="comm-padd"><house ref="houseChild"></house></li>
							<li style="width:30%;" class="comm-padd"><vacancy ref="vacancyChild"></vacancy></li>
							<li style="width:30%;" class="comm-padd"><daynum ref="daynumChild"></daynum></li>
					</ul>
				</div>
				<div style="width:20%" class="comm-padd">
					<demand ref='demandChild'></demand>
				</div>
			
					
		</div>
	</div>
	
</template>

<script>
	import util from "../../../../common/js/tool.js"
	import { mapGetters, mapState,mapMutations,mapActions} from 'vuex'
	import occupancy from "./occupancy.vue"//出租绿
	// import occupancy from "./rentes/occupancy.vue"
import custom from "./custom.vue"//进驻客户
	import demand from "./demand.vue"
	import income from "./income.vue"//租金收入
	import house from "./house.vue"//出租率分析
	import attract from "./attract.vue"//招商需求
	import vacancy from "./vacancy.vue"//空置面积占比分析
	import daynum from "./daynum.vue"//空置天数占比分析
	export default {
		name:"business_analysis",
		components:{
			occupancy,
			demand,
			income,
			house,
			attract,
			vacancy,
			daynum,
			custom	
		
		},
		data(){
			return{
				list:[],
				number:20,
				init:'',
				ifselect:1,
				width:window.screen.width,
				height:window.screen.height,
				version:this.$store.state.version,
				year:this.$store.state.year,
				month:this.$store.state.month
			}
		},
		
		mounted(){
			let path = this.$route.matched[1].path
			if(path.indexOf('/businessAnalysis')==0){
				var id=util.parseUrlData(window.location.href)
				if(id){
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
				this.requestData(this.version,this.year,this.month)
			}
			
			
			
			
		},
		
		methods:{
			requestData(version,year,month){
				var id=util.parseUrlData(window.location.href)	
					if(!id){
						this.getlist(version,year,month)	
						this.move()
						
					}else{
						var communityList=id.hasOwnProperty('communityList')
						if(communityList){
							this.clear()
			
							this.list=JSON.parse(this.$route.query.communityList)
			
							this.setdata(version,this.list[0].communityId,year,month)
							if(this.list.length>0){
								this.move()
							}
						}else{
							this.getlist(version,year,month)	
							this.move()
						}
						
						
					}
				
			},
			move(){
				var classindex=1
				this.init=window.setInterval(()=>{
					classindex++;
					if(classindex==this.list.length+1){
						classindex=1
					}
					this.getclass(classindex)
				},15000)
			},
			clear(){
				window.clearInterval(this.init)
			},
			getId(item,index){
				this.clear()
				this.getclass(index+1)
				var classindex=index+1
				this.init=window.setInterval(()=>{
					classindex++;
					if(classindex==this.list.length+1){
						classindex=1
					}
					this.getclass(classindex)
				},15000)

			},
			getlist(version,year,month){
				this.$api.getYearMonthReport(version,year,month,this.number).then(res=>{
					this.list=res.data;
					this.setdata(this.version,res.data[0].communityId,this.year,this.month)
			})
			},
			// ...mapActions(["increment"]),
			getclass(classindex){
				this.ifselect=classindex;
				this.setdata(this.version,this.list[classindex-1].communityId,this.year,this.month)	
			},
		
			setdata(version,id,year,month){
				this.$refs.occupancyChild.getlist(version,id,year,month)
				this.$refs.incomeChild.getlist(version,id,year)
				this.$refs.houseChild.getlist(version,id,year,month)
				this.$refs.attractChild.getlist(version,id,year,month)
				this.$refs.daynumChild.getlist(version,id,year,month)
				this.$refs.demandChild.getlist(version,id,year,month)
				this.$refs.vacancyChild.getlist(version,id,year,month)
				this.$refs.customChild.getlist(version,id,year)
			}
			
		}
		
	}
</script>

<style scoped>
	.business_analysis{
		width:100%;
		height:100%;
		
	 }
	.title{
		color:#fff;
		/* height:2.3rem; */
	}
	.title ul{
		display:flex ;
		/* margin-top:1% ; */
		justify-content: flex-start;
		position: relative;
		top:-0.9rem;
		
		/* overflow: hidden; */
		
		
	}
/* 	.title li{
		float: left;
	} */
	.title li span{
		line-height: 0.4rem;
		display: inline-block;
		cursor: pointer;
		/* border:2px solid #fff; */
		padding:0 0.1rem;
		margin: 0 0.05rem;
		font-size: 0.18rem;
	}
	.title li span:hover{
		color: #FBD676;
	}

	.yesSelect{
		color:#00d4e0;
		font-weight: 800;
		border-bottom: 0.02rem solid #00d4e0;
	}
	.noSelect{

	}
		

</style>

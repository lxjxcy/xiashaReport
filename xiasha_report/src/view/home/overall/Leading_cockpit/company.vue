<template>
	<div class="company echartall">
			<div class="hradertitle">
				进驻企业
			</div>
			<table>
				<tr>
					<th ><span>企业名称</span></th>
					<th ><span>住进项目</span></th>
					<th ><span>面积</span></th>
				</tr>
			</table>
			<vue-seamless-scroll :data="list" class="seamless-warp">
				<table class="item">
					<tr v-for="item in list">
						<td class="companyName" v-text="item.companyName"></td>
						<td class="communityName" v-text="item.communityName"></td>
						<td class="area" v-text="item.areas">㎡</td>						
					</tr>
					
				</table>
			</vue-seamless-scroll>
				
			
		</div>
			
	
</template>

<script>

	export default {
		name:"company",
		data() {
	    return {
	        animate:true,
			number:26,
	        list:[]
	    }

	  },
	created(){
		// this.getList()
//        setInterval(this.scroll,1000)
	},
  methods: {
	//获取企业数据
	getList(version,year,month){
		var params={}
		this.$api.getYearMonthReport(version,year,month,this.number).then(res=>{
			if(res.data.length==0){
				return
			}
			this.list=res.data;
			res.data.forEach((e,i,a)=>{
				a[i]['areas']=e.area+"㎡"
				// a['areas'][i]=				
			})
			
			
		})
	},
	//滚动
       scroll(){
        let con1 = this.$refs.rollul;
        con1[0].style.marginTop='30px';
        this.animate=!this.animate;
        var that = this; // 在异步函数中会出现this的偏移问题，此处一定要先保存好this的指向
        setTimeout(function(){
            that.list.push(that.list[0]);
            that.list.shift();
            con1[0].style.marginTop='0px';
            that.animate=!that.animate;  // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了
        },0)
  }
}

	}
</script>

<style scoped>
	.company{
		width:100%;
		height:100%;
	}

	 .seamless-warp {
        height: 75%;
        overflow: hidden;
		line-height: 0.2rem;
    }
	table{
		width:100%;
	}

	 table tr th span{
		/* padding:0 6%; */
		text-align: center;
		line-height: 0.24rem;
		border-radius: 5%;
		display: inline-block;
		color:#00FFFF;
		/* background: ; */
		
	}
	


</style>

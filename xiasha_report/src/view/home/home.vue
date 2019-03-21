<template>
	<!-- :style ="note" -->
  <!-- <div id="home" class="img1 note" > -->
	<!-- <header>
		  <headercomp></headercomp>		 
	  </header> -->
	  <main>
		 <router-view/>
	  </main>  
  <!-- </div> -->
</template>
<script>
	
export default {
  name: 'home',
	data() {
		return {
			note: {
				backgroundImage: "url(" + require("../../assets/back2.jpg") + ") ",
				backgroundPosition: "center center",
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
				// backgroundColor:"#fff"
			},
		}
	}

	
}
</script>

<style scoped>
	main{
		/* height:100%; */
/* 		display: flex;
		flex-direction:column;	 */
		/* height:700px; */
		/* width:4510px; */
		height:100%;
		width:100%;
		background: #000036;
		overflow-y:hidden
	}
	/* header{
		height:50px;
	}
	main{
		flex: 1;
		width:100%; */
	
		/* background: #42B983; */
	/* } */
</style>



export default {
		 getMonth:function (){
			 var firstdate = new Date(new Date().getFullYear(), new Date().getMonth()-1, 1);
			 	var date=new Date(firstdate);
			 	var month=date.getMonth()+1				
			 	// return year;
// 				var now=new Date()
// 				var month=now.getMonth()+1					
				return month;
		},
		getYear:function (){
			var firstdate = new Date(new Date().getFullYear(), new Date().getMonth()-1, 1);
				var date=new Date(firstdate);
				var year=date.getFullYear()					
				return year;
		},
		getnowYear:function (){
			
				var date=new Date();
				var year=date.getFullYear()					
				return year;
		}
};

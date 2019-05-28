var app = angular.module('myApp', []);


app.controller("MainController",['$scope',function($scope){

   $scope.data = [{ lungime:"1",
					latime:"1",
					profilareL1:"1",
					profilareL2:"1",
					profilareLstg:"1",
					profilareLdr:"1",
					picuratorL1:"1",
					picuratorL2:"1",
					picuratorLstg:"1",
					picuratorLdr:"1",
					nrBuc:"1",},
	              {lungime:"2",
					latime:"2",
					profilareL1:"2",
					profilareL2:"2",
					profilareLstg:"2",
					profilareLdr:"2",
					picuratorL1:"2",
					picuratorL2:"2",
					picuratorLstg:"2",
					picuratorLdr:"2",
					nrBuc:"2",                
	              } ];


	$scope.invoice = angular.copy( $scope.data);
	 $scope.enabledEdit =[];

    $scope.addInvoice = function(){
	    var inv ={ 	lungime:"",
					latime:"",
					profilareL1:"",
					profilareL2:"",
					profilareLstg:"",
					profilareLdr:"",
					picuratorL1:"",
					picuratorL2:"",
					picuratorLstg:"",
					picuratorLdr:"",
					nrBuc:"",
					disableEdit:false};
		$scope.invoice.push(inv);
		 $scope.enabledEdit[$scope.invoice.length-1]=true;
	}
	
	
	$scope.editInvoice = function(index){
		console.log("edit index"+index);
		$scope.enabledEdit[index] = true;
	}
	$scope.deleteInvoice = function(index) {
		  $scope.invoice.splice(index,1);
	}
	
	$scope.submitInvoice = function(){

		console.log("form submitted:"+angular.toJson($scope.invoice ));
	}
	
}]);

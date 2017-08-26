angular.module("mainController", [])

    .controller("mainCtrl", function ($scope) {

        /******************** Data Array**********/

        $scope.dataArr = [{
                fname: "John",
                lname: "carter",
                email: "johncarter@mail.com"
            },
            {
                fname: "Peter",
                lname: "Parker",
                email: "peterparker@mail.com"
            },
            {
                fname: "John",
                lname: "Rambo",
                email: "johnrambo@mail.com"
            }];


        /******************** Default Show/hide **********/
        $scope.hideEditForm = true;
        $scope.hideAddDataForm = true;
        $scope.hideMinusButton = true;
        $scope.hideDataTable = false;
        $scope.hidePlusButton = false;
        $scope.hideMinus = true;


        /******************** Show/hide functions **********/

        $scope.addNewData = function () {
            $scope.hideDataTable = true;
            $scope.hideMinusButton = false;
            $scope.hidePlusButton = true;
            $scope.hideAddDataForm = false;


        }


        $scope.hideNewData = function () {
            $scope.hideDataTable = false;
            $scope.hideMinusButton = true;
            $scope.hidePlusButton = false;
            $scope.hideAddDataForm = true;

        }

        $scope.hide = function () {
            $scope.hideEditForm = true;
            $scope.hideDataTable = false;
            $scope.hidePlusButton = false;
            $scope.hideMinus = true;

        }




        /******************** Add Data**********/
        $scope.submitNewData = function (user) {
            console.log("submitted");
            $scope.dataArr.push({
                fname: user.firstName,
                lname: user.lastName,
                email: user.email
            });


            $scope.hideDataTable = false;
            $scope.hideMinusButton = true;
            $scope.hidePlusButton = false;
            $scope.hideAddDataForm = true;
        }




        /******************** Remove Data**********/
        $scope.removeData = function (data) {

            var removeData = $scope.dataArr.indexOf(data);
            console.log(removeData);
            $scope.dataArr.splice(removeData, 1);
        }





        /******************** Edit Form **********/

        $scope.editDataForm = function(data) {
            var editUser={};
            $scope.hideEditForm = false;
            $scope.hideMinus = false;
            $scope.hidePlusButton = true;
            $scope.hideDataTable = true;
            
            $scope.editfirstname = data.fname;
            $scope.editlastname = data.lname;
            $scope.editemail = data.email;
            
            
           
            
            

        }

    $scope.doneEdit = function (data) {
     
           
    }


    });
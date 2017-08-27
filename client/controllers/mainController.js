angular.module("mainController", [])

    .controller("mainCtrl", function ($scope) {

        /******************** Data Array**********/
        $scope.newDataObj = {};
        $scope.dataArr = [{
                uid: "1",
                fname: "John",
                lname: "carter",
                email: "johncarter@mail.com"
            },
            {
                uid: "2",
                fname: "Peter",
                lname: "Parker",
                email: "peterparker@mail.com"
            },
            {
                uid: "3",
                fname: "John",
                lname: "Rambo",
                email: "johnrambo@mail.com"
            }];


        /******************** Default Show/hide **********/
        $scope.defaultShowHide = function () {
            $scope.hideEditForm = true;
            $scope.hideAddDataForm = true;
            $scope.hideMinusButton = true;
            $scope.hideDataTable = false;
            $scope.hidePlusButton = false;
            $scope.hideMinus = true;

        }

        $scope.defaultShowHide();

        $scope.hide = function () {
            $scope.defaultShowHide();
            $scope.hideAddButton = false;
        }

        /******************** Show/hide functions **********/

        $scope.addNewData = function () {
            $scope.hideAddButton = true;
            $scope.hideMinusButton = false;
            $scope.hideDataTable = true;
            $scope.hideAddDataForm = false;
        }

        $scope.hideNewData = function () {
            $scope.hideAddButton = false;
            $scope.hideMinusButton = true;
            $scope.hideDataTable = false;
            $scope.hideAddDataForm = true;
        }


        /******************** Add new Data **********/

        $scope.submitNewData = function (newData) {

            $scope.dataArr.push({
                fname: newData.firstName,
                lname: newData.lastName,
                email: newData.email

            });

            newData.firstName = "";
            newData.lastName = "";
            newData.email = "";
            $scope.hideNewData();
        }


        /******************** Recomve Data **********/
        $scope.removeData = function (data) {
            var removeData = $scope.dataArr.indexOf(data);
            console.log(removeData);
            $scope.dataArr.splice(removeData, 1);

        }


        /******************** Edit Data **********/

        $scope.editDataForm = function (data) {
            $scope.hideEditForm = false;
            $scope.hideDataTable = true;
            $scope.hideAddButton = true;
            $scope.hideMinus = false;

            $scope.editData = $scope.dataArr.indexOf(data);

            $scope.firstname = $scope.dataArr[$scope.editData].fname;

            $scope.lastname = $scope.dataArr[$scope.editData].lname;


        }


        $scope.doneEdit = function (edit) {

            $scope.dataArr[$scope.editData].fname = edit.editfirstname;
            $scope.dataArr[$scope.editData].lname = edit.editlastname;
            $scope.dataArr[$scope.editData].email = edit.editemail;
            $scope.defaultShowHide();
            $scope.hideAddButton = false;

            edit.editfirstname = "";
            edit.editlastname = "";
            edit.editemail = "";
        }
    });
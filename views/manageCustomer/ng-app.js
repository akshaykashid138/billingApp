var app = angular.module("manageCustomerApp", ['ngMessages', 'ui.bootstrap', 'ui.bootstrap.modal', 'smart-table']);

app.controller("manageCustomerAppCtrlr", ["$scope", "$uibModal", "$http", function ($scope, $uibModal, $http) {
    //Method To Initialize Controller
    $scope.initController = function () {
        $scope.getCustomerList();
    };

    //Method To Get All Customers List
    $scope.getCustomerList = function () {
        $http.get('/manageCustomer/getCustomerList').then(function (res) {
            if (res.status === 500)
                alertify.error("Something Went Wrong While Getting Customer List");
            else {
                $scope.customerList = res.data;
            }
        })
    };


    //Method To Open Model
    $scope.openModal = function (mode, data, index) {
        console.log(mode, data, index);
        let modalData = {};
        if (mode === 'edit') {
            modalData = angular.copy(data);
            modalData.index = index;
        }
        modalData.mode = mode;

        $scope.modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'modal.html',
            controller: 'manageCustomerDetails',
            scope: $scope,
            backdrop: false,
            size: 'lg',
            windowClass: 'show',
            resolve: {
                record: function () {
                    return modalData;
                }
            }
        });
    };

    //Method To Delete Customer
    $scope.deleteCustomer = function (customerId, customerName, index) {
        alertify.confirm("Delete Customer : " + customerName, function () {
            $http.get(`/manageCustomer/deleteCustomer?CustomerID=${customerId}`).then(function (res) {
                if (res.status === 500)
                    alertify.error("Somthing Went Wrong While Deleting Customer");
                else {
                    alertify.success("Customer Deleted Successfully");
                    $scope.customerList.splice(index, 1);
                }
            })
        })
    };
}]);

//Controller For Managing Customers Data
app.controller('manageCustomerDetails', ["$scope", "$http", "record", function ($scope, $http, record) {
    let index;
    var init = function () {
        console.log("initialized")
        $scope.customer = {};
        $scope.customer = record;
        index = record.index;
    };

    init();

    //Method To Add New Customer
    $scope.addNewCustomer = function () {
        $http.post('/manageCustomer/addNewCustomer', $scope.customer).then(function (res) {
            if (res.status === 500)
                alertify.error("Something Went Wrong While Adding New Customer");
            else if (res.status === 201) {
                alertify.success("Customer Added Successfully");
                $scope.customerList.push(res.data)
                $scope.close();
            }
        })
    };

    //Method To Edit Customer Data
    $scope.editCustomer = function () {
        $http.post('/manageCustomer/editCustomer', $scope.customer).then(function (res) {
            if (res.status === 500)
                alertify.error("Something Went Wrong While Updating Customer Details");
            else if (res.status === 201) {
                alertify.success("Customer Updated Successfully");
                $scope.getCustomerList();
                $scope.close()
            }
        })
    };

    //Method To Close
    $scope.close = function () {
        $scope.modalInstance.close();
    }
}]);
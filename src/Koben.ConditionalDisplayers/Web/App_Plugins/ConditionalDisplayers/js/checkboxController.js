﻿angular.module("umbraco").controller("koben.CdCheckboxController", cdCheckboxController)


function cdCheckboxController($scope) {

    //the properties with alias in 'show' and 'hide' will be affected when the value is triggered.
    function displayProps(show, hide) {
        //Elements to show
        var showEls = show.split(',');
        var s = "";
        for (var i = 0; i < showEls.length; i++) {
            if (s !== "") {
                s += ",";
            }
            s += "div[data-element='property-" + showEls[i] + "']";
        }
        $(s).show("slow");

        //Elements to hide
        var hideEls = hide.split(',');
        var h = "";
        for (var i = 0; i < hideEls.length; i++) {
            if (h !== "") {
                h += ",";
            }
            h += "div[data-element='property-" + hideEls[i] + "']";
        }

        $(h).hide("slow");
    }
 

    function setupViewModel() {
        $scope.renderModel = {
            value: false
        };

        if ($scope.model.config && $scope.model.config.default && $scope.model.config.default.toString() === "1" && $scope.model && !$scope.model.value) {
            $scope.renderModel.value = true;
        }

        if ($scope.model && $scope.model.value && ($scope.model.value.toString() === "1" || angular.lowercase($scope.model.value) === "true")) {
            $scope.renderModel.value = true;
        }

        //init visible fields
        if ($scope.renderModel.value) {
            displayProps($scope.model.config.showIfChecked, $scope.model.config.showIfUnchecked);
        } else {
            displayProps($scope.model.config.showIfUnchecked, $scope.model.config.showIfChecked);
        }
    }

    setupViewModel();

    $scope.$watch("renderModel.value", function (newVal) {
        $scope.model.value = newVal === true ? "1" : "0";

        if (newVal) {
            displayProps($scope.model.config.showIfChecked, $scope.model.config.showIfUnchecked);
        } else {
            displayProps($scope.model.config.showIfUnchecked, $scope.model.config.showIfChecked);
        }
    });

    //here we declare a special method which will be called whenever the value has changed from the server
    //this is instead of doing a watch on the model.value = faster
    $scope.model.onValueChanged = function (newVal, oldVal) {
        //update the display val again if it has changed from the server
        setupViewModel();
    };


};
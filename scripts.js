let app = angular.module('investec', []);

app.controller('myCtrl', function ($scope, $http) {
        $scope.integers = [3, 15, 30];

        $scope.addresses = [];
        $scope.addressTypes = [];

        $http.get('addresses.json').then((response) => {
            $scope.addresses = response.data;
            $scope.addressTypes = $scope.AddressType('physical');
            $scope.validateAddress();
        });

        $scope.compare_numbers = function (x, y) {
            if (isNaN(x) || isNaN(y)) return false;
            x = Math.abs(x);
            y = Math.abs(y);
            while (y) {
                let t = y;
                y = x % y;
                x = t;
            }
            return x;
        };

        $scope.highestCommonFactor = function () {
            if (!Array.isArray($scope.integers)) return false;
            if (!$scope.integers.length) return null;

            let a, b;
            a = $scope.integers[0];
            for (let i = 1; i < $scope.integers.length; i++) {
                b = $scope.integers[i];
                a = $scope.compare_numbers(a, b);
            }
            return a;
        };

        $scope.prettyPrintAddress = function (addresses) {
            for (let i = 0; i < addresses.length; i++) {
                if (addresses[i] && addresses[i].type && addresses[i].addressLineDetail && addresses[i].provinceOrState && addresses[i].country)
                    return `${addresses[i].type.name}: ${addresses[i].addressLineDetail.line1} ${addresses[i].addressLineDetail.line2} - ${addresses[i].cityOrTown} - ${addresses[i].provinceOrState.name} - ${addresses[i].postalCode} - ${addresses[i].country.name}`;
            }
        };

        $scope.prettyPrintAll = function (address) {
            let string = '';
            if (angular.isDefined(address.addressLineDetail) && address.addressLineDetail.line1 !== "") string = string + `${address.addressLineDetail.line1}`;
            if (angular.isDefined(address.addressLineDetail) && address.addressLineDetail.line2 !== "") string = string + ` - ${address.addressLineDetail.line2}`;
            if (angular.isDefined(address.cityOrTown)) string = string + ` - ${address.cityOrTown}`;
            if (angular.isDefined(address.provinceOrState)) string = string + ` - ${address.provinceOrState.name}`;
            if (angular.isDefined(address.postalCode)) string = string + ` - ${address.postalCode}`;
            if (angular.isDefined(address.country.name)) string = string + ` - ${address.country.name}`;

            return string;
        };

        $scope.AddressType = function (type) {
            return $scope.addresses.filter((item) => {
                const name = item.type.name.toLowerCase();
                return name.indexOf(type.toLowerCase()) > -1;
            });
        };

        $scope.isNumericPostalCode = function (code) {
            for (let i = 0; i < code.length; i++) {
                let code = code.charCodeAt(i);
                if (!(code > 47 && code < 58) && // numeric (0-9)
                    !(code > 64 && code < 91) && // upper alpha (A-Z)
                    !(code > 96 && code < 123)) { // lower alpha (a-z)
                    return;
                }
            }
        };

        $scope.validateAddress = function (address) {
            let errors = [];

            if (angular.isDefined(address.postalCode) && isNaN(parseInt(address.postalCode))) {
                errors.push("Postal code is not a number");
            }

            if (!angular.isDefined(address.country)) {
                errors.push("Country is missing");
            }

            if (!angular.isDefined(address.addressLineDetail) || (address.addressLineDetail.line1 === '' && address.addressLineDetail.line2 === '')) {
                errors.push("At least one line address should be provided");
            }

            if (address.country) {
                if (address.country.code === 'ZA' && !address.provinceOrState) {
                    errors.push("Province is required for ZA countries");
                }
            }

            return {
                valid: errors.length > 0 ? false : true,
                message: errors
            };
        };
    }
);

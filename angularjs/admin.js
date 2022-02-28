const app = angular.module("myApp", []);
app.controller("studentController", ($scope, $http) => {
  const api =
    "https://621394e389fad53b1ff9c97c.mockapi.io/api/sinhvien/sinhvien";
  $http.get(api).then((res) => {
    console.log(res.data);
    $scope.students = res.data;
  });
});

app.controller("updateController", ($scope, $http) => {
  $scope.updateStudent = function (id) {
    const api =
      "https://621394e389fad53b1ff9c97c.mockapi.io/api/sinhvien/sinhvien";
    const newFullname = $scope.fullname;
    const newGender = $scope.updateBoy || $scope.updateGirl;
    const newBirthday = $scope.updateBirthday;
    const newFee = $scope.updateFee;
    const newMarks = $scope.updateMarks;
    fetch(api + "/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullname: newFullname,
        gender: newGender,
        birthday: newBirthday,
        fee: newFee,
        marks: newMarks,
        role: "sv",
      }),
    })
      .then((res) => {
        return res;
      })
      .then((data) => {
        window.location.reload();
      });
  };
});

app.controller("deleteController", ($scope, $http) => {
  $scope.deleteStudent = function (id) {
    const api =
      "https://621394e389fad53b1ff9c97c.mockapi.io/api/sinhvien/sinhvien";
    fetch(api + "/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res;
      })
      .then((data) => {
        window.location.reload();
      });
  };
});

app.controller("createController", ($scope, $http) => {
  $scope.createStudent = () => {
    const fullname = $scope.newFullname;
    const username = $scope.newUsername;
    const password = $scope.newPassword;
    const gender = $scope.newBoy || $scope.newGirl;
    const birthday = $scope.newBirthday;
    const fee = $scope.newFee;
    const marks = $scope.newMarks;
    const api =
      "https://621394e389fad53b1ff9c97c.mockapi.io/api/sinhvien/sinhvien";
    fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullname: fullname,
        username: username,
        password: password,
        gender: gender,
        birthday: birthday,
        fee: fee,
        marks: marks,
        role: "sv",
      }),
    })
      .then((res) => {
        return res;
      })
      .then((data) => window.location.reload());
  };
});

app.controller("appController", ($scope, $http, $filter) => {
  const api =
    "https://621394e389fad53b1ff9c97c.mockapi.io/api/sinhvien/sinhvien";

  $scope.sortByMarksAsc = function () {
    $scope.sortProp = "+marks";
  };

  $scope.sortByMarksDesc = function () {
    $scope.sortProp = "-marks";
  };

  $scope.sortByFeeAsc = function () {
    $scope.sortProp = "+fee";
  };

  $scope.sortByFeeDesc = function () {
    $scope.sortProp = "-fee";
  };
});

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

    console.log(api + "/" + id);

    $http
      .put(
        api + "/" + id,
        JSON.stringify({
          fullname: newFullname,
          gender: newGender,
          birthday: newBirthday,
          fee: newFee,
        })
      )
      .then((res) => {
        window.location.reload();
      });
  };
});

app.controller("deleteController", ($scope, $http) => {
  $scope.deleteStudent = function (id) {
    const api =
      "https://621394e389fad53b1ff9c97c.mockapi.io/api/sinhvien/sinhvien";
    $http.delete(api + "/" + id).then((res) => {
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
    const api =
      "https://621394e389fad53b1ff9c97c.mockapi.io/api/sinhvien/sinhvien";

    $http
      .post(
        api,
        JSON.stringify({
          fullname: fullname,
          username: username,
          password: password,
          gender: gender,
          birthday: birthday,
          fee: fee,
          role: "sv",
          marks: 0,
        })
      )
      .then((data) => {
        window.location.reload();
      });
  };
});

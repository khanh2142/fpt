app.controller("resultController", function ($scope, $http) {
  let scoreObj = JSON.parse(localStorage.getItem("score"));
  let sub_name = JSON.parse(localStorage.getItem("sub_name")).sub_name;
  $scope.subject = sub_name;
  $scope.score = scoreObj.score;

  const userApi =
    "https://621394e389fad53b1ff9c97c.mockapi.io/api/sinhvien/sinhvien/";
  const userId = JSON.parse(localStorage.getItem("currentUser")).id;

  $http.get(userApi + userId).then((res) => {
    localStorage.setItem("currentUser", JSON.stringify(res.data));
  });
});

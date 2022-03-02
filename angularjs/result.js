app.controller("resultController", function ($scope, $http) {
  let time = JSON.parse(localStorage.getItem("time"));
  let scoreObj = JSON.parse(localStorage.getItem("score"));
  let sub_name = JSON.parse(localStorage.getItem("sub_name")).sub_name;
  $scope.subject = sub_name;
  $scope.score = scoreObj.score;
  $scope.time = 14 - time.minute + " : " + (60 - time.second);

  const userApi =
    "https://621394e389fad53b1ff9c97c.mockapi.io/api/sinhvien/sinhvien/";
  const userId = JSON.parse(localStorage.getItem("currentUser")).id;

  $http.get(userApi + userId).then((res) => {
    localStorage.setItem("currentUser", JSON.stringify(res.data));
  });
});

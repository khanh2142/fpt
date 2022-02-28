const app = angular.module("myApp", []);

const signUp = ($scope, $http) => {
  $scope.signup = () => {
    const api =
      "https://621394e389fad53b1ff9c97c.mockapi.io/api/sinhvien/sinhvien";

    const username = $scope.username;

    const password = $scope.password;

    const passwordRepeat = $scope.passwordRepeat;

    const fullname = $scope.fullname;

    const email = $scope.email;

    const gender = $scope.boy || $scope.girl;

    const birthday = $scope.birthday;

    const fee = $scope.fee;

    const marks = $scope.marks;

    console.log(birthday);

    fetch(api)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let check = true;
        data.forEach((item) => {
          if (item.username === username) {
            check = false;
          } else {
            check = true;
          }
        });
        if (check !== true) {
          alert("Tài khoản đã tồn tại ...");
        } else {
          fetch(api, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: username,
              password: password,
              fullname: fullname,
              email: email,
              gender: gender,
              birthday: birthday,
              fee: fee,
              marks: marks,
            }),
          })
            .then((res) => {
              return res;
            })
            .then(() => {
              localStorage.removeItem("currentUser");
              localStorage.setItem(
                "currentUser",
                JSON.stringify({
                  username: username,
                  password: password,
                  fullname: fullname,
                  email: email,
                  gender: gender,
                  birthday: birthday,
                  fee: fee,
                  marks: marks,
                  role: "sv",
                })
              );
              window.location.replace("trang-chu.html");
            });
        }
      });
  };
};
app.controller("signUpForm", signUp);

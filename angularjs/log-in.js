const app = angular.module("myApp", []);

const loginForm = ($scope) => {
  $scope.login = () => {
    const api =
      "https://621394e389fad53b1ff9c97c.mockapi.io/api/sinhvien/sinhvien";
    fetch(api)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let check = 0;
        let user;
        const username = $scope.username;
        const password = $scope.password;
        data.forEach((item) => {
          if (username === item.username) {
            if (password === item.password) {
              check++;
              user = item;
            }
          }
        });

        if (check != 0) {
          console.log(user);
          localStorage.removeItem("currentUser");
          localStorage.setItem("currentUser", JSON.stringify(user));
          window.location.replace("trang-chu.html");
        } else {
          if (user.role === "sv" || user.role === "admin") {
          } else {
            alert("Tên đăng nhập hoặc mật khẩu không chính xác ...");
          }
        }
      });
    const adminApi =
      "https://621394e389fad53b1ff9c97c.mockapi.io/api/sinhvien/admin";
    fetch(adminApi)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let check = 0;
        let user;
        const username = $scope.username;
        const password = $scope.password;
        data.forEach((item) => {
          if (username === item.username) {
            if (password === item.password) {
              check++;
              user = item;
            }
          }
        });

        console.log(check);

        if (check > 0) {
          console.log(user);
          localStorage.removeItem("currentUser");
          localStorage.setItem("currentUser", JSON.stringify(user));
          window.location.replace("trang-chu.html");
        } else {
          if (user.role === "sv" || user.role === "admin") {
          } else {
            alert("Tên đăng nhập hoặc mật khẩu không chính xác ...");
          }
        }
      });
  };
};
app.controller("loginForm", loginForm);

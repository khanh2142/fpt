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
        $scope.check = 0;
        $scope.user = {};
        const username = $scope.username;
        const password = $scope.password;
        data.forEach((item) => {
          if (username === item.username) {
            if (password === item.password) {
              $scope.check++;
              $scope.user = item;
            }
          }
        });

        if ($scope.check != 0) {
          localStorage.removeItem("currentUser");
          localStorage.setItem("currentUser", JSON.stringify($scope.user));
          window.location.replace("trang-chu.html");
        } else {
          if ($scope.user.role === "sv") {
          } else {
            const adminApi =
              "https://621394e389fad53b1ff9c97c.mockapi.io/api/sinhvien/admin";
            fetch(adminApi)
              .then((res) => {
                return res.json();
              })
              .then((data) => {
                $scope.check = 0;
                $scope.user = {};
                const username = $scope.username;
                const password = $scope.password;
                data.forEach((item) => {
                  if (username === item.username) {
                    if (password === item.password) {
                      $scope.check++;
                      $scope.user = item;
                    }
                  }
                });

                if ($scope.check != 0) {
                  localStorage.removeItem("currentUser");
                  localStorage.setItem(
                    "currentUser",
                    JSON.stringify($scope.user)
                  );
                  window.location.replace("trang-chu.html");
                } else {
                  if ($scope.user.role === "admin") {
                  } else {
                    alert("Tên đăng nhập hoặc mật khẩu không chính xác ...");
                  }
                }
              });
          }
        }
      });
  };
};
app.controller("loginForm", loginForm);

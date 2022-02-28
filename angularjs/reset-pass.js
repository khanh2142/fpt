const app = angular.module("myApp", []);

const resetPassword = ($scope, $http) => {
  const box = document.querySelectorAll(".res-col");

  const api =
    "https://621394e389fad53b1ff9c97c.mockapi.io/api/sinhvien/sinhvien";

  let id;
  let currentPass;

  $scope.checkUsername = () => {
    fetch(api)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const username = $scope.username;

        console.log(username);

        let check = 0;
        data.forEach((item) => {
          console.log(item.username);
          if (item.username === username) {
            check++;
            id = item.id;
          }
        });

        if (check != 0) {
          box[0].classList.add("d-none");
          box[1].classList.remove("d-none");
        } else {
          alert("Tài khoản không chính xác...");
        }
      });
  };

  $scope.checkUserpass = () => {
    fetch(api)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const password = $scope.password;
        currentPass = password;

        let check = 0;
        data.forEach((item) => {
          if (item.password === password) {
            check++;
          }
        });

        if (check != 0) {
          box[1].classList.add("d-none");
          box[2].classList.remove("d-none");
        } else {
          alert("Mật khẩu không chính xác...");
        }
      });
  };

  $scope.checkUserNewPass = () => {
    const newPass = $scope.newPassword;
    const newRepeatPass = $scope.newRepeatPassword;
    if (newPass === newRepeatPass && newPass !== currentPass) {
      fetch(api + "/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: newPass }),
      })
        .then((res) => {
          return res;
        })
        .then((data) => {
          localStorage.removeItem("currentUser");
          window.location.replace("dang-nhap.html");
        });
    } else {
      if (newPass === currentPass) {
        alert("Vui lòng không nhập mật khẩu cũ ...");
      } else {
        alert("Mật khẩu không trùng khớp ...");
      }
    }
  };
};

app.controller("resetPassword", resetPassword);

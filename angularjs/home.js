const app = angular.module("myApp", ["ngRoute"]);

const logout = function ($scope) {
  $scope.logout = function () {
    localStorage.removeItem("currentUser");
    window.location.replace("trang-chu.html");
  };
};

app.controller("appController", ($scope, $http) => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (user === null) {
    $scope.userset = false;
    $scope.userprof = false;
    $scope.showBtn = true;
    $scope.fullname = "";
    $scope.score = "";
  } else {
    $scope.showBtn = false;
    $scope.userprof = true;
    $scope.userset = true;
    $scope.fullname = JSON.parse(localStorage.getItem("currentUser")).fullname;
    $scope.score =
      "Điểm : " + JSON.parse(localStorage.getItem("currentUser")).marks;
  }

  $scope.take_id = (sub_id) => {
    console.log(sub_id);
    $scope.sub_id = sub_id;
  };
});

app.controller("admin", ($scope) => {
  $scope.adminPage = () => {
    const item = JSON.parse(localStorage.getItem("currentUser"));
    if (item === null) {
      alert("Vui lòng đăng nhập bằng tài khoản admin !");
    } else {
      if (item.role === "sv") {
        alert("Sinh viên không thể thực hiện thao tác này !");
      } else {
        if (item.role === "admin") {
          window.location.replace("admin.html");
        }
      }
    }
  };
});

app.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "views/trang-chu.html",
    })
    .when("/gioi-thieu", {
      templateUrl: "views/gioi-thieu.html",
    })
    .when("/gop-y", {
      templateUrl: "views/gop-y.html",
    })
    .when("/hoi-dap", {
      templateUrl: "views/hoi-dap.html",
    })
    .when("/thi", {
      templateUrl: "views/thi.html",
    })
    .when("/ADAV", {
      templateUrl: "views/trang-thi.html",
      controller: "testController",
    })
    .when("/ADBS", {
      templateUrl: "views/trang-thi.html",
      controller: "testController",
    })
    .when("/ADTE", {
      templateUrl: "views/trang-thi.html",
      controller: "testController",
    })
    .when("/ADUI", {
      templateUrl: "views/trang-thi.html",
      controller: "testController",
    })
    .when("/ASNE", {
      templateUrl: "views/trang-thi.html",
      controller: "testController",
    })
    .when("/CLCO", {
      templateUrl: "views/trang-thi.html",
      controller: "testController",
    })
    .when("/DBAV", {
      templateUrl: "views/trang-thi.html",
      controller: "testController",
    })
    .when("/GAME", {
      templateUrl: "views/trang-thi.html",
      controller: "testController",
    })
    .when("/HTCS", {
      templateUrl: "views/trang-thi.html",
      controller: "testController",
    })
    .when("/INMA", {
      templateUrl: "views/trang-thi.html",
      controller: "testController",
    })
    .when("/JABS", {
      templateUrl: "views/trang-thi.html",
      controller: "testController",
    })
    .when("/JAAV", {
      templateUrl: "views/trang-thi.html",
      controller: "testController",
    })
    .when("/JSPR", {
      templateUrl: "views/trang-thi.html",
      controller: "testController",
    })
    .when("/LAYO", {
      templateUrl: "views/trang-thi.html",
      controller: "testController",
    })
    .when("/MOWE", {
      templateUrl: "views/trang-thi.html",
      controller: "testController",
    })
    .when("/PHPP", {
      templateUrl: "views/trang-thi.html",
      controller: "testController",
    })
    .when("/PMAG", {
      templateUrl: "views/trang-thi.html",
      controller: "testController",
    })
    .when("/VBPR", {
      templateUrl: "views/trang-thi.html",
      controller: "testController",
    })
    .when("/WEBU", {
      templateUrl: "views/trang-thi.html",
      controller: "testController",
    })
    .when("/DBBS", {
      templateUrl: "views/trang-thi.html",
      controller: "testController",
    })
    .when("/ket-qua", {
      templateUrl: "views/ket-qua.html",
      controller: "resultController",
    });
});

app.controller("login", logout);

app.controller("subjectController", ($scope, $http) => {
  const api = "https://621394e389fad53b1ff9c97c.mockapi.io/api/sinhvien/monhoc";
  $http.get(api).then((res) => {
    $scope.subjects = res.data;
  });
});

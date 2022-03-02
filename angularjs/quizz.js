app.controller("quizzController", function ($scope, $http) {
  const api = "https://621394e389fad53b1ff9c97c.mockapi.io/api/sinhvien/monhoc";
  $http.get(api).then((res) => {
    $scope.quizzs = res.data;
  });

  $scope.takeId = (sub_id, sub_name) => {
    localStorage.setItem("sub_id", JSON.stringify({ sub_id: sub_id }));
    localStorage.setItem("sub_name", JSON.stringify({ sub_name: sub_name }));
  };
});

app.controller("testController", function ($scope, $http, $timeout, $interval) {
  $scope.minute = 14;
  $scope.second = 60;

  timecal = $interval(function () {
    if ($scope.minute >= 0) {
      if ($scope.second > 0) {
        $scope.second -= 1;
      } else {
        if ($scope.minute == 0) {
          $scope.time = "Hết giờ !";
        } else {
          $scope.second = 60;
          $scope.minute -= 1;
        }
      }
      $scope.time = $scope.minute + ":" + $scope.second;
    }
  }, 1000);

  const currentSubId = JSON.parse(localStorage.getItem("sub_id"));

  localStorage.setItem("score", JSON.stringify({ score: 0, index: 0 }));

  $scope.score = 0;
  $scope.currentQuizz = 0;

  const api = "./my_db/" + currentSubId.sub_id + ".json";

  $http.get(api).then((res) => {
    $scope.question = res.data[$scope.currentQuizz];
  });

  // Check result

  $scope.check = function (id) {
    console.log(id, $scope.question.AnswerId);

    let scoreObj = JSON.parse(localStorage.getItem("score"));

    if (id == $scope.question.AnswerId) {
      let currentScore = scoreObj.score + 1;
      localStorage.setItem(
        "score",
        JSON.stringify({ score: currentScore, index: scoreObj.index + 1 })
      );
    } else {
      localStorage.setItem(
        "score",
        JSON.stringify({ score: scoreObj.score, index: scoreObj.index + 1 })
      );
    }

    $scope.currentQuizz += 1;

    $http.get(api).then((res) => {
      $scope.questionQuanity = res.data.length;
      $scope.question = res.data[$scope.currentQuizz];
    });

    console.log(JSON.parse(localStorage.getItem("score")));
  };

  // Accept the result

  $scope.submit = function () {
    $http.get(api).then((res) => {
      $scope.questionQuanity = res.data.length;

      let scoreObj = JSON.parse(localStorage.getItem("score"));

      if ($scope.questionQuanity - scoreObj.index > 0) {
        let textAlert =
          "Bạn còn " +
          ($scope.questionQuanity - scoreObj.index) +
          " câu hỏi chưa trả lời ! Bạn có chắc chắn muốn nộp bài ?";

        $scope.alert = textAlert;
      }
    });
  };

  $scope.agree = function () {
    const userApi =
      "https://621394e389fad53b1ff9c97c.mockapi.io/api/sinhvien/sinhvien/";
    const userId = JSON.parse(localStorage.getItem("currentUser")).id;
    const currentScore = JSON.parse(localStorage.getItem("currentUser")).marks;

    const score = JSON.parse(localStorage.getItem("score")).score;

    console.log(currentScore, score);

    $http
      .put(userApi + userId, JSON.stringify({ marks: currentScore + score }))
      .then();

    $http.get(userApi + userId).then((res) => {
      console.log(res.data);
      localStorage.setItem("currentUser", JSON.stringify(res.data));
    });

    localStorage.setItem(
      "time",
      JSON.stringify({
        minute: $scope.minute,
        second: $scope.second,
      })
    );

    $timeout(function () {
      window.location.replace("#!ket-qua");
    }, 1000);
  };
});

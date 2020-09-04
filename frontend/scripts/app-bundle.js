define('services/syllabuses',['exports', 'aurelia-framework', 'config/config', 'models/models', 'services/http', 'services/jwt'], function (exports, _aureliaFramework, _config, _models, _http, _jwt) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Syllabuses = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Syllabuses = exports.Syllabuses = (_dec = (0, _aureliaFramework.inject)(_http.Http, _jwt.Jwt), _dec(_class = function () {
    function Syllabuses(httpService, jwtService) {
      _classCallCheck(this, Syllabuses);

      this.jwtService = jwtService;
      this.httpService = httpService;
    }

    Syllabuses.prototype.getSyllabuses = function getSyllabuses(limit, page, coach) {
      var data = '?limit=' + limit + '&page=' + page;
      if (coach !== null) data += '&coach=' + coach;
      return this.httpService.httpClient.fetch(_config.API.endpoints.syllabus + data, {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token
        }
      }).then(this.httpService.checkStatus).then(this.httpService.parseJSON);
    };

    Syllabuses.prototype.getEnrolledSyllabuses = function getEnrolledSyllabuses() {
      return this.httpService.httpClient.fetch(_config.API.endpoints.enrolledSyllabus.replace('{1}', this.jwtService.getUserId()), {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token
        }
      }).then(this.httpService.checkStatus).then(this.httpService.parseJSON);
    };

    Syllabuses.prototype.getSyllabus = function getSyllabus(id) {
      return this.httpService.httpClient.fetch(_config.API.endpoints.syllabus + '/' + id, {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token
        }
      }).then(this.httpService.checkStatus).then(this.httpService.parseJSON);
    };

    Syllabuses.prototype.registerSyllabus = function registerSyllabus(syllabus) {
      if (syllabus.privacy) syllabus.key = undefined;
      return this.httpService.httpClient.fetch(_config.API.endpoints.syllabus, {
        method: 'post',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tittle: syllabus.title,
          description: syllabus.description,
          public: syllabus.privacy,
          key: syllabus.key
        })
      }).then(this.httpService.checkStatus);
    };

    Syllabuses.prototype.editSyllabus = function editSyllabus(syllabus) {
      if (syllabus.privacy) syllabus.key = undefined;
      return this.httpService.httpClient.fetch(_config.API.endpoints.syllabus + '/' + syllabus.id, {
        method: 'put',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tittle: syllabus.title,
          description: syllabus.description,
          public: syllabus.privacy,
          key: syllabus.key
        })
      }).then(this.httpService.checkStatus);
    };

    Syllabuses.prototype.removeSyllabus = function removeSyllabus(id) {
      return this.httpService.httpClient.fetch(_config.API.endpoints.syllabus + '/' + id, {
        method: 'delete',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token,
          'Content-Type': 'application/json'
        }
      }).then(this.httpService.checkStatus);
    };

    Syllabuses.prototype.enrollSyllabus = function enrollSyllabus(id, key) {
      return this.httpService.httpClient.fetch(_config.API.endpoints.syllabus + '/' + id + '/register', {
        method: 'post',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          key: key
        })
      }).then(this.httpService.checkStatus);
    };

    Syllabuses.prototype.createAssignment = function createAssignment(assignment) {
      return this.httpService.httpClient.fetch(_config.API.endpoints.assignments, {
        method: 'post',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tittle: assignment.title,
          description: assignment.description,
          init_date: assignment.startDate,
          end_date: assignment.endDate,
          syllabus_id: assignment.syllabusId,
          problems: assignment.problems
        })
      }).then(this.httpService.checkStatus);
    };

    Syllabuses.prototype.getStatistics = function getStatistics(id, limit, page) {
      return this.httpService.httpClient.fetch(_config.API.endpoints.syllabus + '/' + id + '/' + _config.API.endpoints.ranking + '?limit=' + limit + '&page=' + page, {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token
        }
      }).then(this.httpService.checkStatus).then(this.httpService.parseJSON);
    };

    Syllabuses.prototype.editAssignment = function editAssignment(assignment) {
      return this.httpService.httpClient.fetch(_config.API.endpoints.assignments + '/' + assignment.id, {
        method: 'put',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tittle: assignment.title,
          description: assignment.description,
          init_date: assignment.startDate,
          end_date: assignment.endDate
        })
      }).then(this.httpService.checkStatus);
    };

    Syllabuses.prototype.loadAssignment = function loadAssignment(id) {
      return this.httpService.httpClient.fetch(_config.API.endpoints.assignments + '/' + id, {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token
        }
      }).then(this.httpService.checkStatus).then(this.httpService.parseJSON);
    };

    Syllabuses.prototype.loadMaterials = function loadMaterials(id) {
      return this.httpService.httpClient.fetch(_config.API.endpoints.syllabus + '/' + id + '/' + _config.API.endpoints.materials, {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token
        }
      }).then(this.httpService.checkStatus).then(this.httpService.parseJSON);
    };

    Syllabuses.prototype.loadResults = function loadResults(id, page) {
      return this.httpService.httpClient.fetch(_config.API.endpoints.assignments + '/' + id + '/results?limit=20&page=' + page, {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token
        }
      }).then(this.httpService.checkStatus).then(this.httpService.parseJSON);
    };

    Syllabuses.prototype.loadStatsByVerdict = function loadStatsByVerdict(idAssignment, idProblem) {
      return this.httpService.httpClient.fetch(_config.API.endpoints.assignments + '/' + idAssignment + '/verdicts/' + idProblem, {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token
        }
      }).then(this.httpService.checkStatus).then(this.httpService.parseJSON);
    };

    Syllabuses.prototype.loadStatsByLang = function loadStatsByLang(idAssignment, idProblem) {
      return this.httpService.httpClient.fetch(_config.API.endpoints.assignments + '/' + idAssignment + '/languages/' + idProblem, {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token
        }
      }).then(this.httpService.checkStatus).then(this.httpService.parseJSON);
    };

    Syllabuses.prototype.addProblems = function addProblems(idAssignment, problems) {
      return this.httpService.httpClient.fetch(_config.API.endpoints.assignments + '/' + idAssignment + '/' + _config.API.endpoints.addProblemAssignment, {
        method: 'post',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          problems: problems
        })
      }).then(this.httpService.checkStatus);
    };

    Syllabuses.prototype.addMaterials = function addMaterials(idSyllabus, materials) {
      return this.httpService.httpClient.fetch(_config.API.endpoints.syllabus + '/' + idSyllabus + '/' + _config.API.endpoints.addMaterials, {
        method: 'post',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          materials: materials
        })
      }).then(this.httpService.checkStatus);
    };

    Syllabuses.prototype.removeProblem = function removeProblem(idAssignment, idProblem) {
      return this.httpService.httpClient.fetch(_config.API.endpoints.assignments + '/' + idAssignment + '/' + _config.API.endpoints.removeProblemAssignment, {
        method: 'post',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          problems: [idProblem]
        })
      }).then(this.httpService.checkStatus);
    };

    Syllabuses.prototype.removeMaterial = function removeMaterial(idSyllabus, idMaterial) {
      return this.httpService.httpClient.fetch(_config.API.endpoints.syllabus + '/' + idSyllabus + '/' + _config.API.endpoints.removeMaterialSyllabus, {
        method: 'post',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          materials: [idMaterial]
        })
      }).then(this.httpService.checkStatus);
    };

    Syllabuses.prototype.removeUser = function removeUser(idSyllabus) {
      return this.httpService.httpClient.fetch(_config.API.endpoints.syllabus + '/' + idSyllabus + '/delete-students', {
        method: 'post',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token,
          'Content-Type': 'application/json'
        }
      }).then(this.httpService.checkStatus);
    };

    Syllabuses.prototype.removeUserFromCoach = function removeUserFromCoach(idSyllabus, idUser) {
      return this.httpService.httpClient.fetch(_config.API.endpoints.syllabus + '/' + idSyllabus + '/delete-students', {
        method: 'post',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          students: [idUser]
        })
      }).then(this.httpService.checkStatus);
    };

    Syllabuses.prototype.getSubmissionsAssignment = function getSubmissionsAssignment(assignmentId, problemId, limit, page, by, sort, condition) {
      var strt = '';
      if (condition !== null) strt = '&condition=' + condition;
      return this.httpService.httpClient.fetch(_config.API.endpoints.assignments + '/' + assignmentId + '/' + _config.API.endpoints.submissions + '/' + problemId + '?limit=' + limit + '&page=' + page + '&by=' + by + '&sort=' + sort + strt, {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token
        }
      }).then(this.httpService.checkStatus).then(this.httpService.parseJSON);
    };

    return Syllabuses;
  }()) || _class);
});
define('services/services',['exports', './alert', './auth', './contests', './date', './http', './jwt', './materials', './problems', './rankings', './syllabuses'], function (exports, _alert, _auth, _contests, _date, _http, _jwt, _materials, _problems, _rankings, _syllabuses) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.keys(_alert).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _alert[key];
      }
    });
  });
  Object.keys(_auth).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _auth[key];
      }
    });
  });
  Object.keys(_contests).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _contests[key];
      }
    });
  });
  Object.keys(_date).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _date[key];
      }
    });
  });
  Object.keys(_http).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _http[key];
      }
    });
  });
  Object.keys(_jwt).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _jwt[key];
      }
    });
  });
  Object.keys(_materials).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _materials[key];
      }
    });
  });
  Object.keys(_problems).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _problems[key];
      }
    });
  });
  Object.keys(_rankings).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _rankings[key];
      }
    });
  });
  Object.keys(_syllabuses).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _syllabuses[key];
      }
    });
  });
});
define('services/rankings',['exports', 'aurelia-framework', 'config/config', 'models/models', 'services/http', 'services/jwt'], function (exports, _aureliaFramework, _config, _models, _http, _jwt) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Rankings = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Rankings = exports.Rankings = (_dec = (0, _aureliaFramework.inject)(_http.Http, _jwt.Jwt), _dec(_class = function () {
    function Rankings(httpService, jwtService) {
      _classCallCheck(this, Rankings);

      this.jwtService = jwtService;
      this.httpService = httpService;
    }

    Rankings.prototype.getRanking = function getRanking(limit, page) {
      return this.httpService.httpClient.fetch(_config.API.endpoints.users + '/' + _config.API.endpoints.ranking + '?limit=' + limit + '&page=' + page, {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token
        }
      }).then(this.httpService.checkStatus).then(this.httpService.parseJSON);
    };

    Rankings.prototype.getSubmissions = function getSubmissions(userId, limit, page, by, sort, condition) {
      var strt = '';
      if (condition !== null) strt = '&condition=' + condition;
      return this.httpService.httpClient.fetch(_config.API.endpoints.users + '/' + userId + '/' + _config.API.endpoints.submissions + '?limit=' + limit + '&page=' + page + '&by=' + by + '&sort=' + sort + strt, {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token
        }
      }).then(this.httpService.checkStatus).then(this.httpService.parseJSON);
    };

    Rankings.prototype.loadStatsByVerdict = function loadStatsByVerdict(id) {
      return this.httpService.httpClient.fetch(_config.API.endpoints.users + '/' + id + '/verdicts', {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token
        }
      }).then(this.httpService.checkStatus).then(this.httpService.parseJSON);
    };

    Rankings.prototype.loadProfile = function loadProfile(id) {
      return this.httpService.httpClient.fetch(_config.API.endpoints.users + '/' + id, {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token
        }
      }).then(this.httpService.checkStatus).then(this.httpService.parseJSON);
    };

    Rankings.prototype.loadStatsByLang = function loadStatsByLang(id) {
      return this.httpService.httpClient.fetch(_config.API.endpoints.users + '/' + id + '/languages', {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token
        }
      }).then(this.httpService.checkStatus).then(this.httpService.parseJSON);
    };

    return Rankings;
  }()) || _class);
});
define('services/problems',['exports', 'aurelia-framework', 'config/config', 'services/http', 'services/jwt'], function (exports, _aureliaFramework, _config, _http, _jwt) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Problems = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Problems = exports.Problems = (_dec = (0, _aureliaFramework.inject)(_http.Http, _jwt.Jwt), _dec(_class = function () {
    function Problems(httpService, jwtService) {
      _classCallCheck(this, Problems);

      this.jwtService = jwtService;
      this.httpService = httpService;
    }

    Problems.prototype.getCategories = function getCategories() {
      return this.httpService.httpClient.fetch(_config.API.endpoints.categories, {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token
        }
      }).then(this.httpService.checkStatus).then(this.httpService.parseJSON);
    };

    Problems.prototype.createCategory = function createCategory(name) {
      return this.httpService.httpClient.fetch(_config.API.endpoints.categories, {
        method: 'post',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name
        })
      }).then(this.httpService.checkStatus);
    };

    Problems.prototype.editCategory = function editCategory(id, name) {
      return this.httpService.httpClient.fetch(_config.API.endpoints.categories + '/' + id, {
        method: 'put',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name
        })
      }).then(this.httpService.checkStatus).then(this.httpService.parseJSON);
    };

    Problems.prototype.removeCategory = function removeCategory(id) {
      return this.httpService.httpClient.fetch(_config.API.endpoints.categories + '/' + id, {
        method: 'delete',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token
        }
      }).then(this.httpService.checkStatus).then(this.httpService.parseJSON);
    };

    Problems.prototype.getCategoryProblems = function getCategoryProblems(id) {
      var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var sort = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var by = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      var filter = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;

      var data = '?';
      if (page !== null) {
        data += '&page=' + page;
      }
      if (limit !== null) {
        data += '&limit=' + limit;
      }
      if (sort !== null) {
        data += '&sort=' + sort;
      }
      if (by !== null) {
        data += '&by=' + by;
      }
      if (filter !== null) {
        data += '&filter=' + filter;
      }
      return this.httpService.httpClient.fetch(_config.API.endpoints.categoryProblems.replace('{1}', id) + data, {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token,
          'Content-Type': 'application/json'
        }
      }).then(this.httpService.checkStatus).then(this.httpService.parseJSON);
    };

    Problems.prototype.getProblem = function getProblem(id) {
      return this.httpService.httpClient.fetch(_config.API.endpoints.problems + '/' + id, {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token
        }
      }).then(this.httpService.checkStatus).then(this.httpService.parseJSON);
    };

    Problems.prototype.getSubmission = function getSubmission(name) {
      return this.httpService.httpClient.fetch(_config.API.endpoints.submissions + '/' + name, {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token
        }
      }).then(this.httpService.checkStatus).then(this.httpService.parseBlob);
    };

    Problems.prototype.createProblem = function createProblem(problem) {
      var data = new window.FormData();

      data.append('data[category]', problem.category);
      data.append('data[level]', problem.level);
      data.append('data[example_input]', problem.exampleInput);
      data.append('data[example_output]', problem.exampleOutput);
      data.append('data[time_limit]', problem.timeLimit);

      if (problem.titleEN !== undefined) data.append('data[title_en]', problem.titleEN);
      if (problem.titleES !== undefined) data.append('data[title_es]', problem.titleES);
      if (problem.descriptionEN !== undefined) data.append('data[description_en]', problem.descriptionEN);
      if (problem.descriptionES !== undefined) data.append('data[description_es]', problem.descriptionES);

      data.append('input', problem.input[0]);
      data.append('output', problem.output[0]);
      return this.httpService.httpClient.fetch(_config.API.endpoints.problems, {
        method: 'post',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token
        },
        body: data
      }).then(this.httpService.checkStatus);
    };

    Problems.prototype.editProblem = function editProblem(problem) {
      var data = new window.FormData();

      data.append('data[category]', problem.category);
      data.append('data[level]', problem.level);
      data.append('data[example_input]', problem.exampleInput);
      data.append('data[example_output]', problem.exampleOutput);
      data.append('data[time_limit]', problem.timeLimit);

      if (problem.titleEN !== undefined && problem.titleEN !== null) data.append('data[title_en]', problem.titleEN);
      if (problem.titleES !== undefined && problem.titleES !== null) data.append('data[title_es]', problem.titleES);
      if (problem.descriptionEN !== undefined && problem.descriptionEN !== null) data.append('data[description_en]', problem.descriptionEN);
      if (problem.descriptionES !== undefined && problem.descriptionES !== null) data.append('data[description_es]', problem.descriptionES);

      if (problem.input !== undefined && problem.input !== null) data.append('input', problem.input[0]);
      if (problem.output !== undefined && problem.output !== null) data.append('output', problem.output[0]);
      return this.httpService.httpClient.fetch(_config.API.endpoints.problems + '/' + problem.id, {
        method: 'put',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token
        },
        body: data
      }).then(this.httpService.checkStatus);
    };

    Problems.prototype.removeProblem = function removeProblem(id) {
      return this.httpService.httpClient.fetch(_config.API.endpoints.problems + '/' + id, {
        method: 'delete',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token
        }
      }).then(this.httpService.checkStatus).then(this.httpService.parseJSON);
    };

    Problems.prototype.submitSolution = function submitSolution(problemId, language, assignmentId, contestId, code) {
      var data = new window.FormData();
      data.append('data[language]', language);
      if (assignmentId !== undefined) data.append('data[assignment_problem_id]', assignmentId);
      if (contestId !== undefined) data.append('data[contest_problem_id]', contestId);
      data.append('code', code);
      return this.httpService.httpClient.fetch(_config.API.endpoints.problems + '/' + problemId + '/submit', {
        method: 'post',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token
        },
        body: data
      }).then(this.httpService.checkStatus).then(this.httpService.parseJSON);
    };

    Problems.prototype.searchProblems = function searchProblems(query, page, limit, sort, by, lang) {
      var q = '?search=' + query + '&page=' + page + '&limit=' + limit;
      if (sort !== undefined) q += '&sort=' + sort;
      if (by !== undefined) q += '&by=' + by;
      if (lang !== undefined) q += '&filter=' + lang;

      return this.httpService.httpClient.fetch(_config.API.endpoints.problems + q, {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token
        }
      }).then(this.httpService.checkStatus).then(this.httpService.parseJSON);
    };

    return Problems;
  }()) || _class);
});
define('services/materials',['exports', 'aurelia-framework', 'config/config', 'services/http', 'services/jwt'], function (exports, _aureliaFramework, _config, _http, _jwt) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Materials = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Materials = exports.Materials = (_dec = (0, _aureliaFramework.inject)(_http.Http, _jwt.Jwt), _dec(_class = function () {
    function Materials(httpService, jwtService) {
      _classCallCheck(this, Materials);

      this.jwtService = jwtService;
      this.httpService = httpService;
    }

    Materials.prototype.getCategoryMaterial = function getCategoryMaterial(idCategory, page, limit, sort, by) {
      return this.httpService.httpClient.fetch(_config.API.endpoints.categories + '/' + idCategory + '/' + _config.API.endpoints.materials + '?page=' + page + '&limit=' + limit + '&sort=' + sort + '&by=' + by, {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token
        }
      }).then(this.httpService.checkStatus).then(this.httpService.parseJSON);
    };

    Materials.prototype.getPublicMaterial = function getPublicMaterial(page, limit, sort, by) {
      return this.httpService.httpClient.fetch(_config.API.endpoints.materials + '?page=' + page + '&limit=' + limit + '&sort=' + sort + '&by=' + by, {
        method: 'get'
      }).then(this.httpService.checkStatus).then(this.httpService.parseJSON);
    };

    Materials.prototype.getPendingMaterial = function getPendingMaterial(page, limit, sort, by) {
      return this.httpService.httpClient.fetch(_config.API.endpoints.materials + '/pending' + '?page=' + page + '&limit=' + limit + '&sort=' + sort + '&by=' + by, {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token
        }
      }).then(this.httpService.checkStatus).then(this.httpService.parseJSON);
    };

    Materials.prototype.getMaterial = function getMaterial(idMaterial) {
      return this.httpService.httpClient.fetch(_config.API.endpoints.materials + '/' + idMaterial, {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token
        }
      }).then(this.httpService.checkStatus).then(this.httpService.parseJSON);
    };

    Materials.prototype.createMaterial = function createMaterial(material) {
      if (!material.isPdf) {
        return this.httpService.httpClient.fetch(_config.API.endpoints.materials, {
          method: 'post',
          headers: {
            'Authorization': 'Bearer ' + this.jwtService.token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            data: {
              name: material.name,
              category: material.category,
              description: material.description,
              content: 'url',
              url: material.url
            }
          })
        }).then(this.httpService.checkStatus);
      } else {
        var data = new window.FormData();
        data.append('data[name]', material.name);
        data.append('data[category]', material.category);
        data.append('data[description]', material.description);
        data.append('data[content]', 'pdf');
        data.append('pdf', material.pdf[0]);
        return this.httpService.httpClient.fetch(_config.API.endpoints.materials, {
          method: 'post',
          headers: {
            'Authorization': 'Bearer ' + this.jwtService.token
          },
          body: data
        }).then(this.httpService.checkStatus);
      }
    };

    Materials.prototype.approve = function approve(id) {
      return this.httpService.httpClient.fetch(_config.API.endpoints.materials + '/' + id, {
        method: 'PATCH',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token,
          'Content-Type': 'application/json'
        }
      }).then(this.httpService.checkStatus);
    };

    Materials.prototype.remove = function remove(id) {
      return this.httpService.httpClient.fetch(_config.API.endpoints.materials + '/' + id, {
        method: 'delete',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token,
          'Content-Type': 'application/json'
        }
      }).then(this.httpService.checkStatus);
    };

    return Materials;
  }()) || _class);
});
define('services/jwt',['exports', 'aurelia-framework', 'config/config', 'services/alert'], function (exports, _aureliaFramework, _config, _alert) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Jwt = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Jwt = exports.Jwt = (_dec = (0, _aureliaFramework.inject)(_alert.Alert), _dec(_class = function () {
    function Jwt(alertService) {
      _classCallCheck(this, Jwt);

      this.alertService = alertService;
      this.token = window.localStorage.getItem(_config.API.tokenName);
      if (this.tokenExists()) {
        this.data = JSON.parse(window.atob(this.token.split('.')[1]));
      } else {
        this.data = null;
      }
    }

    Jwt.prototype.save = function save(token) {
      window.localStorage.setItem(_config.API.tokenName, token);
      this.token = window.localStorage.getItem(_config.API.tokenName);
      this.data = JSON.parse(window.atob(this.token.split('.')[1]));
    };

    Jwt.prototype.remove = function remove() {
      window.localStorage.removeItem(_config.API.tokenName);
      this.token = null;
      this.data = null;
    };

    Jwt.prototype.tokenExists = function tokenExists() {
      if (window.localStorage.getItem(_config.API.tokenName) === null) return false;
      var tmp = JSON.parse(window.atob(this.token.split('.')[1])).exp;
      var now = Date.parse(new Date()) / 1000;
      if (tmp > now) return true;else {
        this.remove();
        this.alertService.showMessage(_config.MESSAGES.sessionExpired);
        return false;
      }
    };

    Jwt.prototype.getUsername = function getUsername() {
      if (!this.tokenExists) {
        return null;
      } else {
        return this.data.username;
      }
    };

    Jwt.prototype.getUserId = function getUserId() {
      if (!this.tokenExists) {
        return null;
      } else {
        return this.data.sub;
      }
    };

    Jwt.prototype.getUserType = function getUserType() {
      if (!this.tokenExists()) {
        return 'visitor';
      } else {
        var type = parseInt(this.data.usertype);
        switch (type) {
          case 0:
            return 'student';
          case 1:
            return 'coach';
          case 2:
            return 'admin';
        }
        return 'visitor';
      }
    };

    return Jwt;
  }()) || _class);
});
define('services/http',['exports', 'aurelia-fetch-client', 'config/api', 'fetch'], function (exports, _aureliaFetchClient, _api) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Http = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Http = exports.Http = function () {
    function Http() {
      _classCallCheck(this, Http);

      this.httpClient = new _aureliaFetchClient.HttpClient();
      this.httpClient.configure(function (config) {
        config.withBaseUrl(_api.API.apiUrl);
      });
    }

    Http.prototype.checkStatus = function checkStatus(response) {
      if (response.ok) {
        return response;
      } else {
        var error = new Error(response.statusText);
        error.status = response.status;
        error.response = response.clone();
        return Promise.reject(error);
      }
    };

    Http.prototype.parseJSON = function parseJSON(response) {
      return response.json();
    };

    Http.prototype.parseBlob = function parseBlob(response) {
      return response.blob();
    };

    return Http;
  }();
});
define('services/date',['exports', 'aurelia-framework', 'config/config', 'services/http', 'services/jwt'], function (exports, _aureliaFramework, _config, _http, _jwt) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Date = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Date = exports.Date = (_dec = (0, _aureliaFramework.inject)(_http.Http, _jwt.Jwt), _dec(_class = function () {
    function Date(httpService, jwtService) {
      _classCallCheck(this, Date);

      this.jwtService = jwtService;
      this.httpService = httpService;
    }

    Date.prototype.getServerDate = function getServerDate() {
      return this.httpService.httpClient.fetch(_config.API.endpoints.date, {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token
        }
      }).then(this.httpService.checkStatus).then(this.httpService.parseJSON);
    };

    return Date;
  }()) || _class);
});
define('services/contests',['exports', 'aurelia-framework', 'config/config', 'models/models', 'services/http', 'services/jwt'], function (exports, _aureliaFramework, _config, _models, _http, _jwt) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Contests = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Contests = exports.Contests = (_dec = (0, _aureliaFramework.inject)(_http.Http, _jwt.Jwt), _dec(_class = function () {
    function Contests(httpService, jwtService) {
      _classCallCheck(this, Contests);

      this.jwtService = jwtService;
      this.httpService = httpService;
    }

    Contests.prototype.createContest = function createContest(contest) {
      var key = undefined;
      if (!contest.public) key = contest.key;
      return this.httpService.httpClient.fetch(_config.API.endpoints.contests, {
        method: 'post',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: contest.title,
          description: contest.description,
          init_date: contest.initDate,
          end_date: contest.endDate,
          rules: contest.rules,
          public: contest.privacy,
          key: key
        })
      }).then(this.httpService.checkStatus);
    };

    Contests.prototype.enroll = function enroll(id, keyContest) {
      var key = undefined;
      if (keyContest !== '') key = keyContest;
      return this.httpService.httpClient.fetch(_config.API.endpoints.contests + '/' + id + '/register', {
        method: 'post',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          key: key
        })
      }).then(this.httpService.checkStatus);
    };

    Contests.prototype.unenroll = function unenroll(id) {
      return this.httpService.httpClient.fetch(_config.API.endpoints.contests + '/' + id + '/unregister', {
        method: 'post',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token,
          'Content-Type': 'application/json'
        }
      }).then(this.httpService.checkStatus);
    };

    Contests.prototype.editContest = function editContest(contest) {
      var key = undefined;
      if (!contest.public) key = contest.key;
      return this.httpService.httpClient.fetch(_config.API.endpoints.contests + '/' + contest.id, {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: contest.title,
          description: contest.description,
          init_date: contest.initDate,
          end_date: contest.endDate,
          rules: contest.rules,
          public: contest.privacy,
          key: key
        })
      }).then(this.httpService.checkStatus);
    };

    Contests.prototype.getMyContests = function getMyContests(limit, page, userId) {
      return this.httpService.httpClient.fetch(_config.API.endpoints.contests + '?limit=' + limit + '&page=' + page + '&user=' + userId, {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token
        }
      }).then(this.httpService.checkStatus).then(this.httpService.parseJSON);
    };

    Contests.prototype.getScore = function getScore(id) {
      return this.httpService.httpClient.fetch(_config.API.endpoints.contests + '/' + id + '/scoreboard', {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token
        }
      }).then(this.httpService.checkStatus).then(this.httpService.parseJSON);
    };

    Contests.prototype.getContests = function getContests(limit, page) {
      return this.httpService.httpClient.fetch(_config.API.endpoints.contests + '?limit=' + limit + '&page=' + page, {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token
        }
      }).then(this.httpService.checkStatus).then(this.httpService.parseJSON);
    };

    Contests.prototype.getProblems = function getProblems(id) {
      return this.httpService.httpClient.fetch(_config.API.endpoints.contests + '/' + id + '/' + _config.API.endpoints.problems, {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token
        }
      }).then(this.httpService.checkStatus).then(this.httpService.parseJSON);
    };

    Contests.prototype.getContest = function getContest(id) {
      return this.httpService.httpClient.fetch(_config.API.endpoints.contests + '/' + id, {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token
        }
      }).then(this.httpService.checkStatus).then(this.httpService.parseJSON);
    };

    Contests.prototype.getProblemsContest = function getProblemsContest(id) {
      return this.httpService.httpClient.fetch(_config.API.endpoints.contests + '/' + id + '/' + _config.API.endpoints.problems, {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token
        }
      }).then(this.httpService.checkStatus).then(this.httpService.parseJSON);
    };

    Contests.prototype.getStatus = function getStatus(idContest, idUser) {
      return this.httpService.httpClient.fetch(_config.API.endpoints.contests + '/' + idContest + '/is-register?student=' + idUser, {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token
        }
      }).then(this.httpService.checkStatus).then(this.httpService.parseJSON);
    };

    Contests.prototype.addProblems = function addProblems(id, problems) {
      return this.httpService.httpClient.fetch(_config.API.endpoints.contests + '/' + id + '/' + _config.API.endpoints.problems, {
        method: 'post',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          problems: problems
        })
      }).then(this.httpService.checkStatus);
    };

    Contests.prototype.removeProblem = function removeProblem(idContest, idProblem) {
      return this.httpService.httpClient.fetch(_config.API.endpoints.contests + '/' + idContest + '/remove-problems', {
        method: 'post',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          problems: [idProblem]
        })
      }).then(this.httpService.checkStatus);
    };

    return Contests;
  }()) || _class);
});
define('services/auth',['exports', 'aurelia-framework', 'config/config', 'services/alert', 'services/http', 'services/jwt', 'socket.io-client'], function (exports, _aureliaFramework, _config, _alert, _http, _jwt, _socket) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Auth = undefined;

  var _socket2 = _interopRequireDefault(_socket);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Auth = exports.Auth = (_dec = (0, _aureliaFramework.inject)(_http.Http, _alert.Alert, _jwt.Jwt), _dec(_class = function () {
    function Auth(httpService, alertService, jwtService) {
      _classCallCheck(this, Auth);

      this.httpService = httpService;
      this.alertService = alertService;
      this.jwtService = jwtService;
      this.authenticated = this.isAuthenticated();
      this.socketActive = false;
      this.activateSocket();
    }

    Auth.prototype.auth = function auth(user) {
      return this.httpService.httpClient.fetch(_config.API.endpoints.auth, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      }).then(this.httpService.checkStatus).then(this.httpService.parseJSON);
    };

    Auth.prototype.activateSocket = function activateSocket() {
      var _this = this;

      if (this.authenticated && !this.socketActive) {
        this.socket = _socket2.default.connect(_config.API.apiUrl + 'normal-mode');
        this.socket.emit('register', this.getUserId());
        this.socket.on('new result', function (data) {
          if (data.verdict === 'Accepted') {
            _this.alertService.showMessage({
              text: 'Tu solución al problema ' + data.problem_id + ' "' + data.problem_name + '" es correcta. ¡Muy bien!',
              type: 'success'
            });
          } else if (data.verdict === 'Compilation Error') {
            _this.alertService.showMessage({
              text: 'Tu solución al problema ' + data.problem_id + ' "' + data.problem_name + '" presenta un error de compilación.',
              type: 'error'
            });
          } else if (data.verdict === 'Time Limit Exceeded') {
            _this.alertService.showMessage({
              text: 'Tu solución al problema ' + data.problem_id + ' "' + data.problem_name + '" excede el tiempo límite permitido.',
              type: 'error'
            });
          } else if (data.verdict === 'Runtime Error') {
            _this.alertService.showMessage({
              text: 'Tu solución al problema ' + data.problem_id + ' "' + data.problem_name + '" tiene un error en tiempo de ejecución.',
              type: 'error'
            });
          } else if (data.verdict === 'Wrong Answer') {
            _this.alertService.showMessage({
              text: 'Tu solución al problema ' + data.problem_id + ' "' + data.problem_name + '" imprime una respuesta erronea.',
              type: 'error'
            });
          }
        });
        this.socketActive = true;
      }
    };

    Auth.prototype.registerStudent = function registerStudent(user) {
      var body = {
        name: user.name,
        code: user.code,
        email: user.email,
        password: user.password,
        confirm_password: user.confirmPassword,
        username: user.username
      };
      return this.httpService.httpClient.fetch(_config.API.endpoints.users, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }).then(this.httpService.checkStatus);
    };

    Auth.prototype.createSuperUser = function createSuperUser(user) {
      var body = {
        name: user.name,
        code: user.code,
        email: user.email,
        password: user.password,
        confirm_password: user.confirmPassword,
        username: user.username,
        type: user.type
      };
      return this.httpService.httpClient.fetch(_config.API.endpoints.superUser, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.jwtService.token
        },
        body: JSON.stringify(body)
      }).then(this.httpService.checkStatus);
    };

    Auth.prototype.requestRecovery = function requestRecovery(email) {
      return this.httpService.httpClient.fetch(_config.API.endpoints.recovery + '?email=' + email, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(this.httpService.checkStatus);
    };

    Auth.prototype.validateReset = function validateReset(token) {
      return this.httpService.httpClient.fetch(_config.API.endpoints.reset, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: token })
      }).then(this.httpService.checkStatus).then(this.httpService.parseJSON);
    };

    Auth.prototype.setPassword = function setPassword(id, oldPassword, newPassword, retypePassword) {
      return this.httpService.httpClient.fetch(_config.API.endpoints.users + '/' + id + '/update-password', {
        method: 'post',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          old_password: oldPassword,
          password: newPassword,
          confirm_password: retypePassword
        })
      }).then(this.httpService.checkStatus);
    };

    Auth.prototype.editProfile = function editProfile(id, email, username, name, code) {
      return this.httpService.httpClient.fetch(_config.API.endpoints.users + '/' + id, {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          username: username,
          name: name,
          code: code
        })
      }).then(this.httpService.checkStatus).then(this.httpService.parseJSON);
    };

    Auth.prototype.resetPassword = function resetPassword(user) {
      return this.httpService.httpClient.fetch(_config.API.endpoints.reset, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      }).then(this.httpService.checkStatus);
    };

    Auth.prototype.login = function login(token) {
      this.jwtService.save(token);
      this.authenticated = this.isAuthenticated();
      this.activateSocket();
    };

    Auth.prototype.logout = function logout() {
      this.jwtService.remove();
      this.authenticated = this.isAuthenticated();
      this.socketActive = false;
    };

    Auth.prototype.isAuthenticated = function isAuthenticated() {
      return this.jwtService.tokenExists();
    };

    Auth.prototype.isStudent = function isStudent() {
      if (this.jwtService.getUserType() === 'student' && !this.socketActive) this.activateSocket();
      return this.jwtService.getUserType() === 'student';
    };

    Auth.prototype.isCoach = function isCoach() {
      if (this.jwtService.getUserType() === 'coach' && !this.socketActive) this.activateSocket();
      return this.jwtService.getUserType() === 'coach';
    };

    Auth.prototype.isAdmin = function isAdmin() {
      if (this.jwtService.getUserType() === 'admin' && !this.socketActive) this.activateSocket();
      return this.jwtService.getUserType() === 'admin';
    };

    Auth.prototype.isVisitor = function isVisitor() {
      return this.jwtService.getUserType() === 'visitor';
    };

    Auth.prototype.validateResetToken = function validateResetToken(token) {
      var info = void 0;
      var startDate = void 0;
      var endDate = void 0;
      try {
        info = JSON.parse(window.atob(token.split('.')[1]));
        startDate = info.iat;
        endDate = info.exp;
      } catch (e) {
        info = null;
      }
      if (info == null || startDate === undefined || endDate === undefined) {
        throw new Error('invalid token');
      }
      var actualDate = new Date().getTime() / 1000;
      if (actualDate < startDate) {
        throw new Error('invalid token');
      } else if (actualDate + 1000 >= endDate) {
        throw new Error('expired token');
      } else {
        return info.email;
      }
    };

    Auth.prototype.getUserId = function getUserId() {
      return this.jwtService.getUserId();
    };

    Auth.prototype.getUsers = function getUsers(page, limit, sort, by) {
      return this.httpService.httpClient.fetch(_config.API.endpoints.users + '?page=' + page + '&limit=' + limit + '&sort=' + sort + '&by=' + by, {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token
        }
      }).then(this.httpService.checkStatus).then(this.httpService.parseJSON);
    };

    Auth.prototype.removeUser = function removeUser(id) {
      return this.httpService.httpClient.fetch(_config.API.endpoints.users + '/remove-account', {
        method: 'post',
        headers: {
          'Authorization': 'Bearer ' + this.jwtService.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'users': [id]
        })
      }).then(this.httpService.checkStatus);
    };

    return Auth;
  }()) || _class);
});
define('services/alert',['exports', 'aurelia-framework', 'aurelia-notify'], function (exports, _aureliaFramework, _aureliaNotify) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Alert = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Alert = exports.Alert = (_dec = (0, _aureliaFramework.inject)(_aureliaNotify.NotificationService), _dec(_class = function () {
    function Alert(notificationService) {
      _classCallCheck(this, Alert);

      this.notificationService = notificationService;
    }

    Alert.prototype.showMessage = function showMessage(message) {
      if (message.type === 'info') {
        this.notificationService.info(message.text);
      } else if (message.type === 'error') {
        this.notificationService.danger(message.text);
      } else if (message.type === 'success') {
        this.notificationService.success(message.text);
      } else if (message.type === 'warning') {
        this.notificationService.warning(message.text);
      }
    };

    return Alert;
  }()) || _class);
});
define('resources/index',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {
    config.globalResources(['./attributes/markdown', './attributes/tooltip', './elements/loading-indicator', './elements/app-header']);
  }
});
define('resources/elements/paginator',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Paginator = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _dec2, _desc, _value, _class, _descriptor, _descriptor2;

  var Paginator = exports.Paginator = (_dec = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), (_class = function () {
    function Paginator() {
      _classCallCheck(this, Paginator);

      _initDefineProp(this, 'page', _descriptor, this);

      _initDefineProp(this, 'totalPages', _descriptor2, this);

      this.pagination = [];
    }

    Paginator.prototype.totalPagesChanged = function totalPagesChanged() {
      this.setPagination();
    };

    Paginator.prototype.pageChanged = function pageChanged() {
      this.setPagination();
    };

    Paginator.prototype.setPagination = function setPagination() {
      this.pagination = [];
      if (this.page <= 3) {
        while (this.pagination.length < Math.min(this.totalPages, 5)) {
          this.pagination.push(this.pagination.length + 1);
        }
      } else {
        var i = Math.max(this.page - Math.min(2, this.totalPages - this.page), 1);
        while (this.totalPages - i < 4 && i >= 1) {
          i--;
        }while (this.pagination.length < 5 && i <= this.totalPages) {
          this.pagination.push(i++);
        }
      }
    };

    Paginator.prototype.goToFirstPage = function goToFirstPage() {
      this.goToPage(1);
    };

    Paginator.prototype.goToLastPage = function goToLastPage() {
      this.goToPage(this.totalPages);
    };

    Paginator.prototype.goToPrevPage = function goToPrevPage() {
      if (this.page > 1) {
        this.goToPage(this.page - 1);
      }
    };

    Paginator.prototype.goToNextPage = function goToNextPage() {
      if (this.page < this.totalPages) {
        this.goToPage(this.page + 1);
      }
    };

    Paginator.prototype.goToPage = function goToPage(page) {
      if (page !== this.page) {
        this.page = page;
      }
    };

    return Paginator;
  }(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'page', [_dec], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'totalPages', [_dec2], {
    enumerable: true,
    initializer: null
  })), _class));
});
define('text!resources/elements/paginator.html', ['module'], function(module) { module.exports = "<template>\n  <nav aria-label=\"Navegación\" class=\"text-center\">\n    <ul class=\"pagination\">\n      <li class=\"${page === 1 ? 'disabled' : ''}\">\n        <a click.delegate=\"goToFirstPage()\" aria-label=\"Primero\">\n          <span aria-hidden=\"true\">Inicio</span>\n        </a>\n      </li>\n      <li class=\"${page === 1 ? 'disabled' : ''}\">\n        <a click.delegate=\"goToPrevPage()\" aria-label=\"Anterior\">\n          <span aria-hidden=\"true\">Anterior</span>\n        </a>\n      </li> \n      <li repeat.for=\"i of pagination\" class=\"${i === page ? 'active' : 'hidden-xs'}\">\n        <a click.delegate=\"goToPage(i)\">${i}</a>\n      </li>\n      <li class=\"${page >= totalPages ? 'disabled' : ''}\">\n        <a click.delegate=\"goToNextPage()\" aria-label=\"Siguiente\">\n          <span aria-hidden=\"true\">Siguiente</span>\n        </a>\n      </li>\n      <li class=\"${page >= totalPages ? 'disabled' : ''}\">\n        <a click.delegate=\"goToLastPage()\" aria-label=\"Último\">\n          <span aria-hidden=\"true\">Final</span>\n        </a>\n      </li>\n    </ul>\n  </nav>\n</template>\n"; });
define('resources/elements/loading-indicator',['exports', 'nprogress', 'aurelia-framework'], function (exports, _nprogress, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.LoadingIndicator = undefined;

  var nprogress = _interopRequireWildcard(_nprogress);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var LoadingIndicator = exports.LoadingIndicator = (0, _aureliaFramework.decorators)((0, _aureliaFramework.noView)(['nprogress/nprogress.css']), (0, _aureliaFramework.bindable)({ name: 'loading', defaultValue: false })).on(function () {
    function _class() {
      _classCallCheck(this, _class);
    }

    _class.prototype.loadingChanged = function loadingChanged(newValue) {
      if (newValue) {
        nprogress.start();
      } else {
        nprogress.done();
      }
    };

    return _class;
  }());
});
define('resources/elements/filter',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Filter = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _dec2, _dec3, _dec4, _dec5, _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9;

  var Filter = exports.Filter = (_dec = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec3 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec4 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec5 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), (_class = function () {
    function Filter() {
      _classCallCheck(this, Filter);

      _initDefineProp(this, 'numberOfItems', _descriptor, this);

      _initDefineProp(this, 'sortOptions', _descriptor2, this);

      _initDefineProp(this, 'textToShow', _descriptor3, this);

      _initDefineProp(this, 'filterChange', _descriptor4, this);

      _initDefineProp(this, 'limit', _descriptor5, this);

      _initDefineProp(this, 'sort', _descriptor6, this);

      _initDefineProp(this, 'by', _descriptor7, this);

      _initDefineProp(this, 'languageFlag', _descriptor8, this);

      _initDefineProp(this, 'language', _descriptor9, this);
    }

    Filter.prototype.languageFlagChanged = function languageFlagChanged(act, prev) {};

    Filter.prototype.setSort = function setSort(sort) {
      this.sort = sort;
      this.filterChange = !this.filterChange;
    };

    Filter.prototype.setBy = function setBy(by) {
      this.by = by;
      this.filterChange = !this.filterChange;
    };

    Filter.prototype.setLimit = function setLimit(number) {
      this.limit = number;
      this.filterChange = !this.filterChange;
    };

    Filter.prototype.setLanguage = function setLanguage(language) {
      this.language = language;
      this.filterChange = !this.filterChange;
    };

    return Filter;
  }(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'numberOfItems', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'sortOptions', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'textToShow', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, 'filterChange', [_dec], {
    enumerable: true,
    initializer: null
  }), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, 'limit', [_dec2], {
    enumerable: true,
    initializer: null
  }), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, 'sort', [_dec3], {
    enumerable: true,
    initializer: null
  }), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, 'by', [_dec4], {
    enumerable: true,
    initializer: null
  }), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, 'languageFlag', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor9 = _applyDecoratedDescriptor(_class.prototype, 'language', [_dec5], {
    enumerable: true,
    initializer: null
  })), _class));
});
define('text!resources/elements/filter.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"col-md-6 col-sm-5 col-xs-12 text-left filter-left\">\n    Mostrar\n    <div class=\"dropdown dropdown-inline ufps-dropdown\">\n      <button class=\"btn btn-default dropdown-toggle\" type=\"button\" id=\"showNoItems\" data-toggle=\"dropdown\" aria-haspopup=\"true\"\n        aria-expanded=\"true\">\n        ${limit}\n        <span class=\"caret\"></span>\n      </button>\n      <ul class=\"dropdown-menu ufps-dropdown-menu dropdown-mini\" aria-labelledby=\"showNoItems\">\n        <li repeat.for=\"i of numberOfItems\">\n          <a click.delegate=\"setLimit(i)\">${i}</a>\n        </li>\n        \n      </ul>\n    </div>\n    ${textToShow} <span if.bind=\"languageFlag\">en </span>\n    <div if.bind=\"languageFlag\" class=\"dropdown dropdown-inline ufps-dropdown\">\n      <button class=\"btn btn-default dropdown-toggle\" type=\"button\" id=\"showLanguage\" data-toggle=\"dropdown\" aria-haspopup=\"true\"\n        aria-expanded=\"true\">\n        ${language}\n        <span class=\"caret\"></span>\n        </button>\n        <ul class=\"dropdown-menu ufps-dropdown-menu dropdown-mini\" aria-labelledby=\"showLanguage\">\n          <li><a click.delegate=\"setLanguage('Cualquier idioma')\">Cualquier idioma</a></li>\n          <li><a click.delegate=\"setLanguage('Español')\">Español</a></li>\n          <li><a click.delegate=\"setLanguage('Inglés')\">Inglés</a></li>\n        </ul>\n    </div>\n  </div>\n  <div class=\"col-md-6 col-sm-7 col-xs-12 text-right filter-right\">\n    Ordenar por\n    <div class=\"dropdown dropdown-inline ufps-dropdown\">\n      <button class=\"btn btn-default dropdown-toggle\" type=\"button\" id=\"sortBy\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"true\">\n        ${sort}\n        <span class=\"caret\"></span>\n      </button>\n      <ul class=\"dropdown-menu ufps-dropdown-menu dropdown-mini\" aria-labelledby=\"sortBy\">\n        <li repeat.for=\"i of sortOptions\">\n          <a click.delegate=\"setSort(i)\">${i}</a>\n        </li>\n      </ul>\n    </div>\n    en forma\n    <div class=\"dropdown dropdown-inline ufps-dropdown\">\n      <button class=\"btn btn-default dropdown-toggle\" type=\"button\" id=\"orderBy\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"true\">\n        ${by}\n        <span class=\"caret\"></span>\n      </button>\n      <ul class=\"dropdown-menu ufps-dropdown-menu dropdown-mini\" aria-labelledby=\"orderBy\">\n        <li>\n          <a click.delegate=\"setBy('Ascendente')\">Ascendente</a>\n        </li>\n        <li>\n          <a click.delegate=\"setBy('Descendente')\">Descendente</a>\n        </li>\n      </ul>\n    </div>\n  </div>\n  <div class=\"fix\"></div>\n  <div class=\"ufps-separator-mini\"></div>\n</template>\n"; });
define('resources/elements/clock',['exports', 'aurelia-framework', 'services/services'], function (exports, _aureliaFramework, _services) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Clock = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

  var Clock = exports.Clock = (_dec = (0, _aureliaFramework.inject)(_services.Date), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec3 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec4 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec5 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec6 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
    function Clock(dateService) {
      _classCallCheck(this, Clock);

      _initDefineProp(this, 'date', _descriptor, this);

      _initDefineProp(this, 'dateLoaded', _descriptor2, this);

      _initDefineProp(this, 'showTimer', _descriptor3, this);

      _initDefineProp(this, 'startDate', _descriptor4, this);

      _initDefineProp(this, 'endDate', _descriptor5, this);

      this.date = null;
      this.dateLoaded = false;
      this.dateService = dateService;
      this.initDate();
    }

    Clock.prototype.initDate = function initDate() {
      var _this = this;

      if (this.date !== null) {
        this.dateLoaded = true;
        return;
      } else {
        this.dateService.getServerDate().then(function (data) {
          _this.date = new window.Date(data.date);
          _this.dateLoaded = true;
          _this.updateEverySecond();
        });
      }
    };

    Clock.prototype.updateEverySecond = function updateEverySecond() {
      var _this2 = this;

      setInterval(function () {
        _this2.date.setTime(_this2.date.getTime() + 1000);
        if (_this2.showTimer) _this2.showCont();
      }, 1000);
    };

    Clock.prototype.showCont = function showCont() {
      if (this.date >= this.startDate && this.date < this.endDate) {
        var millis = this.endDate - this.date;
        this.state = 0;
        this.hours = 0;
        this.seconds = Math.floor(millis / 1000);
        this.minutes = Math.floor(this.seconds / 60);
        this.seconds %= 60;
        this.hours = Math.floor(this.minutes / 60);
        this.minutes %= 60;
      } else if (this.date < this.startDate) {
        this.state = 1;
        var _millis = this.startDate - this.date;
        this.hours = 0;
        this.seconds = Math.floor(_millis / 1000);
        this.minutes = Math.floor(this.seconds / 60);
        this.seconds %= 60;
        this.hours = Math.floor(this.minutes / 60);
        this.minutes %= 60;
      } else {
        this.state = 2;
      }
    };

    return Clock;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'date', [_dec2], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'dateLoaded', [_dec3], {
    enumerable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'showTimer', [_dec4], {
    enumerable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'startDate', [_dec5], {
    enumerable: true,
    initializer: null
  }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'endDate', [_dec6], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class);
});
define('text!resources/elements/clock.html', ['module'], function(module) { module.exports = "<template>\n  <p if.bind=\"showTimer\" class=\"text-right\">\n    <h4 class=\"text-right\" if.bind=\"state === 0\">Finaliza en ${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}</h4>\n    <h4 class=\"text-right\" if.bind=\"state === 1\">Inicia en ${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}</h4>\n    <h4 class=\"text-right\" if.bind=\"state === 2\">Competencia finalizada</h4>\n  </p>\n</template>"; });
define('resources/elements/app-header',['exports', 'aurelia-framework', 'aurelia-router', 'services/services'], function (exports, _aureliaFramework, _aureliaRouter, _services) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AppHeader = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var AppHeader = exports.AppHeader = (_dec = (0, _aureliaFramework.inject)(_services.Auth, _aureliaRouter.Router), _dec(_class = function () {
    function AppHeader(authService, routerService) {
      _classCallCheck(this, AppHeader);

      this.authService = authService;
      this.routerService = routerService;
      this.query = '';
    }

    AppHeader.prototype.attached = function attached() {
      this.problems = this.routerService.navigation.find(function (i) {
        return i.config.name.indexOf('problems') !== -1;
      });
      this.searchB = this.routerService.navigation.find(function (i) {
        return i.config.name.indexOf('search') !== -1;
      });
      this.ranking = this.routerService.navigation.find(function (i) {
        return i.config.name.indexOf('ranking') !== -1;
      });
      this.classes = this.routerService.navigation.find(function (i) {
        return i.config.name.indexOf('classes') !== -1;
      });
      this.admin = this.routerService.navigation.find(function (i) {
        return i.config.name.indexOf('admin') !== -1;
      });
      this.contest = this.routerService.navigation.find(function (i) {
        return i.config.name.indexOf('contest') !== -1;
      });
    };

    AppHeader.prototype.logOut = function logOut() {
      this.authService.logout();
      this.routerService.navigate('iniciar-sesion');
    };

    AppHeader.prototype.search = function search() {
      if (this.query.length > 0) this.routerService.navigate('/buscar/' + this.query.replace(/\s/g, '+'));
    };

    return AppHeader;
  }()) || _class);
});
define('text!resources/elements/app-header.html', ['module'], function(module) { module.exports = "<template>\n  <nav class=\"navbar navbar-fixed-top ufps-navbar\">\n    <div class=\"container\">\n      <div class=\"navbar-header\">\n        <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#menu\" aria-expanded=\"false\">\n          <span class=\"sr-only\">Toggle navigation</span>\n          <span class=\"icon-bar\"></span>\n          <span class=\"icon-bar\"></span>\n          <span class=\"icon-bar\"></span>\n        </button>\n        <a class=\"navbar-brand ufps-brand\" href=\"/\">\n          <img alt=\"UFPS Training Center\" src=\"src/assets/img/logo-transparent.png\">\n        </a>\n      </div>\n      <div class=\"collapse navbar-collapse\" id=\"menu\">\n        <ul class=\"nav navbar-nav navbar-left\">\n          <li class=\"ufps-btn-nav ${(problems.isActive || searchB.isActive) ? 'active' : ''}\" if.bind=\"authService.isVisitor()\">\n            <a route-href=\"route: problems\">Material</a>\n          </li>\n          <li class=\"ufps-btn-nav ${(problems.isActive || searchB.isActive) ? 'active' : ''}\" if.bind=\"authService.isStudent()\">\n            <a route-href=\"route: problems\">Problemas</a>\n          </li>\n          <li class=\"dropdown ufps-btn-nav ufps-dropdown-menu ${problems.isActive ? 'active' : ''}\" if.bind=\"authService.isCoach() || authService.isAdmin()\">\n            <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">\n              Problemas\n            </a>\n            <ul class=\"dropdown-menu ufps-dropdown-menu\">\n              <li>\n                <a route-href=\"route: problems\">Administrar Categorías</a>\n              </li>\n              <li>\n                <a href=\"/problemas/nuevo\">Añadir problemas</a>\n              </li>\n            </ul>\n          </li>\n          <li class=\"ufps-btn-nav ${classes.isActive ? 'active' : ''}\" if.bind=\"authService.isStudent() || authService.isCoach()\">\n            <a route-href=\"route: classes\">Clases</a>\n          </li>\n          <li class=\"ufps-btn-nav ${ranking.isActive ? 'active' : ''}\" if.bind=\"authService.isAuthenticated()\">\n            <a route-href=\"route: ranking\">Ranking</a>\n          </li>\n          <li class=\"ufps-btn-nav ${contest.isActive ? 'active' : ''}\" if.bind=\"authService.isAuthenticated()\">\n            <a route-href=\"route: contest\">Maratones</a>\n          </li>\n          <li class=\"ufps-btn-nav ${admin.isActive ? 'active' : ''}\" if.bind=\"authService.isAdmin()\">\n            <a route-href=\"route: admin\">Administración</a>\n          </li>\n          <li class=\"ufps-btn-nav hidden-md hidden-lg\" if.bind=\"authService.isCoach() || authService.isStudent()\">\n            <a href=\"/envios\">Mis envios</a>\n          </li>\n          <li class=\"ufps-btn-nav hidden-md hidden-lg\" if.bind=\"authService.authenticated\">\n              <a href=\"/perfil\">Perfil</a>\n            </li>\n            <li class=\"ufps-btn-nav hidden-md hidden-lg\" if.bind=\"authService.authenticated\">\n                <a href=\"/acerca-de\">Acerca de</a>\n              </li>\n          <li class=\"ufps-btn-nav hidden-md hidden-lg\" if.bind=\"authService.authenticated\">\n            <a click.delegate=\"logOut()\">Cerrar Sesión</a>\n          </li>\n        </ul>\n        <ul class=\"nav navbar-nav navbar-right hidden-sm hidden-xs\" if.bind=\"authService.authenticated\">\n          <li class=\"dropdown ufps-btn-nav ufps-dropdown-user\">\n            <a href=\"#\" class=\"dropdown-toggle icon-more-a\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">\n            <span class=\"glyphicon glyphicon-option-vertical icon-more\"></span> \n            </a>\n            <ul class=\"dropdown-menu ufps-dropdown-menu\">\n              <li if.bind=\"authService.isCoach() || authService.isStudent()\">\n                <a href=\"/envios\">Mis envios</a>\n              </li>\n              <li if.bind=\"authService.authenticated\">\n                <a href=\"/perfil\">Perfil</a>\n              </li>\n              <li>\n                <a href=\"/acerca-de\">Acerca de</a>\n              </li>\n              <li role=\"separator\" class=\"divider\"></li>\n              <li>\n                <a click.delegate=\"logOut()\">Cerrar Sesión</a>\n              </li>\n            </ul>\n          </li>\n        </ul>\n        <ul class=\"nav navbar-nav navbar-right\" if.bind=\"!authService.authenticated\">\n          <li class=\"ufps-btn-nav \">\n            <a href=\"/iniciar-sesion\">Iniciar sesión</a>\n          </li>\n        </ul>\n        <form class=\"navbar-form navbar-right\" submit.delegate=\"search()\" if.bind=\"authService.authenticated\">\n          <div class=\"form-group ufps-navbar-search\">\n            <div class=\"input-group\">\n              <input type=\"text\" value.bind=\"query\" class=\"form-control ufps-navbar-input\" placeholder=\"Buscar problema...\">\n              <div class=\"input-group-addon ufps-input-navbar-addon\">\n                <span class=\"glyphicon glyphicon-search\"></span>\n              </div>\n            </div>\n            <input type=\"submit\" value=\"\" class=\"search-btn\">\n        </form>\n        </div>\n      </div>\n  </nav>\n  <div repeat.for=\"row of router.navigation\" class=\"${row.isActive ? 'active' : ''}\">\n    ${row}\n  </div>\n</template>\n"; });
define('resources/attributes/tooltip',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var TooltipCustomAttribute = exports.TooltipCustomAttribute = function () {
    TooltipCustomAttribute.inject = function inject() {
      return [Element];
    };

    function TooltipCustomAttribute(element) {
      _classCallCheck(this, TooltipCustomAttribute);

      this.element = element;
    }

    TooltipCustomAttribute.prototype.bind = function bind() {
      window.$(this.element).tooltip();
    };

    TooltipCustomAttribute.prototype.unbind = function unbind() {
      window.$(this.element).tooltip('destroy');
    };

    return TooltipCustomAttribute;
  }();
});
define('resources/attributes/markdown',['exports', 'showdown'], function (exports, _showdown) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.MarkdownCustomAttribute = undefined;

  var _showdown2 = _interopRequireDefault(_showdown);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var MarkdownCustomAttribute = exports.MarkdownCustomAttribute = function () {
    MarkdownCustomAttribute.inject = function inject() {
      return [Element];
    };

    function MarkdownCustomAttribute(element) {
      _classCallCheck(this, MarkdownCustomAttribute);

      this.element = element;
      this.converter = new _showdown2.default.Converter();
    }

    MarkdownCustomAttribute.prototype.valueChanged = function valueChanged(newValue, oldValue) {
      if (newValue !== null) {
        this.element.innerHTML = this.converter.makeHtml(newValue.split('\n').map(function (line) {
          return line.trim();
        }).join('\n'));
      }
    };

    return MarkdownCustomAttribute;
  }();
});
define('modules/syllabus/view-problem/view-problem',['exports', 'aurelia-framework', 'aurelia-router', 'config/config', 'models/models', 'services/services'], function (exports, _aureliaFramework, _aureliaRouter, _config, _models, _services) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ViewProblem = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3;

  var ViewProblem = exports.ViewProblem = (_dec = (0, _aureliaFramework.inject)(_services.Alert, _services.Auth, _services.Problems, _services.Syllabuses, _aureliaRouter.Router), _dec(_class = (_class2 = function () {
    function ViewProblem(alertService, authService, problemService, syllabusService, routerService) {
      _classCallCheck(this, ViewProblem);

      _initDefineProp(this, 'now', _descriptor, this);

      _initDefineProp(this, 'assignmentLoaded', _descriptor2, this);

      _initDefineProp(this, 'dateLoaded', _descriptor3, this);

      this.alertService = alertService;
      this.authService = authService;
      this.problemService = problemService;
      this.syllabusService = syllabusService;
      this.routerService = routerService;
      this.languages = _config.SETTINGS.languages;
      this.assignment = new _models.Assignment();
      this.language;
      this.code;
      this.sourceValid = false;
      this.validDate = -1;
      this.now;
    }

    ViewProblem.prototype.assignmentLoadedChanged = function assignmentLoadedChanged(act, prev) {
      this.validateDate();
    };

    ViewProblem.prototype.dateLoadedChanged = function dateLoadedChanged(act, prev) {
      this.validateDate();
    };

    ViewProblem.prototype.validateDate = function validateDate() {
      var _this = this;

      if (this.dateLoaded && this.assignmentLoaded) {
        setInterval(function () {
          if (_this.now < _this.startDate) {
            _this.validDate = 1;
          } else if (_this.now > _this.endDate) {
            _this.validDate = 2;
          } else {
            _this.validDate = 0;
          }
        }, 1000);
      }
    };

    ViewProblem.prototype.activate = function activate(params, routeConfig) {
      var _this2 = this;

      this.routeConfig = routeConfig;
      this.assignmentId = params.assignmentId;
      this.assignmentProblemId = params.assignmentProblemId;
      this.problemId = params.problemId;
      this.lang = params.lang || 'en';
      this.problemService.getProblem(this.problemId).then(function (problem) {
        problem = problem.problem;
        _this2.problem = new _models.Problem(parseInt(params.problemId), problem.title_en, problem.title_es, parseInt(problem.level), parseInt(problem.category), undefined, problem.description_en, problem.description_es, problem.example_input !== 'undefined' ? problem.example_input.replace(/\r\n/g, '\n') : '', problem.example_output !== 'undefined' ? problem.example_output.replace(/\r\n/g, '\n') : '', parseFloat(problem.time_limit), problem.user_id, problem.user.username);
        if (_this2.lang === 'en' && !_this2.problem.isInEnglish()) {
          _this2.lang = 'es';
        } else if (_this2.lang === 'es' && !_this2.problem.isInSpanish()) {
          _this2.lang = 'en';
        }
        _this2.getAssignment();
      }).catch(function (error) {
        if (error.status === 401 || error.status === 403) {
          _this2.alertService.showMessage(_config.MESSAGES.permissionsError);
        } else if (error.status === 500) {
          _this2.alertService.showMessage(_config.MESSAGES.serverError);
        } else {
          _this2.alertService.showMessage(_config.MESSAGES.unknownError);
        }
        _this2.routerService.navigate('');
      });
    };

    ViewProblem.prototype.getAssignment = function getAssignment() {
      var _this3 = this;

      this.syllabusService.loadAssignment(this.assignmentId).then(function (data) {
        _this3.startDate = new Date(data.assignment.init_date);
        _this3.endDate = new Date(data.assignment.end_date);
        _this3.assignmentLoaded = true;
        _this3.assignment = new _models.Assignment(data.assignment.tittle, data.assignment.description, data.assignment.init_date, data.assignment.end_date, undefined, data.assignment.syllabus_id, _this3.id);
      }).catch(function (error) {
        if (error.status === 401) {
          _this3.alertService.showMessage(_config.MESSAGES.permissionsError);
        } else {
          _this3.alertService.showMessage(_config.MESSAGES.unknownError);
        }
      });
    };

    ViewProblem.prototype.showES = function showES() {
      if (this.problem.isInSpanish()) {
        this.lang = 'es';
      }
    };

    ViewProblem.prototype.showEN = function showEN() {
      if (this.problem.isInEnglish()) {
        this.lang = 'en';
      }
    };

    ViewProblem.prototype.validateCode = function validateCode() {
      var _this4 = this;

      if (this.code.length === 1) {
        if (this.code[0].type.startsWith('text/') || this.code[0].name.endsWith('.java') || this.code[0].name.endsWith('.cpp') || this.code[0].name.endsWith('.c') || this.code[0].name.endsWith('.cc') || this.code[0].name.endsWith('.cp') || this.code[0].name.endsWith('.cxx') || this.code[0].name.endsWith('.py')) {
          this.sourceValid = true;
          if (this.code[0].name.endsWith('.java')) {
            this.language = 'Java';
            var reader = new FileReader();
            reader.onload = function () {
              var tmp = reader.result.replace(/ /g, '');
              tmp = tmp.replace(/\n|\r\n|\r/g, '');
              if (tmp.search('publicclassMain') < 0) {
                _this4.code = null;
                _this4.sourceValid = false;
                _this4.alertService.showMessage(_config.MESSAGES.invalidJavaClassname);
              }
            };
            reader.readAsText(this.code[0]);
          } else if (this.code[0].name.endsWith('.py')) {
            this.language = 'Python';
          } else if (this.code[0].name.endsWith('.cpp') || this.code[0].name.endsWith('.c') || this.code[0].name.endsWith('.cc') || this.code[0].name.endsWith('.cp') || this.code[0].name.endsWith('.cxx')) {
            this.language = 'C++';
          }
        } else {
          this.code = null;
          this.sourceValid = false;
          this.alertService.showMessage(_config.MESSAGES.invalidCode);
        }
      }
    };

    ViewProblem.prototype.submit = function submit() {
      var _this5 = this;

      if (!this.sourceValid) {
        this.alertService.showMessage(_config.MESSAGES.invalidCode);
      } else if (this.language === null) {
        this.alertService.showMessage(_config.MESSAGES.invalidLanguage);
      } else {
        this.problemService.submitSolution(this.problemId, this.language, this.assignmentProblemId, undefined, this.code[0]).then(function () {
          _this5.alertService.showMessage(_config.MESSAGES.submittedSolution);
          _this5.language = null;
          _this5.code = null;
          _this5.sourceValid = false;
        }).catch(function (error) {
          if (error.status === 401 || error.status === 403) {
            _this5.alertService.showMessage(_config.MESSAGES.permissionsError);
          } else if (error.status === 500) {
            _this5.alertService.showMessage(_config.MESSAGES.serverError);
          } else {
            _this5.alertService.showMessage(_config.MESSAGES.unknownError);
          }
        });
      }
    };

    return ViewProblem;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'now', [_aureliaFramework.observable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'assignmentLoaded', [_aureliaFramework.observable], {
    enumerable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'dateLoaded', [_aureliaFramework.observable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class);
});
define('text!modules/syllabus/view-problem/view-problem.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"../../../resources/attributes/markdown\"></require>\n  <require from=\"../../../resources/attributes/tooltip\"> </require>\n  <require from=\"../../../resources/elements/clock\"></require>\n  <clock date.bind = \"now\" date-loaded.bind=\"dateLoaded\" show-timer.bind=\"false\"></clock>\n  <div class=\"container-fluid\">\n    <ol class=\"breadcrumb\">\n      <li>\n        <a href=\"/clases\">Clases</a>\n      </li>\n      <li>\n        <a href=\"/clases/clases/${assignment.syllabusId}\">Clase actual</a>\n      </li>\n      <li>\n        <a href=\"/clases/tarea/${assignmentId}\">Tarea actual</a>\n      </li>\n      <li class=\"active\" if.bind=\"lang === 'es'\">Problema \"${problem.titleES}\"</li>\n      <li class=\"active\" if.bind=\"lang === 'en'\">Problema \"${problem.titleEN}\"</li>\n    </ol>\n    <div class=\"col-md-9\">\n      <div class=\"ufps-separator-mini\"></div>\n      <div class=\"panel panel-default\">\n        <div class=\"panel-body\" show.bind=\"lang === 'es'\">\n          <h1 class=\"text-center ufps-problem-title\">${problem.titleES}</h1>\n          <p class=\"ufps-language text-center\">\n            <span class=\"${problem.isInSpanish() ? 'active' : 'inactive'}\" click.delegate=\"showES()\">ES</span> |\n            <span class=\"${problem.isInEnglish() ? 'active' : 'inactive'}\" click.delegate=\"showEN()\">EN</span>\n          </p>\n          <p class=\"ufps-markdown-editor\" markdown.bind=\"problem.descriptionES\"></p>\n          <div class=\"col-xs-12\">\n            <div class=\"col-md-6\">\n              <h3 class=\"text-center\">Entrada de ejemplo</h3>\n              <div class=\"well example-in-out\">\n                <pre>${problem.exampleInput}</pre>\n              </div>\n            </div>\n            <div class=\"col-md-6\">\n              <h3 class=\"text-center\">Salida de ejemplo</h3>\n              <div class=\"well example-in-out\">\n                <pre>${problem.exampleOutput}</pre>\n              </div>\n            </div>\n          </div>\n        </div>\n        <div class=\"panel-body\" show.bind=\"lang === 'en'\">\n          <h1 class=\"text-center ufps-problem-title\">${problem.titleEN}</h1>\n          <p class=\"ufps-language text-center\">\n            <span class=\"${problem.isInSpanish() ? 'active' : 'inactive'}\" click.delegate=\"showES()\">ES</span> |\n            <span class=\"${problem.isInEnglish() ? 'active' : 'inactive'}\" click.delegate=\"showEN()\">EN</span>\n          </p>\n          <p class=\"ufps-markdown-editor\" markdown.bind=\"problem.descriptionEN\"></p>\n          <div class=\"col-xs-12\">\n            <div class=\"col-md-6\">\n              <h3 class=\"text-center\">Entrada de ejemplo</h3>\n              <div class=\"well example-in-out\">\n                <pre>${problem.exampleInput}</pre>\n\n              </div>\n            </div>\n            <div class=\"col-md-6\">\n              <h3 class=\"text-center\">Salida de ejemplo</h3>\n              <div class=\"well example-in-out\">\n                <pre>${problem.exampleOutput}</pre>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-md-3\">\n      <div class=\"ufps-separator-mini\"></div>\n      <div class=\"panel panel-default\">\n        <div class=\"panel-body\">\n          <p show.bind=\"lang === 'en'\">\n            <strong>Problema:</strong> ${problem.titleEN}</p>\n          <p show.bind=\"lang === 'es'\">\n            <strong>Problema:</strong> ${problem.titleES}</p>\n          <p>\n            <strong>Dificultad:</strong> ${problem.level}</p>\n          <p if.bind=\"validDate === 1\">\n            <strong>Esta tarea aún no puede ser enviada.</strong> ${assignment.getStringAvailability().replace('Disponible', 'Estará\n            disponible')}\n          </p>\n          <p if.bind=\"validDate === 2\">\n            <strong>Esta tarea ya no puede ser enviada.</strong> ${assignment.getStringAvailability().replace('Disponible', 'Estuvo\n            disponible')}\n          </p>\n          <p if.bind=\"validDate === 0\">Selecciona el archivo con tu código, y el lenguaje a utilizar.</p>\n          <form  if.bind=\"validDate === 0\" class=\"ufps-submit-form\" submit.delegate=\"submit()\" enctype=\"multipart/form-data\">\n            <input type=\"file\" name=\"input-file\" id=\"input-file\" class=\"inputfile-btn\" change.delegate=\"validateCode()\" accept=\".py, .java, .cpp\"\n              files.bind=\"code\">\n            <label for=\"${validDate > 0 ? '' : 'input-file'}\" tooltip data-toggle=\"tooltip\" title=\"Archivo con la solución al problema\">Seleccionar\n              <span class=\"glyphicon glyphicon-ok-sign\" show.bind=\"sourceValid\"></span>\n            </label>\n            <div class=\"input-group\">\n              <select class=\"form-control\" value.bind=\"language\">\n                <option required model.bind=\"null\">Lenguaje...</option>\n                <option repeat.for=\"lg of languages\" model.bind=\"lg\">${lg}</option>\n              </select>\n            </div>\n            <input type=\"submit\" value=\"Enviar\" class=\"btn ufps-btn-submit\">\n          </form>\n          <p if.bind=\"validDate === 2\">Si lo deseas, puedes enviar tu solución en modo práctica. No sumará puntos a la tarea, pero calificará tu solución.</p>\n          <a  if.bind=\"validDate === 2\" href=\"/problemas/${problemId}/detalle\" class=\"btn btn-submit ufps-btn-submit  ufps-btn-edit-problem\">Enviar en modo práctica</a>\n        </div>\n      </div>\n    </div>\n  </div>\n</template>\n"; });
define('modules/syllabus/view-assignment/view-assignment',['exports', 'aurelia-framework', 'config/config', 'models/models', 'services/services'], function (exports, _aureliaFramework, _config, _models, _services) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ViewAssignment = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var ViewAssignment = exports.ViewAssignment = (_dec = (0, _aureliaFramework.inject)(_services.Alert, _services.Auth, _services.Syllabuses), _dec(_class = function () {
    function ViewAssignment(alertService, authService, syllabusService) {
      _classCallCheck(this, ViewAssignment);

      this.alertService = alertService;
      this.authService = authService;
      this.syllabusService = syllabusService;
      this.assignment = new _models.Assignment();
      this.sortDisplay = 'Id';
      this.byDisplay = 'Ascendente';
    }

    ViewAssignment.prototype.activate = function activate(params, routeConfig) {
      this.routeConfig = routeConfig;
      this.id = params.id;
      this.getAssignment();
    };

    ViewAssignment.prototype.getAssignment = function getAssignment() {
      var _this = this;

      this.syllabusService.loadAssignment(this.id).then(function (data) {
        _this.assignment = new _models.Assignment(data.assignment.tittle, data.assignment.description, data.assignment.init_date, data.assignment.end_date, undefined, data.assignment.syllabus_id, _this.id);
        _this.assignment.adjuntProblems(data.assignment.problems);
      }).catch(function (error) {
        if (error.status === 401) {
          _this.alertService.showMessage(_config.MESSAGES.permissionsError);
        } else {
          _this.alertService.showMessage(_config.MESSAGES.unknownError);
        }
      });
    };

    ViewAssignment.prototype.setSort = function setSort(value) {
      this.sortDisplay = value;
      this.sortProblems();
    };

    ViewAssignment.prototype.setBy = function setBy(value) {
      this.byDisplay = value;
      this.sortProblems();
    };

    ViewAssignment.prototype.sortProblems = function sortProblems() {
      if (this.sortDisplay === 'Id' && this.byDisplay === 'Ascendente') this.assignment.problemsLoaded.sort(function (a, b) {
        return parseInt(a.id) - parseInt(b.id);
      });else if (this.sortDisplay === 'Id' && this.byDisplay === 'Descendente') this.assignment.problemsLoaded.sort(function (a, b) {
        return parseInt(b.id) - parseInt(a.id);
      });else if (this.sortDisplay === 'Dificultad' && this.byDisplay === 'Ascendente') this.assignment.problemsLoaded.sort(function (a, b) {
        return parseInt(a.level) - parseInt(b.level);
      });else if (this.sortDisplay === 'Dificultad' && this.byDisplay === 'Descendente') this.assignment.problemsLoaded.sort(function (a, b) {
        return parseInt(b.level) - parseInt(a.level);
      });
    };

    return ViewAssignment;
  }()) || _class);
});
define('text!modules/syllabus/view-assignment/view-assignment.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"../../../resources/attributes/tooltip\"></require>\n  <div class=\"container ufps-container-logged\">\n    <ol class=\"breadcrumb\">\n      <li>\n        <a href=\"/clases\">Clases</a>\n      </li>\n      <li>\n          <a href=\"/clases/clases/${assignment.syllabusId}\">Clase actual</a>\n        </li>\n      <li class=\"active\">Tarea \"${assignment.title}\"</li>\n    </ol>\n    <h1 class=\"text-right\">${assignment.title}</h1>\n    <p class=\"text-right\">${assignment.description}</p>\n    <p class=\"text-right\">${assignment.getStringAvailability()}</p>\n    <hr>\n    <div class=\"col-sm-12\">\n      Ordenar por\n      <div class=\"dropdown dropdown-inline ufps-dropdown\">\n        <button class=\"btn btn-default dropdown-toggle\" type=\"button\" id=\"sortBy\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"true\">\n          ${sortDisplay}\n          <span class=\"caret\"></span>\n        </button>\n        <ul class=\"dropdown-menu ufps-dropdown-menu dropdown-mini\" aria-labelledby=\"sortBy\">\n          <li>\n            <a click.delegate=\"setSort('Id')\">Id</a>\n          </li>\n          <li>\n            <a click.delegate=\"setSort('Dificultad')\">Dificultad</a>\n          </li>\n        </ul>\n      </div>\n      en forma\n      <div class=\"dropdown dropdown-inline ufps-dropdown\">\n        <button class=\"btn btn-default dropdown-toggle\" type=\"button\" id=\"orderBy\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"true\">\n          ${byDisplay}\n          <span class=\"caret\"></span>\n        </button>\n        <ul class=\"dropdown-menu ufps-dropdown-menu dropdown-mini\" aria-labelledby=\"orderBy\">\n          <li>\n            <a click.delegate=\"setBy('Ascendente')\">Ascendente</a>\n          </li>\n          <li>\n            <a click.delegate=\"setBy('Descendente')\">Descendente</a>\n          </li>\n        </ul>\n      </div>\n    </div>\n    <div class=\"ufps-separator\"></div>\n    <table>\n      <thead>\n        <tr>\n          <th class=\"text-center\" style=\"width:5%\">Id</th>\n          <th class=\"text-center\" style=\"width:70%\">Problema</th>\n          <th class=\"text-center\" style=\"width:10%\">Dificultad</th>\n          <th class=\"text-center\" style=\"width:15%\">Idioma</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr repeat.for=\"problem of assignment.problemsLoaded\">\n          <td class=\"text-center\">${problem.id}</td>\n          <td class=\"text-left ufps-td-problem\">\n            <p if.bind=\"problem.isInSpanish() && language !== 'Inglés'\" class=\"ufps-name-problem-list\">\n              <a route-href=\"route: ViewProblem; params.bind: {assignmentProblemId:problem.auxiliarId, assignmentId:assignment.id, problemId: problem.id, lang: 'es'}\">${problem.titleES}</a>\n            </p>\n            <p if.bind=\"!problem.isInSpanish() || (problem.isInEnglish() && language === 'Inglés')\" class=\"ufps-name-problem-list\">\n              <a route-href=\"route: ViewProblem; params.bind: {assignmentProblemId:problem.auxiliarId, assignmentId:assignment.id, problemId: problem.id, lang: 'en'}\">${problem.titleEN}</a>\n            </p>\n          </td>\n          <td class=\"text-center\">${problem.level}</td>\n          <td class=\"text-center ufps-language\">\n            <span class=\"${problem.isInSpanish() ? 'active' : 'inactive'}\">\n              <a route-href=\"route: ViewProblem; params.bind: {assignmentProblemId:problem.auxiliarId, assignmentId:assignment.id, problemId: problem.id, lang: 'es'}\">ES</a>\n            </span> |\n            <span class=\"${problem.isInEnglish() ? 'active' : 'inactive'}\">\n              <a route-href=\"route: ViewProblem; params.bind: {assignmentProblemId:problem.auxiliarId, assignmentId:assignment.id, problemId: problem.id, lang: 'en'}\">EN</a>\n            </span>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n</template>\n"; });
define('modules/syllabus/syllabus',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Syllabus = exports.Syllabus = function () {
    function Syllabus() {
      _classCallCheck(this, Syllabus);
    }

    Syllabus.prototype.configureRouter = function configureRouter(config, router) {
      config.map([{
        route: '',
        name: 'syllabus',
        moduleId: 'modules/syllabus/home-syllabus/home-syllabus',
        title: 'Clases',
        settings: {
          roles: ['coach', 'student']
        }
      }, {
        name: 'SyllabusDetail',
        route: 'clases/:id',
        moduleId: 'modules/syllabus/syllabus-detail/syllabus-detail',
        title: 'Clase',
        settings: {
          roles: ['coach', 'student']
        }
      }, {
        name: 'SyllabusStatistics',
        route: 'clases/:id/estadisticas',
        moduleId: 'modules/syllabus/syllabus-statistics/syllabus-statistics',
        title: 'Estadísticas de la clase',
        settings: {
          roles: ['coach']
        }
      }, {
        name: 'CreateAssignment',
        route: 'nueva-tarea/:id',
        moduleId: 'modules/syllabus/create-assignment/create-assignment',
        title: 'Nueva tarea',
        settings: {
          roles: ['coach']
        }
      }, {
        name: 'EditAssignment',
        route: 'editar-tarea/:id',
        moduleId: 'modules/syllabus/create-assignment/edit-assignment',
        title: 'Editar tarea',
        settings: {
          roles: ['coach']
        }
      }, {
        name: 'StatsAssignment',
        route: 'estadisticas/:id',
        moduleId: 'modules/syllabus/assignment-stats/assignment-stats',
        title: 'Estadísticas de la tarea',
        settings: {
          roles: ['coach']
        }
      }, {
        name: 'AssignmentDetail',
        route: 'estadisticas/:idAssignment/problema/:idAssignmentProblem/:idProblem',
        moduleId: 'modules/syllabus/assignment-detail/assignment-detail',
        title: 'Tarea',
        settings: {
          roles: ['coach']
        }
      }, {
        name: 'ViewAssignment',
        route: 'tarea/:id',
        moduleId: 'modules/syllabus/view-assignment/view-assignment',
        title: 'Tarea',
        settings: {
          roles: ['student']
        }
      }, {
        name: 'ViewProblem',
        route: ['tarea/:assignmentId/problema/:problemId/:assignmentProblemId', 'tarea/:assignmentId/problema/:problemId/:assignmentProblemId/:lang'],
        moduleId: 'modules/syllabus/view-problem/view-problem',
        title: 'Problema',
        settings: {
          roles: ['student']
        }
      }]);
      this.router = router;
    };

    return Syllabus;
  }();
});
define('text!modules/syllabus/syllabus.html', ['module'], function(module) { module.exports = "<template>\n  <div slot=\"content\" class=\"body-slot\">\n    <router-view></router-view>\n  </div>\n</template>\n"; });
define('modules/syllabus/syllabus-statistics/syllabus-statistics',['exports', 'aurelia-framework', 'config/config', 'services/services'], function (exports, _aureliaFramework, _config, _services) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SyllabusStatistics = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _class, _desc, _value, _class2, _descriptor;

  var SyllabusStatistics = exports.SyllabusStatistics = (_dec = (0, _aureliaFramework.inject)(_services.Alert, _services.Syllabuses), _dec(_class = (_class2 = function () {
    function SyllabusStatistics(alertService, syllabusService) {
      _classCallCheck(this, SyllabusStatistics);

      _initDefineProp(this, 'page', _descriptor, this);

      this.alertService = alertService;
      this.syllabusService = syllabusService;
      this.page = 1;
      this.totalPages = 1;
      this.users = [];
    }

    SyllabusStatistics.prototype.pageChanged = function pageChanged(act, prev) {
      if (prev !== undefined) this.getStatistics();
    };

    SyllabusStatistics.prototype.activate = function activate(params, routeConfig) {
      this.routeConfig = routeConfig;
      this.id = params.id;
      this.getStatistics();
    };

    SyllabusStatistics.prototype.getStatistics = function getStatistics() {
      var _this = this;

      this.syllabusService.getStatistics(this.id, 30, this.page).then(function (data) {
        _this.totalPages = data.meta.totalPages;
        if (_this.totalPages > 0) _this.users = data.data;
      }).catch(function (error) {
        if (error.status === 404) {
          _this.alertService.showMessage(_config.MESSAGES.unknownError);
        } else {
          _this.alertService.showMessage(_config.MESSAGES.serverError);
        }
      });
    };

    return SyllabusStatistics;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'page', [_aureliaFramework.observable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class);
});
define('text!modules/syllabus/syllabus-statistics/syllabus-statistics.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"../../../resources/elements/filter\"></require>\n  <require from=\"../../../resources/elements/paginator\"></require>\n  <div class=\"container\">\n    <ol class=\"breadcrumb\">\n      <li>\n        <a href=\"/clases\">Clases</a>\n      </li>\n      <li class=\"active\">Clasificación de la clase actual</li>\n    </ol>\n    <h1 class=\"text-right\">Clasificación de la clase</h1>\n    <hr>\n    <table>\n      <thead>\n        <tr>\n          <th class=\"text-center\" style=\"width:5%\">Puesto</th>\n          <th class=\"text-center\" style=\"width:75%\">Usuario</th>\n          <th class=\"text-center\" style=\"width:10%\">Soluciones correctas</th>\n          <th class=\"text-center\" style=\"width:10%\">Envios realizados</th>\n\n        </tr>\n      </thead>\n      <tbody>\n        <tr repeat.for=\"user of users\">\n          <td class=\"text-center\">${($index + 1) + ((page - 1) * 30)}</td>\n          <td>${user.name}</td>\n          <td class=\"text-center\">${user.accepted}</td>\n          <td class=\"text-center\">${user.total}</td>\n        </tr>\n        <tr if.bind=\"users.length === 0\">\n          <td></td>\n          <td>No hay usuarios actualmente registrados en esta clase.</td>\n          <td>\n          </td>\n          <td>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n    <paginator page.bind=\"page\" total-pages.bind=\"totalPages\"></paginator>\n  </div>\n</template>\n"; });
define('modules/syllabus/syllabus-detail/syllabus-detail',['exports', 'aurelia-framework', 'aurelia-router', 'config/config', 'models/models', 'services/services'], function (exports, _aureliaFramework, _aureliaRouter, _config, _models, _services) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SyllabusDetail = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _class, _desc, _value, _class2, _descriptor;

  var SyllabusDetail = exports.SyllabusDetail = (_dec = (0, _aureliaFramework.inject)(_services.Alert, _services.Auth, _services.Syllabuses, _aureliaRouter.Router), _dec(_class = (_class2 = function () {
    function SyllabusDetail(alertService, authService, syllabusService, router) {
      _classCallCheck(this, SyllabusDetail);

      _initDefineProp(this, 'page', _descriptor, this);

      this.alertService = alertService;
      this.authService = authService;
      this.syllabusService = syllabusService;
      this.router = router;
      this.syllabus = new _models.Syllabus();
      this.newMaterials = '';
      this.materials = [];
      this.page = 1;
      this.totalPages = 1;
      this.users = [];
    }

    SyllabusDetail.prototype.pageChanged = function pageChanged(act, prev) {
      if (prev !== undefined) this.getUsers();
    };

    SyllabusDetail.prototype.activate = function activate(params, routeConfig) {
      this.routeConfig = routeConfig;
      this.id = params.id;
      this.getSyllabus();
      this.getMaterials();
      this.getUsers();
    };

    SyllabusDetail.prototype.getSyllabus = function getSyllabus() {
      var _this = this;

      this.syllabusService.getSyllabus(this.id).then(function (data) {
        _this.syllabus = new _models.Syllabus(data.syllabus.id, data.syllabus.tittle, data.syllabus.description, data.syllabus.public, undefined, true, data.syllabus.assignments);
      }).catch(function (error) {
        if (error.status === 401) {
          _this.alertService.showMessage(_config.MESSAGES.permissionsError);
        } else {
          _this.alertService.showMessage(_config.MESSAGES.unknownError);
        }
      });
    };

    SyllabusDetail.prototype.getMaterials = function getMaterials() {
      var _this2 = this;

      this.syllabusService.loadMaterials(this.id).then(function (data) {
        _this2.materials = [];
        for (var i = 0; i < data.syllabus.materials.length; i++) {
          _this2.materials.push(new _models.Material(data.syllabus.materials[i].id, data.syllabus.materials[i].name, data.syllabus.materials[i].category_id, data.syllabus.materials[i].description, undefined, data.syllabus.materials[i].url, undefined, undefined));
        }
      }).catch(function (error) {
        if (error.status === 401) {
          _this2.alertService.showMessage(_config.MESSAGES.permissionsError);
        } else {
          _this2.alertService.showMessage(_config.MESSAGES.unknownError);
        }
      });
    };

    SyllabusDetail.prototype.validateMaterialsIds = function validateMaterialsIds() {
      var materialsTemp = this.newMaterials.replace(/ /g, '');
      materialsTemp = materialsTemp.split(',');
      var materialsArr = [];
      for (var i = 0; i < materialsTemp.length; i++) {
        if (materialsTemp[i].length > 0 && !isNaN(parseInt(materialsTemp[i]))) materialsArr.push(parseInt(materialsTemp[i]));else if (isNaN(parseInt(materialsTemp[i]))) return false;
      }
      this.newMaterials = materialsArr;
      return true;
    };

    SyllabusDetail.prototype.addMaterials = function addMaterials() {
      var _this3 = this;

      if (this.validateMaterialsIds()) {
        this.syllabusService.addMaterials(this.id, this.newMaterials).then(function () {
          _this3.newMaterials = '';
          _this3.alertService.showMessage(_config.MESSAGES.addedMaterial);
          _this3.getMaterials();
        }).catch(function (error) {
          _this3.newMaterials = '';
          if (error.status === 401) {
            _this3.alertService.showMessage(_config.MESSAGES.permissionsError);
          } else {
            _this3.alertService.showMessage(_config.MESSAGES.unknownError);
          }
        });
      } else {
        this.alertService.showMessage(_config.MESSAGES.invalidIdMaterial);
      }
    };

    SyllabusDetail.prototype.showRemoveMaterial = function showRemoveMaterial(id) {
      this.materialToRemove = id;
      window.$('#remove-material').modal('show');
    };

    SyllabusDetail.prototype.removeMaterial = function removeMaterial() {
      var _this4 = this;

      this.syllabusService.removeMaterial(this.id, this.materialToRemove).then(function () {
        _this4.alertService.showMessage(_config.MESSAGES.materialDeleted);
        _this4.getMaterials();
        window.$('#remove-material').modal('hide');
      }).catch(function (error) {
        if (error.status === 401 || error.status === 403) {
          _this4.alertService.showMessage(_config.MESSAGES.permissionsError);
        } else if (error.status === 500) {
          _this4.alertService.showMessage(_config.MESSAGES.serverError);
        } else {
          _this4.alertService.showMessage(_config.MESSAGES.unknownError);
        }
        window.$('#remove-problem').modal('hide');
      });
    };

    SyllabusDetail.prototype.showModalExit = function showModalExit() {
      window.$('#remove-user').modal('show');
    };

    SyllabusDetail.prototype.removeUser = function removeUser() {
      var _this5 = this;

      this.syllabusService.removeUser(this.id).then(function () {
        _this5.alertService.showMessage(_config.MESSAGES.syllabusUnenroll);
        window.$('#remove-user').modal('hide');
        _this5.router.navigate('/clases');
      }).catch(function (error) {
        if (error.status === 401 || error.status === 403) {
          _this5.alertService.showMessage(_config.MESSAGES.permissionsError);
        } else if (error.status === 500) {
          _this5.alertService.showMessage(_config.MESSAGES.serverError);
        } else {
          _this5.alertService.showMessage(_config.MESSAGES.unknownError);
        }
        window.$('#remove-user').modal('hide');
      });
    };

    SyllabusDetail.prototype.getUsers = function getUsers() {
      var _this6 = this;

      this.syllabusService.getStatistics(this.id, 15, this.page).then(function (data) {
        _this6.totalPages = data.meta.totalPages;
        _this6.users = [];
        if (_this6.totalPages > 0) _this6.users = data.data;
      }).catch(function (error) {
        if (error.status === 404) {
          _this6.alertService.showMessage(_config.MESSAGES.unknownError);
        } else {
          _this6.alertService.showMessage(_config.MESSAGES.serverError);
        }
      });
    };

    SyllabusDetail.prototype.showModalRemove = function showModalRemove(id) {
      this.userToRemove = id;
      window.$('#remove-user-coach').modal('show');
    };

    SyllabusDetail.prototype.removeUserFromCoach = function removeUserFromCoach() {
      var _this7 = this;

      this.syllabusService.removeUserFromCoach(this.id, this.userToRemove).then(function () {
        _this7.alertService.showMessage(_config.MESSAGES.userDeletedSyllabus);
        window.$('#remove-user-coach').modal('hide');
      }).catch(function (error) {
        if (error.status === 401 || error.status === 403) {
          _this7.alertService.showMessage(_config.MESSAGES.permissionsError);
        } else if (error.status === 500) {
          _this7.alertService.showMessage(_config.MESSAGES.serverError);
        } else {
          _this7.alertService.showMessage(_config.MESSAGES.unknownError);
        }
        window.$('#remove-user-coach').modal('hide');
      });
    };

    return SyllabusDetail;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'page', [_aureliaFramework.observable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class);
});
define('text!modules/syllabus/syllabus-detail/syllabus-detail.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"../../../resources/attributes/tooltip\"></require>\n  <div class=\"container ufps-container-logged\">\n    <ol class=\"breadcrumb\">\n      <li>\n        <a href=\"/clases\">Clases</a>\n      </li>\n      <li class=\"active\">${syllabus.title}</li>\n    </ol>\n    <div class=\"col-md-9\">\n      <h1>${syllabus.title}</h1>\n    </div>\n    <div class=\"col-md-3 text-right\" if.bind=\"authService.isStudent()\">\n      <h1>\n        <a click.delegate=\"showModalExit()\" class=\"btn ufps-btn btn-default ufps-btn-default\">Salir de esta clase</a>\n      </h1>\n    </div>\n    <div class=\"fix\"></div>\n    <div class=\"col-md-12\">\n      <p>${syllabus.description}</p>\n    </div>\n    <div class=\"ufps-separator-mini\"></div>\n    <h2 class=\"text-right\">Tareas</h2>\n    <hr>\n    <div repeat.for=\"assignment of syllabus.assignments\" class=\"col-xs-12 col-sm-6 col-md-4 col-lg-3 ufps-card-container\">\n\n      <div class=\"ufps-card\">\n        <a route-href=\"route: ViewAssignment; params.bind: {id:assignment.id}\" if.bind=\"authService.isStudent()\">\n          <div class=\"ufps-card-title\">\n            <h1>${assignment.title}</h1>\n          </div>\n        </a>\n        <div if.bind=\"authService.isCoach()\" class=\"ufps-card-title\">\n          <h1>${assignment.title}</h1>\n        </div>\n        <div if.bind=\"authService.isStudent()\" class=\"col-xs-12 ufps-card-link\">\n          <a route-href=\"route: ViewAssignment; params.bind: {id:assignment.id}\" class=\"ufps-font-size-small\">${assignment.getStringDate()}</a>\n        </div>\n        <div if.bind=\"authService.isCoach()\" class=\"col-xs-6 ufps-card-link\">\n          <a route-href=\"route: EditAssignment; params.bind: {id:assignment.id}\">Editar tarea</a>\n        </div>\n        <div if.bind=\"authService.isCoach()\" class=\"col-xs-6 ufps-card-link\">\n          <a route-href=\"route: StatsAssignment; params.bind: {id:assignment.id}\">Estadísticas</a>\n        </div>\n        <div class=\"fix\"></div>\n      </div>\n\n    </div>\n    <div if.bind=\"authService.isCoach()\" class=\"col-xs-12 col-sm-6 col-md-4 col-lg-3 ufps-card-new ufps-card-container\">\n      <a route-href=\"route: CreateAssignment; params.bind: {id:id}\">\n        <div class=\"ufps-card\">\n          <div class=\"ufps-card-title\">\n            <h1>\n              <span class=\"glyphicon glyphicon-plus\"></span>\n            </h1>\n          </div>\n          <div class=\"col-xs-12 ufps-card-link\">\n            Nueva tarea\n          </div>\n          <div class=\"fix\"></div>\n        </div>\n      </a>\n    </div>\n    <div class=\"fix\"></div>\n    <h2 class=\"text-right\">Lecturas</h2>\n    <hr>\n    <div class=\"form-horizontal\">\n      <form if.bind=\"authService.isCoach()\" submit.delegate=\"addMaterials()\">\n        <div class=\"form-group col-sm-10\">\n          <label class=\"control-label col-sm-3\" for=\"problem-name\">Añadir material:</label>\n          <div class=\"col-sm-9 input-group ufps-input-creator\">\n            <input type=\"text\" class=\"form-control\" placeholder=\"Ingresa el id de los materiales separados por comas\" value.bind=\"newMaterials\"\n              required>\n            <span class=\"input-group-addon\" tooltip data-toggle=\"tooltip\" title=\"Si el material no está en la plataforma, agreguelo a una categoría y luego ingrese aqui su id\">\n              <span class=\"glyphicon glyphicon-question-sign\"></span>\n            </span>\n          </div>\n        </div>\n        <div class=\"col-sm-2 text-center\">\n          <input type=\"submit\" value=\"Añadir\" class=\"btn ufps-btn ufps-btn-default\">\n        </div>\n      </form>\n    </div>\n    <div class=\"container\">\n      <table>\n        <thead>\n          <tr>\n            <th class=\"text-center\">Id</th>\n            <th class=\"text-center\">Nombre</th>\n            <th class=\"text-right\">Acción</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr repeat.for=\"material of materials\">\n            <td class=\"text-center\">${material.id}</td>\n            <td class=\"ufps-td-problem\">\n              <p class=\"ufps-name-problem-list\">\n                  <a href=\"/materials/${material.category}/material/${material.id}\" target=\"blank\">${material.name}</a>\n              </p>\n              \n            </td>\n            <td class=\"text-right\">\n              <a class=\"ufps-btn btn ufps-btn-default\" href=\"/materials/${material.category}/material/${material.id}\" target=\"blank\">Abrir</a>\n              <a class=\"ufps-btn btn ufps-btn-default\" if.bind=\"authService.isCoach()\" click.delegate=\"showRemoveMaterial(material.id)\">Eliminar</a>\n            </td>\n          </tr>\n          <tr if.bind=\"materials.length === 0\">\n            <td></td>\n            <td>\n              No se ha añadido ningún material\n            </td>\n            <td></td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n\n    <div if.bind=\"authService.isCoach()\">\n      <div class=\"fix\"></div>\n      <div class=\"ufps-separator\"></div>\n      <h2 class=\"text-right\">Usuarios</h2>\n      <hr>\n      <div class=\"container\">\n        <table>\n          <thead>\n            <tr>\n              <th class=\"text-center\" style=\"width:85%\">Nombre</th>\n              <th class=\"text-center\" style=\"width:15%\">Acción</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr repeat.for=\"user of users\">\n              <td>${user.name}</td>\n              <td class=\"text-center\">\n                <a class=\"ufps-btn btn ufps-btn-default btn-default\" click.delegate=\"showModalRemove(user.id)\">Eliminar</a>\n              </td>\n            </tr>\n            <tr if.bind=\"users.length === 0\">\n              <td>No hay usuarios actualmente registrados en esta clase.</td>\n              <td>\n              </td>\n            </tr>\n          </tbody>\n        </table>\n        <paginator page.bind=\"page\" total-pages.bind=\"totalPages\"></paginator>\n      </div>\n    </div>\n  </div>\n\n\n  <!--MODAL PARA ELIMINAR PROBLEMA-->\n  <div if.bind=\"authService.isCoach()\" class=\"modal fade\" id=\"remove-material\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"remove-material\">\n    <div class=\"modal-dialog\" role=\"document\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header text-center\">\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n            <span aria-hidden=\"true\">&times;</span>\n          </button>\n          <h4 class=\"modal-title\">¿Estás seguro de eliminar este material?</h4>\n          <br>\n          <p>Esto solo eliminará el material de la clase actual. El material seguirá disponible en la sección pública.</p>\n\n          <button class=\"btn btn-default ufps-btn-default\" click.delegate=removeMaterial()>Si</button>\n          <button class=\"btn btn-default ufps-btn-default\" data-dismiss=\"modal\" aria-label=\"Close\">No</button>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <!--MODAL PARA DESUNSCRIBIRSE-->\n  <div if.bind=\"authService.isStudent()\" class=\"modal fade\" id=\"remove-user\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"remove-user\">\n    <div class=\"modal-dialog\" role=\"document\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header text-center\">\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n            <span aria-hidden=\"true\">&times;</span>\n          </button>\n          <h4 class=\"modal-title\">¿Estás seguro de salir de esta clase?</h4>\n          <br>\n          <p>Al desmatricularte perderás el acceso a ella, y el progreso realizado.</p>\n\n          <button class=\"btn btn-default ufps-btn-default\" click.delegate=removeUser()>Si</button>\n          <button class=\"btn btn-default ufps-btn-default\" data-dismiss=\"modal\" aria-label=\"Close\">No</button>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <!--MODAL PARA DESUNSCRIBIRSE-->\n  <div if.bind=\"authService.isCoach()\" class=\"modal fade\" id=\"remove-user-coach\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"remove-user-coach\">\n    <div class=\"modal-dialog\" role=\"document\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header text-center\">\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n            <span aria-hidden=\"true\">&times;</span>\n          </button>\n          <h4 class=\"modal-title\">¿Estás seguro de eliminar este usuario de la clase?</h4>\n          <br>\n          <p>Esto no eliminará al usuario de la plataforma, solo de la clase actual.</p>\n\n          <button class=\"btn btn-default ufps-btn-default\" click.delegate=removeUserFromCoach()>Si</button>\n          <button class=\"btn btn-default ufps-btn-default\" data-dismiss=\"modal\" aria-label=\"Close\">No</button>\n        </div>\n      </div>\n    </div>\n  </div>\n</template>\n"; });
define('modules/syllabus/home-syllabus/home-syllabus',['exports', 'aurelia-framework', 'config/config', 'models/models', 'services/services'], function (exports, _aureliaFramework, _config, _models, _services) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.HomeSyllabus = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _class, _desc, _value, _class2, _descriptor;

  var HomeSyllabus = exports.HomeSyllabus = (_dec = (0, _aureliaFramework.inject)(_services.Alert, _services.Auth, _services.Syllabuses), _dec(_class = (_class2 = function () {
    function HomeSyllabus(alertService, authService, syllabusService) {
      _classCallCheck(this, HomeSyllabus);

      _initDefineProp(this, 'generalPage', _descriptor, this);

      this.alertService = alertService;
      this.authService = authService;
      this.syllabusService = syllabusService;
      this.syllabusToShow = this.authService.isCoach() ? 7 : 8;
      this.generalPage = 1;
      this.generalTotalPages = 1;
      this.syllabuses = [];
      this.enrolledSyllabuses = [];
      this.syllabusesLoaded = true;
      this.enrolledSyllabusesLoaded = true;
      this.newSyllabus = new _models.Syllabus();
      this.editSyllabus = new _models.Syllabus();
      this.syllabusToRemove = new _models.Syllabus();
      this.syllabusToEnroll = new _models.Syllabus();
      this.options = [true, false];
    }

    HomeSyllabus.prototype.created = function created() {
      this.getSyllabuses();
    };

    HomeSyllabus.prototype.generalPageChanged = function generalPageChanged(act, prev) {
      if (prev !== undefined) this.getSyllabuses();
    };

    HomeSyllabus.prototype.getSyllabuses = function getSyllabuses() {
      var _this = this;

      var coachId = null;
      if (this.authService.isCoach()) coachId = this.authService.getUserId();
      this.syllabusService.getSyllabuses(this.syllabusToShow, this.generalPage, coachId).then(function (data) {
        _this.generalTotalPages = data.meta.totalPages;
        if (_this.syllabuses.length === 0) {
          _this.syllabusesLoaded = false;
        }
        if (_this.generalTotalPages > 0) {
          _this.syllabuses = data.data;
        } else {
          _this.alertService.showMessage(_config.MESSAGES.syllabusesEmpty);
        }
        if (_this.authService.isStudent()) _this.getEnrolledSyllabuses();
      }).catch(function (error) {
        _this.syllabusesLoaded = false;
        if (error.status === 401) {
          _this.alertService.showMessage(_config.MESSAGES.permissionsError);
        } else {
          _this.alertService.showMessage(_config.MESSAGES.unknownError);
        }
      });
    };

    HomeSyllabus.prototype.getEnrolledSyllabuses = function getEnrolledSyllabuses() {
      var _this2 = this;

      this.enrolledSyllabuses = [];
      this.syllabusService.getEnrolledSyllabuses().then(function (data) {
        for (var i = 0; i < data.user.syllabuses.length; i++) {
          for (var j = 0; j < _this2.syllabuses.length; j++) {
            if (_this2.syllabuses[j].id === data.user.syllabuses[i]) {
              _this2.syllabuses[j].enrolled = true;
              _this2.enrolledSyllabuses.push(_this2.syllabuses[j]);
            }
          }
        }
        if (_this2.enrolledSyllabuses.length === 0) {
          _this2.enrolledSyllabusesLoaded = false;
        }
      }).catch(function (error) {
        _this2.enrolledSyllabusesLoaded = false;
        if (error.status === 401) {
          _this2.alertService.showMessage(_config.MESSAGES.permissionsError);
        } else {
          _this2.alertService.showMessage(_config.MESSAGES.unknownError);
        }
      });
    };

    HomeSyllabus.prototype.createSyllabus = function createSyllabus() {
      var _this3 = this;

      if (!this.newSyllabus.privacy && (this.newSyllabus.key === null || this.newSyllabus.key === undefined || this.newSyllabus.key === '')) {
        this.alertService.showMessage(_config.MESSAGES.syllabusKeyNeeded);
      }
      this.syllabusService.registerSyllabus(this.newSyllabus).then(function (data) {
        _this3.getSyllabuses();
        _this3.alertService.showMessage(_config.MESSAGES.syllabusCreated);
        window.$('#new-syllabus').modal('hide');
        _this3.newSyllabus = new _models.Syllabus();
      }).catch(function () {
        _this3.alertService.showMessage(_config.MESSAGES.unknownError);
        window.$('#new-syllabus').modal('hide');
      });
    };

    HomeSyllabus.prototype.showEditSyllabus = function showEditSyllabus(id, title, description, privacy) {
      this.editSyllabus = new _models.Syllabus(id, title, description, privacy, '');
      window.$('#edit-syllabus').modal('show');
    };

    HomeSyllabus.prototype.modifySyllabus = function modifySyllabus() {
      var _this4 = this;

      if (!this.editSyllabus.privacy && (this.editSyllabus.key === null || this.editSyllabus.key === undefined || this.editSyllabus.key === '')) {
        this.alertService.showMessage(_config.MESSAGES.syllabusKeyNeeded);
      } else {
        this.syllabusService.editSyllabus(this.editSyllabus).then(function () {
          _this4.syllabuses.find(function (i) {
            return i.id === _this4.editSyllabus.id;
          }).tittle = _this4.editSyllabus.title;
          _this4.alertService.showMessage(_config.MESSAGES.syllabusEdited);
          window.$('#edit-syllabus').modal('hide');
        }).catch(function (error) {
          if (error.status === 401 || error.status === 403) {
            _this4.alertService.showMessage(_config.MESSAGES.permissionsError);
          } else if (error.status === 500) {
            _this4.alertService.showMessage(_config.MESSAGES.serverError);
          } else {
            _this4.alertService.showMessage(_config.MESSAGES.unknownError);
          }
          window.$('#edit-syllabus').modal('hide');
        });
      }
    };

    HomeSyllabus.prototype.showRemoveSyllabus = function showRemoveSyllabus(id, name) {
      this.syllabusToRemove = new _models.Syllabus(id, name);
      window.$('#remove-syllabus').modal('show');
    };

    HomeSyllabus.prototype.removeSyllabus = function removeSyllabus() {
      var _this5 = this;

      this.syllabusService.removeSyllabus(this.syllabusToRemove.id).then(function () {
        _this5.syllabuses.splice(_this5.syllabuses.findIndex(function (i) {
          return i.id === _this5.syllabusToRemove.id;
        }), 1);
        _this5.alertService.showMessage(_config.MESSAGES.syllabusRemoved);
        window.$('#remove-syllabus').modal('hide');
      }).catch(function (error) {
        if (error.status === 401 || error.status === 403) {
          _this5.alertService.showMessage(_config.MESSAGES.permissionsError);
        } else if (error.status === 500) {
          _this5.alertService.showMessage(_config.MESSAGES.serverError);
        } else {
          _this5.alertService.showMessage(_config.MESSAGES.unknownError);
        }
        window.$('#remove-syllabys').modal('hide');
      });
    };

    HomeSyllabus.prototype.showEnrollSyllabus = function showEnrollSyllabus(id, name, description, privacy) {
      this.syllabusToEnroll = new _models.Syllabus(id, name, description, privacy, '');
      window.$('#enroll-syllabus').modal('show');
    };

    HomeSyllabus.prototype.enrollSyllabus = function enrollSyllabus() {
      var _this6 = this;

      if (this.syllabusToEnroll.privacy) this.syllabusToEnroll.key = undefined;
      if (!this.syllabusToEnroll.privacy && (this.syllabusToEnroll.key === null || this.syllabusToEnroll.key === undefined || this.editSyllabus.key === '')) {
        this.alertService.showMessage(_config.MESSAGES.syllabusKeyNeeded);
      } else {
        this.syllabusService.enrollSyllabus(this.syllabusToEnroll.id, this.syllabusToEnroll.key).then(function (data) {
          _this6.alertService.showMessage(_config.MESSAGES.enrolledInSyllabus);
          _this6.getEnrolledSyllabuses();
          window.$('#enroll-syllabus').modal('hide');
        }).catch(function (error) {
          _this6.alertService.showMessage(_config.MESSAGES.unknownError);
          window.$('#enroll-syllabus').modal('hide');
        });
      }
    };

    return HomeSyllabus;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'generalPage', [_aureliaFramework.observable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class);
});
define('text!modules/syllabus/home-syllabus/home-syllabus.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"../../../resources/attributes/tooltip\"></require>\n  <require from=\"../../../resources/elements/paginator\"></require>\n  <div if.bind=\"authService.isStudent()\" class=\"container ufps-container-logged\">\n    <h1 class=\"text-right\">Mis clases</h1>\n    <hr>\n    <div class=\"text-center\" if.bind=\"!enrolledSyllabusesLoaded\">\n      <p>Actualmente no tienes ninguna clase inscrita.</p>\n    </div>\n    <div repeat.for=\"syllabus of enrolledSyllabuses\" class=\"col-xs-12 col-sm-6 col-md-4 col-lg-3 ufps-card-container\">\n      <a route-href=\"route: SyllabusDetail; params.bind: {id:syllabus.id}\">\n        <div class=\"ufps-card\">\n          <div class=\"ufps-card-title\">\n            <h1>${syllabus.tittle}</h1>\n          </div>\n          <div class=\"col-xs-6 ufps-card-link\">\n            <a route-href=\"route: SyllabusDetail; params.bind: {id:syllabus.id}\">Ver clase</a>\n          </div>\n          <div class=\"col-xs-6 ufps-card-link\">\n            <a route-href=\"route: SyllabusStatistics; params.bind: {id:syllabus.id}\">Detalle</a>\n          </div>\n          <div class=\"fix\"></div>\n        </div>\n      </a>\n    </div>\n  </div>\n  <div class=\"container ufps-container-logged\">\n    <h1 class=\"text-right\" if.bind=\"authService.isStudent()\">Clases disponibles</h1>\n    <h1 class=\"text-right\" if.bind=\"authService.isCoach()\">Mis clases</h1>\n    <hr>\n    <div repeat.for=\"syllabus of syllabuses\" class=\"col-xs-12 col-sm-6 col-md-4 col-lg-3 ufps-card-container\">\n      <div class=\"ufps-card\">\n        <div class=\"ufps-card-title\">\n          <span if.bind=\"authService.isCoach()\" class=\"ufps-edit-category glyphicon glyphicon-pencil\" data-toggle=\"tooltip\" title=\"Editar los datos de la clase\"\n            click.delegate=\"showEditSyllabus(syllabus.id, syllabus.tittle, syllabus.description, syllabus.public)\" tooltip></span>\n          <span if.bind=\"authService.isCoach()\" class=\"ufps-remove-category glyphicon glyphicon-remove\" data-toggle=\"tooltip\" title=\"Eliminar la clase\"\n            click.delegate=\"showRemoveSyllabus(syllabus.id, syllabus.tittle)\" tooltip></span>\n          <h1>${syllabus.tittle}</h1>\n        </div>\n        <div if.bind=\"authService.isCoach()\" class=\"col-xs-6 ufps-card-link\">\n          <a route-href=\"route: SyllabusDetail; params.bind: {id:syllabus.id}\">Detalle</a>\n        </div>\n        <div if.bind=\"authService.isCoach()\" class=\"col-xs-6 ufps-card-link\">\n          <a route-href=\"route: SyllabusStatistics; params.bind: {id:syllabus.id}\">Estadísticas</a>\n        </div>\n        <div if.bind=\"authService.isStudent()\" class=\"col-xs-6 ufps-card-link\">\n          <span if.bind=\"syllabus.public\">Público</span>\n          <span if.bind=\"!syllabus.public\">Privado</span>\n        </div>\n        <div if.bind=\"authService.isStudent() && !syllabus.enrolled\" class=\"col-xs-6 ufps-card-link\">\n          <a click.delegate=\"showEnrollSyllabus(syllabus.id, syllabus.tittle, syllabus.description, syllabus.public)\">Registrarse</a>\n        </div>\n        <div if.bind=\"authService.isStudent() && syllabus.enrolled\" class=\"col-xs-6 ufps-card-link\">\n          <span>Registrado</a>\n        </div>\n        <div class=\"fix\"></div>\n      </div>\n    </div>\n    <div if.bind=\"authService.isCoach()\" class=\"col-xs-12 col-sm-6 col-md-4 col-lg-3 ufps-card-new ufps-card-container\">\n      <div class=\"ufps-card\" data-toggle=\"modal\" data-target=\"#new-syllabus\">\n        <div class=\"ufps-card-title\">\n          <h1>\n            <span class=\"glyphicon glyphicon-plus\"></span>\n          </h1>\n        </div>\n        <div class=\"col-xs-12 ufps-card-link\">\n          Nueva clase\n        </div>\n        <div class=\"fix\"></div>\n      </div>\n    </div>\n    <div class=\"fix\"></div>\n    <paginator page.bind=\"generalPage\" total-pages.bind=\"generalTotalPages\"></paginator>\n  </div>\n\n  <!--MODAL PARA AÑADIR CLASE-->\n  <div if.bind=\"authService.isCoach()\" class=\"modal fade\" id=\"new-syllabus\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"new-syllabus\">\n    <div class=\"modal-dialog\" role=\"document\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header\">\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n            <span aria-hidden=\"true\">&times;</span>\n          </button>\n          <h4 class=\"modal-title\">Nueva clase</h4>\n          <br>\n          <form submit.delegate=\"createSyllabus()\">\n            <div class=\"form-group\">\n              <label>Titulo</label>\n              <input type=\"text\" class=\"form-control\" placeholder=\"Nombre de la clase\" value.bind=\"newSyllabus.title\" required>\n            </div>\n            <div class=\"form-group\">\n              <label>Descripción</label>\n              <input type=\"text\" class=\"form-control\" placeholder=\"Descripión de la clase\" value.bind=\"newSyllabus.description\" required>\n            </div>\n            <div class=\"radio\">\n              <label>\n                <input type=\"radio\" name=\"privacy\" model.bind=\"true\" checked.bind=\"newSyllabus.privacy\" checked> Público\n              </label>\n            </div>\n            <div class=\"radio\">\n              <label>\n                <input type=\"radio\" name=\"privacy\" model.bind=\"false\" checked.bind=\"newSyllabus.privacy\" checked> Privado\n                <span>(requiere clave)</span>\n              </label>\n            </div>\n            <div class=\"form-group\" if.bind=\"!newSyllabus.privacy\">\n              <label>Clave (Se recomienda reemplazar la siguiente clave)</label>\n              <input type=\"text\" class=\"form-control\" placeholder=\"clave que deben ingresar los estudiantes para acceder a la clase\" value.bind=\"newSyllabus.key\"\n                required>\n            </div>\n            <div class=\"text-right\">\n              <input type=\"submit\" class=\"btn btn-default ufps-btn-default\" value=\"Registrar clase\">\n            </div>\n          </form>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <!--MODAL PARA EDITAR SYLLABUS-->\n  <div if.bind=\"authService.isCoach()\" class=\"modal fade\" id=\"edit-syllabus\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"edit-syllabus\">\n    <div class=\"modal-dialog\" role=\"document\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header\">\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n            <span aria-hidden=\"true\">&times;</span>\n          </button>\n          <h4 class=\"modal-title\">Editar Syllabus</h4>\n          <br>\n          <form submit.delegate=\"modifySyllabus()\">\n            <div class=\"form-group\">\n              <label>Titulo</label>\n              <input type=\"text\" class=\"form-control\" placeholder=\"Nombre del syllabus\" value.bind=\"editSyllabus.title\" required>\n            </div>\n            <div class=\"form-group\">\n              <label>Descripción</label>\n              <input type=\"text\" class=\"form-control\" placeholder=\"Descripión del syllabus\" value.bind=\"editSyllabus.description\" required>\n            </div>\n            <div class=\"radio\">\n              <label>\n                <input type=\"radio\" name=\"privacy\" model.bind=\"true\" checked.bind=\"editSyllabus.privacy\"> Público\n              </label>\n            </div>\n            <div class=\"radio\">\n              <label>\n                <input type=\"radio\" name=\"privacy\" model.bind=\"false\" checked.bind=\"editSyllabus.privacy\"> Privado\n                <span>(requiere clave)</span>\n              </label>\n            </div>\n            <div class=\"form-group\" if.bind=\"!editSyllabus.privacy\">\n              <label>Clave (obligatorio: Confirme la clave o ingrese una nueva)</label>\n              <input type=\"text\" class=\"form-control\" placeholder=\"clave que deben ingresar los estudiantes para acceder a la clase\" value.bind=\"editSyllabus.key\"\n                required>\n            </div>\n            <div class=\"text-right\">\n              <input type=\"submit\" class=\"btn btn-default ufps-btn-default\" value=\"Editar clase\">\n            </div>\n          </form>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <!--MODAL PARA ELIMINAR SYLLABUS-->\n  <div if.bind=\"authService.isCoach()\" class=\"modal fade\" id=\"remove-syllabus\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"remove-syllabus\">\n    <div class=\"modal-dialog\" role=\"document\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header text-center\">\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n            <span aria-hidden=\"true\">&times;</span>\n          </button>\n          <h4 class=\"modal-title\">¿Estás seguro de eliminar la clase ${syllabusToRemove.title}?</h4>\n          <br>\n          <p>Esta operación no se puede deshacer</p>\n\n          <button class=\"btn btn-default ufps-btn-default\" click.delegate=removeSyllabus()>Si</button>\n          <button class=\"btn btn-default ufps-btn-default\" data-dismiss=\"modal\" aria-label=\"Close\">No</button>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <!--MODAL PARA REGISTRARSE EN UN SYLLABUS-->\n  <div if.bind=\"authService.isStudent()\" class=\"modal fade\" id=\"enroll-syllabus\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"enroll-syllabus\">\n    <div class=\"modal-dialog\" role=\"document\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header text-center\">\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n            <span aria-hidden=\"true\">&times;</span>\n          </button>\n          <h4 class=\"modal-title\">¿Quieres registrarte en ${syllabusToEnroll.title}?</h4>\n          <br>\n          <form submit.delegate=\"enrollSyllabus()\">\n            <div if.bind=\"!syllabusToEnroll.privacy\">\n              <p>Ingresa la clave de esta clase (si no la tienes, comunicate con el profesor/coach a cargo)</p>\n              <div class=\"form-group\">\n                <input type=\"text\" class=\"form-control\" value.bind=\"syllabusToEnroll.key\">\n              </div>\n            </div>\n\n            <input type=\"submit\" class=\"btn btn-default ufps-btn-default\" value=\"Si\">\n            <input type=\"submit\" class=\"btn btn-default ufps-btn-default\" data-dismiss=\"modal\" aria-label=\"Close\" value=\"No\">\n          </form>\n        </div>\n      </div>\n    </div>\n  </div>\n</template>\n"; });
define('modules/syllabus/create-assignment/edit-assignment',['exports', 'aurelia-framework', 'aurelia-router', 'config/config', 'models/models', 'services/services'], function (exports, _aureliaFramework, _aureliaRouter, _config, _models, _services) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.EditAssignment = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var EditAssignment = exports.EditAssignment = (_dec = (0, _aureliaFramework.inject)(_services.Alert, _services.Auth, _services.Syllabuses, _aureliaRouter.Router), _dec(_class = function () {
    function EditAssignment(alertService, authService, syllabusService, router) {
      _classCallCheck(this, EditAssignment);

      this.alertService = alertService;
      this.authService = authService;
      this.syllabusService = syllabusService;
      this.router = router;
      this.type = 'edit';
    }

    EditAssignment.prototype.activate = function activate(params, routeConfig) {
      this.routeConfig = routeConfig;
      this.id = params.id;
      this.getAssignment();
    };

    EditAssignment.prototype.getViewStrategy = function getViewStrategy() {
      return './create-assignment.html';
    };

    EditAssignment.prototype.formatDate = function formatDate(date) {
      var str = date.getUTCFullYear() + '-';
      if (date.getMonth() + 1 < 10) str += '0';
      str += date.getMonth() + 1 + '-';
      if (date.getDate() < 10) str += '0';
      str += date.getDate();
      return str;
    };

    EditAssignment.prototype.formatTime = function formatTime(time) {
      var str = '';
      if (time.getHours() < 10) str += '0';
      str += time.getHours() + ':';
      if (time.getMinutes() < 10) str += '0';
      str += time.getMinutes();
      return str;
    };

    EditAssignment.prototype.getAssignment = function getAssignment() {
      var _this = this;

      this.syllabusService.loadAssignment(this.id).then(function (data) {
        var tmpStart = new Date(data.assignment.init_date);
        var tmpEnd = new Date(data.assignment.end_date);
        _this.startDate = _this.formatDate(tmpStart);
        _this.endDate = _this.formatDate(tmpEnd);
        _this.startTime = _this.formatTime(tmpStart);
        _this.endTime = _this.formatTime(tmpEnd);
        _this.assignment = new _models.Assignment(data.assignment.tittle, data.assignment.description, data.assignment.init_date, data.assignment.end_date, undefined, data.assignment.syllabus_id, _this.id);
        _this.assignment.adjuntProblems(data.assignment.problems);
        _this.problems = '';
      }).catch(function (error) {
        if (error.status === 401) {
          _this.alertService.showMessage(_config.MESSAGES.permissionsError);
        } else {
          _this.alertService.showMessage(_config.MESSAGES.unknownError);
        }
      });
    };

    EditAssignment.prototype.showRemoveProblem = function showRemoveProblem(id) {
      this.problemToRemove = id;
      window.$('#remove-problem').modal('show');
    };

    EditAssignment.prototype.create = function create() {
      var _this2 = this;

      this.assignment.startDate = new Date(this.startDate + ' ' + this.startTime).toISOString();
      this.assignment.endDate = new Date(this.endDate + ' ' + this.endTime).toISOString();
      this.syllabusService.editAssignment(this.assignment).then(function (data) {
        _this2.alertService.showMessage(_config.MESSAGES.assignmentModified);
      }).catch(function (error) {
        if (error.status === 401) {
          _this2.alertService.showMessage(_config.MESSAGES.permissionsError);
        } else {
          _this2.alertService.showMessage(_config.MESSAGES.unknownError);
        }
      });
    };

    EditAssignment.prototype.removeProblem = function removeProblem() {
      var _this3 = this;

      this.syllabusService.removeProblem(this.id, this.problemToRemove).then(function () {
        _this3.alertService.showMessage(_config.MESSAGES.problemDeleted);
        _this3.assignment.removeProblem(_this3.problemToRemove);
        window.$('#remove-problem').modal('hide');
      }).catch(function (error) {
        if (error.status === 401 || error.status === 403) {
          _this3.alertService.showMessage(_config.MESSAGES.permissionsError);
        } else if (error.status === 500) {
          _this3.alertService.showMessage(_config.MESSAGES.serverError);
        } else {
          _this3.alertService.showMessage(_config.MESSAGES.unknownError);
        }
        window.$('#remove-problem').modal('hide');
      });
    };

    EditAssignment.prototype.validateProblems = function validateProblems() {
      var problemsTemp = this.problems.replace(/ /g, '');
      problemsTemp = problemsTemp.split(',');
      var problemsArr = [];
      for (var i = 0; i < problemsTemp.length; i++) {
        if (problemsTemp[i].length > 0 && !isNaN(parseInt(problemsTemp[i]))) problemsArr.push(parseInt(problemsTemp[i]));else if (isNaN(parseInt(problemsTemp[i]))) return false;
      }
      this.assignment.problems = problemsArr;
      return true;
    };

    EditAssignment.prototype.addProblems = function addProblems() {
      var _this4 = this;

      if (!this.validateProblems()) {
        this.alertService.showMessage(_config.MESSAGES.assignmentInvalidProblems);
      } else {
        this.syllabusService.addProblems(this.id, this.assignment.problems).then(function (data) {
          _this4.alertService.showMessage(_config.MESSAGES.assignmentCreated);
          _this4.getAssignment();
        }).catch(function (error) {
          if (error.status === 401) {
            _this4.alertService.showMessage(_config.MESSAGES.permissionsError);
          } else {
            _this4.alertService.showMessage(_config.MESSAGES.unknownError);
          }
        });
      }
    };

    return EditAssignment;
  }()) || _class);
});
define('modules/syllabus/create-assignment/create-assignment',['exports', 'aurelia-framework', 'aurelia-router', 'config/config', 'models/models', 'services/services'], function (exports, _aureliaFramework, _aureliaRouter, _config, _models, _services) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.CreateAssignment = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2;

  var CreateAssignment = exports.CreateAssignment = (_dec = (0, _aureliaFramework.inject)(_services.Alert, _services.Syllabuses, _aureliaRouter.Router), _dec(_class = (_class2 = function () {
    function CreateAssignment(alertService, syllabusService, router) {
      _classCallCheck(this, CreateAssignment);

      _initDefineProp(this, 'now', _descriptor, this);

      _initDefineProp(this, 'dateLoaded', _descriptor2, this);

      this.alertService = alertService;
      this.syllabusService = syllabusService;
      this.router = router;
      this.problems = '';
      this.type = 'new';
    }

    CreateAssignment.prototype.dateLoadedChanged = function dateLoadedChanged(act, prev) {
      var tmp = this.now;
      tmp.setTime(tmp.getTime() + 600000);
      this.startDate = this.formatDate(tmp);
      this.startTime = this.formatTime(tmp);
      tmp.setTime(tmp.getTime() + 86400000);
      this.endDate = this.formatDate(tmp);
      this.endTime = this.formatTime(tmp);
    };

    CreateAssignment.prototype.activate = function activate(params, routeConfig) {
      this.routeConfig = routeConfig;
      this.assignment = new _models.Assignment();
      this.assignment.syllabusId = params.id;
    };

    CreateAssignment.prototype.formatDate = function formatDate(date) {
      var str = date.getUTCFullYear() + '-';
      if (date.getMonth() + 1 < 10) str += '0';
      str += date.getMonth() + 1 + '-';
      if (date.getDate() < 10) str += '0';
      str += date.getDate();
      return str;
    };

    CreateAssignment.prototype.formatTime = function formatTime(time) {
      var str = '';
      if (time.getHours() < 10) str += '0';
      str += time.getHours() + ':';
      if (time.getMinutes() < 10) str += '0';
      str += time.getMinutes();
      return str;
    };

    CreateAssignment.prototype.validateProblems = function validateProblems() {
      var problemsTemp = this.problems.replace(/ /g, '');
      problemsTemp = problemsTemp.split(',');
      var problemsArr = [];
      for (var i = 0; i < problemsTemp.length; i++) {
        if (problemsTemp[i].length > 0 && !isNaN(parseInt(problemsTemp[i]))) problemsArr.push(parseInt(problemsTemp[i]));else if (isNaN(parseInt(problemsTemp[i]))) return false;
      }
      this.assignment.problems = problemsArr;
      return true;
    };

    CreateAssignment.prototype.create = function create() {
      var _this = this;

      if (!this.validateProblems()) {
        this.alertService.showMessage(_config.MESSAGES.assignmentInvalidProblems);
      } else {
        this.assignment.startDate = new Date(this.startDate + ' ' + this.startTime).toISOString();
        this.assignment.endDate = new Date(this.endDate + ' ' + this.endTime).toISOString();
        this.syllabusService.createAssignment(this.assignment).then(function (data) {
          _this.router.navigate('clases/' + _this.assignment.syllabusId);
          _this.alertService.showMessage(_config.MESSAGES.assignmentCreated);
        }).catch(function (error) {
          if (error.status === 401) {
            _this.alertService.showMessage(_config.MESSAGES.permissionsError);
          } else {
            _this.alertService.showMessage(_config.MESSAGES.unknownError);
          }
        });
      }
    };

    return CreateAssignment;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'now', [_aureliaFramework.observable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'dateLoaded', [_aureliaFramework.observable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class);
});
define('text!modules/syllabus/create-assignment/create-assignment.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"../../../resources/elements/clock\"></require>\n  <clock date.bind = \"now\" date-loaded.bind=\"dateLoaded\" show-timer.bind=\"false\"></clock>\n  <div class=\"container ufps-container-logged\">\n    <ol class=\"breadcrumb\">\n      <li>\n        <a href=\"/clases\">Clases</a>\n      </li>\n      <li>\n        <a href=\"/clases/clases/${assignment.syllabusId}\">Detalle de la clase actual</a>\n      </li>\n      <li class=\"active\" if.bind=\"type === 'edit'\">${assignment.title}</li>\n      <li class=\"active\" if.bind=\"type === 'new'\">Nueva tarea</li>\n    </ol>\n    <h2 class=\"text-right\" if.bind=\"type === 'edit'\">${assignment.title}</h2>\n    <h2 class=\"text-right\" if.bind=\"type === 'new'\">Nueva Tarea</h2>\n    <hr>\n\n    <form submit.delegate=\"create()\">\n      <div class=\"form-horizontal form-horizontal-assignment\">\n        <div class=\"form-group\">\n          <label class=\"control-label col-sm-2\" for=\"problem-name\">Nombre:</label>\n          <div class=\"col-sm-10 input-group ufps-input-creator\">\n            <input type=\"text\" class=\"form-control\" placeholder=\"Nombre de la tarea\" value.bind=\"assignment.title\" required>\n            <span class=\"input-group-addon\" tooltip data-toggle=\"tooltip\" title=\"Nombre que se mostrará al desplegar esta tarea\">\n              <span class=\"glyphicon glyphicon-question-sign\"></span>\n            </span>\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <label class=\"control-label col-sm-2\" for=\"problem-name\">Descripción:</label>\n          <div class=\"col-sm-10 input-group ufps-input-creator\">\n            <textarea class=\"form-control\" placeholder=\"Descripción de la tarea\" value.bind=\"assignment.description\"></textarea>\n            <span class=\"input-group-addon\" tooltip data-toggle=\"tooltip\" title=\"Descripción que se mostrará a los estudiantes al abrir esta tarea\">\n              <span class=\"glyphicon glyphicon-question-sign\"></span>\n            </span>\n          </div>\n        </div>\n      </div>\n      <div class=\"form-horizontal form-horizontal-assignment\" if.bind=\"type === 'new'\">\n        <div class=\"form-group\">\n          <label class=\"control-label col-sm-2\" for=\"problem-name\">Problemas:</label>\n          <div class=\"col-sm-10 input-group ufps-input-creator\">\n            <input type=\"text\" class=\"form-control\" placeholder=\"Ingrese los ID de los problemas separados por coma\" value.bind=\"problems\"\n              required>\n            <span class=\"input-group-addon\" tooltip data-toggle=\"tooltip\" title=\"Puede saber el ID de un problema usando la barra de busqueda superior\">\n              <span class=\"glyphicon glyphicon-question-sign\"></span>\n            </span>\n          </div>\n        </div>\n      </div>\n      <div class=\"form-horizontal col-md-6\">\n        <div class=\"form-group\">\n          <label class=\"control-label col-sm-2\" for=\"problem-name\">Desde el:</label>\n          <div class=\"col-sm-10 input-group ufps-input-creator\">\n            <input type=\"date\" class=\"form-control\" value.bind=\"startDate\" required>\n            <span class=\"input-group-addon\" tooltip data-toggle=\"tooltip\" title=\"Fecha de inicio desde la cual estará disponible esta tarea\">\n              <span class=\"glyphicon glyphicon-question-sign\"></span>\n            </span>\n          </div>\n        </div>\n      </div>\n      <div class=\"form-horizontal col-md-6\">\n        <div class=\"form-group\">\n          <label class=\"control-label col-sm-2\" for=\"problem-name\">a las:</label>\n          <div class=\"col-sm-10 input-group ufps-input-creator\">\n            <input type=\"time\" class=\"form-control\" value.bind=\"startTime\" required>\n            <span class=\"input-group-addon\" tooltip data-toggle=\"tooltip\" title=\"Hora desde la cual estará disponible esta tarea\">\n              <span class=\"glyphicon glyphicon-question-sign\"></span>\n            </span>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"form-horizontal col-md-6\">\n        <div class=\"form-group\">\n          <label class=\"control-label col-sm-2\" for=\"problem-name\">Hasta el:</label>\n          <div class=\"col-sm-10 input-group ufps-input-creator\">\n            <input type=\"date\" class=\"form-control\" value.bind=\"endDate\" min=\"${startDate}\" required>\n            <span class=\"input-group-addon\" tooltip data-toggle=\"tooltip\" title=\"Fecha hasta la cual estará disponible esta tarea\">\n              <span class=\"glyphicon glyphicon-question-sign\"></span>\n            </span>\n          </div>\n        </div>\n      </div>\n      <div class=\"form-horizontal col-md-6\">\n        <div class=\"form-group\">\n          <label class=\"control-label col-sm-2\" for=\"problem-name\">a las:</label>\n          <div class=\"col-sm-10 input-group ufps-input-creator\">\n            <input type=\"time\" class=\"form-control\" value.bind=\"endTime\" required>\n            <span class=\"input-group-addon\" tooltip data-toggle=\"tooltip\" title=\"Hora hasta la cual estará disponible esta tarea\">\n              <span class=\"glyphicon glyphicon-question-sign\"></span>\n            </span>\n          </div>\n        </div>\n      </div>\n      <div class=\"col-xs-12 text-center\" if.bind=\"type === 'new'\">\n        <input type=\"submit\" class=\"btn ufps-btn-submit\" value=\"Crear Tarea\">\n      </div>\n      <div class=\"col-xs-12 text-center\" if.bind=\"type === 'edit'\">\n        <input type=\"submit\" class=\"btn ufps-btn-submit\" value=\"Guardar cambios\" style=\"margin-bottom:30px\">\n      </div>\n    </form>\n    <div if.bind=\"type === 'edit'\">\n      <table>\n        <thead>\n          <tr>\n            <th class=\"text-center\" style=\"width:5%\">Id</th>\n            <th class=\"text-center\" style=\"width:70%\">Problema</th>\n            <th class=\"text-center\" style=\"width:10%\">Dificultad</th>\n            <th class=\"text-center\" style=\"width:15%\">Idioma</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr if.bind=\"assignment.problemsLoaded.length === 0\">\n            <td></td>\n            <td>\n              <p>No hay problemas actualmente en esta tarea.</p>\n            </td>\n            <td></td>\n            <td></td>\n\n          </tr>\n          <tr repeat.for=\"problem of assignment.problemsLoaded\">\n            <td class=\"text-center\">${problem.id}</td>\n            <td class=\"text-left ufps-td-problem\">\n              <p if.bind=\"problem.isInSpanish() && language !== 'Inglés'\" class=\"ufps-name-problem-list\">\n                <a href=\"/problemas/${problem.id}/detalle/es\">${problem.titleES}</a>\n              </p>\n              <p if.bind=\"!problem.isInSpanish() || (problem.isInEnglish() && language === 'Inglés')\" class=\"ufps-name-problem-list\">\n                <a href=\"/problemas/${problem.id}/detalle/en\">${problem.titleEN}</a>\n              </p>\n              <span if.bind=\"authService.isCoach()\" class=\"ufps-edit-problem-list glyphicon glyphicon-remove\" data-toggle=\"tooltip\" title=\"Eliminar problema de la tarea\"\n                click.delegate=\"showRemoveProblem(problem.id)\" tooltip></span>\n            </td>\n            <td class=\"text-center\">${problem.level}</td>\n            <td class=\"text-center ufps-language\">\n              <span class=\"${problem.isInSpanish() ? 'active' : 'inactive'}\">\n                <a href=\"/problemas/${problem.id}/detalle/es\">ES</a>\n              </span> |\n              <span class=\"${problem.isInEnglish() ? 'active' : 'inactive'}\">\n                <a href=\"/problemas/${problem.id}/detalle/en\">EN</a>\n              </span>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n      <div class=\"form-horizontal form-horizontal-assignment\" if.bind=\"type === 'edit'\">\n        <br>\n        <div class=\"form-group\">\n          <label class=\"control-label col-sm-2\" for=\"problem-name\">Añadir problemas:</label>\n          <div class=\"col-sm-9 input-group ufps-input-creator\">\n            <input type=\"text\" class=\"form-control\" placeholder=\"Ingrese los ID de los problemas separados por coma\" value.bind=\"problems\"\n              required>\n            <span class=\"input-group-addon\" tooltip data-toggle=\"tooltip\" title=\"Puede saber el ID de un problema usando la barra de busqueda superior\">\n              <span class=\"glyphicon glyphicon-question-sign\"></span>\n            </span>\n            <span class=\"input-group-addon btn\" click.delegate=\"addProblems()\">\n              <span>Añadir</span>\n            </span>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <!--MODAL PARA ELIMINAR PROBLEMA DE LA TAREA-->\n  <div if.bind=\"authService.isCoach()\" class=\"modal fade\" id=\"remove-problem\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"remove-problem\">\n    <div class=\"modal-dialog\" role=\"document\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header text-center\">\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n            <span aria-hidden=\"true\">&times;</span>\n          </button>\n          <h4 class=\"modal-title\">¿Estás seguro de eliminar este problema de la tarea?</h4>\n          <br>\n          <p>Esto no eliminará el problema de la plataforma. Solo de la tarea actual.</p>\n\n          <button class=\"btn btn-default ufps-btn-default\" click.delegate=removeProblem()>Si</button>\n          <button class=\"btn btn-default ufps-btn-default\" data-dismiss=\"modal\" aria-label=\"Close\">No</button>\n        </div>\n      </div>\n    </div>\n  </div>\n</template>\n"; });
define('modules/syllabus/assignment-stats/assignment-stats',['exports', 'aurelia-framework', 'config/config', 'models/models', 'services/services'], function (exports, _aureliaFramework, _config, _models, _services) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AssignmentStats = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _class, _desc, _value, _class2, _descriptor;

  var AssignmentStats = exports.AssignmentStats = (_dec = (0, _aureliaFramework.inject)(_services.Alert, _services.Syllabuses), _dec(_class = (_class2 = function () {
    function AssignmentStats(alertService, syllabusService) {
      _classCallCheck(this, AssignmentStats);

      _initDefineProp(this, 'page', _descriptor, this);

      this.alertService = alertService;
      this.syllabusService = syllabusService;
      this.assignment = new _models.Assignment();
      this.score = [];
      this.mapProblem = [];
      this.mapUsers = [];
      this.page = 1;
      this.totalPages = 1;
    }

    AssignmentStats.prototype.activate = function activate(params, routeConfig) {
      this.routeConfig = routeConfig;
      this.id = params.id;
      this.getAssignment();
    };

    AssignmentStats.prototype.pageChanged = function pageChanged(act, prev) {
      if (prev !== undefined) this.getResults();
    };

    AssignmentStats.prototype.getAssignment = function getAssignment() {
      var _this = this;

      this.syllabusService.loadAssignment(this.id).then(function (data) {
        _this.assignment = new _models.Assignment(data.assignment.tittle, data.assignment.description, data.assignment.init_date, data.assignment.end_date, undefined, data.assignment.syllabus_id, _this.id);
        _this.assignment.adjuntProblems(data.assignment.problems);
        for (var i = 0; i < _this.assignment.problemsLoaded.length; i++) {
          _this.mapProblem[_this.assignment.problemsLoaded[i].auxiliarId] = i + 1;
        }
        _this.getResults();
      }).catch(function (error) {
        if (error.status === 401) {
          _this.alertService.showMessage(_config.MESSAGES.permissionsError);
        } else {
          _this.alertService.showMessage(_config.MESSAGES.unknownError);
        }
      });
    };

    AssignmentStats.prototype.getResults = function getResults() {
      var _this2 = this;

      this.syllabusService.loadResults(this.id, this.page).then(function (data) {
        for (var i = 0; i < data.length; i++) {
          _this2.score.push([]);
          _this2.score[i].push(data[i].name + ' (' + data[i].username + ')');
          for (var j = 1; j < _this2.assignment.problemsLoaded.length + 1; j++) {
            _this2.score[i].push(false);
          }
          _this2.score[i].push(data[i].assignment_problems.length);
        }
        for (var _i = 0; _i < data.length; _i++) {
          for (var _j = 0; _j < data[_i].assignment_problems.length; _j++) {
            _this2.score[_i][_this2.mapProblem[data[_i].assignment_problems[_j]]] = true;
          }
        }
      }).catch(function (error) {
        if (error.status === 401) {
          _this2.alertService.showMessage(_config.MESSAGES.permissionsError);
        } else {
          _this2.alertService.showMessage(_config.MESSAGES.unknownError);
        }
      });
    };

    AssignmentStats.prototype.letterValue = function letterValue(index) {
      return String.fromCharCode(index + 65);
    };

    return AssignmentStats;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'page', [_aureliaFramework.observable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class);
});
define('text!modules/syllabus/assignment-stats/assignment-stats.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"../../../resources/elements/paginator\"></require>\n  <div class=\"container\">\n      <ol class=\"breadcrumb\">\n          <li>\n            <a href=\"/clases\">Clases</a>\n          </li>\n          <li>\n            <a href=\"/clases/clases/${assignment.syllabusId}\">Clase actual</a>\n          </li>\n          <li class=\"active\">Detalle de la tarea \"${assignment.title}\"</li>\n        </ol>\n    <h1 class=\"text-right\">${assignment.title}</h1>\n    <hr>\n    <h1 class=\"text-right\">Detalles de la tarea</h1>\n    <table>\n      <thead>\n        <tr>\n          <th class=\"text-center\" style=\"width:5%\">Indice</th>\n          <th class=\"text-center\" style=\"width:60%\">Problema</th>\n          <th class=\"text-center\" style=\"width:10%\">Dificultad</th>\n          <th class=\"text-center\" style=\"width:15%\">Idioma</th>\n          <th class=\"text-center\" style=\"width:10%\">Detalle</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr repeat.for=\"problem of assignment.problemsLoaded\">\n          <td class=\"text-center\">${letterValue($index)}</td>\n          <td class=\"text-left ufps-td-problem\">\n            <p if.bind=\"problem.isInSpanish() && language !== 'Inglés'\" class=\"ufps-name-problem-list\">\n              <a route-href=\"route: ViewProblem; params.bind: {assignmentProblemId:problem.auxiliarId, assignmentId:assignment.id, problemId: problem.id, lang: 'es'}\">${problem.titleES}</a>\n            </p>\n            <p if.bind=\"!problem.isInSpanish() || (problem.isInEnglish() && language === 'Inglés')\" class=\"ufps-name-problem-list\">\n              <a route-href=\"route: ViewProblem; params.bind: {assignmentProblemId:problem.auxiliarId, assignmentId:assignment.id, problemId: problem.id, lang: 'en'}\">${problem.titleEN}</a>\n            </p>\n          </td>\n          <td class=\"text-center\">${problem.level}</td>\n          <td class=\"text-center ufps-language\">\n            <span class=\"${problem.isInSpanish() ? 'active' : 'inactive'}\">\n              <a route-href=\"route: ViewProblem; params.bind: {assignmentProblemId:problem.auxiliarId, assignmentId:assignment.id, problemId: problem.id, lang: 'es'}\">ES</a>\n            </span> |\n            <span class=\"${problem.isInEnglish() ? 'active' : 'inactive'}\">\n              <a route-href=\"route: ViewProblem; params.bind: {assignmentProblemId:problem.auxiliarId, assignmentId:assignment.id, problemId: problem.id, lang: 'en'}\">EN</a>\n            </span>\n          </td>\n          <td>\n            <a  route-href=\"route: AssignmentDetail; params.bind: {idAssignment:id, idAssignmentProblem: problem.auxiliarId, idProblem: problem.id}\" class=\"ufps-btn ufps-btn-default btn btn-default\">Detalle</a>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n    <div class=\"ufps-separator\"></div>\n    <h1 class=\"text-right\">Soluciones por estudiante</h1>\n    <table class=\"ufps-score\">\n      <thead>\n        <tr>\n          <th class=\"text-center\">Usuario</th>\n          <th class=\"text-center\" repeat.for=\"i of assignment.problemsLoaded.length\">\n            ${letterValue(i)}\n          </th>\n          <th class=\"text-center\">Total</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr repeat.for=\"value of score\">\n          <td repeat.for=\"field of value\">\n            <p class=\"text-center\" if.bind=\"$index === 0 || $index === assignment.problemsLoaded.length + 1\">${field}</p>\n            <div if.bind=\"$index !== 0 && $index !== assignment.problemsLoaded.length + 1 && field\" class=\"ufps-score-correct\"></div>\n          </td>\n        </tr>\n        <tr if.bind=\"score.length === 0\">\n          <td colspan=\"${assignment.problemsLoaded.length + 2}\">No hay usuarios actualmente registrados en esta clase.</td>\n        </tr>\n      </tbody>\n    </table>\n    <div class=\"ufps-separator\"></div>\n    <hr>\n  </div>\n</template>\n"; });
define('modules/syllabus/assignment-detail/assignment-detail',['exports', 'aurelia-framework', 'config/config', 'models/models', 'services/services'], function (exports, _aureliaFramework, _config, _models, _services) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AssignmentDetail = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2;

  var AssignmentDetail = exports.AssignmentDetail = (_dec = (0, _aureliaFramework.inject)(_services.Alert, _services.Problems, _services.Syllabuses), _dec(_class = (_class2 = function () {
    function AssignmentDetail(alertService, problemService, syllabusService) {
      _classCallCheck(this, AssignmentDetail);

      _initDefineProp(this, 'page', _descriptor, this);

      _initDefineProp(this, 'filterChange', _descriptor2, this);

      this.alertService = alertService;
      this.syllabusService = syllabusService;
      this.problemService = problemService;
      this.assignment = new _models.Assignment();
      this.numberOfItems = [10, 15, 20];
      this.sortOptions = ['Fecha', 'Tiempo de ejecución'];
      this.filterChange = false;
      this.limit = 10;
      this.sort = 'Fecha';
      this.by = 'Descendente';
      this.page = 1;
      this.downloadActive = false;
      this.totalPages = 1;
      this.problem = '';
      this.veredictOptions = [{ value: 'ALL', text: 'Cualquier veredicto' }, { value: 'ACC', text: 'Correcto' }, { value: 'TL', text: 'Tiempo límite excedido' }, { value: 'WA', text: 'Respuesta incorrecta' }, { value: 'RT', text: 'Error en tiempo de ejecución' }, { value: 'CE', text: 'Error de compilación' }];
      this.veredict = this.veredictOptions[0];
      this.veredicts = {
        labels: ['Correcto', 'Tiempo limite excedido', 'Error en tiempo de ejecución', 'Error de compilación', 'Respuesta incorrecta'],
        datasets: [{
          label: 'Resultados',
          data: [0, 0, 0, 0, 0],
          backgroundColor: ['rgba(46, 204, 113,1.0)', 'rgba(52, 152, 219,1.0)', 'rgba(155, 89, 182,1.0)', 'rgba(251, 197, 49,1.0)', 'rgba(255, 99, 132,1.0)'],
          borderWidth: 0
        }]
      };
      this.langs = {
        labels: ['Java', 'C++', 'Python'],
        datasets: [{
          label: 'Lenguajes usados',
          data: [0, 0, 0],
          backgroundColor: ['rgba(46, 204, 113,1.0)', 'rgba(52, 152, 219,1.0)', 'rgba(255, 99, 132,1.0)'],
          borderWidth: 0
        }]
      };
    }

    AssignmentDetail.prototype.setVeredict = function setVeredict(veredict) {
      this.veredict = veredict;
      this.getSubmissions();
    };

    AssignmentDetail.prototype.filterChangeChanged = function filterChangeChanged(act, prev) {
      if (prev !== undefined) this.getSubmissions();
    };

    AssignmentDetail.prototype.activate = function activate(params, routeConfig) {
      this.routeConfig = routeConfig;
      this.idProblem = params.idProblem;
      this.idAssignment = params.idAssignment;
      this.idAssignmentProblem = params.idAssignmentProblem;
      this.getAssignment();
      this.getStatsByVerdict();
      this.getStatsByLang();
      this.getSubmissions();
    };

    AssignmentDetail.prototype.pageChanged = function pageChanged(act, prev) {
      if (prev !== undefined) this.getSubmissions();
    };

    AssignmentDetail.prototype.getAssignment = function getAssignment() {
      var _this = this;

      this.syllabusService.loadAssignment(this.idAssignment).then(function (data) {
        _this.assignment = new _models.Assignment(data.assignment.tittle, data.assignment.description, data.assignment.init_date, data.assignment.end_date, undefined, data.assignment.syllabus_id, _this.idAssignment);
        for (var i = 0; i < data.assignment.problems.length; i++) {
          if (data.assignment.problems[i].id == _this.idProblem) {
            if (data.assignment.problems[i].title_es !== null) _this.problem = data.assignment.problems[i].title_es;else _this.problem = data.assignment.problems[i].title_en;
            break;
          }
        }
      }).catch(function (error) {
        if (error.status === 401) {
          _this.alertService.showMessage(_config.MESSAGES.permissionsError);
        } else {
          _this.alertService.showMessage(_config.MESSAGES.unknownError);
        }
      });
    };

    AssignmentDetail.prototype.getStatsByVerdict = function getStatsByVerdict() {
      var _this2 = this;

      this.syllabusService.loadStatsByVerdict(this.idAssignment, this.idAssignmentProblem).then(function (data) {
        for (var i = 0; i < data.length; i++) {
          if (data[i].verdict === 'Accepted') _this2.veredicts.datasets[0].data[0] = data[i].total;else if (data[i].verdict === 'Time Limit Exceeded') _this2.veredicts.datasets[0].data[1] = data[i].total;else if (data[i].verdict === 'Runtime Error') _this2.veredicts.datasets[0].data[2] = data[i].total;else if (data[i].verdict === 'Compilation Error') _this2.veredicts.datasets[0].data[3] = data[i].total;else if (data[i].verdict === 'Wrong Answer') _this2.veredicts.datasets[0].data[4] = data[i].total;
        }
      }).catch(function (error) {
        if (error.status === 401) {
          _this2.alertService.showMessage(_config.MESSAGES.permissionsError);
        } else {
          _this2.alertService.showMessage(_config.MESSAGES.unknownError);
        }
      });
    };

    AssignmentDetail.prototype.getStatsByLang = function getStatsByLang() {
      var _this3 = this;

      this.syllabusService.loadStatsByLang(this.idAssignment, this.idAssignmentProblem).then(function (data) {
        for (var i = 0; i < data.length; i++) {
          if (data[i].language === 'Java') _this3.langs.datasets[0].data[0] = data[i].total;else if (data[i].language === 'C++') _this3.langs.datasets[0].data[1] = data[i].total;else if (data[i].language === 'Python') _this3.langs.datasets[0].data[2] = data[i].total;
        }
      }).catch(function (error) {
        if (error.status === 401) {
          _this3.alertService.showMessage(_config.MESSAGES.permissionsError);
        } else {
          _this3.alertService.showMessage(_config.MESSAGES.unknownError);
        }
      });
    };

    AssignmentDetail.prototype.getSubmissions = function getSubmissions() {
      var _this4 = this;

      var sortValue = void 0;
      if (this.sort === 'Tiempo de ejecución') sortValue = 'time';else sortValue = 'date';
      var veredictValue = this.veredict.value;
      if (veredictValue === 'ALL') veredictValue = null;
      this.syllabusService.getSubmissionsAssignment(this.idAssignment, this.idAssignmentProblem, this.limit, this.page, this.by === 'Ascendente' ? 'ASC' : 'DESC', sortValue, veredictValue).then(function (data) {
        _this4.totalPages = data.meta.totalPages;
        _this4.submissions = [];
        if (data.meta.totalItems > 0) _this4.submissions = data.data;
      }).catch(function (error) {
        if (error.status === 401 || error.status === 403) {
          _this4.alertService.showMessage(_config.MESSAGES.permissionsError);
        } else if (error.status === 500) {
          _this4.alertService.showMessage(_config.MESSAGES.serverError);
        } else {
          _this4.alertService.showMessage(_config.MESSAGES.unknownError);
        }
      });
    };

    AssignmentDetail.prototype.showDate = function showDate(date) {
      var d = new Date(date);
      return this.getDate(d) + ' - ' + this.getTime(d);
    };

    AssignmentDetail.prototype.getDate = function getDate(date) {
      var months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
      return date.getDate() + ' de ' + months[date.getMonth()] + ' del ' + date.getFullYear();
    };

    AssignmentDetail.prototype.getTime = function getTime(date) {
      var tmp = '';
      if (date.getHours() <= 12) tmp += date.getHours() + ':';else if (date.getHours() > 12) tmp += date.getHours() - 12 + ':';
      tmp += (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
      if (date.getHours() < 12) tmp += 'AM';else tmp += 'PM';
      return tmp;
    };

    AssignmentDetail.prototype.mapVeredict = function mapVeredict(veredict) {
      if (veredict === 'in queue') return 'En espera';else if (veredict === 'running') return 'Ejecutando';else if (veredict === 'Accepted') return 'Correcto';else if (veredict === 'Compilation Error') return 'Error de compilación';else if (veredict === 'Time Limit Exceeded') return 'Tiempo limite excedido';else if (veredict === 'Runtime Error') return 'Error en tiempo de ejecución';else if (veredict === 'Wrong Answer') return 'Respuesta equivocada';
    };

    AssignmentDetail.prototype.toFixed = function toFixed(value) {
      if (isNaN(parseFloat(value))) return '-';
      return parseFloat(value).toFixed(3);
    };

    AssignmentDetail.prototype.viewCode = function viewCode(submission) {
      var _this5 = this;

      this.downloadActive = false;
      this.submissionLoaded = submission;
      this.submissionLoaded.code = 'Cargando código...';
      window.$('#submission-detail').modal('show');
      this.problemService.getSubmission(this.submissionLoaded.file_name).then(function (data) {
        _this5.codeDownload = data;
        _this5.downloadActive = true;
        var reader = new FileReader();
        reader.onload = function () {
          _this5.submissionLoaded.code = reader.result;
        };
        reader.readAsText(data);
      }).catch(function (error) {
        if (error.status === 401 || error.status === 403) {
          _this5.alertService.showMessage(_config.MESSAGES.permissionsError);
        } else if (error.status === 500) {
          _this5.alertService.showMessage(_config.MESSAGES.serverError);
        } else {
          _this5.alertService.showMessage(_config.MESSAGES.unknownError);
        }
      });
    };

    AssignmentDetail.prototype.downloadCode = function downloadCode() {
      var filename = void 0;
      if (this.submissionLoaded.language === 'Java') filename = 'Main.java';else if (this.submissionLoaded.language === 'C++') filename = 'main.cpp';else if (this.submissionLoaded.language === 'Python') filename = 'main.py';
      if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(this.codeDownload, filename);
      } else {
        var elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(this.codeDownload);
        elem.download = filename;
        document.body.appendChild(elem);
        elem.click();
        document.body.removeChild(elem);
      }
    };

    return AssignmentDetail;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'page', [_aureliaFramework.observable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'filterChange', [_aureliaFramework.observable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class);
});
define('text!modules/syllabus/assignment-detail/assignment-detail.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"../../../resources/elements/paginator\"></require>\n  <require from=\"../../../resources/elements/filter\"></require>\n  <div class=\"container\">\n    <ol class=\"breadcrumb\">\n      <li>\n        <a href=\"/clases\">Clases</a>\n      </li>\n      <li>\n        <a href=\"/clases/clases/${assignment.syllabusId}\">Clase actual</a>\n      </li>\n      <li>\n        <a href=\"/clases/estadisticas/${assignment.id}\">Detalle de la tarea</a>\n      </li>\n      <li class=\"active\">Detalles del problema \"${problem}\"</li>\n    </ol>\n    <h2 class=\"text-right\">Detalle del problema \"${problem}\"</h2>\n    <h4 class=\"text-right\">De la tarea \"${assignment.title}\"</h4>\n    <hr>\n    <div class=\"row\">\n      <div class=\"col-sm-12 col-md-6\">\n        <div class=\"panel panel-default\">\n          <div class=\"panel-body\">\n            <h4 class=\"text-center\">Veredictos</h4>\n            <canvas chart=\"type: pie; data.bind: veredicts; should-update: true; throttle: 100;\"></canvas>\n          </div>\n        </div>\n      </div>\n      <div class=\"col-sm-12 col-md-6\">\n        <div class=\"panel panel-default\">\n          <div class=\"panel-body\">\n            <h4 class=\"text-center\">Lenguajes</h4>\n            <canvas chart=\"type: pie; data.bind: langs; should-update: true; throttle: 100;\"></canvas>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-xs-12\">\n      <h2 class=\"text-right\">Soluciones recibidas</h2>\n      <div class=\"col-md-12\">\n        <hr> Mostrar solo envios con veredicto:\n        <div class=\"dropdown dropdown-inline ufps-dropdown\">\n          <button class=\"btn btn-default dropdown-toggle\" type=\"button\" id=\"selectVeredict\" data-toggle=\"dropdown\" aria-haspopup=\"true\"\n            aria-expanded=\"true\">\n            ${veredict.text}\n            <span class=\"caret\"></span>\n          </button>\n          <ul class=\"dropdown-menu ufps-dropdown-menu dropdown-mini\" aria-labelledby=\"selectVeredict\">\n            <li repeat.for=\"i of veredictOptions\">\n              <a click.delegate=\"setVeredict(i)\">${i.text}</a>\n            </li>\n          </ul>\n        </div>\n        <div class=\"fix\"></div>\n      </div>\n      <filter number-of-items.bind=\"numberOfItems\" sort-options.bind=\"sortOptions\" filter-change.bind=\"filterChange\" limit.bind=\"limit\"\n        sort.bind=\"sort\" by.bind=\"by\" text-to-show.bind=\"'envios'\" language-flag.bind=\"false\"></filter>\n      <table>\n        <thead>\n          <tr>\n            <th class=\"text-center\">Usuario</th>\n            <th class=\"text-center\">Fecha de envio</th>\n            <th class=\"text-center\">Veredicto</th>\n            <th class=\"text-center\">Tiempo de ejecución</th>\n            <th class=\"text-center\">Lenguaje</th>\n            <th class=\"text-center\">Código</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr repeat.for=\"submission of submissions\">\n            <td class=\"text-center\">${submission.user.name}\n              <span class=\"username-gray\">(${submission.user.username})</span>\n            </td>\n            <td class=\"text-center\">${showDate(submission.created_at)}</td>\n            <td class=\"text-center\" if.bind=\"submission.status !== 'executed'\">${mapVeredict(submission.status)}</td>\n            <td class=\"text-center\" if.bind=\"submission.status === 'executed'\">${mapVeredict(submission.verdict)}</td>\n            <td class=\"text-center\">${toFixed(submission.execution_time)}s</td>\n            <td class=\"text-center\">${submission.language}</td>\n            <td class=\"text-center\">\n              <p class=\"ufps-name-problem-list ufps-name-problem-list-l\">\n                <a click.delegate=\"viewCode(submission)\">Ver código</a>\n              </p>\n            </td>\n          </tr>\n          <tr if.bind=\"submissions.length === 0\">\n            <td colspan=\"7\">No has realizado ningún envio.</td>\n          </tr>\n        </tbody>\n      </table>\n      <paginator page.bind=\"page\" total-pages.bind=\"totalPages\"></paginator>\n    </div>\n    <div class=\"modal fade\" id=\"submission-detail\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"submission-detail\">\n      <div class=\"modal-dialog modal-lg\" role=\"document\">\n        <div class=\"modal-content\">\n          <div class=\"modal-header\">\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n              <span aria-hidden=\"true\">&times;</span>\n            </button>\n            <table>\n              <thead>\n                <tr>\n                  <th class=\"text-center\">Usuario</th>\n                  <th class=\"text-center\">Fecha de envio</th>\n                  <th class=\"text-center\">Veredicto</th>\n                  <th class=\"text-center\">Tiempo de ejecución</th>\n                  <th class=\"text-center\">Lenguaje</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr>\n                  <td class=\"text-center\">${submissionLoaded.user.name}\n                    <span class=\"username-gray\">(${submissionLoaded.user.username})</span>\n                  </td>\n                  <td class=\"text-center\">${showDate(submissionLoaded.created_at)}</td>\n                  <td class=\"text-center\" if.bind=\"submissionLoaded.status !== 'executed'\">${mapVeredict(submissionLoaded.status)}</td>\n                  <td class=\"text-center\" if.bind=\"submissionLoaded.status === 'executed'\">${mapVeredict(submissionLoaded.verdict)}</td>\n                  <td class=\"text-center\">${toFixed(submissionLoaded.execution_time)}s</td>\n                  <td class=\"text-center\">${submissionLoaded.language}</td>\n                </tr>\n                <tr>\n                  <td colspan=\"6\">\n                    <div class=\"col-xs-12 text-center\">\n                      <a click.delegate=\"downloadCode()\" class=\"btn btn-default ufps-btn ufps-btn-default text-center\" if.bind=\"downloadActive\">Descargar código</a>\n                      <div class=\"ufps-separator-mini\"></div>\n                    </div>\n                    <pre>\n                        <code>\n${submissionLoaded.code}</code>\n                      </pre>\n\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</template>\n"; });
define('modules/submissions/submissions',['exports', 'aurelia-framework', 'config/config', 'models/models', 'services/services'], function (exports, _aureliaFramework, _config, _models, _services) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Submissions = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2;

  var Submissions = exports.Submissions = (_dec = (0, _aureliaFramework.inject)(_services.Alert, _services.Auth, _services.Problems, _services.Rankings), _dec(_class = (_class2 = function () {
    function Submissions(alertService, authService, problemService, rankingService) {
      _classCallCheck(this, Submissions);

      _initDefineProp(this, 'page', _descriptor, this);

      _initDefineProp(this, 'filterChange', _descriptor2, this);

      this.alertService = alertService;
      this.problemService = problemService;
      this.authService = authService;
      this.rankingService = rankingService;
      this.numberOfItems = [10, 15, 20];
      this.sortOptions = ['Fecha', 'Dificultad', 'Tiempo de ejecución'];
      this.filterChange = false;
      this.submissions = [];
      this.limit = 10;
      this.sort = 'Fecha';
      this.by = 'Descendente';
      this.page = 1;
      this.downloadActive = false;
      this.totalPages = 1;
      this.veredictOptions = [{ value: 'ALL', text: 'Cualquier veredicto' }, { value: 'ACC', text: 'Correcto' }, { value: 'TL', text: 'Tiempo límite excedido' }, { value: 'WA', text: 'Respuesta incorrecta' }, { value: 'RT', text: 'Error en tiempo de ejecución' }, { value: 'CE', text: 'Error de compilación' }];
      this.veredict = this.veredictOptions[0];
      this.getSubmissions();
    }

    Submissions.prototype.setVeredict = function setVeredict(veredict) {
      this.veredict = veredict;
      this.getSubmissions();
    };

    Submissions.prototype.filterChangeChanged = function filterChangeChanged(act, prev) {
      if (prev !== undefined) this.getSubmissions();
    };

    Submissions.prototype.pageChanged = function pageChanged(act, prev) {
      if (prev !== undefined) this.getSubmissions();
    };

    Submissions.prototype.getSubmissions = function getSubmissions() {
      var _this = this;

      var sortValue = void 0;
      if (this.sort === 'Tiempo de ejecución') sortValue = 'time';else if (this.sort === 'Dificultad') sortValue = 'level';else sortValue = 'date';
      var veredictValue = this.veredict.value;
      if (veredictValue === 'ALL') veredictValue = null;
      this.rankingService.getSubmissions(this.authService.getUserId(), this.limit, this.page, this.by === 'Ascendente' ? 'ASC' : 'DESC', sortValue, veredictValue).then(function (data) {
        _this.totalPages = data.meta.totalPages;
        _this.submissions = [];
        if (data.meta.totalItems > 0) _this.submissions = data.data;
      }).catch(function (error) {
        if (error.status === 401 || error.status === 403) {
          _this.alertService.showMessage(_config.MESSAGES.permissionsError);
        } else if (error.status === 500) {
          _this.alertService.showMessage(_config.MESSAGES.serverError);
        } else {
          _this.alertService.showMessage(_config.MESSAGES.unknownError);
        }
      });
    };

    Submissions.prototype.showDate = function showDate(date) {
      var d = new Date(date);
      return this.getDate(d) + ' - ' + this.getTime(d);
    };

    Submissions.prototype.getDate = function getDate(date) {
      var months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
      return date.getDate() + ' de ' + months[date.getMonth()] + ' del ' + date.getFullYear();
    };

    Submissions.prototype.getTime = function getTime(date) {
      var tmp = '';
      if (date.getHours() <= 12) tmp += date.getHours() + ':';else if (date.getHours() > 12) tmp += date.getHours() - 12 + ':';
      tmp += (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
      if (date.getHours() < 12) tmp += 'AM';else tmp += 'PM';
      return tmp;
    };

    Submissions.prototype.mapVeredict = function mapVeredict(veredict) {
      if (veredict === 'in queue') return 'En espera';else if (veredict === 'running') return 'Ejecutando';else if (veredict === 'Accepted') return 'Correcto';else if (veredict === 'Compilation Error') return 'Error de compilación';else if (veredict === 'Time Limit Exceeded') return 'Tiempo limite excedido';else if (veredict === 'Runtime Error') return 'Error en tiempo de ejecución';else if (veredict === 'Wrong Answer') return 'Respuesta equivocada';
    };

    Submissions.prototype.toFixed = function toFixed(value) {
      return parseFloat(value).toFixed(3);
    };

    Submissions.prototype.viewCode = function viewCode(submission) {
      var _this2 = this;

      this.downloadActive = false;
      this.submissionLoaded = submission;
      this.submissionLoaded.code = 'Cargando código...';
      window.$('#submission-detail').modal('show');
      this.problemService.getSubmission(this.submissionLoaded.file_name).then(function (data) {
        _this2.codeDownload = data;
        _this2.downloadActive = true;
        var reader = new FileReader();
        reader.onload = function () {
          _this2.submissionLoaded.code = reader.result;
        };
        reader.readAsText(data);
      }).catch(function (error) {
        if (error.status === 401 || error.status === 403) {
          _this2.alertService.showMessage(_config.MESSAGES.permissionsError);
        } else if (error.status === 500) {
          _this2.alertService.showMessage(_config.MESSAGES.serverError);
        } else {
          _this2.alertService.showMessage(_config.MESSAGES.unknownError);
        }
      });
    };

    Submissions.prototype.downloadCode = function downloadCode() {
      var filename = void 0;
      if (this.submissionLoaded.language === 'Java') filename = 'Main.java';else if (this.submissionLoaded.language === 'C++') filename = 'main.cpp';else if (this.submissionLoaded.language === 'Python') filename = 'main.py';
      if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(this.codeDownload, filename);
      } else {
        var elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(this.codeDownload);
        elem.download = filename;
        document.body.appendChild(elem);
        elem.click();
        document.body.removeChild(elem);
      }
    };

    return Submissions;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'page', [_aureliaFramework.observable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'filterChange', [_aureliaFramework.observable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class);
});
define('text!modules/submissions/submissions.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"../../resources/elements/filter\"></require>\n  <require from=\"../../resources/elements/paginator\"></require>\n  <div slot=\"content\" class=\"body-slot\">\n    <div class=\"container\" if.bind=\"authService.isCoach() || authService.isStudent()\">\n      <h1 class=\"text-right\">Mis envios</h1>\n      <div class=\"col-md-12\">\n        <hr> Mostrar solo envios con veredicto:\n        <div class=\"dropdown dropdown-inline ufps-dropdown\">\n          <button class=\"btn btn-default dropdown-toggle\" type=\"button\" id=\"selectVeredict\" data-toggle=\"dropdown\" aria-haspopup=\"true\"\n            aria-expanded=\"true\">\n            ${veredict.text}\n            <span class=\"caret\"></span>\n          </button>\n          <ul class=\"dropdown-menu ufps-dropdown-menu dropdown-mini\" aria-labelledby=\"selectVeredict\">\n            <li repeat.for=\"i of veredictOptions\">\n              <a click.delegate=\"setVeredict(i)\">${i.text}</a>\n            </li>\n          </ul>\n        </div>\n        <div class=\"fix\"></div>\n      </div>\n      <filter number-of-items.bind=\"numberOfItems\" sort-options.bind=\"sortOptions\" filter-change.bind=\"filterChange\" limit.bind=\"limit\"\n        sort.bind=\"sort\" by.bind=\"by\" text-to-show.bind=\"'envios'\" language-flag.bind=\"false\"></filter>\n      <table>\n        <thead>\n          <tr>\n            <th class=\"text-center\">Problema</th>\n            <th class=\"text-center\">Dificultad</th>\n            <th class=\"text-center\">Fecha de envio</th>\n            <th class=\"text-center\">Veredicto</th>\n            <th class=\"text-center\">Tiempo de ejecución</th>\n            <th class=\"text-center\">Lenguaje</th>\n            <th class=\"text-center\">Código</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr repeat.for=\"submission of submissions\">\n            <td class=\"text-center\">\n              <p if.bind=\"submission.problem.title_es !== null\" class=\"ufps-name-problem-list ufps-name-problem-list-l\">\n                <a href=\"/problemas/${submission.problem.id}/detalle/es\">${submission.problem.title_es}</a>\n              </p>\n              <p if.bind=\"submission.problem.title_es === null\" class=\"ufps-name-problem-list ufps-name-problem-list-l\">\n                <a href=\"/problemas/${submission.problem.id}/detalle/en\">${submission.problem.title_en}</a>\n              </p>\n            </td>\n            <td class=\"text-center\">${submission.problem.level}</td>\n            <td class=\"text-center\">${showDate(submission.created_at)}</td>\n            <td class=\"text-center\" if.bind=\"submission.status !== 'executed'\">${mapVeredict(submission.status)}</td>\n            <td class=\"text-center\" if.bind=\"submission.status === 'executed'\">${mapVeredict(submission.verdict)}</td>\n            <td class=\"text-center\">${toFixed(submission.execution_time)}s</td>\n            <td class=\"text-center\">${submission.language}</td>\n            <td class=\"text-center\">\n              <p class=\"ufps-name-problem-list ufps-name-problem-list-l\">\n                <a click.delegate=\"viewCode(submission)\">Ver código</a>\n              </p>\n            </td>\n          </tr>\n          <tr if.bind=\"submissions.length === 0\">\n            <td colspan=\"7\">No has realizado ningún envio.</td>\n          </tr>\n        </tbody>\n      </table>\n      <paginator page.bind=\"page\" total-pages.bind=\"totalPages\"></paginator>\n    </div>\n    <div class=\"modal fade\" id=\"submission-detail\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"submission-detail\">\n      <div class=\"modal-dialog modal-lg\" role=\"document\">\n        <div class=\"modal-content\">\n          <div class=\"modal-header\">\n              <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n                  <span aria-hidden=\"true\">&times;</span>\n                </button>\n            <table>\n              <thead>\n                <tr>\n                  <th class=\"text-center\">Problema</th>\n                  <th class=\"text-center\">Dificultad</th>\n                  <th class=\"text-center\">Fecha de envio</th>\n                  <th class=\"text-center\">Veredicto</th>\n                  <th class=\"text-center\">Tiempo de ejecución</th>\n                  <th class=\"text-center\">Lenguaje</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr>\n                  <td class=\"text-center\">\n                    <p if.bind=\"submissionLoaded.problem.title_es !== null\" class=\"ufps-name-problem-list ufps-name-problem-list-l\">\n                      <a href=\"/problemas/${submissionLoaded.problem.id}/detalle/es\">${submissionLoaded.problem.title_es}</a>\n                    </p>\n                    <p if.bind=\"submissionLoaded.problem.title_es === null\" class=\"ufps-name-problem-list ufps-name-problem-list-l\">\n                      <a href=\"/problemas/${submissionLoaded.problem.id}/detalle/en\">${submissionLoaded.problem.title_en}</a>\n                    </p>\n                  </td>\n                  <td class=\"text-center\">${submissionLoaded.problem.level}</td>\n                  <td class=\"text-center\">${showDate(submissionLoaded.created_at)}</td>\n                  <td class=\"text-center\" if.bind=\"submissionLoaded.status !== 'executed'\">${mapVeredict(submissionLoaded.status)}</td>\n                  <td class=\"text-center\" if.bind=\"submissionLoaded.status === 'executed'\">${mapVeredict(submissionLoaded.verdict)}</td>\n                  <td class=\"text-center\">${toFixed(submissionLoaded.execution_time)}s</td>\n                  <td class=\"text-center\">${submissionLoaded.language}</td>\n                </tr>\n                <tr>\n                  <td colspan=\"6\">\n                    <div class=\"col-xs-12 text-center\">\n                        <a click.delegate=\"downloadCode()\" class=\"btn btn-default ufps-btn ufps-btn-default text-center\" if.bind=\"downloadActive\">Descargar código</a>\n                        <div class=\"ufps-separator-mini\"></div>\n                    </div>\n                    <pre>\n                      <code>\n${submissionLoaded.code}</code>\n                    </pre>\n                    \n                  </td>\n                </tr>\n              </tbody>\n            </table>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</template>\n"; });
define('modules/signin/signin',['exports', 'aurelia-framework', 'aurelia-router', 'config/config', 'models/models', 'services/services'], function (exports, _aureliaFramework, _aureliaRouter, _config, _models, _services) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Signin = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Signin = exports.Signin = (_dec = (0, _aureliaFramework.inject)(_services.Alert, _services.Auth, _aureliaRouter.Router), _dec(_class = function () {
    function Signin(alertService, authorizationService, router) {
      _classCallCheck(this, Signin);

      this.alertService = alertService;
      this.authorizationService = authorizationService;
      this.router = router;
      this.user = new _models.UserSignIn();
      this.user.code = 0;
      this.user.type = 0;
      this.isValidEmail = false;
    }

    Signin.prototype.signin = function signin() {
      var _this = this;

      if (this.user.isValid()) {
        if (this.user.password === this.user.confirmPassword) {
          this.authorizationService.registerStudent(this.user).then(function () {
            _this.alertService.showMessage(_config.MESSAGES.signInCorrect);
            _this.router.navigate('iniciar-sesion');
          }).catch(function (error) {
            switch (error.status) {
              case 400:
                _this.alertService.showMessage(_config.MESSAGES.signInWrongData);
                break;
              case 401:
                _this.alertService.showMessage(_config.MESSAGES.permissionsError);
                break;
              case 500:
                _this.alertService.showMessage(_config.MESSAGES.serverError);
                break;
              default:
                _this.alertService.showMessage(_config.MESSAGES.unknownError);
            }
          });
        } else {
          this.alertService.showMessage(_config.MESSAGES.signInDifferentPasswords);
          this.user.password = '';
          this.user.confirmPassword = '';
        }
      } else if (this.user.username.length < 6) {
        this.alertService.showMessage(_config.MESSAGES.usernameInvalid);
      } else {
        this.alertService.showMessage(_config.MESSAGES.signInIncompleteData);
      }
    };

    Signin.prototype.validEmail = function validEmail() {
      if (/^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(this.user.email)) this.isValidEmail = true;else this.isValidEmail = false;
    };

    return Signin;
  }()) || _class);
});
define('text!modules/signin/signin.html', ['module'], function(module) { module.exports = "<template>\n  <div slot=\"content\">\n    <div class=\"col-xs-12 text-center\">\n      <img class=\"ufps-logo-sign-in\" src=\"./src/assets/img/logo-transparent.png\" alt=\"\">\n    </div>\n    <div class=\"col-xs-10 col-xs-offset-1 text-center\">\n      <h1>Regístrate</h1>\n      <form submit.delegate = \"signin()\" class=\"text-left ufps-form-sign\">\n        <div class=\"form-group ufps-form-inline\">\n            \n          <input type=\"text\" class=\"ufps-form-text\" id=\"name\" value.bind=\"user.name\" required>\n          <label for=\"name\">\n            Nombre\n            <span if.bind=\"user.name !== '' && user.name !== null\" class=\"ufps-sign-in-correct glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>\n          </label>\n          <span class=\"ufps-form-bar\"></span>\n        </div>\n        <div class=\"form-group ufps-form-inline\">\n          <input type=\"text\" class=\"ufps-form-text\" id=\"nickname\"  value.bind=\"user.username\" required>\n          <label for=\"nickname\">\n            Username\n            <span if.bind=\"user.username !== '' && user.username !== null && user.username.length >= 6\" class=\"ufps-sign-in-correct glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>\n          </label>\n          <span class=\"ufps-form-bar\"></span>\n        </div>\n        <div class=\"form-group ufps-form-inline\">\n          <input type=\"number\" class=\"ufps-form-text\" id=\"code\" required value.bind=\"user.code\">\n          <label for=\"code\">\n            Código (0 si no eres estudiante UFPS)\n            <span class=\"ufps-sign-in-correct glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>\n          </label>\n          <span class=\"ufps-form-bar\"></span>\n        </div>\n        <div class=\"form-group ufps-form-inline\">\n          <input keyup.trigger=\"validEmail()\" type=\"email\" class=\"ufps-form-text\" id=\"email\"  value.bind=\"user.email\" required>\n          <label for=\"email\">\n            Correo Electrónico\n            <span if.bind=\"isValidEmail\" class=\"ufps-sign-in-correct glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>\n          </label>\n          <span class=\"ufps-form-bar\"></span>\n        </div>\n        <div class=\"form-group ufps-form-inline\">\n          <input type=\"password\" class=\"ufps-form-text\" id=\"password\"  value.bind=\"user.password\" required>\n          <label for=\"password\">\n            Contraseña\n            <span if.bind=\"user.password !== '' && user.password !== null && user.password.length >= 3\" class=\"ufps-sign-in-correct glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>\n          </label>\n          <span class=\"ufps-form-bar\"></span>\n        </div>\n        <div class=\"form-group ufps-form-inline\">\n          <input type=\"password\" class=\"ufps-form-text\" id=\"password2\"  value.bind=\"user.confirmPassword\" required>\n          <label for=\"password2\">\n            Repite la contraseña\n            <span if.bind=\"user.password === user.confirmPassword && user.password !== '' && user.password !== null && user.password.length >= 3\" class=\"ufps-sign-in-correct glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>\n          </label>\n          <span class=\"ufps-form-bar\"></span>\n        </div>\n        <input type=\"submit\" class=\"btn ufps-btn-sign\" value=\"Regístrate\">\n      </form>\n\n      <div class=\"col-xs-12 text-center ufps-sign-links\">\n        <a route-href=\"route: login\">¿Ya tienes una cuenta? ¡Inicia Sesión!</a>\n      </div>\n    </div>\n  </div>\n</template>\n"; });
define('modules/search/search',['exports', 'aurelia-framework', 'aurelia-router', 'config/config', 'models/models', 'services/services'], function (exports, _aureliaFramework, _aureliaRouter, _config, _models, _services) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Search = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2;

  var Search = exports.Search = (_dec = (0, _aureliaFramework.inject)(_services.Alert, _aureliaRouter.Router, _services.Problems), _dec(_class = (_class2 = function () {
    function Search(alertService, routerService, problemService) {
      _classCallCheck(this, Search);

      _initDefineProp(this, 'page', _descriptor, this);

      _initDefineProp(this, 'filterChange', _descriptor2, this);

      this.alertService = alertService;
      this.routerService = routerService;
      this.problemService = problemService;
      this.totalPages = 1;
      this.page = 1;
      this.numberOfItems = [10, 20, 30, 50];
      this.sortOptions = ['Id', 'Nombre', 'Dificultad'];
      this.filterChange = false;
      this.dataLoaded = false;
      this.limit = 10;
      this.sort = 'Id';
      this.by = 'Ascendente';
      this.language = 'Cualquier idioma';
      this.pagination = [];
      this.problems = [];
    }

    Search.prototype.activate = function activate(params, routeConfig) {
      this.routeConfig = routeConfig;
      this.query = params.query.replace(/\+/g, ' ');
      this.getQuery();
    };

    Search.prototype.filterChangeChanged = function filterChangeChanged(act, prev) {
      if (prev !== undefined) this.getQuery();
    };

    Search.prototype.pageChanged = function pageChanged(act, prev) {
      if (prev !== undefined) this.getQuery();
    };

    Search.prototype.getQuery = function getQuery() {
      var _this = this;

      var stringLang = void 0;
      if (this.language === 'Español') stringLang = 'es';else if (this.language === 'Inglés') stringLang = 'en';else stringLang = undefined;
      this.problemService.searchProblems(this.query, this.page, this.limit, this.sort === 'Nombre' ? 'name' : this.sort === 'Dificultad' ? 'level' : undefined, this.by === 'Ascendente' ? 'asc' : 'desc', stringLang).then(function (data) {
        _this.totalPages = data.meta.totalPages;
        _this.problems = [];
        _this.dataLoaded = true;
        if (_this.totalPages > 0) {
          for (var i = 0; i < data.data.length; i++) {
            _this.problems.push(new _models.Problem(data.data[i].id, data.data[i].title_en, data.data[i].title_es, data.data[i].level));
            if (data.data[i].submissions.length > 0) _this.problems[i].resolved = true;
          }
        }
      }).catch(function (error) {
        if (error.status === 401) {
          _this.alertService.showMessage(_config.MESSAGES.permissionsError);
        } else {
          _this.alertService.showMessage(_config.MESSAGES.unknownError);
        }
      });
    };

    return Search;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'page', [_aureliaFramework.observable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'filterChange', [_aureliaFramework.observable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class);
});
define('text!modules/search/search.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"../../resources/elements/filter\"></require>\n  <require from=\"../../resources/elements/paginator\"></require>\n  <div slot=\"content\" class=\"body-slot\">\n    <div class=\"container\">\n      <h2 if.bind=\"query !== ' '\" class=\"text-right\">Resultados para \"${query}\"</h2>\n      <h2 if.bind=\"query === ' '\" class=\"text-right\">Problemas</h2>\n      <p if.bind=\"query === ' '\" class=\"ufps-language text-right\">\n        <a route-href=\"route: problems;\"><span class=\"active\">Categorías</span></a> |\n        <span class=\"active selected\">Lista completa</span>\n      </p>\n      <hr>\n      <filter number-of-items.bind=\"numberOfItems\" sort-options.bind=\"sortOptions\" filter-change.bind=\"filterChange\" limit.bind=\"limit\"\n        sort.bind=\"sort\" by.bind=\"by\" text-to-show.bind=\"'problemas'\" language-flag.bind=\"true\" language.bind=\"language\"></filter>\n      <table>\n        <thead>\n          <tr>\n            <th class=\"text-center\" style=\"width:5%\">Id</th>\n            <th class=\"text-center\" style=\"width:70%\">Problema</th>\n            <th class=\"text-center\" style=\"width:10%\">Dificultad</th>\n            <th class=\"text-center\" style=\"width:15%\">Idioma</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr repeat.for=\"problem of problems\">\n            <td class=\"text-center\">${problem.id}</td>\n            <td class=\"text-left ufps-td-problem\">\n              <p if.bind=\"problem.isInSpanish() && language !== 'Inglés'\" class=\"ufps-name-problem-list\">\n                <a href=\"/problemas/${problem.id}/detalle/es\">${problem.titleES}</a>\n              </p>\n              <p if.bind=\"!problem.isInSpanish() || (problem.isInEnglish() && language === 'Inglés')\" class=\"ufps-name-problem-list\">\n                <a href=\"/problemas/${problem.id}/detalle/en\">${problem.titleEN}</a>\n              </p>\n              <span if.bind=\"problem.resolved\" class=\"ufps-edit-problem-list glyphicon glyphicon-ok\" data-toggle=\"tooltip\" title=\"Ya solucionaste este problema\" tooltip></span>            \n            </td>\n            <td class=\"text-center\">${problem.level}</td>\n            <td class=\"text-center ufps-language\">\n              <span class=\"${problem.isInSpanish() ? 'active' : 'inactive'}\">\n                <a href=\"/problemas/${problem.id}/detalle/es\">ES</a>\n              </span>\n              |\n              <span class=\"${problem.isInEnglish() ? 'active' : 'inactive'}\">\n                <a href=\"/problemas/${problem.id}/detalle/en\">EN</a>\n              </span>\n            </td>\n          </tr>\n          <tr if.bind=\"problems.length === 0 && dataLoaded\">\n            <td colspan=\"4\">Ningun problema coincide con el criterio de búsqueda</td>\n          </tr>\n          <tr if.bind=\"!dataLoaded\">\n            <td colspan=\"4\">Cargando resultados para \"${query}\"...</td>\n          </tr>\n        </tbody>\n      </table>\n      <paginator page.bind=\"page\" total-pages.bind=\"totalPages\"></paginator>\n    </div>\n  </div>\n</template>\n"; });
define('modules/recovery/reset-password',['exports', 'aurelia-framework', 'aurelia-router', 'config/config', 'models/models', 'services/services'], function (exports, _aureliaFramework, _aureliaRouter, _config, _models, _services) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ResetPassword = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var ResetPassword = exports.ResetPassword = (_dec = (0, _aureliaFramework.inject)(_services.Alert, _services.Auth, _aureliaRouter.Router), _dec(_class = function () {
    function ResetPassword(alertService, authorizationService, router) {
      _classCallCheck(this, ResetPassword);

      this.alertService = alertService;
      this.authorizationService = authorizationService;
      this.router = router;
      this.user = new _models.UserReset();
      this.tokenValid = false;
    }

    ResetPassword.prototype.activate = function activate(params, routeConfig) {
      this.routeConfig = routeConfig;
      this.user.token = params.token;
      try {
        this.user.email = this.authorizationService.validateResetToken(this.user.token);
        this.tokenValid = true;
      } catch (error) {
        if (error.message === 'invalid token') {
          this.alertService.showMessage(_config.MESSAGES.recoveryInvalidToken);
        } else if (error.message === 'expired token') {
          this.alertService.showMessage(_config.MESSAGES.recoveryExpiredToken);
        }
        this.router.navigate('recuperar-password');
      }
    };

    ResetPassword.prototype.requestResetPassword = function requestResetPassword() {
      var _this = this;

      if (this.user.password !== '' && this.user.confirmPassword === this.user.password) {
        this.authorizationService.resetPassword(this.user).then(function () {
          _this.alertService.showMessage(_config.MESSAGES.recoveryCorrect);
          _this.router.navigate('iniciar-sesion');
        }).catch(function (error) {
          switch (error.status) {
            case 400:
              _this.alertService.showMessage(_config.MESSAGES.recoveryDifferentPasswords);
              _this.user.password = '';
              _this.user.confirmPassword = '';
              break;
            case 500:
              _this.alertService.showMessage(_config.MESSAGES.serverError);
              break;
            default:
              _this.alertService.showMessage(_config.MESSAGES.unknownError);
          }
        });
      } else {
        this.alertService.showMessage(_config.MESSAGES.recoveryDifferentPasswords);
        this.user.password = '';
        this.user.confirmPassword = '';
      }
    };

    return ResetPassword;
  }()) || _class);
});
define('text!modules/recovery/reset-password.html', ['module'], function(module) { module.exports = "<template>\n  <div slot=\"content\">\n    <div class=\"col-xs-12 text-center\">\n      <img class=\"ufps-logo-sign\" src=\"../src/assets/img/logo-transparent.png\" alt=\"\">\n    </div>\n    <div class=\"col-xs-10 col-xs-offset-1 text-center\">\n      <h1>Nueva contraseña</h1>\n      <form submit.delegate=\"requestResetPassword()\" class=\"text-left ufps-form-sign\">\n        <div class=\"form-group\">\n          <label for=\"email\">Correo Electrónico</label>\n          <input type=\"email\" class=\"form-control ufps-sign-input\" id=\"email\" placeholder=\"Email\" value.bind = \"user.email\" required disabled>\n        </div>\n        <div class=\"form-group\">\n          <label for=\"password\">Nueva Contraseña</label>\n          <input type=\"password\" class=\"form-control ufps-sign-input\" id=\"password\" placeholder=\"Contraseña\" value.bind = \"user.password\" required disabled.bind = \"!tokenValid\">\n        </div>\n        <div class=\"form-group\">\n          <label for=\"password\">Repite la contraseña</label>\n          <input type=\"password\" class=\"form-control ufps-sign-input\" id=\"password2\" placeholder=\"Repite la contraseña\" value.bind = \"user.confirmPassword\" required disabled.bind = \"!tokenValid\">\n        </div>\n        <input type=\"submit\" class=\"btn ufps-btn-sign\" value=\"Cambiar contraseña\">\n      </form>\n      \n    </div>\n  </div>\n</template>"; });
define('modules/recovery/recovery-password',['exports', 'aurelia-framework', 'config/config', 'services/services'], function (exports, _aureliaFramework, _config, _services) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.RecoveryPassword = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var RecoveryPassword = exports.RecoveryPassword = (_dec = (0, _aureliaFramework.inject)(_services.Alert, _services.Auth), _dec(_class = function () {
    function RecoveryPassword(alertService, authService) {
      _classCallCheck(this, RecoveryPassword);

      this.alertService = alertService;
      this.authService = authService;
      this.email = '';
    }

    RecoveryPassword.prototype.requestRecovery = function requestRecovery() {
      var _this = this;

      if (this.email !== '') {
        this.authService.requestRecovery(this.email).then(function () {
          _this.alertService.showMessage(_config.MESSAGES.recoveryEmailSent);
        }).catch(function (error) {
          switch (error.status) {
            case 400:
              _this.alertService.showMessage(_config.MESSAGES.recoveryMailDoesNotExist);
              break;
            case 500:
              _this.alertService.showMessage(_config.MESSAGES.serverError);
              break;
            default:
              _this.alertService.showMessage(_config.MESSAGES.unknownError);
          }
        });
      }
    };

    return RecoveryPassword;
  }()) || _class);
});
define('text!modules/recovery/recovery-password.html', ['module'], function(module) { module.exports = "<template>\n  <div slot=\"content\">\n    <div class=\"col-xs-12 text-center\">\n      <img class=\"ufps-logo-sign\" src=\"./src/assets/img/logo-transparent.png\" alt=\"\">\n    </div>\n    <div class=\"col-xs-10 col-xs-offset-1 text-center\">\n      <h1>Nueva contraseña</h1>\n      <form submit.delegate = \"requestRecovery()\" class=\"text-left ufps-form-sign\">\n        <div class=\"form-group\">\n          <label for=\"email\">Correo Electrónico</label>\n          <input type=\"email\" class=\"form-control ufps-sign-input\" id=\"email\" placeholder=\"Email\" value.bind=\"email\" required>\n        </div>\n        <input type=\"submit\" class=\"btn ufps-btn-sign\" value=\"Recuperar contraseña\">\n      </form>\n      <div class=\"col-xs-4 text-left ufps-sign-links\">\n        <a route-href=\"route: signin\">Regístrate</a>\n      </div>\n      <div class=\"col-xs-8 text-right ufps-sign-links\">\n        <a route-href=\"route: login\">Inicia Sesión</a>\n      </div>\n      \n    </div>\n  </div>\n</template>"; });
define('modules/ranking/ranking',['exports', 'aurelia-framework', 'config/config', 'services/services'], function (exports, _aureliaFramework, _config, _services) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Ranking = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _class, _desc, _value, _class2, _descriptor;

  var Ranking = exports.Ranking = (_dec = (0, _aureliaFramework.inject)(_services.Alert, _services.Rankings), _dec(_class = (_class2 = function () {
    function Ranking(alertService, rankingService) {
      _classCallCheck(this, Ranking);

      _initDefineProp(this, 'page', _descriptor, this);

      this.alertService = alertService;
      this.rankingService = rankingService;
      this.page = 1;
      this.totalPages = 1;
      this.dataLoaded = false;
      this.users = [];
      this.getRanking();
    }

    Ranking.prototype.pageChanged = function pageChanged(act, prev) {
      if (prev !== undefined) this.getRanking();
    };

    Ranking.prototype.getRanking = function getRanking() {
      var _this = this;

      this.rankingService.getRanking(30, this.page).then(function (data) {
        _this.totalPages = data.meta.totalPages;
        _this.users = data.data;
        _this.dataLoaded = true;
      }).catch(function (error) {
        if (error.status === 404) {
          _this.alertService.showMessage(_config.MESSAGES.unknownError);
        } else {
          _this.alertService.showMessage(_config.MESSAGES.serverError);
        }
      });
    };

    return Ranking;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'page', [_aureliaFramework.observable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class);
});
define('text!modules/ranking/ranking.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"../../resources/elements/filter\"></require>\n  <require from=\"../../resources/elements/paginator\"></require>\n  <div slot=\"content\" class=\"body-slot\">\n    <div class=\"container\">\n      <h1 class=\"text-right\">Clasificación general</h1>\n      <hr>\n      <table>\n        <thead>\n          <tr>\n            <th class=\"text-center\" style=\"width:5%\">Puesto</th>\n            <th class=\"text-center\" style=\"width:75%\">Usuario</th>\n            <th class=\"text-center\" style=\"width:10%\">Soluciones correctas</th>\n            <th class=\"text-center\" style=\"width:10%\">Envios realizados</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr repeat.for=\"user of users\">\n            <td class=\"text-center\">${(((page - 1) * 30) + $index + 1)}</td>\n            <td>${user.name} <span class=\"username-gray\">(${user.username})</span></td>\n            <td class=\"text-center\">${user.accepted}</td>\n            <td class=\"text-center\">${user.total}</td>\n          </tr>\n          <tr if.bind=\"users.length === 0 && dataLoaded\">\n            <td  colspan=\"4\">No hay usuarios actualmente registrados en la plataforma.</td>\n          </tr>\n          <tr if.bind=\"!dataLoaded\">\n              <td colspan=\"4\">Cargando ranking...</td>\n            </tr>\n        </tbody>\n      </table>\n      <paginator page.bind=\"page\" total-pages.bind=\"totalPages\"></paginator>\n    </div>\n  </div>\n</template>\n"; });
define('modules/profile/profile',['exports', 'aurelia-framework', 'config/config', 'models/models', 'services/services'], function (exports, _aureliaFramework, _config, _models, _services) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Profile = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Profile = exports.Profile = (_dec = (0, _aureliaFramework.inject)(_services.Alert, _services.Auth, _services.Rankings), _dec(_class = function () {
    function Profile(alertService, authService, rankingService) {
      _classCallCheck(this, Profile);

      this.alertService = alertService;
      this.rankingService = rankingService;
      this.authService = authService;
      this.user = new _models.UserSignIn();
      this.newUser = new _models.UserSignIn();
      this.date = new Date();
      this.oldPassword = '';
      this.newPassword = '';
      this.retypePassword = '';
      this.veredicts = {
        labels: ['Correcto', 'Tiempo limite excedido', 'Error en tiempo de ejecución', 'Error de compilación', 'Respuesta incorrecta'],
        datasets: [{
          label: 'Resultados',
          data: [0, 0, 0, 0, 0],
          backgroundColor: ['rgba(46, 204, 113,1.0)', 'rgba(52, 152, 219,1.0)', 'rgba(155, 89, 182,1.0)', 'rgba(251, 197, 49,1.0)', 'rgba(255, 99, 132,1.0)'],
          borderWidth: 0
        }]
      };
      this.langs = {
        labels: ['Java', 'C++', 'Python'],
        datasets: [{
          label: 'Lenguajes usados',
          data: [0, 0, 0],
          backgroundColor: ['rgba(46, 204, 113,1.0)', 'rgba(52, 152, 219,1.0)', 'rgba(255, 99, 132,1.0)'],
          borderWidth: 0
        }]
      };
      if (this.authService.isCoach() || this.authService.isStudent()) {
        this.getStatsByVerdict();
        this.getStatsByLang();
      }
      this.getProfile();
    }

    Profile.prototype.getProfile = function getProfile() {
      var _this = this;

      this.rankingService.loadProfile(this.authService.getUserId()).then(function (data) {
        _this.user = new _models.UserSignIn(data.email, null, null, data.name, data.username, data.code, null, data.id);
        _this.newUser = new _models.UserSignIn(data.email, null, null, data.name, data.username, data.code, null, data.id);
        _this.date = new Date(data.created_at);
        if (_this.user.code === null) _this.user.code = 'No registrado';
      }).catch(function (error) {
        _this.user = new _models.UserSignIn();
        _this.newUser = new _models.UserSignIn();
        _this.date = new Date();
        if (error.status === 401) {
          _this.alertService.showMessage(_config.MESSAGES.permissionsError);
        } else {
          _this.alertService.showMessage(_config.MESSAGES.unknownError);
        }
      });
    };

    Profile.prototype.getDate = function getDate() {
      var months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
      return this.date.getDate() + ' de ' + months[this.date.getMonth()] + ' del ' + this.date.getFullYear();
    };

    Profile.prototype.getStatsByVerdict = function getStatsByVerdict() {
      var _this2 = this;

      this.rankingService.loadStatsByVerdict(this.authService.getUserId()).then(function (data) {
        for (var i = 0; i < data.length; i++) {
          if (data[i].verdict === 'Accepted') _this2.veredicts.datasets[0].data[0] = data[i].total;else if (data[i].verdict === 'Time Limit Exceeded') _this2.veredicts.datasets[0].data[1] = data[i].total;else if (data[i].verdict === 'Runtime Error') _this2.veredicts.datasets[0].data[2] = data[i].total;else if (data[i].verdict === 'Compilation Error') _this2.veredicts.datasets[0].data[3] = data[i].total;else if (data[i].verdict === 'Wrong Answer') _this2.veredicts.datasets[0].data[4] = data[i].total;
        }
      }).catch(function (error) {
        if (error.status === 401) {
          _this2.alertService.showMessage(_config.MESSAGES.permissionsError);
        } else {
          _this2.alertService.showMessage(_config.MESSAGES.unknownError);
        }
      });
    };

    Profile.prototype.getStatsByLang = function getStatsByLang() {
      var _this3 = this;

      this.rankingService.loadStatsByLang(this.authService.getUserId()).then(function (data) {
        for (var i = 0; i < data.length; i++) {
          if (data[i].language === 'Java') _this3.langs.datasets[0].data[0] = data[i].total;else if (data[i].language === 'C++') _this3.langs.datasets[0].data[1] = data[i].total;else if (data[i].language === 'Python') _this3.langs.datasets[0].data[2] = data[i].total;
        }
      }).catch(function (error) {
        if (error.status === 401) {
          _this3.alertService.showMessage(_config.MESSAGES.permissionsError);
        } else {
          _this3.alertService.showMessage(_config.MESSAGES.unknownError);
        }
      });
    };

    Profile.prototype.showEditProfile = function showEditProfile() {
      window.$('#edit-profile').modal('show');
    };

    Profile.prototype.showEditPassword = function showEditPassword() {
      window.$('#edit-password').modal('show');
    };

    Profile.prototype.editPassword = function editPassword() {
      var _this4 = this;

      if (this.newPassword !== this.retypePassword) {
        this.alertService.showMessage(_config.MESSAGES.signInDifferentPasswords);
        window.$('#edit-password').modal('hide');
      } else {
        this.authService.setPassword(this.authService.getUserId(), this.oldPassword, this.newPassword, this.retypePassword).then(function (data) {
          window.$('#edit-password').modal('hide');
          _this4.oldPassword = '';
          _this4.newPassword = '';
          _this4.retypePassword = '';
          _this4.alertService.showMessage(_config.MESSAGES.passwordUpdated);
        }).catch(function (error) {
          if (error.status === 401) {
            _this4.alertService.showMessage(_config.MESSAGES.incorrectPassword);
          } else {
            _this4.alertService.showMessage(_config.MESSAGES.unknownError);
          }
          window.$('#edit-password').modal('hide');
        });
      }
    };

    Profile.prototype.editProfile = function editProfile() {
      var _this5 = this;

      if (this.newUser.username.length < 6) {
        this.alertService.showMessage(_config.MESSAGES.usernameInvalid);
        window.$('#edit-profile').modal('hide');
      } else if (/^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(this.newUser.email) === false) {
        this.alertService.showMessage(_config.MESSAGES.emailInvalid);
        window.$('#edit-profile').modal('hide');
      } else {
        this.authService.editProfile(this.authService.getUserId(), this.newUser.email, this.newUser.username, this.newUser.name, this.newUser.code).then(function (data) {
          window.$('#edit-profile').modal('hide');
          _this5.alertService.showMessage(_config.MESSAGES.profileUpdated);
          _this5.user.email = data.email;
          _this5.user.username = data.username;
          _this5.user.name = data.name;
          _this5.user.code = data.code;
        }).catch(function (error) {
          if (error.status === 401) {
            _this5.alertService.showMessage(_config.MESSAGES.permissionsError);
          } else {
            _this5.alertService.showMessage(_config.MESSAGES.unknownError);
          }
          window.$('#edit-profile').modal('hide');
        });
      }
    };

    return Profile;
  }()) || _class);
});
define('text!modules/profile/profile.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"../../resources/elements/paginator\"></require>\n  <require from=\"../../resources/elements/filter\"></require>\n  <div slot=\"content\" class=\"body-slot\">\n    <div class=\"container\">\n      <h2 class=\"text-right\">Perfil</h2>\n      <hr>\n      <div class=\"row\">\n        <div class=\"col-xs-12\">\n          <table>\n            <thead>\n              <tr>\n                <th colspan=\"2\" class=\"text-center\">Datos personales</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr>\n                <td>Nombre:</td>\n                <td>${user.name}</td>\n              </tr>\n              <tr>\n                <td>Nombre de usuario:</td>\n                <td>@${user.username}</td>\n              </tr>\n              <tr>\n                <td>Correo electrónico:</td>\n                <td>${user.email}</td>\n              </tr>\n              <tr>\n                <td>Id:</td>\n                <td>${user.id}</td>\n              </tr>\n              <tr>\n                <td>Código:</td>\n                <td>${user.code}</td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n      </div>\n      <div class=\"ufps-separator-mini\"></div>\n      <div class=\"row\">\n        <div class=\"col-xs-12 text-right\">\n          <a class=\"ufps-btn ufps-btn-default btn btn-default\" click.delegate=\"showEditProfile()\">Editar perfil</a>\n          <a class=\"ufps-btn ufps-btn-default btn btn-default\" click.delegate=\"showEditPassword()\">Cambiar contraseña</a>\n        </div>\n      </div>\n      <div class=\"ufps-separator-mini\"></div>\n      <div class=\"row\" if.bind=\"!authService.isAdmin()\">\n        <h2 class=\"text-right\">Estadísticas</h2>\n        <hr>\n        <div class=\"fix\"></div>\n        <div class=\"col-sm-12 col-md-6\">\n          <div class=\"panel panel-default\">\n            <div class=\"panel-body\">\n              <h4 class=\"text-center\">Veredictos</h4>\n              <canvas chart=\"type: pie; data.bind: veredicts; should-update: true; throttle: 100;\"></canvas>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-sm-12 col-md-6\">\n          <div class=\"panel panel-default\">\n            <div class=\"panel-body\">\n              <h4 class=\"text-center\">Lenguajes</h4>\n              <canvas chart=\"type: pie; data.bind: langs; should-update: true; throttle: 100;\"></canvas>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n\n    <div if.bind=\"authService.authenticated\" class=\"modal fade\" id=\"edit-profile\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"edit-profile\">\n      <div class=\"modal-dialog\" role=\"document\">\n        <div class=\"modal-content\">\n          <div class=\"modal-header text-center\">\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n              <span aria-hidden=\"true\">&times;</span>\n            </button>\n            <h4 class=\"modal-title\">Editar perfil</h4>\n            <br>\n            <form submit.delegate=\"editProfile()\" class=\"text-left\">\n              <label>Nombre:</label>\n              <input type=\"text\" class=\"form-control\" placeholder=\"Nombre\" value.bind=\"newUser.name\" required>\n              <br>\n              <label>Username:</label>\n              <input type=\"text\" class=\"form-control\" placeholder=\"Username\" value.bind=\"newUser.username\" required>\n              <br>\n              <label>Correo electrónico:</label>\n              <input type=\"email\" class=\"form-control\" placeholder=\"Correo electrónico\" value.bind=\"newUser.email\" required>\n              <br>\n              <label>Código:</label>\n              <input type=\"number\" class=\"form-control\" placeholder=\"Código\" value.bind=\"newUser.code\">\n              <br>\n              <input type=\"submit\" class=\"btn btn-default ufps-btn-default\" value=\"Guardar cambios\">\n            </form>\n          </div>\n        </div>\n      </div>\n    </div>\n\n\n    <div if.bind=\"authService.authenticated\" class=\"modal fade\" id=\"edit-password\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"edit-password\">\n      <div class=\"modal-dialog\" role=\"document\">\n        <div class=\"modal-content\">\n          <div class=\"modal-header text-center\">\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n              <span aria-hidden=\"true\">&times;</span>\n            </button>\n            <h4 class=\"modal-title\">Editar contraseña</h4>\n            <br>\n            <form submit.delegate=\"editPassword()\" class=\"text-left\">\n              <label>Contraseña actual:</label>\n              <input type=\"password\" class=\"form-control\" placeholder=\"Contraseña actual\" value.bind=\"oldPassword\" required>\n              <br>\n              <label>Nueva contraseña:</label>\n              <input type=\"password\" class=\"form-control\" placeholder=\"Nueva contraseña\" value.bind=\"newPassword\" required>\n              <br>\n              <label>Repita la contraseña:</label>\n              <input type=\"password\" class=\"form-control\" placeholder=\"Repita la contraseña\" value.bind=\"retypePassword\" required>\n              <br>\n              <input type=\"submit\" class=\"btn btn-default ufps-btn-default\" value=\"Guardar contraseña\">\n            </form>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</template>\n"; });
define('modules/problems/view-problem/view-problem',['exports', 'aurelia-framework', 'aurelia-router', 'config/config', 'models/models', 'services/services'], function (exports, _aureliaFramework, _aureliaRouter, _config, _models, _services) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ViewProblem = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var ViewProblem = exports.ViewProblem = (_dec = (0, _aureliaFramework.inject)(_services.Alert, _services.Auth, _services.Problems, _aureliaRouter.Router), _dec(_class = function () {
    function ViewProblem(alertService, authService, problemService, routerService) {
      _classCallCheck(this, ViewProblem);

      this.alertService = alertService;
      this.authService = authService;
      this.problemService = problemService;
      this.routerService = routerService;
      this.languages = _config.SETTINGS.languages;
      this.language;
      this.code;
      this.sourceValid = false;
    }

    ViewProblem.prototype.activate = function activate(params, routeConfig) {
      var _this = this;

      this.routeConfig = routeConfig;
      this.id = params.id;
      this.lang = params.lang || 'en';

      this.problemService.getProblem(this.id).then(function (problem) {
        problem = problem.problem;
        _this.problem = new _models.Problem(parseInt(params.id), problem.title_en, problem.title_es, parseInt(problem.level), parseInt(problem.category_id), undefined, problem.description_en, problem.description_es, problem.example_input !== 'undefined' ? problem.example_input.replace(/\r\n/g, '\n') : '', problem.example_output !== 'undefined' ? problem.example_output.replace(/\r\n/g, '\n') : '', parseFloat(problem.time_limit), problem.user_id, problem.user.username);
        if (problem.submissions.length > 0) _this.problem.resolved = true;
        if (_this.lang === 'en' && !_this.problem.isInEnglish()) {
          _this.lang = 'es';
        } else if (_this.lang === 'es' && !_this.problem.isInSpanish()) {
          _this.lang = 'en';
        }
      }).catch(function (error) {
        if (error.status === 401 || error.status === 403) {
          _this.alertService.showMessage(_config.MESSAGES.permissionsError);
        } else if (error.status === 500) {
          _this.alertService.showMessage(_config.MESSAGES.serverError);
        } else {
          _this.alertService.showMessage(_config.MESSAGES.unknownError);
        }
        _this.routerService.navigate('');
      });
    };

    ViewProblem.prototype.showES = function showES() {
      if (this.problem.isInSpanish()) {
        this.lang = 'es';
      }
    };

    ViewProblem.prototype.showEN = function showEN() {
      if (this.problem.isInEnglish()) {
        this.lang = 'en';
      }
    };

    ViewProblem.prototype.validateCode = function validateCode() {
      var _this2 = this;

      if (this.code.length === 1) {
        if (this.code[0].type.startsWith('text/') || this.code[0].name.endsWith('.java') || this.code[0].name.endsWith('.cpp') || this.code[0].name.endsWith('.c') || this.code[0].name.endsWith('.cc') || this.code[0].name.endsWith('.cp') || this.code[0].name.endsWith('.cxx') || this.code[0].name.endsWith('.py')) {
          this.sourceValid = true;
          if (this.code[0].name.endsWith('.java')) {
            this.language = 'Java';
            var reader = new FileReader();
            reader.onload = function () {
              var tmp = reader.result.replace(/ /g, '');
              tmp = tmp.replace(/\n|\r\n|\r/g, '');
              if (tmp.search('publicclassMain') < 0) {
                _this2.code = null;
                _this2.sourceValid = false;
                _this2.alertService.showMessage(_config.MESSAGES.invalidJavaClassname);
              }
            };
            reader.readAsText(this.code[0]);
          } else if (this.code[0].name.endsWith('.py')) {
            this.language = 'Python';
          } else if (this.code[0].name.endsWith('.cpp') || this.code[0].name.endsWith('.c') || this.code[0].name.endsWith('.cc') || this.code[0].name.endsWith('.cp') || this.code[0].name.endsWith('.cxx')) {
            this.language = 'C++';
          }
        } else {
          this.code = null;
          this.sourceValid = false;
          this.alertService.showMessage(_config.MESSAGES.invalidCode);
        }
      }
    };

    ViewProblem.prototype.submit = function submit() {
      var _this3 = this;

      if (!this.sourceValid) {
        this.alertService.showMessage(_config.MESSAGES.invalidCode);
      } else if (this.language === null) {
        this.alertService.showMessage(_config.MESSAGES.invalidLanguage);
      } else {
        this.problemService.submitSolution(this.id, this.language, undefined, undefined, this.code[0]).then(function (data) {
          _this3.alertService.showMessage(_config.MESSAGES.submittedSolution);
          _this3.language = null;
          _this3.code = null;
          _this3.sourceValid = false;
        }).catch(function (error) {
          if (error.status === 401 || error.status === 403) {
            _this3.alertService.showMessage(_config.MESSAGES.permissionsError);
          } else if (error.status === 500) {
            _this3.alertService.showMessage(_config.MESSAGES.serverError);
          } else {
            _this3.alertService.showMessage(_config.MESSAGES.unknownError);
          }
        });
      }
    };

    return ViewProblem;
  }()) || _class);
});
define('text!modules/problems/view-problem/view-problem.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"../../../resources/attributes/markdown\"></require>\n  <require from=\"../../../resources/attributes/tooltip\"> </require>\n  <div class=\"container-fluid\">\n    <div class=\"col-xs-12\" if.bind=\"lang === 'en'\">\n      <ol class=\"breadcrumb\">\n        <li>\n          <a route-href=\"route: problems;\">Categorías</a>\n        </li>\n        <li>\n          <a href=\"/problemas/categoria/${problem.category}\">Problemas en esta categoría</a>\n        </li>\n        <li class=\"active\">Problema \"${problem.titleEN}\"</li>\n      </ol>\n    </div>\n    <div class=\"col-xs-12\" if.bind=\"lang === 'es'\">\n      <ol class=\"breadcrumb\">\n        <li>\n          <a route-href=\"route: problems;\">Categorías</a>\n        </li>\n        <li>\n          <a href=\"/problemas/categoria/${problem.category}\">Problemas en esta categoría</a>\n        </li>\n        <li class=\"active\">Problema \"${problem.titleES}\"</li>\n      </ol>\n    </div>\n    <div class=\"col-md-9\">\n      <div class=\"ufps-separator-mini\"></div>\n      <div class=\"panel panel-default\">\n        <div class=\"panel-body\" show.bind=\"lang === 'es'\">\n          <h1 class=\"text-center ufps-problem-title\">${problem.titleES} \n          </h1>\n          <p class=\"ufps-language text-center\">\n            <span class=\"${problem.isInSpanish() ? 'active' : 'inactive'}\" click.delegate=\"showES()\">ES</span> |\n            <span class=\"${problem.isInEnglish() ? 'active' : 'inactive'}\" click.delegate=\"showEN()\">EN</span>\n          </p>\n          <p class=\"ufps-markdown-editor\" markdown.bind=\"problem.descriptionES\"></p>\n          <div class=\"col-xs-12\">\n            <div class=\"col-md-6\">\n              <h3 class=\"text-center\">Entrada de ejemplo</h3>\n              <div class=\"well example-in-out\">\n                <pre>${problem.exampleInput}</pre>\n              </div>\n            </div>\n            <div class=\"col-md-6\">\n              <h3 class=\"text-center\">Salida de ejemplo</h3>\n              <div class=\"well example-in-out\">\n                <pre>${problem.exampleOutput}</pre>\n              </div>\n            </div>\n          </div>\n        </div>\n        <div class=\"panel-body\" show.bind=\"lang === 'en'\">\n          <h1 class=\"text-center ufps-problem-title\">${problem.titleEN}</h1>\n          <p class=\"ufps-language text-center\">\n            <span class=\"${problem.isInSpanish() ? 'active' : 'inactive'}\" click.delegate=\"showES()\">ES</span> |\n            <span class=\"${problem.isInEnglish() ? 'active' : 'inactive'}\" click.delegate=\"showEN()\">EN</span>\n          </p>\n          <p class=\"ufps-markdown-editor\" markdown.bind=\"problem.descriptionEN\"></p>\n          <div class=\"col-xs-12\">\n            <div class=\"col-md-6\">\n              <h3 class=\"text-center\">Entrada de ejemplo</h3>\n              <div class=\"well example-in-out\">\n                <pre>${problem.exampleInput}</pre>\n\n              </div>\n            </div>\n            <div class=\"col-md-6\">\n              <h3 class=\"text-center\">Salida de ejemplo</h3>\n              <div class=\"well example-in-out\">\n                <pre>${problem.exampleOutput}</pre>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-md-3\">\n      <div class=\"ufps-separator-mini\"></div>\n      <div class=\"panel panel-default\">\n        <div class=\"panel-body\">\n          <p show.bind=\"lang === 'en'\">\n            <strong>Problema:</strong> ${problem.titleEN}</p>\n          <p show.bind=\"lang === 'es'\">\n            <strong>Problema:</strong> ${problem.titleES}</p>\n          <p>\n            <strong>Dificultad:</strong> ${problem.level}</p>\n          <p if.bind=\"!authService.isAdmin()\">Selecciona el archivo con tu código, y el lenguaje a utilizar.</p>\n          <a if.bind=\"authService.isAdmin()\" route-href=\"route: edit-problem; params.bind: {id:problem.id}\" class=\"btn ufps-btn-submit ufps-btn-edit-problem\">Editar problema</a>\n          <form if.bind=\"!authService.isAdmin()\" class=\"ufps-submit-form\" submit.delegate=\"submit()\" enctype=\"multipart/form-data\">\n            <input type=\"file\" name=\"input-file\" id=\"input-file\" class=\"inputfile-btn\" change.delegate=\"validateCode()\" accept=\".py, .java,.cpp, .c, .cc, .cp, .cxx\"\n              files.bind=\"code\">\n            <label for=\"input-file\" tooltip data-toggle=\"tooltip\" title=\"Archivo con la solución al problema\">Seleccionar\n              <span class=\"glyphicon glyphicon-ok-sign\" show.bind=\"sourceValid\"></span>\n            </label>\n            <div class=\"input-group\">\n              <select class=\"form-control\" value.bind=\"language\">\n                <option required model.bind=\"null\">Lenguaje...</option>\n                <option repeat.for=\"lg of languages\" model.bind=\"lg\">${lg}</option>\n              </select>\n            </div>\n            <input type=\"submit\" value=\"Enviar\" class=\"btn ufps-btn-submit\">\n          </form>\n        </div>\n      </div>\n      <div class=\"panel panel-default panel-resolved\" if.bind=\"problem.resolved\">\n        <div class=\"panel-body\">\n          <div class=\"media\">\n            <div class=\"media-left\">\n              <img class=\"media-object\" src=\"./src/assets/img/logo-transparent-64px.png\">\n            </div>\n            <div class=\"media-body\">\n              <h4 class=\"media-heading\">¡Felicitaciones!</h4>\n              <p>Ya has resuelto este problema anteriormente.</p>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</template>\n"; });
define('modules/problems/problems-creator/problems-editor',['exports', 'aurelia-framework', 'aurelia-router', 'config/config', 'models/models', 'services/services', 'simplemde'], function (exports, _aureliaFramework, _aureliaRouter, _config, _models, _services, _simplemde) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ProblemsEditor = undefined;

  var _simplemde2 = _interopRequireDefault(_simplemde);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var ProblemsEditor = exports.ProblemsEditor = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _services.Alert, _services.Problems), _dec(_class = function () {
    function ProblemsEditor(routerService, alertService, problemsService) {
      _classCallCheck(this, ProblemsEditor);

      this.routerService = routerService;
      this.alertService = alertService;
      this.problemsService = problemsService;
      this.categories = [];
      this.inputValid = false;
      this.outputValid = false;
      this.editMode = true;
      this.templateSpanish = '# Descripción\n\nReemplaza este texto con la descripción de tu problema. Recuerda que puedes usar la sintaxis de Markdown.\n\n# Entradas\n\nReemplaza este texto con la especificación de la entrada de tu problema. Si no conoces la sintaxis markdown, puedes hacer uso de las opciones de la barra superior.\n\n# Salidas\n\nReemplaza este texto con la especificación de la salida de tu problema.';
      this.templateEnglish = '# Description\n\nReplace this text with the description of your problem. Remember that you can use the Markdown syntax.\n\n# Inputs\n\nReplace this text with the specification of the input of your problem. If you do not know the markdown syntax, you can use the options in the top bar.\n\n# Outputs\n\nReplace this text with the specification of the output of your problem.';
      this.settingsMarkdownEditor = this.loadSettingsMarkdownEditor();
    }

    ProblemsEditor.prototype.activate = function activate(params, routeConfig) {
      var _this = this;

      this.problemsService.getProblem(params.id).then(function (problem) {
        problem = problem.problem;
        _this.newProblem = new _models.Problem(parseInt(params.id), problem.title_en, problem.title_es, parseInt(problem.level), parseInt(problem.category_id), undefined, problem.description_en, problem.description_es, problem.example_input, problem.example_output, parseFloat(problem.time_limit));
        if (_this.newProblem.titleEN !== undefined && _this.newProblem.titleEN != null) {
          _this.originalLanguage = 'en';
          if (_this.newProblem.titleES !== undefined && _this.newProblem.titleES != null) {
            _this.doubleLanguage = true;
          }
        } else {
          _this.originalLanguage = 'es';
          _this.doubleLanguage = false;
        }
        var interval = void 0;
        if (_this.originalLanguage === 'es') {
          interval = window.setInterval(function () {
            if (_this.attachedFlag) {
              _this.editor.value(_this.newProblem.descriptionES);
              if (_this.doubleLanguage) {
                _this.createSecondEditor();
                _this.secondEditor.value(_this.newProblem.descriptionEN);
              }
              window.clearInterval(interval);
            }
          }, 200);
        } else {
          interval = window.setInterval(function () {
            if (_this.attachedFlag) {
              _this.editor.value(_this.newProblem.descriptionEN);
              if (_this.doubleLanguage) {
                _this.createSecondEditor();
                _this.secondEditor.value(_this.newProblem.descriptionES);
              }
              window.clearInterval(interval);
            }
          }, 200);
        }
      }).catch(function (error) {
        if (error.status === 401 || error.status === 403) {
          _this.alertService.showMessage(_config.MESSAGES.permissionsError);
        } else if (error.status === 500) {
          _this.alertService.showMessage(_config.MESSAGES.serverError);
        } else {
          _this.alertService.showMessage(_config.MESSAGES.unknownError);
        }
        _this.routerService.navigate('');
      });
    };

    ProblemsEditor.prototype.getViewStrategy = function getViewStrategy() {
      return './problems-creator.html';
    };

    ProblemsEditor.prototype.created = function created() {
      this.getCategories();
    };

    ProblemsEditor.prototype.attached = function attached() {
      this.createFirstEditor();
      this.attachedFlag = true;
    };

    ProblemsEditor.prototype.getCategories = function getCategories() {
      var _this2 = this;

      this.problemsService.getCategories().then(function (data) {
        _this2.categories = data.categories;
      }).catch(function (error) {
        if (error.status === 401) {
          _this2.alertService.showMessage(_config.MESSAGES.permissionsError);
        } else {
          _this2.alertService.showMessage(_config.MESSAGES.categoriesError);
        }
      });
    };

    ProblemsEditor.prototype.validateTestCase = function validateTestCase(type) {
      var domElement = void 0;
      if (type === 'input') {
        domElement = document.getElementById('input-file');
        this.inputValid = false;
      } else if (type === 'output') {
        domElement = document.getElementById('output-file');
        this.outputValid = false;
      }
      if (domElement.files.length !== 0) {
        var name = domElement.files[0].name;
        var extension = name.split('.');
        extension = extension[extension.length - 1];
        if (extension === 'txt' || extension === 'in' || extension === 'out') {
          if (type === 'input') {
            this.inputValid = true;
          } else if (type === 'output') {
            this.outputValid = true;
          }
        } else {
          this.alertService.showMessage(_config.MESSAGES.fileTypeIsNotTxt);
        }
      }
    };

    ProblemsEditor.prototype.changeLanguageEditor = function changeLanguageEditor() {
      if (this.originalLanguage === 'es') {
        this.editor.value(this.templateSpanish);
      } else {
        this.editor.value(this.templateEnglish);
      }
    };

    ProblemsEditor.prototype.changeLanguageSecondEditor = function changeLanguageSecondEditor() {
      if (this.originalLanguage === 'en') {
        this.secondEditor.value(this.templateSpanish);
      } else {
        this.secondEditor.value(this.templateEnglish);
      }
    };

    ProblemsEditor.prototype.addLanguage = function addLanguage() {
      this.doubleLanguage = true;
      this.createSecondEditor();
      this.changeLanguageSecondEditor();
    };

    ProblemsEditor.prototype.removeLanguage = function removeLanguage() {
      this.doubleLanguage = false;
      this.secondEditor.toTextArea();
      this.secondEditor = null;
    };

    ProblemsEditor.prototype.loadSettingsMarkdownEditor = function loadSettingsMarkdownEditor() {
      return [{
        name: 'bold',
        action: _simplemde2.default.toggleBold,
        className: 'glyphicon glyphicon-bold',
        title: 'Negrilla'
      }, {
        name: 'italic',
        action: _simplemde2.default.toggleItalic,
        className: 'glyphicon glyphicon-italic',
        title: 'Cursiva'
      }, '|', {
        name: 'heading',
        action: _simplemde2.default.toggleHeadingSmaller,
        className: 'glyphicon glyphicon-header',
        title: 'Título (Pulsa varias veces para cambiar tamaño)'
      }, {
        name: 'quote',
        action: _simplemde2.default.toggleBlockquote,
        className: 'glyphicon glyphicon-bookmark',
        title: 'Cita'
      }, {
        name: 'unordered-list',
        action: _simplemde2.default.toggleUnorderedList,
        className: 'glyphicon glyphicon-th-list',
        title: 'Lista'
      }, {
        name: 'ordered-list',
        action: _simplemde2.default.toggleOrderedList,
        className: 'glyphicon glyphicon-list-alt',
        title: 'Lista numerada'
      }, '|', {
        name: 'link',
        action: _simplemde2.default.drawLink,
        className: 'glyphicon glyphicon-link',
        title: 'Insertar enlace'
      }, {
        name: 'image',
        action: _simplemde2.default.drawImage,
        className: 'glyphicon glyphicon-picture',
        title: 'Insertar imagen'
      }, {
        name: 'code',
        action: _simplemde2.default.toggleCodeBlock,
        className: 'glyphicon glyphicon-console',
        title: 'Insertar código'
      }, '|', {
        name: 'preview',
        action: _simplemde2.default.togglePreview,
        className: 'glyphicon glyphicon-eye-open no-disable',
        title: 'Vista previa'
      }, {
        name: 'side-by-side',
        action: _simplemde2.default.toggleSideBySide,
        className: 'glyphicon glyphicon-adjust no-disable no-mobile',
        title: 'Dividir Pantalla'
      }, {
        name: 'fullscreen',
        action: _simplemde2.default.toggleFullScreen,
        className: 'glyphicon glyphicon-fullscreen no-disable no-mobile',
        title: 'Pantalla Completa'
      }, '|', {
        name: 'custom',
        action: function customFunction(editor) {
          window.$('#markdown-help').modal('show');
        },
        className: 'glyphicon glyphicon-question-sign',
        title: 'Guía de Markdown'
      }];
    };

    ProblemsEditor.prototype.createFirstEditor = function createFirstEditor() {
      this.editor = new _simplemde2.default({
        autoDownloadFontAwesome: false,
        autofocus: false,
        element: document.getElementById('md-editor'),
        spellChecker: false,
        status: false,
        toolbar: this.settingsMarkdownEditor
      });
    };

    ProblemsEditor.prototype.createSecondEditor = function createSecondEditor() {
      this.secondEditor = new _simplemde2.default({
        autoDownloadFontAwesome: false,
        autofocus: false,
        element: document.getElementById('md-editor-2'),
        spellChecker: false,
        status: false,
        toolbar: this.settingsMarkdownEditor
      });
    };

    ProblemsEditor.prototype.assignDescriptions = function assignDescriptions() {
      if (this.originalLanguage === 'es') {
        this.newProblem.descriptionES = this.editor.value();
        if (this.doubleLanguage) {
          this.newProblem.descriptionEN = this.secondEditor.value();
        }
      } else {
        this.newProblem.descriptionEN = this.editor.value();
        if (this.doubleLanguage) {
          this.newProblem.descriptionES = this.secondEditor.value();
        }
      }
    };

    ProblemsEditor.prototype.validateInfo = function validateInfo() {
      this.newProblem.level = parseInt(this.newProblem.level);
      this.newProblem.timeLimit = parseFloat(this.newProblem.timeLimit);
      if (typeof this.newProblem.level === 'number' && !isNaN(this.newProblem.level) && this.newProblem.level >= 1 && this.newProblem.level <= 10 && typeof this.newProblem.category === 'number' && typeof this.newProblem.timeLimit === 'number' && !isNaN(this.newProblem.timeLimit) && this.newProblem.timeLimit >= 0.5 && this.newProblem.timeLimit <= 10.0) {
        if (this.originalLanguage === 'es') {
          if (typeof this.newProblem.titleES === 'string' && this.newProblem.titleES !== '') {
            if (!this.doubleLanguage) {
              this.newProblem.titleEN = undefined;
              this.newProblem.descriptionEN = undefined;
              return true;
            } else if (typeof this.newProblem.titleEN === 'string' && this.newProblem.titleEN !== '') {
              return true;
            } else {
              this.alertService.showMessage(_config.MESSAGES.incompleteDataProblem);
              return false;
            }
          } else {
            this.alertService.showMessage(_config.MESSAGES.incompleteDataProblem);
            return false;
          }
        } else if (this.originalLanguage === 'en') {
          if (typeof this.newProblem.titleEN === 'string' && this.newProblem.titleEN !== '') {
            if (!this.doubleLanguage) {
              this.newProblem.titleES = undefined;
              this.newProblem.descriptionES = undefined;
              return true;
            } else if (typeof this.newProblem.titleES === 'string' && this.newProblem.titleES !== '') {
              return true;
            } else {
              this.alertService.showMessage(_config.MESSAGES.incompleteDataProblem);
              return false;
            }
          } else {
            this.alertService.showMessage(_config.MESSAGES.incompleteDataProblem);
            return false;
          }
        }
      } else {
        if (typeof this.newProblem.level === 'number' && !isNaN(this.newProblem.level) && (this.newProblem.level < 1 || this.newProblem.level > 10)) {
          this.alertService.showMessage(_config.MESSAGES.wrongLevel);
        } else if (typeof this.newProblem.timeLimit === 'number' && !isNaN(this.newProblem.timeLimit) && this.newProblem.timeLimit < 0.5 && this.newProblem.timeLimit > 10.0) {
          this.alertService.showMessage(_config.MESSAGES.wrongTimeLimit);
        } else {
          this.alertService.showMessage(_config.MESSAGES.incompleteDataProblem);
        }
        return false;
      }
    };

    ProblemsEditor.prototype.submit = function submit() {
      var _this3 = this;

      this.assignDescriptions();
      if (this.validateInfo()) {
        this.problemsService.editProblem(this.newProblem).then(function () {
          _this3.alertService.showMessage(_config.MESSAGES.problemSaved);
          _this3.routerService.navigate(_this3.newProblem.id + '/detalle');
        }).catch(function (error) {
          if (error.status === 401 || error.status === 403) {
            _this3.alertService.showMessage(_config.MESSAGES.permissionsError);
          } else if (error.status === 500) {
            _this3.alertService.showMessage(_config.MESSAGES.serverError);
          } else {
            _this3.alertService.showMessage(_config.MESSAGES.unknownError);
          }
        });
      }
    };

    return ProblemsEditor;
  }()) || _class);
});
define('modules/problems/problems-creator/problems-creator',['exports', 'aurelia-framework', 'config/config', 'models/models', 'services/services', 'simplemde'], function (exports, _aureliaFramework, _config, _models, _services, _simplemde) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ProblemsCreator = undefined;

  var _simplemde2 = _interopRequireDefault(_simplemde);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var ProblemsCreator = exports.ProblemsCreator = (_dec = (0, _aureliaFramework.inject)(_services.Alert, _services.Problems), _dec(_class = function () {
    function ProblemsCreator(alertService, problemsService) {
      _classCallCheck(this, ProblemsCreator);

      this.alertService = alertService;
      this.problemsService = problemsService;
      this.categories = [];
      this.newProblem = new _models.Problem();
      this.newProblem.timeLimit = 1;
      this.newProblem.level = 1;
      this.inputValid = false;
      this.outputValid = false;
      this.originalLanguage = 'es';
      this.doubleLanguage = false;
      this.editMode = false;
      this.templateSpanish = '# Descripción\n\nReemplaza este texto con la descripción de tu problema. Recuerda que puedes usar la sintaxis de Markdown.\n\n# Entradas\n\nReemplaza este texto con la especificación de la entrada de tu problema. Si no conoces la sintaxis markdown, puedes hacer uso de las opciones de la barra superior.\n\n# Salidas\n\nReemplaza este texto con la especificación de la salida de tu problema.';
      this.templateEnglish = '# Description\n\nReplace this text with the description of your problem. Remember that you can use the Markdown syntax.\n\n# Inputs\n\nReplace this text with the specification of the input of your problem. If you do not know the markdown syntax, you can use the options in the top bar.\n\n# Outputs\n\nReplace this text with the specification of the output of your problem.';
      this.settingsMarkdownEditor = this.loadSettingsMarkdownEditor();
    }

    ProblemsCreator.prototype.created = function created() {
      this.getCategories();
    };

    ProblemsCreator.prototype.attached = function attached() {
      this.createFirstEditor();
      if (this.doubleLanguage) {
        this.createSecondEditor();
      }
    };

    ProblemsCreator.prototype.getCategories = function getCategories() {
      var _this = this;

      this.problemsService.getCategories().then(function (data) {
        _this.categories = data.categories;
      }).catch(function (error) {
        if (error.status === 401) {
          _this.alertService.showMessage(_config.MESSAGES.permissionsError);
        } else {
          _this.alertService.showMessage(_config.MESSAGES.categoriesError);
        }
      });
    };

    ProblemsCreator.prototype.validateTestCase = function validateTestCase(type) {
      var domElement = void 0;
      if (type === 'input') {
        domElement = document.getElementById('input-file');
        this.inputValid = false;
      } else if (type === 'output') {
        domElement = document.getElementById('output-file');
        this.outputValid = false;
      }
      if (domElement.files.length !== 0) {
        var name = domElement.files[0].name;
        var extension = name.split('.');
        extension = extension[extension.length - 1];
        if (extension === 'txt' || extension === 'in' || extension === 'out') {
          if (type === 'input') {
            this.inputValid = true;
          } else if (type === 'output') {
            this.outputValid = true;
          }
        } else {
          this.alertService.showMessage(_config.MESSAGES.fileTypeIsNotTxtOrIn);
        }
      }
    };

    ProblemsCreator.prototype.changeLanguageEditor = function changeLanguageEditor() {
      if (this.originalLanguage === 'es') {
        this.editor.value(this.templateSpanish);
      } else {
        this.editor.value(this.templateEnglish);
      }
    };

    ProblemsCreator.prototype.changeLanguageSecondEditor = function changeLanguageSecondEditor() {
      if (this.originalLanguage === 'en') {
        this.secondEditor.value(this.templateSpanish);
      } else {
        this.secondEditor.value(this.templateEnglish);
      }
    };

    ProblemsCreator.prototype.addLanguage = function addLanguage() {
      this.doubleLanguage = true;
      this.createSecondEditor();
      this.changeLanguageSecondEditor();
    };

    ProblemsCreator.prototype.removeLanguage = function removeLanguage() {
      if (this.doubleLanguage) {
        this.doubleLanguage = false;
        this.secondEditor.toTextArea();
        this.secondEditor = null;
      }
    };

    ProblemsCreator.prototype.loadSettingsMarkdownEditor = function loadSettingsMarkdownEditor() {
      return [{
        name: 'bold',
        action: _simplemde2.default.toggleBold,
        className: 'glyphicon glyphicon-bold',
        title: 'Negrilla'
      }, {
        name: 'italic',
        action: _simplemde2.default.toggleItalic,
        className: 'glyphicon glyphicon-italic',
        title: 'Cursiva'
      }, '|', {
        name: 'heading',
        action: _simplemde2.default.toggleHeadingSmaller,
        className: 'glyphicon glyphicon-header',
        title: 'Título (Pulsa varias veces para cambiar tamaño)'
      }, {
        name: 'quote',
        action: _simplemde2.default.toggleBlockquote,
        className: 'glyphicon glyphicon-bookmark',
        title: 'Cita'
      }, {
        name: 'unordered-list',
        action: _simplemde2.default.toggleUnorderedList,
        className: 'glyphicon glyphicon-th-list',
        title: 'Lista'
      }, {
        name: 'ordered-list',
        action: _simplemde2.default.toggleOrderedList,
        className: 'glyphicon glyphicon-list-alt',
        title: 'Lista numerada'
      }, '|', {
        name: 'link',
        action: _simplemde2.default.drawLink,
        className: 'glyphicon glyphicon-link',
        title: 'Insertar enlace'
      }, {
        name: 'image',
        action: _simplemde2.default.drawImage,
        className: 'glyphicon glyphicon-picture',
        title: 'Insertar imagen'
      }, {
        name: 'code',
        action: _simplemde2.default.toggleCodeBlock,
        className: 'glyphicon glyphicon-console',
        title: 'Insertar código'
      }, '|', {
        name: 'preview',
        action: _simplemde2.default.togglePreview,
        className: 'glyphicon glyphicon-eye-open no-disable',
        title: 'Vista previa'
      }, {
        name: 'side-by-side',
        action: _simplemde2.default.toggleSideBySide,
        className: 'glyphicon glyphicon-adjust no-disable no-mobile',
        title: 'Dividir Pantalla'
      }, {
        name: 'fullscreen',
        action: _simplemde2.default.toggleFullScreen,
        className: 'glyphicon glyphicon-fullscreen no-disable no-mobile',
        title: 'Pantalla Completa'
      }, '|', {
        name: 'custom',
        action: function customFunction(editor) {
          window.$('#markdown-help').modal('show');
        },
        className: 'glyphicon glyphicon-question-sign',
        title: 'Guía de Markdown'
      }];
    };

    ProblemsCreator.prototype.createFirstEditor = function createFirstEditor() {
      this.editor = new _simplemde2.default({
        autoDownloadFontAwesome: false,
        autofocus: false,
        element: document.getElementById('md-editor'),
        spellChecker: false,
        status: false,
        toolbar: this.settingsMarkdownEditor
      });
    };

    ProblemsCreator.prototype.createSecondEditor = function createSecondEditor() {
      this.secondEditor = new _simplemde2.default({
        autoDownloadFontAwesome: false,
        autofocus: false,
        element: document.getElementById('md-editor-2'),
        spellChecker: false,
        status: false,
        toolbar: this.settingsMarkdownEditor
      });
    };

    ProblemsCreator.prototype.assignDescriptions = function assignDescriptions() {
      if (this.originalLanguage === 'es') {
        this.newProblem.descriptionES = this.editor.value();
        if (this.doubleLanguage) {
          this.newProblem.descriptionEN = this.secondEditor.value();
        }
      } else {
        this.newProblem.descriptionEN = this.editor.value();
        if (this.doubleLanguage) {
          this.newProblem.descriptionES = this.secondEditor.value();
        }
      }
    };

    ProblemsCreator.prototype.validateInfo = function validateInfo() {
      this.newProblem.level = parseInt(this.newProblem.level);
      this.newProblem.timeLimit = parseFloat(this.newProblem.timeLimit);
      if (typeof this.newProblem.level === 'number' && !isNaN(this.newProblem.level) && this.newProblem.level >= 1 && this.newProblem.level <= 10 && typeof this.newProblem.category === 'number' && this.inputValid && this.outputValid && typeof this.newProblem.timeLimit === 'number' && !isNaN(this.newProblem.timeLimit) && this.newProblem.timeLimit >= 0.5 && this.newProblem.timeLimit <= 10.0) {
        if (this.originalLanguage === 'es') {
          if (typeof this.newProblem.titleES === 'string' && this.newProblem.titleES !== '') {
            if (!this.doubleLanguage) {
              this.newProblem.titleEN = undefined;
              this.newProblem.descriptionEN = undefined;
              return true;
            } else if (typeof this.newProblem.titleEN === 'string' && this.newProblem.titleEN !== '') {
              return true;
            } else {
              this.alertService.showMessage(_config.MESSAGES.incompleteDataProblem);
              return false;
            }
          } else {
            this.alertService.showMessage(_config.MESSAGES.incompleteDataProblem);
            return false;
          }
        } else if (this.originalLanguage === 'en') {
          if (typeof this.newProblem.titleEN === 'string' && this.newProblem.titleEN !== '') {
            if (!this.doubleLanguage) {
              this.newProblem.titleES = undefined;
              this.newProblem.descriptionES = undefined;
              return true;
            } else if (typeof this.newProblem.titleES === 'string' && this.newProblem.titleES !== '') {
              return true;
            } else {
              this.alertService.showMessage(_config.MESSAGES.incompleteDataProblem);
              return false;
            }
          } else {
            this.alertService.showMessage(_config.MESSAGES.incompleteDataProblem);
            return false;
          }
        }
      } else {
        if (typeof this.newProblem.level === 'number' && !isNaN(this.newProblem.level) && (this.newProblem.level < 1 || this.newProblem.level > 10)) {
          this.alertService.showMessage(_config.MESSAGES.wrongLevel);
        } else if (typeof this.newProblem.timeLimit === 'number' && !isNaN(this.newProblem.timeLimit) && this.newProblem.timeLimit < 0.5 && this.newProblem.timeLimit > 10.0) {
          this.alertService.showMessage(_config.MESSAGES.wrongTimeLimit);
        } else if (!this.inputValid || !this.outputValid) {
          this.alertService.showMessage(_config.MESSAGES.incompleteIO);
        } else {
          this.alertService.showMessage(_config.MESSAGES.incompleteDataProblem);
        }
        return false;
      }
    };

    ProblemsCreator.prototype.submit = function submit() {
      var _this2 = this;

      this.assignDescriptions();
      if (this.validateInfo()) {
        this.problemsService.createProblem(this.newProblem).then(function () {
          _this2.newProblem = new _models.Problem();
          _this2.newProblem.timeLimit = 1;
          _this2.newProblem.level = 1;
          _this2.inputValid = false;
          _this2.outputValid = false;
          _this2.originalLanguage = 'es';
          _this2.removeLanguage();
          _this2.changeLanguageEditor();
          _this2.alertService.showMessage(_config.MESSAGES.problemSaved);
        }).catch(function (error) {
          if (error.status === 401 || error.status === 403) {
            _this2.alertService.showMessage(_config.MESSAGES.permissionsError);
          } else if (error.status === 500) {
            _this2.alertService.showMessage(_config.MESSAGES.serverError);
          } else {
            _this2.alertService.showMessage(_config.MESSAGES.unknownError);
          }
        });
      }
    };

    return ProblemsCreator;
  }()) || _class);
});
define('text!modules/problems/problems-creator/problems-creator.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"simplemde/simplemde.min.css\"></require>\n  <require from=\"../../../resources/attributes/tooltip\"></require>\n  <div class=\"container ufps-container-logged\">\n    <h1 class=\"text-right\" if.bind=\"!editMode\">Nuevo problema</h1>\n    <h1 class=\"text-right\" if.bind=\"editMode\">Editar problema ${newProblem.id}</h1>\n    <hr>\n    <form submit.delegate=\"submit()\" enctype=\"multipart/form-data\">\n      <div class=\"form-horizontal col-md-7\">\n        <div class=\"form-group\">\n          <label class=\"control-label col-sm-2\" for=\"problem-language\">Idioma:</label>\n          <div class=\"col-sm-10 input-group ufps-input-creator\">\n            <select class=\"form-control\" id=\"problem-language\" value.bind=\"originalLanguage\" change.delegate=\"changeLanguageEditor()\">\n              <option model.bind=\"'en'\">Inglés</option>\n              <option model.bind=\"'es'\">Español</option>\n            </select>\n            <span class=\"input-group-addon\" tooltip data-toggle=\"tooltip\" title=\"Idioma del título y enunciado del problema\">\n              <span class=\"glyphicon glyphicon-question-sign\"></span>\n            </span>\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <label class=\"control-label col-sm-2\" for=\"problem-name\">Nombre:</label>\n          <div class=\"col-sm-10 input-group ufps-input-creator\">\n            <input type=\"text\" class=\"form-control\" id=\"problem-name\" placeholder=\"Nombre del problema\" value.bind=\"newProblem.titleES\"\n              if.bind=\"originalLanguage === 'es'\">\n            <input type=\"text\" class=\"form-control\" id=\"problem-name\" placeholder=\"Nombre del problema\" value.bind=\"newProblem.titleEN\"\n              if.bind=\"originalLanguage === 'en'\">\n            <span class=\"input-group-addon\" tooltip data-toggle=\"tooltip\" title=\"Título del problema\">\n              <span class=\"glyphicon glyphicon-question-sign\"></span>\n            </span>\n          </div>\n        </div>\n      </div>\n      <div class=\"form-horizontal col-md-5\">\n        <div class=\"form-group\">\n          <label class=\"control-label col-sm-3\" for=\"problem-category\">Categoría:</label>\n          <div class=\"col-sm-9 input-group ufps-input-creator\">\n            <select class=\"form-control\" id=\"problem-category\" value.bind=\"newProblem.category\">\n              <option model.bind=\"null\">Elige una categoría</option>\n              <option repeat.for=\"category of categories\" model.bind=\"category.id\">${category.name}</option>\n            </select>\n            <span class=\"input-group-addon\" tooltip data-toggle=\"tooltip\" title=\"Temática relacionada con el problema\">\n              <span class=\"glyphicon glyphicon-question-sign\"></span>\n            </span>\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <label class=\"control-label col-sm-3\" for=\"problem-level\">Dificultad:</label>\n          <div class=\"col-sm-9 input-group ufps-input-creator\">\n            <input type=\"number\" class=\"form-control\" id=\"problem-level\" min=\"1\" max=\"10\" value.bind=\"newProblem.level\">\n            <span class=\"input-group-addon\" tooltip data-toggle=\"tooltip\" title=\"Nivel de dificultad [1 - 10] Donde 1 es muy facil, y 10 muy complejo\">\n              <span class=\"glyphicon glyphicon-question-sign\"></span>\n            </span>\n          </div>\n        </div>\n\n\n      </div>\n      <div class=\"form-horizontal col-md-12\">\n        <div class=\"form-group\">\n          <label class=\"control-label col-sm-9\" for=\"problem-level\">Tiempo límite:</label>\n          <div class=\"col-sm-3 input-group ufps-input-creator\">\n            <input type=\"number\" class=\"form-control\" id=\"problem-level\" min=\"0.5\" max=\"10.0\" step=\"0.1\" value.bind=\"newProblem.timeLimit\">\n            <span class=\"input-group-addon\" tooltip data-toggle=\"tooltip\" title=\"Tiempo que tendrá la solución para ejecutarse (en segundos). Si se excede este tiempo, la ejecución se detendrá y se informará al usuario que ha excedido el tiempo limite.\">\n              <span class=\"glyphicon glyphicon-question-sign\"></span>\n            </span>\n          </div>\n        </div>\n        <div class=\"fix\"></div>\n\n        <h3 class=\"text-center\">Contenido</h3>\n        <textarea name=\"md-editor\" id=\"md-editor\">\n# Descripción \n\nReemplaza este texto con la descripción de tu problema. Recuerda que puedes usar la sintaxis de Markdown.\n\n# Entradas \n\nReemplaza este texto con la especificación de la entrada de tu problema. Si no conoces la sintaxis markdown, puedes hacer uso de las opciones de la barra superior. \n\n# Salidas \n\nReemplaza este texto con la especificación de la salida de tu problema.\n\n        </textarea>\n\n        <div class=\"ufps-separator\"></div>\n        <div class=\"col-md-12 text-center\">\n          <p>Importante:\n            <strong>LAS ENTRADAS Y SALIDAS DE EJEMPLO</strong> se mostrarán junto al enunciado en la plataforma. Se recomenda que\n            estos sean algunos casos simples que expliquen brevemente las entradas y salidas. Por su parte, los casos de\n            prueba\n            <strong>PRIVADOS</strong> son los que utilizará la plataforma para evaluar los ejercicios. Por tanto, estos deberían\n            ser mas extensos y completos (Dado que es posible que estos casos sean muy extensos, deben subirse en formato\n            .txt o .in)</p>\n        </div>\n        <div class=\"col-md-6 ufps-input-creator\">\n          <h4>Entradas de ejemplo</h4>\n          <textarea value.bind=\"newProblem.exampleInput\" class=\"form-control\"></textarea>\n        </div>\n        <div class=\"col-md-6 ufps-input-creator\">\n          <h4>Salidas de ejemplo</h4>\n          <textarea value.bind=\"newProblem.exampleOutput\" class=\"form-control\"></textarea>\n        </div>\n        <div class=\"fix\"></div>\n        <div class=\"ufps-separator\"></div>\n        <div class=\"col-md-6 text-right\">\n          <h4 if.bind=\"!editMode\">Seleccione los casos de prueba privados:</h4>\n          <h4 if.bind=\"editMode\">¿Desea cambiar los casos de prueba privados? (Opcional)</h4>\n        </div>\n        <div class=\"col-md-6\">\n          <div class=\"col-sm-6 ufps-input-creator\">\n            <input type=\"file\" name=\"input-file\" id=\"input-file\" class=\"inputfile-btn\" change.delegate=\"validateTestCase('input')\" accept=\".txt, .in\"\n              files.bind=\"newProblem.input\">\n            <label for=\"input-file\" tooltip data-toggle=\"tooltip\" title=\"Archivo .txt o .in con las entradas que será ejecutado el programa escrito por el estudiante para ser validado\">Entradas\n              <span class=\"glyphicon glyphicon-ok-sign\" show.bind=\"inputValid\"></span>\n            </label>\n          </div>\n          <div class=\"col-sm-6 ufps-input-creator\">\n            <input type=\"file\" name=\"output-file\" id=\"output-file\" class=\"inputfile-btn\" accept=\".txt, .out, .ans\" change.delegate=\"validateTestCase('output')\"\n              files.bind=\"newProblem.output\">\n            <label for=\"output-file\" tooltip data-toggle=\"tooltip\" title=\"Archivo .txt, .ans o .out con las salidas que debe generar el programa escrito por el estudiante para ser considerado correcto\">Salidas\n              <span class=\"glyphicon glyphicon-ok-sign\" show.bind=\"outputValid\"></span>\n            </label>\n          </div>\n        </div>\n        <div class=\"fix\"></div>\n        <div class=\"ufps-separator\"></div>\n        <div class=\"col-xs-12 form horizontal\" show.bind=\"doubleLanguage\">\n          <h4 class=\"text-center\">Versión en ${originalLanguage === 'en' ? 'Español' : 'Inglés'}</h4>\n          <div class=\"form-group\">\n            <label class=\"control-label col-sm-2\" for=\"problem-name\">Nombre:</label>\n            <div class=\"col-sm-9 input-group ufps-input-creator\">\n              <input type=\"text\" class=\"form-control\" id=\"problem-name\" placeholder=\"Nombre del problema\" value.bind=\"newProblem.titleEN\"\n                if.bind=\"originalLanguage === 'es'\">\n              <input type=\"text\" class=\"form-control\" id=\"problem-name\" placeholder=\"Nombre del problema\" value.bind=\"newProblem.titleES\"\n                if.bind=\"originalLanguage === 'en'\">\n              <span class=\"input-group-addon\" tooltip data-toggle=\"tooltip\" title=\"Título del problema\">\n                <span class=\"glyphicon glyphicon-question-sign\"></span>\n              </span>\n            </div>\n          </div>\n          <textarea name=\"md-editor-2\" id=\"md-editor-2\"># Descripción Reemplaza este texto con la descripción de tu problema. Recuerda que puedes usar la sintaxis de Markdown.\n            # Entradas Reemplaza este texto con la especificación de la entrada de tu problema. Si no conoces la sintaxis\n            markdown, puedes hacer uso de las opciones de la barra superior. # Salidas Reemplaza este texto con la especificación\n            de la salida de tu problema.\n          </textarea>\n        </div>\n        <div class=\"col-xs-12 text-center\">\n          <button if.bind=\"!doubleLanguage\" class=\"btn ufps-btn-submit\" click.delegate=\"addLanguage()\">Añadir versión en ${originalLanguage === 'en' ? 'Español' : 'Inglés'}</button>\n          <button if.bind=\"doubleLanguage\" class=\"btn ufps-btn-submit\" click.delegate=\"removeLanguage()\">Eliminar versión en ${originalLanguage === 'en' ? 'Español' : 'Inglés'}</button>\n          <input type=\"submit\" class=\"btn ufps-btn-submit\" value=\"Guardar problema\">\n        </div>\n    </form>\n    <div class=\"fix\"></div>\n    <div class=\"ufps-separator\"></div>\n    </div>\n    <!--Modal explicativo de markdown-->\n    <div class=\"modal fade\" id=\"markdown-help\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"markdown-help\">\n      <div class=\"modal-dialog modal-lg\" role=\"document\">\n        <div class=\"modal-content\">\n          <div class=\"modal-header\">\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n              <span aria-hidden=\"true\">&times;</span>\n            </button>\n            <h2 class=\"modal-title\" id=\"myModalLabel\">Ayuda</h2>\n            <hr>\n            <p>Este editor utiliza Markdown, lenguaje de marcado ligero con el cual puedes dar formato rápido a tus ejercicios.\n              Para tu comodidad, la barra superior del editor contiene las principales opciones de markdown. Si prefieres\n              tu mismo escribir la sintaxis, aquí tienes una referencia rápida:</p>\n            <h3>Enfasis</h3>\n            <div class=\"panel panel-default\">\n              <div class=\"panel-body\">\n                **\n                <strong>negrilla</strong>**\n                <br> *\n                <em>cursiva</em>*\n                <br> ~~\n                <del>tachado</del>~~\n                <br>\n              </div>\n            </div>\n            <h3>Titulos</h3>\n            <pre>\n\n# Título grande\n## Título Mediano\n### Título pequeño\n#### Título muy pequeño\n          </pre>\n            <h3>Listas</h3>\n            <pre>\n\n* Lista con viñetas\n* Lista con viñetas\n* Lista con viñetas\n\n1. Lista numerada\n2. Lista numerada\n3. Lista numerada\n          </pre>\n            <h3>Links</h3>\n            <pre>\n\n[Texto a mostrar en pantalla](http://www.example.com)\n          </pre>\n            <h3>Citas</h3>\n            <pre>\n\n> \"Solo se que nada se\" \n          </pre>\n            <h3>Imagenes</h3>\n            <pre>\n\n![Texto alternativo](http://www.example.com/link_de_la_imagen.jpg)\n          </pre>\n            <h3>Tablas</h3>\n            <pre>\n\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| John     | Doe      | Male     |\n| Mary     | Smith    | Female   |\n          </pre>\n            <h3>Código</h3>\n            <pre>\n            \n`var example = \"hello!\";`\n\nO multiples lineas de código...\n\n```\nvar example = \"hello!\";\nalert(example);\n```             \n          </pre>\n            <p>Esta guía rápida se ha realizado tomando como referencia la Guía de\n              <a href=\"https://simplemde.com/markdown-guide\"\n                target=\"_blank\">SimpleMDE</a>\n            </p>\n          </div>\n        </div>\n      </div>\n    </div>\n</template>\n"; });
define('modules/problems/problem',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Problem = exports.Problem = function () {
    function Problem() {
      _classCallCheck(this, Problem);
    }

    Problem.prototype.configureRouter = function configureRouter(config, router) {
      config.map([{
        route: '',
        name: 'problems',
        moduleId: 'modules/problems/general-problems/general-problems',
        title: 'Problemas',
        settings: {
          roles: ['admin', 'coach', 'student']
        }
      }, {
        name: 'category',
        route: 'categoria/:id',
        moduleId: 'modules/problems/category-problems/category-problems',
        title: 'Problemas',
        settings: {
          roles: ['admin', 'coach', 'student']
        }
      }, {
        name: 'problems-creator',
        route: 'nuevo',
        moduleId: 'modules/problems/problems-creator/problems-creator',
        title: 'Nuevo problema',
        settings: {
          roles: ['admin', 'coach']
        }
      }, {
        name: 'edit-problem',
        route: ':id/editar',
        moduleId: 'modules/problems/problems-creator/problems-editor',
        title: 'Editar problema',
        settings: {
          roles: ['admin', 'coach']
        }
      }, {
        name: 'view-problem',
        route: [':id/detalle', ':id/detalle/:lang'],
        moduleId: 'modules/problems/view-problem/view-problem',
        title: 'Problema',
        settings: {
          roles: ['admin', 'coach', 'student']
        }
      }]);
      this.router = router;
    };

    return Problem;
  }();
});
define('text!modules/problems/problem.html', ['module'], function(module) { module.exports = "<template>\n  <div slot=\"content\" class=\"body-slot\">\n    <router-view></router-view>\n  </div>\n</template>"; });
define('modules/problems/general-problems/general-problems',['exports', 'aurelia-framework', 'config/config', 'services/services'], function (exports, _aureliaFramework, _config, _services) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.GeneralProblems = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var GeneralProblems = exports.GeneralProblems = (_dec = (0, _aureliaFramework.inject)(_services.Alert, _services.Auth, _services.Problems), _dec(_class = function () {
    function GeneralProblems(alertService, authService, problemsService) {
      _classCallCheck(this, GeneralProblems);

      this.alertService = alertService;
      this.authService = authService;
      this.problemsService = problemsService;
      this.categories = [];
      this.newCategory = '';
      this.categoryEditId = null;
      this.categoryEditName = '';
      this.categoryRemoveId = null;
      this.categoryRemoveName = '';
    }

    GeneralProblems.prototype.created = function created() {
      this.getCategories();
    };

    GeneralProblems.prototype.createCategory = function createCategory() {
      var _this = this;

      this.problemsService.createCategory(this.newCategory).then(function () {
        _this.getCategories();
        _this.alertService.showMessage(_config.MESSAGES.categoryCreated);
        window.$('#new-category').modal('hide');
      }).catch(function () {
        _this.alertService.showMessage(_config.MESSAGES.unknownError);
        window.$('#new-category').modal('hide');
      });
    };

    GeneralProblems.prototype.getCategories = function getCategories() {
      var _this2 = this;

      this.problemsService.getCategories().then(function (data) {
        _this2.categories = data.categories;
        if (_this2.categories.length === 0) {
          _this2.alertService.showMessage(_config.MESSAGES.categoriesEmpty);
        }
      }).catch(function (error) {
        if (error.status === 401) {
          _this2.alertService.showMessage(_config.MESSAGES.permissionsError);
        } else {
          _this2.alertService.showMessage(_config.MESSAGES.unknownError);
        }
      });
    };

    GeneralProblems.prototype.showEditCategory = function showEditCategory(id, name) {
      this.categoryEditId = id;
      this.categoryEditName = name;
      window.$('#edit-category').modal('show');
    };

    GeneralProblems.prototype.showRemoveCategory = function showRemoveCategory(id, name) {
      this.categoryRemoveId = id;
      this.categoryRemoveName = name;
      window.$('#remove-category').modal('show');
    };

    GeneralProblems.prototype.editCategory = function editCategory() {
      var _this3 = this;

      this.problemsService.editCategory(this.categoryEditId, this.categoryEditName).then(function () {
        _this3.categories.find(function (i) {
          return i.id === _this3.categoryEditId;
        }).name = _this3.categoryEditName;
        _this3.alertService.showMessage(_config.MESSAGES.categoryEdited);
        window.$('#edit-category').modal('hide');
      }).catch(function (error) {
        if (error.status === 401 || error.status === 403) {
          _this3.alertService.showMessage(_config.MESSAGES.permissionsError);
        } else if (error.status === 500) {
          _this3.alertService.showMessage(_config.MESSAGES.serverError);
        } else {
          _this3.alertService.showMessage(_config.MESSAGES.unknownError);
        }
        window.$('#edit-category').modal('hide');
      });
    };

    GeneralProblems.prototype.removeCategory = function removeCategory() {
      var _this4 = this;

      this.problemsService.removeCategory(this.categoryRemoveId).then(function () {
        _this4.categories.splice(_this4.categories.findIndex(function (i) {
          return i.id === _this4.categoryRemoveId;
        }), 1);
        _this4.alertService.showMessage(_config.MESSAGES.categoryRemoved);
        window.$('#remove-category').modal('hide');
      }).catch(function (error) {
        if (error.status === 401 || error.status === 403) {
          _this4.alertService.showMessage(_config.MESSAGES.permissionsError);
        } else if (error.status === 500) {
          _this4.alertService.showMessage(_config.MESSAGES.serverError);
        } else {
          _this4.alertService.showMessage(_config.MESSAGES.unknownError);
        }
        window.$('#remove-category').modal('hide');
      });
    };

    return GeneralProblems;
  }()) || _class);
});
define('text!modules/problems/general-problems/general-problems.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"../../../resources/attributes/tooltip\"></require>\n  <div class=\"container ufps-container-logged\">\n    <h1 class=\"text-right\">Problemas</h1>\n    <p class=\"ufps-language text-right\">\n      <span class=\"active selected\">Categorías</span> |\n      <a href=\"/buscar/+\"><span class=\"active\">Lista completa</span></a>\n    </p>\n    <hr>\n    <div repeat.for=\"category of categories\" class=\"col-xs-12 col-sm-6 col-md-4 col-lg-3 ufps-card-container\">\n      <div class=\"ufps-card\">\n        <div class=\"ufps-card-title\">\n          <span if.bind=\"authService.isAdmin()\" class=\"ufps-edit-category glyphicon glyphicon-pencil\" data-toggle=\"tooltip\" title=\"Editar el nombre de la categoría\"\n            click.delegate=\"showEditCategory(category.id, category.name)\" tooltip></span>\n          <span if.bind=\"authService.isAdmin()\" class=\"ufps-remove-category glyphicon glyphicon-remove\" data-toggle=\"tooltip\" title=\"Eliminar categoría\"\n            click.delegate=\"showRemoveCategory(category.id, category.name)\" tooltip></span>\n          <h1>${category.name}</h1>\n        </div>\n        <div class=\"col-xs-6 ufps-card-link\">\n          <a route-href=\"route: category; params.bind: {id:category.id}\">Problemas</a>\n        </div>\n        <div class=\"col-xs-6 ufps-card-link\">\n          <a route-href=\"route: material; params.bind: {id:category.id}\">Material</a>\n\n        </div>\n        <div class=\"fix\"></div>\n      </div>\n    </div>\n    <div if.bind=\"authService.isAdmin()\" class=\"col-xs-12 col-sm-6 col-md-4 col-lg-3 ufps-card-new ufps-card-container\">\n      <div class=\"ufps-card\" data-toggle=\"modal\" data-target=\"#new-category\">\n        <div class=\"ufps-card-title\">\n          <h1>\n            <span class=\"glyphicon glyphicon-plus\"></span>\n          </h1>\n        </div>\n        <div class=\"col-xs-12 ufps-card-link\">\n          Nueva categoría\n        </div>\n        <div class=\"fix\"></div>\n      </div>\n    </div>\n    <div class=\"fix\"></div>\n    <div class=\"ufps-separator\"></div>\n  </div>\n  <!--MODAL PARA AÑADIR CATEGORIA-->\n  <div if.bind=\"authService.isAdmin()\" class=\"modal fade\" id=\"new-category\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"new-category\">\n    <div class=\"modal-dialog\" role=\"document\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header\">\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n            <span aria-hidden=\"true\">&times;</span>\n          </button>\n          <h4 class=\"modal-title\">Nueva categoría</h4>\n          <br>\n          <form submit.delegate=\"createCategory()\">\n            <div class=\"input-group\">\n              <input type=\"text\" class=\"form-control\" placeholder=\"Nombre de la categoría\" value.bind=\"newCategory\" required>\n              <span class=\"input-group-btn\">\n                <input type=\"submit\" class=\"btn btn-default ufps-btn-default\" value=\"Agregar\">\n              </span>\n            </div>\n          </form>\n        </div>\n      </div>\n    </div>\n  </div>\n  <!--MODAL PARA EDITAR CATEGORIA-->\n  <div if.bind=\"authService.isAdmin()\" class=\"modal fade\" id=\"edit-category\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"edit-category\">\n    <div class=\"modal-dialog\" role=\"document\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header\">\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n            <span aria-hidden=\"true\">&times;</span>\n          </button>\n          <h4 class=\"modal-title\">Cambiar nombre de la categoría</h4>\n          <br>\n          <form submit.delegate=\"editCategory()\">\n            <div class=\"input-group\">\n              <input type=\"text\" class=\"form-control\" value.bind=\"categoryEditName\" required>\n              <span class=\"input-group-btn\">\n                <input type=\"submit\" class=\"btn btn-default ufps-btn-default\" value=\"Cambiar\">\n              </span>\n            </div>\n          </form>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <!--MODAL PARA ELIMINAR CATEGORIA-->\n  <div if.bind=\"authService.isAdmin()\" class=\"modal fade\" id=\"remove-category\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"remove-category\">\n    <div class=\"modal-dialog\" role=\"document\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header text-center\">\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n            <span aria-hidden=\"true\">&times;</span>\n          </button>\n          <h4 class=\"modal-title\">¿Estás seguro de eliminar la categoría ${categoryRemoveName}?</h4>\n          <br>\n          <p>Esto no eliminará los problemas de dicha categoría, pero quedarán sin clasificar</p>\n\n          <button class=\"btn btn-default ufps-btn-default\" click.delegate=removeCategory()>Si</button>\n          <button class=\"btn btn-default ufps-btn-default\" data-dismiss=\"modal\" aria-label=\"Close\">No</button>\n        </div>\n      </div>\n    </div>\n  </div>\n</template>\n"; });
define('modules/problems/category-problems/category-problems',['exports', 'aurelia-framework', 'aurelia-router', 'config/config', 'models/models', 'services/services'], function (exports, _aureliaFramework, _aureliaRouter, _config, _models, _services) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.CategoryProblems = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2;

  var CategoryProblems = exports.CategoryProblems = (_dec = (0, _aureliaFramework.inject)(_services.Alert, _services.Auth, _services.Problems, _aureliaRouter.Router), _dec(_class = (_class2 = function () {
    function CategoryProblems(alertService, authService, problemService, routerService) {
      _classCallCheck(this, CategoryProblems);

      _initDefineProp(this, 'page', _descriptor, this);

      _initDefineProp(this, 'filterChange', _descriptor2, this);

      this.alertService = alertService;
      this.authService = authService;
      this.problemsService = problemService;
      this.routerService = routerService;
      this.totalPages = 1;
      this.page = 1;
      this.numberOfItems = [10, 20, 30, 50];
      this.sortOptions = ['Id', 'Nombre', 'Dificultad'];
      this.filterChange = false;
      this.limit = 10;
      this.sort = 'Id';
      this.by = 'Ascendente';
      this.pagination = [];
      this.language = 'Cualquier idioma';
      this.problemToRemove = null;
    }

    CategoryProblems.prototype.activate = function activate(params, routeConfig) {
      this.routeConfig = routeConfig;
      this.id = params.id;
      this.getProblems();
    };

    CategoryProblems.prototype.filterChangeChanged = function filterChangeChanged(act, prev) {
      if (prev !== undefined) this.getProblems();
    };

    CategoryProblems.prototype.pageChanged = function pageChanged(act, prev) {
      if (prev !== undefined) this.getProblems();
    };

    CategoryProblems.prototype.getProblems = function getProblems() {
      var _this = this;

      var stringSort = void 0,
          stringLang = void 0;
      if (this.sort === 'Id') stringSort = null;else if (this.sort === 'Nombre') stringSort = 'name';else if (this.sort === 'Dificultad') stringSort = 'level';
      if (this.language === 'Español') stringLang = 'es';else if (this.language === 'Inglés') stringLang = 'en';else stringLang = null;
      this.problemsService.getCategoryProblems(this.id, this.page, this.limit, stringSort, this.by === 'Ascendente' ? 'asc' : 'desc', stringLang).then(function (data) {
        _this.category = new _models.Category(data.meta.categoryName);
        _this.category.setTotalProblems(data.meta.totalItems);
        _this.totalPages = data.meta.totalPages;
        if (_this.totalPages !== 0) {
          _this.category.setProblemsLoaded(data.data);
        } else {
          _this.alertService.showMessage(_config.MESSAGES.problemsEmpty);
        }
      }).catch(function (error) {
        if (error.status === 404) {
          _this.alertService.showMessage(_config.MESSAGES.categoryDoesNotExist);
          _this.routerService.navigate('');
        }
      });
    };

    CategoryProblems.prototype.showRemoveProblem = function showRemoveProblem(id) {
      this.problemToRemove = id;
      window.$('#remove-problem').modal('show');
    };

    CategoryProblems.prototype.removeProblem = function removeProblem() {
      var _this2 = this;

      this.problemsService.removeProblem(this.problemToRemove).then(function () {
        _this2.alertService.showMessage(_config.MESSAGES.problemDeleted);
        _this2.category.removeProblem(_this2.problemToRemove);
        window.$('#remove-problem').modal('hide');
      }).catch(function (error) {
        if (error.status === 401 || error.status === 403) {
          _this2.alertService.showMessage(_config.MESSAGES.permissionsError);
        } else if (error.status === 500) {
          _this2.alertService.showMessage(_config.MESSAGES.serverError);
        } else {
          _this2.alertService.showMessage(_config.MESSAGES.unknownError);
        }
        window.$('#remove-problem').modal('hide');
      });
    };

    return CategoryProblems;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'page', [_aureliaFramework.observable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'filterChange', [_aureliaFramework.observable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class);
});
define('text!modules/problems/category-problems/category-problems.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"../../../resources/attributes/tooltip\"></require>\n  <require from=\"../../../resources/elements/filter\"></require>\n  <require from=\"../../../resources/elements/paginator\"></require>\n  <div class=\"container ufps-container-logged\">\n\n    <ol class=\"breadcrumb\">\n      <li>\n        <a href=\"/\">Categorías</a>\n      </li>\n      <li class=\"active\">Problemas de \"${category.name}\"</li>\n    </ol>\n    <h1 class=\"text-right\">${category.name}</h1>\n    <hr>\n\n    <filter number-of-items.bind=\"numberOfItems\" sort-options.bind=\"sortOptions\" filter-change.bind=\"filterChange\" limit.bind=\"limit\"\n      sort.bind=\"sort\" by.bind=\"by\" text-to-show.bind=\"'problemas'\" language-flag.bind=\"true\" language.bind=\"language\"></filter>\n    <table>\n      <thead>\n        <tr>\n          <th class=\"text-center\" style=\"width:5%\">Id</th>\n          <th class=\"text-center\" style=\"width:70%\">Problema</th>\n          <th class=\"text-center\" style=\"width:10%\">Dificultad</th>\n          <th class=\"text-center\" style=\"width:15%\">Idioma</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr repeat.for=\"problem of category.problemsLoaded\">\n          <td class=\"text-center\">${problem.id}</td>\n          <td class=\"text-left ufps-td-problem\">\n            <p if.bind=\"problem.isInSpanish() && language !== 'Inglés'\" class=\"ufps-name-problem-list\">\n              <a route-href=\"route: view-problem; params.bind: {id:problem.id, lang:'es'}\">${problem.titleES}</a>\n            </p>\n            <p if.bind=\"!problem.isInSpanish() || (problem.isInEnglish() && language === 'Inglés')\" class=\"ufps-name-problem-list\">\n              <a route-href=\"route: view-problem; params.bind: {id:problem.id, lang:'en'}\">${problem.titleEN}</a>\n            </p>\n            <span if.bind=\"problem.resolved\" class=\"ufps-edit-problem-list glyphicon glyphicon-ok\" data-toggle=\"tooltip\" title=\"Ya solucionaste este problema\" tooltip></span>            \n            <a if.bind=\"authService.isAdmin()\" route-href=\"route: edit-problem; params.bind: {id:problem.id}\">\n              <span class=\"ufps-edit-problem-list glyphicon glyphicon-pencil\" data-toggle=\"tooltip\"\n                title=\"Editar problema\" tooltip></span>\n            </a>\n            <span if.bind=\"authService.isAdmin()\" class=\"ufps-edit-problem-list glyphicon glyphicon-remove\" data-toggle=\"tooltip\" title=\"Eliminar problema\"\n              click.delegate=\"showRemoveProblem(problem.id)\" tooltip></span>\n          </td>\n          <td class=\"text-center\">${problem.level}</td>\n          <td class=\"text-center ufps-language\">\n            <span class=\"${problem.isInSpanish() ? 'active' : 'inactive'}\">\n              <a route-href=\"route: view-problem; params.bind: {id:problem.id, lang:'es'}\">ES</a>\n            </span>\n            |\n            <span class=\"${problem.isInEnglish() ? 'active' : 'inactive'}\">\n              <a route-href=\"route: view-problem; params.bind: {id:problem.id, lang: 'en'}\">EN</a>\n            </span>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n    <paginator page.bind=\"page\" total-pages.bind=\"totalPages\"></paginator>\n  </div>\n\n  <!--MODAL PARA ELIMINAR PROBLEMA-->\n  <div if.bind=\"authService.isAdmin()\" class=\"modal fade\" id=\"remove-problem\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"remove-problem\">\n    <div class=\"modal-dialog\" role=\"document\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header text-center\">\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n            <span aria-hidden=\"true\">&times;</span>\n          </button>\n          <h4 class=\"modal-title\">¿Estás seguro de eliminar este problema?</h4>\n          <br>\n          <p>Esta acción no puede ser revertida</p>\n\n          <button class=\"btn btn-default ufps-btn-default\" click.delegate=removeProblem()>Si</button>\n          <button class=\"btn btn-default ufps-btn-default\" data-dismiss=\"modal\" aria-label=\"Close\">No</button>\n        </div>\n      </div>\n    </div>\n  </div>\n</template>\n"; });
define('modules/material/specific-public-material/specific-public-material',['exports', 'aurelia-framework', 'aurelia-router', 'config/config', 'models/models', 'services/services'], function (exports, _aureliaFramework, _aureliaRouter, _config, _models, _services) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SpecificPublicMaterial = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var SpecificPublicMaterial = exports.SpecificPublicMaterial = (_dec = (0, _aureliaFramework.inject)(_services.Alert, _services.Auth, _services.Materials, _aureliaRouter.Router), _dec(_class = function () {
    function SpecificPublicMaterial(alertService, authService, materialService, routerService) {
      _classCallCheck(this, SpecificPublicMaterial);

      this.alertService = alertService;
      this.authService = authService;
      this.materialService = materialService;
      this.routerService = routerService;
    }

    SpecificPublicMaterial.prototype.activate = function activate(params, routeConfig) {
      this.routeConfig = routeConfig;
      this.id = params.id;
      this.getMaterial();
    };

    SpecificPublicMaterial.prototype.getMaterial = function getMaterial() {
      var _this = this;

      this.materialService.getMaterial(this.id).then(function (data) {
        var tmp = data.material;
        _this.category = data.material.category;
        _this.material = new _models.Material(tmp.id, tmp.name, tmp.number, tmp.description, undefined, tmp.url.replace('watch?v=', 'embed/'));
      }).catch(function (error) {
        if (error.status === 404) {
          _this.alertService.showMessage(_config.MESSAGES.materialDoesNotExist);
        } else {
          _this.alertService.showMessage(_config.MESSAGES.serverError);
        }
        _this.routerService.navigate('');
      });
    };

    return SpecificPublicMaterial;
  }()) || _class);
});
define('text!modules/material/specific-public-material/specific-public-material.html', ['module'], function(module) { module.exports = "<template>\n  <div slot=\"content\" class=\"body-slot\">\n    <app-header></app-header>\n    <div class=\"container text-center\">\n      <ol class=\"breadcrumb text-left\">\n        <li>\n          <a href=\"/material-publico\">Material público</a>\n        </li>\n        <li class=\"active\">${material.name}</li>\n      </ol>\n      <div class=\"row\">\n        <div class=\"col-lg-10 col-lg-offset-1\">\n          <h2>${material.name}</h2>\n          <p>${material.description}</p>\n          <div class=\"ufps-container-iframe\">\n            <iframe src=\"${material.url}\" width=\"100%\" class=\"ufps-iframe\" title=\"${material.name}\"></iframe>\n          </div>\n        </div>\n      </div>\n      <div class=\"row\">\n        <p class=\"text-center\">\n          <a href=\"${material.url}\" target=\"_blank\">Abrir en pestaña externa</a>\n        </p>\n      </div>\n    </div>\n  </div>\n</template>\n"; });
define('modules/material/specific-material/specific-material',['exports', 'aurelia-framework', 'aurelia-router', 'config/config', 'models/models', 'services/services'], function (exports, _aureliaFramework, _aureliaRouter, _config, _models, _services) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SpecificMaterial = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var SpecificMaterial = exports.SpecificMaterial = (_dec = (0, _aureliaFramework.inject)(_services.Alert, _services.Auth, _services.Materials, _aureliaRouter.Router), _dec(_class = function () {
    function SpecificMaterial(alertService, authService, materialService, routerService) {
      _classCallCheck(this, SpecificMaterial);

      this.alertService = alertService;
      this.authService = authService;
      this.materialService = materialService;
      this.routerService = routerService;
    }

    SpecificMaterial.prototype.activate = function activate(params, routeConfig) {
      this.routeConfig = routeConfig;
      this.id = params.id;
      this.getMaterial();
    };

    SpecificMaterial.prototype.getMaterial = function getMaterial() {
      var _this = this;

      this.materialService.getMaterial(this.id).then(function (data) {
        var tmp = data.material;
        _this.category = data.material.category;
        if (tmp.url.search('youtube.com') !== -1) tmp.url = tmp.url.replace('watch?v=', 'embed/');
        if (tmp.url.search('youtu.be') !== -1) tmp.url = tmp.url.replace('youtu.be/', 'youtube.com/embed/');
        if (tmp.url.search('/usr/src/app/files/materials/') !== -1) tmp.url = _config.API.apiUrl + 'materials/pdf/' + tmp.url.replace('/usr/src/app/files/materials/', '');
        _this.material = new _models.Material(tmp.id, tmp.name, tmp.number, tmp.description, undefined, tmp.url);
      }).catch(function (error) {
        if (error.status === 404) {
          _this.alertService.showMessage(_config.MESSAGES.materialDoesNotExist);
        } else {
          _this.alertService.showMessage(_config.MESSAGES.serverError);
        }
        _this.routerService.navigate('');
      });
    };

    return SpecificMaterial;
  }()) || _class);
});
define('text!modules/material/specific-material/specific-material.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"container text-center\">\n    <ol class=\"breadcrumb text-left\">\n      <li>\n        <a href=\"/\">Categorías</a>\n      </li>\n      <li>\n          <a href=\"/materials/${category.id}\">Materiales de \"${category.name}\"</a>\n        </li>\n      <li class=\"active\">${material.name}</li>\n    </ol>\n    <div class=\"row\">\n      <div class=\"col-lg-10 col-lg-offset-1\">\n        <h2>${material.name}</h2>\n        <p>${material.description}</p>\n        <div class=\"ufps-container-iframe\">\n          <iframe src=\"${material.url}\" width=\"100%\" class=\"ufps-iframe\" title=\"${material.name}\"></iframe>\n        </div>\n      </div>\n    </div>\n    <div class=\"row\">\n      <p class=\"text-center\">\n        <a href=\"${material.url}\" target=\"_blank\">Abrir en pestaña externa</a>\n      </p>\n    </div>\n  </div>\n</template>\n"; });
define('modules/material/public-material/public-material',['exports', 'aurelia-framework', 'aurelia-router', 'config/config', 'models/models', 'services/services'], function (exports, _aureliaFramework, _aureliaRouter, _config, _models, _services) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.PublicMaterial = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2;

  var PublicMaterial = exports.PublicMaterial = (_dec = (0, _aureliaFramework.inject)(_services.Alert, _services.Auth, _services.Materials), _dec(_class = (_class2 = function () {
    function PublicMaterial(alertService, authService, materialService) {
      _classCallCheck(this, PublicMaterial);

      _initDefineProp(this, 'page', _descriptor, this);

      _initDefineProp(this, 'filterChange', _descriptor2, this);

      this.alertService = alertService;
      this.authService = authService;
      this.materialService = materialService;
      this.materials = [];
      this.numberOfItems = [4, 8, 12, 16];
      this.sortOptions = ['Id', 'Nombre'];
      this.filterChange = true;
      this.limit = 8;
      this.sort = 'Id';
      this.by = 'Ascendente';
      this.page = 1;
      this.totalPages = 1;
      this.getMaterial();
    }

    PublicMaterial.prototype.filterChangeChanged = function filterChangeChanged(act, prev) {
      if (prev !== undefined) this.getMaterial();
    };

    PublicMaterial.prototype.pageChanged = function pageChanged(act, prev) {
      if (prev !== undefined) this.getMaterial();
    };

    PublicMaterial.prototype.getMaterial = function getMaterial() {
      var _this = this;

      this.materialService.getPublicMaterial(this.page, this.limit, this.sort === 'Nombre' ? 'name' : undefined, this.by === 'Ascendente' ? 'asc' : 'desc').then(function (data) {
        _this.materials = [];
        _this.totalPages = data.meta.totalPages;
        if (_this.totalPages !== 0) {
          for (var i = 0; i < data.data.length; i++) {
            _this.materials.push(new _models.Material(data.data[i].id, data.data[i].name));
          }
        } else {
          _this.alertService.showMessage(_config.MESSAGES.materialsEmpty);
        }
      }).catch(function (error) {
        if (error.status === 404) {
          _this.alertService.showMessage(_config.MESSAGES.materialDoesNotExist);
        } else {
          _this.alertService.showMessage(_config.MESSAGES.serverError);
        }
      });
    };

    return PublicMaterial;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'page', [_aureliaFramework.observable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'filterChange', [_aureliaFramework.observable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class);
});
define('text!modules/material/public-material/public-material.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"../../../resources/elements/filter\"></require>\n  <require from=\"../../../resources/elements/paginator\"></require>\n  <div slot=\"content\" class=\"body-slot\">\n    <app-header></app-header>\n    <div class=\"container\">\n      <br>\n      <filter number-of-items.bind=\"numberOfItems\" sort-options.bind=\"sortOptions\" filter-change.bind = \"filterChange\" limit.bind =\"limit\" sort.bind=\"sort\" by.bind=\"by\" text-to-show.bind=\"'materiales'\" language-flag.bind=\"false\"></filter>\n      <div repeat.for=\"material of materials\" class=\"col-xs-12 col-sm-6 col-md-4 col-lg-3 ufps-card-container\">\n        <a href=\"/material-publico/${material.id}\">\n          <div class=\"ufps-card\">\n            <div class=\"ufps-card-title ufps-card-material\">\n              <span if.bind=\"authService.isAdmin()\" class=\"ufps-edit-category glyphicon glyphicon-pencil\" data-toggle=\"tooltip\" title=\"Editar este material\"\n                tooltip></span>\n              <span if.bind=\"authService.isAdmin()\" class=\"ufps-remove-category glyphicon glyphicon-remove\" data-toggle=\"tooltip\" title=\"Eliminar este material\"\n                tooltip></span>\n              <h1>${material.name}</h1>\n            </div>\n          </div>\n        </a>\n      </div>\n      <div class=\"fix\"></div>\n      <paginator page.bind=\"page\" total-pages.bind=\"totalPages\"></paginator>\n    </div>\n  </div>\n</template>\n"; });
define('modules/material/material',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Material = exports.Material = function () {
    function Material() {
      _classCallCheck(this, Material);
    }

    Material.prototype.configureRouter = function configureRouter(config, router) {
      config.map([{
        route: '',
        name: 'material',
        moduleId: 'modules/material/category-material/category-material',
        title: 'Material',
        settings: {
          roles: ['admin', 'coach', 'student']
        }
      }, {
        route: '/material/:id',
        name: 'specificMaterial',
        moduleId: 'modules/material/specific-material/specific-material',
        title: 'Material',
        settings: {
          roles: ['admin', 'coach', 'student']
        }
      }]);
      this.router = router;
    };

    return Material;
  }();
});
define('text!modules/material/material.html', ['module'], function(module) { module.exports = "<template>\n  <div slot=\"content\" class=\"body-slot\">\n    <router-view></router-view>\n  </div>\n</template>"; });
define('modules/material/category-material/category-material',['exports', 'aurelia-framework', 'aurelia-router', 'config/config', 'models/models', 'services/services'], function (exports, _aureliaFramework, _aureliaRouter, _config, _models, _services) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.CategoryMaterial = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2;

  var CategoryMaterial = exports.CategoryMaterial = (_dec = (0, _aureliaFramework.inject)(_services.Alert, _services.Auth, _services.Materials, _aureliaRouter.Router), _dec(_class = (_class2 = function () {
    function CategoryMaterial(alertService, authService, materialService, routerService) {
      _classCallCheck(this, CategoryMaterial);

      _initDefineProp(this, 'page', _descriptor, this);

      _initDefineProp(this, 'filterChange', _descriptor2, this);

      this.alertService = alertService;
      this.authService = authService;
      this.materialService = materialService;
      this.routerService = routerService;
      this.materials = [];
      this.newMaterial = new _models.Material();
      this.numberOfItems = [3, 7, 11, 15];
      this.sortOptions = ['Id', 'Nombre'];
      this.filterChange = false;
      this.limit = 7;
      this.sort = 'Id';
      this.by = 'Ascendente';
      this.page = 1;
      this.totalPages = 1;
    }

    CategoryMaterial.prototype.filterChangeChanged = function filterChangeChanged(act, prev) {
      if (prev !== undefined) this.getMaterial();
    };

    CategoryMaterial.prototype.pageChanged = function pageChanged(act, prev) {
      if (prev !== undefined) this.getMaterial();
    };

    CategoryMaterial.prototype.activate = function activate(params, routeConfig) {
      this.routeConfig = routeConfig;
      this.id = params.id;
      this.newMaterial.category = this.id;
      this.getMaterial();
    };

    CategoryMaterial.prototype.getMaterial = function getMaterial() {
      var _this = this;

      this.materialService.getCategoryMaterial(this.id, this.page, this.limit, this.sort === 'Nombre' ? 'name' : undefined, this.by === 'Ascendente' ? 'asc' : 'desc').then(function (data) {
        _this.materials = [];
        _this.category = data.meta.categoryName;
        _this.totalPages = data.meta.totalPages;
        if (_this.totalPages !== 0) {
          for (var i = 0; i < data.data.length; i++) {
            _this.materials.push(new _models.Material(data.data[i].id, data.data[i].name));
          }
        } else {
          _this.alertService.showMessage(_config.MESSAGES.materialsEmpty);
        }
      }).catch(function (error) {
        if (error.status === 404) {
          _this.alertService.showMessage(_config.MESSAGES.materialDoesNotExist);
        } else {
          _this.alertService.showMessage(_config.MESSAGES.serverError);
        }
      });
    };

    CategoryMaterial.prototype.showRemoveMaterial = function showRemoveMaterial(id, name) {
      this.materialToRemove = id;
      this.materialToRemoveName = name;
      window.$('#remove-material').modal('show');
    };

    CategoryMaterial.prototype.createMaterial = function createMaterial() {
      var _this2 = this;

      this.materialService.createMaterial(this.newMaterial).then(function (data) {
        _this2.alertService.showMessage(_config.MESSAGES.addedMaterial);
        _this2.getMaterial();
        _this2.newMaterial = new _models.Material();
        _this2.newMaterial.category = _this2.id;
        window.$('#new-material').modal('hide');
      }).catch(function () {
        _this2.alertService.showMessage(_config.MESSAGES.serverError);
        window.$('#new-material').modal('hide');
      });
    };

    CategoryMaterial.prototype.removeMaterial = function removeMaterial() {
      var _this3 = this;

      this.materialService.remove(this.materialToRemove).then(function (data) {
        _this3.alertService.showMessage(_config.MESSAGES.materialRemoved);
        _this3.getMaterial();
        window.$('#remove-material').modal('hide');
      }).catch(function () {
        _this3.alertService.showMessage(_config.MESSAGES.serverError);
        window.$('#remove-material').modal('hide');
      });
    };

    return CategoryMaterial;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'page', [_aureliaFramework.observable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'filterChange', [_aureliaFramework.observable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class);
});
define('text!modules/material/category-material/category-material.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"../../../resources/attributes/tooltip\"></require>\n  <require from=\"../../../resources/elements/filter\"></require>\n  <require from=\"../../../resources/elements/paginator\"></require>\n  <div class=\"container ufps-container-logged\">\n    <ol class=\"breadcrumb\">\n      <li>\n        <a href=\"/\">Categorías</a>\n      </li>\n      <li class=\"active\">Materiales de \"${category}\"</li>\n    </ol>\n    <h1 class=\"text-right\">${category}</h1>\n    <hr>\n\n    <filter number-of-items.bind=\"numberOfItems\" sort-options.bind=\"sortOptions\" filter-change.bind=\"filterChange\"\n      limit.bind=\"limit\" sort.bind=\"sort\" by.bind=\"by\" text-to-show.bind=\"'materiales'\" language-flag.bind=\"false\"></filter>\n    <div repeat.for=\"material of materials\" class=\"col-xs-12 col-sm-6 col-md-4 col-lg-3 ufps-card-container\">\n\n      <div class=\"ufps-card\">\n        <div class=\"ufps-card-title ufps-card-material\">\n          <span if.bind=\"authService.isAdmin()\" click.delegate=\"showRemoveMaterial(material.id, material.name)\" class=\"ufps-remove-category glyphicon glyphicon-remove\"\n            data-toggle=\"tooltip\" title=\"Eliminar este material\" tooltip></span>\n          \n            <h1><a route-href=\"route: specificMaterial; params.bind: {id:material.id}\">${material.name}</a></h1>\n          \n        </div>\n      </div>\n\n\n    </div>\n    <div if.bind=\"authService.authenticated\" class=\"col-xs-12 col-sm-6 col-md-4 col-lg-3 ufps-card-new ufps-card-container\">\n      <div class=\"ufps-card\" data-toggle=\"modal\" data-target=\"#new-material\">\n        <div class=\"ufps-card-title\">\n          <h1>\n            <span class=\"glyphicon glyphicon-plus\"></span>\n          </h1>\n        </div>\n        <div class=\"col-xs-12 ufps-card-link\">\n          Subir material\n        </div>\n        <div class=\"fix\"></div>\n      </div>\n    </div>\n    <div class=\"fix\"></div>\n    <paginator page.bind=\"page\" total-pages.bind=\"totalPages\"></paginator>\n  </div>\n  <!--MODAL PARA AÑADIR MATERIAL-->\n  <div if.bind=\"authService.authenticated\" class=\"modal fade\" id=\"new-material\" tabindex=\"-1\" role=\"dialog\"\n    aria-labelledby=\"new-material\">\n    <div class=\"modal-dialog\" role=\"document\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header\">\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n            <span aria-hidden=\"true\">&times;</span>\n          </button>\n          <h4 class=\"modal-title\">Añadir material</h4>\n          <br>\n          <form enctype=\"multipart/form-data\" submit.delegate=\"createMaterial()\">\n            <input type=\"text\" class=\"form-control\" placeholder=\"Nombre\" value.bind=\"newMaterial.name\" required>\n            <br>\n            <input type=\"text\" class=\"form-control\" placeholder=\"Descripcion\" value.bind=\"newMaterial.description\">\n            <br>\n            <label for=\"selectType\">Tipo:</label>\n            <input type=\"radio\" name=\"selectType\" checked.bind=\"newMaterial.isPdf\" model.bind=\"true\"> PDF\n            <input type=\"radio\" name=\"selectType\" checked.bind=\"newMaterial.isPdf\" model.bind=\"false\"> URL\n            <br>\n            <input if.bind=\"!newMaterial.isPdf\" type=\"text\" class=\"form-control\" placeholder=\"Url\" value.bind=\"newMaterial.url\">\n            <input if.bind=\"newMaterial.isPdf\" type=\"file\" class=\"form-control\" files.bind=\"newMaterial.pdf\" accept=\".pdf\">\n            <br>\n            <p class=\"text-center\" if.bind=\"authService.isStudent()\">Aparecerá en la plataforma una vez sea aprobado\n              por un administrador.</p>\n            <input type=\"submit\" class=\"btn btn-default ufps-btn-default\" value=\"Añadir\">\n          </form>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <!--MODAL PARA ELIMINAR MATERIAL-->\n  <div if.bind=\"authService.isAdmin()\" class=\"modal fade\" id=\"remove-material\" tabindex=\"-1\" role=\"dialog\"\n    aria-labelledby=\"remove-material\">\n    <div class=\"modal-dialog\" role=\"document\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header text-center\">\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n            <span aria-hidden=\"true\">&times;</span>\n          </button>\n          <h4 class=\"modal-title\">¿Estás seguro de eliminar el material '${materialToRemoveName}'?</h4>\n          <br>\n          <p>Esta acción no puede ser revertida.</p>\n\n          <button class=\"btn btn-default ufps-btn-default\" click.delegate=removeMaterial()>Si</button>\n          <button class=\"btn btn-default ufps-btn-default\" data-dismiss=\"modal\" aria-label=\"Close\">No</button>\n        </div>\n      </div>\n    </div>\n  </div>\n</template>\n"; });
define('modules/login/login',['exports', 'aurelia-framework', 'aurelia-router', 'config/config', 'models/models', 'services/services'], function (exports, _aureliaFramework, _aureliaRouter, _config, _models, _services) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Login = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Login = exports.Login = (_dec = (0, _aureliaFramework.inject)(_services.Alert, _services.Auth, _aureliaRouter.Router), _dec(_class = function () {
    function Login(alertService, authorizationService, router) {
      _classCallCheck(this, Login);

      this.authorizationService = authorizationService;
      this.router = router;
      this.alertService = alertService;
      this.user = new _models.UserLogIn();
    }

    Login.prototype.login = function login() {
      var _this = this;

      if (this.user.email !== '' && this.user.password !== '' && this.user.email != null && this.user.password !== null) {
        this.authorizationService.auth(this.user).then(function (data) {
          _this.authorizationService.login(data.token);
          _this.router.navigate('');
        }).catch(function (error) {
          switch (error.status) {
            case 401:
              _this.alertService.showMessage(_config.MESSAGES.loginWrongData);
              _this.user = new _models.UserLogIn();
              break;
            case 500:
              _this.alertService.showMessage(_config.MESSAGES.serverError);
              break;
            default:
              _this.alertService.showMessage(_config.MESSAGES.unknownError);
          }
        });
      } else {
        this.alertService.showMessage(_config.MESSAGES.loginIncompleteData);
      }
    };

    return Login;
  }()) || _class);
});
define('text!modules/login/login.html', ['module'], function(module) { module.exports = "<template>\n  <div slot=\"content\">\n    <div class=\"col-xs-12 text-center\">\n      <img class=\"ufps-logo-sign\" src=\"./src/assets/img/logo-transparent.png\" alt=\"\">\n    </div>\n    <div class=\"col-xs-10 col-xs-offset-1 text-center\">\n      <h1>Iniciar Sesión</h1>\n      <form action=\"\" class=\"text-left ufps-form-sign\" submit.delegate = \"login()\">\n        <div class=\"form-group\">\n          <label for=\"email\">Correo Electrónico</label>\n          <input type=\"email\" class=\"form-control ufps-sign-input\" id=\"email\" placeholder=\"Email\" value.bind=\"user.email\" required>\n        </div>\n        <div class=\"form-group\">\n          <label for=\"password\">Contraseña</label>\n          <input type=\"password\" class=\"form-control ufps-sign-input\" id=\"password\" placeholder=\"Contraseña\" value.bind=\"user.password\" required>\n        </div>\n        <input type=\"submit\" class=\"btn ufps-btn-sign\" value=\"Iniciar Sesión\">\n      </form>\n      <a class=\"btn ufps-btn-sign\"  route-href=\"route: public-material\">Ver Material Público</a>\n      <div class=\"col-xs-4 text-left ufps-sign-links\">\n        <a route-href=\"route: signin\">¡Regístrate!</a>\n      </div>\n      <div class=\"col-xs-8 text-right ufps-sign-links\">\n        <a route-href=\"route: recovery-password\">¿Olvidaste tu contraseña?</a>\n      </div>\n    </div>\n  </div>\n</template>"; });
define('modules/error-404/error-404',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Error404 = exports.Error404 = function Error404() {
    _classCallCheck(this, Error404);
  };
});
define('text!modules/error-404/error-404.html', ['module'], function(module) { module.exports = "<template>\n    <div slot=\"content\" class=\"body-slot\">\n  <div class=\"container ufps-container-logged ufps-container-404\">\n    <div class=\"col-md-8 col-md-offset-2 col-sm-12\">\n      <div class=\"panel panel-default text-center\">\n        <div class=\"panel-body\">\n          <h1 class=\"text-center\">Error 404</h1>\n          <hr>\n          <p>Cuando los oompa loompas que hacen funcionar esta página buscaron en el servidor el contenido al que estás tratando de acceder, no lo encontraron. Pero en su lugar encontraron este hermoso, increible y magnifico gatito:</p>\n          <img class=\"img-responsive img-404\" src=\"./src/assets/img/gato.jpg\">\n          <p>(Foto de <a href=\"https://unsplash.com/photos/NodtnCsLdTE?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText\" target=\"_blank\">Mikhail Vasilyev en Unsplash</a>)</p>\n          <p>Ahora debes tomar una difícil decisión: Puedes volver al inicio de esta plataforma, y seguir resolviendo ejercicios, compitiendo en maratones, resolviendo tareas y preparandote para ser el mejor del mundo (olvidandote del gatito). O bien, puedes quedarte aquí, admirando al hermoso gatito.</p>\n\n          <a href=\"/\" class=\"btn ufps-btn-submit\">Volver al inicio</a>\n          <a class=\"btn ufps-btn-submit\">Quiero seguir viendo al gato</a>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n</template>"; });
define('modules/contest/home-contest/home-contest',['exports', 'aurelia-framework', 'config/config', 'models/models', 'services/services'], function (exports, _aureliaFramework, _config, _models, _services) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.HomeContest = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var HomeContest = exports.HomeContest = (_dec = (0, _aureliaFramework.inject)(_services.Alert, _services.Auth, _services.Contests), _dec(_class = function () {
    function HomeContest(alertService, authService, contestService) {
      _classCallCheck(this, HomeContest);

      this.alertService = alertService;
      this.authService = authService;
      this.contestService = contestService;
      this.numberOfItems = [10, 15, 20];
      this.sortOptions = ['Id', 'Nombre'];
      this.filterChangeMyContests = false;
      this.limitMyContests = 10;
      this.sortMyContests = 'Id';
      this.byMyContests = 'Ascendente';
      this.pageMyContests = 1;
      this.totalPagesMyContests = 0;
      this.filterChangeAllContests = false;
      this.limitAllContests = 10;
      this.sortAllContests = 'Id';
      this.byAllContests = 'Ascendente';
      this.pageAllContests = 1;
      this.totalPagesAllContests = 0;
      this.myContests = [];
      this.allContests = [];
      this.getMyContests();
      this.getContests();
    }

    HomeContest.prototype.getMyContests = function getMyContests() {
      var _this = this;

      this.contestService.getMyContests(this.limitMyContests, this.pageMyContests, this.authService.getUserId()).then(function (data) {
        _this.totalPagesMyContests = data.meta.totalPages;
        _this.myContests = [];
        if (_this.totalPagesMyContests > 0) {
          for (var i = 0; i < data.data.length; i++) {
            _this.myContests.push(new _models.Contest(data.data[i].title, data.data[i].description, data.data[i].init_date, data.data[i].end_date, data.data[i].rules, data.data[i].public, undefined, data.data[i].id));
          }
        }
      }).catch(function (error) {
        if (error.status === 400) {
          _this.alertService.showMessage(_config.MESSAGES.contestError);
        } else if (error.status === 401) {
          _this.alertService.showMessage(_config.MESSAGES.permissionsError);
        } else {
          _this.alertService.showMessage(_config.MESSAGES.unknownError);
        }
      });
    };

    HomeContest.prototype.getContests = function getContests() {
      var _this2 = this;

      this.contestService.getContests(this.limitAllContests, this.pageAllContests).then(function (data) {
        _this2.totalPagesAllContests = data.meta.totalPages;
        _this2.allContests = [];
        if (_this2.totalPagesAllContests > 0) {
          for (var i = 0; i < data.data.length; i++) {
            _this2.allContests.push(new _models.Contest(data.data[i].title, data.data[i].description, data.data[i].init_date, data.data[i].end_date, data.data[i].rules, data.data[i].public, undefined, data.data[i].id));
          }
        }
      }).catch(function (error) {
        if (error.status === 400) {
          _this2.alertService.showMessage(_config.MESSAGES.contestError);
        } else if (error.status === 401) {
          _this2.alertService.showMessage(_config.MESSAGES.permissionsError);
        } else {
          _this2.alertService.showMessage(_config.MESSAGES.unknownError);
        }
      });
    };

    HomeContest.prototype.showMessage = function showMessage() {
      this.alertService.showMessage(_config.MESSAGES.temporarilyDisabled);
    };

    return HomeContest;
  }()) || _class);
});
define('text!modules/contest/home-contest/home-contest.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"../../../resources/elements/filter\"></require>\n  <require from=\"../../../resources/elements/paginator\"></require>\n  <div class=\"container\">\n\n    <br>\n    <br>\n    <div if.bind=\"totalPagesMyContests > 0\">\n      <div class=\"col-md-3\">\n        <h1> \n          <a route-href=\"create\" class=\"btn btn-default ufps-btn-default\">Crear Maratón</a>\n          <!--<a click.delegate=\"showMessage()\" class=\"btn btn-default ufps-btn-default\">Crear Maratón</a>-->\n        </h1>\n      </div>\n      <div class=\"col-md-9\">\n        <h1 class=\"text-right\">Mis maratones</h1>\n        <div class=\"fix\"></div>\n      </div>\n      <div class=\"fix\"></div>\n      <hr>\n      <filter number-of-items.bind=\"numberOfItems\" sort-options.bind=\"sortOptions\" filter-change.bind=\"filterChangeMyContests\"\n        limit.bind=\"limitMyContests\" sort.bind=\"sortMyContests\" by.bind=\"byMyContests\" text-to-show.bind=\"'maratones'\" language-flag.bind=\"false\"></filter>\n      <table>\n        <thead>\n          <tr>\n            <th class=\"text-center\">Id</th>\n            <th class=\"text-center\">Nombre</th>\n            <th class=\"text-center\">Tipo</th>\n            <th class=\"text-center\">Fecha de inicio</th>\n            <th class=\"text-center\"></th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr repeat.for=\"contest of myContests\">\n            <td>${contest.id}</td>\n            <td>${contest.title}</td>\n            <td class=\"text-center\" if.bind=\"contest.privacy\">Pública</td>\n            <td class=\"text-center\" if.bind=\"!contest.privacy\">Privada</td>\n            <td class=\"text-center\">${contest.getSemanticStartDate()}</td>\n            <td class=\"text-right\">\n              <a route-href=\"route: edit; params.bind: {id:contest.id}\" class=\"btn btn-default ufps-btn-default\">Editar y añadir problemas</a>\n              <a route-href=\"route: detail; params.bind: {id:contest.id}\" class=\"btn btn-default ufps-btn-default\">Ver</a>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n      <paginator page.bind=\"pageMyContests\" total-pages.bind=\"totalPagesMyContests\"></paginator>\n    </div>\n    <div if.bind=\"totalPagesMyContests > 0\">\n      <h1 class=\"text-right\">Maratones en ejecución y futuras</h1>\n      <div class=\"fix\"></div>\n    </div>\n    <div if.bind=\"totalPagesMyContests === 0\">\n      <div class=\"col-md-3\">\n        <h1>\n          <a route-href=\"create\" class=\"btn btn-default ufps-btn-default\">Crear Maratón</a>\n          <!--<a click.delegate=\"showMessage()\" class=\"btn btn-default ufps-btn-default\">Crear Maratón</a>-->\n        </h1>\n      </div>\n      <div class=\"col-md-9\">\n        <h1 class=\"text-right\">Maratones en ejecución y futuras</h1>\n        <div class=\"fix\"></div>\n      </div>\n    </div>\n    <div class=\"fix\"></div>\n    <hr>\n    <br>\n    <filter number-of-items.bind=\"numberOfItems\" sort-options.bind=\"sortOptions\" filter-change.bind=\"filterChangeAllContests\"\n      limit.bind=\"limitAllContests\" sort.bind=\"sortAllContests\" by.bind=\"byAllContests\" text-to-show.bind=\"'maratones'\" language-flag.bind=\"false\"></filter>\n    <table>\n      <thead>\n        <tr>\n          <th class=\"text-center\">Id</th>\n          <th class=\"text-center\">Nombre</th>\n          <th class=\"text-center\">Tipo</th>\n          <th class=\"text-center\">Fecha de inicio</th>\n          <th class=\"text-center\"></th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr repeat.for=\"contest of allContests\">\n          <td>${contest.id}</td>\n          <td>${contest.title}</td>\n          <td class=\"text-center\" if.bind=\"contest.privacy\">Pública</td>\n          <td class=\"text-center\" if.bind=\"!contest.privacy\">Privada</td>\n          <td class=\"text-center\">${contest.getSemanticStartDate()}</td>\n          <td class=\"text-right\">\n            <a route-href=\"route: detail; params.bind: {id:contest.id}\" class=\"btn btn-default ufps-btn-default\">Abrir</a>\n          </td>\n        </tr>\n        <tr if.bind=\"totalPagesAllContest === 0\">\n          <td></td>\n          <td>No hay competencias disponibles</td>\n          <td></td>\n          <td></td>\n          <td></td>\n        </tr>\n      </tbody>\n    </table>\n    <paginator page.bind=\"pageAllContests\" total-pages.bind=\"totalPagesAllContests\"></paginator>\n  </div>\n</template>\n"; });
define('modules/contest/edit-contest/edit-contest',['exports', 'aurelia-framework', 'aurelia-router', 'config/config', 'models/models', 'services/services'], function (exports, _aureliaFramework, _aureliaRouter, _config, _models, _services) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.EditContest = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var EditContest = exports.EditContest = (_dec = (0, _aureliaFramework.inject)(_services.Alert, _services.Contests, _aureliaRouter.Router), _dec(_class = function () {
    function EditContest(alertService, contestService, router) {
      _classCallCheck(this, EditContest);

      this.alertService = alertService;
      this.contestService = contestService;
      this.router = router;
      this.contest = new _models.Contest();
      this.problems = [];
      this.newProblems = '';
    }

    EditContest.prototype.activate = function activate(params, routeConfig) {
      this.routeConfig = routeConfig;
      this.id = params.id;
      this.getContest();
    };

    EditContest.prototype.edit = function edit() {
      var _this = this;

      this.contest.initDate = new Date(this.startDate + ' ' + this.startTime).toISOString();
      this.contest.endDate = new Date(this.endDate + ' ' + this.endTime).toISOString();
      this.contestService.editContest(this.contest).then(function (data) {
        _this.alertService.showMessage(_config.MESSAGES.contestUpdated);
      }).catch(function (error) {
        if (error.status === 400) {
          _this.alertService.showMessage(_config.MESSAGES.contestError);
        } else if (error.status === 401) {
          _this.alertService.showMessage(_config.MESSAGES.permissionsError);
        } else {
          _this.alertService.showMessage(_config.MESSAGES.unknownError);
        }
      });
    };

    EditContest.prototype.formatDate = function formatDate(date) {
      var str = date.getUTCFullYear() + '-';
      if (date.getMonth() + 1 < 10) str += '0';
      str += date.getMonth() + 1 + '-';
      if (date.getDate() < 10) str += '0';
      str += date.getDate();
      return str;
    };

    EditContest.prototype.formatTime = function formatTime(time) {
      var str = '';
      if (time.getHours() < 10) str += '0';
      str += time.getHours() + ':';
      if (time.getMinutes() < 10) str += '0';
      str += time.getMinutes();
      return str;
    };

    EditContest.prototype.getContest = function getContest() {
      var _this2 = this;

      this.contestService.getContest(this.id).then(function (data) {
        _this2.contest = new _models.Contest(data.contest.title, data.contest.description, data.contest.init_date, data.contest.end_date, data.contest.rules, data.contest.public, null, _this2.id);
        var tmpStart = new Date(data.contest.init_date);
        var tmpEnd = new Date(data.contest.end_date);
        _this2.startDate = _this2.formatDate(tmpStart);
        _this2.endDate = _this2.formatDate(tmpEnd);
        _this2.startTime = _this2.formatTime(tmpStart);
        _this2.endTime = _this2.formatTime(tmpEnd);
        _this2.getProblems();
      }).catch(function (error) {
        if (error.status === 400) {
          _this2.alertService.showMessage(_config.MESSAGES.contestError);
        } else if (error.status === 401) {
          _this2.alertService.showMessage(_config.MESSAGES.permissionsError);
        } else {
          _this2.alertService.showMessage(_config.MESSAGES.unknownError);
        }
      });
    };

    EditContest.prototype.getProblems = function getProblems() {
      var _this3 = this;

      this.contestService.getProblems(this.id).then(function (data) {
        _this3.problems = [];
        for (var i = 0; i < data.contest.problems.length; i++) {
          _this3.problems.push(new _models.Problem(data.contest.problems[i].id, data.contest.problems[i].title_en, data.contest.problems[i].title_es));
        }
      }).catch(function (error) {
        if (error.status === 400) {
          _this3.alertService.showMessage(_config.MESSAGES.contestError);
        } else if (error.status === 401) {
          _this3.alertService.showMessage(_config.MESSAGES.permissionsError);
        } else {
          _this3.alertService.showMessage(_config.MESSAGES.unknownError);
        }
      });
    };

    EditContest.prototype.validateProblemsIds = function validateProblemsIds() {
      var problemsTemp = this.newProblems.replace(/ /g, '');
      problemsTemp = problemsTemp.split(',');
      var problemsArr = [];
      for (var i = 0; i < problemsTemp.length; i++) {
        if (problemsTemp[i].length > 0 && !isNaN(parseInt(problemsTemp[i]))) problemsArr.push(parseInt(problemsTemp[i]));else if (isNaN(parseInt(problemsTemp[i]))) return false;
      }
      this.newProblems = problemsArr;
      return true;
    };

    EditContest.prototype.addProblems = function addProblems() {
      var _this4 = this;

      if (this.validateProblemsIds()) {
        this.contestService.addProblems(this.id, this.newProblems).then(function (data) {
          _this4.alertService.showMessage(_config.MESSAGES.problemsAdded);
          _this4.getProblems();
        }).catch(function (error) {
          if (error.status === 400) {
            _this4.alertService.showMessage(_config.MESSAGES.contestError);
          } else if (error.status === 401) {
            _this4.alertService.showMessage(_config.MESSAGES.permissionsError);
          } else {
            _this4.alertService.showMessage(_config.MESSAGES.unknownError);
          }
        });
      } else this.alertService.showMessage(_config.MESSAGES.invalidIdProblem);
    };

    EditContest.prototype.showRemoveProblem = function showRemoveProblem(id) {
      this.problemToRemove = id;
      window.$('#remove-problem').modal('show');
    };

    EditContest.prototype.removeProblem = function removeProblem() {
      var _this5 = this;

      this.contestService.removeProblem(this.id, this.problemToRemove).then(function () {
        _this5.alertService.showMessage(_config.MESSAGES.problemDeleted);
        _this5.getProblems();
        window.$('#remove-problem').modal('hide');
      }).catch(function (error) {
        if (error.status === 401 || error.status === 403) {
          _this5.alertService.showMessage(_config.MESSAGES.permissionsError);
        } else if (error.status === 500) {
          _this5.alertService.showMessage(_config.MESSAGES.serverError);
        } else {
          _this5.alertService.showMessage(_config.MESSAGES.unknownError);
        }
        window.$('#remove-problem').modal('hide');
      });
    };

    return EditContest;
  }()) || _class);
});
define('text!modules/contest/edit-contest/edit-contest.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"container\">\n    <ol class=\"breadcrumb\">\n      <li>\n          <a route-href=\"route: contest;\">Maratones</a>\n      </li>\n      <li class=\"active\">Editar maratón \"${contest.title}\"</li>\n    </ol>\n    <h2 class=\"text-right\">Editar maratón \"${contest.title}\"</h2>\n    <hr>\n    <form submit.delegate=\"edit()\">\n      <div class=\"form-horizontal form-horizontal-assignment\">\n        <div class=\"form-group\">\n          <label class=\"control-label col-sm-2\">Nombre:</label>\n          <div class=\"col-sm-10 input-group ufps-input-creator\">\n            <input type=\"text\" class=\"form-control\" placeholder=\"Nombre de la maratón\" value.bind=\"contest.title\" required>\n            <span class=\"input-group-addon\" tooltip data-toggle=\"tooltip\" title=\"Título de la maratón. Por ejemplo 'II Maratón de Programación UFPS'\">\n              <span class=\"glyphicon glyphicon-question-sign\"></span>\n            </span>\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <label class=\"control-label col-sm-2\">Descripción:</label>\n          <div class=\"col-sm-10 input-group ufps-input-creator\">\n            <textarea class=\"form-control\" placeholder=\"Descripción de la maratón\" value.bind=\"contest.description\"></textarea>\n            <span class=\"input-group-addon\" tooltip data-toggle=\"tooltip\" title=\"Descripción que se mostrará a los estudiantes al ingresar a la maratón\">\n              <span class=\"glyphicon glyphicon-question-sign\"></span>\n            </span>\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <label class=\"control-label col-sm-2\">Reglas:</label>\n          <div class=\"col-sm-10 input-group ufps-input-creator\">\n            <textarea class=\"form-control\" placeholder=\"En este espacio puede indicar reglas especificas sobre el horario de competencia, premios, información adicional, etc.\"\n              value.bind=\"contest.rules\"></textarea>\n            <span class=\"input-group-addon\" tooltip data-toggle=\"tooltip\" title=\"Reglas de la maratón\">\n              <span class=\"glyphicon glyphicon-question-sign\"></span>\n            </span>\n          </div>\n        </div>\n      </div>\n      <div class=\"form-horizontal col-md-6\">\n        <div class=\"form-group\">\n          <label class=\"control-label col-sm-2\">Desde el:</label>\n          <div class=\"col-sm-10 input-group ufps-input-creator\">\n            <input type=\"date\" class=\"form-control\" value.bind=\"startDate\" required>\n            <span class=\"input-group-addon\" tooltip data-toggle=\"tooltip\" title=\"Fecha de inicio de la maratón\">\n              <span class=\"glyphicon glyphicon-question-sign\"></span>\n            </span>\n          </div>\n        </div>\n      </div>\n      <div class=\"form-horizontal col-md-6\">\n        <div class=\"form-group\">\n          <label class=\"control-label col-sm-2\">a las:</label>\n          <div class=\"col-sm-10 input-group ufps-input-creator\">\n            <input type=\"time\" class=\"form-control\" value.bind=\"startTime\" required>\n            <span class=\"input-group-addon\" tooltip data-toggle=\"tooltip\" title=\"Hora de inicio de la maratón\">\n              <span class=\"glyphicon glyphicon-question-sign\"></span>\n            </span>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"form-horizontal col-md-6\">\n        <div class=\"form-group\">\n          <label class=\"control-label col-sm-2\">Hasta el:</label>\n          <div class=\"col-sm-10 input-group ufps-input-creator\">\n            <input type=\"date\" class=\"form-control\" value.bind=\"endDate\" min=\"${startDate}\" required>\n            <span class=\"input-group-addon\" tooltip data-toggle=\"tooltip\" title=\"Fecha de terminación de la maratón\">\n              <span class=\"glyphicon glyphicon-question-sign\"></span>\n            </span>\n          </div>\n        </div>\n      </div>\n      <div class=\"form-horizontal col-md-6\">\n        <div class=\"form-group\">\n          <label class=\"control-label col-sm-2\">a las:</label>\n          <div class=\"col-sm-10 input-group ufps-input-creator\">\n            <input type=\"time\" class=\"form-control\" value.bind=\"endTime\" required>\n            <span class=\"input-group-addon\" tooltip data-toggle=\"tooltip\" title=\"Hora de terminación de la maratón\">\n              <span class=\"glyphicon glyphicon-question-sign\"></span>\n            </span>\n          </div>\n        </div>\n      </div>\n      <div class=\"text-center\">\n        <p>Esta maratón será: </p>\n        <label class=\"radio-inline\">\n          <input type=\"radio\" model.bind=\"true\" checked.bind=\"contest.privacy\"> Pública\n        </label>\n        <label class=\"radio-inline\">\n          <input type=\"radio\" model.bind=\"false\" checked.bind=\"contest.privacy\"> Privada\n        </label>\n      </div>\n      <br>\n      <div class=\"form-horizontal form-horizontal-assignment\" if.bind=\"!contest.privacy\">\n        <label class=\"control-label col-sm-2\">Nueva Clave:</label>\n        <div class=\"col-sm-10 input-group ufps-input-creator\">\n          <input type=\"text\" class=\"form-control\" placeholder=\"Clave para entrar a la maratón\" value.bind=\"contest.key\" required>\n          <span class=\"input-group-addon\" tooltip data-toggle=\"tooltip\" title=\"asigne una clave e informela a los usuarios que participarán.\">\n            <span class=\"glyphicon glyphicon-question-sign\"></span>\n          </span>\n        </div>\n        <br>\n      </div>\n      <div class=\"text-center\">\n        <input type=\"submit\" value=\"Editar Maratón\" class=\"btn btn-default ufps-btn-default\">\n      </div>\n    </form>\n    <h2 class=\"text-right\">Problemas</h2>\n    <hr>\n    <div class=\"form-horizontal\">\n      <form submit.delegate=\"addProblems()\">\n        <div class=\"form-group col-sm-10\">\n          <label class=\"control-label col-sm-3\" for=\"problem-id\">Añadir:</label>\n          <div class=\"col-sm-9 input-group ufps-input-creator\">\n            <input type=\"text\" class=\"form-control\" placeholder=\"Ingresa el id de los problemas a añadir separados por comas\" value.bind=\"newProblems\"\n              required>\n            <span class=\"input-group-addon\" tooltip data-toggle=\"tooltip\" title=\"Puede encontrar el id de los problemas en la sección problemas\">\n              <span class=\"glyphicon glyphicon-question-sign\"></span>\n            </span>\n          </div>\n        </div>\n        <div class=\"col-sm-2 text-center\">\n          <input type=\"submit\" value=\"Añadir\" class=\"btn ufps-btn ufps-btn-default\">\n        </div>\n      </form>\n      <br>\n      <table>\n        <thead>\n          <tr>\n            <th class=\"text-center\" style=\"width:5%\">Id</th>\n            <th class=\"text-center\" style=\"width:80%\">Problema</th>\n            <th class=\"text-center\" style=\"width:15%\">Idioma</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr if.bind=\"problems.length === 0\">\n            <td></td>\n            <td>\n              <p>No hay problemas actualmente en esta maratón.</p>\n            </td>\n            <td></td>\n\n          </tr>\n          <tr repeat.for=\"problem of problems\">\n            <td class=\"text-center\">${problem.id}</td>\n            <td class=\"text-left ufps-td-problem\">\n              <p if.bind=\"problem.isInSpanish() && language !== 'Inglés'\" class=\"ufps-name-problem-list\">\n                <a href=\"/problemas/${problem.id}/detalle/es\">${problem.titleES}</a>\n              </p>\n              <p if.bind=\"!problem.isInSpanish() || (problem.isInEnglish() && language === 'Inglés')\" class=\"ufps-name-problem-list\">\n                <a href=\"/problemas/${problem.id}/detalle/en\">${problem.titleEN}</a>\n              </p>\n              <span class=\"ufps-edit-problem-list glyphicon glyphicon-remove\" data-toggle=\"tooltip\" title=\"Eliminar problema de la tarea\"\n                click.delegate=\"showRemoveProblem(problem.id)\" tooltip></span>\n            </td>\n            <td class=\"text-center ufps-language\">\n              <span class=\"${problem.isInSpanish() ? 'active' : 'inactive'}\">\n                <a href=\"/problemas/${problem.id}/detalle/es\">ES</a>\n              </span> |\n              <span class=\"${problem.isInEnglish() ? 'active' : 'inactive'}\">\n                <a href=\"/problemas/${problem.id}/detalle/en\">EN</a>\n              </span>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n\n  </div>\n\n\n  <!--MODAL PARA ELIMINAR PROBLEMA DE LA TAREA-->\n  <div class=\"modal fade\" id=\"remove-problem\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"remove-problem\">\n    <div class=\"modal-dialog\" role=\"document\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header text-center\">\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n            <span aria-hidden=\"true\">&times;</span>\n          </button>\n          <h4 class=\"modal-title\">¿Estás seguro de eliminar este problema de la maratón?</h4>\n          <br>\n          <p>Esto no eliminará el problema de la plataforma. Solo de la maratón actual.</p>\n\n          <button class=\"btn btn-default ufps-btn-default\" click.delegate=removeProblem()>Si</button>\n          <button class=\"btn btn-default ufps-btn-default\" data-dismiss=\"modal\" aria-label=\"Close\">No</button>\n        </div>\n      </div>\n    </div>\n  </div>\n</template>\n"; });
define('modules/contest/create-contest/create-contest',['exports', 'aurelia-framework', 'aurelia-router', 'config/config', 'models/models', 'services/services'], function (exports, _aureliaFramework, _aureliaRouter, _config, _models, _services) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.CreateContest = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2;

  var CreateContest = exports.CreateContest = (_dec = (0, _aureliaFramework.inject)(_services.Alert, _services.Contests, _aureliaRouter.Router), _dec(_class = (_class2 = function () {
    function CreateContest(alertService, contestService, router) {
      _classCallCheck(this, CreateContest);

      _initDefineProp(this, 'now', _descriptor, this);

      _initDefineProp(this, 'dateLoaded', _descriptor2, this);

      this.alertService = alertService;
      this.contestService = contestService;
      this.router = router;
      this.newContest = new _models.Contest();
    }

    CreateContest.prototype.dateLoadedChanged = function dateLoadedChanged(act, prev) {
      var tmp = this.now;
      tmp.setTime(tmp.getTime() + 600000);
      this.startDate = this.formatDate(tmp);
      this.startTime = this.formatTime(tmp);
      tmp.setTime(tmp.getTime() + 3600000);
      this.endDate = this.formatDate(tmp);
      this.endTime = this.formatTime(tmp);
    };

    CreateContest.prototype.formatDate = function formatDate(date) {
      var str = date.getUTCFullYear() + '-';
      if (date.getMonth() + 1 < 10) str += '0';
      str += date.getMonth() + 1 + '-';
      if (date.getDate() < 10) str += '0';
      str += date.getDate();
      return str;
    };

    CreateContest.prototype.formatTime = function formatTime(time) {
      var str = '';
      if (time.getHours() < 10) str += '0';
      str += time.getHours() + ':';
      if (time.getMinutes() < 10) str += '0';
      str += time.getMinutes();
      return str;
    };

    CreateContest.prototype.create = function create() {
      var _this = this;

      this.newContest.initDate = new Date(this.startDate + ' ' + this.startTime).toISOString();
      this.newContest.endDate = new Date(this.endDate + ' ' + this.endTime).toISOString();
      this.contestService.createContest(this.newContest).then(function (data) {
        _this.router.navigateToRoute('contest');
        _this.alertService.showMessage(_config.MESSAGES.contestCreated);
      }).catch(function (error) {
        if (error.status === 400) {
          _this.alertService.showMessage(_config.MESSAGES.contestError);
        } else if (error.status === 401) {
          _this.alertService.showMessage(_config.MESSAGES.permissionsError);
        } else {
          _this.alertService.showMessage(_config.MESSAGES.unknownError);
        }
      });
    };

    return CreateContest;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'now', [_aureliaFramework.observable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'dateLoaded', [_aureliaFramework.observable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class);
});
define('text!modules/contest/create-contest/create-contest.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"../../../resources/elements/clock\"></require>\n  <clock date.bind = \"now\" date-loaded.bind=\"dateLoaded\" show-timer.bind=\"false\"></clock>\n  <div class=\"container\">\n    <ol class=\"breadcrumb\">\n      <li>\n          <a route-href=\"route: contest;\">Maratones</a>\n      </li>\n      <li class=\"active\">Nueva maratón</li>\n    </ol>\n    <h2 class=\"text-right\">Nueva Maratón</h2>\n    <hr>\n    <form submit.delegate=\"create()\">\n      <div class=\"form-horizontal form-horizontal-assignment\">\n        <div class=\"form-group\">\n          <label class=\"control-label col-sm-2\">Nombre:</label>\n          <div class=\"col-sm-10 input-group ufps-input-creator\">\n            <input type=\"text\" class=\"form-control\" placeholder=\"Nombre de la maratón\" value.bind=\"newContest.title\" required>\n            <span class=\"input-group-addon\" tooltip data-toggle=\"tooltip\" title=\"Título de la maratón. Por ejemplo 'II Maratón de Programación UFPS'\">\n              <span class=\"glyphicon glyphicon-question-sign\"></span>\n            </span>\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <label class=\"control-label col-sm-2\">Descripción:</label>\n          <div class=\"col-sm-10 input-group ufps-input-creator\">\n            <textarea class=\"form-control\" placeholder=\"Descripción de la maratón\" value.bind=\"newContest.description\"></textarea>\n            <span class=\"input-group-addon\" tooltip data-toggle=\"tooltip\" title=\"Descripción que se mostrará a los estudiantes al ingresar a la maratón\">\n              <span class=\"glyphicon glyphicon-question-sign\"></span>\n            </span>\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <label class=\"control-label col-sm-2\">Reglas:</label>\n          <div class=\"col-sm-10 input-group ufps-input-creator\">\n            <textarea class=\"form-control\" placeholder=\"En este espacio puede indicar reglas especificas sobre el horario de competencia, premios, información adicional, etc.\"\n              value.bind=\"newContest.rules\"></textarea>\n            <span class=\"input-group-addon\" tooltip data-toggle=\"tooltip\" title=\"Reglas de la maratón\">\n              <span class=\"glyphicon glyphicon-question-sign\"></span>\n            </span>\n          </div>\n        </div>\n      </div>\n      <div class=\"form-horizontal col-md-6\">\n        <div class=\"form-group\">\n          <label class=\"control-label col-sm-2\">Desde el:</label>\n          <div class=\"col-sm-10 input-group ufps-input-creator\">\n            <input type=\"date\" class=\"form-control\" value.bind=\"startDate\" required>\n            <span class=\"input-group-addon\" tooltip data-toggle=\"tooltip\" title=\"Fecha de inicio de la maratón\">\n              <span class=\"glyphicon glyphicon-question-sign\"></span>\n            </span>\n          </div>\n        </div>\n      </div>\n      <div class=\"form-horizontal col-md-6\">\n        <div class=\"form-group\">\n          <label class=\"control-label col-sm-2\">a las:</label>\n          <div class=\"col-sm-10 input-group ufps-input-creator\">\n            <input type=\"time\" class=\"form-control\" value.bind=\"startTime\" required>\n            <span class=\"input-group-addon\" tooltip data-toggle=\"tooltip\" title=\"Hora de inicio de la maratón\">\n              <span class=\"glyphicon glyphicon-question-sign\"></span>\n            </span>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"form-horizontal col-md-6\">\n        <div class=\"form-group\">\n          <label class=\"control-label col-sm-2\">Hasta el:</label>\n          <div class=\"col-sm-10 input-group ufps-input-creator\">\n            <input type=\"date\" class=\"form-control\" value.bind=\"endDate\" min=\"${startDate}\" required>\n            <span class=\"input-group-addon\" tooltip data-toggle=\"tooltip\" title=\"Fecha de terminación de la maratón\">\n              <span class=\"glyphicon glyphicon-question-sign\"></span>\n            </span>\n          </div>\n        </div>\n      </div>\n      <div class=\"form-horizontal col-md-6\">\n        <div class=\"form-group\">\n          <label class=\"control-label col-sm-2\">a las:</label>\n          <div class=\"col-sm-10 input-group ufps-input-creator\">\n            <input type=\"time\" class=\"form-control\" value.bind=\"endTime\" required>\n            <span class=\"input-group-addon\" tooltip data-toggle=\"tooltip\" title=\"Hora de terminación de la maratón\">\n              <span class=\"glyphicon glyphicon-question-sign\"></span>\n            </span>\n          </div>\n        </div>\n      </div>\n      <div class=\"text-center\">\n        <p>Esta maratón será: </p>\n        <label class=\"radio-inline\">\n          <input type=\"radio\" model.bind=\"true\" checked.bind=\"newContest.privacy\"> Pública\n        </label>\n        <label class=\"radio-inline\">\n          <input type=\"radio\" model.bind=\"false\" checked.bind=\"newContest.privacy\"> Privada\n        </label>\n      </div>\n      <br>\n      <div class=\"form-horizontal form-horizontal-assignment\" if.bind=\"!newContest.privacy\">\n        <label class=\"control-label col-sm-2\">Clave:</label>\n        <div class=\"col-sm-10 input-group ufps-input-creator\">\n          <input type=\"text\" class=\"form-control\" placeholder=\"Clave para entrar a la maratón\" value.bind=\"newContest.key\" required>\n          <span class=\"input-group-addon\" tooltip data-toggle=\"tooltip\" title=\"asigne una clave e informela a los usuarios que participarán.\">\n            <span class=\"glyphicon glyphicon-question-sign\"></span>\n          </span>\n        </div>\n        <br>\n      </div>\n      <div class=\"text-center\">\n        <input type=\"submit\" value=\"Crear Maratón\" class=\"btn btn-default ufps-btn-default\">\n      </div>\n    </form>\n  </div>\n\n</template>\n"; });
define('modules/contest/contest',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Syllabus = exports.Syllabus = function () {
    function Syllabus() {
      _classCallCheck(this, Syllabus);
    }

    Syllabus.prototype.configureRouter = function configureRouter(config, router) {
      config.map([{
        route: '',
        name: 'contest',
        moduleId: 'modules/contest/home-contest/home-contest',
        title: 'Maratones',
        settings: {
          roles: ['coach', 'student', 'admin']
        }
      }, {
        route: 'nueva',
        name: 'create',
        moduleId: 'modules/contest/create-contest/create-contest',
        title: 'Nueva maratón',
        settings: {
          roles: ['coach', 'student', 'admin']
        }
      }, {
        route: 'editar/:id',
        name: 'edit',
        moduleId: 'modules/contest/edit-contest/edit-contest',
        title: 'Editar maratón',
        settings: {
          roles: ['coach', 'student', 'admin']
        }
      }, {
        route: ':id/',
        name: 'detail',
        moduleId: 'modules/contest/contest-detail/contest-detail',
        title: 'Maratón',
        settings: {
          roles: ['coach', 'student', 'admin']
        }
      }, {
        route: ':id/resultados',
        name: 'board',
        moduleId: 'modules/contest/contest-board/contest-board',
        title: 'Tablero de resultados',
        settings: {
          roles: ['coach', 'student', 'admin']
        }
      }, {
        route: ':id/problemas',
        name: 'problems',
        moduleId: 'modules/contest/contest-problems/contest-problems',
        title: 'Problemas',
        settings: {
          roles: ['coach', 'student', 'admin']
        }
      }, {
        route: [':id/problema/:problemId/:contestProblemId', ':id/problema/:problemId/:contestProblemId/:lang'],
        name: 'problem',
        moduleId: 'modules/contest/contest-problem/contest-problem',
        title: 'Problema',
        settings: {
          roles: ['coach', 'student', 'admin']
        }
      }]);
      this.router = router;
    };

    return Syllabus;
  }();
});
define('text!modules/contest/contest.html', ['module'], function(module) { module.exports = "<template>\n  <div slot=\"content\" class=\"body-slot\">\n    <router-view></router-view>\n  </div>\n</template>\n"; });
define('modules/contest/contest-problems/contest-problems',['exports', 'aurelia-framework', 'aurelia-router', 'config/config', 'models/models', 'services/services'], function (exports, _aureliaFramework, _aureliaRouter, _config, _models, _services) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ContestProblems = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3;

  var ContestProblems = exports.ContestProblems = (_dec = (0, _aureliaFramework.inject)(_services.Alert, _services.Auth, _services.Contests, _aureliaRouter.Router), _dec(_class = (_class2 = function () {
    function ContestProblems(alertService, authService, contestService, router) {
      _classCallCheck(this, ContestProblems);

      _initDefineProp(this, 'now', _descriptor, this);

      _initDefineProp(this, 'dateLoaded', _descriptor2, this);

      _initDefineProp(this, 'problemsLoaded', _descriptor3, this);

      this.alertService = alertService;
      this.authService = authService;
      this.contestService = contestService;
      this.router = router;
      this.contest = new _models.Contest();
      this.problems;
      this.creatorId = 0;
      this.status = 'unverified';
      this.key = '';
      this.flagProblems = false;
      this.contTime = {};
    }

    ContestProblems.prototype.activate = function activate(params, routeConfig) {
      this.routeConfig = routeConfig;
      this.id = params.id;
      this.flagProblems = false;
      this.getContest();
    };

    ContestProblems.prototype.problemsLoadedChanged = function problemsLoadedChanged(act, prev) {
      this.validateShow();
    };

    ContestProblems.prototype.dateLoadedChanged = function dateLoadedChanged(act, prev) {
      this.validateShow();
    };

    ContestProblems.prototype.validateShow = function validateShow() {
      if (this.dateLoaded && this.problemsLoaded) {
        if (this.now < this.startDate) {
          this.router.navigateToRoute('detail', { id: this.id });
          this.alertService.showMessage(_config.MESSAGES.contestNotStarted);
        } else {
          this.flagProblems = true;
        }
      }
    };

    ContestProblems.prototype.getContest = function getContest() {
      var _this = this;

      this.contestService.getProblemsContest(this.id).then(function (data) {
        _this.contest = new _models.Contest(data.contest.title, data.contest.description, data.contest.init_date, data.contest.end_date, data.contest.rules, data.contest.public, null, _this.id);
        _this.problems = [];
        _this.creatorId = data.contest.user_id;
        _this.startDate = new Date(data.contest.init_date);
        _this.endDate = new Date(data.contest.end_date);
        _this.problemsLoaded = true;
        if (!_this.contest.privacy && _this.authService.getUserId() !== _this.creatorId) _this.getStatus();
        for (var i = 0; i < data.contest.problems.length; i++) {
          _this.problems.push(new _models.Problem(data.contest.problems[i].id, data.contest.problems[i].title_en, data.contest.problems[i].title_es));
          _this.problems[i].auxiliarId = data.contest.problems[i].contests_problems.id;
        }
      }).catch(function (error) {
        console.log(error);
        if (error.status === 400) {
          _this.alertService.showMessage(_config.MESSAGES.contestError);
        } else if (error.status === 401) {
          _this.alertService.showMessage(_config.MESSAGES.permissionsError);
        } else {
          _this.alertService.showMessage(_config.MESSAGES.unknownError);
        }
      });
    };

    ContestProblems.prototype.getStatus = function getStatus() {
      var _this2 = this;

      this.contestService.getStatus(this.id, this.authService.getUserId()).then(function (data) {
        _this2.status = data.status;
        if (_this2.status !== 'registered') {
          _this2.router.navigateToRoute('detail', { id: _this2.id });
          _this2.alertService.showMessage(_config.MESSAGES.contestProblemsNotRegistered);
        }
      }).catch(function (error) {
        if (error.status === 400) {
          _this2.alertService.showMessage(_config.MESSAGES.contestError);
        } else if (error.status === 401) {
          _this2.alertService.showMessage(_config.MESSAGES.permissionsError);
        } else {
          _this2.alertService.showMessage(_config.MESSAGES.unknownError);
        }
      });
    };

    ContestProblems.prototype.letterValue = function letterValue(index) {
      return String.fromCharCode(index + 65);
    };

    return ContestProblems;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'now', [_aureliaFramework.observable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'dateLoaded', [_aureliaFramework.observable], {
    enumerable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'problemsLoaded', [_aureliaFramework.observable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class);
});
define('text!modules/contest/contest-problems/contest-problems.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"../../../resources/elements/clock\"></require>\n  <div class=\"container container-contest\">\n    <ol class=\"breadcrumb\">\n      <li>\n          <a route-href=\"route: contest;\">Maratones</a>\n      </li>\n      <li>\n          <a route-href=\"route: detail; params.bind: {id:id}\">${contest.title}</a>\n      </li>\n      <li class=\"active\">Problemas</li>\n    </ol>\n    <h2 class=\"text-right\">${contest.title}</h2>\n    <clock date.bind = \"now\" date-loaded.bind=\"dateLoaded\" show-timer.bind=\"true\" start-date.bind=\"startDate\" end-date.bind=\"endDate\"></clock>\n    <hr>\n    <ul class=\"nav nav-pills nav-justified nav-maraton\">\n      <li role=\"presentation\">\n        <a route-href=\"route: detail; params.bind: {id:id}\">Inicio</a>\n      </li>\n      <li class=\"active\" role=\"presentation\">\n        <a>Problemas</a>\n      </li>\n      <li role=\"presentation\" if.bind=\"(contest.privacy || status === 'registered' || authService.getUserId() === creatorId)\">\n          <a route-href=\"route: board; params.bind: {id:id}\">Resultados</a>\n        </li>\n        <li role=\"presentation\" class=\"disabled\" if.bind=\"(!contest.privacy && status !== 'registered' && authService.getUserId() !== creatorId)\">\n          <a>Resultados</a>\n        </li>\n    </ul>\n    <br>\n    <div class=\"row\">\n      <table>\n        <thead>\n          <tr>\n            <th class=\"text-center\" style=\"width:5%\"></th>\n            <th class=\"text-center\" style=\"width:80%\">Problema</th>\n            <th class=\"text-center\" style=\"width:15%\">Idioma</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr repeat.for=\"problem of problems\" if.bind=\"flagProblems && (contest.privacy || authService.getUserId() === creatorId || status === 'registered')\">\n            <td class=\"text-center\">${letterValue($index)}</td>\n            <td class=\"text-left ufps-td-problem\">\n              <p if.bind=\"problem.isInSpanish() && language !== 'Inglés'\" class=\"ufps-name-problem-list\">\n                <a route-href=\"route: problem; params.bind: {id:contest.id, problemId: problem.id, contestProblemId: problem.auxiliarId, lang: 'es'}\">${problem.titleES}</a>\n              </p>\n              <p if.bind=\"!problem.isInSpanish() || (problem.isInEnglish() && language === 'Inglés')\" class=\"ufps-name-problem-list\">\n                <a route-href=\"route: problem; params.bind: {id:contest.id, problemId: problem.id, contestProblemId: problem.auxiliarId, lang: 'en'}\">${problem.titleEN}</a>\n              </p>\n            </td>\n            <td class=\"text-center ufps-language\">\n              <span class=\"${problem.isInSpanish() ? 'active' : 'inactive'}\">\n                <a route-href=\"route: problem; params.bind: {id:contest.id, problemId: problem.id, contestProblemId: problem.auxiliarId, lang: 'es'}\">ES</a>\n              </span> |\n              <span class=\"${problem.isInEnglish() ? 'active' : 'inactive'}\">\n                <a route-href=\"route: problem; params.bind: {id:contest.id, problemId: problem.id, contestProblemId: problem.auxiliarId, lang: 'en'}\">EN</a>\n              </span>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n\n  <!--MODAL PARA REGISTRARSE-->\n  <div class=\"modal fade\" id=\"register-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"register-modal\">\n    <div class=\"modal-dialog\" role=\"document\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header text-center\">\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n            <span aria-hidden=\"true\">&times;</span>\n          </button>\n          <h4 class=\"modal-title\">Regístrate</h4>\n          <br>\n          <p>¿Deseas participar en esta competencia?</p>\n          <div if.bind=\"!contest.privacy\">\n            <p>Esta competencia es privada. Para ingresar, debes tener una clave, que debe ser indicada por el administrador.</p>\n            <div class=\"form-group\">\n              <input type=\"text\" class=\"form-control\" value.bind=\"key\" placeholder=\"Ingresa la clave de la competencia\">\n            </div>\n          </div>\n          <button class=\"btn btn-default ufps-btn-default\" click.delegate=register()>Registrarme</button>\n          <button class=\"btn btn-default ufps-btn-default\" data-dismiss=\"modal\" aria-label=\"Close\">Cancelar</button>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"modal fade\" id=\"unregister-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"unregister-modal\">\n    <div class=\"modal-dialog\" role=\"document\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header text-center\">\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n            <span aria-hidden=\"true\">&times;</span>\n          </button>\n          <h4 class=\"modal-title\">Anular registro</h4>\n          <br>\n          <p>¿Estas seguro de salir de esta maratón?</p>\n          <button class=\"btn btn-default ufps-btn-default\" click.delegate=unregister()>Anular registro</button>\n          <button class=\"btn btn-default ufps-btn-default\" data-dismiss=\"modal\" aria-label=\"Close\">Cancelar</button>\n        </div>\n      </div>\n    </div>\n  </div>\n\n</template>\n"; });
define('modules/contest/contest-problem/contest-problem',['exports', 'aurelia-framework', 'aurelia-router', 'config/config', 'models/models', 'services/services'], function (exports, _aureliaFramework, _aureliaRouter, _config, _models, _services) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ContestProblem = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3;

  var ContestProblem = exports.ContestProblem = (_dec = (0, _aureliaFramework.inject)(_services.Alert, _services.Auth, _services.Contests, _services.Problems, _aureliaRouter.Router), _dec(_class = (_class2 = function () {
    function ContestProblem(alertService, authService, contestService, problemService, routerService) {
      _classCallCheck(this, ContestProblem);

      _initDefineProp(this, 'now', _descriptor, this);

      _initDefineProp(this, 'dateLoaded', _descriptor2, this);

      _initDefineProp(this, 'contestLoaded', _descriptor3, this);

      this.alertService = alertService;
      this.authService = authService;
      this.problemService = problemService;
      this.contestService = contestService;
      this.routerService = routerService;
      this.languages = _config.SETTINGS.languages;
      this.sourceValid = false;
      this.code;
      this.creatorId = 0;
      this.status = 'registered';
      this.validDate = 0;
      this.contTime = {};
    }

    ContestProblem.prototype.activate = function activate(params, routeConfig) {
      this.routeConfig = routeConfig;
      this.contestId = params.id;
      this.contestProblemId = params.contestProblemId;
      this.id = params.problemId;
      this.lang = params.lang || 'en';
      this.validDate = -1;
      this.getContest();
    };

    ContestProblem.prototype.contestLoadedChanged = function contestLoadedChanged(act, prev) {
      this.validateDate();
    };

    ContestProblem.prototype.dateLoadedChanged = function dateLoadedChanged(act, prev) {
      this.validateDate();
    };

    ContestProblem.prototype.validateDate = function validateDate() {
      if (this.contestLoaded && this.dateLoaded) {
        if (this.now < this.startDate) {
          this.routerService.navigateToRoute('detail', { id: this.contestId });
          this.alertService.showMessage(_config.MESSAGES.contestNotStarted);
        } else {
          this.getStatus();
          this.validateSpecificDate();
        }
      }
    };

    ContestProblem.prototype.validateSpecificDate = function validateSpecificDate() {
      var _this = this;

      setInterval(function () {
        if (_this.now < _this.startDate) {
          _this.validDate = 1;
        } else if (_this.now > _this.endDate) {
          _this.validDate = 2;
        } else {
          _this.validDate = 0;
        }
      }, 1000);
    };

    ContestProblem.prototype.showES = function showES() {
      if (this.problem.isInSpanish()) {
        this.lang = 'es';
      }
    };

    ContestProblem.prototype.showEN = function showEN() {
      if (this.problem.isInEnglish()) {
        this.lang = 'en';
      }
    };

    ContestProblem.prototype.validateCode = function validateCode() {
      var _this2 = this;

      if (this.code.length === 1) {
        if (this.code[0].type.startsWith('text/') || this.code[0].name.endsWith('.java') || this.code[0].name.endsWith('.cpp') || this.code[0].name.endsWith('.c') || this.code[0].name.endsWith('.cc') || this.code[0].name.endsWith('.cp') || this.code[0].name.endsWith('.cxx') || this.code[0].name.endsWith('.py')) {
          this.sourceValid = true;
          if (this.code[0].name.endsWith('.java')) {
            this.language = 'Java';
            var reader = new FileReader();
            reader.onload = function () {
              var tmp = reader.result.replace(/ /g, '');
              tmp = tmp.replace(/\n|\r\n|\r/g, '');
              if (tmp.search('publicclassMain') < 0) {
                _this2.code = null;
                _this2.sourceValid = false;
                _this2.alertService.showMessage(_config.MESSAGES.invalidJavaClassname);
              }
            };
            reader.readAsText(this.code[0]);
          } else if (this.code[0].name.endsWith('.py')) {
            this.language = 'Python';
          } else if (this.code[0].name.endsWith('.cpp') || this.code[0].name.endsWith('.c') || this.code[0].name.endsWith('.cc') || this.code[0].name.endsWith('.cp') || this.code[0].name.endsWith('.cxx')) {
            this.language = 'C++';
          }
        } else {
          this.code = null;
          this.sourceValid = false;
          this.alertService.showMessage(_config.MESSAGES.invalidCode);
        }
      }
    };

    ContestProblem.prototype.submit = function submit() {
      var _this3 = this;

      var endDate = new Date(this.contest.endDate);
      if (!this.sourceValid) {
        this.alertService.showMessage(_config.MESSAGES.invalidCode);
      } else if (this.language === null) {
        this.alertService.showMessage(_config.MESSAGES.invalidLanguage);
      } else if (this.now > endDate) {
        this.alertService.showMessage(_config.MESSAGES.contestFinished);
      } else {
        this.problemService.submitSolution(this.id, this.language, undefined, this.contestProblemId, this.code[0]).then(function () {
          _this3.alertService.showMessage(_config.MESSAGES.submittedSolution);
          _this3.language = null;
          _this3.code = null;
          _this3.sourceValid = false;
        }).catch(function (error) {
          if (error.status === 401 || error.status === 403) {
            _this3.alertService.showMessage(_config.MESSAGES.permissionsError);
          } else if (error.status === 500) {
            _this3.alertService.showMessage(_config.MESSAGES.serverError);
          } else {
            _this3.alertService.showMessage(_config.MESSAGES.unknownError);
          }
        });
      }
    };

    ContestProblem.prototype.getStatus = function getStatus() {
      var _this4 = this;

      this.contestService.getStatus(this.contestId, this.authService.getUserId()).then(function (data) {
        _this4.status = data.status;
        if (_this4.status !== 'registered' && _this4.authService.getUserId() !== _this4.creatorId && !_this4.contest.privacy) {
          _this4.routerService.navigateToRoute('detail', { id: _this4.contestId });
          _this4.alertService.showMessage(_config.MESSAGES.contestProblemsNotRegistered);
        } else {
          _this4.getProblem();
        }
      }).catch(function (error) {
        if (error.status === 400) {
          _this4.alertService.showMessage(_config.MESSAGES.contestError);
        } else if (error.status === 401) {
          _this4.alertService.showMessage(_config.MESSAGES.permissionsError);
        } else {
          _this4.alertService.showMessage(_config.MESSAGES.unknownError);
        }
      });
    };

    ContestProblem.prototype.getContest = function getContest() {
      var _this5 = this;

      this.contestService.getContest(this.contestId).then(function (data) {
        _this5.contest = new _models.Contest(data.contest.title, data.contest.description, data.contest.init_date, data.contest.end_date, data.contest.rules, data.contest.public, null, _this5.contestId);
        _this5.startDate = new Date(data.contest.init_date);
        _this5.endDate = new Date(data.contest.end_date);
        _this5.contestLoaded = true;
        _this5.creatorId = data.contest.user.id;
      }).catch(function (error) {
        if (error.status === 400) {
          _this5.alertService.showMessage(_config.MESSAGES.contestError);
        } else if (error.status === 401) {
          _this5.alertService.showMessage(_config.MESSAGES.permissionsError);
        } else {
          _this5.alertService.showMessage(_config.MESSAGES.unknownError);
        }
      });
    };

    ContestProblem.prototype.getProblem = function getProblem() {
      var _this6 = this;

      this.problemService.getProblem(this.id).then(function (problem) {
        problem = problem.problem;
        _this6.problem = new _models.Problem(parseInt(_this6.id), problem.title_en, problem.title_es, parseInt(problem.level), parseInt(problem.category), undefined, problem.description_en, problem.description_es, problem.example_input !== 'undefined' ? problem.example_input.replace(/\r\n/g, '\n') : '', problem.example_output !== 'undefined' ? problem.example_output.replace(/\r\n/g, '\n') : '', parseFloat(problem.time_limit), problem.user_id, problem.user.username);
        if (_this6.lang === 'en' && !_this6.problem.isInEnglish()) {
          _this6.lang = 'es';
        } else if (_this6.lang === 'es' && !_this6.problem.isInSpanish()) {
          _this6.lang = 'en';
        }
      }).catch(function (error) {
        if (error.status === 401 || error.status === 403) {
          _this6.alertService.showMessage(_config.MESSAGES.permissionsError);
        } else if (error.status === 500) {
          _this6.alertService.showMessage(_config.MESSAGES.serverError);
        } else {
          _this6.alertService.showMessage(_config.MESSAGES.unknownError);
        }
        _this6.routerService.navigate('');
      });
    };

    return ContestProblem;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'now', [_aureliaFramework.observable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'dateLoaded', [_aureliaFramework.observable], {
    enumerable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'contestLoaded', [_aureliaFramework.observable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class);
});
define('text!modules/contest/contest-problem/contest-problem.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"../../../resources/attributes/markdown\"></require>\n  <require from=\"../../../resources/attributes/tooltip\"> </require>\n  <require from=\"../../../resources/elements/clock\"></require>\n  <div class=\"container-fluid\">\n    <div class=\"ufps-separator-mini\"></div>\n    <div class=\"container  container-contest\">\n      <ol class=\"breadcrumb bread-mini\">\n        <li>\n          <a route-href=\"route: contest;\">Maratones</a>\n        </li>\n        <li>\n          <a route-href=\"route: problems; params.bind: {id:contestId}\">${contest.title}</a>\n        </li>\n        <li class=\"active\" if.bind=\"lang === 'es'\">${problem.titleES}</li>\n        <li class=\"active\" if.bind=\"lang === 'en'\">${problem.titleEN}</li>\n      </ol>\n\n      <h2 class=\"text-right\">${contest.title}</h2>\n      <clock date.bind = \"now\" date-loaded.bind=\"dateLoaded\" show-timer.bind=\"true\" start-date.bind=\"startDate\" end-date.bind=\"endDate\"></clock>\n      <hr>\n      <ul class=\"nav nav-pills nav-justified nav-maraton\">\n        <li role=\"presentation\">\n          <a route-href=\"route: detail; params.bind: {id:contestId}\">Inicio</a>\n        </li>\n        <li class=\"active\" role=\"presentation\">\n          <a route-href=\"route: problems; params.bind: {id:contestId}\">Problemas</a>\n        </li>\n        <li role=\"presentation\" if.bind=\"contest.privacy || status === 'registered'\">\n          <a  route-href=\"route: board; params.bind: {id:contestId}\">Resultados</a>\n        </li>\n        <li role=\"presentation\" class=\"disabled\" if.bind=\"!contest.privacy && status !== 'registered'\">\n          <a>Resultados</a>\n        </li>\n      </ul>\n    </div>\n    <div class=\"col-md-9\">\n      <div class=\"ufps-separator-mini\"></div>\n      <div class=\"panel panel-default\">\n        <div class=\"panel-body\" show.bind=\"lang === 'es'\">\n          <h1 class=\"text-center ufps-problem-title\">${problem.titleES}</h1>\n          <p class=\"ufps-language text-center\">\n            <span class=\"${problem.isInSpanish() ? 'active' : 'inactive'}\" click.delegate=\"showES()\">ES</span> |\n            <span class=\"${problem.isInEnglish() ? 'active' : 'inactive'}\" click.delegate=\"showEN()\">EN</span>\n          </p>\n          <p class=\"ufps-markdown-editor\" markdown.bind=\"problem.descriptionES\"></p>\n          <div class=\"col-xs-12\">\n            <div class=\"col-md-6\">\n              <h3 class=\"text-center\">Entrada de ejemplo</h3>\n              <div class=\"well example-in-out\">\n                <pre>${problem.exampleInput}</pre>\n              </div>\n            </div>\n            <div class=\"col-md-6\">\n              <h3 class=\"text-center\">Salida de ejemplo</h3>\n              <div class=\"well example-in-out\">\n                <pre>${problem.exampleOutput}</pre>\n              </div>\n            </div>\n          </div>\n        </div>\n        <div class=\"panel-body\" show.bind=\"lang === 'en'\">\n          <h1 class=\"text-center ufps-problem-title\">${problem.titleEN}</h1>\n          <p class=\"ufps-language text-center\">\n            <span class=\"${problem.isInSpanish() ? 'active' : 'inactive'}\" click.delegate=\"showES()\">ES</span> |\n            <span class=\"${problem.isInEnglish() ? 'active' : 'inactive'}\" click.delegate=\"showEN()\">EN</span>\n          </p>\n          <p class=\"ufps-markdown-editor\" markdown.bind=\"problem.descriptionEN\"></p>\n          <div class=\"col-xs-12\">\n            <div class=\"col-md-6\">\n              <h3 class=\"text-center\">Entrada de ejemplo</h3>\n              <div class=\"well example-in-out\">\n                <pre>${problem.exampleInput}</pre>\n              </div>\n            </div>\n            <div class=\"col-md-6\">\n              <h3 class=\"text-center\">Salida de ejemplo</h3>\n              <div class=\"well example-in-out\">\n                <pre>${problem.exampleOutput}</pre>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-md-3\">\n      <div class=\"ufps-separator-mini\"></div>\n      <div class=\"panel panel-default\">\n        <div class=\"panel-body\">\n          <p show.bind=\"lang === 'en'\">\n            <strong>Problema:</strong> ${problem.titleEN}</p>\n          <p show.bind=\"lang === 'es'\">\n            <strong>Problema:</strong> ${problem.titleES}</p>\n          <p>\n            <strong>Dificultad:</strong> ${problem.level}</p>\n          <p if.bind=\"validDate === 1\">\n            <strong>Este ejercicio aún no puede ser enviado. Espera a que la maratón inicie.</strong>\n          </p>\n          <p if.bind=\"validDate === 2\">\n            <strong>Este ejercicio ya no puede ser enviado. La maratón ha terminado.</strong>\n          </p>\n          <p if.bind=\"status !== 'registered' && validDate === 0\">\n            <strong>Debes estar registrado para enviar este problema.</strong></p>\n          <p if.bind=\"status === 'registered' && validDate === 0\" >Selecciona el archivo con tu código, y el lenguaje a utilizar.</p>\n          <form if.bind=\"status === 'registered' && validDate === 0\" class=\"ufps-submit-form\" submit.delegate=\"submit()\" enctype=\"multipart/form-data\">\n            <input type=\"file\" name=\"input-file\" id=\"input-file\" class=\"inputfile-btn\" change.delegate=\"validateCode()\" accept=\".py, .java, .cpp\"\n              files.bind=\"code\" disabled.bind=\"status !== 'registered' || validDate > 0\">\n            <label for=\"${status !== 'registered' || validDate > 0 ? '' : 'input-file'}\" tooltip data-toggle=\"tooltip\" title=\"Archivo con la solución al problema\"\n              class=\"${status !== 'registered' || validDate > 0 ? 'disabled-select' : ''}\">Seleccionar\n              <span class=\"glyphicon glyphicon-ok-sign\" show.bind=\"sourceValid\"></span>\n            </label>\n            <div class=\"input-group\">\n              <select class=\"form-control\" value.bind=\"language\" disabled.bind=\"status !== 'registered' || validDate > 0\">\n                <option required model.bind=\"null\">Lenguaje...</option>\n                <option repeat.for=\"lg of languages\" model.bind=\"lg\">${lg}</option>\n              </select>\n            </div>\n            <input type=\"submit\" value=\"Enviar\" class=\"btn ufps-btn-submit btn-disabled\" disabled.bind=\"status !== 'registered' || validDate > 0\">\n          </form>\n          <p if.bind=\"validDate === 2\">Si lo deseas, puedes enviar tu solución en modo práctica. No afectará el tablero, pero calificará tu solución.</p>\n          <a if.bind=\"validDate === 2\" href=\"/problemas/${id}/detalle\" class=\"btn btn-submit ufps-btn-submit  ufps-btn-edit-problem btn-disabled\">Enviar en modo práctica</a>\n        </div>\n      </div>\n    </div>\n  </div>\n</template>\n"; });
define('modules/contest/contest-detail/contest-detail',['exports', 'aurelia-framework', 'aurelia-router', 'config/config', 'models/models', 'services/services'], function (exports, _aureliaFramework, _aureliaRouter, _config, _models, _services) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ContestDetail = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3;

  var ContestDetail = exports.ContestDetail = (_dec = (0, _aureliaFramework.inject)(_services.Alert, _services.Auth, _services.Contests, _aureliaRouter.Router), _dec(_class = (_class2 = function () {
    function ContestDetail(alertService, authService, contestService, router) {
      _classCallCheck(this, ContestDetail);

      _initDefineProp(this, 'now', _descriptor, this);

      _initDefineProp(this, 'dateLoaded', _descriptor2, this);

      _initDefineProp(this, 'contestLoaded', _descriptor3, this);

      this.alertService = alertService;
      this.authService = authService;
      this.contestService = contestService;
      this.router = router;
      this.contest = new _models.Contest();
      this.status = 'unverified';
      this.creatorId = 0;
      this.key = '';
      this.dateValid = false;
      this.contTime = {};
      this.contestLoaded = false;
    }

    ContestDetail.prototype.activate = function activate(params, routeConfig) {
      this.routeConfig = routeConfig;
      this.id = params.id;
      this.getContest();
      this.getStatus();
    };

    ContestDetail.prototype.dateLoadedChanged = function dateLoadedChanged(act, prev) {
      this.validateDate();
    };

    ContestDetail.prototype.contestLoadedChanged = function contestLoadedChanged(act, prev) {
      this.validateDate();
    };

    ContestDetail.prototype.nowChanged = function nowChanged(act, prev) {
      this.validateDate();
    };

    ContestDetail.prototype.validateDate = function validateDate() {
      if (this.contestLoaded && this.dateLoaded && this.now > this.startDate) this.dateValid = true;
    };

    ContestDetail.prototype.getContest = function getContest() {
      var _this = this;

      this.contestService.getContest(this.id).then(function (data) {
        _this.contest = new _models.Contest(data.contest.title, data.contest.description, data.contest.init_date, data.contest.end_date, data.contest.rules, data.contest.public, null, _this.id);
        _this.startDate = new Date(data.contest.init_date);
        _this.endDate = new Date(data.contest.end_date);
        _this.creatorId = data.contest.user.id;
        _this.contestLoaded = true;
      }).catch(function (error) {
        if (error.status === 400) {
          _this.alertService.showMessage(_config.MESSAGES.contestError);
        } else if (error.status === 401) {
          _this.alertService.showMessage(_config.MESSAGES.permissionsError);
        } else {
          _this.alertService.showMessage(_config.MESSAGES.unknownError);
        }
      });
    };

    ContestDetail.prototype.getStatus = function getStatus() {
      var _this2 = this;

      this.contestService.getStatus(this.id, this.authService.getUserId()).then(function (data) {
        _this2.status = data.status;
      }).catch(function (error) {
        if (error.status === 400) {
          _this2.alertService.showMessage(_config.MESSAGES.contestError);
        } else if (error.status === 401) {
          _this2.alertService.showMessage(_config.MESSAGES.permissionsError);
        } else {
          _this2.alertService.showMessage(_config.MESSAGES.unknownError);
        }
      });
    };

    ContestDetail.prototype.register = function register() {
      var _this3 = this;

      this.contestService.enroll(this.id, this.key).then(function (data) {
        _this3.alertService.showMessage(_config.MESSAGES.contestRegistered);
        window.$('#register-modal').modal('hide');
        _this3.status = 'registered';
      }).catch(function (error) {
        if (error.status === 400) {
          _this3.alertService.showMessage(_config.MESSAGES.contestErrorRegister);
        } else if (error.status === 401) {
          _this3.alertService.showMessage(_config.MESSAGES.permissionsError);
        } else {
          _this3.alertService.showMessage(_config.MESSAGES.unknownError);
        }
        window.$('#register-modal').modal('hide');
      });
    };

    ContestDetail.prototype.unregister = function unregister() {
      var _this4 = this;

      this.contestService.unenroll(this.id).then(function (data) {
        _this4.alertService.showMessage(_config.MESSAGES.contestUnregistered);
        window.$('#unregister-modal').modal('hide');
        _this4.status = 'unregistered';
      }).catch(function (error) {
        if (error.status === 400) {
          _this4.alertService.showMessage(_config.MESSAGES.contestErrorRegister);
        } else if (error.status === 401) {
          _this4.alertService.showMessage(_config.MESSAGES.permissionsError);
        } else {
          _this4.alertService.showMessage(_config.MESSAGES.unknownError);
        }
        window.$('#unregister-modal').modal('hide');
      });
    };

    ContestDetail.prototype.showRegisterModal = function showRegisterModal() {
      window.$('#register-modal').modal('show');
    };

    ContestDetail.prototype.showUnregisterModal = function showUnregisterModal() {
      window.$('#unregister-modal').modal('show');
    };

    return ContestDetail;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'now', [_aureliaFramework.observable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'dateLoaded', [_aureliaFramework.observable], {
    enumerable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'contestLoaded', [_aureliaFramework.observable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class);
});
define('text!modules/contest/contest-detail/contest-detail.html', ['module'], function(module) { module.exports = "<template>\n    <require from=\"../../../resources/elements/clock\"></require>\n  <div class=\"container container-contest\">\n    <ol class=\"breadcrumb\">\n      <li>\n          <a route-href=\"route: contest;\">Maratones</a>\n      </li>\n      <li class=\"active\">${contest.title}</li>\n    </ol>\n    <h2 class=\"text-right\">${contest.title}</h2>\n    <clock date.bind = \"now\" date-loaded.bind=\"dateLoaded\" show-timer.bind=\"true\" start-date.bind=\"startDate\" end-date.bind=\"endDate\"></clock>\n    <hr>\n    <ul class=\"nav nav-pills nav-justified nav-maraton\">\n      <li class=\"active\" role=\"presentation\">\n        <a>Inicio</a>\n      </li>\n      <li role=\"presentation\" class=\"disabled\" if.bind=\"(status !== 'registered' && authService.getUserId() !== creatorId && !contest.privacy) || ! dateValid\">\n        <a>Problemas</a>\n      </li>\n      <li role=\"presentation\" if.bind=\"(status === 'registered' || authService.getUserId() === creatorId || contest.privacy) && dateValid\">\n          <a route-href=\"route: problems; params.bind: {id:id}\">Problemas</a>\n      </li>\n      <li role=\"presentation\" if.bind=\"(contest.privacy || status === 'registered' || authService.getUserId() === creatorId) && dateValid\">\n          <a route-href=\"route: board; params.bind: {id:id}\">Resultados</a>\n      </li>\n      <li role=\"presentation\" class=\"disabled\" if.bind=\"(!contest.privacy && status !== 'registered' && authService.getUserId() !== creatorId) || !dateValid\">\n        <a>Resultados</a>\n      </li>\n    </ul>\n    <br>\n    <div class=\"row\">\n      <div class=\"col-md-8 text-center\">\n        <div class=\"panel panel-default\">\n          <div class=\"panel-body panel-space\">\n            <h3>Descripción</h3>\n            <p>${contest.description}</p>\n            <h3>Reglas</h3>\n            <p>${contest.rules}\n            </p>\n          </div>\n        </div>\n      </div>\n      <div class=\"col-md-4 text-center\">\n        <br>\n        <p><strong>Inicio:</strong> ${contest.getSemanticStartDate()}</p>\n        <p><strong>Finalización:</strong> ${contest.getSemanticEndDate()}</p>\n        <p if.bind=\"authService.getUserId() === creatorId\"><strong>Eres el creador de esta maratón. Si solo deseas ver los resultados o los problemas, puedes hacerlo sin necesidad de registrarte.</strong></p>\n        <br>\n\n        <div if.bind=\"status === 'registered'\">\n          <p>¡Ya estás registrado!</p>\n          <a if.bind=\"!dateValid\" click.delegate=\"showUnregisterModal()\" class=\"btn btn-default ufps-btn-default\">Anular inscripción</a>\n        </div>\n        <div if.bind=\"status === 'unregistered'\">\n          <a click.delegate=\"showRegisterModal()\" class=\"btn btn-default ufps-btn-default\">Registrate</a>\n        </div>\n        </ul>\n      </div>\n    </div>\n  </div>\n\n  <!--MODAL PARA REGISTRARSE-->\n  <div class=\"modal fade\" id=\"register-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"register-modal\">\n    <div class=\"modal-dialog\" role=\"document\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header text-center\">\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n            <span aria-hidden=\"true\">&times;</span>\n          </button>\n          <h4 class=\"modal-title\">Regístrate</h4>\n          <br>\n          <p>¿Deseas participar en esta competencia?</p>\n          <div if.bind=\"!contest.privacy\">\n            <p>Esta competencia es privada. Para ingresar, debes tener una clave, que debe ser indicada por el administrador.</p>\n            <div class=\"form-group\">\n              <input type=\"text\" class=\"form-control\" value.bind=\"key\" placeholder=\"Ingresa la clave de la competencia\">\n            </div>\n          </div>\n          <button class=\"btn btn-default ufps-btn-default\" click.delegate=register()>Registrarme</button>\n          <button class=\"btn btn-default ufps-btn-default\" data-dismiss=\"modal\" aria-label=\"Close\">Cancelar</button>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"modal fade\" id=\"unregister-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"unregister-modal\">\n    <div class=\"modal-dialog\" role=\"document\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header text-center\">\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n            <span aria-hidden=\"true\">&times;</span>\n          </button>\n          <h4 class=\"modal-title\">Anular registro</h4>\n          <br>\n          <p>¿Estas seguro de salir de esta maratón?</p>\n          <button class=\"btn btn-default ufps-btn-default\" click.delegate=unregister()>Anular registro</button>\n          <button class=\"btn btn-default ufps-btn-default\" data-dismiss=\"modal\" aria-label=\"Close\">Cancelar</button>\n        </div>\n      </div>\n    </div>\n  </div>\n\n</template>\n"; });
define('modules/contest/contest-board/contest-board',['exports', 'aurelia-framework', 'aurelia-router', 'config/config', 'models/models', 'services/services', 'socket.io-client'], function (exports, _aureliaFramework, _aureliaRouter, _config, _models, _services, _socket) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ContestBoard = undefined;

  var _socket2 = _interopRequireDefault(_socket);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3;

  var ContestBoard = exports.ContestBoard = (_dec = (0, _aureliaFramework.inject)(_services.Alert, _services.Auth, _services.Contests, _aureliaRouter.Router), _dec(_class = (_class2 = function () {
    function ContestBoard(alertService, authService, contestService, router) {
      _classCallCheck(this, ContestBoard);

      _initDefineProp(this, 'now', _descriptor, this);

      _initDefineProp(this, 'dateLoaded', _descriptor2, this);

      _initDefineProp(this, 'problemsLoaded', _descriptor3, this);

      this.alertService = alertService;
      this.authService = authService;
      this.contestService = contestService;
      this.router = router;
      this.contest = new _models.Contest();
      this.flagProblems = false;
      this.mapProblems = [];
      this.startDate;
      this.reverseMapProblems = [];
      this.totalProblems = 0;
      this.status = 'unverified';
      this.score = [];
      this.creatorId = 0;
      this.key = '';
      this.contTime = {};
      this.now;
      this.dateLoaded;
      this.problemsLoaded = false;
    }

    ContestBoard.prototype.dateLoadedChanged = function dateLoadedChanged(act, prev) {
      if (act && this.problemsLoaded) this.verifyShow();
    };

    ContestBoard.prototype.problemsLoadedChanged = function problemsLoadedChanged(act, prev) {
      if (act && this.dateLoaded) this.verifyShow();
    };

    ContestBoard.prototype.verifyShow = function verifyShow() {
      if (this.now < this.startDate) {
        this.router.navigateToRoute('detail', { id: this.id });
        this.alertService.showMessage(_config.MESSAGES.contestNotStarted);
      } else {
        this.flagProblems = true;
        if (!this.contest.privacy && this.authService.getUserId() !== this.creatorId) this.getStatus();else this.getScore();
      }
    };

    ContestBoard.prototype.activate = function activate(params, routeConfig) {
      this.routeConfig = routeConfig;
      this.id = params.id;
      this.getProblems();
    };

    ContestBoard.prototype.deactivate = function deactivate() {
      try {
        this.socketContest.close();
      } catch (error) {}
    };

    ContestBoard.prototype.getStatus = function getStatus() {
      var _this = this;

      this.contestService.getStatus(this.id, this.authService.getUserId()).then(function (data) {
        _this.status = data.status;
        if (_this.status !== 'registered' && !_this.contest.privacy) {
          _this.router.navigateToRoute('detail', { id: _this.id });
          _this.alertService.showMessage(_config.MESSAGES.contestBoardNotRegistered);
        } else _this.getScore();
      }).catch(function (error) {
        if (error.status === 401) {
          _this.alertService.showMessage(_config.MESSAGES.permissionsError);
        } else {
          _this.alertService.showMessage(_config.MESSAGES.unknownError);
        }
      });
    };

    ContestBoard.prototype.sortScore = function sortScore() {
      this.score.sort(function (a, b) {
        if (a.total < b.total) return 1;else if (a.total > b.total) return -1;else {
          if (a.penalization > b.penalization) return 1;else if (a.penalization < b.penalization) return -1;
        }
        return 0;
      });
      this.defineGold();
    };

    ContestBoard.prototype.defineGold = function defineGold() {
      var minG = 99999999,
          minI = -1,
          minU = -1;
      for (var i = 0; i < this.totalProblems; i++) {
        var minT = 99999999,
            minJ = -1;
        for (var j = 0; j < this.totalRegistered; j++) {
          if (this.score[j].results[i].second != -1) {
            if (this.score[j].results[i].second <= minT) {
              minT = this.score[j].results[i].second;
              minJ = j;
              if (this.score[j].results[i].second <= minG) {
                minG = this.score[j].results[i].second;
                minI = j;
                minU = i;
              }
            }
          }
        }
        if (minJ != -1) this.score[minJ].results[i].third = 1;
      }
      if (minI != -1) this.score[minI].results[minU].third = 2;
    };

    ContestBoard.prototype.getScore = function getScore() {
      var _this2 = this;

      this.contestService.getScore(this.id).then(function (data) {
        _this2.totalRegistered = data.length;
        for (var i = 0; i < data.length; i++) {
          _this2.score.push(new Object());
          _this2.score[i].name = data[i].name;
          _this2.score[i].username = data[i].username;
          _this2.score[i].id = data[i].id;
          _this2.score[i].results = [];
          for (var j = 0; j < _this2.totalProblems; j++) {
            _this2.score[i].results.push(new Object());
          }
          for (var _j = 0; _j < _this2.totalProblems; _j++) {
            if (data[i].problems[_this2.reverseMapProblems[_j]] === undefined) {
              _this2.score[i].results[_j].first = -1;
              _this2.score[i].results[_j].second = -1;
              _this2.score[i].results[_j].third = 0;
            } else if (data[i].problems[_this2.reverseMapProblems[_j]].accepted) {
              _this2.score[i].results[_j].first = data[i].problems[_this2.reverseMapProblems[_j]].errors + 1;
              _this2.score[i].results[_j].second = data[i].problems[_this2.reverseMapProblems[_j]].min_accepted;
              _this2.score[i].results[_j].third = 0;
            } else {
              _this2.score[i].results[_j].first = data[i].problems[_this2.reverseMapProblems[_j]].errors;
              _this2.score[i].results[_j].second = -1;
              _this2.score[i].results[_j].third = 0;
            }
          }
          _this2.score[i].total = data[i].total_accepted;
          _this2.score[i].penalization = data[i].total_time;
        }
        _this2.sortScore();
        _this2.socketContest = _socket2.default.connect(_config.API.apiUrl + 'contest');
        _this2.socketContest.on('new submission', function (data) {
          var submissionTime = new Date(data.created_at);
          if (_this2.score[_this2.getUserPosition(data.user_id)].results[_this2.mapProblems[data.problem_id]].second == -1) {
            var tmp = _this2.score[_this2.getUserPosition(data.user_id)].results[_this2.mapProblems[data.problem_id]].first;
            _this2.score[_this2.getUserPosition(data.user_id)].results[_this2.mapProblems[data.problem_id]].first = 1 + Math.max(0, tmp);
            if (data.verdict === 'Accepted') {
              _this2.score[_this2.getUserPosition(data.user_id)].results[_this2.mapProblems[data.problem_id]].second = parseInt(Math.abs(submissionTime.getTime() - _this2.startDate.getTime()) / 60000);
              _this2.score[_this2.getUserPosition(data.user_id)].total++;
              _this2.score[_this2.getUserPosition(data.user_id)].penalization += _this2.score[_this2.getUserPosition(data.user_id)].results[_this2.mapProblems[data.problem_id]].second + (_this2.score[_this2.getUserPosition(data.user_id)].results[_this2.mapProblems[data.problem_id]].first - 1) * 20;
              _this2.sortScore();
            }
          }
        });
      }).catch(function (error) {
        if (error.status === 401) {
          _this2.alertService.showMessage(_config.MESSAGES.permissionsError);
        } else {}
      });
    };

    ContestBoard.prototype.getUserPosition = function getUserPosition(id) {
      for (var i = 0; i < this.score.length; i++) {
        if (this.score[i].id == id) return i;
      }
    };

    ContestBoard.prototype.getProblems = function getProblems() {
      var _this3 = this;

      this.contestService.getProblemsContest(this.id).then(function (data) {
        _this3.contest = new _models.Contest(data.contest.title, data.contest.description, data.contest.init_date, data.contest.end_date, data.contest.rules, data.contest.public, null, _this3.id);
        _this3.startDate = new Date(data.contest.init_date);
        _this3.endDate = new Date(data.contest.end_date);
        _this3.creatorId = data.contest.user_id;
        _this3.problemsLoaded = true;
        _this3.totalProblems = data.contest.problems.length;
        for (var i = 0; i < data.contest.problems.length; i++) {
          _this3.mapProblems[data.contest.problems[i].id] = i;
          _this3.reverseMapProblems[i] = data.contest.problems[i].contests_problems.id;
        }
      }).catch(function (error) {
        if (error.status === 401) {
          _this3.alertService.showMessage(_config.MESSAGES.permissionsError);
        } else {
          _this3.alertService.showMessage(_config.MESSAGES.unknownError);
        }
      });
    };

    ContestBoard.prototype.letterValue = function letterValue(index) {
      return String.fromCharCode(index + 65);
    };

    return ContestBoard;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'now', [_aureliaFramework.observable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'dateLoaded', [_aureliaFramework.observable], {
    enumerable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'problemsLoaded', [_aureliaFramework.observable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class);
});
define('text!modules/contest/contest-board/contest-board.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"../../../resources/elements/clock\"></require>\n  <div class=\"container container-contest\">\n    <ol class=\"breadcrumb\">\n      <li>\n        <a route-href=\"route: contest;\">Maratones</a>\n      </li>\n      <li>\n        <a route-href=\"route: detail; params.bind: {id:id}\">${contest.title}</a>\n      </li>\n      <li class=\"active\">Resultados</li>\n    </ol>\n    <h2 class=\"text-right\">${contest.title}</h2>\n    <clock date.bind = \"now\" date-loaded.bind=\"dateLoaded\" show-timer.bind=\"true\" start-date.bind=\"startDate\" end-date.bind=\"endDate\"></clock>\n    <hr>\n    <ul class=\"nav nav-pills nav-justified nav-maraton\">\n      <li role=\"presentation\">\n        <a route-href=\"route: detail; params.bind: {id:id}\">Inicio</a>\n      </li>\n      <li role=\"presentation\" class=\"disabled\" if.bind=\"(status !== 'registered' && !contest.privacy && authService.getUserId() !== creatorId)\">\n        <a>Problemas</a>\n      </li>\n      <li role=\"presentation\" if.bind=\"(status === 'registered' || authService.getUserId() === creatorId || contest.privacy)\">\n        <a route-href=\"route: problems; params.bind: {id:id}\">Problemas</a>\n      </li>\n      <li role=\"presentation\" class=\"active\">\n        <a>Resultados</a>\n      </li>\n    </ul>\n    <br>\n    <div class=\"row\">\n      <table class=\"ufps-score\" if.bind=\"flagProblems\">\n        <thead>\n          <tr>\n            <th class=\"text-center\" style=\"width:5%\">Posición</th>\n            <th class=\"text-center\" style=\"width:15%\">Usuario</th>\n            <th repeat.for=\"i of totalProblems\" class=\"text-center\">${letterValue(i)}</th>\n            <th class=\"text-center\">Total</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr repeat.for=\"user of score\">\n            <td class=\"text-center\">${$index + 1}</td>\n            <td>${user.name}\n              <span class=\"username-gray\">(${user.username})</span>\n              </span>\n              <td repeat.for=\"result of user.results\" class=\"text-center\">\n                <div class=\"ufps-score-correct\" if.bind=\"result.first !== -1 && result.second !== -1 && result.third === 0\"></div>\n                <div class=\"ufps-score-incorrect\" if.bind=\"result.first !== -1 && result.second === -1  && result.third === 0\"></div>\n                <div class=\"ufps-score-first\" if.bind=\"result.third === 1\"></div>\n                <div class=\"ufps-score-gold\" if.bind=\"result.third === 2\"></div>\n                <span if.bind=\"result.first !== -1\">${result.first}/</span><span if.bind=\"result.second !== -1\">${result.second}</span><span if.bind=\"result.first !== -1 && result.second === -1\">-</span>\n              </td>\n              <td class=\"text-center\">${user.total}\n                <span class=\"username-gray\">(${user.penalization})</span>\n                </span>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n</template>\n"; });
define('modules/admin/admin',['exports', 'aurelia-framework', 'config/config', 'models/models', 'services/services'], function (exports, _aureliaFramework, _config, _models, _services) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Admin = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

  var Admin = exports.Admin = (_dec = (0, _aureliaFramework.inject)(_services.Alert, _services.Auth, _services.Materials), _dec(_class = (_class2 = function () {
    function Admin(alertService, authService, materialService) {
      _classCallCheck(this, Admin);

      _initDefineProp(this, 'page', _descriptor, this);

      _initDefineProp(this, 'filterChange', _descriptor2, this);

      _initDefineProp(this, 'pageUsers', _descriptor3, this);

      _initDefineProp(this, 'filterChangeUser', _descriptor4, this);

      this.alertService = alertService;
      this.authService = authService;
      this.materialService = materialService;
      this.newUser = new _models.UserSignIn();
      this.newUser.type = 1;
      this.numberOfItems = [10, 15, 20];
      this.sortOptions = ['Id', 'Nombre'];
      this.filterChange = false;
      this.limit = 10;
      this.sort = 'Id';
      this.by = 'Ascendente';
      this.page = 1;
      this.totalPages = 1;

      this.numberOfUsersToShow = [10, 20, 30];
      this.filterChangeUser = false;
      this.limitUsers = 10;
      this.sortUsers = 'Id';
      this.byUsers = 'Ascendente';
      this.pageUsers = 1;
      this.totalPagesUsers = 1;
      this.getUsers();
      this.getMaterials();
    }

    Admin.prototype.filterChangeChanged = function filterChangeChanged(act, prev) {
      if (prev !== undefined) this.getMaterials();
    };

    Admin.prototype.filterChangeUserChanged = function filterChangeUserChanged(act, prev) {
      if (prev !== undefined) this.getUsers();
    };

    Admin.prototype.pageChanged = function pageChanged(act, prev) {
      if (prev !== undefined) this.getMaterials();
    };

    Admin.prototype.pageUsersChanged = function pageUsersChanged(act, prev) {
      if (prev !== undefined) this.getUsers();
    };

    Admin.prototype.getMaterials = function getMaterials() {
      var _this = this;

      this.materialService.getPendingMaterial(this.page, this.limit, this.sort === 'Nombre' ? 'name' : undefined, this.by === 'Ascendente' ? 'asc' : 'desc').then(function (data) {
        _this.materials = [];
        _this.totalPages = data.meta.totalPages;
        if (_this.totalPages !== 0) {
          for (var i = 0; i < data.data.length; i++) {
            _this.materials.push(new _models.Material(data.data[i].id, data.data[i].name, data.data[i].category_id, undefined, undefined, data.data[i].url, undefined, data.data[i].category.name));
          }
        }
      }).catch(function (error) {
        if (error.status === 404) {
          _this.alertService.showMessage(_config.MESSAGES.materialDoesNotExist);
        } else {
          _this.alertService.showMessage(_config.MESSAGES.serverError);
        }
      });
    };

    Admin.prototype.getUsers = function getUsers() {
      var _this2 = this;

      this.authService.getUsers(this.pageUsers, this.limitUsers, this.sortUsers === 'Nombre' ? 'name' : undefined, this.byUsers === 'Ascendente' ? 'asc' : 'desc').then(function (data) {
        _this2.users = [];
        _this2.totalPagesUsers = data.meta.totalPages;
        if (_this2.totalPagesUsers !== 0) {
          for (var i = 0; i < data.data.length; i++) {
            if (_this2.authService.getUserId() !== data.data[i].id) _this2.users.push(new _models.UserSignIn(data.data[i].email, undefined, undefined, data.data[i].name, data.data[i].username, data.data[i].code, data.data[i].type, data.data[i].id));
          }
        }
      }).catch(function (error) {
        if (error.status === 404) {
          _this2.alertService.showMessage(_config.MESSAGES.unknownError);
        } else {
          _this2.alertService.showMessage(_config.MESSAGES.serverError);
        }
      });
    };

    Admin.prototype.createUser = function createUser() {
      var _this3 = this;

      if (!this.newUser.isValid()) {
        this.alertService.showMessage(_config.MESSAGES.superUserWrongData);
      } else if (this.newUser.username.length < 6 || this.newUser.username.length > 30) {
        this.alertService.showMessage(_config.MESSAGES.usernameInvalid);
      } else if (this.newUser.password !== this.newUser.confirmPassword) {
        this.alertService.showMessage(_config.MESSAGES.signInDifferentPasswords);
      } else {
        this.authService.createSuperUser(this.newUser).then(function () {
          _this3.alertService.showMessage(_config.MESSAGES.superUserCreated);
        }).catch(function (error) {
          if (error.status === 400) {
            _this3.alertService.showMessage(_config.MESSAGES.superUserWrongData);
          } else {
            _this3.alertService.showMessage(_config.MESSAGES.serverError);
          }
        });
      }
    };

    Admin.prototype.approveMaterial = function approveMaterial(id) {
      var _this4 = this;

      this.materialService.approve(id).then(function () {
        _this4.alertService.showMessage(_config.MESSAGES.materialApproved);
        _this4.getMaterials();
      }).catch(function () {
        _this4.alertService.showMessage(_config.MESSAGES.serverError);
      });
    };

    Admin.prototype.showRemoveMaterial = function showRemoveMaterial(id) {
      this.materialToRemove = id;
      window.$('#remove-material').modal('show');
    };

    Admin.prototype.showRemoveUser = function showRemoveUser(id) {
      this.userToRemove = id;
      window.$('#remove-user').modal('show');
    };

    Admin.prototype.removeMaterial = function removeMaterial() {
      var _this5 = this;

      this.materialService.remove(this.materialToRemove).then(function () {
        _this5.alertService.showMessage(_config.MESSAGES.materialDeleted);
        _this5.getMaterials();
        window.$('#remove-material').modal('hide');
      }).catch(function () {
        _this5.alertService.showMessage(_config.MESSAGES.serverError);
        window.$('#remove-material').modal('hide');
      });
    };

    Admin.prototype.removeUser = function removeUser() {
      var _this6 = this;

      this.authService.removeUser(this.userToRemove).then(function () {
        _this6.alertService.showMessage(_config.MESSAGES.userDeleted);
        _this6.getUsers();
        window.$('#remove-user').modal('hide');
      }).catch(function () {
        _this6.alertService.showMessage(_config.MESSAGES.serverError);
        window.$('#remove-user').modal('hide');
      });
    };

    return Admin;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'page', [_aureliaFramework.observable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'filterChange', [_aureliaFramework.observable], {
    enumerable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'pageUsers', [_aureliaFramework.observable], {
    enumerable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'filterChangeUser', [_aureliaFramework.observable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class);
});
define('text!modules/admin/admin.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"../../resources/elements/filter\"></require>\n  <require from=\"../../resources/elements/paginator\"></require>\n  <div slot=\"content\" class=\"body-slot\">\n    <div class=\"container\" if.bind=\"authService.isAdmin()\">\n      <h1 class=\"text-right\">Usuarios</h1>\n      <hr>\n      <p class=\"text-center\">Desde esta sección puede añadir docentes (coachs) o administradores. Los estudiantes pueden crear sus propias cuentas\n        desde la página inicial.</p>\n      <form submit.delegate=\"createUser()\">\n        <div class=\"text-center\">\n          <label class=\"radio-inline\">\n            <input type=\"radio\" name=\"type-user\" checked.bind=\"newUser.type\" model.bind=\"2\" required> Administrador\n          </label>\n          <label class=\"radio-inline\">\n            <input type=\"radio\" name=\"type-user\" checked.bind=\"newUser.type\" model.bind=\"1\" required> Coach o docente\n          </label>\n        </div>\n        <br>\n        <div class=\"form-horizontal col-md-6\">\n          <div class=\"form-group\">\n            <div class=\"form-group\">\n              <label class=\"control-label col-sm-3\" for=\"new-user-name\">Nombre:</label>\n              <div class=\"col-sm-9 input-group ufps-input-creator\">\n                <input type=\"text\" class=\"form-control\" id=\"new-user-name\" value.bind=\"newUser.name\" required>\n                <span class=\"input-group-addon\" tooltip data-toggle=\"tooltip\" title=\"Nombre completo del usuario\">\n                  <span class=\"glyphicon glyphicon-question-sign\"></span>\n                </span>\n              </div>\n            </div>\n            <div class=\"form-group\">\n              <label class=\"control-label col-sm-3\" for=\"new-user-email\">Email:</label>\n              <div class=\"col-sm-9 input-group ufps-input-creator\">\n                <input type=\"email\" class=\"form-control\" id=\"new-user-email\" value.bind=\"newUser.email\" required>\n                <span class=\"input-group-addon\" tooltip data-toggle=\"tooltip\" title=\"Email del usuario\">\n                  <span class=\"glyphicon glyphicon-question-sign\"></span>\n                </span>\n              </div>\n            </div>\n            <div class=\"form-group\">\n              <label class=\"control-label col-sm-3\" for=\"new-user-password\">Contraseña:</label>\n              <div class=\"col-sm-9 input-group ufps-input-creator\">\n                <input type=\"password\" class=\"form-control\" id=\"new-user-password\" value.bind=\"newUser.password\" required>\n                <span class=\"input-group-addon\" tooltip data-toggle=\"tooltip\" title=\"Contraseña del usuario\">\n                  <span class=\"glyphicon glyphicon-question-sign\"></span>\n                </span>\n              </div>\n            </div>\n          </div>\n        </div>\n        <div class=\"form-horizontal col-md-6\">\n          <div class=\"form-group\">\n            <div class=\"form-group\">\n              <label class=\"control-label col-sm-3\" for=\"new-user-name\">Código:</label>\n              <div class=\"col-sm-9 input-group ufps-input-creator\">\n                <input type=\"number\" class=\"form-control\" id=\"new-user-code\" value.bind=\"newUser.code\">\n                <span class=\"input-group-addon\" tooltip data-toggle=\"tooltip\" title=\"Código del usuario en la Universidad\">\n                  <span class=\"glyphicon glyphicon-question-sign\"></span>\n                </span>\n              </div>\n            </div>\n            <div class=\"form-group\">\n              <label class=\"control-label col-sm-3\" for=\"new-user-username\">Username:</label>\n              <div class=\"col-sm-9 input-group ufps-input-creator\">\n                <input type=\"text\" class=\"form-control\" id=\"new-user-username\" value.bind=\"newUser.username\">\n                <span class=\"input-group-addon\" tooltip data-toggle=\"tooltip\" title=\"Nickname del usuario (sin espacios)\">\n                  <span class=\"glyphicon glyphicon-question-sign\"></span>\n                </span>\n              </div>\n            </div>\n            <div class=\"form-group\">\n              <label class=\"control-label col-sm-3\" for=\"new-user-password\">Contraseña:</label>\n              <div class=\"col-sm-9 input-group ufps-input-creator\">\n                <input type=\"password\" class=\"form-control\" id=\"new-user-password\" value.bind=\"newUser.confirmPassword\" required>\n                <span class=\"input-group-addon\" tooltip data-toggle=\"tooltip\" title=\"Repite la contraseña\">\n                  <span class=\"glyphicon glyphicon-question-sign\"></span>\n                </span>\n              </div>\n            </div>\n          </div>\n        </div>\n        <div class=\"text-center\">\n          <input type=\"submit\" class=\"btn ufps-btn-submit\" value=\"Crear usuario\">\n        </div>\n      </form>\n      <filter number-of-items.bind=\"numberOfUsersToShow\" sort-options.bind=\"sortOptions\" filter-change.bind=\"filterChangeUser\"\n        limit.bind=\"limitUsers\" sort.bind=\"sortUsers\" by.bind=\"byUsers\" text-to-show.bind=\"'usuarios'\" language-flag.bind=\"false\"></filter>\n        <table>\n        <thead>\n          <tr>\n            <th>Id</th>\n            <th>Nombre</th>\n            <th>Usuario</th>\n            <th>Código</th>\n            <th>Tipo</th>\n            <th>Email</th>\n            <th>Acciones</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr repeat.for=\"user of users\">\n            <td>${user.id}</td>\n            <td>${user.name}</td>\n            <td>${user.username}</td>\n            <td>${user.code}</td>\n            <td if.bind=\"user.type === 0\">Estudiante</td>\n            <td if.bind=\"user.type === 1\">Coach</td>\n            <td if.bind=\"user.type === 2\">Administrador</td>\n            <td>${user.email}</td>\n            <td class=\"text-right\">\n              <button class=\"ufps-btn btn ufps-btn-default\" click.delegate=\"showRemoveUser(user.id)\">Revocar</button>\n            </td>\n          </tr>\n          <tr if.bind=\"users.length === 0\">\n            <td></td>\n            <td>No hay usuarios en la plataforma.</td>\n            <td>\n            </td>\n            <td>\n            </td>\n            <td>\n            </td>\n            <td>\n            </td>\n            <td>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n      <paginator page.bind=\"pageUsers\" total-pages.bind=\"totalPagesUsers\"></paginator>\n\n      <h1 class=\"text-right\">Materiales</h1>\n      <hr>\n      <p class=\"text-center\">Los siguientes materiales han sido añadidos por estudiantes. Para que aparezcan en la plataforma, deben ser aprobados\n        por un administrador.</p>\n      <filter number-of-items.bind=\"numberOfItems\" sort-options.bind=\"sortOptions\" filter-change.bind=\"filterChange\" limit.bind=\"limit\"\n        sort.bind=\"sort\" by.bind=\"by\" text-to-show.bind=\"'materiales'\" language-flag.bind=\"false\"></filter>\n      <table>\n        <thead>\n          <tr>\n            <th class=\"text-center\">Id</th>\n            <th class=\"text-center\">Nombre</th>\n            <th class=\"text-center\">Categoría</th>\n            <th class=\"text-center\">Acción</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr repeat.for=\"material of materials\">\n            <td class=\"text-center\">${material.id}</td>\n            <td>${material.name}</td>\n            <td>${material.categoryString}</td>\n            <td class=\"text-right\">\n              <a class=\"ufps-btn btn ufps-btn-default\" href=\"${material.url}\" target=\"blank\">Abrir</a>\n              <button class=\"ufps-btn btn ufps-btn-default\" click.delegate=\"approveMaterial(material.id)\">Aprobar</button>\n              <button class=\"ufps-btn btn ufps-btn-default\" click.delegate=\"showRemoveMaterial(material.id)\">Descartar</button>\n            </td>\n          </tr>\n          <tr if.bind=\"materials.length === 0\">\n            <td></td>\n            <td>No hay materiales pendientes de aprobación.</td>\n            <td>\n            </td>\n            <td>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n      <paginator page.bind=\"page\" total-pages.bind=\"totalPages\"></paginator>\n    </div>\n    <div if.bind=\"authService.isAdmin()\" class=\"modal fade\" id=\"remove-material\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"remove-material\">\n      <div class=\"modal-dialog\" role=\"document\">\n        <div class=\"modal-content\">\n          <div class=\"modal-header text-center\">\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n              <span aria-hidden=\"true\">&times;</span>\n            </button>\n            <h4 class=\"modal-title\">¿Estás seguro de eliminar este material?</h4>\n            <br>\n            <p>Esta acción no puede ser revertida</p>\n\n            <button class=\"btn btn-default ufps-btn-default\" click.delegate=removeMaterial()>Si</button>\n            <button class=\"btn btn-default ufps-btn-default\" data-dismiss=\"modal\" aria-label=\"Close\">No</button>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div if.bind=\"authService.isAdmin()\" class=\"modal fade\" id=\"remove-user\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"remove-user\">\n        <div class=\"modal-dialog\" role=\"document\">\n          <div class=\"modal-content\">\n            <div class=\"modal-header text-center\">\n              <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n                <span aria-hidden=\"true\">&times;</span>\n              </button>\n              <h4 class=\"modal-title\">¿Estás seguro de revocar el acceso de este usuario?</h4>\n              <br>\n              <p>Esta acción no puede ser revertida. El usuario será eliminado del sistema. Utilice esta opción solo por petición del mismo usuario, o en caso de detectar cuentas fraudulentas o vandálicas.</p>\n  \n              <button class=\"btn btn-default ufps-btn-default\" click.delegate=removeUser()>Si</button>\n              <button class=\"btn btn-default ufps-btn-default\" data-dismiss=\"modal\" aria-label=\"Close\">No</button>\n            </div>\n          </div>\n        </div>\n      </div>\n  </div>\n</template>\n"; });
define('modules/about/about',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var About = exports.About = function About() {
    _classCallCheck(this, About);
  };
});
define('text!modules/about/about.html', ['module'], function(module) { module.exports = "<template>\n  <div slot=\"content\" class=\"body-slot\">\n    <div class=\"container\">\n      <h2 class=\"text-center\">Acerca de</h2>\n      <hr>\n      <div class=\"row\">\n        <div class=\"col-md-10 col-md-offset-1 col-xs-12 text-center text-lg-a\">\n          <div class=\"panel panel-default\">\n            <div class=\"panel-body\">\n              <p>Training Center es una plataforma de entrenamiento en programación competitiva. Ha sido diseñada y desarrollada en el Semillero\n                de linux y desarrollo de software libre (Silux) para su utilización en el grupo de estudio en programación\n                competitiva, y de forma abierta para los estudiantes y docentes de Ingeniería de Sistemas de la Universidad\n                Francisco de Paula Santander.\n              </p>\n              <p>La creación de esta plataforma se da en el marco del proyecto de grado \"Desarrollo e implementación de un marco\n                de trabajo para el grupo de estudio en programación competitiva del programa Ingeniería de Sistemas de la\n                Universidad Francisco de Paula Santander\". Su desarrollo estuvo a cargo de\n                <strong>Angie Melissa Delgado León</strong> y\n                <strong>Gerson Yesid Lázaro Carrillo</strong>.\n              </p>\n              <p>Agradecimientos especiales a los docentes y estudiantes que han colaborado de una u otra forma en este proceso\n                (especialmente a los integrantes del grupo de estudio en Programación Competitiva).</p>\n              <img class=\"img-responsive\" src=\"./src/assets/img/about.png\" alt=\"Logos UFPS, Ingenieria de Sistemas, Silux y grupo de estudio en programación competitiva\">\n              <p>Para mas información del grupo de estudio en programación competitiva, puedes acceder al grupo en facebook <a href=\"https://www.facebook.com/groups/1403963166573403\" target=\"_blank\">Programación Competitiva UFPS</a>.</p>\n            </div>\n          </div>\n        </div>\n      </div>\n\n    </div>\n  </div>\n</template>\n"; });
define('models/user-signin',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var UserSignIn = exports.UserSignIn = function () {
    function UserSignIn() {
      var email = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var password = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var confirmPassword = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var name = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var username = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      var code = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
      var type = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
      var id = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : null;

      _classCallCheck(this, UserSignIn);

      this.email = email;
      this.password = password;
      this.confirmPassword = confirmPassword;
      this.name = name;
      this.username = username;
      this.code = code;
      this.type = type;
      this.id = id;
    }

    UserSignIn.prototype.isValid = function isValid() {
      if (this.email === '' || this.email == null) {
        return false;
      }
      if (this.password === '' || this.password == null) {
        return false;
      }
      if (this.confirmPassword === '' || this.confirmPassword == null) {
        return false;
      }
      if (this.name === '' || this.name == null) {
        return false;
      }
      if (this.username === '' || this.username == null) {
        return false;
      }
      if (this.type === '' || this.type == null) {
        return false;
      }
      return true;
    };

    return UserSignIn;
  }();
});
define('models/user-reset',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var UserReset = exports.UserReset = function UserReset() {
    var email = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var password = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var confirmPassword = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var token = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    _classCallCheck(this, UserReset);

    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.token = token;
  };
});
define('models/user-login',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var UserLogIn = exports.UserLogIn = function UserLogIn() {
    var email = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var password = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    _classCallCheck(this, UserLogIn);

    this.email = email;
    this.password = password;
  };
});
define('models/syllabus',['exports', './assignment'], function (exports, _assignment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Syllabus = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Syllabus = exports.Syllabus = function () {
    function Syllabus() {
      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
      var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var description = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
      var privacy = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      var key = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '0000';
      var enrolled = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
      var assignments = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : [];

      _classCallCheck(this, Syllabus);

      this.id = id;
      this.title = title;
      this.description = description;
      this.privacy = privacy;
      this.key = key;
      this.enrolled = enrolled;
      this.assignments = [];
      this.mockAssignments(assignments);
    }

    Syllabus.prototype.mockAssignments = function mockAssignments(assignments) {
      for (var i = 0; i < assignments.length; i++) {
        this.assignments.push(new _assignment.Assignment(assignments[i].tittle, assignments[i].description, assignments[i].init_date, assignments[i].end_date, undefined, this.id, assignments[i].id));
      }
    };

    return Syllabus;
  }();
});
define('models/problem',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Problem = exports.Problem = function () {
    function Problem() {
      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
      var titleEN = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var titleES = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
      var level = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
      var category = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
      var categoryName = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : undefined;
      var descriptionEN = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : undefined;
      var descriptionES = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : undefined;
      var exampleInput = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : undefined;
      var exampleOutput = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : undefined;
      var timeLimit = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : undefined;
      var input = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : undefined;
      var output = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : undefined;
      var author = arguments.length > 13 && arguments[13] !== undefined ? arguments[13] : undefined;
      var authorName = arguments.length > 14 && arguments[14] !== undefined ? arguments[14] : undefined;
      var auxiliarId = arguments.length > 15 && arguments[15] !== undefined ? arguments[15] : undefined;
      var resolved = arguments.length > 16 && arguments[16] !== undefined ? arguments[16] : false;

      _classCallCheck(this, Problem);

      this.id = id;
      this.titleEN = titleEN;
      this.titleES = titleES;
      this.level = level;
      this.category = category;
      this.categoryName = categoryName;
      this.descriptionEN = descriptionEN;
      this.descriptionES = descriptionES;
      this.exampleInput = exampleInput;
      this.exampleOutput = exampleOutput;
      this.timeLimit = timeLimit;
      this.input = input;
      this.output = output;
      this.author = author;
      this.authorName = authorName;
      this.auxiliarId = auxiliarId;
      this.resolved = resolved;
    }

    Problem.prototype.isInEnglish = function isInEnglish() {
      return this.titleEN != null;
    };

    Problem.prototype.isInSpanish = function isInSpanish() {
      return this.titleES != null;
    };

    return Problem;
  }();
});
define('models/models',['exports', './assignment', './category', './contest', './material', './problem', './syllabus', './user-login', './user-reset', './user-signin'], function (exports, _assignment, _category, _contest, _material, _problem, _syllabus, _userLogin, _userReset, _userSignin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.keys(_assignment).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _assignment[key];
      }
    });
  });
  Object.keys(_category).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _category[key];
      }
    });
  });
  Object.keys(_contest).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _contest[key];
      }
    });
  });
  Object.keys(_material).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _material[key];
      }
    });
  });
  Object.keys(_problem).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _problem[key];
      }
    });
  });
  Object.keys(_syllabus).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _syllabus[key];
      }
    });
  });
  Object.keys(_userLogin).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _userLogin[key];
      }
    });
  });
  Object.keys(_userReset).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _userReset[key];
      }
    });
  });
  Object.keys(_userSignin).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _userSignin[key];
      }
    });
  });
});
define('models/material',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Material = exports.Material = function Material() {
    var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
    var category = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
    var description = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
    var isPdf = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    var url = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : undefined;
    var pdf = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : undefined;
    var categoryString = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : undefined;

    _classCallCheck(this, Material);

    this.id = id;
    this.name = name;
    this.category = category;
    this.description = description;
    this.isPdf = isPdf;
    this.url = url;
    this.pdf = pdf;
    this.categoryString = categoryString;
  };
});
define('models/contest',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Contest = exports.Contest = function () {
    function Contest() {
      var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
      var description = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var initDate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
      var endDate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
      var rules = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
      var privacy = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
      var key = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : undefined;
      var id = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : undefined;

      _classCallCheck(this, Contest);

      this.title = title;
      this.description = description;
      this.initDate = initDate;
      this.endDate = endDate;
      this.rules = rules;
      this.privacy = privacy;
      this.key = key;
      this.id = id;
    }

    Contest.prototype.getSemanticStartDate = function getSemanticStartDate() {
      return this.getSemanticDate(new Date(this.initDate));
    };

    Contest.prototype.getSemanticEndDate = function getSemanticEndDate() {
      return this.getSemanticDate(new Date(this.endDate));
    };

    Contest.prototype.getSemanticDate = function getSemanticDate(date) {
      var months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
      var hour = '';
      if (date.getHours() === 0) hour = '12:';else if (date.getHours() > 12) hour = date.getHours() - 12 + ':';else hour = date.getHours() + ':';
      if (date.getMinutes() < 10) hour += '0';
      hour += date.getMinutes();
      if (date.getHours() >= 12) hour += 'PM';else hour += 'AM';
      return date.getDate() + ' ' + ' de ' + months[date.getMonth()] + ' del ' + date.getFullYear() + ' - ' + hour;
    };

    return Contest;
  }();
});
define('models/category',['exports', './problem'], function (exports, _problem) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Category = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Category = exports.Category = function () {
    function Category(name) {
      _classCallCheck(this, Category);

      this.name = name;
      this.totalProblems = 0;
      this.problemsLoaded = [];
    }

    Category.prototype.setTotalProblems = function setTotalProblems(totalProblems) {
      this.totalProblems = totalProblems;
    };

    Category.prototype.setProblemsLoaded = function setProblemsLoaded(problems) {
      this.problemsLoaded = [];
      for (var i = 0; i < problems.length; i++) {
        this.problemsLoaded.push(new _problem.Problem(problems[i].id, problems[i].title_en, problems[i].title_es, problems[i].level));
        if (problems[i].submissions.length > 0) this.problemsLoaded[i].resolved = true;
      }
    };

    Category.prototype.removeProblem = function removeProblem(id) {
      for (var i = 0; i < this.problemsLoaded.length; i++) {
        if (this.problemsLoaded[i].id === id) {
          this.problemsLoaded.splice(i, 1);
          break;
        }
      }
    };

    return Category;
  }();
});
define('models/assignment',['exports', './problem'], function (exports, _problem) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Assignment = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Assignment = exports.Assignment = function () {
    function Assignment(title, description, startDate, endDate, problems, syllabusId, id) {
      _classCallCheck(this, Assignment);

      this.title = title;
      this.description = description;
      this.startDate = startDate;
      this.endDate = endDate;
      this.problems = problems;
      this.syllabusId = syllabusId;
      this.id = id;
    }

    Assignment.prototype.adjuntProblems = function adjuntProblems(problems) {
      this.problemsLoaded = [];
      for (var i = 0; i < problems.length; i++) {
        this.problemsLoaded.push(new _problem.Problem(problems[i].id, problems[i].title_en, problems[i].title_es, problems[i].level, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, problems[i].assignment_problems.id));
      }
    };

    Assignment.prototype.removeProblem = function removeProblem(id) {
      for (var i = 0; i < this.problemsLoaded.length; i++) {
        if (this.problemsLoaded[i].id === id) {
          this.problemsLoaded.splice(i, 1);
          break;
        }
      }
    };

    Assignment.prototype.getStringDate = function getStringDate() {
      var months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
      var now = new Date();
      var start = new Date(this.startDate);
      var end = new Date(this.endDate);
      if (now >= end) return 'Tarea cerrada';else if (now < start) return 'Inicia el ' + start.getDate() + ' de ' + months[start.getMonth()] + ' del ' + start.getFullYear();else return 'Cierra el ' + end.getDate() + ' de ' + months[end.getMonth()] + ' del ' + end.getFullYear();
    };

    Assignment.prototype.getStringAvailability = function getStringAvailability() {
      var start = new Date(this.startDate);
      var end = new Date(this.endDate);
      return 'Disponible desde el ' + this.getDate(start) + ' a las ' + this.getTime(start) + ' hasta el ' + this.getDate(end) + ' a las ' + this.getTime(end);
    };

    Assignment.prototype.getDate = function getDate(date) {
      var months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
      return date.getDate() + ' de ' + months[date.getMonth()] + ' del ' + date.getFullYear();
    };

    Assignment.prototype.getTime = function getTime(date) {
      var tmp = '';
      if (date.getHours() <= 12) tmp += date.getHours() + ':';else if (date.getHours() > 12) tmp += date.getHours() - 12 + ':';
      tmp += (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
      if (date.getHours() < 12) tmp += 'AM';else tmp += 'PM';
      return tmp;
    };

    return Assignment;
  }();
});
define('main',['exports', './environment', 'fetch'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    longStackTraces: _environment2.default.debug,
    warnings: false
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources').plugin('aurelia-notify', function (settings) {
      settings.timeout = 40000;
      settings.limit = 1;
    });
    aurelia.use.plugin('aurelia-chart');
    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('text!layouts/not-logged.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"ufps-bg\">\n    <div class=\"col-md-4 col-md-offset-8 col-sm-7 col-sm-offset-5 ufps-container-sign\">\n      <slot name=\"content\"></slot>\n      <div class=\"fix\"></div>\n      <div class=\"col-sm-12 text-center ufps-sign-about hidden-xs\">\n        <p>\n          UFPS Training Center - 2018\n        </p>\n        <p>\n          Universidad Francisco de Paula Santander\n        </p>\n      </div>\n      <div class=\"fix\"></div>\n    </div>\n  </div>\n</template>\n"; });
define('text!layouts/logged.html', ['module'], function(module) { module.exports = "<template>\n  <slot name=\"content\"></slot>\n</template>"; });
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('config/settings',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var SETTINGS = exports.SETTINGS = {
    'languages': ['Java', 'C++', 'Python']
  };
});
define('config/messages',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var MESSAGES = exports.MESSAGES = {
    loginWrongData: {
      text: 'Sus datos no coinciden. Inténtalo de nuevo',
      type: 'error'
    },
    loginIncompleteData: {
      text: 'Ingrese un usuario y contraseña para iniciar sesión',
      type: 'warning'
    },

    signInCorrect: {
      text: 'Su cuenta se ha creado exitosamente.',
      type: 'success'
    },
    signInWrongData: {
      text: 'Hay un error con sus datos. Verifícalos y vuelve a intentarlo',
      type: 'error'
    },
    signInIncompleteData: {
      text: 'Hay campos obligatorios sin llenar. Complétalos para registrar correctamente',
      type: 'warning'
    },
    signInDifferentPasswords: {
      text: 'Las contraseñas no coinciden',
      type: 'warning'
    },
    passwordUpdated: {
      text: 'La contraseña ha sido actualizada exitosamente.',
      type: 'success'
    },
    profileUpdated: {
      text: 'Sus datos se han actualizado exitosamente.',
      type: 'success'
    },
    incorrectPassword: {
      text: 'La contraseña actual es incorrecta.',
      type: 'error'
    },
    superUserWrongData: {
      text: 'Hay un error en datos. Verifícalos y vuelve a intentarlo',
      type: 'error'
    },
    superUserCreated: {
      text: 'El usuario se ha creado correctamente, y ya puede iniciar sesión',
      type: 'success'
    },
    usernameInvalid: {
      text: 'El nombre de usuario debe tener entre 6 y 30 caracteres',
      type: 'error'
    },
    emailInvalid: {
      text: 'El correo electrónico escrito no es válido',
      type: 'error'
    },

    recoveryEmailSent: {
      text: 'Se ha enviado un mensaje a su correo para proceder a la recuperación de su contraseña',
      type: 'success'
    },
    recoveryMailDoesNotExist: {
      text: 'Este email no ha sido registrado en la plataforma',
      type: 'error'
    },
    recoveryInvalidToken: {
      text: 'Link invalido. Verifique el enlace enviado a su correo, e inténtelo de nuevo',
      type: 'error'
    },
    recoveryExpiredToken: {
      text: 'Su link de recuperación se ha vencido. Solicite un nuevo link para recuperar su contraseña, y uselo en máximo una hora',
      type: 'error'
    },
    recoveryDifferentPasswords: {
      text: 'Las contraseñas no coinciden',
      type: 'warning'
    },
    recoveryCorrect: {
      text: 'Su contraseña se ha cambiado exitosamente',
      type: 'success'
    },

    categoriesEmpty: {
      text: 'La lista de categorías no ha sido cargada. Intentelo de nuevo',
      type: 'error'
    },
    categoryDoesNotExist: {
      text: 'No existe una categoría con el id solicitado. Verifique el link, e intentelo de nuevo',
      type: 'error'
    },

    fileTypeIsNotTxt: {
      text: 'El archivo debe ser de tipo .txt, .in o .out',
      type: 'error'
    },

    categoryCreated: {
      text: 'La categoría se ha añadido satisfactoriamente',
      type: 'success'
    },
    categoryEdited: {
      text: 'La categoría se ha editado satisfactoriamente',
      type: 'success'
    },
    categoryRemoved: {
      text: 'La categoría ha sido eliminada satisfactoriamente',
      type: 'success'
    },
    problemSaved: {
      text: 'El problema ha sido guardado correctamente',
      type: 'success'
    },
    problemDeleted: {
      text: 'El problema se ha eliminado correctamente',
      type: 'success'
    },
    incompleteDataProblem: {
      text: 'Debes completar todos los campos visibles antes de enviar el problema',
      type: 'error'
    },
    wrongLevel: {
      text: 'La dificultad debe ser un valor entre 1 y 10',
      type: 'error'
    },
    wrongTimeLimit: {
      text: 'El tiempo limite debe ser un valor entre 0.5 y 10 segundos',
      type: 'error'
    },
    incompleteIO: {
      text: 'Debes añadir archivos de entrada y salida para el problema',
      type: 'error'
    },
    problemsEmpty: {
      text: 'Actualmente no hay problemas almacenados en la plataforma',
      type: 'warning'
    },
    submittedSolution: {
      text: 'Su solución se ha enviado para ser calificada. En breve recibirá una notificación con la calificación',
      type: 'success'
    },
    invalidCode: {
      text: 'Seleccione un archivo válido con el código fuente de su solución',
      type: 'error'
    },
    invalidJavaClassname: {
      text: 'En java la clase debe ser publica y llamarse Main: \'public class Main\'',
      type: 'error'
    },
    invalidLanguagee: {
      text: 'Seleccione un lenguaje válido',
      type: 'error'
    },

    materialDoesNotExists: {
      text: 'El material solicitado no existe',
      type: 'error'
    },
    addedMaterial: {
      text: 'Material añadido exitosamente',
      type: 'success'
    },
    materialsEmpty: {
      text: 'Actualmente, no hay materiales en esta categoría',
      type: 'warning'
    },
    materialRemoved: {
      text: 'El material se ha eliminado correctamente',
      type: 'success'
    },
    materialApproved: {
      text: 'El material seleccionado ha sido aprobado',
      type: 'success'
    },
    materialDeleted: {
      text: 'El material seleccionado ha sido eliminado',
      type: 'success'
    },
    invalidIdMaterial: {
      text: 'La lista de materiales debe contener solo los id de los problemas a añadir, separada por comas',
      type: 'error'
    },

    serverError: {
      text: 'Ha ocurrido un error interno. Lo sentimos. Vuelve a intentarlo mas tarde',
      type: 'error'
    },
    unknownError: {
      text: 'Lo sentimos. Ha ocurrido un error',
      type: 'error'
    },
    permissionsError: {
      text: 'Usted no tiene permisos para realizar esta acción',
      type: 'error'
    },
    sessionExpired: {
      text: 'Su sesión ha expirado. Para seguir utilizando la plataforma, vuelva a iniciar sesión',
      type: 'error'
    },
    temporarilyDisabled: {
      text: 'Esta funcionalidad está temporalmente deshabilitada.',
      type: 'error'
    },

    syllabusesEmpty: {
      text: 'No existe ninguna clase actualmente almacenada',
      type: 'warning'
    },
    syllabusKeyNeeded: {
      text: 'Las clases privadas deben contener una clave.',
      type: 'error'
    },
    syllabusCreated: {
      text: 'La clase ha sido creada correctamente',
      type: 'success'
    },
    syllabusEdited: {
      text: 'La clase ha sido modificada correctamente',
      type: 'success'
    },
    syllabusRemoved: {
      text: 'La clase ha sido eliminada satisfactoriamente',
      type: 'success'
    },
    syllabusUnenroll: {
      text: 'Has sido desmatriculado de esta clase exitosamente',
      type: 'success'
    },
    enrolledInSyllabus: {
      text: 'Se ha registrado satisfactoriamente',
      type: 'success'
    },
    userDeletedSyllabus: {
      text: 'Se ha eliminado el usuario correctamente',
      type: 'success'
    },
    assignmentInvalidProblems: {
      text: 'La lista de problemas debe contener solo los id de los problemas a añadir, separada por comas',
      type: 'error'
    },
    assignmentCreated: {
      text: 'La tarea ha sido creada con éxito',
      type: 'success'
    },
    assignmentModified: {
      text: 'La tarea ha sido modificada con éxito',
      type: 'success'
    },

    contestCreated: {
      text: 'La maratón ha sido creada con éxito',
      type: 'success'
    },
    contestUpdated: {
      text: 'La maratón ha sido actualizada con éxito',
      type: 'success'
    },
    contestError: {
      text: 'Hay un error en la información. Verifica que la fecha y hora de inicio sea futura, que la duración sea de al menos 30 minutos y los datos estén completos',
      type: 'error'
    },
    contestProblemsNotRegistered: {
      text: 'Solo los usuarios registrados en la maratón pueden ver los problemas',
      type: 'warning'
    },
    contestBoardNotRegistered: {
      text: 'Solo los usuarios registrados en la maratón pueden ver los resultados',
      type: 'warning'
    },
    contestFinished: {
      text: 'La competencia ha finalizado',
      type: 'warning'
    },
    invalidIdProblem: {
      text: 'La lista de problemas debe contener solo los id de los problemas a añadir, separada por comas',
      type: 'error'
    },
    contestErrorRegister: {
      text: 'No se ha podido registrar. Verifique que la maratón no haya terminado, y en caso de ser privada, que su clave sea correcta.',
      type: 'error'
    },
    contestRegistered: {
      text: 'Se ha registrado exitosamente.',
      type: 'success'
    },
    contestUnregistered: {
      text: 'Has salido de la maratón.',
      type: 'success'
    },
    contestNotStarted: {
      text: 'No puedes ver esta sección antes de iniciar la competencia.',
      type: 'warning'
    },
    problemsAdded: {
      text: 'Problemas añadidos correctamente.',
      type: 'success'
    },
    userDeleted: {
      text: 'El usuario ha sido eliminado correctamente',
      type: 'success'
    }

  };
});
define('config/config',['exports', './api', './messages', './settings'], function (exports, _api, _messages, _settings) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.keys(_api).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _api[key];
      }
    });
  });
  Object.keys(_messages).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _messages[key];
      }
    });
  });
  Object.keys(_settings).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _settings[key];
      }
    });
  });
});
define('config/api',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var API = exports.API = {
        apiUrl: 'http://trainingcenter2020.tk:8081/',
        endpoints: {
            addMaterials: 'add-materials',
            addProblemAssignment: 'add-problems',
            assignment: 'assignment',
            assignments: 'assignments',
            auth: 'auth',
            categories: 'categories',
            categoryProblems: 'categories/{1}/problems',
            contests: 'contests',
            date: 'server-date',
            enrolledSyllabus: 'users/{1}/syllabus',
            materials: 'materials',
            problems: 'problems',
            ranking: 'ranking',
            recovery: 'recovery',
            removeMaterialSyllabus: 'remove-materials',
            removeProblemAssignment: 'remove-problems',
            reset: 'reset',
            submissions: 'submissions',
            superUser: 'super-user',
            syllabus: 'syllabus',
            user: 'user',
            users: 'users'
        },

        tokenName: 'Authorization'
    };
});
define('authorize-step',['exports', 'aurelia-router', 'services/services'], function (exports, _aureliaRouter, _services) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AuthorizeStep = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var AuthorizeStep = exports.AuthorizeStep = function () {
    AuthorizeStep.inject = function inject() {
      return [_services.Auth];
    };

    function AuthorizeStep(authService) {
      _classCallCheck(this, AuthorizeStep);

      this.authService = authService;
    }

    AuthorizeStep.prototype.run = function run(navigationInstruction, next) {
      if (navigationInstruction.getAllInstructions().some(function (i) {
        return i.config.settings.roles.indexOf('admin') !== -1;
      }) && this.authService.isAdmin()) {
        return next();
      }
      if (navigationInstruction.getAllInstructions().some(function (i) {
        return i.config.settings.roles.indexOf('coach') !== -1;
      }) && this.authService.isCoach()) {
        return next();
      }
      if (navigationInstruction.getAllInstructions().some(function (i) {
        return i.config.settings.roles.indexOf('student') !== -1;
      }) && this.authService.isStudent()) {
        return next();
      }
      if (navigationInstruction.getAllInstructions().some(function (i) {
        return i.config.settings.roles.indexOf('visitor') !== -1;
      })) {
        if (!this.authService.isVisitor()) {
          return next.cancel(new _aureliaRouter.Redirect(''));
        } else {
          return next();
        }
      }
      if (this.authService.isVisitor()) {
        return next.cancel(new _aureliaRouter.Redirect('iniciar-sesion'));
      } else {
        return next.cancel(new _aureliaRouter.Redirect(''));
      }
    };

    return AuthorizeStep;
  }();
});
define(["module", "exports"], function (module, exports) {
  "use strict";

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  /**
   * simplemde v1.11.2
   * Copyright Next Step Webs, Inc.
   * @link https://github.com/NextStepWebs/simplemde-markdown-editor
   * @license MIT
   */
  !function (e) {
    if ("object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module) module.exports = e();else if ("function" == typeof define && define.amd) define([], e);else {
      var t;t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, t.SimpleMDE = e();
    }
  }(function () {
    var e;return function t(e, n, r) {
      function i(a, l) {
        if (!n[a]) {
          if (!e[a]) {
            var s = "function" == typeof require && require;if (!l && s) return s(a, !0);if (o) return o(a, !0);var c = new Error("Cannot find module '" + a + "'");throw c.code = "MODULE_NOT_FOUND", c;
          }var u = n[a] = { exports: {} };e[a][0].call(u.exports, function (t) {
            var n = e[a][1][t];return i(n ? n : t);
          }, u, u.exports, t, e, n, r);
        }return n[a].exports;
      }for (var o = "function" == typeof require && require, a = 0; a < r.length; a++) {
        i(r[a]);
      }return i;
    }({ 1: [function (e, t, n) {
        "use strict";
        function r() {
          for (var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", t = 0, n = e.length; n > t; ++t) {
            s[t] = e[t], c[e.charCodeAt(t)] = t;
          }c["-".charCodeAt(0)] = 62, c["_".charCodeAt(0)] = 63;
        }function i(e) {
          var t,
              n,
              r,
              i,
              o,
              a,
              l = e.length;if (l % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");o = "=" === e[l - 2] ? 2 : "=" === e[l - 1] ? 1 : 0, a = new u(3 * l / 4 - o), r = o > 0 ? l - 4 : l;var s = 0;for (t = 0, n = 0; r > t; t += 4, n += 3) {
            i = c[e.charCodeAt(t)] << 18 | c[e.charCodeAt(t + 1)] << 12 | c[e.charCodeAt(t + 2)] << 6 | c[e.charCodeAt(t + 3)], a[s++] = i >> 16 & 255, a[s++] = i >> 8 & 255, a[s++] = 255 & i;
          }return 2 === o ? (i = c[e.charCodeAt(t)] << 2 | c[e.charCodeAt(t + 1)] >> 4, a[s++] = 255 & i) : 1 === o && (i = c[e.charCodeAt(t)] << 10 | c[e.charCodeAt(t + 1)] << 4 | c[e.charCodeAt(t + 2)] >> 2, a[s++] = i >> 8 & 255, a[s++] = 255 & i), a;
        }function o(e) {
          return s[e >> 18 & 63] + s[e >> 12 & 63] + s[e >> 6 & 63] + s[63 & e];
        }function a(e, t, n) {
          for (var r, i = [], a = t; n > a; a += 3) {
            r = (e[a] << 16) + (e[a + 1] << 8) + e[a + 2], i.push(o(r));
          }return i.join("");
        }function l(e) {
          for (var t, n = e.length, r = n % 3, i = "", o = [], l = 16383, c = 0, u = n - r; u > c; c += l) {
            o.push(a(e, c, c + l > u ? u : c + l));
          }return 1 === r ? (t = e[n - 1], i += s[t >> 2], i += s[t << 4 & 63], i += "==") : 2 === r && (t = (e[n - 2] << 8) + e[n - 1], i += s[t >> 10], i += s[t >> 4 & 63], i += s[t << 2 & 63], i += "="), o.push(i), o.join("");
        }n.toByteArray = i, n.fromByteArray = l;var s = [],
            c = [],
            u = "undefined" != typeof Uint8Array ? Uint8Array : Array;r();
      }, {}], 2: [function (e, t, n) {}, {}], 3: [function (e, t, n) {
        (function (t) {
          "use strict";
          function r() {
            try {
              var e = new Uint8Array(1);return e.foo = function () {
                return 42;
              }, 42 === e.foo() && "function" == typeof e.subarray && 0 === e.subarray(1, 1).byteLength;
            } catch (t) {
              return !1;
            }
          }function i() {
            return a.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
          }function o(e, t) {
            if (i() < t) throw new RangeError("Invalid typed array length");return a.TYPED_ARRAY_SUPPORT ? (e = new Uint8Array(t), e.__proto__ = a.prototype) : (null === e && (e = new a(t)), e.length = t), e;
          }function a(e, t, n) {
            if (!(a.TYPED_ARRAY_SUPPORT || this instanceof a)) return new a(e, t, n);if ("number" == typeof e) {
              if ("string" == typeof t) throw new Error("If encoding is specified then the first argument must be a string");return u(this, e);
            }return l(this, e, t, n);
          }function l(e, t, n, r) {
            if ("number" == typeof t) throw new TypeError('"value" argument must not be a number');return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer ? d(e, t, n, r) : "string" == typeof t ? f(e, t, n) : p(e, t);
          }function s(e) {
            if ("number" != typeof e) throw new TypeError('"size" argument must be a number');
          }function c(e, t, n, r) {
            return s(t), 0 >= t ? o(e, t) : void 0 !== n ? "string" == typeof r ? o(e, t).fill(n, r) : o(e, t).fill(n) : o(e, t);
          }function u(e, t) {
            if (s(t), e = o(e, 0 > t ? 0 : 0 | m(t)), !a.TYPED_ARRAY_SUPPORT) for (var n = 0; t > n; n++) {
              e[n] = 0;
            }return e;
          }function f(e, t, n) {
            if ("string" == typeof n && "" !== n || (n = "utf8"), !a.isEncoding(n)) throw new TypeError('"encoding" must be a valid string encoding');var r = 0 | v(t, n);return e = o(e, r), e.write(t, n), e;
          }function h(e, t) {
            var n = 0 | m(t.length);e = o(e, n);for (var r = 0; n > r; r += 1) {
              e[r] = 255 & t[r];
            }return e;
          }function d(e, t, n, r) {
            if (t.byteLength, 0 > n || t.byteLength < n) throw new RangeError("'offset' is out of bounds");if (t.byteLength < n + (r || 0)) throw new RangeError("'length' is out of bounds");return t = void 0 === r ? new Uint8Array(t, n) : new Uint8Array(t, n, r), a.TYPED_ARRAY_SUPPORT ? (e = t, e.__proto__ = a.prototype) : e = h(e, t), e;
          }function p(e, t) {
            if (a.isBuffer(t)) {
              var n = 0 | m(t.length);return e = o(e, n), 0 === e.length ? e : (t.copy(e, 0, 0, n), e);
            }if (t) {
              if ("undefined" != typeof ArrayBuffer && t.buffer instanceof ArrayBuffer || "length" in t) return "number" != typeof t.length || K(t.length) ? o(e, 0) : h(e, t);if ("Buffer" === t.type && J(t.data)) return h(e, t.data);
            }throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
          }function m(e) {
            if (e >= i()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + i().toString(16) + " bytes");return 0 | e;
          }function g(e) {
            return +e != e && (e = 0), a.alloc(+e);
          }function v(e, t) {
            if (a.isBuffer(e)) return e.length;if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(e) || e instanceof ArrayBuffer)) return e.byteLength;"string" != typeof e && (e = "" + e);var n = e.length;if (0 === n) return 0;for (var r = !1;;) {
              switch (t) {case "ascii":case "binary":case "raw":case "raws":
                  return n;case "utf8":case "utf-8":case void 0:
                  return q(e).length;case "ucs2":case "ucs-2":case "utf16le":case "utf-16le":
                  return 2 * n;case "hex":
                  return n >>> 1;case "base64":
                  return $(e).length;default:
                  if (r) return q(e).length;t = ("" + t).toLowerCase(), r = !0;}
            }
          }function y(e, t, n) {
            var r = !1;if ((void 0 === t || 0 > t) && (t = 0), t > this.length) return "";if ((void 0 === n || n > this.length) && (n = this.length), 0 >= n) return "";if (n >>>= 0, t >>>= 0, t >= n) return "";for (e || (e = "utf8");;) {
              switch (e) {case "hex":
                  return I(this, t, n);case "utf8":case "utf-8":
                  return N(this, t, n);case "ascii":
                  return E(this, t, n);case "binary":
                  return O(this, t, n);case "base64":
                  return M(this, t, n);case "ucs2":case "ucs-2":case "utf16le":case "utf-16le":
                  return P(this, t, n);default:
                  if (r) throw new TypeError("Unknown encoding: " + e);e = (e + "").toLowerCase(), r = !0;}
            }
          }function x(e, t, n) {
            var r = e[t];e[t] = e[n], e[n] = r;
          }function b(e, t, n, r) {
            function i(e, t) {
              return 1 === o ? e[t] : e.readUInt16BE(t * o);
            }var o = 1,
                a = e.length,
                l = t.length;if (void 0 !== r && (r = String(r).toLowerCase(), "ucs2" === r || "ucs-2" === r || "utf16le" === r || "utf-16le" === r)) {
              if (e.length < 2 || t.length < 2) return -1;o = 2, a /= 2, l /= 2, n /= 2;
            }for (var s = -1, c = 0; a > n + c; c++) {
              if (i(e, n + c) === i(t, -1 === s ? 0 : c - s)) {
                if (-1 === s && (s = c), c - s + 1 === l) return (n + s) * o;
              } else -1 !== s && (c -= c - s), s = -1;
            }return -1;
          }function w(e, t, n, r) {
            n = Number(n) || 0;var i = e.length - n;r ? (r = Number(r), r > i && (r = i)) : r = i;var o = t.length;if (o % 2 !== 0) throw new Error("Invalid hex string");r > o / 2 && (r = o / 2);for (var a = 0; r > a; a++) {
              var l = parseInt(t.substr(2 * a, 2), 16);if (isNaN(l)) return a;e[n + a] = l;
            }return a;
          }function k(e, t, n, r) {
            return V(q(t, e.length - n), e, n, r);
          }function S(e, t, n, r) {
            return V(G(t), e, n, r);
          }function C(e, t, n, r) {
            return S(e, t, n, r);
          }function L(e, t, n, r) {
            return V($(t), e, n, r);
          }function T(e, t, n, r) {
            return V(Y(t, e.length - n), e, n, r);
          }function M(e, t, n) {
            return 0 === t && n === e.length ? X.fromByteArray(e) : X.fromByteArray(e.slice(t, n));
          }function N(e, t, n) {
            n = Math.min(e.length, n);for (var r = [], i = t; n > i;) {
              var o = e[i],
                  a = null,
                  l = o > 239 ? 4 : o > 223 ? 3 : o > 191 ? 2 : 1;if (n >= i + l) {
                var s, c, u, f;switch (l) {case 1:
                    128 > o && (a = o);break;case 2:
                    s = e[i + 1], 128 === (192 & s) && (f = (31 & o) << 6 | 63 & s, f > 127 && (a = f));break;case 3:
                    s = e[i + 1], c = e[i + 2], 128 === (192 & s) && 128 === (192 & c) && (f = (15 & o) << 12 | (63 & s) << 6 | 63 & c, f > 2047 && (55296 > f || f > 57343) && (a = f));break;case 4:
                    s = e[i + 1], c = e[i + 2], u = e[i + 3], 128 === (192 & s) && 128 === (192 & c) && 128 === (192 & u) && (f = (15 & o) << 18 | (63 & s) << 12 | (63 & c) << 6 | 63 & u, f > 65535 && 1114112 > f && (a = f));}
              }null === a ? (a = 65533, l = 1) : a > 65535 && (a -= 65536, r.push(a >>> 10 & 1023 | 55296), a = 56320 | 1023 & a), r.push(a), i += l;
            }return A(r);
          }function A(e) {
            var t = e.length;if (Q >= t) return String.fromCharCode.apply(String, e);for (var n = "", r = 0; t > r;) {
              n += String.fromCharCode.apply(String, e.slice(r, r += Q));
            }return n;
          }function E(e, t, n) {
            var r = "";n = Math.min(e.length, n);for (var i = t; n > i; i++) {
              r += String.fromCharCode(127 & e[i]);
            }return r;
          }function O(e, t, n) {
            var r = "";n = Math.min(e.length, n);for (var i = t; n > i; i++) {
              r += String.fromCharCode(e[i]);
            }return r;
          }function I(e, t, n) {
            var r = e.length;(!t || 0 > t) && (t = 0), (!n || 0 > n || n > r) && (n = r);for (var i = "", o = t; n > o; o++) {
              i += U(e[o]);
            }return i;
          }function P(e, t, n) {
            for (var r = e.slice(t, n), i = "", o = 0; o < r.length; o += 2) {
              i += String.fromCharCode(r[o] + 256 * r[o + 1]);
            }return i;
          }function R(e, t, n) {
            if (e % 1 !== 0 || 0 > e) throw new RangeError("offset is not uint");if (e + t > n) throw new RangeError("Trying to access beyond buffer length");
          }function D(e, t, n, r, i, o) {
            if (!a.isBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance');if (t > i || o > t) throw new RangeError('"value" argument is out of bounds');if (n + r > e.length) throw new RangeError("Index out of range");
          }function H(e, t, n, r) {
            0 > t && (t = 65535 + t + 1);for (var i = 0, o = Math.min(e.length - n, 2); o > i; i++) {
              e[n + i] = (t & 255 << 8 * (r ? i : 1 - i)) >>> 8 * (r ? i : 1 - i);
            }
          }function W(e, t, n, r) {
            0 > t && (t = 4294967295 + t + 1);for (var i = 0, o = Math.min(e.length - n, 4); o > i; i++) {
              e[n + i] = t >>> 8 * (r ? i : 3 - i) & 255;
            }
          }function B(e, t, n, r, i, o) {
            if (n + r > e.length) throw new RangeError("Index out of range");if (0 > n) throw new RangeError("Index out of range");
          }function _(e, t, n, r, i) {
            return i || B(e, t, n, 4, 3.4028234663852886e38, -3.4028234663852886e38), Z.write(e, t, n, r, 23, 4), n + 4;
          }function F(e, t, n, r, i) {
            return i || B(e, t, n, 8, 1.7976931348623157e308, -1.7976931348623157e308), Z.write(e, t, n, r, 52, 8), n + 8;
          }function z(e) {
            if (e = j(e).replace(ee, ""), e.length < 2) return "";for (; e.length % 4 !== 0;) {
              e += "=";
            }return e;
          }function j(e) {
            return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "");
          }function U(e) {
            return 16 > e ? "0" + e.toString(16) : e.toString(16);
          }function q(e, t) {
            t = t || 1 / 0;for (var n, r = e.length, i = null, o = [], a = 0; r > a; a++) {
              if (n = e.charCodeAt(a), n > 55295 && 57344 > n) {
                if (!i) {
                  if (n > 56319) {
                    (t -= 3) > -1 && o.push(239, 191, 189);continue;
                  }if (a + 1 === r) {
                    (t -= 3) > -1 && o.push(239, 191, 189);continue;
                  }i = n;continue;
                }if (56320 > n) {
                  (t -= 3) > -1 && o.push(239, 191, 189), i = n;continue;
                }n = (i - 55296 << 10 | n - 56320) + 65536;
              } else i && (t -= 3) > -1 && o.push(239, 191, 189);if (i = null, 128 > n) {
                if ((t -= 1) < 0) break;o.push(n);
              } else if (2048 > n) {
                if ((t -= 2) < 0) break;o.push(n >> 6 | 192, 63 & n | 128);
              } else if (65536 > n) {
                if ((t -= 3) < 0) break;o.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128);
              } else {
                if (!(1114112 > n)) throw new Error("Invalid code point");if ((t -= 4) < 0) break;o.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, 63 & n | 128);
              }
            }return o;
          }function G(e) {
            for (var t = [], n = 0; n < e.length; n++) {
              t.push(255 & e.charCodeAt(n));
            }return t;
          }function Y(e, t) {
            for (var n, r, i, o = [], a = 0; a < e.length && !((t -= 2) < 0); a++) {
              n = e.charCodeAt(a), r = n >> 8, i = n % 256, o.push(i), o.push(r);
            }return o;
          }function $(e) {
            return X.toByteArray(z(e));
          }function V(e, t, n, r) {
            for (var i = 0; r > i && !(i + n >= t.length || i >= e.length); i++) {
              t[i + n] = e[i];
            }return i;
          }function K(e) {
            return e !== e;
          }var X = e("base64-js"),
              Z = e("ieee754"),
              J = e("isarray");n.Buffer = a, n.SlowBuffer = g, n.INSPECT_MAX_BYTES = 50, a.TYPED_ARRAY_SUPPORT = void 0 !== t.TYPED_ARRAY_SUPPORT ? t.TYPED_ARRAY_SUPPORT : r(), n.kMaxLength = i(), a.poolSize = 8192, a._augment = function (e) {
            return e.__proto__ = a.prototype, e;
          }, a.from = function (e, t, n) {
            return l(null, e, t, n);
          }, a.TYPED_ARRAY_SUPPORT && (a.prototype.__proto__ = Uint8Array.prototype, a.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && a[Symbol.species] === a && Object.defineProperty(a, Symbol.species, { value: null, configurable: !0 })), a.alloc = function (e, t, n) {
            return c(null, e, t, n);
          }, a.allocUnsafe = function (e) {
            return u(null, e);
          }, a.allocUnsafeSlow = function (e) {
            return u(null, e);
          }, a.isBuffer = function (e) {
            return !(null == e || !e._isBuffer);
          }, a.compare = function (e, t) {
            if (!a.isBuffer(e) || !a.isBuffer(t)) throw new TypeError("Arguments must be Buffers");if (e === t) return 0;for (var n = e.length, r = t.length, i = 0, o = Math.min(n, r); o > i; ++i) {
              if (e[i] !== t[i]) {
                n = e[i], r = t[i];break;
              }
            }return r > n ? -1 : n > r ? 1 : 0;
          }, a.isEncoding = function (e) {
            switch (String(e).toLowerCase()) {case "hex":case "utf8":case "utf-8":case "ascii":case "binary":case "base64":case "raw":case "ucs2":case "ucs-2":case "utf16le":case "utf-16le":
                return !0;default:
                return !1;}
          }, a.concat = function (e, t) {
            if (!J(e)) throw new TypeError('"list" argument must be an Array of Buffers');if (0 === e.length) return a.alloc(0);var n;if (void 0 === t) for (t = 0, n = 0; n < e.length; n++) {
              t += e[n].length;
            }var r = a.allocUnsafe(t),
                i = 0;for (n = 0; n < e.length; n++) {
              var o = e[n];if (!a.isBuffer(o)) throw new TypeError('"list" argument must be an Array of Buffers');o.copy(r, i), i += o.length;
            }return r;
          }, a.byteLength = v, a.prototype._isBuffer = !0, a.prototype.swap16 = function () {
            var e = this.length;if (e % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");for (var t = 0; e > t; t += 2) {
              x(this, t, t + 1);
            }return this;
          }, a.prototype.swap32 = function () {
            var e = this.length;if (e % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");for (var t = 0; e > t; t += 4) {
              x(this, t, t + 3), x(this, t + 1, t + 2);
            }return this;
          }, a.prototype.toString = function () {
            var e = 0 | this.length;return 0 === e ? "" : 0 === arguments.length ? N(this, 0, e) : y.apply(this, arguments);
          }, a.prototype.equals = function (e) {
            if (!a.isBuffer(e)) throw new TypeError("Argument must be a Buffer");return this === e ? !0 : 0 === a.compare(this, e);
          }, a.prototype.inspect = function () {
            var e = "",
                t = n.INSPECT_MAX_BYTES;return this.length > 0 && (e = this.toString("hex", 0, t).match(/.{2}/g).join(" "), this.length > t && (e += " ... ")), "<Buffer " + e + ">";
          }, a.prototype.compare = function (e, t, n, r, i) {
            if (!a.isBuffer(e)) throw new TypeError("Argument must be a Buffer");if (void 0 === t && (t = 0), void 0 === n && (n = e ? e.length : 0), void 0 === r && (r = 0), void 0 === i && (i = this.length), 0 > t || n > e.length || 0 > r || i > this.length) throw new RangeError("out of range index");if (r >= i && t >= n) return 0;if (r >= i) return -1;if (t >= n) return 1;if (t >>>= 0, n >>>= 0, r >>>= 0, i >>>= 0, this === e) return 0;for (var o = i - r, l = n - t, s = Math.min(o, l), c = this.slice(r, i), u = e.slice(t, n), f = 0; s > f; ++f) {
              if (c[f] !== u[f]) {
                o = c[f], l = u[f];break;
              }
            }return l > o ? -1 : o > l ? 1 : 0;
          }, a.prototype.indexOf = function (e, t, n) {
            if ("string" == typeof t ? (n = t, t = 0) : t > 2147483647 ? t = 2147483647 : -2147483648 > t && (t = -2147483648), t >>= 0, 0 === this.length) return -1;if (t >= this.length) return -1;if (0 > t && (t = Math.max(this.length + t, 0)), "string" == typeof e && (e = a.from(e, n)), a.isBuffer(e)) return 0 === e.length ? -1 : b(this, e, t, n);if ("number" == typeof e) return a.TYPED_ARRAY_SUPPORT && "function" === Uint8Array.prototype.indexOf ? Uint8Array.prototype.indexOf.call(this, e, t) : b(this, [e], t, n);throw new TypeError("val must be string, number or Buffer");
          }, a.prototype.includes = function (e, t, n) {
            return -1 !== this.indexOf(e, t, n);
          }, a.prototype.write = function (e, t, n, r) {
            if (void 0 === t) r = "utf8", n = this.length, t = 0;else if (void 0 === n && "string" == typeof t) r = t, n = this.length, t = 0;else {
              if (!isFinite(t)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");t = 0 | t, isFinite(n) ? (n = 0 | n, void 0 === r && (r = "utf8")) : (r = n, n = void 0);
            }var i = this.length - t;if ((void 0 === n || n > i) && (n = i), e.length > 0 && (0 > n || 0 > t) || t > this.length) throw new RangeError("Attempt to write outside buffer bounds");r || (r = "utf8");for (var o = !1;;) {
              switch (r) {case "hex":
                  return w(this, e, t, n);case "utf8":case "utf-8":
                  return k(this, e, t, n);case "ascii":
                  return S(this, e, t, n);case "binary":
                  return C(this, e, t, n);case "base64":
                  return L(this, e, t, n);case "ucs2":case "ucs-2":case "utf16le":case "utf-16le":
                  return T(this, e, t, n);default:
                  if (o) throw new TypeError("Unknown encoding: " + r);r = ("" + r).toLowerCase(), o = !0;}
            }
          }, a.prototype.toJSON = function () {
            return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
          };var Q = 4096;a.prototype.slice = function (e, t) {
            var n = this.length;e = ~~e, t = void 0 === t ? n : ~~t, 0 > e ? (e += n, 0 > e && (e = 0)) : e > n && (e = n), 0 > t ? (t += n, 0 > t && (t = 0)) : t > n && (t = n), e > t && (t = e);var r;if (a.TYPED_ARRAY_SUPPORT) r = this.subarray(e, t), r.__proto__ = a.prototype;else {
              var i = t - e;r = new a(i, void 0);for (var o = 0; i > o; o++) {
                r[o] = this[o + e];
              }
            }return r;
          }, a.prototype.readUIntLE = function (e, t, n) {
            e = 0 | e, t = 0 | t, n || R(e, t, this.length);for (var r = this[e], i = 1, o = 0; ++o < t && (i *= 256);) {
              r += this[e + o] * i;
            }return r;
          }, a.prototype.readUIntBE = function (e, t, n) {
            e = 0 | e, t = 0 | t, n || R(e, t, this.length);for (var r = this[e + --t], i = 1; t > 0 && (i *= 256);) {
              r += this[e + --t] * i;
            }return r;
          }, a.prototype.readUInt8 = function (e, t) {
            return t || R(e, 1, this.length), this[e];
          }, a.prototype.readUInt16LE = function (e, t) {
            return t || R(e, 2, this.length), this[e] | this[e + 1] << 8;
          }, a.prototype.readUInt16BE = function (e, t) {
            return t || R(e, 2, this.length), this[e] << 8 | this[e + 1];
          }, a.prototype.readUInt32LE = function (e, t) {
            return t || R(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3];
          }, a.prototype.readUInt32BE = function (e, t) {
            return t || R(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]);
          }, a.prototype.readIntLE = function (e, t, n) {
            e = 0 | e, t = 0 | t, n || R(e, t, this.length);for (var r = this[e], i = 1, o = 0; ++o < t && (i *= 256);) {
              r += this[e + o] * i;
            }return i *= 128, r >= i && (r -= Math.pow(2, 8 * t)), r;
          }, a.prototype.readIntBE = function (e, t, n) {
            e = 0 | e, t = 0 | t, n || R(e, t, this.length);for (var r = t, i = 1, o = this[e + --r]; r > 0 && (i *= 256);) {
              o += this[e + --r] * i;
            }return i *= 128, o >= i && (o -= Math.pow(2, 8 * t)), o;
          }, a.prototype.readInt8 = function (e, t) {
            return t || R(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e];
          }, a.prototype.readInt16LE = function (e, t) {
            t || R(e, 2, this.length);var n = this[e] | this[e + 1] << 8;return 32768 & n ? 4294901760 | n : n;
          }, a.prototype.readInt16BE = function (e, t) {
            t || R(e, 2, this.length);var n = this[e + 1] | this[e] << 8;return 32768 & n ? 4294901760 | n : n;
          }, a.prototype.readInt32LE = function (e, t) {
            return t || R(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24;
          }, a.prototype.readInt32BE = function (e, t) {
            return t || R(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3];
          }, a.prototype.readFloatLE = function (e, t) {
            return t || R(e, 4, this.length), Z.read(this, e, !0, 23, 4);
          }, a.prototype.readFloatBE = function (e, t) {
            return t || R(e, 4, this.length), Z.read(this, e, !1, 23, 4);
          }, a.prototype.readDoubleLE = function (e, t) {
            return t || R(e, 8, this.length), Z.read(this, e, !0, 52, 8);
          }, a.prototype.readDoubleBE = function (e, t) {
            return t || R(e, 8, this.length), Z.read(this, e, !1, 52, 8);
          }, a.prototype.writeUIntLE = function (e, t, n, r) {
            if (e = +e, t = 0 | t, n = 0 | n, !r) {
              var i = Math.pow(2, 8 * n) - 1;D(this, e, t, n, i, 0);
            }var o = 1,
                a = 0;for (this[t] = 255 & e; ++a < n && (o *= 256);) {
              this[t + a] = e / o & 255;
            }return t + n;
          }, a.prototype.writeUIntBE = function (e, t, n, r) {
            if (e = +e, t = 0 | t, n = 0 | n, !r) {
              var i = Math.pow(2, 8 * n) - 1;D(this, e, t, n, i, 0);
            }var o = n - 1,
                a = 1;for (this[t + o] = 255 & e; --o >= 0 && (a *= 256);) {
              this[t + o] = e / a & 255;
            }return t + n;
          }, a.prototype.writeUInt8 = function (e, t, n) {
            return e = +e, t = 0 | t, n || D(this, e, t, 1, 255, 0), a.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), this[t] = 255 & e, t + 1;
          }, a.prototype.writeUInt16LE = function (e, t, n) {
            return e = +e, t = 0 | t, n || D(this, e, t, 2, 65535, 0), a.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : H(this, e, t, !0), t + 2;
          }, a.prototype.writeUInt16BE = function (e, t, n) {
            return e = +e, t = 0 | t, n || D(this, e, t, 2, 65535, 0), a.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : H(this, e, t, !1), t + 2;
          }, a.prototype.writeUInt32LE = function (e, t, n) {
            return e = +e, t = 0 | t, n || D(this, e, t, 4, 4294967295, 0), a.TYPED_ARRAY_SUPPORT ? (this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = 255 & e) : W(this, e, t, !0), t + 4;
          }, a.prototype.writeUInt32BE = function (e, t, n) {
            return e = +e, t = 0 | t, n || D(this, e, t, 4, 4294967295, 0), a.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : W(this, e, t, !1), t + 4;
          }, a.prototype.writeIntLE = function (e, t, n, r) {
            if (e = +e, t = 0 | t, !r) {
              var i = Math.pow(2, 8 * n - 1);D(this, e, t, n, i - 1, -i);
            }var o = 0,
                a = 1,
                l = 0;for (this[t] = 255 & e; ++o < n && (a *= 256);) {
              0 > e && 0 === l && 0 !== this[t + o - 1] && (l = 1), this[t + o] = (e / a >> 0) - l & 255;
            }return t + n;
          }, a.prototype.writeIntBE = function (e, t, n, r) {
            if (e = +e, t = 0 | t, !r) {
              var i = Math.pow(2, 8 * n - 1);D(this, e, t, n, i - 1, -i);
            }var o = n - 1,
                a = 1,
                l = 0;for (this[t + o] = 255 & e; --o >= 0 && (a *= 256);) {
              0 > e && 0 === l && 0 !== this[t + o + 1] && (l = 1), this[t + o] = (e / a >> 0) - l & 255;
            }return t + n;
          }, a.prototype.writeInt8 = function (e, t, n) {
            return e = +e, t = 0 | t, n || D(this, e, t, 1, 127, -128), a.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), 0 > e && (e = 255 + e + 1), this[t] = 255 & e, t + 1;
          }, a.prototype.writeInt16LE = function (e, t, n) {
            return e = +e, t = 0 | t, n || D(this, e, t, 2, 32767, -32768), a.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : H(this, e, t, !0), t + 2;
          }, a.prototype.writeInt16BE = function (e, t, n) {
            return e = +e, t = 0 | t, n || D(this, e, t, 2, 32767, -32768), a.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : H(this, e, t, !1), t + 2;
          }, a.prototype.writeInt32LE = function (e, t, n) {
            return e = +e, t = 0 | t, n || D(this, e, t, 4, 2147483647, -2147483648), a.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24) : W(this, e, t, !0), t + 4;
          }, a.prototype.writeInt32BE = function (e, t, n) {
            return e = +e, t = 0 | t, n || D(this, e, t, 4, 2147483647, -2147483648), 0 > e && (e = 4294967295 + e + 1), a.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : W(this, e, t, !1), t + 4;
          }, a.prototype.writeFloatLE = function (e, t, n) {
            return _(this, e, t, !0, n);
          }, a.prototype.writeFloatBE = function (e, t, n) {
            return _(this, e, t, !1, n);
          }, a.prototype.writeDoubleLE = function (e, t, n) {
            return F(this, e, t, !0, n);
          }, a.prototype.writeDoubleBE = function (e, t, n) {
            return F(this, e, t, !1, n);
          }, a.prototype.copy = function (e, t, n, r) {
            if (n || (n = 0), r || 0 === r || (r = this.length), t >= e.length && (t = e.length), t || (t = 0), r > 0 && n > r && (r = n), r === n) return 0;if (0 === e.length || 0 === this.length) return 0;if (0 > t) throw new RangeError("targetStart out of bounds");if (0 > n || n >= this.length) throw new RangeError("sourceStart out of bounds");if (0 > r) throw new RangeError("sourceEnd out of bounds");r > this.length && (r = this.length), e.length - t < r - n && (r = e.length - t + n);var i,
                o = r - n;if (this === e && t > n && r > t) for (i = o - 1; i >= 0; i--) {
              e[i + t] = this[i + n];
            } else if (1e3 > o || !a.TYPED_ARRAY_SUPPORT) for (i = 0; o > i; i++) {
              e[i + t] = this[i + n];
            } else Uint8Array.prototype.set.call(e, this.subarray(n, n + o), t);return o;
          }, a.prototype.fill = function (e, t, n, r) {
            if ("string" == typeof e) {
              if ("string" == typeof t ? (r = t, t = 0, n = this.length) : "string" == typeof n && (r = n, n = this.length), 1 === e.length) {
                var i = e.charCodeAt(0);256 > i && (e = i);
              }if (void 0 !== r && "string" != typeof r) throw new TypeError("encoding must be a string");if ("string" == typeof r && !a.isEncoding(r)) throw new TypeError("Unknown encoding: " + r);
            } else "number" == typeof e && (e = 255 & e);if (0 > t || this.length < t || this.length < n) throw new RangeError("Out of range index");if (t >= n) return this;t >>>= 0, n = void 0 === n ? this.length : n >>> 0, e || (e = 0);var o;if ("number" == typeof e) for (o = t; n > o; o++) {
              this[o] = e;
            } else {
              var l = a.isBuffer(e) ? e : q(new a(e, r).toString()),
                  s = l.length;for (o = 0; n - t > o; o++) {
                this[o + t] = l[o % s];
              }
            }return this;
          };var ee = /[^+\/0-9A-Za-z-_]/g;
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
      }, { "base64-js": 1, ieee754: 15, isarray: 16 }], 4: [function (e, t, n) {
        "use strict";
        function r(e) {
          return e = e || {}, "function" != typeof e.codeMirrorInstance || "function" != typeof e.codeMirrorInstance.defineMode ? void console.log("CodeMirror Spell Checker: You must provide an instance of CodeMirror via the option `codeMirrorInstance`") : (String.prototype.includes || (String.prototype.includes = function () {
            return -1 !== String.prototype.indexOf.apply(this, arguments);
          }), void e.codeMirrorInstance.defineMode("spell-checker", function (t) {
            if (!r.aff_loading) {
              r.aff_loading = !0;var n = new XMLHttpRequest();n.open("GET", "https://cdn.jsdelivr.net/codemirror.spell-checker/latest/en_US.aff", !0), n.onload = function () {
                4 === n.readyState && 200 === n.status && (r.aff_data = n.responseText, r.num_loaded++, 2 == r.num_loaded && (r.typo = new i("en_US", r.aff_data, r.dic_data, { platform: "any" })));
              }, n.send(null);
            }if (!r.dic_loading) {
              r.dic_loading = !0;var o = new XMLHttpRequest();o.open("GET", "https://cdn.jsdelivr.net/codemirror.spell-checker/latest/en_US.dic", !0), o.onload = function () {
                4 === o.readyState && 200 === o.status && (r.dic_data = o.responseText, r.num_loaded++, 2 == r.num_loaded && (r.typo = new i("en_US", r.aff_data, r.dic_data, { platform: "any" })));
              }, o.send(null);
            }var a = '!"#$%&()*+,-./:;<=>?@[\\]^_`{|}~ ',
                l = { token: function token(e) {
                var t = e.peek(),
                    n = "";if (a.includes(t)) return e.next(), null;for (; null != (t = e.peek()) && !a.includes(t);) {
                  n += t, e.next();
                }return r.typo && !r.typo.check(n) ? "spell-error" : null;
              } },
                s = e.codeMirrorInstance.getMode(t, t.backdrop || "text/plain");return e.codeMirrorInstance.overlayMode(s, l, !0);
          }));
        }var i = e("typo-js");r.num_loaded = 0, r.aff_loading = !1, r.dic_loading = !1, r.aff_data = "", r.dic_data = "", r.typo, t.exports = r;
      }, { "typo-js": 18 }], 5: [function (t, n, r) {
        !function (i) {
          "object" == (typeof r === "undefined" ? "undefined" : _typeof(r)) && "object" == (typeof n === "undefined" ? "undefined" : _typeof(n)) ? i(t("../../lib/codemirror")) : "function" == typeof e && e.amd ? e(["../../lib/codemirror"], i) : i(CodeMirror);
        }(function (e) {
          "use strict";
          function t(e) {
            var t = e.getWrapperElement();e.state.fullScreenRestore = { scrollTop: window.pageYOffset, scrollLeft: window.pageXOffset, width: t.style.width, height: t.style.height }, t.style.width = "", t.style.height = "auto", t.className += " CodeMirror-fullscreen", document.documentElement.style.overflow = "hidden", e.refresh();
          }function n(e) {
            var t = e.getWrapperElement();t.className = t.className.replace(/\s*CodeMirror-fullscreen\b/, ""), document.documentElement.style.overflow = "";var n = e.state.fullScreenRestore;t.style.width = n.width, t.style.height = n.height, window.scrollTo(n.scrollLeft, n.scrollTop), e.refresh();
          }e.defineOption("fullScreen", !1, function (r, i, o) {
            o == e.Init && (o = !1), !o != !i && (i ? t(r) : n(r));
          });
        });
      }, { "../../lib/codemirror": 10 }], 6: [function (t, n, r) {
        !function (i) {
          "object" == (typeof r === "undefined" ? "undefined" : _typeof(r)) && "object" == (typeof n === "undefined" ? "undefined" : _typeof(n)) ? i(t("../../lib/codemirror")) : "function" == typeof e && e.amd ? e(["../../lib/codemirror"], i) : i(CodeMirror);
        }(function (e) {
          function t(e) {
            e.state.placeholder && (e.state.placeholder.parentNode.removeChild(e.state.placeholder), e.state.placeholder = null);
          }function n(e) {
            t(e);var n = e.state.placeholder = document.createElement("pre");n.style.cssText = "height: 0; overflow: visible", n.className = "CodeMirror-placeholder";var r = e.getOption("placeholder");"string" == typeof r && (r = document.createTextNode(r)), n.appendChild(r), e.display.lineSpace.insertBefore(n, e.display.lineSpace.firstChild);
          }function r(e) {
            o(e) && n(e);
          }function i(e) {
            var r = e.getWrapperElement(),
                i = o(e);r.className = r.className.replace(" CodeMirror-empty", "") + (i ? " CodeMirror-empty" : ""), i ? n(e) : t(e);
          }function o(e) {
            return 1 === e.lineCount() && "" === e.getLine(0);
          }e.defineOption("placeholder", "", function (n, o, a) {
            var l = a && a != e.Init;if (o && !l) n.on("blur", r), n.on("change", i), n.on("swapDoc", i), i(n);else if (!o && l) {
              n.off("blur", r), n.off("change", i), n.off("swapDoc", i), t(n);var s = n.getWrapperElement();s.className = s.className.replace(" CodeMirror-empty", "");
            }o && !n.hasFocus() && r(n);
          });
        });
      }, { "../../lib/codemirror": 10 }], 7: [function (t, n, r) {
        !function (i) {
          "object" == (typeof r === "undefined" ? "undefined" : _typeof(r)) && "object" == (typeof n === "undefined" ? "undefined" : _typeof(n)) ? i(t("../../lib/codemirror")) : "function" == typeof e && e.amd ? e(["../../lib/codemirror"], i) : i(CodeMirror);
        }(function (e) {
          "use strict";
          var t = /^(\s*)(>[> ]*|[*+-]\s|(\d+)([.)]))(\s*)/,
              n = /^(\s*)(>[> ]*|[*+-]|(\d+)[.)])(\s*)$/,
              r = /[*+-]\s/;e.commands.newlineAndIndentContinueMarkdownList = function (i) {
            if (i.getOption("disableInput")) return e.Pass;for (var o = i.listSelections(), a = [], l = 0; l < o.length; l++) {
              var s = o[l].head,
                  c = i.getStateAfter(s.line),
                  u = c.list !== !1,
                  f = 0 !== c.quote,
                  h = i.getLine(s.line),
                  d = t.exec(h);if (!o[l].empty() || !u && !f || !d) return void i.execCommand("newlineAndIndent");if (n.test(h)) i.replaceRange("", { line: s.line, ch: 0 }, { line: s.line, ch: s.ch + 1 }), a[l] = "\n";else {
                var p = d[1],
                    m = d[5],
                    g = r.test(d[2]) || d[2].indexOf(">") >= 0 ? d[2] : parseInt(d[3], 10) + 1 + d[4];a[l] = "\n" + p + g + m;
              }
            }i.replaceSelections(a);
          };
        });
      }, { "../../lib/codemirror": 10 }], 8: [function (t, n, r) {
        !function (i) {
          "object" == (typeof r === "undefined" ? "undefined" : _typeof(r)) && "object" == (typeof n === "undefined" ? "undefined" : _typeof(n)) ? i(t("../../lib/codemirror")) : "function" == typeof e && e.amd ? e(["../../lib/codemirror"], i) : i(CodeMirror);
        }(function (e) {
          "use strict";
          e.overlayMode = function (t, n, r) {
            return { startState: function startState() {
                return { base: e.startState(t), overlay: e.startState(n), basePos: 0, baseCur: null, overlayPos: 0, overlayCur: null, streamSeen: null };
              }, copyState: function copyState(r) {
                return { base: e.copyState(t, r.base), overlay: e.copyState(n, r.overlay), basePos: r.basePos, baseCur: null, overlayPos: r.overlayPos, overlayCur: null };
              }, token: function token(e, i) {
                return (e != i.streamSeen || Math.min(i.basePos, i.overlayPos) < e.start) && (i.streamSeen = e, i.basePos = i.overlayPos = e.start), e.start == i.basePos && (i.baseCur = t.token(e, i.base), i.basePos = e.pos), e.start == i.overlayPos && (e.pos = e.start, i.overlayCur = n.token(e, i.overlay), i.overlayPos = e.pos), e.pos = Math.min(i.basePos, i.overlayPos), null == i.overlayCur ? i.baseCur : null != i.baseCur && i.overlay.combineTokens || r && null == i.overlay.combineTokens ? i.baseCur + " " + i.overlayCur : i.overlayCur;
              }, indent: t.indent && function (e, n) {
                return t.indent(e.base, n);
              }, electricChars: t.electricChars, innerMode: function innerMode(e) {
                return { state: e.base, mode: t };
              }, blankLine: function blankLine(e) {
                t.blankLine && t.blankLine(e.base), n.blankLine && n.blankLine(e.overlay);
              } };
          };
        });
      }, { "../../lib/codemirror": 10 }], 9: [function (t, n, r) {
        !function (i) {
          "object" == (typeof r === "undefined" ? "undefined" : _typeof(r)) && "object" == (typeof n === "undefined" ? "undefined" : _typeof(n)) ? i(t("../../lib/codemirror")) : "function" == typeof e && e.amd ? e(["../../lib/codemirror"], i) : i(CodeMirror);
        }(function (e) {
          "use strict";
          function t(e) {
            e.operation(function () {
              a(e);
            });
          }function n(e) {
            e.state.markedSelection.length && e.operation(function () {
              i(e);
            });
          }function r(e, t, n, r) {
            if (0 != c(t, n)) for (var i = e.state.markedSelection, o = e.state.markedSelectionStyle, a = t.line;;) {
              var u = a == t.line ? t : s(a, 0),
                  f = a + l,
                  h = f >= n.line,
                  d = h ? n : s(f, 0),
                  p = e.markText(u, d, { className: o });if (null == r ? i.push(p) : i.splice(r++, 0, p), h) break;a = f;
            }
          }function i(e) {
            for (var t = e.state.markedSelection, n = 0; n < t.length; ++n) {
              t[n].clear();
            }t.length = 0;
          }function o(e) {
            i(e);for (var t = e.listSelections(), n = 0; n < t.length; n++) {
              r(e, t[n].from(), t[n].to());
            }
          }function a(e) {
            if (!e.somethingSelected()) return i(e);if (e.listSelections().length > 1) return o(e);var t = e.getCursor("start"),
                n = e.getCursor("end"),
                a = e.state.markedSelection;if (!a.length) return r(e, t, n);var s = a[0].find(),
                u = a[a.length - 1].find();if (!s || !u || n.line - t.line < l || c(t, u.to) >= 0 || c(n, s.from) <= 0) return o(e);for (; c(t, s.from) > 0;) {
              a.shift().clear(), s = a[0].find();
            }for (c(t, s.from) < 0 && (s.to.line - t.line < l ? (a.shift().clear(), r(e, t, s.to, 0)) : r(e, t, s.from, 0)); c(n, u.to) < 0;) {
              a.pop().clear(), u = a[a.length - 1].find();
            }c(n, u.to) > 0 && (n.line - u.from.line < l ? (a.pop().clear(), r(e, u.from, n)) : r(e, u.to, n));
          }e.defineOption("styleSelectedText", !1, function (r, a, l) {
            var s = l && l != e.Init;a && !s ? (r.state.markedSelection = [], r.state.markedSelectionStyle = "string" == typeof a ? a : "CodeMirror-selectedtext", o(r), r.on("cursorActivity", t), r.on("change", n)) : !a && s && (r.off("cursorActivity", t), r.off("change", n), i(r), r.state.markedSelection = r.state.markedSelectionStyle = null);
          });var l = 8,
              s = e.Pos,
              c = e.cmpPos;
        });
      }, { "../../lib/codemirror": 10 }], 10: [function (t, n, r) {
        !function (t) {
          if ("object" == (typeof r === "undefined" ? "undefined" : _typeof(r)) && "object" == (typeof n === "undefined" ? "undefined" : _typeof(n))) n.exports = t();else {
            if ("function" == typeof e && e.amd) return e([], t);(this || window).CodeMirror = t();
          }
        }(function () {
          "use strict";
          function e(n, r) {
            if (!(this instanceof e)) return new e(n, r);this.options = r = r ? Wi(r) : {}, Wi(ea, r, !1), d(r);var i = r.value;"string" == typeof i && (i = new Ca(i, r.mode, null, r.lineSeparator)), this.doc = i;var o = new e.inputStyles[r.inputStyle](this),
                a = this.display = new t(n, i, o);a.wrapper.CodeMirror = this, c(this), l(this), r.lineWrapping && (this.display.wrapper.className += " CodeMirror-wrap"), r.autofocus && !Ao && a.input.focus(), v(this), this.state = { keyMaps: [], overlays: [], modeGen: 0, overwrite: !1, delayingBlurEvent: !1, focused: !1, suppressEdits: !1, pasteIncoming: !1, cutIncoming: !1, selectingText: !1, draggingText: !1, highlight: new Ei(), keySeq: null, specialChars: null };var s = this;xo && 11 > bo && setTimeout(function () {
              s.display.input.reset(!0);
            }, 20), jt(this), Ki(), bt(this), this.curOp.forceUpdate = !0, Xr(this, i), r.autofocus && !Ao || s.hasFocus() ? setTimeout(Bi(vn, this), 20) : yn(this);for (var u in ta) {
              ta.hasOwnProperty(u) && ta[u](this, r[u], na);
            }k(this), r.finishInit && r.finishInit(this);for (var f = 0; f < aa.length; ++f) {
              aa[f](this);
            }kt(this), wo && r.lineWrapping && "optimizelegibility" == getComputedStyle(a.lineDiv).textRendering && (a.lineDiv.style.textRendering = "auto");
          }function t(e, t, n) {
            var r = this;this.input = n, r.scrollbarFiller = ji("div", null, "CodeMirror-scrollbar-filler"), r.scrollbarFiller.setAttribute("cm-not-content", "true"), r.gutterFiller = ji("div", null, "CodeMirror-gutter-filler"), r.gutterFiller.setAttribute("cm-not-content", "true"), r.lineDiv = ji("div", null, "CodeMirror-code"), r.selectionDiv = ji("div", null, null, "position: relative; z-index: 1"), r.cursorDiv = ji("div", null, "CodeMirror-cursors"), r.measure = ji("div", null, "CodeMirror-measure"), r.lineMeasure = ji("div", null, "CodeMirror-measure"), r.lineSpace = ji("div", [r.measure, r.lineMeasure, r.selectionDiv, r.cursorDiv, r.lineDiv], null, "position: relative; outline: none"), r.mover = ji("div", [ji("div", [r.lineSpace], "CodeMirror-lines")], null, "position: relative"), r.sizer = ji("div", [r.mover], "CodeMirror-sizer"), r.sizerWidth = null, r.heightForcer = ji("div", null, null, "position: absolute; height: " + Da + "px; width: 1px;"), r.gutters = ji("div", null, "CodeMirror-gutters"), r.lineGutter = null, r.scroller = ji("div", [r.sizer, r.heightForcer, r.gutters], "CodeMirror-scroll"), r.scroller.setAttribute("tabIndex", "-1"), r.wrapper = ji("div", [r.scrollbarFiller, r.gutterFiller, r.scroller], "CodeMirror"), xo && 8 > bo && (r.gutters.style.zIndex = -1, r.scroller.style.paddingRight = 0), wo || go && Ao || (r.scroller.draggable = !0), e && (e.appendChild ? e.appendChild(r.wrapper) : e(r.wrapper)), r.viewFrom = r.viewTo = t.first, r.reportedViewFrom = r.reportedViewTo = t.first, r.view = [], r.renderedView = null, r.externalMeasured = null, r.viewOffset = 0, r.lastWrapHeight = r.lastWrapWidth = 0, r.updateLineNumbers = null, r.nativeBarWidth = r.barHeight = r.barWidth = 0, r.scrollbarsClipped = !1, r.lineNumWidth = r.lineNumInnerWidth = r.lineNumChars = null, r.alignWidgets = !1, r.cachedCharWidth = r.cachedTextHeight = r.cachedPaddingH = null, r.maxLine = null, r.maxLineLength = 0, r.maxLineChanged = !1, r.wheelDX = r.wheelDY = r.wheelStartX = r.wheelStartY = null, r.shift = !1, r.selForContextMenu = null, r.activeTouch = null, n.init(r);
          }function n(t) {
            t.doc.mode = e.getMode(t.options, t.doc.modeOption), r(t);
          }function r(e) {
            e.doc.iter(function (e) {
              e.stateAfter && (e.stateAfter = null), e.styles && (e.styles = null);
            }), e.doc.frontier = e.doc.first, _e(e, 100), e.state.modeGen++, e.curOp && Dt(e);
          }function i(e) {
            e.options.lineWrapping ? (Ja(e.display.wrapper, "CodeMirror-wrap"), e.display.sizer.style.minWidth = "", e.display.sizerWidth = null) : (Za(e.display.wrapper, "CodeMirror-wrap"), h(e)), a(e), Dt(e), lt(e), setTimeout(function () {
              y(e);
            }, 100);
          }function o(e) {
            var t = yt(e.display),
                n = e.options.lineWrapping,
                r = n && Math.max(5, e.display.scroller.clientWidth / xt(e.display) - 3);return function (i) {
              if (kr(e.doc, i)) return 0;var o = 0;if (i.widgets) for (var a = 0; a < i.widgets.length; a++) {
                i.widgets[a].height && (o += i.widgets[a].height);
              }return n ? o + (Math.ceil(i.text.length / r) || 1) * t : o + t;
            };
          }function a(e) {
            var t = e.doc,
                n = o(e);t.iter(function (e) {
              var t = n(e);t != e.height && ei(e, t);
            });
          }function l(e) {
            e.display.wrapper.className = e.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + e.options.theme.replace(/(^|\s)\s*/g, " cm-s-"), lt(e);
          }function s(e) {
            c(e), Dt(e), setTimeout(function () {
              w(e);
            }, 20);
          }function c(e) {
            var t = e.display.gutters,
                n = e.options.gutters;Ui(t);for (var r = 0; r < n.length; ++r) {
              var i = n[r],
                  o = t.appendChild(ji("div", null, "CodeMirror-gutter " + i));"CodeMirror-linenumbers" == i && (e.display.lineGutter = o, o.style.width = (e.display.lineNumWidth || 1) + "px");
            }t.style.display = r ? "" : "none", u(e);
          }function u(e) {
            var t = e.display.gutters.offsetWidth;e.display.sizer.style.marginLeft = t + "px";
          }function f(e) {
            if (0 == e.height) return 0;for (var t, n = e.text.length, r = e; t = mr(r);) {
              var i = t.find(0, !0);r = i.from.line, n += i.from.ch - i.to.ch;
            }for (r = e; t = gr(r);) {
              var i = t.find(0, !0);n -= r.text.length - i.from.ch, r = i.to.line, n += r.text.length - i.to.ch;
            }return n;
          }function h(e) {
            var t = e.display,
                n = e.doc;t.maxLine = Zr(n, n.first), t.maxLineLength = f(t.maxLine), t.maxLineChanged = !0, n.iter(function (e) {
              var n = f(e);n > t.maxLineLength && (t.maxLineLength = n, t.maxLine = e);
            });
          }function d(e) {
            var t = Pi(e.gutters, "CodeMirror-linenumbers");-1 == t && e.lineNumbers ? e.gutters = e.gutters.concat(["CodeMirror-linenumbers"]) : t > -1 && !e.lineNumbers && (e.gutters = e.gutters.slice(0), e.gutters.splice(t, 1));
          }function p(e) {
            var t = e.display,
                n = t.gutters.offsetWidth,
                r = Math.round(e.doc.height + qe(e.display));return { clientHeight: t.scroller.clientHeight, viewHeight: t.wrapper.clientHeight, scrollWidth: t.scroller.scrollWidth, clientWidth: t.scroller.clientWidth, viewWidth: t.wrapper.clientWidth, barLeft: e.options.fixedGutter ? n : 0, docHeight: r, scrollHeight: r + Ye(e) + t.barHeight, nativeBarWidth: t.nativeBarWidth, gutterWidth: n };
          }function m(e, t, n) {
            this.cm = n;var r = this.vert = ji("div", [ji("div", null, null, "min-width: 1px")], "CodeMirror-vscrollbar"),
                i = this.horiz = ji("div", [ji("div", null, null, "height: 100%; min-height: 1px")], "CodeMirror-hscrollbar");e(r), e(i), Ea(r, "scroll", function () {
              r.clientHeight && t(r.scrollTop, "vertical");
            }), Ea(i, "scroll", function () {
              i.clientWidth && t(i.scrollLeft, "horizontal");
            }), this.checkedZeroWidth = !1, xo && 8 > bo && (this.horiz.style.minHeight = this.vert.style.minWidth = "18px");
          }function g() {}function v(t) {
            t.display.scrollbars && (t.display.scrollbars.clear(), t.display.scrollbars.addClass && Za(t.display.wrapper, t.display.scrollbars.addClass)), t.display.scrollbars = new e.scrollbarModel[t.options.scrollbarStyle](function (e) {
              t.display.wrapper.insertBefore(e, t.display.scrollbarFiller), Ea(e, "mousedown", function () {
                t.state.focused && setTimeout(function () {
                  t.display.input.focus();
                }, 0);
              }), e.setAttribute("cm-not-content", "true");
            }, function (e, n) {
              "horizontal" == n ? on(t, e) : rn(t, e);
            }, t), t.display.scrollbars.addClass && Ja(t.display.wrapper, t.display.scrollbars.addClass);
          }function y(e, t) {
            t || (t = p(e));var n = e.display.barWidth,
                r = e.display.barHeight;x(e, t);for (var i = 0; 4 > i && n != e.display.barWidth || r != e.display.barHeight; i++) {
              n != e.display.barWidth && e.options.lineWrapping && O(e), x(e, p(e)), n = e.display.barWidth, r = e.display.barHeight;
            }
          }function x(e, t) {
            var n = e.display,
                r = n.scrollbars.update(t);n.sizer.style.paddingRight = (n.barWidth = r.right) + "px", n.sizer.style.paddingBottom = (n.barHeight = r.bottom) + "px", n.heightForcer.style.borderBottom = r.bottom + "px solid transparent", r.right && r.bottom ? (n.scrollbarFiller.style.display = "block", n.scrollbarFiller.style.height = r.bottom + "px", n.scrollbarFiller.style.width = r.right + "px") : n.scrollbarFiller.style.display = "", r.bottom && e.options.coverGutterNextToScrollbar && e.options.fixedGutter ? (n.gutterFiller.style.display = "block", n.gutterFiller.style.height = r.bottom + "px", n.gutterFiller.style.width = t.gutterWidth + "px") : n.gutterFiller.style.display = "";
          }function b(e, t, n) {
            var r = n && null != n.top ? Math.max(0, n.top) : e.scroller.scrollTop;r = Math.floor(r - Ue(e));var i = n && null != n.bottom ? n.bottom : r + e.wrapper.clientHeight,
                o = ni(t, r),
                a = ni(t, i);if (n && n.ensure) {
              var l = n.ensure.from.line,
                  s = n.ensure.to.line;o > l ? (o = l, a = ni(t, ri(Zr(t, l)) + e.wrapper.clientHeight)) : Math.min(s, t.lastLine()) >= a && (o = ni(t, ri(Zr(t, s)) - e.wrapper.clientHeight), a = s);
            }return { from: o, to: Math.max(a, o + 1) };
          }function w(e) {
            var t = e.display,
                n = t.view;if (t.alignWidgets || t.gutters.firstChild && e.options.fixedGutter) {
              for (var r = C(t) - t.scroller.scrollLeft + e.doc.scrollLeft, i = t.gutters.offsetWidth, o = r + "px", a = 0; a < n.length; a++) {
                if (!n[a].hidden) {
                  e.options.fixedGutter && n[a].gutter && (n[a].gutter.style.left = o);var l = n[a].alignable;if (l) for (var s = 0; s < l.length; s++) {
                    l[s].style.left = o;
                  }
                }
              }e.options.fixedGutter && (t.gutters.style.left = r + i + "px");
            }
          }function k(e) {
            if (!e.options.lineNumbers) return !1;var t = e.doc,
                n = S(e.options, t.first + t.size - 1),
                r = e.display;if (n.length != r.lineNumChars) {
              var i = r.measure.appendChild(ji("div", [ji("div", n)], "CodeMirror-linenumber CodeMirror-gutter-elt")),
                  o = i.firstChild.offsetWidth,
                  a = i.offsetWidth - o;return r.lineGutter.style.width = "", r.lineNumInnerWidth = Math.max(o, r.lineGutter.offsetWidth - a) + 1, r.lineNumWidth = r.lineNumInnerWidth + a, r.lineNumChars = r.lineNumInnerWidth ? n.length : -1, r.lineGutter.style.width = r.lineNumWidth + "px", u(e), !0;
            }return !1;
          }function S(e, t) {
            return String(e.lineNumberFormatter(t + e.firstLineNumber));
          }function C(e) {
            return e.scroller.getBoundingClientRect().left - e.sizer.getBoundingClientRect().left;
          }function L(e, t, n) {
            var r = e.display;this.viewport = t, this.visible = b(r, e.doc, t), this.editorIsHidden = !r.wrapper.offsetWidth, this.wrapperHeight = r.wrapper.clientHeight, this.wrapperWidth = r.wrapper.clientWidth, this.oldDisplayWidth = $e(e), this.force = n, this.dims = P(e), this.events = [];
          }function T(e) {
            var t = e.display;!t.scrollbarsClipped && t.scroller.offsetWidth && (t.nativeBarWidth = t.scroller.offsetWidth - t.scroller.clientWidth, t.heightForcer.style.height = Ye(e) + "px", t.sizer.style.marginBottom = -t.nativeBarWidth + "px", t.sizer.style.borderRightWidth = Ye(e) + "px", t.scrollbarsClipped = !0);
          }function M(e, t) {
            var n = e.display,
                r = e.doc;if (t.editorIsHidden) return Wt(e), !1;if (!t.force && t.visible.from >= n.viewFrom && t.visible.to <= n.viewTo && (null == n.updateLineNumbers || n.updateLineNumbers >= n.viewTo) && n.renderedView == n.view && 0 == zt(e)) return !1;k(e) && (Wt(e), t.dims = P(e));var i = r.first + r.size,
                o = Math.max(t.visible.from - e.options.viewportMargin, r.first),
                a = Math.min(i, t.visible.to + e.options.viewportMargin);n.viewFrom < o && o - n.viewFrom < 20 && (o = Math.max(r.first, n.viewFrom)), n.viewTo > a && n.viewTo - a < 20 && (a = Math.min(i, n.viewTo)), Wo && (o = br(e.doc, o), a = wr(e.doc, a));var l = o != n.viewFrom || a != n.viewTo || n.lastWrapHeight != t.wrapperHeight || n.lastWrapWidth != t.wrapperWidth;Ft(e, o, a), n.viewOffset = ri(Zr(e.doc, n.viewFrom)), e.display.mover.style.top = n.viewOffset + "px";var s = zt(e);if (!l && 0 == s && !t.force && n.renderedView == n.view && (null == n.updateLineNumbers || n.updateLineNumbers >= n.viewTo)) return !1;var c = Gi();return s > 4 && (n.lineDiv.style.display = "none"), R(e, n.updateLineNumbers, t.dims), s > 4 && (n.lineDiv.style.display = ""), n.renderedView = n.view, c && Gi() != c && c.offsetHeight && c.focus(), Ui(n.cursorDiv), Ui(n.selectionDiv), n.gutters.style.height = n.sizer.style.minHeight = 0, l && (n.lastWrapHeight = t.wrapperHeight, n.lastWrapWidth = t.wrapperWidth, _e(e, 400)), n.updateLineNumbers = null, !0;
          }function N(e, t) {
            for (var n = t.viewport, r = !0; (r && e.options.lineWrapping && t.oldDisplayWidth != $e(e) || (n && null != n.top && (n = { top: Math.min(e.doc.height + qe(e.display) - Ve(e), n.top) }), t.visible = b(e.display, e.doc, n), !(t.visible.from >= e.display.viewFrom && t.visible.to <= e.display.viewTo))) && M(e, t); r = !1) {
              O(e);var i = p(e);Re(e), y(e, i), E(e, i);
            }t.signal(e, "update", e), e.display.viewFrom == e.display.reportedViewFrom && e.display.viewTo == e.display.reportedViewTo || (t.signal(e, "viewportChange", e, e.display.viewFrom, e.display.viewTo), e.display.reportedViewFrom = e.display.viewFrom, e.display.reportedViewTo = e.display.viewTo);
          }function A(e, t) {
            var n = new L(e, t);if (M(e, n)) {
              O(e), N(e, n);var r = p(e);Re(e), y(e, r), E(e, r), n.finish();
            }
          }function E(e, t) {
            e.display.sizer.style.minHeight = t.docHeight + "px", e.display.heightForcer.style.top = t.docHeight + "px", e.display.gutters.style.height = t.docHeight + e.display.barHeight + Ye(e) + "px";
          }function O(e) {
            for (var t = e.display, n = t.lineDiv.offsetTop, r = 0; r < t.view.length; r++) {
              var i,
                  o = t.view[r];if (!o.hidden) {
                if (xo && 8 > bo) {
                  var a = o.node.offsetTop + o.node.offsetHeight;i = a - n, n = a;
                } else {
                  var l = o.node.getBoundingClientRect();i = l.bottom - l.top;
                }var s = o.line.height - i;if (2 > i && (i = yt(t)), (s > .001 || -.001 > s) && (ei(o.line, i), I(o.line), o.rest)) for (var c = 0; c < o.rest.length; c++) {
                  I(o.rest[c]);
                }
              }
            }
          }function I(e) {
            if (e.widgets) for (var t = 0; t < e.widgets.length; ++t) {
              e.widgets[t].height = e.widgets[t].node.parentNode.offsetHeight;
            }
          }function P(e) {
            for (var t = e.display, n = {}, r = {}, i = t.gutters.clientLeft, o = t.gutters.firstChild, a = 0; o; o = o.nextSibling, ++a) {
              n[e.options.gutters[a]] = o.offsetLeft + o.clientLeft + i, r[e.options.gutters[a]] = o.clientWidth;
            }return { fixedPos: C(t), gutterTotalWidth: t.gutters.offsetWidth, gutterLeft: n, gutterWidth: r, wrapperWidth: t.wrapper.clientWidth };
          }function R(e, t, n) {
            function r(t) {
              var n = t.nextSibling;return wo && Eo && e.display.currentWheelTarget == t ? t.style.display = "none" : t.parentNode.removeChild(t), n;
            }for (var i = e.display, o = e.options.lineNumbers, a = i.lineDiv, l = a.firstChild, s = i.view, c = i.viewFrom, u = 0; u < s.length; u++) {
              var f = s[u];if (f.hidden) ;else if (f.node && f.node.parentNode == a) {
                for (; l != f.node;) {
                  l = r(l);
                }var h = o && null != t && c >= t && f.lineNumber;f.changes && (Pi(f.changes, "gutter") > -1 && (h = !1), D(e, f, c, n)), h && (Ui(f.lineNumber), f.lineNumber.appendChild(document.createTextNode(S(e.options, c)))), l = f.node.nextSibling;
              } else {
                var d = U(e, f, c, n);a.insertBefore(d, l);
              }c += f.size;
            }for (; l;) {
              l = r(l);
            }
          }function D(e, t, n, r) {
            for (var i = 0; i < t.changes.length; i++) {
              var o = t.changes[i];"text" == o ? _(e, t) : "gutter" == o ? z(e, t, n, r) : "class" == o ? F(t) : "widget" == o && j(e, t, r);
            }t.changes = null;
          }function H(e) {
            return e.node == e.text && (e.node = ji("div", null, null, "position: relative"), e.text.parentNode && e.text.parentNode.replaceChild(e.node, e.text), e.node.appendChild(e.text), xo && 8 > bo && (e.node.style.zIndex = 2)), e.node;
          }function W(e) {
            var t = e.bgClass ? e.bgClass + " " + (e.line.bgClass || "") : e.line.bgClass;if (t && (t += " CodeMirror-linebackground"), e.background) t ? e.background.className = t : (e.background.parentNode.removeChild(e.background), e.background = null);else if (t) {
              var n = H(e);e.background = n.insertBefore(ji("div", null, t), n.firstChild);
            }
          }function B(e, t) {
            var n = e.display.externalMeasured;return n && n.line == t.line ? (e.display.externalMeasured = null, t.measure = n.measure, n.built) : Br(e, t);
          }function _(e, t) {
            var n = t.text.className,
                r = B(e, t);t.text == t.node && (t.node = r.pre), t.text.parentNode.replaceChild(r.pre, t.text), t.text = r.pre, r.bgClass != t.bgClass || r.textClass != t.textClass ? (t.bgClass = r.bgClass, t.textClass = r.textClass, F(t)) : n && (t.text.className = n);
          }function F(e) {
            W(e), e.line.wrapClass ? H(e).className = e.line.wrapClass : e.node != e.text && (e.node.className = "");var t = e.textClass ? e.textClass + " " + (e.line.textClass || "") : e.line.textClass;e.text.className = t || "";
          }function z(e, t, n, r) {
            if (t.gutter && (t.node.removeChild(t.gutter), t.gutter = null), t.gutterBackground && (t.node.removeChild(t.gutterBackground), t.gutterBackground = null), t.line.gutterClass) {
              var i = H(t);t.gutterBackground = ji("div", null, "CodeMirror-gutter-background " + t.line.gutterClass, "left: " + (e.options.fixedGutter ? r.fixedPos : -r.gutterTotalWidth) + "px; width: " + r.gutterTotalWidth + "px"), i.insertBefore(t.gutterBackground, t.text);
            }var o = t.line.gutterMarkers;if (e.options.lineNumbers || o) {
              var i = H(t),
                  a = t.gutter = ji("div", null, "CodeMirror-gutter-wrapper", "left: " + (e.options.fixedGutter ? r.fixedPos : -r.gutterTotalWidth) + "px");if (e.display.input.setUneditable(a), i.insertBefore(a, t.text), t.line.gutterClass && (a.className += " " + t.line.gutterClass), !e.options.lineNumbers || o && o["CodeMirror-linenumbers"] || (t.lineNumber = a.appendChild(ji("div", S(e.options, n), "CodeMirror-linenumber CodeMirror-gutter-elt", "left: " + r.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + e.display.lineNumInnerWidth + "px"))), o) for (var l = 0; l < e.options.gutters.length; ++l) {
                var s = e.options.gutters[l],
                    c = o.hasOwnProperty(s) && o[s];c && a.appendChild(ji("div", [c], "CodeMirror-gutter-elt", "left: " + r.gutterLeft[s] + "px; width: " + r.gutterWidth[s] + "px"));
              }
            }
          }function j(e, t, n) {
            t.alignable && (t.alignable = null);for (var r, i = t.node.firstChild; i; i = r) {
              var r = i.nextSibling;"CodeMirror-linewidget" == i.className && t.node.removeChild(i);
            }q(e, t, n);
          }function U(e, t, n, r) {
            var i = B(e, t);return t.text = t.node = i.pre, i.bgClass && (t.bgClass = i.bgClass), i.textClass && (t.textClass = i.textClass), F(t), z(e, t, n, r), q(e, t, r), t.node;
          }function q(e, t, n) {
            if (G(e, t.line, t, n, !0), t.rest) for (var r = 0; r < t.rest.length; r++) {
              G(e, t.rest[r], t, n, !1);
            }
          }function G(e, t, n, r, i) {
            if (t.widgets) for (var o = H(n), a = 0, l = t.widgets; a < l.length; ++a) {
              var s = l[a],
                  c = ji("div", [s.node], "CodeMirror-linewidget");s.handleMouseEvents || c.setAttribute("cm-ignore-events", "true"), Y(s, c, n, r), e.display.input.setUneditable(c), i && s.above ? o.insertBefore(c, n.gutter || n.text) : o.appendChild(c), Ci(s, "redraw");
            }
          }function Y(e, t, n, r) {
            if (e.noHScroll) {
              (n.alignable || (n.alignable = [])).push(t);var i = r.wrapperWidth;t.style.left = r.fixedPos + "px", e.coverGutter || (i -= r.gutterTotalWidth, t.style.paddingLeft = r.gutterTotalWidth + "px"), t.style.width = i + "px";
            }e.coverGutter && (t.style.zIndex = 5, t.style.position = "relative", e.noHScroll || (t.style.marginLeft = -r.gutterTotalWidth + "px"));
          }function $(e) {
            return Bo(e.line, e.ch);
          }function V(e, t) {
            return _o(e, t) < 0 ? t : e;
          }function K(e, t) {
            return _o(e, t) < 0 ? e : t;
          }function X(e) {
            e.state.focused || (e.display.input.focus(), vn(e));
          }function Z(e, t, n, r, i) {
            var o = e.doc;e.display.shift = !1, r || (r = o.sel);var a = e.state.pasteIncoming || "paste" == i,
                l = o.splitLines(t),
                s = null;if (a && r.ranges.length > 1) if (Fo && Fo.text.join("\n") == t) {
              if (r.ranges.length % Fo.text.length == 0) {
                s = [];for (var c = 0; c < Fo.text.length; c++) {
                  s.push(o.splitLines(Fo.text[c]));
                }
              }
            } else l.length == r.ranges.length && (s = Ri(l, function (e) {
              return [e];
            }));for (var c = r.ranges.length - 1; c >= 0; c--) {
              var u = r.ranges[c],
                  f = u.from(),
                  h = u.to();u.empty() && (n && n > 0 ? f = Bo(f.line, f.ch - n) : e.state.overwrite && !a ? h = Bo(h.line, Math.min(Zr(o, h.line).text.length, h.ch + Ii(l).length)) : Fo && Fo.lineWise && Fo.text.join("\n") == t && (f = h = Bo(f.line, 0)));var d = e.curOp.updateInput,
                  p = { from: f, to: h, text: s ? s[c % s.length] : l, origin: i || (a ? "paste" : e.state.cutIncoming ? "cut" : "+input") };Tn(e.doc, p), Ci(e, "inputRead", e, p);
            }t && !a && Q(e, t), Bn(e), e.curOp.updateInput = d, e.curOp.typing = !0, e.state.pasteIncoming = e.state.cutIncoming = !1;
          }function J(e, t) {
            var n = e.clipboardData && e.clipboardData.getData("text/plain");return n ? (e.preventDefault(), t.isReadOnly() || t.options.disableInput || At(t, function () {
              Z(t, n, 0, null, "paste");
            }), !0) : void 0;
          }function Q(e, t) {
            if (e.options.electricChars && e.options.smartIndent) for (var n = e.doc.sel, r = n.ranges.length - 1; r >= 0; r--) {
              var i = n.ranges[r];if (!(i.head.ch > 100 || r && n.ranges[r - 1].head.line == i.head.line)) {
                var o = e.getModeAt(i.head),
                    a = !1;if (o.electricChars) {
                  for (var l = 0; l < o.electricChars.length; l++) {
                    if (t.indexOf(o.electricChars.charAt(l)) > -1) {
                      a = Fn(e, i.head.line, "smart");break;
                    }
                  }
                } else o.electricInput && o.electricInput.test(Zr(e.doc, i.head.line).text.slice(0, i.head.ch)) && (a = Fn(e, i.head.line, "smart"));a && Ci(e, "electricInput", e, i.head.line);
              }
            }
          }function ee(e) {
            for (var t = [], n = [], r = 0; r < e.doc.sel.ranges.length; r++) {
              var i = e.doc.sel.ranges[r].head.line,
                  o = { anchor: Bo(i, 0), head: Bo(i + 1, 0) };n.push(o), t.push(e.getRange(o.anchor, o.head));
            }return { text: t, ranges: n };
          }function te(e) {
            e.setAttribute("autocorrect", "off"), e.setAttribute("autocapitalize", "off"), e.setAttribute("spellcheck", "false");
          }function ne(e) {
            this.cm = e, this.prevInput = "", this.pollingFast = !1, this.polling = new Ei(), this.inaccurateSelection = !1, this.hasSelection = !1, this.composing = null;
          }function re() {
            var e = ji("textarea", null, null, "position: absolute; padding: 0; width: 1px; height: 1em; outline: none"),
                t = ji("div", [e], null, "overflow: hidden; position: relative; width: 3px; height: 0px;");return wo ? e.style.width = "1000px" : e.setAttribute("wrap", "off"), No && (e.style.border = "1px solid black"), te(e), t;
          }function ie(e) {
            this.cm = e, this.lastAnchorNode = this.lastAnchorOffset = this.lastFocusNode = this.lastFocusOffset = null, this.polling = new Ei(), this.gracePeriod = !1;
          }function oe(e, t) {
            var n = Qe(e, t.line);if (!n || n.hidden) return null;var r = Zr(e.doc, t.line),
                i = Xe(n, r, t.line),
                o = ii(r),
                a = "left";if (o) {
              var l = co(o, t.ch);a = l % 2 ? "right" : "left";
            }var s = nt(i.map, t.ch, a);return s.offset = "right" == s.collapse ? s.end : s.start, s;
          }function ae(e, t) {
            return t && (e.bad = !0), e;
          }function le(e, t, n) {
            var r;if (t == e.display.lineDiv) {
              if (r = e.display.lineDiv.childNodes[n], !r) return ae(e.clipPos(Bo(e.display.viewTo - 1)), !0);t = null, n = 0;
            } else for (r = t;; r = r.parentNode) {
              if (!r || r == e.display.lineDiv) return null;if (r.parentNode && r.parentNode == e.display.lineDiv) break;
            }for (var i = 0; i < e.display.view.length; i++) {
              var o = e.display.view[i];if (o.node == r) return se(o, t, n);
            }
          }function se(e, t, n) {
            function r(t, n, r) {
              for (var i = -1; i < (u ? u.length : 0); i++) {
                for (var o = 0 > i ? c.map : u[i], a = 0; a < o.length; a += 3) {
                  var l = o[a + 2];if (l == t || l == n) {
                    var s = ti(0 > i ? e.line : e.rest[i]),
                        f = o[a] + r;return (0 > r || l != t) && (f = o[a + (r ? 1 : 0)]), Bo(s, f);
                  }
                }
              }
            }var i = e.text.firstChild,
                o = !1;if (!t || !Va(i, t)) return ae(Bo(ti(e.line), 0), !0);if (t == i && (o = !0, t = i.childNodes[n], n = 0, !t)) {
              var a = e.rest ? Ii(e.rest) : e.line;return ae(Bo(ti(a), a.text.length), o);
            }var l = 3 == t.nodeType ? t : null,
                s = t;for (l || 1 != t.childNodes.length || 3 != t.firstChild.nodeType || (l = t.firstChild, n && (n = l.nodeValue.length)); s.parentNode != i;) {
              s = s.parentNode;
            }var c = e.measure,
                u = c.maps,
                f = r(l, s, n);if (f) return ae(f, o);for (var h = s.nextSibling, d = l ? l.nodeValue.length - n : 0; h; h = h.nextSibling) {
              if (f = r(h, h.firstChild, 0)) return ae(Bo(f.line, f.ch - d), o);d += h.textContent.length;
            }for (var p = s.previousSibling, d = n; p; p = p.previousSibling) {
              if (f = r(p, p.firstChild, -1)) return ae(Bo(f.line, f.ch + d), o);d += h.textContent.length;
            }
          }function ce(e, t, n, r, i) {
            function o(e) {
              return function (t) {
                return t.id == e;
              };
            }function a(t) {
              if (1 == t.nodeType) {
                var n = t.getAttribute("cm-text");if (null != n) return "" == n && (n = t.textContent.replace(/\u200b/g, "")), void (l += n);var u,
                    f = t.getAttribute("cm-marker");if (f) {
                  var h = e.findMarks(Bo(r, 0), Bo(i + 1, 0), o(+f));return void (h.length && (u = h[0].find()) && (l += Jr(e.doc, u.from, u.to).join(c)));
                }if ("false" == t.getAttribute("contenteditable")) return;for (var d = 0; d < t.childNodes.length; d++) {
                  a(t.childNodes[d]);
                }/^(pre|div|p)$/i.test(t.nodeName) && (s = !0);
              } else if (3 == t.nodeType) {
                var p = t.nodeValue;if (!p) return;s && (l += c, s = !1), l += p;
              }
            }for (var l = "", s = !1, c = e.doc.lineSeparator(); a(t), t != n;) {
              t = t.nextSibling;
            }return l;
          }function ue(e, t) {
            this.ranges = e, this.primIndex = t;
          }function fe(e, t) {
            this.anchor = e, this.head = t;
          }function he(e, t) {
            var n = e[t];e.sort(function (e, t) {
              return _o(e.from(), t.from());
            }), t = Pi(e, n);for (var r = 1; r < e.length; r++) {
              var i = e[r],
                  o = e[r - 1];if (_o(o.to(), i.from()) >= 0) {
                var a = K(o.from(), i.from()),
                    l = V(o.to(), i.to()),
                    s = o.empty() ? i.from() == i.head : o.from() == o.head;t >= r && --t, e.splice(--r, 2, new fe(s ? l : a, s ? a : l));
              }
            }return new ue(e, t);
          }function de(e, t) {
            return new ue([new fe(e, t || e)], 0);
          }function pe(e, t) {
            return Math.max(e.first, Math.min(t, e.first + e.size - 1));
          }function me(e, t) {
            if (t.line < e.first) return Bo(e.first, 0);var n = e.first + e.size - 1;return t.line > n ? Bo(n, Zr(e, n).text.length) : ge(t, Zr(e, t.line).text.length);
          }function ge(e, t) {
            var n = e.ch;return null == n || n > t ? Bo(e.line, t) : 0 > n ? Bo(e.line, 0) : e;
          }function ve(e, t) {
            return t >= e.first && t < e.first + e.size;
          }function ye(e, t) {
            for (var n = [], r = 0; r < t.length; r++) {
              n[r] = me(e, t[r]);
            }return n;
          }function xe(e, t, n, r) {
            if (e.cm && e.cm.display.shift || e.extend) {
              var i = t.anchor;if (r) {
                var o = _o(n, i) < 0;o != _o(r, i) < 0 ? (i = n, n = r) : o != _o(n, r) < 0 && (n = r);
              }return new fe(i, n);
            }return new fe(r || n, n);
          }function be(e, t, n, r) {
            Te(e, new ue([xe(e, e.sel.primary(), t, n)], 0), r);
          }function we(e, t, n) {
            for (var r = [], i = 0; i < e.sel.ranges.length; i++) {
              r[i] = xe(e, e.sel.ranges[i], t[i], null);
            }var o = he(r, e.sel.primIndex);Te(e, o, n);
          }function ke(e, t, n, r) {
            var i = e.sel.ranges.slice(0);i[t] = n, Te(e, he(i, e.sel.primIndex), r);
          }function Se(e, t, n, r) {
            Te(e, de(t, n), r);
          }function Ce(e, t, n) {
            var r = { ranges: t.ranges, update: function update(t) {
                this.ranges = [];for (var n = 0; n < t.length; n++) {
                  this.ranges[n] = new fe(me(e, t[n].anchor), me(e, t[n].head));
                }
              }, origin: n && n.origin };return Pa(e, "beforeSelectionChange", e, r), e.cm && Pa(e.cm, "beforeSelectionChange", e.cm, r), r.ranges != t.ranges ? he(r.ranges, r.ranges.length - 1) : t;
          }function Le(e, t, n) {
            var r = e.history.done,
                i = Ii(r);i && i.ranges ? (r[r.length - 1] = t, Me(e, t, n)) : Te(e, t, n);
          }function Te(e, t, n) {
            Me(e, t, n), fi(e, e.sel, e.cm ? e.cm.curOp.id : NaN, n);
          }function Me(e, t, n) {
            (Ni(e, "beforeSelectionChange") || e.cm && Ni(e.cm, "beforeSelectionChange")) && (t = Ce(e, t, n));var r = n && n.bias || (_o(t.primary().head, e.sel.primary().head) < 0 ? -1 : 1);Ne(e, Ee(e, t, r, !0)), n && n.scroll === !1 || !e.cm || Bn(e.cm);
          }function Ne(e, t) {
            t.equals(e.sel) || (e.sel = t, e.cm && (e.cm.curOp.updateInput = e.cm.curOp.selectionChanged = !0, Mi(e.cm)), Ci(e, "cursorActivity", e));
          }function Ae(e) {
            Ne(e, Ee(e, e.sel, null, !1), Wa);
          }function Ee(e, t, n, r) {
            for (var i, o = 0; o < t.ranges.length; o++) {
              var a = t.ranges[o],
                  l = t.ranges.length == e.sel.ranges.length && e.sel.ranges[o],
                  s = Ie(e, a.anchor, l && l.anchor, n, r),
                  c = Ie(e, a.head, l && l.head, n, r);(i || s != a.anchor || c != a.head) && (i || (i = t.ranges.slice(0, o)), i[o] = new fe(s, c));
            }return i ? he(i, t.primIndex) : t;
          }function Oe(e, t, n, r, i) {
            var o = Zr(e, t.line);if (o.markedSpans) for (var a = 0; a < o.markedSpans.length; ++a) {
              var l = o.markedSpans[a],
                  s = l.marker;if ((null == l.from || (s.inclusiveLeft ? l.from <= t.ch : l.from < t.ch)) && (null == l.to || (s.inclusiveRight ? l.to >= t.ch : l.to > t.ch))) {
                if (i && (Pa(s, "beforeCursorEnter"), s.explicitlyCleared)) {
                  if (o.markedSpans) {
                    --a;continue;
                  }break;
                }if (!s.atomic) continue;if (n) {
                  var c,
                      u = s.find(0 > r ? 1 : -1);if ((0 > r ? s.inclusiveRight : s.inclusiveLeft) && (u = Pe(e, u, -r, u && u.line == t.line ? o : null)), u && u.line == t.line && (c = _o(u, n)) && (0 > r ? 0 > c : c > 0)) return Oe(e, u, t, r, i);
                }var f = s.find(0 > r ? -1 : 1);return (0 > r ? s.inclusiveLeft : s.inclusiveRight) && (f = Pe(e, f, r, f.line == t.line ? o : null)), f ? Oe(e, f, t, r, i) : null;
              }
            }return t;
          }function Ie(e, t, n, r, i) {
            var o = r || 1,
                a = Oe(e, t, n, o, i) || !i && Oe(e, t, n, o, !0) || Oe(e, t, n, -o, i) || !i && Oe(e, t, n, -o, !0);return a ? a : (e.cantEdit = !0, Bo(e.first, 0));
          }function Pe(e, t, n, r) {
            return 0 > n && 0 == t.ch ? t.line > e.first ? me(e, Bo(t.line - 1)) : null : n > 0 && t.ch == (r || Zr(e, t.line)).text.length ? t.line < e.first + e.size - 1 ? Bo(t.line + 1, 0) : null : new Bo(t.line, t.ch + n);
          }function Re(e) {
            e.display.input.showSelection(e.display.input.prepareSelection());
          }function De(e, t) {
            for (var n = e.doc, r = {}, i = r.cursors = document.createDocumentFragment(), o = r.selection = document.createDocumentFragment(), a = 0; a < n.sel.ranges.length; a++) {
              if (t !== !1 || a != n.sel.primIndex) {
                var l = n.sel.ranges[a];if (!(l.from().line >= e.display.viewTo || l.to().line < e.display.viewFrom)) {
                  var s = l.empty();(s || e.options.showCursorWhenSelecting) && He(e, l.head, i), s || We(e, l, o);
                }
              }
            }return r;
          }function He(e, t, n) {
            var r = dt(e, t, "div", null, null, !e.options.singleCursorHeightPerLine),
                i = n.appendChild(ji("div", " ", "CodeMirror-cursor"));if (i.style.left = r.left + "px", i.style.top = r.top + "px", i.style.height = Math.max(0, r.bottom - r.top) * e.options.cursorHeight + "px", r.other) {
              var o = n.appendChild(ji("div", " ", "CodeMirror-cursor CodeMirror-secondarycursor"));o.style.display = "", o.style.left = r.other.left + "px", o.style.top = r.other.top + "px", o.style.height = .85 * (r.other.bottom - r.other.top) + "px";
            }
          }function We(e, t, n) {
            function r(e, t, n, r) {
              0 > t && (t = 0), t = Math.round(t), r = Math.round(r), l.appendChild(ji("div", null, "CodeMirror-selected", "position: absolute; left: " + e + "px; top: " + t + "px; width: " + (null == n ? u - e : n) + "px; height: " + (r - t) + "px"));
            }function i(t, n, i) {
              function o(n, r) {
                return ht(e, Bo(t, n), "div", f, r);
              }var l,
                  s,
                  f = Zr(a, t),
                  h = f.text.length;return eo(ii(f), n || 0, null == i ? h : i, function (e, t, a) {
                var f,
                    d,
                    p,
                    m = o(e, "left");if (e == t) f = m, d = p = m.left;else {
                  if (f = o(t - 1, "right"), "rtl" == a) {
                    var g = m;m = f, f = g;
                  }d = m.left, p = f.right;
                }null == n && 0 == e && (d = c), f.top - m.top > 3 && (r(d, m.top, null, m.bottom), d = c, m.bottom < f.top && r(d, m.bottom, null, f.top)), null == i && t == h && (p = u), (!l || m.top < l.top || m.top == l.top && m.left < l.left) && (l = m), (!s || f.bottom > s.bottom || f.bottom == s.bottom && f.right > s.right) && (s = f), c + 1 > d && (d = c), r(d, f.top, p - d, f.bottom);
              }), { start: l, end: s };
            }var o = e.display,
                a = e.doc,
                l = document.createDocumentFragment(),
                s = Ge(e.display),
                c = s.left,
                u = Math.max(o.sizerWidth, $e(e) - o.sizer.offsetLeft) - s.right,
                f = t.from(),
                h = t.to();if (f.line == h.line) i(f.line, f.ch, h.ch);else {
              var d = Zr(a, f.line),
                  p = Zr(a, h.line),
                  m = yr(d) == yr(p),
                  g = i(f.line, f.ch, m ? d.text.length + 1 : null).end,
                  v = i(h.line, m ? 0 : null, h.ch).start;m && (g.top < v.top - 2 ? (r(g.right, g.top, null, g.bottom), r(c, v.top, v.left, v.bottom)) : r(g.right, g.top, v.left - g.right, g.bottom)), g.bottom < v.top && r(c, g.bottom, null, v.top);
            }n.appendChild(l);
          }function Be(e) {
            if (e.state.focused) {
              var t = e.display;clearInterval(t.blinker);var n = !0;t.cursorDiv.style.visibility = "", e.options.cursorBlinkRate > 0 ? t.blinker = setInterval(function () {
                t.cursorDiv.style.visibility = (n = !n) ? "" : "hidden";
              }, e.options.cursorBlinkRate) : e.options.cursorBlinkRate < 0 && (t.cursorDiv.style.visibility = "hidden");
            }
          }function _e(e, t) {
            e.doc.mode.startState && e.doc.frontier < e.display.viewTo && e.state.highlight.set(t, Bi(Fe, e));
          }function Fe(e) {
            var t = e.doc;if (t.frontier < t.first && (t.frontier = t.first), !(t.frontier >= e.display.viewTo)) {
              var n = +new Date() + e.options.workTime,
                  r = sa(t.mode, je(e, t.frontier)),
                  i = [];t.iter(t.frontier, Math.min(t.first + t.size, e.display.viewTo + 500), function (o) {
                if (t.frontier >= e.display.viewFrom) {
                  var a = o.styles,
                      l = o.text.length > e.options.maxHighlightLength,
                      s = Rr(e, o, l ? sa(t.mode, r) : r, !0);o.styles = s.styles;var c = o.styleClasses,
                      u = s.classes;u ? o.styleClasses = u : c && (o.styleClasses = null);for (var f = !a || a.length != o.styles.length || c != u && (!c || !u || c.bgClass != u.bgClass || c.textClass != u.textClass), h = 0; !f && h < a.length; ++h) {
                    f = a[h] != o.styles[h];
                  }f && i.push(t.frontier), o.stateAfter = l ? r : sa(t.mode, r);
                } else o.text.length <= e.options.maxHighlightLength && Hr(e, o.text, r), o.stateAfter = t.frontier % 5 == 0 ? sa(t.mode, r) : null;return ++t.frontier, +new Date() > n ? (_e(e, e.options.workDelay), !0) : void 0;
              }), i.length && At(e, function () {
                for (var t = 0; t < i.length; t++) {
                  Ht(e, i[t], "text");
                }
              });
            }
          }function ze(e, t, n) {
            for (var r, i, o = e.doc, a = n ? -1 : t - (e.doc.mode.innerMode ? 1e3 : 100), l = t; l > a; --l) {
              if (l <= o.first) return o.first;var s = Zr(o, l - 1);if (s.stateAfter && (!n || l <= o.frontier)) return l;var c = Fa(s.text, null, e.options.tabSize);(null == i || r > c) && (i = l - 1, r = c);
            }return i;
          }function je(e, t, n) {
            var r = e.doc,
                i = e.display;if (!r.mode.startState) return !0;var o = ze(e, t, n),
                a = o > r.first && Zr(r, o - 1).stateAfter;return a = a ? sa(r.mode, a) : ca(r.mode), r.iter(o, t, function (n) {
              Hr(e, n.text, a);var l = o == t - 1 || o % 5 == 0 || o >= i.viewFrom && o < i.viewTo;n.stateAfter = l ? sa(r.mode, a) : null, ++o;
            }), n && (r.frontier = o), a;
          }function Ue(e) {
            return e.lineSpace.offsetTop;
          }function qe(e) {
            return e.mover.offsetHeight - e.lineSpace.offsetHeight;
          }function Ge(e) {
            if (e.cachedPaddingH) return e.cachedPaddingH;var t = qi(e.measure, ji("pre", "x")),
                n = window.getComputedStyle ? window.getComputedStyle(t) : t.currentStyle,
                r = { left: parseInt(n.paddingLeft), right: parseInt(n.paddingRight) };return isNaN(r.left) || isNaN(r.right) || (e.cachedPaddingH = r), r;
          }function Ye(e) {
            return Da - e.display.nativeBarWidth;
          }function $e(e) {
            return e.display.scroller.clientWidth - Ye(e) - e.display.barWidth;
          }function Ve(e) {
            return e.display.scroller.clientHeight - Ye(e) - e.display.barHeight;
          }function Ke(e, t, n) {
            var r = e.options.lineWrapping,
                i = r && $e(e);if (!t.measure.heights || r && t.measure.width != i) {
              var o = t.measure.heights = [];if (r) {
                t.measure.width = i;for (var a = t.text.firstChild.getClientRects(), l = 0; l < a.length - 1; l++) {
                  var s = a[l],
                      c = a[l + 1];Math.abs(s.bottom - c.bottom) > 2 && o.push((s.bottom + c.top) / 2 - n.top);
                }
              }o.push(n.bottom - n.top);
            }
          }function Xe(e, t, n) {
            if (e.line == t) return { map: e.measure.map, cache: e.measure.cache };for (var r = 0; r < e.rest.length; r++) {
              if (e.rest[r] == t) return { map: e.measure.maps[r], cache: e.measure.caches[r] };
            }for (var r = 0; r < e.rest.length; r++) {
              if (ti(e.rest[r]) > n) return { map: e.measure.maps[r], cache: e.measure.caches[r], before: !0 };
            }
          }function Ze(e, t) {
            t = yr(t);var n = ti(t),
                r = e.display.externalMeasured = new Pt(e.doc, t, n);r.lineN = n;var i = r.built = Br(e, r);return r.text = i.pre, qi(e.display.lineMeasure, i.pre), r;
          }function Je(e, t, n, r) {
            return tt(e, et(e, t), n, r);
          }function Qe(e, t) {
            if (t >= e.display.viewFrom && t < e.display.viewTo) return e.display.view[Bt(e, t)];var n = e.display.externalMeasured;return n && t >= n.lineN && t < n.lineN + n.size ? n : void 0;
          }function et(e, t) {
            var n = ti(t),
                r = Qe(e, n);r && !r.text ? r = null : r && r.changes && (D(e, r, n, P(e)), e.curOp.forceUpdate = !0), r || (r = Ze(e, t));var i = Xe(r, t, n);return { line: t, view: r, rect: null, map: i.map, cache: i.cache, before: i.before, hasHeights: !1 };
          }function tt(e, t, n, r, i) {
            t.before && (n = -1);var o,
                a = n + (r || "");return t.cache.hasOwnProperty(a) ? o = t.cache[a] : (t.rect || (t.rect = t.view.text.getBoundingClientRect()), t.hasHeights || (Ke(e, t.view, t.rect), t.hasHeights = !0), o = rt(e, t, n, r), o.bogus || (t.cache[a] = o)), { left: o.left, right: o.right, top: i ? o.rtop : o.top, bottom: i ? o.rbottom : o.bottom };
          }function nt(e, t, n) {
            for (var r, i, o, a, l = 0; l < e.length; l += 3) {
              var s = e[l],
                  c = e[l + 1];if (s > t ? (i = 0, o = 1, a = "left") : c > t ? (i = t - s, o = i + 1) : (l == e.length - 3 || t == c && e[l + 3] > t) && (o = c - s, i = o - 1, t >= c && (a = "right")), null != i) {
                if (r = e[l + 2], s == c && n == (r.insertLeft ? "left" : "right") && (a = n), "left" == n && 0 == i) for (; l && e[l - 2] == e[l - 3] && e[l - 1].insertLeft;) {
                  r = e[(l -= 3) + 2], a = "left";
                }if ("right" == n && i == c - s) for (; l < e.length - 3 && e[l + 3] == e[l + 4] && !e[l + 5].insertLeft;) {
                  r = e[(l += 3) + 2], a = "right";
                }break;
              }
            }return { node: r, start: i, end: o, collapse: a, coverStart: s, coverEnd: c };
          }function rt(e, t, n, r) {
            var i,
                o = nt(t.map, n, r),
                a = o.node,
                l = o.start,
                s = o.end,
                c = o.collapse;if (3 == a.nodeType) {
              for (var u = 0; 4 > u; u++) {
                for (; l && zi(t.line.text.charAt(o.coverStart + l));) {
                  --l;
                }for (; o.coverStart + s < o.coverEnd && zi(t.line.text.charAt(o.coverStart + s));) {
                  ++s;
                }if (xo && 9 > bo && 0 == l && s == o.coverEnd - o.coverStart) i = a.parentNode.getBoundingClientRect();else if (xo && e.options.lineWrapping) {
                  var f = qa(a, l, s).getClientRects();i = f.length ? f["right" == r ? f.length - 1 : 0] : qo;
                } else i = qa(a, l, s).getBoundingClientRect() || qo;if (i.left || i.right || 0 == l) break;s = l, l -= 1, c = "right";
              }xo && 11 > bo && (i = it(e.display.measure, i));
            } else {
              l > 0 && (c = r = "right");var f;i = e.options.lineWrapping && (f = a.getClientRects()).length > 1 ? f["right" == r ? f.length - 1 : 0] : a.getBoundingClientRect();
            }if (xo && 9 > bo && !l && (!i || !i.left && !i.right)) {
              var h = a.parentNode.getClientRects()[0];i = h ? { left: h.left, right: h.left + xt(e.display), top: h.top, bottom: h.bottom } : qo;
            }for (var d = i.top - t.rect.top, p = i.bottom - t.rect.top, m = (d + p) / 2, g = t.view.measure.heights, u = 0; u < g.length - 1 && !(m < g[u]); u++) {}var v = u ? g[u - 1] : 0,
                y = g[u],
                x = { left: ("right" == c ? i.right : i.left) - t.rect.left, right: ("left" == c ? i.left : i.right) - t.rect.left, top: v, bottom: y };return i.left || i.right || (x.bogus = !0), e.options.singleCursorHeightPerLine || (x.rtop = d, x.rbottom = p), x;
          }function it(e, t) {
            if (!window.screen || null == screen.logicalXDPI || screen.logicalXDPI == screen.deviceXDPI || !Qi(e)) return t;var n = screen.logicalXDPI / screen.deviceXDPI,
                r = screen.logicalYDPI / screen.deviceYDPI;return { left: t.left * n, right: t.right * n, top: t.top * r, bottom: t.bottom * r };
          }function ot(e) {
            if (e.measure && (e.measure.cache = {}, e.measure.heights = null, e.rest)) for (var t = 0; t < e.rest.length; t++) {
              e.measure.caches[t] = {};
            }
          }function at(e) {
            e.display.externalMeasure = null, Ui(e.display.lineMeasure);for (var t = 0; t < e.display.view.length; t++) {
              ot(e.display.view[t]);
            }
          }function lt(e) {
            at(e), e.display.cachedCharWidth = e.display.cachedTextHeight = e.display.cachedPaddingH = null, e.options.lineWrapping || (e.display.maxLineChanged = !0), e.display.lineNumChars = null;
          }function st() {
            return window.pageXOffset || (document.documentElement || document.body).scrollLeft;
          }function ct() {
            return window.pageYOffset || (document.documentElement || document.body).scrollTop;
          }function ut(e, t, n, r) {
            if (t.widgets) for (var i = 0; i < t.widgets.length; ++i) {
              if (t.widgets[i].above) {
                var o = Lr(t.widgets[i]);n.top += o, n.bottom += o;
              }
            }if ("line" == r) return n;r || (r = "local");var a = ri(t);if ("local" == r ? a += Ue(e.display) : a -= e.display.viewOffset, "page" == r || "window" == r) {
              var l = e.display.lineSpace.getBoundingClientRect();a += l.top + ("window" == r ? 0 : ct());var s = l.left + ("window" == r ? 0 : st());n.left += s, n.right += s;
            }return n.top += a, n.bottom += a, n;
          }function ft(e, t, n) {
            if ("div" == n) return t;var r = t.left,
                i = t.top;if ("page" == n) r -= st(), i -= ct();else if ("local" == n || !n) {
              var o = e.display.sizer.getBoundingClientRect();r += o.left, i += o.top;
            }var a = e.display.lineSpace.getBoundingClientRect();return { left: r - a.left, top: i - a.top };
          }function ht(e, t, n, r, i) {
            return r || (r = Zr(e.doc, t.line)), ut(e, r, Je(e, r, t.ch, i), n);
          }function dt(e, t, n, r, i, o) {
            function a(t, a) {
              var l = tt(e, i, t, a ? "right" : "left", o);return a ? l.left = l.right : l.right = l.left, ut(e, r, l, n);
            }function l(e, t) {
              var n = s[t],
                  r = n.level % 2;return e == to(n) && t && n.level < s[t - 1].level ? (n = s[--t], e = no(n) - (n.level % 2 ? 0 : 1), r = !0) : e == no(n) && t < s.length - 1 && n.level < s[t + 1].level && (n = s[++t], e = to(n) - n.level % 2, r = !1), r && e == n.to && e > n.from ? a(e - 1) : a(e, r);
            }r = r || Zr(e.doc, t.line), i || (i = et(e, r));var s = ii(r),
                c = t.ch;if (!s) return a(c);var u = co(s, c),
                f = l(c, u);return null != al && (f.other = l(c, al)), f;
          }function pt(e, t) {
            var n = 0,
                t = me(e.doc, t);e.options.lineWrapping || (n = xt(e.display) * t.ch);var r = Zr(e.doc, t.line),
                i = ri(r) + Ue(e.display);return { left: n, right: n, top: i, bottom: i + r.height };
          }function mt(e, t, n, r) {
            var i = Bo(e, t);return i.xRel = r, n && (i.outside = !0), i;
          }function gt(e, t, n) {
            var r = e.doc;if (n += e.display.viewOffset, 0 > n) return mt(r.first, 0, !0, -1);var i = ni(r, n),
                o = r.first + r.size - 1;if (i > o) return mt(r.first + r.size - 1, Zr(r, o).text.length, !0, 1);0 > t && (t = 0);for (var a = Zr(r, i);;) {
              var l = vt(e, a, i, t, n),
                  s = gr(a),
                  c = s && s.find(0, !0);if (!s || !(l.ch > c.from.ch || l.ch == c.from.ch && l.xRel > 0)) return l;i = ti(a = c.to.line);
            }
          }function vt(e, t, n, r, i) {
            function o(r) {
              var i = dt(e, Bo(n, r), "line", t, c);return l = !0, a > i.bottom ? i.left - s : a < i.top ? i.left + s : (l = !1, i.left);
            }var a = i - ri(t),
                l = !1,
                s = 2 * e.display.wrapper.clientWidth,
                c = et(e, t),
                u = ii(t),
                f = t.text.length,
                h = ro(t),
                d = io(t),
                p = o(h),
                m = l,
                g = o(d),
                v = l;if (r > g) return mt(n, d, v, 1);for (;;) {
              if (u ? d == h || d == fo(t, h, 1) : 1 >= d - h) {
                for (var y = p > r || g - r >= r - p ? h : d, x = r - (y == h ? p : g); zi(t.text.charAt(y));) {
                  ++y;
                }var b = mt(n, y, y == h ? m : v, -1 > x ? -1 : x > 1 ? 1 : 0);return b;
              }var w = Math.ceil(f / 2),
                  k = h + w;if (u) {
                k = h;for (var S = 0; w > S; ++S) {
                  k = fo(t, k, 1);
                }
              }var C = o(k);C > r ? (d = k, g = C, (v = l) && (g += 1e3), f = w) : (h = k, p = C, m = l, f -= w);
            }
          }function yt(e) {
            if (null != e.cachedTextHeight) return e.cachedTextHeight;if (null == zo) {
              zo = ji("pre");for (var t = 0; 49 > t; ++t) {
                zo.appendChild(document.createTextNode("x")), zo.appendChild(ji("br"));
              }zo.appendChild(document.createTextNode("x"));
            }qi(e.measure, zo);var n = zo.offsetHeight / 50;return n > 3 && (e.cachedTextHeight = n), Ui(e.measure), n || 1;
          }function xt(e) {
            if (null != e.cachedCharWidth) return e.cachedCharWidth;var t = ji("span", "xxxxxxxxxx"),
                n = ji("pre", [t]);qi(e.measure, n);var r = t.getBoundingClientRect(),
                i = (r.right - r.left) / 10;return i > 2 && (e.cachedCharWidth = i), i || 10;
          }function bt(e) {
            e.curOp = { cm: e, viewChanged: !1, startHeight: e.doc.height, forceUpdate: !1, updateInput: null, typing: !1, changeObjs: null, cursorActivityHandlers: null, cursorActivityCalled: 0, selectionChanged: !1, updateMaxLine: !1, scrollLeft: null, scrollTop: null, scrollToPos: null, focus: !1, id: ++Yo }, Go ? Go.ops.push(e.curOp) : e.curOp.ownsGroup = Go = { ops: [e.curOp], delayedCallbacks: [] };
          }function wt(e) {
            var t = e.delayedCallbacks,
                n = 0;do {
              for (; n < t.length; n++) {
                t[n].call(null);
              }for (var r = 0; r < e.ops.length; r++) {
                var i = e.ops[r];if (i.cursorActivityHandlers) for (; i.cursorActivityCalled < i.cursorActivityHandlers.length;) {
                  i.cursorActivityHandlers[i.cursorActivityCalled++].call(null, i.cm);
                }
              }
            } while (n < t.length);
          }function kt(e) {
            var t = e.curOp,
                n = t.ownsGroup;if (n) try {
              wt(n);
            } finally {
              Go = null;for (var r = 0; r < n.ops.length; r++) {
                n.ops[r].cm.curOp = null;
              }St(n);
            }
          }function St(e) {
            for (var t = e.ops, n = 0; n < t.length; n++) {
              Ct(t[n]);
            }for (var n = 0; n < t.length; n++) {
              Lt(t[n]);
            }for (var n = 0; n < t.length; n++) {
              Tt(t[n]);
            }for (var n = 0; n < t.length; n++) {
              Mt(t[n]);
            }for (var n = 0; n < t.length; n++) {
              Nt(t[n]);
            }
          }function Ct(e) {
            var t = e.cm,
                n = t.display;T(t), e.updateMaxLine && h(t), e.mustUpdate = e.viewChanged || e.forceUpdate || null != e.scrollTop || e.scrollToPos && (e.scrollToPos.from.line < n.viewFrom || e.scrollToPos.to.line >= n.viewTo) || n.maxLineChanged && t.options.lineWrapping, e.update = e.mustUpdate && new L(t, e.mustUpdate && { top: e.scrollTop, ensure: e.scrollToPos }, e.forceUpdate);
          }function Lt(e) {
            e.updatedDisplay = e.mustUpdate && M(e.cm, e.update);
          }function Tt(e) {
            var t = e.cm,
                n = t.display;e.updatedDisplay && O(t), e.barMeasure = p(t), n.maxLineChanged && !t.options.lineWrapping && (e.adjustWidthTo = Je(t, n.maxLine, n.maxLine.text.length).left + 3, t.display.sizerWidth = e.adjustWidthTo, e.barMeasure.scrollWidth = Math.max(n.scroller.clientWidth, n.sizer.offsetLeft + e.adjustWidthTo + Ye(t) + t.display.barWidth), e.maxScrollLeft = Math.max(0, n.sizer.offsetLeft + e.adjustWidthTo - $e(t))), (e.updatedDisplay || e.selectionChanged) && (e.preparedSelection = n.input.prepareSelection(e.focus));
          }function Mt(e) {
            var t = e.cm;null != e.adjustWidthTo && (t.display.sizer.style.minWidth = e.adjustWidthTo + "px", e.maxScrollLeft < t.doc.scrollLeft && on(t, Math.min(t.display.scroller.scrollLeft, e.maxScrollLeft), !0), t.display.maxLineChanged = !1);var n = e.focus && e.focus == Gi() && (!document.hasFocus || document.hasFocus());e.preparedSelection && t.display.input.showSelection(e.preparedSelection, n), (e.updatedDisplay || e.startHeight != t.doc.height) && y(t, e.barMeasure), e.updatedDisplay && E(t, e.barMeasure), e.selectionChanged && Be(t), t.state.focused && e.updateInput && t.display.input.reset(e.typing), n && X(e.cm);
          }function Nt(e) {
            var t = e.cm,
                n = t.display,
                r = t.doc;if (e.updatedDisplay && N(t, e.update), null == n.wheelStartX || null == e.scrollTop && null == e.scrollLeft && !e.scrollToPos || (n.wheelStartX = n.wheelStartY = null), null == e.scrollTop || n.scroller.scrollTop == e.scrollTop && !e.forceScroll || (r.scrollTop = Math.max(0, Math.min(n.scroller.scrollHeight - n.scroller.clientHeight, e.scrollTop)), n.scrollbars.setScrollTop(r.scrollTop), n.scroller.scrollTop = r.scrollTop), null == e.scrollLeft || n.scroller.scrollLeft == e.scrollLeft && !e.forceScroll || (r.scrollLeft = Math.max(0, Math.min(n.scroller.scrollWidth - n.scroller.clientWidth, e.scrollLeft)), n.scrollbars.setScrollLeft(r.scrollLeft), n.scroller.scrollLeft = r.scrollLeft, w(t)), e.scrollToPos) {
              var i = Rn(t, me(r, e.scrollToPos.from), me(r, e.scrollToPos.to), e.scrollToPos.margin);e.scrollToPos.isCursor && t.state.focused && Pn(t, i);
            }var o = e.maybeHiddenMarkers,
                a = e.maybeUnhiddenMarkers;if (o) for (var l = 0; l < o.length; ++l) {
              o[l].lines.length || Pa(o[l], "hide");
            }if (a) for (var l = 0; l < a.length; ++l) {
              a[l].lines.length && Pa(a[l], "unhide");
            }n.wrapper.offsetHeight && (r.scrollTop = t.display.scroller.scrollTop), e.changeObjs && Pa(t, "changes", t, e.changeObjs), e.update && e.update.finish();
          }function At(e, t) {
            if (e.curOp) return t();bt(e);try {
              return t();
            } finally {
              kt(e);
            }
          }function Et(e, t) {
            return function () {
              if (e.curOp) return t.apply(e, arguments);bt(e);try {
                return t.apply(e, arguments);
              } finally {
                kt(e);
              }
            };
          }function Ot(e) {
            return function () {
              if (this.curOp) return e.apply(this, arguments);bt(this);try {
                return e.apply(this, arguments);
              } finally {
                kt(this);
              }
            };
          }function It(e) {
            return function () {
              var t = this.cm;if (!t || t.curOp) return e.apply(this, arguments);bt(t);try {
                return e.apply(this, arguments);
              } finally {
                kt(t);
              }
            };
          }function Pt(e, t, n) {
            this.line = t, this.rest = xr(t), this.size = this.rest ? ti(Ii(this.rest)) - n + 1 : 1, this.node = this.text = null, this.hidden = kr(e, t);
          }function Rt(e, t, n) {
            for (var r, i = [], o = t; n > o; o = r) {
              var a = new Pt(e.doc, Zr(e.doc, o), o);r = o + a.size, i.push(a);
            }return i;
          }function Dt(e, t, n, r) {
            null == t && (t = e.doc.first), null == n && (n = e.doc.first + e.doc.size), r || (r = 0);var i = e.display;if (r && n < i.viewTo && (null == i.updateLineNumbers || i.updateLineNumbers > t) && (i.updateLineNumbers = t), e.curOp.viewChanged = !0, t >= i.viewTo) Wo && br(e.doc, t) < i.viewTo && Wt(e);else if (n <= i.viewFrom) Wo && wr(e.doc, n + r) > i.viewFrom ? Wt(e) : (i.viewFrom += r, i.viewTo += r);else if (t <= i.viewFrom && n >= i.viewTo) Wt(e);else if (t <= i.viewFrom) {
              var o = _t(e, n, n + r, 1);o ? (i.view = i.view.slice(o.index), i.viewFrom = o.lineN, i.viewTo += r) : Wt(e);
            } else if (n >= i.viewTo) {
              var o = _t(e, t, t, -1);o ? (i.view = i.view.slice(0, o.index), i.viewTo = o.lineN) : Wt(e);
            } else {
              var a = _t(e, t, t, -1),
                  l = _t(e, n, n + r, 1);a && l ? (i.view = i.view.slice(0, a.index).concat(Rt(e, a.lineN, l.lineN)).concat(i.view.slice(l.index)), i.viewTo += r) : Wt(e);
            }var s = i.externalMeasured;s && (n < s.lineN ? s.lineN += r : t < s.lineN + s.size && (i.externalMeasured = null));
          }function Ht(e, t, n) {
            e.curOp.viewChanged = !0;var r = e.display,
                i = e.display.externalMeasured;if (i && t >= i.lineN && t < i.lineN + i.size && (r.externalMeasured = null), !(t < r.viewFrom || t >= r.viewTo)) {
              var o = r.view[Bt(e, t)];if (null != o.node) {
                var a = o.changes || (o.changes = []);-1 == Pi(a, n) && a.push(n);
              }
            }
          }function Wt(e) {
            e.display.viewFrom = e.display.viewTo = e.doc.first, e.display.view = [], e.display.viewOffset = 0;
          }function Bt(e, t) {
            if (t >= e.display.viewTo) return null;if (t -= e.display.viewFrom, 0 > t) return null;for (var n = e.display.view, r = 0; r < n.length; r++) {
              if (t -= n[r].size, 0 > t) return r;
            }
          }function _t(e, t, n, r) {
            var i,
                o = Bt(e, t),
                a = e.display.view;if (!Wo || n == e.doc.first + e.doc.size) return { index: o, lineN: n };for (var l = 0, s = e.display.viewFrom; o > l; l++) {
              s += a[l].size;
            }if (s != t) {
              if (r > 0) {
                if (o == a.length - 1) return null;i = s + a[o].size - t, o++;
              } else i = s - t;t += i, n += i;
            }for (; br(e.doc, n) != n;) {
              if (o == (0 > r ? 0 : a.length - 1)) return null;n += r * a[o - (0 > r ? 1 : 0)].size, o += r;
            }return { index: o, lineN: n };
          }function Ft(e, t, n) {
            var r = e.display,
                i = r.view;0 == i.length || t >= r.viewTo || n <= r.viewFrom ? (r.view = Rt(e, t, n), r.viewFrom = t) : (r.viewFrom > t ? r.view = Rt(e, t, r.viewFrom).concat(r.view) : r.viewFrom < t && (r.view = r.view.slice(Bt(e, t))), r.viewFrom = t, r.viewTo < n ? r.view = r.view.concat(Rt(e, r.viewTo, n)) : r.viewTo > n && (r.view = r.view.slice(0, Bt(e, n)))), r.viewTo = n;
          }function zt(e) {
            for (var t = e.display.view, n = 0, r = 0; r < t.length; r++) {
              var i = t[r];i.hidden || i.node && !i.changes || ++n;
            }return n;
          }function jt(e) {
            function t() {
              i.activeTouch && (o = setTimeout(function () {
                i.activeTouch = null;
              }, 1e3), a = i.activeTouch, a.end = +new Date());
            }function n(e) {
              if (1 != e.touches.length) return !1;var t = e.touches[0];return t.radiusX <= 1 && t.radiusY <= 1;
            }function r(e, t) {
              if (null == t.left) return !0;var n = t.left - e.left,
                  r = t.top - e.top;return n * n + r * r > 400;
            }var i = e.display;Ea(i.scroller, "mousedown", Et(e, $t)), xo && 11 > bo ? Ea(i.scroller, "dblclick", Et(e, function (t) {
              if (!Ti(e, t)) {
                var n = Yt(e, t);if (n && !Jt(e, t) && !Gt(e.display, t)) {
                  Ma(t);var r = e.findWordAt(n);be(e.doc, r.anchor, r.head);
                }
              }
            })) : Ea(i.scroller, "dblclick", function (t) {
              Ti(e, t) || Ma(t);
            }), Do || Ea(i.scroller, "contextmenu", function (t) {
              xn(e, t);
            });var o,
                a = { end: 0 };Ea(i.scroller, "touchstart", function (t) {
              if (!Ti(e, t) && !n(t)) {
                clearTimeout(o);var r = +new Date();i.activeTouch = { start: r, moved: !1, prev: r - a.end <= 300 ? a : null }, 1 == t.touches.length && (i.activeTouch.left = t.touches[0].pageX, i.activeTouch.top = t.touches[0].pageY);
              }
            }), Ea(i.scroller, "touchmove", function () {
              i.activeTouch && (i.activeTouch.moved = !0);
            }), Ea(i.scroller, "touchend", function (n) {
              var o = i.activeTouch;if (o && !Gt(i, n) && null != o.left && !o.moved && new Date() - o.start < 300) {
                var a,
                    l = e.coordsChar(i.activeTouch, "page");a = !o.prev || r(o, o.prev) ? new fe(l, l) : !o.prev.prev || r(o, o.prev.prev) ? e.findWordAt(l) : new fe(Bo(l.line, 0), me(e.doc, Bo(l.line + 1, 0))), e.setSelection(a.anchor, a.head), e.focus(), Ma(n);
              }t();
            }), Ea(i.scroller, "touchcancel", t), Ea(i.scroller, "scroll", function () {
              i.scroller.clientHeight && (rn(e, i.scroller.scrollTop), on(e, i.scroller.scrollLeft, !0), Pa(e, "scroll", e));
            }), Ea(i.scroller, "mousewheel", function (t) {
              an(e, t);
            }), Ea(i.scroller, "DOMMouseScroll", function (t) {
              an(e, t);
            }), Ea(i.wrapper, "scroll", function () {
              i.wrapper.scrollTop = i.wrapper.scrollLeft = 0;
            }), i.dragFunctions = { enter: function enter(t) {
                Ti(e, t) || Aa(t);
              }, over: function over(t) {
                Ti(e, t) || (tn(e, t), Aa(t));
              }, start: function start(t) {
                en(e, t);
              }, drop: Et(e, Qt), leave: function leave(t) {
                Ti(e, t) || nn(e);
              } };var l = i.input.getField();Ea(l, "keyup", function (t) {
              pn.call(e, t);
            }), Ea(l, "keydown", Et(e, hn)), Ea(l, "keypress", Et(e, mn)), Ea(l, "focus", Bi(vn, e)), Ea(l, "blur", Bi(yn, e));
          }function Ut(t, n, r) {
            var i = r && r != e.Init;if (!n != !i) {
              var o = t.display.dragFunctions,
                  a = n ? Ea : Ia;a(t.display.scroller, "dragstart", o.start), a(t.display.scroller, "dragenter", o.enter), a(t.display.scroller, "dragover", o.over), a(t.display.scroller, "dragleave", o.leave), a(t.display.scroller, "drop", o.drop);
            }
          }function qt(e) {
            var t = e.display;t.lastWrapHeight == t.wrapper.clientHeight && t.lastWrapWidth == t.wrapper.clientWidth || (t.cachedCharWidth = t.cachedTextHeight = t.cachedPaddingH = null, t.scrollbarsClipped = !1, e.setSize());
          }function Gt(e, t) {
            for (var n = wi(t); n != e.wrapper; n = n.parentNode) {
              if (!n || 1 == n.nodeType && "true" == n.getAttribute("cm-ignore-events") || n.parentNode == e.sizer && n != e.mover) return !0;
            }
          }function Yt(e, t, n, r) {
            var i = e.display;if (!n && "true" == wi(t).getAttribute("cm-not-content")) return null;var o,
                a,
                l = i.lineSpace.getBoundingClientRect();try {
              o = t.clientX - l.left, a = t.clientY - l.top;
            } catch (t) {
              return null;
            }var s,
                c = gt(e, o, a);if (r && 1 == c.xRel && (s = Zr(e.doc, c.line).text).length == c.ch) {
              var u = Fa(s, s.length, e.options.tabSize) - s.length;c = Bo(c.line, Math.max(0, Math.round((o - Ge(e.display).left) / xt(e.display)) - u));
            }return c;
          }function $t(e) {
            var t = this,
                n = t.display;if (!(Ti(t, e) || n.activeTouch && n.input.supportsTouch())) {
              if (n.shift = e.shiftKey, Gt(n, e)) return void (wo || (n.scroller.draggable = !1, setTimeout(function () {
                n.scroller.draggable = !0;
              }, 100)));if (!Jt(t, e)) {
                var r = Yt(t, e);switch (window.focus(), ki(e)) {case 1:
                    t.state.selectingText ? t.state.selectingText(e) : r ? Vt(t, e, r) : wi(e) == n.scroller && Ma(e);break;case 2:
                    wo && (t.state.lastMiddleDown = +new Date()), r && be(t.doc, r), setTimeout(function () {
                      n.input.focus();
                    }, 20), Ma(e);break;case 3:
                    Do ? xn(t, e) : gn(t);}
              }
            }
          }function Vt(e, t, n) {
            xo ? setTimeout(Bi(X, e), 0) : e.curOp.focus = Gi();var r,
                i = +new Date();Uo && Uo.time > i - 400 && 0 == _o(Uo.pos, n) ? r = "triple" : jo && jo.time > i - 400 && 0 == _o(jo.pos, n) ? (r = "double", Uo = { time: i, pos: n }) : (r = "single", jo = { time: i, pos: n });var o,
                a = e.doc.sel,
                l = Eo ? t.metaKey : t.ctrlKey;e.options.dragDrop && el && !e.isReadOnly() && "single" == r && (o = a.contains(n)) > -1 && (_o((o = a.ranges[o]).from(), n) < 0 || n.xRel > 0) && (_o(o.to(), n) > 0 || n.xRel < 0) ? Kt(e, t, n, l) : Xt(e, t, n, r, l);
          }function Kt(e, t, n, r) {
            var i = e.display,
                o = +new Date(),
                a = Et(e, function (l) {
              wo && (i.scroller.draggable = !1), e.state.draggingText = !1, Ia(document, "mouseup", a), Ia(i.scroller, "drop", a), Math.abs(t.clientX - l.clientX) + Math.abs(t.clientY - l.clientY) < 10 && (Ma(l), !r && +new Date() - 200 < o && be(e.doc, n), wo || xo && 9 == bo ? setTimeout(function () {
                document.body.focus(), i.input.focus();
              }, 20) : i.input.focus());
            });wo && (i.scroller.draggable = !0), e.state.draggingText = a, i.scroller.dragDrop && i.scroller.dragDrop(), Ea(document, "mouseup", a), Ea(i.scroller, "drop", a);
          }function Xt(e, t, n, r, i) {
            function o(t) {
              if (0 != _o(g, t)) if (g = t, "rect" == r) {
                for (var i = [], o = e.options.tabSize, a = Fa(Zr(c, n.line).text, n.ch, o), l = Fa(Zr(c, t.line).text, t.ch, o), s = Math.min(a, l), d = Math.max(a, l), p = Math.min(n.line, t.line), m = Math.min(e.lastLine(), Math.max(n.line, t.line)); m >= p; p++) {
                  var v = Zr(c, p).text,
                      y = za(v, s, o);s == d ? i.push(new fe(Bo(p, y), Bo(p, y))) : v.length > y && i.push(new fe(Bo(p, y), Bo(p, za(v, d, o))));
                }i.length || i.push(new fe(n, n)), Te(c, he(h.ranges.slice(0, f).concat(i), f), { origin: "*mouse", scroll: !1 }), e.scrollIntoView(t);
              } else {
                var x = u,
                    b = x.anchor,
                    w = t;if ("single" != r) {
                  if ("double" == r) var k = e.findWordAt(t);else var k = new fe(Bo(t.line, 0), me(c, Bo(t.line + 1, 0)));_o(k.anchor, b) > 0 ? (w = k.head, b = K(x.from(), k.anchor)) : (w = k.anchor, b = V(x.to(), k.head));
                }var i = h.ranges.slice(0);i[f] = new fe(me(c, b), w), Te(c, he(i, f), Ba);
              }
            }function a(t) {
              var n = ++y,
                  i = Yt(e, t, !0, "rect" == r);if (i) if (0 != _o(i, g)) {
                e.curOp.focus = Gi(), o(i);var l = b(s, c);(i.line >= l.to || i.line < l.from) && setTimeout(Et(e, function () {
                  y == n && a(t);
                }), 150);
              } else {
                var u = t.clientY < v.top ? -20 : t.clientY > v.bottom ? 20 : 0;u && setTimeout(Et(e, function () {
                  y == n && (s.scroller.scrollTop += u, a(t));
                }), 50);
              }
            }function l(t) {
              e.state.selectingText = !1, y = 1 / 0, Ma(t), s.input.focus(), Ia(document, "mousemove", x), Ia(document, "mouseup", w), c.history.lastSelOrigin = null;
            }var s = e.display,
                c = e.doc;Ma(t);var u,
                f,
                h = c.sel,
                d = h.ranges;if (i && !t.shiftKey ? (f = c.sel.contains(n), u = f > -1 ? d[f] : new fe(n, n)) : (u = c.sel.primary(), f = c.sel.primIndex), Oo ? t.shiftKey && t.metaKey : t.altKey) r = "rect", i || (u = new fe(n, n)), n = Yt(e, t, !0, !0), f = -1;else if ("double" == r) {
              var p = e.findWordAt(n);u = e.display.shift || c.extend ? xe(c, u, p.anchor, p.head) : p;
            } else if ("triple" == r) {
              var m = new fe(Bo(n.line, 0), me(c, Bo(n.line + 1, 0)));u = e.display.shift || c.extend ? xe(c, u, m.anchor, m.head) : m;
            } else u = xe(c, u, n);i ? -1 == f ? (f = d.length, Te(c, he(d.concat([u]), f), { scroll: !1, origin: "*mouse" })) : d.length > 1 && d[f].empty() && "single" == r && !t.shiftKey ? (Te(c, he(d.slice(0, f).concat(d.slice(f + 1)), 0), { scroll: !1, origin: "*mouse" }), h = c.sel) : ke(c, f, u, Ba) : (f = 0, Te(c, new ue([u], 0), Ba), h = c.sel);var g = n,
                v = s.wrapper.getBoundingClientRect(),
                y = 0,
                x = Et(e, function (e) {
              ki(e) ? a(e) : l(e);
            }),
                w = Et(e, l);e.state.selectingText = w, Ea(document, "mousemove", x), Ea(document, "mouseup", w);
          }function Zt(e, t, n, r) {
            try {
              var i = t.clientX,
                  o = t.clientY;
            } catch (t) {
              return !1;
            }if (i >= Math.floor(e.display.gutters.getBoundingClientRect().right)) return !1;r && Ma(t);var a = e.display,
                l = a.lineDiv.getBoundingClientRect();if (o > l.bottom || !Ni(e, n)) return bi(t);o -= l.top - a.viewOffset;for (var s = 0; s < e.options.gutters.length; ++s) {
              var c = a.gutters.childNodes[s];if (c && c.getBoundingClientRect().right >= i) {
                var u = ni(e.doc, o),
                    f = e.options.gutters[s];return Pa(e, n, e, u, f, t), bi(t);
              }
            }
          }function Jt(e, t) {
            return Zt(e, t, "gutterClick", !0);
          }function Qt(e) {
            var t = this;if (nn(t), !Ti(t, e) && !Gt(t.display, e)) {
              Ma(e), xo && ($o = +new Date());var n = Yt(t, e, !0),
                  r = e.dataTransfer.files;if (n && !t.isReadOnly()) if (r && r.length && window.FileReader && window.File) for (var i = r.length, o = Array(i), a = 0, l = function l(e, r) {
                if (!t.options.allowDropFileTypes || -1 != Pi(t.options.allowDropFileTypes, e.type)) {
                  var l = new FileReader();l.onload = Et(t, function () {
                    var e = l.result;if (/[\x00-\x08\x0e-\x1f]{2}/.test(e) && (e = ""), o[r] = e, ++a == i) {
                      n = me(t.doc, n);var s = { from: n, to: n, text: t.doc.splitLines(o.join(t.doc.lineSeparator())), origin: "paste" };Tn(t.doc, s), Le(t.doc, de(n, Qo(s)));
                    }
                  }), l.readAsText(e);
                }
              }, s = 0; i > s; ++s) {
                l(r[s], s);
              } else {
                if (t.state.draggingText && t.doc.sel.contains(n) > -1) return t.state.draggingText(e), void setTimeout(function () {
                  t.display.input.focus();
                }, 20);try {
                  var o = e.dataTransfer.getData("Text");if (o) {
                    if (t.state.draggingText && !(Eo ? e.altKey : e.ctrlKey)) var c = t.listSelections();if (Me(t.doc, de(n, n)), c) for (var s = 0; s < c.length; ++s) {
                      In(t.doc, "", c[s].anchor, c[s].head, "drag");
                    }t.replaceSelection(o, "around", "paste"), t.display.input.focus();
                  }
                } catch (e) {}
              }
            }
          }function en(e, t) {
            if (xo && (!e.state.draggingText || +new Date() - $o < 100)) return void Aa(t);if (!Ti(e, t) && !Gt(e.display, t) && (t.dataTransfer.setData("Text", e.getSelection()), t.dataTransfer.effectAllowed = "copyMove", t.dataTransfer.setDragImage && !Lo)) {
              var n = ji("img", null, null, "position: fixed; left: 0; top: 0;");n.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", Co && (n.width = n.height = 1, e.display.wrapper.appendChild(n), n._top = n.offsetTop), t.dataTransfer.setDragImage(n, 0, 0), Co && n.parentNode.removeChild(n);
            }
          }function tn(e, t) {
            var n = Yt(e, t);if (n) {
              var r = document.createDocumentFragment();He(e, n, r), e.display.dragCursor || (e.display.dragCursor = ji("div", null, "CodeMirror-cursors CodeMirror-dragcursors"), e.display.lineSpace.insertBefore(e.display.dragCursor, e.display.cursorDiv)), qi(e.display.dragCursor, r);
            }
          }function nn(e) {
            e.display.dragCursor && (e.display.lineSpace.removeChild(e.display.dragCursor), e.display.dragCursor = null);
          }function rn(e, t) {
            Math.abs(e.doc.scrollTop - t) < 2 || (e.doc.scrollTop = t, go || A(e, { top: t }), e.display.scroller.scrollTop != t && (e.display.scroller.scrollTop = t), e.display.scrollbars.setScrollTop(t), go && A(e), _e(e, 100));
          }function on(e, t, n) {
            (n ? t == e.doc.scrollLeft : Math.abs(e.doc.scrollLeft - t) < 2) || (t = Math.min(t, e.display.scroller.scrollWidth - e.display.scroller.clientWidth), e.doc.scrollLeft = t, w(e), e.display.scroller.scrollLeft != t && (e.display.scroller.scrollLeft = t), e.display.scrollbars.setScrollLeft(t));
          }function an(e, t) {
            var n = Xo(t),
                r = n.x,
                i = n.y,
                o = e.display,
                a = o.scroller,
                l = a.scrollWidth > a.clientWidth,
                s = a.scrollHeight > a.clientHeight;if (r && l || i && s) {
              if (i && Eo && wo) e: for (var c = t.target, u = o.view; c != a; c = c.parentNode) {
                for (var f = 0; f < u.length; f++) {
                  if (u[f].node == c) {
                    e.display.currentWheelTarget = c;break e;
                  }
                }
              }if (r && !go && !Co && null != Ko) return i && s && rn(e, Math.max(0, Math.min(a.scrollTop + i * Ko, a.scrollHeight - a.clientHeight))), on(e, Math.max(0, Math.min(a.scrollLeft + r * Ko, a.scrollWidth - a.clientWidth))), (!i || i && s) && Ma(t), void (o.wheelStartX = null);if (i && null != Ko) {
                var h = i * Ko,
                    d = e.doc.scrollTop,
                    p = d + o.wrapper.clientHeight;0 > h ? d = Math.max(0, d + h - 50) : p = Math.min(e.doc.height, p + h + 50), A(e, { top: d, bottom: p });
              }20 > Vo && (null == o.wheelStartX ? (o.wheelStartX = a.scrollLeft, o.wheelStartY = a.scrollTop, o.wheelDX = r, o.wheelDY = i, setTimeout(function () {
                if (null != o.wheelStartX) {
                  var e = a.scrollLeft - o.wheelStartX,
                      t = a.scrollTop - o.wheelStartY,
                      n = t && o.wheelDY && t / o.wheelDY || e && o.wheelDX && e / o.wheelDX;o.wheelStartX = o.wheelStartY = null, n && (Ko = (Ko * Vo + n) / (Vo + 1), ++Vo);
                }
              }, 200)) : (o.wheelDX += r, o.wheelDY += i));
            }
          }function ln(e, t, n) {
            if ("string" == typeof t && (t = ua[t], !t)) return !1;e.display.input.ensurePolled();var r = e.display.shift,
                i = !1;try {
              e.isReadOnly() && (e.state.suppressEdits = !0), n && (e.display.shift = !1), i = t(e) != Ha;
            } finally {
              e.display.shift = r, e.state.suppressEdits = !1;
            }return i;
          }function sn(e, t, n) {
            for (var r = 0; r < e.state.keyMaps.length; r++) {
              var i = ha(t, e.state.keyMaps[r], n, e);if (i) return i;
            }return e.options.extraKeys && ha(t, e.options.extraKeys, n, e) || ha(t, e.options.keyMap, n, e);
          }function cn(e, t, n, r) {
            var i = e.state.keySeq;if (i) {
              if (da(t)) return "handled";Zo.set(50, function () {
                e.state.keySeq == i && (e.state.keySeq = null, e.display.input.reset());
              }), t = i + " " + t;
            }var o = sn(e, t, r);return "multi" == o && (e.state.keySeq = t), "handled" == o && Ci(e, "keyHandled", e, t, n), "handled" != o && "multi" != o || (Ma(n), Be(e)), i && !o && /\'$/.test(t) ? (Ma(n), !0) : !!o;
          }function un(e, t) {
            var n = pa(t, !0);return n ? t.shiftKey && !e.state.keySeq ? cn(e, "Shift-" + n, t, function (t) {
              return ln(e, t, !0);
            }) || cn(e, n, t, function (t) {
              return ("string" == typeof t ? /^go[A-Z]/.test(t) : t.motion) ? ln(e, t) : void 0;
            }) : cn(e, n, t, function (t) {
              return ln(e, t);
            }) : !1;
          }function fn(e, t, n) {
            return cn(e, "'" + n + "'", t, function (t) {
              return ln(e, t, !0);
            });
          }function hn(e) {
            var t = this;if (t.curOp.focus = Gi(), !Ti(t, e)) {
              xo && 11 > bo && 27 == e.keyCode && (e.returnValue = !1);var n = e.keyCode;t.display.shift = 16 == n || e.shiftKey;var r = un(t, e);Co && (Jo = r ? n : null, !r && 88 == n && !rl && (Eo ? e.metaKey : e.ctrlKey) && t.replaceSelection("", null, "cut")), 18 != n || /\bCodeMirror-crosshair\b/.test(t.display.lineDiv.className) || dn(t);
            }
          }function dn(e) {
            function t(e) {
              18 != e.keyCode && e.altKey || (Za(n, "CodeMirror-crosshair"), Ia(document, "keyup", t), Ia(document, "mouseover", t));
            }var n = e.display.lineDiv;Ja(n, "CodeMirror-crosshair"), Ea(document, "keyup", t), Ea(document, "mouseover", t);
          }function pn(e) {
            16 == e.keyCode && (this.doc.sel.shift = !1), Ti(this, e);
          }function mn(e) {
            var t = this;if (!(Gt(t.display, e) || Ti(t, e) || e.ctrlKey && !e.altKey || Eo && e.metaKey)) {
              var n = e.keyCode,
                  r = e.charCode;if (Co && n == Jo) return Jo = null, void Ma(e);if (!Co || e.which && !(e.which < 10) || !un(t, e)) {
                var i = String.fromCharCode(null == r ? n : r);fn(t, e, i) || t.display.input.onKeyPress(e);
              }
            }
          }function gn(e) {
            e.state.delayingBlurEvent = !0, setTimeout(function () {
              e.state.delayingBlurEvent && (e.state.delayingBlurEvent = !1, yn(e));
            }, 100);
          }function vn(e) {
            e.state.delayingBlurEvent && (e.state.delayingBlurEvent = !1), "nocursor" != e.options.readOnly && (e.state.focused || (Pa(e, "focus", e), e.state.focused = !0, Ja(e.display.wrapper, "CodeMirror-focused"), e.curOp || e.display.selForContextMenu == e.doc.sel || (e.display.input.reset(), wo && setTimeout(function () {
              e.display.input.reset(!0);
            }, 20)), e.display.input.receivedFocus()), Be(e));
          }function yn(e) {
            e.state.delayingBlurEvent || (e.state.focused && (Pa(e, "blur", e), e.state.focused = !1, Za(e.display.wrapper, "CodeMirror-focused")), clearInterval(e.display.blinker), setTimeout(function () {
              e.state.focused || (e.display.shift = !1);
            }, 150));
          }function xn(e, t) {
            Gt(e.display, t) || bn(e, t) || Ti(e, t, "contextmenu") || e.display.input.onContextMenu(t);
          }function bn(e, t) {
            return Ni(e, "gutterContextMenu") ? Zt(e, t, "gutterContextMenu", !1) : !1;
          }function wn(e, t) {
            if (_o(e, t.from) < 0) return e;if (_o(e, t.to) <= 0) return Qo(t);var n = e.line + t.text.length - (t.to.line - t.from.line) - 1,
                r = e.ch;return e.line == t.to.line && (r += Qo(t).ch - t.to.ch), Bo(n, r);
          }function kn(e, t) {
            for (var n = [], r = 0; r < e.sel.ranges.length; r++) {
              var i = e.sel.ranges[r];n.push(new fe(wn(i.anchor, t), wn(i.head, t)));
            }return he(n, e.sel.primIndex);
          }function Sn(e, t, n) {
            return e.line == t.line ? Bo(n.line, e.ch - t.ch + n.ch) : Bo(n.line + (e.line - t.line), e.ch);
          }function Cn(e, t, n) {
            for (var r = [], i = Bo(e.first, 0), o = i, a = 0; a < t.length; a++) {
              var l = t[a],
                  s = Sn(l.from, i, o),
                  c = Sn(Qo(l), i, o);if (i = l.to, o = c, "around" == n) {
                var u = e.sel.ranges[a],
                    f = _o(u.head, u.anchor) < 0;r[a] = new fe(f ? c : s, f ? s : c);
              } else r[a] = new fe(s, s);
            }return new ue(r, e.sel.primIndex);
          }function Ln(e, t, n) {
            var r = { canceled: !1, from: t.from, to: t.to, text: t.text, origin: t.origin, cancel: function cancel() {
                this.canceled = !0;
              } };return n && (r.update = function (t, n, r, i) {
              t && (this.from = me(e, t)), n && (this.to = me(e, n)), r && (this.text = r), void 0 !== i && (this.origin = i);
            }), Pa(e, "beforeChange", e, r), e.cm && Pa(e.cm, "beforeChange", e.cm, r), r.canceled ? null : { from: r.from, to: r.to, text: r.text, origin: r.origin };
          }function Tn(e, t, n) {
            if (e.cm) {
              if (!e.cm.curOp) return Et(e.cm, Tn)(e, t, n);if (e.cm.state.suppressEdits) return;
            }if (!(Ni(e, "beforeChange") || e.cm && Ni(e.cm, "beforeChange")) || (t = Ln(e, t, !0))) {
              var r = Ho && !n && sr(e, t.from, t.to);if (r) for (var i = r.length - 1; i >= 0; --i) {
                Mn(e, { from: r[i].from, to: r[i].to, text: i ? [""] : t.text });
              } else Mn(e, t);
            }
          }function Mn(e, t) {
            if (1 != t.text.length || "" != t.text[0] || 0 != _o(t.from, t.to)) {
              var n = kn(e, t);ci(e, t, n, e.cm ? e.cm.curOp.id : NaN), En(e, t, n, or(e, t));var r = [];Kr(e, function (e, n) {
                n || -1 != Pi(r, e.history) || (xi(e.history, t), r.push(e.history)), En(e, t, null, or(e, t));
              });
            }
          }function Nn(e, t, n) {
            if (!e.cm || !e.cm.state.suppressEdits) {
              for (var r, i = e.history, o = e.sel, a = "undo" == t ? i.done : i.undone, l = "undo" == t ? i.undone : i.done, s = 0; s < a.length && (r = a[s], n ? !r.ranges || r.equals(e.sel) : r.ranges); s++) {}if (s != a.length) {
                for (i.lastOrigin = i.lastSelOrigin = null; r = a.pop(), r.ranges;) {
                  if (hi(r, l), n && !r.equals(e.sel)) return void Te(e, r, { clearRedo: !1 });o = r;
                }var c = [];hi(o, l), l.push({ changes: c, generation: i.generation }), i.generation = r.generation || ++i.maxGeneration;for (var u = Ni(e, "beforeChange") || e.cm && Ni(e.cm, "beforeChange"), s = r.changes.length - 1; s >= 0; --s) {
                  var f = r.changes[s];if (f.origin = t, u && !Ln(e, f, !1)) return void (a.length = 0);c.push(ai(e, f));var h = s ? kn(e, f) : Ii(a);En(e, f, h, lr(e, f)), !s && e.cm && e.cm.scrollIntoView({ from: f.from, to: Qo(f) });var d = [];Kr(e, function (e, t) {
                    t || -1 != Pi(d, e.history) || (xi(e.history, f), d.push(e.history)), En(e, f, null, lr(e, f));
                  });
                }
              }
            }
          }function An(e, t) {
            if (0 != t && (e.first += t, e.sel = new ue(Ri(e.sel.ranges, function (e) {
              return new fe(Bo(e.anchor.line + t, e.anchor.ch), Bo(e.head.line + t, e.head.ch));
            }), e.sel.primIndex), e.cm)) {
              Dt(e.cm, e.first, e.first - t, t);for (var n = e.cm.display, r = n.viewFrom; r < n.viewTo; r++) {
                Ht(e.cm, r, "gutter");
              }
            }
          }function En(e, t, n, r) {
            if (e.cm && !e.cm.curOp) return Et(e.cm, En)(e, t, n, r);if (t.to.line < e.first) return void An(e, t.text.length - 1 - (t.to.line - t.from.line));if (!(t.from.line > e.lastLine())) {
              if (t.from.line < e.first) {
                var i = t.text.length - 1 - (e.first - t.from.line);An(e, i), t = { from: Bo(e.first, 0), to: Bo(t.to.line + i, t.to.ch), text: [Ii(t.text)], origin: t.origin };
              }var o = e.lastLine();t.to.line > o && (t = { from: t.from, to: Bo(o, Zr(e, o).text.length), text: [t.text[0]], origin: t.origin }), t.removed = Jr(e, t.from, t.to), n || (n = kn(e, t)), e.cm ? On(e.cm, t, r) : Yr(e, t, r), Me(e, n, Wa);
            }
          }function On(e, t, n) {
            var r = e.doc,
                i = e.display,
                a = t.from,
                l = t.to,
                s = !1,
                c = a.line;e.options.lineWrapping || (c = ti(yr(Zr(r, a.line))), r.iter(c, l.line + 1, function (e) {
              return e == i.maxLine ? (s = !0, !0) : void 0;
            })), r.sel.contains(t.from, t.to) > -1 && Mi(e), Yr(r, t, n, o(e)), e.options.lineWrapping || (r.iter(c, a.line + t.text.length, function (e) {
              var t = f(e);t > i.maxLineLength && (i.maxLine = e, i.maxLineLength = t, i.maxLineChanged = !0, s = !1);
            }), s && (e.curOp.updateMaxLine = !0)), r.frontier = Math.min(r.frontier, a.line), _e(e, 400);var u = t.text.length - (l.line - a.line) - 1;t.full ? Dt(e) : a.line != l.line || 1 != t.text.length || Gr(e.doc, t) ? Dt(e, a.line, l.line + 1, u) : Ht(e, a.line, "text");var h = Ni(e, "changes"),
                d = Ni(e, "change");if (d || h) {
              var p = { from: a, to: l, text: t.text, removed: t.removed, origin: t.origin };d && Ci(e, "change", e, p), h && (e.curOp.changeObjs || (e.curOp.changeObjs = [])).push(p);
            }e.display.selForContextMenu = null;
          }function In(e, t, n, r, i) {
            if (r || (r = n), _o(r, n) < 0) {
              var o = r;r = n, n = o;
            }"string" == typeof t && (t = e.splitLines(t)), Tn(e, { from: n, to: r, text: t, origin: i });
          }function Pn(e, t) {
            if (!Ti(e, "scrollCursorIntoView")) {
              var n = e.display,
                  r = n.sizer.getBoundingClientRect(),
                  i = null;if (t.top + r.top < 0 ? i = !0 : t.bottom + r.top > (window.innerHeight || document.documentElement.clientHeight) && (i = !1), null != i && !Mo) {
                var o = ji("div", "​", null, "position: absolute; top: " + (t.top - n.viewOffset - Ue(e.display)) + "px; height: " + (t.bottom - t.top + Ye(e) + n.barHeight) + "px; left: " + t.left + "px; width: 2px;");e.display.lineSpace.appendChild(o), o.scrollIntoView(i), e.display.lineSpace.removeChild(o);
              }
            }
          }function Rn(e, t, n, r) {
            null == r && (r = 0);for (var i = 0; 5 > i; i++) {
              var o = !1,
                  a = dt(e, t),
                  l = n && n != t ? dt(e, n) : a,
                  s = Hn(e, Math.min(a.left, l.left), Math.min(a.top, l.top) - r, Math.max(a.left, l.left), Math.max(a.bottom, l.bottom) + r),
                  c = e.doc.scrollTop,
                  u = e.doc.scrollLeft;if (null != s.scrollTop && (rn(e, s.scrollTop), Math.abs(e.doc.scrollTop - c) > 1 && (o = !0)), null != s.scrollLeft && (on(e, s.scrollLeft), Math.abs(e.doc.scrollLeft - u) > 1 && (o = !0)), !o) break;
            }return a;
          }function Dn(e, t, n, r, i) {
            var o = Hn(e, t, n, r, i);null != o.scrollTop && rn(e, o.scrollTop), null != o.scrollLeft && on(e, o.scrollLeft);
          }function Hn(e, t, n, r, i) {
            var o = e.display,
                a = yt(e.display);0 > n && (n = 0);var l = e.curOp && null != e.curOp.scrollTop ? e.curOp.scrollTop : o.scroller.scrollTop,
                s = Ve(e),
                c = {};i - n > s && (i = n + s);var u = e.doc.height + qe(o),
                f = a > n,
                h = i > u - a;if (l > n) c.scrollTop = f ? 0 : n;else if (i > l + s) {
              var d = Math.min(n, (h ? u : i) - s);d != l && (c.scrollTop = d);
            }var p = e.curOp && null != e.curOp.scrollLeft ? e.curOp.scrollLeft : o.scroller.scrollLeft,
                m = $e(e) - (e.options.fixedGutter ? o.gutters.offsetWidth : 0),
                g = r - t > m;return g && (r = t + m), 10 > t ? c.scrollLeft = 0 : p > t ? c.scrollLeft = Math.max(0, t - (g ? 0 : 10)) : r > m + p - 3 && (c.scrollLeft = r + (g ? 0 : 10) - m), c;
          }function Wn(e, t, n) {
            null == t && null == n || _n(e), null != t && (e.curOp.scrollLeft = (null == e.curOp.scrollLeft ? e.doc.scrollLeft : e.curOp.scrollLeft) + t), null != n && (e.curOp.scrollTop = (null == e.curOp.scrollTop ? e.doc.scrollTop : e.curOp.scrollTop) + n);
          }function Bn(e) {
            _n(e);var t = e.getCursor(),
                n = t,
                r = t;e.options.lineWrapping || (n = t.ch ? Bo(t.line, t.ch - 1) : t, r = Bo(t.line, t.ch + 1)), e.curOp.scrollToPos = { from: n, to: r, margin: e.options.cursorScrollMargin, isCursor: !0 };
          }function _n(e) {
            var t = e.curOp.scrollToPos;if (t) {
              e.curOp.scrollToPos = null;var n = pt(e, t.from),
                  r = pt(e, t.to),
                  i = Hn(e, Math.min(n.left, r.left), Math.min(n.top, r.top) - t.margin, Math.max(n.right, r.right), Math.max(n.bottom, r.bottom) + t.margin);e.scrollTo(i.scrollLeft, i.scrollTop);
            }
          }function Fn(e, t, n, r) {
            var i,
                o = e.doc;null == n && (n = "add"), "smart" == n && (o.mode.indent ? i = je(e, t) : n = "prev");var a = e.options.tabSize,
                l = Zr(o, t),
                s = Fa(l.text, null, a);l.stateAfter && (l.stateAfter = null);var c,
                u = l.text.match(/^\s*/)[0];if (r || /\S/.test(l.text)) {
              if ("smart" == n && (c = o.mode.indent(i, l.text.slice(u.length), l.text), c == Ha || c > 150)) {
                if (!r) return;n = "prev";
              }
            } else c = 0, n = "not";"prev" == n ? c = t > o.first ? Fa(Zr(o, t - 1).text, null, a) : 0 : "add" == n ? c = s + e.options.indentUnit : "subtract" == n ? c = s - e.options.indentUnit : "number" == typeof n && (c = s + n), c = Math.max(0, c);var f = "",
                h = 0;if (e.options.indentWithTabs) for (var d = Math.floor(c / a); d; --d) {
              h += a, f += "	";
            }if (c > h && (f += Oi(c - h)), f != u) return In(o, f, Bo(t, 0), Bo(t, u.length), "+input"), l.stateAfter = null, !0;for (var d = 0; d < o.sel.ranges.length; d++) {
              var p = o.sel.ranges[d];if (p.head.line == t && p.head.ch < u.length) {
                var h = Bo(t, u.length);ke(o, d, new fe(h, h));break;
              }
            }
          }function zn(e, t, n, r) {
            var i = t,
                o = t;return "number" == typeof t ? o = Zr(e, pe(e, t)) : i = ti(t), null == i ? null : (r(o, i) && e.cm && Ht(e.cm, i, n), o);
          }function jn(e, t) {
            for (var n = e.doc.sel.ranges, r = [], i = 0; i < n.length; i++) {
              for (var o = t(n[i]); r.length && _o(o.from, Ii(r).to) <= 0;) {
                var a = r.pop();if (_o(a.from, o.from) < 0) {
                  o.from = a.from;break;
                }
              }r.push(o);
            }At(e, function () {
              for (var t = r.length - 1; t >= 0; t--) {
                In(e.doc, "", r[t].from, r[t].to, "+delete");
              }Bn(e);
            });
          }function Un(e, t, n, r, i) {
            function o() {
              var t = l + n;return t < e.first || t >= e.first + e.size ? !1 : (l = t, u = Zr(e, t));
            }function a(e) {
              var t = (i ? fo : ho)(u, s, n, !0);if (null == t) {
                if (e || !o()) return !1;s = i ? (0 > n ? io : ro)(u) : 0 > n ? u.text.length : 0;
              } else s = t;return !0;
            }var l = t.line,
                s = t.ch,
                c = n,
                u = Zr(e, l);if ("char" == r) a();else if ("column" == r) a(!0);else if ("word" == r || "group" == r) for (var f = null, h = "group" == r, d = e.cm && e.cm.getHelper(t, "wordChars"), p = !0; !(0 > n) || a(!p); p = !1) {
              var m = u.text.charAt(s) || "\n",
                  g = _i(m, d) ? "w" : h && "\n" == m ? "n" : !h || /\s/.test(m) ? null : "p";if (!h || p || g || (g = "s"), f && f != g) {
                0 > n && (n = 1, a());break;
              }if (g && (f = g), n > 0 && !a(!p)) break;
            }var v = Ie(e, Bo(l, s), t, c, !0);return _o(t, v) || (v.hitSide = !0), v;
          }function qn(e, t, n, r) {
            var i,
                o = e.doc,
                a = t.left;if ("page" == r) {
              var l = Math.min(e.display.wrapper.clientHeight, window.innerHeight || document.documentElement.clientHeight);i = t.top + n * (l - (0 > n ? 1.5 : .5) * yt(e.display));
            } else "line" == r && (i = n > 0 ? t.bottom + 3 : t.top - 3);for (;;) {
              var s = gt(e, a, i);if (!s.outside) break;if (0 > n ? 0 >= i : i >= o.height) {
                s.hitSide = !0;break;
              }i += 5 * n;
            }return s;
          }function Gn(t, n, r, i) {
            e.defaults[t] = n, r && (ta[t] = i ? function (e, t, n) {
              n != na && r(e, t, n);
            } : r);
          }function Yn(e) {
            for (var t, n, r, i, o = e.split(/-(?!$)/), e = o[o.length - 1], a = 0; a < o.length - 1; a++) {
              var l = o[a];if (/^(cmd|meta|m)$/i.test(l)) i = !0;else if (/^a(lt)?$/i.test(l)) t = !0;else if (/^(c|ctrl|control)$/i.test(l)) n = !0;else {
                if (!/^s(hift)$/i.test(l)) throw new Error("Unrecognized modifier name: " + l);r = !0;
              }
            }return t && (e = "Alt-" + e), n && (e = "Ctrl-" + e), i && (e = "Cmd-" + e), r && (e = "Shift-" + e), e;
          }function $n(e) {
            return "string" == typeof e ? fa[e] : e;
          }function Vn(e, t, n, r, i) {
            if (r && r.shared) return Kn(e, t, n, r, i);if (e.cm && !e.cm.curOp) return Et(e.cm, Vn)(e, t, n, r, i);var o = new va(e, i),
                a = _o(t, n);if (r && Wi(r, o, !1), a > 0 || 0 == a && o.clearWhenEmpty !== !1) return o;if (o.replacedWith && (o.collapsed = !0, o.widgetNode = ji("span", [o.replacedWith], "CodeMirror-widget"), r.handleMouseEvents || o.widgetNode.setAttribute("cm-ignore-events", "true"), r.insertLeft && (o.widgetNode.insertLeft = !0)), o.collapsed) {
              if (vr(e, t.line, t, n, o) || t.line != n.line && vr(e, n.line, t, n, o)) throw new Error("Inserting collapsed marker partially overlapping an existing one");Wo = !0;
            }o.addToHistory && ci(e, { from: t, to: n, origin: "markText" }, e.sel, NaN);var l,
                s = t.line,
                c = e.cm;if (e.iter(s, n.line + 1, function (e) {
              c && o.collapsed && !c.options.lineWrapping && yr(e) == c.display.maxLine && (l = !0), o.collapsed && s != t.line && ei(e, 0), nr(e, new Qn(o, s == t.line ? t.ch : null, s == n.line ? n.ch : null)), ++s;
            }), o.collapsed && e.iter(t.line, n.line + 1, function (t) {
              kr(e, t) && ei(t, 0);
            }), o.clearOnEnter && Ea(o, "beforeCursorEnter", function () {
              o.clear();
            }), o.readOnly && (Ho = !0, (e.history.done.length || e.history.undone.length) && e.clearHistory()), o.collapsed && (o.id = ++ga, o.atomic = !0), c) {
              if (l && (c.curOp.updateMaxLine = !0), o.collapsed) Dt(c, t.line, n.line + 1);else if (o.className || o.title || o.startStyle || o.endStyle || o.css) for (var u = t.line; u <= n.line; u++) {
                Ht(c, u, "text");
              }o.atomic && Ae(c.doc), Ci(c, "markerAdded", c, o);
            }return o;
          }function Kn(e, t, n, r, i) {
            r = Wi(r), r.shared = !1;var o = [Vn(e, t, n, r, i)],
                a = o[0],
                l = r.widgetNode;return Kr(e, function (e) {
              l && (r.widgetNode = l.cloneNode(!0)), o.push(Vn(e, me(e, t), me(e, n), r, i));for (var s = 0; s < e.linked.length; ++s) {
                if (e.linked[s].isParent) return;
              }a = Ii(o);
            }), new ya(o, a);
          }function Xn(e) {
            return e.findMarks(Bo(e.first, 0), e.clipPos(Bo(e.lastLine())), function (e) {
              return e.parent;
            });
          }function Zn(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n],
                  i = r.find(),
                  o = e.clipPos(i.from),
                  a = e.clipPos(i.to);if (_o(o, a)) {
                var l = Vn(e, o, a, r.primary, r.primary.type);r.markers.push(l), l.parent = r;
              }
            }
          }function Jn(e) {
            for (var t = 0; t < e.length; t++) {
              var n = e[t],
                  r = [n.primary.doc];Kr(n.primary.doc, function (e) {
                r.push(e);
              });for (var i = 0; i < n.markers.length; i++) {
                var o = n.markers[i];-1 == Pi(r, o.doc) && (o.parent = null, n.markers.splice(i--, 1));
              }
            }
          }function Qn(e, t, n) {
            this.marker = e, this.from = t, this.to = n;
          }function er(e, t) {
            if (e) for (var n = 0; n < e.length; ++n) {
              var r = e[n];if (r.marker == t) return r;
            }
          }function tr(e, t) {
            for (var n, r = 0; r < e.length; ++r) {
              e[r] != t && (n || (n = [])).push(e[r]);
            }return n;
          }function nr(e, t) {
            e.markedSpans = e.markedSpans ? e.markedSpans.concat([t]) : [t], t.marker.attachLine(e);
          }function rr(e, t, n) {
            if (e) for (var r, i = 0; i < e.length; ++i) {
              var o = e[i],
                  a = o.marker,
                  l = null == o.from || (a.inclusiveLeft ? o.from <= t : o.from < t);if (l || o.from == t && "bookmark" == a.type && (!n || !o.marker.insertLeft)) {
                var s = null == o.to || (a.inclusiveRight ? o.to >= t : o.to > t);(r || (r = [])).push(new Qn(a, o.from, s ? null : o.to));
              }
            }return r;
          }function ir(e, t, n) {
            if (e) for (var r, i = 0; i < e.length; ++i) {
              var o = e[i],
                  a = o.marker,
                  l = null == o.to || (a.inclusiveRight ? o.to >= t : o.to > t);if (l || o.from == t && "bookmark" == a.type && (!n || o.marker.insertLeft)) {
                var s = null == o.from || (a.inclusiveLeft ? o.from <= t : o.from < t);(r || (r = [])).push(new Qn(a, s ? null : o.from - t, null == o.to ? null : o.to - t));
              }
            }return r;
          }function or(e, t) {
            if (t.full) return null;var n = ve(e, t.from.line) && Zr(e, t.from.line).markedSpans,
                r = ve(e, t.to.line) && Zr(e, t.to.line).markedSpans;if (!n && !r) return null;var i = t.from.ch,
                o = t.to.ch,
                a = 0 == _o(t.from, t.to),
                l = rr(n, i, a),
                s = ir(r, o, a),
                c = 1 == t.text.length,
                u = Ii(t.text).length + (c ? i : 0);if (l) for (var f = 0; f < l.length; ++f) {
              var h = l[f];if (null == h.to) {
                var d = er(s, h.marker);d ? c && (h.to = null == d.to ? null : d.to + u) : h.to = i;
              }
            }if (s) for (var f = 0; f < s.length; ++f) {
              var h = s[f];if (null != h.to && (h.to += u), null == h.from) {
                var d = er(l, h.marker);d || (h.from = u, c && (l || (l = [])).push(h));
              } else h.from += u, c && (l || (l = [])).push(h);
            }l && (l = ar(l)), s && s != l && (s = ar(s));var p = [l];if (!c) {
              var m,
                  g = t.text.length - 2;if (g > 0 && l) for (var f = 0; f < l.length; ++f) {
                null == l[f].to && (m || (m = [])).push(new Qn(l[f].marker, null, null));
              }for (var f = 0; g > f; ++f) {
                p.push(m);
              }p.push(s);
            }return p;
          }function ar(e) {
            for (var t = 0; t < e.length; ++t) {
              var n = e[t];null != n.from && n.from == n.to && n.marker.clearWhenEmpty !== !1 && e.splice(t--, 1);
            }return e.length ? e : null;
          }function lr(e, t) {
            var n = mi(e, t),
                r = or(e, t);if (!n) return r;if (!r) return n;for (var i = 0; i < n.length; ++i) {
              var o = n[i],
                  a = r[i];if (o && a) e: for (var l = 0; l < a.length; ++l) {
                for (var s = a[l], c = 0; c < o.length; ++c) {
                  if (o[c].marker == s.marker) continue e;
                }o.push(s);
              } else a && (n[i] = a);
            }return n;
          }function sr(e, t, n) {
            var r = null;if (e.iter(t.line, n.line + 1, function (e) {
              if (e.markedSpans) for (var t = 0; t < e.markedSpans.length; ++t) {
                var n = e.markedSpans[t].marker;!n.readOnly || r && -1 != Pi(r, n) || (r || (r = [])).push(n);
              }
            }), !r) return null;for (var i = [{ from: t, to: n }], o = 0; o < r.length; ++o) {
              for (var a = r[o], l = a.find(0), s = 0; s < i.length; ++s) {
                var c = i[s];if (!(_o(c.to, l.from) < 0 || _o(c.from, l.to) > 0)) {
                  var u = [s, 1],
                      f = _o(c.from, l.from),
                      h = _o(c.to, l.to);(0 > f || !a.inclusiveLeft && !f) && u.push({ from: c.from, to: l.from }), (h > 0 || !a.inclusiveRight && !h) && u.push({ from: l.to, to: c.to }), i.splice.apply(i, u), s += u.length - 1;
                }
              }
            }return i;
          }function cr(e) {
            var t = e.markedSpans;if (t) {
              for (var n = 0; n < t.length; ++n) {
                t[n].marker.detachLine(e);
              }e.markedSpans = null;
            }
          }function ur(e, t) {
            if (t) {
              for (var n = 0; n < t.length; ++n) {
                t[n].marker.attachLine(e);
              }e.markedSpans = t;
            }
          }function fr(e) {
            return e.inclusiveLeft ? -1 : 0;
          }function hr(e) {
            return e.inclusiveRight ? 1 : 0;
          }function dr(e, t) {
            var n = e.lines.length - t.lines.length;if (0 != n) return n;var r = e.find(),
                i = t.find(),
                o = _o(r.from, i.from) || fr(e) - fr(t);if (o) return -o;var a = _o(r.to, i.to) || hr(e) - hr(t);return a ? a : t.id - e.id;
          }function pr(e, t) {
            var n,
                r = Wo && e.markedSpans;if (r) for (var i, o = 0; o < r.length; ++o) {
              i = r[o], i.marker.collapsed && null == (t ? i.from : i.to) && (!n || dr(n, i.marker) < 0) && (n = i.marker);
            }return n;
          }function mr(e) {
            return pr(e, !0);
          }function gr(e) {
            return pr(e, !1);
          }function vr(e, t, n, r, i) {
            var o = Zr(e, t),
                a = Wo && o.markedSpans;if (a) for (var l = 0; l < a.length; ++l) {
              var s = a[l];if (s.marker.collapsed) {
                var c = s.marker.find(0),
                    u = _o(c.from, n) || fr(s.marker) - fr(i),
                    f = _o(c.to, r) || hr(s.marker) - hr(i);if (!(u >= 0 && 0 >= f || 0 >= u && f >= 0) && (0 >= u && (s.marker.inclusiveRight && i.inclusiveLeft ? _o(c.to, n) >= 0 : _o(c.to, n) > 0) || u >= 0 && (s.marker.inclusiveRight && i.inclusiveLeft ? _o(c.from, r) <= 0 : _o(c.from, r) < 0))) return !0;
              }
            }
          }function yr(e) {
            for (var t; t = mr(e);) {
              e = t.find(-1, !0).line;
            }return e;
          }function xr(e) {
            for (var t, n; t = gr(e);) {
              e = t.find(1, !0).line, (n || (n = [])).push(e);
            }return n;
          }function br(e, t) {
            var n = Zr(e, t),
                r = yr(n);return n == r ? t : ti(r);
          }function wr(e, t) {
            if (t > e.lastLine()) return t;var n,
                r = Zr(e, t);if (!kr(e, r)) return t;for (; n = gr(r);) {
              r = n.find(1, !0).line;
            }return ti(r) + 1;
          }function kr(e, t) {
            var n = Wo && t.markedSpans;if (n) for (var r, i = 0; i < n.length; ++i) {
              if (r = n[i], r.marker.collapsed) {
                if (null == r.from) return !0;if (!r.marker.widgetNode && 0 == r.from && r.marker.inclusiveLeft && Sr(e, t, r)) return !0;
              }
            }
          }function Sr(e, t, n) {
            if (null == n.to) {
              var r = n.marker.find(1, !0);return Sr(e, r.line, er(r.line.markedSpans, n.marker));
            }if (n.marker.inclusiveRight && n.to == t.text.length) return !0;for (var i, o = 0; o < t.markedSpans.length; ++o) {
              if (i = t.markedSpans[o], i.marker.collapsed && !i.marker.widgetNode && i.from == n.to && (null == i.to || i.to != n.from) && (i.marker.inclusiveLeft || n.marker.inclusiveRight) && Sr(e, t, i)) return !0;
            }
          }function Cr(e, t, n) {
            ri(t) < (e.curOp && e.curOp.scrollTop || e.doc.scrollTop) && Wn(e, null, n);
          }function Lr(e) {
            if (null != e.height) return e.height;var t = e.doc.cm;if (!t) return 0;if (!Va(document.body, e.node)) {
              var n = "position: relative;";e.coverGutter && (n += "margin-left: -" + t.display.gutters.offsetWidth + "px;"), e.noHScroll && (n += "width: " + t.display.wrapper.clientWidth + "px;"), qi(t.display.measure, ji("div", [e.node], null, n));
            }return e.height = e.node.parentNode.offsetHeight;
          }function Tr(e, t, n, r) {
            var i = new xa(e, n, r),
                o = e.cm;return o && i.noHScroll && (o.display.alignWidgets = !0), zn(e, t, "widget", function (t) {
              var n = t.widgets || (t.widgets = []);if (null == i.insertAt ? n.push(i) : n.splice(Math.min(n.length - 1, Math.max(0, i.insertAt)), 0, i), i.line = t, o && !kr(e, t)) {
                var r = ri(t) < e.scrollTop;ei(t, t.height + Lr(i)), r && Wn(o, null, i.height), o.curOp.forceUpdate = !0;
              }return !0;
            }), i;
          }function Mr(e, t, n, r) {
            e.text = t, e.stateAfter && (e.stateAfter = null), e.styles && (e.styles = null), null != e.order && (e.order = null), cr(e), ur(e, n);var i = r ? r(e) : 1;i != e.height && ei(e, i);
          }function Nr(e) {
            e.parent = null, cr(e);
          }function Ar(e, t) {
            if (e) for (;;) {
              var n = e.match(/(?:^|\s+)line-(background-)?(\S+)/);if (!n) break;e = e.slice(0, n.index) + e.slice(n.index + n[0].length);var r = n[1] ? "bgClass" : "textClass";null == t[r] ? t[r] = n[2] : new RegExp("(?:^|s)" + n[2] + "(?:$|s)").test(t[r]) || (t[r] += " " + n[2]);
            }return e;
          }function Er(t, n) {
            if (t.blankLine) return t.blankLine(n);if (t.innerMode) {
              var r = e.innerMode(t, n);return r.mode.blankLine ? r.mode.blankLine(r.state) : void 0;
            }
          }function Or(t, n, r, i) {
            for (var o = 0; 10 > o; o++) {
              i && (i[0] = e.innerMode(t, r).mode);var a = t.token(n, r);if (n.pos > n.start) return a;
            }throw new Error("Mode " + t.name + " failed to advance stream.");
          }function Ir(e, t, n, r) {
            function i(e) {
              return { start: f.start, end: f.pos, string: f.current(), type: o || null, state: e ? sa(a.mode, u) : u };
            }var o,
                a = e.doc,
                l = a.mode;t = me(a, t);var s,
                c = Zr(a, t.line),
                u = je(e, t.line, n),
                f = new ma(c.text, e.options.tabSize);for (r && (s = []); (r || f.pos < t.ch) && !f.eol();) {
              f.start = f.pos, o = Or(l, f, u), r && s.push(i(!0));
            }return r ? s : i();
          }function Pr(e, t, n, r, i, o, a) {
            var l = n.flattenSpans;null == l && (l = e.options.flattenSpans);var s,
                c = 0,
                u = null,
                f = new ma(t, e.options.tabSize),
                h = e.options.addModeClass && [null];for ("" == t && Ar(Er(n, r), o); !f.eol();) {
              if (f.pos > e.options.maxHighlightLength ? (l = !1, a && Hr(e, t, r, f.pos), f.pos = t.length, s = null) : s = Ar(Or(n, f, r, h), o), h) {
                var d = h[0].name;d && (s = "m-" + (s ? d + " " + s : d));
              }if (!l || u != s) {
                for (; c < f.start;) {
                  c = Math.min(f.start, c + 5e4), i(c, u);
                }u = s;
              }f.start = f.pos;
            }for (; c < f.pos;) {
              var p = Math.min(f.pos, c + 5e4);i(p, u), c = p;
            }
          }function Rr(e, t, n, r) {
            var i = [e.state.modeGen],
                o = {};Pr(e, t.text, e.doc.mode, n, function (e, t) {
              i.push(e, t);
            }, o, r);for (var a = 0; a < e.state.overlays.length; ++a) {
              var l = e.state.overlays[a],
                  s = 1,
                  c = 0;Pr(e, t.text, l.mode, !0, function (e, t) {
                for (var n = s; e > c;) {
                  var r = i[s];r > e && i.splice(s, 1, e, i[s + 1], r), s += 2, c = Math.min(e, r);
                }if (t) if (l.opaque) i.splice(n, s - n, e, "cm-overlay " + t), s = n + 2;else for (; s > n; n += 2) {
                  var o = i[n + 1];i[n + 1] = (o ? o + " " : "") + "cm-overlay " + t;
                }
              }, o);
            }return { styles: i, classes: o.bgClass || o.textClass ? o : null };
          }function Dr(e, t, n) {
            if (!t.styles || t.styles[0] != e.state.modeGen) {
              var r = je(e, ti(t)),
                  i = Rr(e, t, t.text.length > e.options.maxHighlightLength ? sa(e.doc.mode, r) : r);t.stateAfter = r, t.styles = i.styles, i.classes ? t.styleClasses = i.classes : t.styleClasses && (t.styleClasses = null), n === e.doc.frontier && e.doc.frontier++;
            }return t.styles;
          }function Hr(e, t, n, r) {
            var i = e.doc.mode,
                o = new ma(t, e.options.tabSize);for (o.start = o.pos = r || 0, "" == t && Er(i, n); !o.eol();) {
              Or(i, o, n), o.start = o.pos;
            }
          }function Wr(e, t) {
            if (!e || /^\s*$/.test(e)) return null;var n = t.addModeClass ? ka : wa;return n[e] || (n[e] = e.replace(/\S+/g, "cm-$&"));
          }function Br(e, t) {
            var n = ji("span", null, null, wo ? "padding-right: .1px" : null),
                r = { pre: ji("pre", [n], "CodeMirror-line"), content: n, col: 0, pos: 0, cm: e, splitSpaces: (xo || wo) && e.getOption("lineWrapping") };t.measure = {};for (var i = 0; i <= (t.rest ? t.rest.length : 0); i++) {
              var o,
                  a = i ? t.rest[i - 1] : t.line;r.pos = 0, r.addToken = Fr, Ji(e.display.measure) && (o = ii(a)) && (r.addToken = jr(r.addToken, o)), r.map = [];var l = t != e.display.externalMeasured && ti(a);qr(a, r, Dr(e, a, l)), a.styleClasses && (a.styleClasses.bgClass && (r.bgClass = $i(a.styleClasses.bgClass, r.bgClass || "")), a.styleClasses.textClass && (r.textClass = $i(a.styleClasses.textClass, r.textClass || ""))), 0 == r.map.length && r.map.push(0, 0, r.content.appendChild(Zi(e.display.measure))), 0 == i ? (t.measure.map = r.map, t.measure.cache = {}) : ((t.measure.maps || (t.measure.maps = [])).push(r.map), (t.measure.caches || (t.measure.caches = [])).push({}));
            }if (wo) {
              var s = r.content.lastChild;(/\bcm-tab\b/.test(s.className) || s.querySelector && s.querySelector(".cm-tab")) && (r.content.className = "cm-tab-wrap-hack");
            }return Pa(e, "renderLine", e, t.line, r.pre), r.pre.className && (r.textClass = $i(r.pre.className, r.textClass || "")), r;
          }function _r(e) {
            var t = ji("span", "•", "cm-invalidchar");return t.title = "\\u" + e.charCodeAt(0).toString(16), t.setAttribute("aria-label", t.title), t;
          }function Fr(e, t, n, r, i, o, a) {
            if (t) {
              var l = e.splitSpaces ? t.replace(/ {3,}/g, zr) : t,
                  s = e.cm.state.specialChars,
                  c = !1;if (s.test(t)) for (var u = document.createDocumentFragment(), f = 0;;) {
                s.lastIndex = f;var h = s.exec(t),
                    d = h ? h.index - f : t.length - f;if (d) {
                  var p = document.createTextNode(l.slice(f, f + d));xo && 9 > bo ? u.appendChild(ji("span", [p])) : u.appendChild(p), e.map.push(e.pos, e.pos + d, p), e.col += d, e.pos += d;
                }if (!h) break;if (f += d + 1, "	" == h[0]) {
                  var m = e.cm.options.tabSize,
                      g = m - e.col % m,
                      p = u.appendChild(ji("span", Oi(g), "cm-tab"));p.setAttribute("role", "presentation"), p.setAttribute("cm-text", "	"), e.col += g;
                } else if ("\r" == h[0] || "\n" == h[0]) {
                  var p = u.appendChild(ji("span", "\r" == h[0] ? "␍" : "␤", "cm-invalidchar"));p.setAttribute("cm-text", h[0]), e.col += 1;
                } else {
                  var p = e.cm.options.specialCharPlaceholder(h[0]);p.setAttribute("cm-text", h[0]), xo && 9 > bo ? u.appendChild(ji("span", [p])) : u.appendChild(p), e.col += 1;
                }e.map.push(e.pos, e.pos + 1, p), e.pos++;
              } else {
                e.col += t.length;var u = document.createTextNode(l);e.map.push(e.pos, e.pos + t.length, u), xo && 9 > bo && (c = !0), e.pos += t.length;
              }if (n || r || i || c || a) {
                var v = n || "";r && (v += r), i && (v += i);var y = ji("span", [u], v, a);return o && (y.title = o), e.content.appendChild(y);
              }e.content.appendChild(u);
            }
          }function zr(e) {
            for (var t = " ", n = 0; n < e.length - 2; ++n) {
              t += n % 2 ? " " : " ";
            }return t += " ";
          }function jr(e, t) {
            return function (n, r, i, o, a, l, s) {
              i = i ? i + " cm-force-border" : "cm-force-border";for (var c = n.pos, u = c + r.length;;) {
                for (var f = 0; f < t.length; f++) {
                  var h = t[f];if (h.to > c && h.from <= c) break;
                }if (h.to >= u) return e(n, r, i, o, a, l, s);e(n, r.slice(0, h.to - c), i, o, null, l, s), o = null, r = r.slice(h.to - c), c = h.to;
              }
            };
          }function Ur(e, t, n, r) {
            var i = !r && n.widgetNode;i && e.map.push(e.pos, e.pos + t, i), !r && e.cm.display.input.needsContentAttribute && (i || (i = e.content.appendChild(document.createElement("span"))), i.setAttribute("cm-marker", n.id)), i && (e.cm.display.input.setUneditable(i), e.content.appendChild(i)), e.pos += t;
          }function qr(e, t, n) {
            var r = e.markedSpans,
                i = e.text,
                o = 0;if (r) for (var a, l, s, c, u, f, h, d = i.length, p = 0, m = 1, g = "", v = 0;;) {
              if (v == p) {
                s = c = u = f = l = "", h = null, v = 1 / 0;for (var y, x = [], b = 0; b < r.length; ++b) {
                  var w = r[b],
                      k = w.marker;"bookmark" == k.type && w.from == p && k.widgetNode ? x.push(k) : w.from <= p && (null == w.to || w.to > p || k.collapsed && w.to == p && w.from == p) ? (null != w.to && w.to != p && v > w.to && (v = w.to, c = ""), k.className && (s += " " + k.className), k.css && (l = (l ? l + ";" : "") + k.css), k.startStyle && w.from == p && (u += " " + k.startStyle), k.endStyle && w.to == v && (y || (y = [])).push(k.endStyle, w.to), k.title && !f && (f = k.title), k.collapsed && (!h || dr(h.marker, k) < 0) && (h = w)) : w.from > p && v > w.from && (v = w.from);
                }if (y) for (var b = 0; b < y.length; b += 2) {
                  y[b + 1] == v && (c += " " + y[b]);
                }if (!h || h.from == p) for (var b = 0; b < x.length; ++b) {
                  Ur(t, 0, x[b]);
                }if (h && (h.from || 0) == p) {
                  if (Ur(t, (null == h.to ? d + 1 : h.to) - p, h.marker, null == h.from), null == h.to) return;h.to == p && (h = !1);
                }
              }if (p >= d) break;for (var S = Math.min(d, v);;) {
                if (g) {
                  var C = p + g.length;if (!h) {
                    var L = C > S ? g.slice(0, S - p) : g;t.addToken(t, L, a ? a + s : s, u, p + L.length == v ? c : "", f, l);
                  }if (C >= S) {
                    g = g.slice(S - p), p = S;break;
                  }p = C, u = "";
                }g = i.slice(o, o = n[m++]), a = Wr(n[m++], t.cm.options);
              }
            } else for (var m = 1; m < n.length; m += 2) {
              t.addToken(t, i.slice(o, o = n[m]), Wr(n[m + 1], t.cm.options));
            }
          }function Gr(e, t) {
            return 0 == t.from.ch && 0 == t.to.ch && "" == Ii(t.text) && (!e.cm || e.cm.options.wholeLineUpdateBefore);
          }function Yr(e, t, n, r) {
            function i(e) {
              return n ? n[e] : null;
            }function o(e, n, i) {
              Mr(e, n, i, r), Ci(e, "change", e, t);
            }function a(e, t) {
              for (var n = e, o = []; t > n; ++n) {
                o.push(new ba(c[n], i(n), r));
              }return o;
            }var l = t.from,
                s = t.to,
                c = t.text,
                u = Zr(e, l.line),
                f = Zr(e, s.line),
                h = Ii(c),
                d = i(c.length - 1),
                p = s.line - l.line;if (t.full) e.insert(0, a(0, c.length)), e.remove(c.length, e.size - c.length);else if (Gr(e, t)) {
              var m = a(0, c.length - 1);o(f, f.text, d), p && e.remove(l.line, p), m.length && e.insert(l.line, m);
            } else if (u == f) {
              if (1 == c.length) o(u, u.text.slice(0, l.ch) + h + u.text.slice(s.ch), d);else {
                var m = a(1, c.length - 1);m.push(new ba(h + u.text.slice(s.ch), d, r)), o(u, u.text.slice(0, l.ch) + c[0], i(0)), e.insert(l.line + 1, m);
              }
            } else if (1 == c.length) o(u, u.text.slice(0, l.ch) + c[0] + f.text.slice(s.ch), i(0)), e.remove(l.line + 1, p);else {
              o(u, u.text.slice(0, l.ch) + c[0], i(0)), o(f, h + f.text.slice(s.ch), d);var m = a(1, c.length - 1);p > 1 && e.remove(l.line + 1, p - 1), e.insert(l.line + 1, m);
            }Ci(e, "change", e, t);
          }function $r(e) {
            this.lines = e, this.parent = null;for (var t = 0, n = 0; t < e.length; ++t) {
              e[t].parent = this, n += e[t].height;
            }this.height = n;
          }function Vr(e) {
            this.children = e;for (var t = 0, n = 0, r = 0; r < e.length; ++r) {
              var i = e[r];t += i.chunkSize(), n += i.height, i.parent = this;
            }this.size = t, this.height = n, this.parent = null;
          }function Kr(e, t, n) {
            function r(e, i, o) {
              if (e.linked) for (var a = 0; a < e.linked.length; ++a) {
                var l = e.linked[a];if (l.doc != i) {
                  var s = o && l.sharedHist;n && !s || (t(l.doc, s), r(l.doc, e, s));
                }
              }
            }r(e, null, !0);
          }function Xr(e, t) {
            if (t.cm) throw new Error("This document is already in use.");e.doc = t, t.cm = e, a(e), n(e), e.options.lineWrapping || h(e), e.options.mode = t.modeOption, Dt(e);
          }function Zr(e, t) {
            if (t -= e.first, 0 > t || t >= e.size) throw new Error("There is no line " + (t + e.first) + " in the document.");for (var n = e; !n.lines;) {
              for (var r = 0;; ++r) {
                var i = n.children[r],
                    o = i.chunkSize();if (o > t) {
                  n = i;break;
                }t -= o;
              }
            }return n.lines[t];
          }function Jr(e, t, n) {
            var r = [],
                i = t.line;return e.iter(t.line, n.line + 1, function (e) {
              var o = e.text;i == n.line && (o = o.slice(0, n.ch)), i == t.line && (o = o.slice(t.ch)), r.push(o), ++i;
            }), r;
          }function Qr(e, t, n) {
            var r = [];return e.iter(t, n, function (e) {
              r.push(e.text);
            }), r;
          }function ei(e, t) {
            var n = t - e.height;if (n) for (var r = e; r; r = r.parent) {
              r.height += n;
            }
          }function ti(e) {
            if (null == e.parent) return null;for (var t = e.parent, n = Pi(t.lines, e), r = t.parent; r; t = r, r = r.parent) {
              for (var i = 0; r.children[i] != t; ++i) {
                n += r.children[i].chunkSize();
              }
            }return n + t.first;
          }function ni(e, t) {
            var n = e.first;e: do {
              for (var r = 0; r < e.children.length; ++r) {
                var i = e.children[r],
                    o = i.height;if (o > t) {
                  e = i;continue e;
                }t -= o, n += i.chunkSize();
              }return n;
            } while (!e.lines);for (var r = 0; r < e.lines.length; ++r) {
              var a = e.lines[r],
                  l = a.height;if (l > t) break;t -= l;
            }return n + r;
          }function ri(e) {
            e = yr(e);for (var t = 0, n = e.parent, r = 0; r < n.lines.length; ++r) {
              var i = n.lines[r];if (i == e) break;t += i.height;
            }for (var o = n.parent; o; n = o, o = n.parent) {
              for (var r = 0; r < o.children.length; ++r) {
                var a = o.children[r];if (a == n) break;t += a.height;
              }
            }return t;
          }function ii(e) {
            var t = e.order;return null == t && (t = e.order = ll(e.text)), t;
          }function oi(e) {
            this.done = [], this.undone = [], this.undoDepth = 1 / 0, this.lastModTime = this.lastSelTime = 0, this.lastOp = this.lastSelOp = null, this.lastOrigin = this.lastSelOrigin = null, this.generation = this.maxGeneration = e || 1;
          }function ai(e, t) {
            var n = { from: $(t.from), to: Qo(t), text: Jr(e, t.from, t.to) };return di(e, n, t.from.line, t.to.line + 1), Kr(e, function (e) {
              di(e, n, t.from.line, t.to.line + 1);
            }, !0), n;
          }function li(e) {
            for (; e.length;) {
              var t = Ii(e);if (!t.ranges) break;e.pop();
            }
          }function si(e, t) {
            return t ? (li(e.done), Ii(e.done)) : e.done.length && !Ii(e.done).ranges ? Ii(e.done) : e.done.length > 1 && !e.done[e.done.length - 2].ranges ? (e.done.pop(), Ii(e.done)) : void 0;
          }function ci(e, t, n, r) {
            var i = e.history;i.undone.length = 0;var o,
                a = +new Date();if ((i.lastOp == r || i.lastOrigin == t.origin && t.origin && ("+" == t.origin.charAt(0) && e.cm && i.lastModTime > a - e.cm.options.historyEventDelay || "*" == t.origin.charAt(0))) && (o = si(i, i.lastOp == r))) {
              var l = Ii(o.changes);0 == _o(t.from, t.to) && 0 == _o(t.from, l.to) ? l.to = Qo(t) : o.changes.push(ai(e, t));
            } else {
              var s = Ii(i.done);for (s && s.ranges || hi(e.sel, i.done), o = { changes: [ai(e, t)], generation: i.generation }, i.done.push(o); i.done.length > i.undoDepth;) {
                i.done.shift(), i.done[0].ranges || i.done.shift();
              }
            }i.done.push(n), i.generation = ++i.maxGeneration, i.lastModTime = i.lastSelTime = a, i.lastOp = i.lastSelOp = r, i.lastOrigin = i.lastSelOrigin = t.origin, l || Pa(e, "historyAdded");
          }function ui(e, t, n, r) {
            var i = t.charAt(0);return "*" == i || "+" == i && n.ranges.length == r.ranges.length && n.somethingSelected() == r.somethingSelected() && new Date() - e.history.lastSelTime <= (e.cm ? e.cm.options.historyEventDelay : 500);
          }function fi(e, t, n, r) {
            var i = e.history,
                o = r && r.origin;n == i.lastSelOp || o && i.lastSelOrigin == o && (i.lastModTime == i.lastSelTime && i.lastOrigin == o || ui(e, o, Ii(i.done), t)) ? i.done[i.done.length - 1] = t : hi(t, i.done), i.lastSelTime = +new Date(), i.lastSelOrigin = o, i.lastSelOp = n, r && r.clearRedo !== !1 && li(i.undone);
          }function hi(e, t) {
            var n = Ii(t);n && n.ranges && n.equals(e) || t.push(e);
          }function di(e, t, n, r) {
            var i = t["spans_" + e.id],
                o = 0;e.iter(Math.max(e.first, n), Math.min(e.first + e.size, r), function (n) {
              n.markedSpans && ((i || (i = t["spans_" + e.id] = {}))[o] = n.markedSpans), ++o;
            });
          }function pi(e) {
            if (!e) return null;for (var t, n = 0; n < e.length; ++n) {
              e[n].marker.explicitlyCleared ? t || (t = e.slice(0, n)) : t && t.push(e[n]);
            }return t ? t.length ? t : null : e;
          }function mi(e, t) {
            var n = t["spans_" + e.id];if (!n) return null;for (var r = 0, i = []; r < t.text.length; ++r) {
              i.push(pi(n[r]));
            }return i;
          }function gi(e, t, n) {
            for (var r = 0, i = []; r < e.length; ++r) {
              var o = e[r];if (o.ranges) i.push(n ? ue.prototype.deepCopy.call(o) : o);else {
                var a = o.changes,
                    l = [];i.push({ changes: l });for (var s = 0; s < a.length; ++s) {
                  var c,
                      u = a[s];if (l.push({ from: u.from, to: u.to, text: u.text }), t) for (var f in u) {
                    (c = f.match(/^spans_(\d+)$/)) && Pi(t, Number(c[1])) > -1 && (Ii(l)[f] = u[f], delete u[f]);
                  }
                }
              }
            }return i;
          }function vi(e, t, n, r) {
            n < e.line ? e.line += r : t < e.line && (e.line = t, e.ch = 0);
          }function yi(e, t, n, r) {
            for (var i = 0; i < e.length; ++i) {
              var o = e[i],
                  a = !0;if (o.ranges) {
                o.copied || (o = e[i] = o.deepCopy(), o.copied = !0);for (var l = 0; l < o.ranges.length; l++) {
                  vi(o.ranges[l].anchor, t, n, r), vi(o.ranges[l].head, t, n, r);
                }
              } else {
                for (var l = 0; l < o.changes.length; ++l) {
                  var s = o.changes[l];if (n < s.from.line) s.from = Bo(s.from.line + r, s.from.ch), s.to = Bo(s.to.line + r, s.to.ch);else if (t <= s.to.line) {
                    a = !1;break;
                  }
                }a || (e.splice(0, i + 1), i = 0);
              }
            }
          }function xi(e, t) {
            var n = t.from.line,
                r = t.to.line,
                i = t.text.length - (r - n) - 1;yi(e.done, n, r, i), yi(e.undone, n, r, i);
          }function bi(e) {
            return null != e.defaultPrevented ? e.defaultPrevented : 0 == e.returnValue;
          }function wi(e) {
            return e.target || e.srcElement;
          }function ki(e) {
            var t = e.which;return null == t && (1 & e.button ? t = 1 : 2 & e.button ? t = 3 : 4 & e.button && (t = 2)), Eo && e.ctrlKey && 1 == t && (t = 3), t;
          }function Si(e, t, n) {
            var r = e._handlers && e._handlers[t];return n ? r && r.length > 0 ? r.slice() : Oa : r || Oa;
          }function Ci(e, t) {
            function n(e) {
              return function () {
                e.apply(null, o);
              };
            }var r = Si(e, t, !1);if (r.length) {
              var i,
                  o = Array.prototype.slice.call(arguments, 2);Go ? i = Go.delayedCallbacks : Ra ? i = Ra : (i = Ra = [], setTimeout(Li, 0));for (var a = 0; a < r.length; ++a) {
                i.push(n(r[a]));
              }
            }
          }function Li() {
            var e = Ra;Ra = null;for (var t = 0; t < e.length; ++t) {
              e[t]();
            }
          }function Ti(e, t, n) {
            return "string" == typeof t && (t = { type: t, preventDefault: function preventDefault() {
                this.defaultPrevented = !0;
              } }), Pa(e, n || t.type, e, t), bi(t) || t.codemirrorIgnore;
          }function Mi(e) {
            var t = e._handlers && e._handlers.cursorActivity;if (t) for (var n = e.curOp.cursorActivityHandlers || (e.curOp.cursorActivityHandlers = []), r = 0; r < t.length; ++r) {
              -1 == Pi(n, t[r]) && n.push(t[r]);
            }
          }function Ni(e, t) {
            return Si(e, t).length > 0;
          }function Ai(e) {
            e.prototype.on = function (e, t) {
              Ea(this, e, t);
            }, e.prototype.off = function (e, t) {
              Ia(this, e, t);
            };
          }function Ei() {
            this.id = null;
          }function Oi(e) {
            for (; ja.length <= e;) {
              ja.push(Ii(ja) + " ");
            }return ja[e];
          }function Ii(e) {
            return e[e.length - 1];
          }function Pi(e, t) {
            for (var n = 0; n < e.length; ++n) {
              if (e[n] == t) return n;
            }return -1;
          }function Ri(e, t) {
            for (var n = [], r = 0; r < e.length; r++) {
              n[r] = t(e[r], r);
            }return n;
          }function Di() {}function Hi(e, t) {
            var n;return Object.create ? n = Object.create(e) : (Di.prototype = e, n = new Di()), t && Wi(t, n), n;
          }function Wi(e, t, n) {
            t || (t = {});for (var r in e) {
              !e.hasOwnProperty(r) || n === !1 && t.hasOwnProperty(r) || (t[r] = e[r]);
            }return t;
          }function Bi(e) {
            var t = Array.prototype.slice.call(arguments, 1);return function () {
              return e.apply(null, t);
            };
          }function _i(e, t) {
            return t ? t.source.indexOf("\\w") > -1 && Ya(e) ? !0 : t.test(e) : Ya(e);
          }function Fi(e) {
            for (var t in e) {
              if (e.hasOwnProperty(t) && e[t]) return !1;
            }return !0;
          }function zi(e) {
            return e.charCodeAt(0) >= 768 && $a.test(e);
          }function ji(e, t, n, r) {
            var i = document.createElement(e);if (n && (i.className = n), r && (i.style.cssText = r), "string" == typeof t) i.appendChild(document.createTextNode(t));else if (t) for (var o = 0; o < t.length; ++o) {
              i.appendChild(t[o]);
            }return i;
          }function Ui(e) {
            for (var t = e.childNodes.length; t > 0; --t) {
              e.removeChild(e.firstChild);
            }return e;
          }function qi(e, t) {
            return Ui(e).appendChild(t);
          }function Gi() {
            for (var e = document.activeElement; e && e.root && e.root.activeElement;) {
              e = e.root.activeElement;
            }return e;
          }function Yi(e) {
            return new RegExp("(^|\\s)" + e + "(?:$|\\s)\\s*");
          }function $i(e, t) {
            for (var n = e.split(" "), r = 0; r < n.length; r++) {
              n[r] && !Yi(n[r]).test(t) && (t += " " + n[r]);
            }return t;
          }function Vi(e) {
            if (document.body.getElementsByClassName) for (var t = document.body.getElementsByClassName("CodeMirror"), n = 0; n < t.length; n++) {
              var r = t[n].CodeMirror;r && e(r);
            }
          }function Ki() {
            Qa || (Xi(), Qa = !0);
          }function Xi() {
            var e;Ea(window, "resize", function () {
              null == e && (e = setTimeout(function () {
                e = null, Vi(qt);
              }, 100));
            }), Ea(window, "blur", function () {
              Vi(yn);
            });
          }function Zi(e) {
            if (null == Ka) {
              var t = ji("span", "​");qi(e, ji("span", [t, document.createTextNode("x")])), 0 != e.firstChild.offsetHeight && (Ka = t.offsetWidth <= 1 && t.offsetHeight > 2 && !(xo && 8 > bo));
            }var n = Ka ? ji("span", "​") : ji("span", " ", null, "display: inline-block; width: 1px; margin-right: -1px");return n.setAttribute("cm-text", ""), n;
          }function Ji(e) {
            if (null != Xa) return Xa;var t = qi(e, document.createTextNode("AخA")),
                n = qa(t, 0, 1).getBoundingClientRect();if (!n || n.left == n.right) return !1;var r = qa(t, 1, 2).getBoundingClientRect();return Xa = r.right - n.right < 3;
          }function Qi(e) {
            if (null != il) return il;var t = qi(e, ji("span", "x")),
                n = t.getBoundingClientRect(),
                r = qa(t, 0, 1).getBoundingClientRect();return il = Math.abs(n.left - r.left) > 1;
          }function eo(e, t, n, r) {
            if (!e) return r(t, n, "ltr");for (var i = !1, o = 0; o < e.length; ++o) {
              var a = e[o];(a.from < n && a.to > t || t == n && a.to == t) && (r(Math.max(a.from, t), Math.min(a.to, n), 1 == a.level ? "rtl" : "ltr"), i = !0);
            }i || r(t, n, "ltr");
          }function to(e) {
            return e.level % 2 ? e.to : e.from;
          }function no(e) {
            return e.level % 2 ? e.from : e.to;
          }function ro(e) {
            var t = ii(e);return t ? to(t[0]) : 0;
          }function io(e) {
            var t = ii(e);return t ? no(Ii(t)) : e.text.length;
          }function oo(e, t) {
            var n = Zr(e.doc, t),
                r = yr(n);r != n && (t = ti(r));var i = ii(r),
                o = i ? i[0].level % 2 ? io(r) : ro(r) : 0;return Bo(t, o);
          }function ao(e, t) {
            for (var n, r = Zr(e.doc, t); n = gr(r);) {
              r = n.find(1, !0).line, t = null;
            }var i = ii(r),
                o = i ? i[0].level % 2 ? ro(r) : io(r) : r.text.length;return Bo(null == t ? ti(r) : t, o);
          }function lo(e, t) {
            var n = oo(e, t.line),
                r = Zr(e.doc, n.line),
                i = ii(r);if (!i || 0 == i[0].level) {
              var o = Math.max(0, r.text.search(/\S/)),
                  a = t.line == n.line && t.ch <= o && t.ch;return Bo(n.line, a ? 0 : o);
            }return n;
          }function so(e, t, n) {
            var r = e[0].level;return t == r ? !0 : n == r ? !1 : n > t;
          }function co(e, t) {
            al = null;for (var n, r = 0; r < e.length; ++r) {
              var i = e[r];if (i.from < t && i.to > t) return r;if (i.from == t || i.to == t) {
                if (null != n) return so(e, i.level, e[n].level) ? (i.from != i.to && (al = n), r) : (i.from != i.to && (al = r), n);n = r;
              }
            }return n;
          }function uo(e, t, n, r) {
            if (!r) return t + n;do {
              t += n;
            } while (t > 0 && zi(e.text.charAt(t)));return t;
          }function fo(e, t, n, r) {
            var i = ii(e);if (!i) return ho(e, t, n, r);for (var o = co(i, t), a = i[o], l = uo(e, t, a.level % 2 ? -n : n, r);;) {
              if (l > a.from && l < a.to) return l;if (l == a.from || l == a.to) return co(i, l) == o ? l : (a = i[o += n], n > 0 == a.level % 2 ? a.to : a.from);if (a = i[o += n], !a) return null;l = n > 0 == a.level % 2 ? uo(e, a.to, -1, r) : uo(e, a.from, 1, r);
            }
          }function ho(e, t, n, r) {
            var i = t + n;if (r) for (; i > 0 && zi(e.text.charAt(i));) {
              i += n;
            }return 0 > i || i > e.text.length ? null : i;
          }var po = navigator.userAgent,
              mo = navigator.platform,
              go = /gecko\/\d/i.test(po),
              vo = /MSIE \d/.test(po),
              yo = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(po),
              xo = vo || yo,
              bo = xo && (vo ? document.documentMode || 6 : yo[1]),
              wo = /WebKit\//.test(po),
              ko = wo && /Qt\/\d+\.\d+/.test(po),
              So = /Chrome\//.test(po),
              Co = /Opera\//.test(po),
              Lo = /Apple Computer/.test(navigator.vendor),
              To = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(po),
              Mo = /PhantomJS/.test(po),
              No = /AppleWebKit/.test(po) && /Mobile\/\w+/.test(po),
              Ao = No || /Android|webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(po),
              Eo = No || /Mac/.test(mo),
              Oo = /\bCrOS\b/.test(po),
              Io = /win/i.test(mo),
              Po = Co && po.match(/Version\/(\d*\.\d*)/);Po && (Po = Number(Po[1])), Po && Po >= 15 && (Co = !1, wo = !0);var Ro = Eo && (ko || Co && (null == Po || 12.11 > Po)),
              Do = go || xo && bo >= 9,
              Ho = !1,
              Wo = !1;m.prototype = Wi({ update: function update(e) {
              var t = e.scrollWidth > e.clientWidth + 1,
                  n = e.scrollHeight > e.clientHeight + 1,
                  r = e.nativeBarWidth;if (n) {
                this.vert.style.display = "block", this.vert.style.bottom = t ? r + "px" : "0";var i = e.viewHeight - (t ? r : 0);this.vert.firstChild.style.height = Math.max(0, e.scrollHeight - e.clientHeight + i) + "px";
              } else this.vert.style.display = "", this.vert.firstChild.style.height = "0";if (t) {
                this.horiz.style.display = "block", this.horiz.style.right = n ? r + "px" : "0", this.horiz.style.left = e.barLeft + "px";var o = e.viewWidth - e.barLeft - (n ? r : 0);this.horiz.firstChild.style.width = e.scrollWidth - e.clientWidth + o + "px";
              } else this.horiz.style.display = "", this.horiz.firstChild.style.width = "0";return !this.checkedZeroWidth && e.clientHeight > 0 && (0 == r && this.zeroWidthHack(), this.checkedZeroWidth = !0), { right: n ? r : 0, bottom: t ? r : 0 };
            }, setScrollLeft: function setScrollLeft(e) {
              this.horiz.scrollLeft != e && (this.horiz.scrollLeft = e), this.disableHoriz && this.enableZeroWidthBar(this.horiz, this.disableHoriz);
            }, setScrollTop: function setScrollTop(e) {
              this.vert.scrollTop != e && (this.vert.scrollTop = e), this.disableVert && this.enableZeroWidthBar(this.vert, this.disableVert);
            }, zeroWidthHack: function zeroWidthHack() {
              var e = Eo && !To ? "12px" : "18px";this.horiz.style.height = this.vert.style.width = e, this.horiz.style.pointerEvents = this.vert.style.pointerEvents = "none", this.disableHoriz = new Ei(), this.disableVert = new Ei();
            }, enableZeroWidthBar: function enableZeroWidthBar(e, t) {
              function n() {
                var r = e.getBoundingClientRect(),
                    i = document.elementFromPoint(r.left + 1, r.bottom - 1);i != e ? e.style.pointerEvents = "none" : t.set(1e3, n);
              }e.style.pointerEvents = "auto", t.set(1e3, n);
            }, clear: function clear() {
              var e = this.horiz.parentNode;e.removeChild(this.horiz), e.removeChild(this.vert);
            } }, m.prototype), g.prototype = Wi({ update: function update() {
              return { bottom: 0, right: 0 };
            }, setScrollLeft: function setScrollLeft() {}, setScrollTop: function setScrollTop() {}, clear: function clear() {} }, g.prototype), e.scrollbarModel = { "native": m, "null": g }, L.prototype.signal = function (e, t) {
            Ni(e, t) && this.events.push(arguments);
          }, L.prototype.finish = function () {
            for (var e = 0; e < this.events.length; e++) {
              Pa.apply(null, this.events[e]);
            }
          };var Bo = e.Pos = function (e, t) {
            return this instanceof Bo ? (this.line = e, void (this.ch = t)) : new Bo(e, t);
          },
              _o = e.cmpPos = function (e, t) {
            return e.line - t.line || e.ch - t.ch;
          },
              Fo = null;ne.prototype = Wi({ init: function init(e) {
              function t(e) {
                if (!Ti(r, e)) {
                  if (r.somethingSelected()) Fo = { lineWise: !1, text: r.getSelections() }, n.inaccurateSelection && (n.prevInput = "", n.inaccurateSelection = !1, o.value = Fo.text.join("\n"), Ua(o));else {
                    if (!r.options.lineWiseCopyCut) return;var t = ee(r);Fo = { lineWise: !0, text: t.text }, "cut" == e.type ? r.setSelections(t.ranges, null, Wa) : (n.prevInput = "", o.value = t.text.join("\n"), Ua(o));
                  }"cut" == e.type && (r.state.cutIncoming = !0);
                }
              }var n = this,
                  r = this.cm,
                  i = this.wrapper = re(),
                  o = this.textarea = i.firstChild;e.wrapper.insertBefore(i, e.wrapper.firstChild), No && (o.style.width = "0px"), Ea(o, "input", function () {
                xo && bo >= 9 && n.hasSelection && (n.hasSelection = null), n.poll();
              }), Ea(o, "paste", function (e) {
                Ti(r, e) || J(e, r) || (r.state.pasteIncoming = !0, n.fastPoll());
              }), Ea(o, "cut", t), Ea(o, "copy", t), Ea(e.scroller, "paste", function (t) {
                Gt(e, t) || Ti(r, t) || (r.state.pasteIncoming = !0, n.focus());
              }), Ea(e.lineSpace, "selectstart", function (t) {
                Gt(e, t) || Ma(t);
              }), Ea(o, "compositionstart", function () {
                var e = r.getCursor("from");n.composing && n.composing.range.clear(), n.composing = { start: e, range: r.markText(e, r.getCursor("to"), { className: "CodeMirror-composing" }) };
              }), Ea(o, "compositionend", function () {
                n.composing && (n.poll(), n.composing.range.clear(), n.composing = null);
              });
            }, prepareSelection: function prepareSelection() {
              var e = this.cm,
                  t = e.display,
                  n = e.doc,
                  r = De(e);if (e.options.moveInputWithCursor) {
                var i = dt(e, n.sel.primary().head, "div"),
                    o = t.wrapper.getBoundingClientRect(),
                    a = t.lineDiv.getBoundingClientRect();r.teTop = Math.max(0, Math.min(t.wrapper.clientHeight - 10, i.top + a.top - o.top)), r.teLeft = Math.max(0, Math.min(t.wrapper.clientWidth - 10, i.left + a.left - o.left));
              }return r;
            }, showSelection: function showSelection(e) {
              var t = this.cm,
                  n = t.display;qi(n.cursorDiv, e.cursors), qi(n.selectionDiv, e.selection), null != e.teTop && (this.wrapper.style.top = e.teTop + "px", this.wrapper.style.left = e.teLeft + "px");
            }, reset: function reset(e) {
              if (!this.contextMenuPending) {
                var t,
                    n,
                    r = this.cm,
                    i = r.doc;if (r.somethingSelected()) {
                  this.prevInput = "";var o = i.sel.primary();t = rl && (o.to().line - o.from().line > 100 || (n = r.getSelection()).length > 1e3);var a = t ? "-" : n || r.getSelection();this.textarea.value = a, r.state.focused && Ua(this.textarea), xo && bo >= 9 && (this.hasSelection = a);
                } else e || (this.prevInput = this.textarea.value = "", xo && bo >= 9 && (this.hasSelection = null));this.inaccurateSelection = t;
              }
            }, getField: function getField() {
              return this.textarea;
            }, supportsTouch: function supportsTouch() {
              return !1;
            }, focus: function focus() {
              if ("nocursor" != this.cm.options.readOnly && (!Ao || Gi() != this.textarea)) try {
                this.textarea.focus();
              } catch (e) {}
            }, blur: function blur() {
              this.textarea.blur();
            }, resetPosition: function resetPosition() {
              this.wrapper.style.top = this.wrapper.style.left = 0;
            }, receivedFocus: function receivedFocus() {
              this.slowPoll();
            }, slowPoll: function slowPoll() {
              var e = this;e.pollingFast || e.polling.set(this.cm.options.pollInterval, function () {
                e.poll(), e.cm.state.focused && e.slowPoll();
              });
            }, fastPoll: function fastPoll() {
              function e() {
                var r = n.poll();r || t ? (n.pollingFast = !1, n.slowPoll()) : (t = !0, n.polling.set(60, e));
              }var t = !1,
                  n = this;n.pollingFast = !0, n.polling.set(20, e);
            }, poll: function poll() {
              var e = this.cm,
                  t = this.textarea,
                  n = this.prevInput;if (this.contextMenuPending || !e.state.focused || nl(t) && !n && !this.composing || e.isReadOnly() || e.options.disableInput || e.state.keySeq) return !1;var r = t.value;if (r == n && !e.somethingSelected()) return !1;if (xo && bo >= 9 && this.hasSelection === r || Eo && /[\uf700-\uf7ff]/.test(r)) return e.display.input.reset(), !1;if (e.doc.sel == e.display.selForContextMenu) {
                var i = r.charCodeAt(0);if (8203 != i || n || (n = "​"), 8666 == i) return this.reset(), this.cm.execCommand("undo");
              }for (var o = 0, a = Math.min(n.length, r.length); a > o && n.charCodeAt(o) == r.charCodeAt(o);) {
                ++o;
              }var l = this;return At(e, function () {
                Z(e, r.slice(o), n.length - o, null, l.composing ? "*compose" : null), r.length > 1e3 || r.indexOf("\n") > -1 ? t.value = l.prevInput = "" : l.prevInput = r, l.composing && (l.composing.range.clear(), l.composing.range = e.markText(l.composing.start, e.getCursor("to"), { className: "CodeMirror-composing" }));
              }), !0;
            }, ensurePolled: function ensurePolled() {
              this.pollingFast && this.poll() && (this.pollingFast = !1);
            }, onKeyPress: function onKeyPress() {
              xo && bo >= 9 && (this.hasSelection = null), this.fastPoll();
            }, onContextMenu: function onContextMenu(e) {
              function t() {
                if (null != a.selectionStart) {
                  var e = i.somethingSelected(),
                      t = "​" + (e ? a.value : "");a.value = "⇚", a.value = t, r.prevInput = e ? "" : "​", a.selectionStart = 1, a.selectionEnd = t.length, o.selForContextMenu = i.doc.sel;
                }
              }function n() {
                if (r.contextMenuPending = !1, r.wrapper.style.cssText = f, a.style.cssText = u, xo && 9 > bo && o.scrollbars.setScrollTop(o.scroller.scrollTop = s), null != a.selectionStart) {
                  (!xo || xo && 9 > bo) && t();var e = 0,
                      n = function n() {
                    o.selForContextMenu == i.doc.sel && 0 == a.selectionStart && a.selectionEnd > 0 && "​" == r.prevInput ? Et(i, ua.selectAll)(i) : e++ < 10 ? o.detectingSelectAll = setTimeout(n, 500) : o.input.reset();
                  };o.detectingSelectAll = setTimeout(n, 200);
                }
              }var r = this,
                  i = r.cm,
                  o = i.display,
                  a = r.textarea,
                  l = Yt(i, e),
                  s = o.scroller.scrollTop;if (l && !Co) {
                var c = i.options.resetSelectionOnContextMenu;c && -1 == i.doc.sel.contains(l) && Et(i, Te)(i.doc, de(l), Wa);var u = a.style.cssText,
                    f = r.wrapper.style.cssText;r.wrapper.style.cssText = "position: absolute";var h = r.wrapper.getBoundingClientRect();if (a.style.cssText = "position: absolute; width: 30px; height: 30px; top: " + (e.clientY - h.top - 5) + "px; left: " + (e.clientX - h.left - 5) + "px; z-index: 1000; background: " + (xo ? "rgba(255, 255, 255, .05)" : "transparent") + "; outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);", wo) var d = window.scrollY;if (o.input.focus(), wo && window.scrollTo(null, d), o.input.reset(), i.somethingSelected() || (a.value = r.prevInput = " "), r.contextMenuPending = !0, o.selForContextMenu = i.doc.sel, clearTimeout(o.detectingSelectAll), xo && bo >= 9 && t(), Do) {
                  Aa(e);var p = function p() {
                    Ia(window, "mouseup", p), setTimeout(n, 20);
                  };Ea(window, "mouseup", p);
                } else setTimeout(n, 50);
              }
            }, readOnlyChanged: function readOnlyChanged(e) {
              e || this.reset();
            }, setUneditable: Di, needsContentAttribute: !1 }, ne.prototype), ie.prototype = Wi({ init: function init(e) {
              function t(e) {
                if (!Ti(r, e)) {
                  if (r.somethingSelected()) Fo = { lineWise: !1, text: r.getSelections() }, "cut" == e.type && r.replaceSelection("", null, "cut");else {
                    if (!r.options.lineWiseCopyCut) return;var t = ee(r);Fo = { lineWise: !0, text: t.text }, "cut" == e.type && r.operation(function () {
                      r.setSelections(t.ranges, 0, Wa), r.replaceSelection("", null, "cut");
                    });
                  }if (e.clipboardData && !No) e.preventDefault(), e.clipboardData.clearData(), e.clipboardData.setData("text/plain", Fo.text.join("\n"));else {
                    var n = re(),
                        i = n.firstChild;r.display.lineSpace.insertBefore(n, r.display.lineSpace.firstChild), i.value = Fo.text.join("\n");var o = document.activeElement;Ua(i), setTimeout(function () {
                      r.display.lineSpace.removeChild(n), o.focus();
                    }, 50);
                  }
                }
              }var n = this,
                  r = n.cm,
                  i = n.div = e.lineDiv;te(i), Ea(i, "paste", function (e) {
                Ti(r, e) || J(e, r);
              }), Ea(i, "compositionstart", function (e) {
                var t = e.data;if (n.composing = { sel: r.doc.sel, data: t, startData: t }, t) {
                  var i = r.doc.sel.primary(),
                      o = r.getLine(i.head.line),
                      a = o.indexOf(t, Math.max(0, i.head.ch - t.length));a > -1 && a <= i.head.ch && (n.composing.sel = de(Bo(i.head.line, a), Bo(i.head.line, a + t.length)));
                }
              }), Ea(i, "compositionupdate", function (e) {
                n.composing.data = e.data;
              }), Ea(i, "compositionend", function (e) {
                var t = n.composing;t && (e.data == t.startData || /\u200b/.test(e.data) || (t.data = e.data), setTimeout(function () {
                  t.handled || n.applyComposition(t), n.composing == t && (n.composing = null);
                }, 50));
              }), Ea(i, "touchstart", function () {
                n.forceCompositionEnd();
              }), Ea(i, "input", function () {
                n.composing || !r.isReadOnly() && n.pollContent() || At(n.cm, function () {
                  Dt(r);
                });
              }), Ea(i, "copy", t), Ea(i, "cut", t);
            }, prepareSelection: function prepareSelection() {
              var e = De(this.cm, !1);return e.focus = this.cm.state.focused, e;
            }, showSelection: function showSelection(e, t) {
              e && this.cm.display.view.length && ((e.focus || t) && this.showPrimarySelection(), this.showMultipleSelections(e));
            }, showPrimarySelection: function showPrimarySelection() {
              var e = window.getSelection(),
                  t = this.cm.doc.sel.primary(),
                  n = le(this.cm, e.anchorNode, e.anchorOffset),
                  r = le(this.cm, e.focusNode, e.focusOffset);if (!n || n.bad || !r || r.bad || 0 != _o(K(n, r), t.from()) || 0 != _o(V(n, r), t.to())) {
                var i = oe(this.cm, t.from()),
                    o = oe(this.cm, t.to());if (i || o) {
                  var a = this.cm.display.view,
                      l = e.rangeCount && e.getRangeAt(0);if (i) {
                    if (!o) {
                      var s = a[a.length - 1].measure,
                          c = s.maps ? s.maps[s.maps.length - 1] : s.map;o = { node: c[c.length - 1], offset: c[c.length - 2] - c[c.length - 3] };
                    }
                  } else i = { node: a[0].measure.map[2], offset: 0 };try {
                    var u = qa(i.node, i.offset, o.offset, o.node);
                  } catch (f) {}u && (!go && this.cm.state.focused ? (e.collapse(i.node, i.offset), u.collapsed || e.addRange(u)) : (e.removeAllRanges(), e.addRange(u)), l && null == e.anchorNode ? e.addRange(l) : go && this.startGracePeriod()), this.rememberSelection();
                }
              }
            }, startGracePeriod: function startGracePeriod() {
              var e = this;clearTimeout(this.gracePeriod), this.gracePeriod = setTimeout(function () {
                e.gracePeriod = !1, e.selectionChanged() && e.cm.operation(function () {
                  e.cm.curOp.selectionChanged = !0;
                });
              }, 20);
            }, showMultipleSelections: function showMultipleSelections(e) {
              qi(this.cm.display.cursorDiv, e.cursors), qi(this.cm.display.selectionDiv, e.selection);
            }, rememberSelection: function rememberSelection() {
              var e = window.getSelection();this.lastAnchorNode = e.anchorNode, this.lastAnchorOffset = e.anchorOffset, this.lastFocusNode = e.focusNode, this.lastFocusOffset = e.focusOffset;
            }, selectionInEditor: function selectionInEditor() {
              var e = window.getSelection();if (!e.rangeCount) return !1;var t = e.getRangeAt(0).commonAncestorContainer;return Va(this.div, t);
            }, focus: function focus() {
              "nocursor" != this.cm.options.readOnly && this.div.focus();
            }, blur: function blur() {
              this.div.blur();
            }, getField: function getField() {
              return this.div;
            }, supportsTouch: function supportsTouch() {
              return !0;
            }, receivedFocus: function receivedFocus() {
              function e() {
                t.cm.state.focused && (t.pollSelection(), t.polling.set(t.cm.options.pollInterval, e));
              }var t = this;this.selectionInEditor() ? this.pollSelection() : At(this.cm, function () {
                t.cm.curOp.selectionChanged = !0;
              }), this.polling.set(this.cm.options.pollInterval, e);
            }, selectionChanged: function selectionChanged() {
              var e = window.getSelection();return e.anchorNode != this.lastAnchorNode || e.anchorOffset != this.lastAnchorOffset || e.focusNode != this.lastFocusNode || e.focusOffset != this.lastFocusOffset;
            }, pollSelection: function pollSelection() {
              if (!this.composing && !this.gracePeriod && this.selectionChanged()) {
                var e = window.getSelection(),
                    t = this.cm;this.rememberSelection();var n = le(t, e.anchorNode, e.anchorOffset),
                    r = le(t, e.focusNode, e.focusOffset);n && r && At(t, function () {
                  Te(t.doc, de(n, r), Wa), (n.bad || r.bad) && (t.curOp.selectionChanged = !0);
                });
              }
            }, pollContent: function pollContent() {
              var e = this.cm,
                  t = e.display,
                  n = e.doc.sel.primary(),
                  r = n.from(),
                  i = n.to();if (r.line < t.viewFrom || i.line > t.viewTo - 1) return !1;var o;if (r.line == t.viewFrom || 0 == (o = Bt(e, r.line))) var a = ti(t.view[0].line),
                  l = t.view[0].node;else var a = ti(t.view[o].line),
                  l = t.view[o - 1].node.nextSibling;var s = Bt(e, i.line);if (s == t.view.length - 1) var c = t.viewTo - 1,
                  u = t.lineDiv.lastChild;else var c = ti(t.view[s + 1].line) - 1,
                  u = t.view[s + 1].node.previousSibling;for (var f = e.doc.splitLines(ce(e, l, u, a, c)), h = Jr(e.doc, Bo(a, 0), Bo(c, Zr(e.doc, c).text.length)); f.length > 1 && h.length > 1;) {
                if (Ii(f) == Ii(h)) f.pop(), h.pop(), c--;else {
                  if (f[0] != h[0]) break;f.shift(), h.shift(), a++;
                }
              }for (var d = 0, p = 0, m = f[0], g = h[0], v = Math.min(m.length, g.length); v > d && m.charCodeAt(d) == g.charCodeAt(d);) {
                ++d;
              }for (var y = Ii(f), x = Ii(h), b = Math.min(y.length - (1 == f.length ? d : 0), x.length - (1 == h.length ? d : 0)); b > p && y.charCodeAt(y.length - p - 1) == x.charCodeAt(x.length - p - 1);) {
                ++p;
              }f[f.length - 1] = y.slice(0, y.length - p), f[0] = f[0].slice(d);var w = Bo(a, d),
                  k = Bo(c, h.length ? Ii(h).length - p : 0);return f.length > 1 || f[0] || _o(w, k) ? (In(e.doc, f, w, k, "+input"), !0) : void 0;
            }, ensurePolled: function ensurePolled() {
              this.forceCompositionEnd();
            }, reset: function reset() {
              this.forceCompositionEnd();
            }, forceCompositionEnd: function forceCompositionEnd() {
              this.composing && !this.composing.handled && (this.applyComposition(this.composing), this.composing.handled = !0, this.div.blur(), this.div.focus());
            }, applyComposition: function applyComposition(e) {
              this.cm.isReadOnly() ? Et(this.cm, Dt)(this.cm) : e.data && e.data != e.startData && Et(this.cm, Z)(this.cm, e.data, 0, e.sel);
            }, setUneditable: function setUneditable(e) {
              e.contentEditable = "false";
            }, onKeyPress: function onKeyPress(e) {
              e.preventDefault(), this.cm.isReadOnly() || Et(this.cm, Z)(this.cm, String.fromCharCode(null == e.charCode ? e.keyCode : e.charCode), 0);
            }, readOnlyChanged: function readOnlyChanged(e) {
              this.div.contentEditable = String("nocursor" != e);
            }, onContextMenu: Di, resetPosition: Di, needsContentAttribute: !0 }, ie.prototype), e.inputStyles = { textarea: ne, contenteditable: ie }, ue.prototype = { primary: function primary() {
              return this.ranges[this.primIndex];
            }, equals: function equals(e) {
              if (e == this) return !0;if (e.primIndex != this.primIndex || e.ranges.length != this.ranges.length) return !1;for (var t = 0; t < this.ranges.length; t++) {
                var n = this.ranges[t],
                    r = e.ranges[t];if (0 != _o(n.anchor, r.anchor) || 0 != _o(n.head, r.head)) return !1;
              }return !0;
            }, deepCopy: function deepCopy() {
              for (var e = [], t = 0; t < this.ranges.length; t++) {
                e[t] = new fe($(this.ranges[t].anchor), $(this.ranges[t].head));
              }return new ue(e, this.primIndex);
            }, somethingSelected: function somethingSelected() {
              for (var e = 0; e < this.ranges.length; e++) {
                if (!this.ranges[e].empty()) return !0;
              }return !1;
            }, contains: function contains(e, t) {
              t || (t = e);for (var n = 0; n < this.ranges.length; n++) {
                var r = this.ranges[n];if (_o(t, r.from()) >= 0 && _o(e, r.to()) <= 0) return n;
              }return -1;
            } }, fe.prototype = { from: function from() {
              return K(this.anchor, this.head);
            }, to: function to() {
              return V(this.anchor, this.head);
            }, empty: function empty() {
              return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch;
            } };var zo,
              jo,
              Uo,
              qo = { left: 0, right: 0, top: 0, bottom: 0 },
              Go = null,
              Yo = 0,
              $o = 0,
              Vo = 0,
              Ko = null;xo ? Ko = -.53 : go ? Ko = 15 : So ? Ko = -.7 : Lo && (Ko = -1 / 3);var Xo = function Xo(e) {
            var t = e.wheelDeltaX,
                n = e.wheelDeltaY;return null == t && e.detail && e.axis == e.HORIZONTAL_AXIS && (t = e.detail), null == n && e.detail && e.axis == e.VERTICAL_AXIS ? n = e.detail : null == n && (n = e.wheelDelta), { x: t, y: n };
          };e.wheelEventPixels = function (e) {
            var t = Xo(e);return t.x *= Ko, t.y *= Ko, t;
          };var Zo = new Ei(),
              Jo = null,
              Qo = e.changeEnd = function (e) {
            return e.text ? Bo(e.from.line + e.text.length - 1, Ii(e.text).length + (1 == e.text.length ? e.from.ch : 0)) : e.to;
          };e.prototype = { constructor: e, focus: function focus() {
              window.focus(), this.display.input.focus();
            }, setOption: function setOption(e, t) {
              var n = this.options,
                  r = n[e];n[e] == t && "mode" != e || (n[e] = t, ta.hasOwnProperty(e) && Et(this, ta[e])(this, t, r));
            }, getOption: function getOption(e) {
              return this.options[e];
            }, getDoc: function getDoc() {
              return this.doc;
            }, addKeyMap: function addKeyMap(e, t) {
              this.state.keyMaps[t ? "push" : "unshift"]($n(e));
            }, removeKeyMap: function removeKeyMap(e) {
              for (var t = this.state.keyMaps, n = 0; n < t.length; ++n) {
                if (t[n] == e || t[n].name == e) return t.splice(n, 1), !0;
              }
            }, addOverlay: Ot(function (t, n) {
              var r = t.token ? t : e.getMode(this.options, t);if (r.startState) throw new Error("Overlays may not be stateful.");this.state.overlays.push({ mode: r, modeSpec: t, opaque: n && n.opaque }), this.state.modeGen++, Dt(this);
            }), removeOverlay: Ot(function (e) {
              for (var t = this.state.overlays, n = 0; n < t.length; ++n) {
                var r = t[n].modeSpec;if (r == e || "string" == typeof e && r.name == e) return t.splice(n, 1), this.state.modeGen++, void Dt(this);
              }
            }), indentLine: Ot(function (e, t, n) {
              "string" != typeof t && "number" != typeof t && (t = null == t ? this.options.smartIndent ? "smart" : "prev" : t ? "add" : "subtract"), ve(this.doc, e) && Fn(this, e, t, n);
            }), indentSelection: Ot(function (e) {
              for (var t = this.doc.sel.ranges, n = -1, r = 0; r < t.length; r++) {
                var i = t[r];if (i.empty()) i.head.line > n && (Fn(this, i.head.line, e, !0), n = i.head.line, r == this.doc.sel.primIndex && Bn(this));else {
                  var o = i.from(),
                      a = i.to(),
                      l = Math.max(n, o.line);n = Math.min(this.lastLine(), a.line - (a.ch ? 0 : 1)) + 1;for (var s = l; n > s; ++s) {
                    Fn(this, s, e);
                  }var c = this.doc.sel.ranges;0 == o.ch && t.length == c.length && c[r].from().ch > 0 && ke(this.doc, r, new fe(o, c[r].to()), Wa);
                }
              }
            }), getTokenAt: function getTokenAt(e, t) {
              return Ir(this, e, t);
            }, getLineTokens: function getLineTokens(e, t) {
              return Ir(this, Bo(e), t, !0);
            }, getTokenTypeAt: function getTokenTypeAt(e) {
              e = me(this.doc, e);var t,
                  n = Dr(this, Zr(this.doc, e.line)),
                  r = 0,
                  i = (n.length - 1) / 2,
                  o = e.ch;if (0 == o) t = n[2];else for (;;) {
                var a = r + i >> 1;if ((a ? n[2 * a - 1] : 0) >= o) i = a;else {
                  if (!(n[2 * a + 1] < o)) {
                    t = n[2 * a + 2];break;
                  }r = a + 1;
                }
              }var l = t ? t.indexOf("cm-overlay ") : -1;return 0 > l ? t : 0 == l ? null : t.slice(0, l - 1);
            }, getModeAt: function getModeAt(t) {
              var n = this.doc.mode;return n.innerMode ? e.innerMode(n, this.getTokenAt(t).state).mode : n;
            }, getHelper: function getHelper(e, t) {
              return this.getHelpers(e, t)[0];
            }, getHelpers: function getHelpers(e, t) {
              var n = [];if (!la.hasOwnProperty(t)) return n;var r = la[t],
                  i = this.getModeAt(e);if ("string" == typeof i[t]) r[i[t]] && n.push(r[i[t]]);else if (i[t]) for (var o = 0; o < i[t].length; o++) {
                var a = r[i[t][o]];a && n.push(a);
              } else i.helperType && r[i.helperType] ? n.push(r[i.helperType]) : r[i.name] && n.push(r[i.name]);for (var o = 0; o < r._global.length; o++) {
                var l = r._global[o];l.pred(i, this) && -1 == Pi(n, l.val) && n.push(l.val);
              }return n;
            }, getStateAfter: function getStateAfter(e, t) {
              var n = this.doc;return e = pe(n, null == e ? n.first + n.size - 1 : e), je(this, e + 1, t);
            }, cursorCoords: function cursorCoords(e, t) {
              var n,
                  r = this.doc.sel.primary();return n = null == e ? r.head : "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) ? me(this.doc, e) : e ? r.from() : r.to(), dt(this, n, t || "page");
            }, charCoords: function charCoords(e, t) {
              return ht(this, me(this.doc, e), t || "page");
            }, coordsChar: function coordsChar(e, t) {
              return e = ft(this, e, t || "page"), gt(this, e.left, e.top);
            }, lineAtHeight: function lineAtHeight(e, t) {
              return e = ft(this, { top: e, left: 0 }, t || "page").top, ni(this.doc, e + this.display.viewOffset);
            }, heightAtLine: function heightAtLine(e, t) {
              var n,
                  r = !1;if ("number" == typeof e) {
                var i = this.doc.first + this.doc.size - 1;e < this.doc.first ? e = this.doc.first : e > i && (e = i, r = !0), n = Zr(this.doc, e);
              } else n = e;return ut(this, n, { top: 0, left: 0 }, t || "page").top + (r ? this.doc.height - ri(n) : 0);
            }, defaultTextHeight: function defaultTextHeight() {
              return yt(this.display);
            }, defaultCharWidth: function defaultCharWidth() {
              return xt(this.display);
            }, setGutterMarker: Ot(function (e, t, n) {
              return zn(this.doc, e, "gutter", function (e) {
                var r = e.gutterMarkers || (e.gutterMarkers = {});return r[t] = n, !n && Fi(r) && (e.gutterMarkers = null), !0;
              });
            }), clearGutter: Ot(function (e) {
              var t = this,
                  n = t.doc,
                  r = n.first;n.iter(function (n) {
                n.gutterMarkers && n.gutterMarkers[e] && (n.gutterMarkers[e] = null, Ht(t, r, "gutter"), Fi(n.gutterMarkers) && (n.gutterMarkers = null)), ++r;
              });
            }), lineInfo: function lineInfo(e) {
              if ("number" == typeof e) {
                if (!ve(this.doc, e)) return null;var t = e;if (e = Zr(this.doc, e), !e) return null;
              } else {
                var t = ti(e);if (null == t) return null;
              }return { line: t, handle: e, text: e.text, gutterMarkers: e.gutterMarkers, textClass: e.textClass, bgClass: e.bgClass, wrapClass: e.wrapClass, widgets: e.widgets };
            }, getViewport: function getViewport() {
              return { from: this.display.viewFrom, to: this.display.viewTo };
            }, addWidget: function addWidget(e, t, n, r, i) {
              var o = this.display;e = dt(this, me(this.doc, e));var a = e.bottom,
                  l = e.left;if (t.style.position = "absolute", t.setAttribute("cm-ignore-events", "true"), this.display.input.setUneditable(t), o.sizer.appendChild(t), "over" == r) a = e.top;else if ("above" == r || "near" == r) {
                var s = Math.max(o.wrapper.clientHeight, this.doc.height),
                    c = Math.max(o.sizer.clientWidth, o.lineSpace.clientWidth);("above" == r || e.bottom + t.offsetHeight > s) && e.top > t.offsetHeight ? a = e.top - t.offsetHeight : e.bottom + t.offsetHeight <= s && (a = e.bottom), l + t.offsetWidth > c && (l = c - t.offsetWidth);
              }t.style.top = a + "px", t.style.left = t.style.right = "", "right" == i ? (l = o.sizer.clientWidth - t.offsetWidth, t.style.right = "0px") : ("left" == i ? l = 0 : "middle" == i && (l = (o.sizer.clientWidth - t.offsetWidth) / 2), t.style.left = l + "px"), n && Dn(this, l, a, l + t.offsetWidth, a + t.offsetHeight);
            }, triggerOnKeyDown: Ot(hn), triggerOnKeyPress: Ot(mn), triggerOnKeyUp: pn, execCommand: function execCommand(e) {
              return ua.hasOwnProperty(e) ? ua[e].call(null, this) : void 0;
            }, triggerElectric: Ot(function (e) {
              Q(this, e);
            }), findPosH: function findPosH(e, t, n, r) {
              var i = 1;0 > t && (i = -1, t = -t);for (var o = 0, a = me(this.doc, e); t > o && (a = Un(this.doc, a, i, n, r), !a.hitSide); ++o) {}return a;
            }, moveH: Ot(function (e, t) {
              var n = this;n.extendSelectionsBy(function (r) {
                return n.display.shift || n.doc.extend || r.empty() ? Un(n.doc, r.head, e, t, n.options.rtlMoveVisually) : 0 > e ? r.from() : r.to();
              }, _a);
            }), deleteH: Ot(function (e, t) {
              var n = this.doc.sel,
                  r = this.doc;n.somethingSelected() ? r.replaceSelection("", null, "+delete") : jn(this, function (n) {
                var i = Un(r, n.head, e, t, !1);return 0 > e ? { from: i, to: n.head } : { from: n.head, to: i };
              });
            }), findPosV: function findPosV(e, t, n, r) {
              var i = 1,
                  o = r;0 > t && (i = -1, t = -t);for (var a = 0, l = me(this.doc, e); t > a; ++a) {
                var s = dt(this, l, "div");if (null == o ? o = s.left : s.left = o, l = qn(this, s, i, n), l.hitSide) break;
              }return l;
            }, moveV: Ot(function (e, t) {
              var n = this,
                  r = this.doc,
                  i = [],
                  o = !n.display.shift && !r.extend && r.sel.somethingSelected();if (r.extendSelectionsBy(function (a) {
                if (o) return 0 > e ? a.from() : a.to();var l = dt(n, a.head, "div");null != a.goalColumn && (l.left = a.goalColumn), i.push(l.left);var s = qn(n, l, e, t);return "page" == t && a == r.sel.primary() && Wn(n, null, ht(n, s, "div").top - l.top), s;
              }, _a), i.length) for (var a = 0; a < r.sel.ranges.length; a++) {
                r.sel.ranges[a].goalColumn = i[a];
              }
            }), findWordAt: function findWordAt(e) {
              var t = this.doc,
                  n = Zr(t, e.line).text,
                  r = e.ch,
                  i = e.ch;if (n) {
                var o = this.getHelper(e, "wordChars");(e.xRel < 0 || i == n.length) && r ? --r : ++i;for (var a = n.charAt(r), l = _i(a, o) ? function (e) {
                  return _i(e, o);
                } : /\s/.test(a) ? function (e) {
                  return (/\s/.test(e)
                  );
                } : function (e) {
                  return !/\s/.test(e) && !_i(e);
                }; r > 0 && l(n.charAt(r - 1));) {
                  --r;
                }for (; i < n.length && l(n.charAt(i));) {
                  ++i;
                }
              }return new fe(Bo(e.line, r), Bo(e.line, i));
            }, toggleOverwrite: function toggleOverwrite(e) {
              null != e && e == this.state.overwrite || ((this.state.overwrite = !this.state.overwrite) ? Ja(this.display.cursorDiv, "CodeMirror-overwrite") : Za(this.display.cursorDiv, "CodeMirror-overwrite"), Pa(this, "overwriteToggle", this, this.state.overwrite));
            }, hasFocus: function hasFocus() {
              return this.display.input.getField() == Gi();
            }, isReadOnly: function isReadOnly() {
              return !(!this.options.readOnly && !this.doc.cantEdit);
            }, scrollTo: Ot(function (e, t) {
              null == e && null == t || _n(this), null != e && (this.curOp.scrollLeft = e), null != t && (this.curOp.scrollTop = t);
            }), getScrollInfo: function getScrollInfo() {
              var e = this.display.scroller;return { left: e.scrollLeft, top: e.scrollTop, height: e.scrollHeight - Ye(this) - this.display.barHeight, width: e.scrollWidth - Ye(this) - this.display.barWidth, clientHeight: Ve(this), clientWidth: $e(this) };
            }, scrollIntoView: Ot(function (e, t) {
              if (null == e ? (e = { from: this.doc.sel.primary().head, to: null }, null == t && (t = this.options.cursorScrollMargin)) : "number" == typeof e ? e = { from: Bo(e, 0), to: null } : null == e.from && (e = { from: e, to: null }), e.to || (e.to = e.from), e.margin = t || 0, null != e.from.line) _n(this), this.curOp.scrollToPos = e;else {
                var n = Hn(this, Math.min(e.from.left, e.to.left), Math.min(e.from.top, e.to.top) - e.margin, Math.max(e.from.right, e.to.right), Math.max(e.from.bottom, e.to.bottom) + e.margin);this.scrollTo(n.scrollLeft, n.scrollTop);
              }
            }), setSize: Ot(function (e, t) {
              function n(e) {
                return "number" == typeof e || /^\d+$/.test(String(e)) ? e + "px" : e;
              }var r = this;null != e && (r.display.wrapper.style.width = n(e)), null != t && (r.display.wrapper.style.height = n(t)), r.options.lineWrapping && at(this);var i = r.display.viewFrom;r.doc.iter(i, r.display.viewTo, function (e) {
                if (e.widgets) for (var t = 0; t < e.widgets.length; t++) {
                  if (e.widgets[t].noHScroll) {
                    Ht(r, i, "widget");break;
                  }
                }++i;
              }), r.curOp.forceUpdate = !0, Pa(r, "refresh", this);
            }), operation: function operation(e) {
              return At(this, e);
            }, refresh: Ot(function () {
              var e = this.display.cachedTextHeight;Dt(this), this.curOp.forceUpdate = !0, lt(this), this.scrollTo(this.doc.scrollLeft, this.doc.scrollTop), u(this), (null == e || Math.abs(e - yt(this.display)) > .5) && a(this), Pa(this, "refresh", this);
            }), swapDoc: Ot(function (e) {
              var t = this.doc;return t.cm = null, Xr(this, e), lt(this), this.display.input.reset(), this.scrollTo(e.scrollLeft, e.scrollTop), this.curOp.forceScroll = !0, Ci(this, "swapDoc", this, t), t;
            }), getInputField: function getInputField() {
              return this.display.input.getField();
            }, getWrapperElement: function getWrapperElement() {
              return this.display.wrapper;
            }, getScrollerElement: function getScrollerElement() {
              return this.display.scroller;
            }, getGutterElement: function getGutterElement() {
              return this.display.gutters;
            } }, Ai(e);var ea = e.defaults = {},
              ta = e.optionHandlers = {},
              na = e.Init = { toString: function toString() {
              return "CodeMirror.Init";
            } };Gn("value", "", function (e, t) {
            e.setValue(t);
          }, !0), Gn("mode", null, function (e, t) {
            e.doc.modeOption = t, n(e);
          }, !0), Gn("indentUnit", 2, n, !0), Gn("indentWithTabs", !1), Gn("smartIndent", !0), Gn("tabSize", 4, function (e) {
            r(e), lt(e), Dt(e);
          }, !0), Gn("lineSeparator", null, function (e, t) {
            if (e.doc.lineSep = t, t) {
              var n = [],
                  r = e.doc.first;e.doc.iter(function (e) {
                for (var i = 0;;) {
                  var o = e.text.indexOf(t, i);if (-1 == o) break;i = o + t.length, n.push(Bo(r, o));
                }r++;
              });for (var i = n.length - 1; i >= 0; i--) {
                In(e.doc, t, n[i], Bo(n[i].line, n[i].ch + t.length));
              }
            }
          }), Gn("specialChars", /[\u0000-\u001f\u007f\u00ad\u200b-\u200f\u2028\u2029\ufeff]/g, function (t, n, r) {
            t.state.specialChars = new RegExp(n.source + (n.test("	") ? "" : "|	"), "g"), r != e.Init && t.refresh();
          }), Gn("specialCharPlaceholder", _r, function (e) {
            e.refresh();
          }, !0), Gn("electricChars", !0), Gn("inputStyle", Ao ? "contenteditable" : "textarea", function () {
            throw new Error("inputStyle can not (yet) be changed in a running editor");
          }, !0), Gn("rtlMoveVisually", !Io), Gn("wholeLineUpdateBefore", !0), Gn("theme", "default", function (e) {
            l(e), s(e);
          }, !0), Gn("keyMap", "default", function (t, n, r) {
            var i = $n(n),
                o = r != e.Init && $n(r);o && o.detach && o.detach(t, i), i.attach && i.attach(t, o || null);
          }), Gn("extraKeys", null), Gn("lineWrapping", !1, i, !0), Gn("gutters", [], function (e) {
            d(e.options), s(e);
          }, !0), Gn("fixedGutter", !0, function (e, t) {
            e.display.gutters.style.left = t ? C(e.display) + "px" : "0", e.refresh();
          }, !0), Gn("coverGutterNextToScrollbar", !1, function (e) {
            y(e);
          }, !0), Gn("scrollbarStyle", "native", function (e) {
            v(e), y(e), e.display.scrollbars.setScrollTop(e.doc.scrollTop), e.display.scrollbars.setScrollLeft(e.doc.scrollLeft);
          }, !0), Gn("lineNumbers", !1, function (e) {
            d(e.options), s(e);
          }, !0), Gn("firstLineNumber", 1, s, !0), Gn("lineNumberFormatter", function (e) {
            return e;
          }, s, !0), Gn("showCursorWhenSelecting", !1, Re, !0), Gn("resetSelectionOnContextMenu", !0), Gn("lineWiseCopyCut", !0), Gn("readOnly", !1, function (e, t) {
            "nocursor" == t ? (yn(e), e.display.input.blur(), e.display.disabled = !0) : e.display.disabled = !1, e.display.input.readOnlyChanged(t);
          }), Gn("disableInput", !1, function (e, t) {
            t || e.display.input.reset();
          }, !0), Gn("dragDrop", !0, Ut), Gn("allowDropFileTypes", null), Gn("cursorBlinkRate", 530), Gn("cursorScrollMargin", 0), Gn("cursorHeight", 1, Re, !0), Gn("singleCursorHeightPerLine", !0, Re, !0), Gn("workTime", 100), Gn("workDelay", 100), Gn("flattenSpans", !0, r, !0), Gn("addModeClass", !1, r, !0), Gn("pollInterval", 100), Gn("undoDepth", 200, function (e, t) {
            e.doc.history.undoDepth = t;
          }), Gn("historyEventDelay", 1250), Gn("viewportMargin", 10, function (e) {
            e.refresh();
          }, !0), Gn("maxHighlightLength", 1e4, r, !0), Gn("moveInputWithCursor", !0, function (e, t) {
            t || e.display.input.resetPosition();
          }), Gn("tabindex", null, function (e, t) {
            e.display.input.getField().tabIndex = t || "";
          }), Gn("autofocus", null);var ra = e.modes = {},
              ia = e.mimeModes = {};e.defineMode = function (t, n) {
            e.defaults.mode || "null" == t || (e.defaults.mode = t), arguments.length > 2 && (n.dependencies = Array.prototype.slice.call(arguments, 2)), ra[t] = n;
          }, e.defineMIME = function (e, t) {
            ia[e] = t;
          }, e.resolveMode = function (t) {
            if ("string" == typeof t && ia.hasOwnProperty(t)) t = ia[t];else if (t && "string" == typeof t.name && ia.hasOwnProperty(t.name)) {
              var n = ia[t.name];"string" == typeof n && (n = { name: n }), t = Hi(n, t), t.name = n.name;
            } else if ("string" == typeof t && /^[\w\-]+\/[\w\-]+\+xml$/.test(t)) return e.resolveMode("application/xml");return "string" == typeof t ? { name: t } : t || { name: "null" };
          }, e.getMode = function (t, n) {
            var n = e.resolveMode(n),
                r = ra[n.name];if (!r) return e.getMode(t, "text/plain");var i = r(t, n);if (oa.hasOwnProperty(n.name)) {
              var o = oa[n.name];for (var a in o) {
                o.hasOwnProperty(a) && (i.hasOwnProperty(a) && (i["_" + a] = i[a]), i[a] = o[a]);
              }
            }if (i.name = n.name, n.helperType && (i.helperType = n.helperType), n.modeProps) for (var a in n.modeProps) {
              i[a] = n.modeProps[a];
            }return i;
          }, e.defineMode("null", function () {
            return { token: function token(e) {
                e.skipToEnd();
              } };
          }), e.defineMIME("text/plain", "null");var oa = e.modeExtensions = {};e.extendMode = function (e, t) {
            var n = oa.hasOwnProperty(e) ? oa[e] : oa[e] = {};Wi(t, n);
          }, e.defineExtension = function (t, n) {
            e.prototype[t] = n;
          }, e.defineDocExtension = function (e, t) {
            Ca.prototype[e] = t;
          }, e.defineOption = Gn;var aa = [];e.defineInitHook = function (e) {
            aa.push(e);
          };var la = e.helpers = {};e.registerHelper = function (t, n, r) {
            la.hasOwnProperty(t) || (la[t] = e[t] = { _global: [] }), la[t][n] = r;
          }, e.registerGlobalHelper = function (t, n, r, i) {
            e.registerHelper(t, n, i), la[t]._global.push({ pred: r, val: i });
          };var sa = e.copyState = function (e, t) {
            if (t === !0) return t;if (e.copyState) return e.copyState(t);var n = {};for (var r in t) {
              var i = t[r];i instanceof Array && (i = i.concat([])), n[r] = i;
            }return n;
          },
              ca = e.startState = function (e, t, n) {
            return e.startState ? e.startState(t, n) : !0;
          };e.innerMode = function (e, t) {
            for (; e.innerMode;) {
              var n = e.innerMode(t);if (!n || n.mode == e) break;t = n.state, e = n.mode;
            }return n || { mode: e, state: t };
          };var ua = e.commands = { selectAll: function selectAll(e) {
              e.setSelection(Bo(e.firstLine(), 0), Bo(e.lastLine()), Wa);
            }, singleSelection: function singleSelection(e) {
              e.setSelection(e.getCursor("anchor"), e.getCursor("head"), Wa);
            }, killLine: function killLine(e) {
              jn(e, function (t) {
                if (t.empty()) {
                  var n = Zr(e.doc, t.head.line).text.length;return t.head.ch == n && t.head.line < e.lastLine() ? { from: t.head, to: Bo(t.head.line + 1, 0) } : { from: t.head, to: Bo(t.head.line, n) };
                }return { from: t.from(), to: t.to() };
              });
            }, deleteLine: function deleteLine(e) {
              jn(e, function (t) {
                return { from: Bo(t.from().line, 0), to: me(e.doc, Bo(t.to().line + 1, 0)) };
              });
            }, delLineLeft: function delLineLeft(e) {
              jn(e, function (e) {
                return { from: Bo(e.from().line, 0), to: e.from() };
              });
            }, delWrappedLineLeft: function delWrappedLineLeft(e) {
              jn(e, function (t) {
                var n = e.charCoords(t.head, "div").top + 5,
                    r = e.coordsChar({ left: 0, top: n }, "div");return { from: r, to: t.from() };
              });
            }, delWrappedLineRight: function delWrappedLineRight(e) {
              jn(e, function (t) {
                var n = e.charCoords(t.head, "div").top + 5,
                    r = e.coordsChar({ left: e.display.lineDiv.offsetWidth + 100, top: n }, "div");return { from: t.from(), to: r };
              });
            }, undo: function undo(e) {
              e.undo();
            }, redo: function redo(e) {
              e.redo();
            }, undoSelection: function undoSelection(e) {
              e.undoSelection();
            }, redoSelection: function redoSelection(e) {
              e.redoSelection();
            }, goDocStart: function goDocStart(e) {
              e.extendSelection(Bo(e.firstLine(), 0));
            }, goDocEnd: function goDocEnd(e) {
              e.extendSelection(Bo(e.lastLine()));
            }, goLineStart: function goLineStart(e) {
              e.extendSelectionsBy(function (t) {
                return oo(e, t.head.line);
              }, { origin: "+move", bias: 1 });
            }, goLineStartSmart: function goLineStartSmart(e) {
              e.extendSelectionsBy(function (t) {
                return lo(e, t.head);
              }, { origin: "+move", bias: 1 });
            }, goLineEnd: function goLineEnd(e) {
              e.extendSelectionsBy(function (t) {
                return ao(e, t.head.line);
              }, { origin: "+move", bias: -1 });
            }, goLineRight: function goLineRight(e) {
              e.extendSelectionsBy(function (t) {
                var n = e.charCoords(t.head, "div").top + 5;return e.coordsChar({ left: e.display.lineDiv.offsetWidth + 100, top: n }, "div");
              }, _a);
            }, goLineLeft: function goLineLeft(e) {
              e.extendSelectionsBy(function (t) {
                var n = e.charCoords(t.head, "div").top + 5;return e.coordsChar({ left: 0, top: n }, "div");
              }, _a);
            }, goLineLeftSmart: function goLineLeftSmart(e) {
              e.extendSelectionsBy(function (t) {
                var n = e.charCoords(t.head, "div").top + 5,
                    r = e.coordsChar({ left: 0, top: n }, "div");return r.ch < e.getLine(r.line).search(/\S/) ? lo(e, t.head) : r;
              }, _a);
            }, goLineUp: function goLineUp(e) {
              e.moveV(-1, "line");
            }, goLineDown: function goLineDown(e) {
              e.moveV(1, "line");
            }, goPageUp: function goPageUp(e) {
              e.moveV(-1, "page");
            }, goPageDown: function goPageDown(e) {
              e.moveV(1, "page");
            }, goCharLeft: function goCharLeft(e) {
              e.moveH(-1, "char");
            }, goCharRight: function goCharRight(e) {
              e.moveH(1, "char");
            }, goColumnLeft: function goColumnLeft(e) {
              e.moveH(-1, "column");
            }, goColumnRight: function goColumnRight(e) {
              e.moveH(1, "column");
            }, goWordLeft: function goWordLeft(e) {
              e.moveH(-1, "word");
            }, goGroupRight: function goGroupRight(e) {
              e.moveH(1, "group");
            }, goGroupLeft: function goGroupLeft(e) {
              e.moveH(-1, "group");
            }, goWordRight: function goWordRight(e) {
              e.moveH(1, "word");
            }, delCharBefore: function delCharBefore(e) {
              e.deleteH(-1, "char");
            }, delCharAfter: function delCharAfter(e) {
              e.deleteH(1, "char");
            }, delWordBefore: function delWordBefore(e) {
              e.deleteH(-1, "word");
            }, delWordAfter: function delWordAfter(e) {
              e.deleteH(1, "word");
            }, delGroupBefore: function delGroupBefore(e) {
              e.deleteH(-1, "group");
            }, delGroupAfter: function delGroupAfter(e) {
              e.deleteH(1, "group");
            }, indentAuto: function indentAuto(e) {
              e.indentSelection("smart");
            }, indentMore: function indentMore(e) {
              e.indentSelection("add");
            }, indentLess: function indentLess(e) {
              e.indentSelection("subtract");
            }, insertTab: function insertTab(e) {
              e.replaceSelection("	");
            }, insertSoftTab: function insertSoftTab(e) {
              for (var t = [], n = e.listSelections(), r = e.options.tabSize, i = 0; i < n.length; i++) {
                var o = n[i].from(),
                    a = Fa(e.getLine(o.line), o.ch, r);t.push(Oi(r - a % r));
              }e.replaceSelections(t);
            }, defaultTab: function defaultTab(e) {
              e.somethingSelected() ? e.indentSelection("add") : e.execCommand("insertTab");
            }, transposeChars: function transposeChars(e) {
              At(e, function () {
                for (var t = e.listSelections(), n = [], r = 0; r < t.length; r++) {
                  var i = t[r].head,
                      o = Zr(e.doc, i.line).text;if (o) if (i.ch == o.length && (i = new Bo(i.line, i.ch - 1)), i.ch > 0) i = new Bo(i.line, i.ch + 1), e.replaceRange(o.charAt(i.ch - 1) + o.charAt(i.ch - 2), Bo(i.line, i.ch - 2), i, "+transpose");else if (i.line > e.doc.first) {
                    var a = Zr(e.doc, i.line - 1).text;a && e.replaceRange(o.charAt(0) + e.doc.lineSeparator() + a.charAt(a.length - 1), Bo(i.line - 1, a.length - 1), Bo(i.line, 1), "+transpose");
                  }n.push(new fe(i, i));
                }e.setSelections(n);
              });
            }, newlineAndIndent: function newlineAndIndent(e) {
              At(e, function () {
                for (var t = e.listSelections().length, n = 0; t > n; n++) {
                  var r = e.listSelections()[n];e.replaceRange(e.doc.lineSeparator(), r.anchor, r.head, "+input"), e.indentLine(r.from().line + 1, null, !0);
                }Bn(e);
              });
            }, openLine: function openLine(e) {
              e.replaceSelection("\n", "start");
            }, toggleOverwrite: function toggleOverwrite(e) {
              e.toggleOverwrite();
            } },
              fa = e.keyMap = {};fa.basic = { Left: "goCharLeft", Right: "goCharRight", Up: "goLineUp", Down: "goLineDown", End: "goLineEnd", Home: "goLineStartSmart", PageUp: "goPageUp", PageDown: "goPageDown", Delete: "delCharAfter", Backspace: "delCharBefore", "Shift-Backspace": "delCharBefore", Tab: "defaultTab", "Shift-Tab": "indentAuto", Enter: "newlineAndIndent", Insert: "toggleOverwrite", Esc: "singleSelection" }, fa.pcDefault = { "Ctrl-A": "selectAll", "Ctrl-D": "deleteLine", "Ctrl-Z": "undo", "Shift-Ctrl-Z": "redo", "Ctrl-Y": "redo", "Ctrl-Home": "goDocStart", "Ctrl-End": "goDocEnd", "Ctrl-Up": "goLineUp", "Ctrl-Down": "goLineDown", "Ctrl-Left": "goGroupLeft", "Ctrl-Right": "goGroupRight", "Alt-Left": "goLineStart", "Alt-Right": "goLineEnd", "Ctrl-Backspace": "delGroupBefore", "Ctrl-Delete": "delGroupAfter", "Ctrl-S": "save", "Ctrl-F": "find", "Ctrl-G": "findNext", "Shift-Ctrl-G": "findPrev", "Shift-Ctrl-F": "replace", "Shift-Ctrl-R": "replaceAll", "Ctrl-[": "indentLess", "Ctrl-]": "indentMore", "Ctrl-U": "undoSelection", "Shift-Ctrl-U": "redoSelection", "Alt-U": "redoSelection", fallthrough: "basic" }, fa.emacsy = { "Ctrl-F": "goCharRight", "Ctrl-B": "goCharLeft", "Ctrl-P": "goLineUp", "Ctrl-N": "goLineDown", "Alt-F": "goWordRight", "Alt-B": "goWordLeft", "Ctrl-A": "goLineStart", "Ctrl-E": "goLineEnd", "Ctrl-V": "goPageDown", "Shift-Ctrl-V": "goPageUp", "Ctrl-D": "delCharAfter", "Ctrl-H": "delCharBefore", "Alt-D": "delWordAfter", "Alt-Backspace": "delWordBefore", "Ctrl-K": "killLine", "Ctrl-T": "transposeChars", "Ctrl-O": "openLine" }, fa.macDefault = { "Cmd-A": "selectAll", "Cmd-D": "deleteLine", "Cmd-Z": "undo", "Shift-Cmd-Z": "redo", "Cmd-Y": "redo", "Cmd-Home": "goDocStart", "Cmd-Up": "goDocStart", "Cmd-End": "goDocEnd", "Cmd-Down": "goDocEnd", "Alt-Left": "goGroupLeft", "Alt-Right": "goGroupRight", "Cmd-Left": "goLineLeft", "Cmd-Right": "goLineRight", "Alt-Backspace": "delGroupBefore", "Ctrl-Alt-Backspace": "delGroupAfter", "Alt-Delete": "delGroupAfter", "Cmd-S": "save", "Cmd-F": "find", "Cmd-G": "findNext", "Shift-Cmd-G": "findPrev", "Cmd-Alt-F": "replace", "Shift-Cmd-Alt-F": "replaceAll", "Cmd-[": "indentLess", "Cmd-]": "indentMore", "Cmd-Backspace": "delWrappedLineLeft", "Cmd-Delete": "delWrappedLineRight", "Cmd-U": "undoSelection", "Shift-Cmd-U": "redoSelection", "Ctrl-Up": "goDocStart", "Ctrl-Down": "goDocEnd", fallthrough: ["basic", "emacsy"] }, fa["default"] = Eo ? fa.macDefault : fa.pcDefault, e.normalizeKeyMap = function (e) {
            var t = {};for (var n in e) {
              if (e.hasOwnProperty(n)) {
                var r = e[n];if (/^(name|fallthrough|(de|at)tach)$/.test(n)) continue;if ("..." == r) {
                  delete e[n];continue;
                }for (var i = Ri(n.split(" "), Yn), o = 0; o < i.length; o++) {
                  var a, l;o == i.length - 1 ? (l = i.join(" "), a = r) : (l = i.slice(0, o + 1).join(" "), a = "...");var s = t[l];if (s) {
                    if (s != a) throw new Error("Inconsistent bindings for " + l);
                  } else t[l] = a;
                }delete e[n];
              }
            }for (var c in t) {
              e[c] = t[c];
            }return e;
          };var ha = e.lookupKey = function (e, t, n, r) {
            t = $n(t);var i = t.call ? t.call(e, r) : t[e];if (i === !1) return "nothing";if ("..." === i) return "multi";if (null != i && n(i)) return "handled";if (t.fallthrough) {
              if ("[object Array]" != Object.prototype.toString.call(t.fallthrough)) return ha(e, t.fallthrough, n, r);for (var o = 0; o < t.fallthrough.length; o++) {
                var a = ha(e, t.fallthrough[o], n, r);
                if (a) return a;
              }
            }
          },
              da = e.isModifierKey = function (e) {
            var t = "string" == typeof e ? e : ol[e.keyCode];return "Ctrl" == t || "Alt" == t || "Shift" == t || "Mod" == t;
          },
              pa = e.keyName = function (e, t) {
            if (Co && 34 == e.keyCode && e["char"]) return !1;var n = ol[e.keyCode],
                r = n;return null == r || e.altGraphKey ? !1 : (e.altKey && "Alt" != n && (r = "Alt-" + r), (Ro ? e.metaKey : e.ctrlKey) && "Ctrl" != n && (r = "Ctrl-" + r), (Ro ? e.ctrlKey : e.metaKey) && "Cmd" != n && (r = "Cmd-" + r), !t && e.shiftKey && "Shift" != n && (r = "Shift-" + r), r);
          };e.fromTextArea = function (t, n) {
            function r() {
              t.value = c.getValue();
            }if (n = n ? Wi(n) : {}, n.value = t.value, !n.tabindex && t.tabIndex && (n.tabindex = t.tabIndex), !n.placeholder && t.placeholder && (n.placeholder = t.placeholder), null == n.autofocus) {
              var i = Gi();n.autofocus = i == t || null != t.getAttribute("autofocus") && i == document.body;
            }if (t.form && (Ea(t.form, "submit", r), !n.leaveSubmitMethodAlone)) {
              var o = t.form,
                  a = o.submit;try {
                var l = o.submit = function () {
                  r(), o.submit = a, o.submit(), o.submit = l;
                };
              } catch (s) {}
            }n.finishInit = function (e) {
              e.save = r, e.getTextArea = function () {
                return t;
              }, e.toTextArea = function () {
                e.toTextArea = isNaN, r(), t.parentNode.removeChild(e.getWrapperElement()), t.style.display = "", t.form && (Ia(t.form, "submit", r), "function" == typeof t.form.submit && (t.form.submit = a));
              };
            }, t.style.display = "none";var c = e(function (e) {
              t.parentNode.insertBefore(e, t.nextSibling);
            }, n);return c;
          };var ma = e.StringStream = function (e, t) {
            this.pos = this.start = 0, this.string = e, this.tabSize = t || 8, this.lastColumnPos = this.lastColumnValue = 0, this.lineStart = 0;
          };ma.prototype = { eol: function eol() {
              return this.pos >= this.string.length;
            }, sol: function sol() {
              return this.pos == this.lineStart;
            }, peek: function peek() {
              return this.string.charAt(this.pos) || void 0;
            }, next: function next() {
              return this.pos < this.string.length ? this.string.charAt(this.pos++) : void 0;
            }, eat: function eat(e) {
              var t = this.string.charAt(this.pos);if ("string" == typeof e) var n = t == e;else var n = t && (e.test ? e.test(t) : e(t));return n ? (++this.pos, t) : void 0;
            }, eatWhile: function eatWhile(e) {
              for (var t = this.pos; this.eat(e);) {}return this.pos > t;
            }, eatSpace: function eatSpace() {
              for (var e = this.pos; /[\s\u00a0]/.test(this.string.charAt(this.pos));) {
                ++this.pos;
              }return this.pos > e;
            }, skipToEnd: function skipToEnd() {
              this.pos = this.string.length;
            }, skipTo: function skipTo(e) {
              var t = this.string.indexOf(e, this.pos);return t > -1 ? (this.pos = t, !0) : void 0;
            }, backUp: function backUp(e) {
              this.pos -= e;
            }, column: function column() {
              return this.lastColumnPos < this.start && (this.lastColumnValue = Fa(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue), this.lastColumnPos = this.start), this.lastColumnValue - (this.lineStart ? Fa(this.string, this.lineStart, this.tabSize) : 0);
            }, indentation: function indentation() {
              return Fa(this.string, null, this.tabSize) - (this.lineStart ? Fa(this.string, this.lineStart, this.tabSize) : 0);
            }, match: function match(e, t, n) {
              if ("string" != typeof e) {
                var r = this.string.slice(this.pos).match(e);return r && r.index > 0 ? null : (r && t !== !1 && (this.pos += r[0].length), r);
              }var i = function i(e) {
                return n ? e.toLowerCase() : e;
              },
                  o = this.string.substr(this.pos, e.length);return i(o) == i(e) ? (t !== !1 && (this.pos += e.length), !0) : void 0;
            }, current: function current() {
              return this.string.slice(this.start, this.pos);
            }, hideFirstChars: function hideFirstChars(e, t) {
              this.lineStart += e;try {
                return t();
              } finally {
                this.lineStart -= e;
              }
            } };var ga = 0,
              va = e.TextMarker = function (e, t) {
            this.lines = [], this.type = t, this.doc = e, this.id = ++ga;
          };Ai(va), va.prototype.clear = function () {
            if (!this.explicitlyCleared) {
              var e = this.doc.cm,
                  t = e && !e.curOp;if (t && bt(e), Ni(this, "clear")) {
                var n = this.find();n && Ci(this, "clear", n.from, n.to);
              }for (var r = null, i = null, o = 0; o < this.lines.length; ++o) {
                var a = this.lines[o],
                    l = er(a.markedSpans, this);e && !this.collapsed ? Ht(e, ti(a), "text") : e && (null != l.to && (i = ti(a)), null != l.from && (r = ti(a))), a.markedSpans = tr(a.markedSpans, l), null == l.from && this.collapsed && !kr(this.doc, a) && e && ei(a, yt(e.display));
              }if (e && this.collapsed && !e.options.lineWrapping) for (var o = 0; o < this.lines.length; ++o) {
                var s = yr(this.lines[o]),
                    c = f(s);c > e.display.maxLineLength && (e.display.maxLine = s, e.display.maxLineLength = c, e.display.maxLineChanged = !0);
              }null != r && e && this.collapsed && Dt(e, r, i + 1), this.lines.length = 0, this.explicitlyCleared = !0, this.atomic && this.doc.cantEdit && (this.doc.cantEdit = !1, e && Ae(e.doc)), e && Ci(e, "markerCleared", e, this), t && kt(e), this.parent && this.parent.clear();
            }
          }, va.prototype.find = function (e, t) {
            null == e && "bookmark" == this.type && (e = 1);for (var n, r, i = 0; i < this.lines.length; ++i) {
              var o = this.lines[i],
                  a = er(o.markedSpans, this);if (null != a.from && (n = Bo(t ? o : ti(o), a.from), -1 == e)) return n;if (null != a.to && (r = Bo(t ? o : ti(o), a.to), 1 == e)) return r;
            }return n && { from: n, to: r };
          }, va.prototype.changed = function () {
            var e = this.find(-1, !0),
                t = this,
                n = this.doc.cm;e && n && At(n, function () {
              var r = e.line,
                  i = ti(e.line),
                  o = Qe(n, i);if (o && (ot(o), n.curOp.selectionChanged = n.curOp.forceUpdate = !0), n.curOp.updateMaxLine = !0, !kr(t.doc, r) && null != t.height) {
                var a = t.height;t.height = null;var l = Lr(t) - a;l && ei(r, r.height + l);
              }
            });
          }, va.prototype.attachLine = function (e) {
            if (!this.lines.length && this.doc.cm) {
              var t = this.doc.cm.curOp;t.maybeHiddenMarkers && -1 != Pi(t.maybeHiddenMarkers, this) || (t.maybeUnhiddenMarkers || (t.maybeUnhiddenMarkers = [])).push(this);
            }this.lines.push(e);
          }, va.prototype.detachLine = function (e) {
            if (this.lines.splice(Pi(this.lines, e), 1), !this.lines.length && this.doc.cm) {
              var t = this.doc.cm.curOp;(t.maybeHiddenMarkers || (t.maybeHiddenMarkers = [])).push(this);
            }
          };var ga = 0,
              ya = e.SharedTextMarker = function (e, t) {
            this.markers = e, this.primary = t;for (var n = 0; n < e.length; ++n) {
              e[n].parent = this;
            }
          };Ai(ya), ya.prototype.clear = function () {
            if (!this.explicitlyCleared) {
              this.explicitlyCleared = !0;for (var e = 0; e < this.markers.length; ++e) {
                this.markers[e].clear();
              }Ci(this, "clear");
            }
          }, ya.prototype.find = function (e, t) {
            return this.primary.find(e, t);
          };var xa = e.LineWidget = function (e, t, n) {
            if (n) for (var r in n) {
              n.hasOwnProperty(r) && (this[r] = n[r]);
            }this.doc = e, this.node = t;
          };Ai(xa), xa.prototype.clear = function () {
            var e = this.doc.cm,
                t = this.line.widgets,
                n = this.line,
                r = ti(n);if (null != r && t) {
              for (var i = 0; i < t.length; ++i) {
                t[i] == this && t.splice(i--, 1);
              }t.length || (n.widgets = null);var o = Lr(this);ei(n, Math.max(0, n.height - o)), e && At(e, function () {
                Cr(e, n, -o), Ht(e, r, "widget");
              });
            }
          }, xa.prototype.changed = function () {
            var e = this.height,
                t = this.doc.cm,
                n = this.line;this.height = null;var r = Lr(this) - e;r && (ei(n, n.height + r), t && At(t, function () {
              t.curOp.forceUpdate = !0, Cr(t, n, r);
            }));
          };var ba = e.Line = function (e, t, n) {
            this.text = e, ur(this, t), this.height = n ? n(this) : 1;
          };Ai(ba), ba.prototype.lineNo = function () {
            return ti(this);
          };var wa = {},
              ka = {};$r.prototype = { chunkSize: function chunkSize() {
              return this.lines.length;
            }, removeInner: function removeInner(e, t) {
              for (var n = e, r = e + t; r > n; ++n) {
                var i = this.lines[n];this.height -= i.height, Nr(i), Ci(i, "delete");
              }this.lines.splice(e, t);
            }, collapse: function collapse(e) {
              e.push.apply(e, this.lines);
            }, insertInner: function insertInner(e, t, n) {
              this.height += n, this.lines = this.lines.slice(0, e).concat(t).concat(this.lines.slice(e));for (var r = 0; r < t.length; ++r) {
                t[r].parent = this;
              }
            }, iterN: function iterN(e, t, n) {
              for (var r = e + t; r > e; ++e) {
                if (n(this.lines[e])) return !0;
              }
            } }, Vr.prototype = { chunkSize: function chunkSize() {
              return this.size;
            }, removeInner: function removeInner(e, t) {
              this.size -= t;for (var n = 0; n < this.children.length; ++n) {
                var r = this.children[n],
                    i = r.chunkSize();if (i > e) {
                  var o = Math.min(t, i - e),
                      a = r.height;if (r.removeInner(e, o), this.height -= a - r.height, i == o && (this.children.splice(n--, 1), r.parent = null), 0 == (t -= o)) break;e = 0;
                } else e -= i;
              }if (this.size - t < 25 && (this.children.length > 1 || !(this.children[0] instanceof $r))) {
                var l = [];this.collapse(l), this.children = [new $r(l)], this.children[0].parent = this;
              }
            }, collapse: function collapse(e) {
              for (var t = 0; t < this.children.length; ++t) {
                this.children[t].collapse(e);
              }
            }, insertInner: function insertInner(e, t, n) {
              this.size += t.length, this.height += n;for (var r = 0; r < this.children.length; ++r) {
                var i = this.children[r],
                    o = i.chunkSize();if (o >= e) {
                  if (i.insertInner(e, t, n), i.lines && i.lines.length > 50) {
                    for (var a = i.lines.length % 25 + 25, l = a; l < i.lines.length;) {
                      var s = new $r(i.lines.slice(l, l += 25));i.height -= s.height, this.children.splice(++r, 0, s), s.parent = this;
                    }i.lines = i.lines.slice(0, a), this.maybeSpill();
                  }break;
                }e -= o;
              }
            }, maybeSpill: function maybeSpill() {
              if (!(this.children.length <= 10)) {
                var e = this;do {
                  var t = e.children.splice(e.children.length - 5, 5),
                      n = new Vr(t);if (e.parent) {
                    e.size -= n.size, e.height -= n.height;var r = Pi(e.parent.children, e);e.parent.children.splice(r + 1, 0, n);
                  } else {
                    var i = new Vr(e.children);i.parent = e, e.children = [i, n], e = i;
                  }n.parent = e.parent;
                } while (e.children.length > 10);e.parent.maybeSpill();
              }
            }, iterN: function iterN(e, t, n) {
              for (var r = 0; r < this.children.length; ++r) {
                var i = this.children[r],
                    o = i.chunkSize();if (o > e) {
                  var a = Math.min(t, o - e);if (i.iterN(e, a, n)) return !0;if (0 == (t -= a)) break;e = 0;
                } else e -= o;
              }
            } };var Sa = 0,
              Ca = e.Doc = function (e, t, n, r) {
            if (!(this instanceof Ca)) return new Ca(e, t, n, r);null == n && (n = 0), Vr.call(this, [new $r([new ba("", null)])]), this.first = n, this.scrollTop = this.scrollLeft = 0, this.cantEdit = !1, this.cleanGeneration = 1, this.frontier = n;var i = Bo(n, 0);this.sel = de(i), this.history = new oi(null), this.id = ++Sa, this.modeOption = t, this.lineSep = r, this.extend = !1, "string" == typeof e && (e = this.splitLines(e)), Yr(this, { from: i, to: i, text: e }), Te(this, de(i), Wa);
          };Ca.prototype = Hi(Vr.prototype, { constructor: Ca, iter: function iter(e, t, n) {
              n ? this.iterN(e - this.first, t - e, n) : this.iterN(this.first, this.first + this.size, e);
            }, insert: function insert(e, t) {
              for (var n = 0, r = 0; r < t.length; ++r) {
                n += t[r].height;
              }this.insertInner(e - this.first, t, n);
            }, remove: function remove(e, t) {
              this.removeInner(e - this.first, t);
            }, getValue: function getValue(e) {
              var t = Qr(this, this.first, this.first + this.size);return e === !1 ? t : t.join(e || this.lineSeparator());
            }, setValue: It(function (e) {
              var t = Bo(this.first, 0),
                  n = this.first + this.size - 1;Tn(this, { from: t, to: Bo(n, Zr(this, n).text.length), text: this.splitLines(e), origin: "setValue", full: !0 }, !0), Te(this, de(t));
            }), replaceRange: function replaceRange(e, t, n, r) {
              t = me(this, t), n = n ? me(this, n) : t, In(this, e, t, n, r);
            }, getRange: function getRange(e, t, n) {
              var r = Jr(this, me(this, e), me(this, t));return n === !1 ? r : r.join(n || this.lineSeparator());
            }, getLine: function getLine(e) {
              var t = this.getLineHandle(e);return t && t.text;
            }, getLineHandle: function getLineHandle(e) {
              return ve(this, e) ? Zr(this, e) : void 0;
            }, getLineNumber: function getLineNumber(e) {
              return ti(e);
            }, getLineHandleVisualStart: function getLineHandleVisualStart(e) {
              return "number" == typeof e && (e = Zr(this, e)), yr(e);
            }, lineCount: function lineCount() {
              return this.size;
            }, firstLine: function firstLine() {
              return this.first;
            }, lastLine: function lastLine() {
              return this.first + this.size - 1;
            }, clipPos: function clipPos(e) {
              return me(this, e);
            }, getCursor: function getCursor(e) {
              var t,
                  n = this.sel.primary();return t = null == e || "head" == e ? n.head : "anchor" == e ? n.anchor : "end" == e || "to" == e || e === !1 ? n.to() : n.from();
            }, listSelections: function listSelections() {
              return this.sel.ranges;
            }, somethingSelected: function somethingSelected() {
              return this.sel.somethingSelected();
            }, setCursor: It(function (e, t, n) {
              Se(this, me(this, "number" == typeof e ? Bo(e, t || 0) : e), null, n);
            }), setSelection: It(function (e, t, n) {
              Se(this, me(this, e), me(this, t || e), n);
            }), extendSelection: It(function (e, t, n) {
              be(this, me(this, e), t && me(this, t), n);
            }), extendSelections: It(function (e, t) {
              we(this, ye(this, e), t);
            }), extendSelectionsBy: It(function (e, t) {
              var n = Ri(this.sel.ranges, e);we(this, ye(this, n), t);
            }), setSelections: It(function (e, t, n) {
              if (e.length) {
                for (var r = 0, i = []; r < e.length; r++) {
                  i[r] = new fe(me(this, e[r].anchor), me(this, e[r].head));
                }null == t && (t = Math.min(e.length - 1, this.sel.primIndex)), Te(this, he(i, t), n);
              }
            }), addSelection: It(function (e, t, n) {
              var r = this.sel.ranges.slice(0);r.push(new fe(me(this, e), me(this, t || e))), Te(this, he(r, r.length - 1), n);
            }), getSelection: function getSelection(e) {
              for (var t, n = this.sel.ranges, r = 0; r < n.length; r++) {
                var i = Jr(this, n[r].from(), n[r].to());t = t ? t.concat(i) : i;
              }return e === !1 ? t : t.join(e || this.lineSeparator());
            }, getSelections: function getSelections(e) {
              for (var t = [], n = this.sel.ranges, r = 0; r < n.length; r++) {
                var i = Jr(this, n[r].from(), n[r].to());e !== !1 && (i = i.join(e || this.lineSeparator())), t[r] = i;
              }return t;
            }, replaceSelection: function replaceSelection(e, t, n) {
              for (var r = [], i = 0; i < this.sel.ranges.length; i++) {
                r[i] = e;
              }this.replaceSelections(r, t, n || "+input");
            }, replaceSelections: It(function (e, t, n) {
              for (var r = [], i = this.sel, o = 0; o < i.ranges.length; o++) {
                var a = i.ranges[o];r[o] = { from: a.from(), to: a.to(), text: this.splitLines(e[o]), origin: n };
              }for (var l = t && "end" != t && Cn(this, r, t), o = r.length - 1; o >= 0; o--) {
                Tn(this, r[o]);
              }l ? Le(this, l) : this.cm && Bn(this.cm);
            }), undo: It(function () {
              Nn(this, "undo");
            }), redo: It(function () {
              Nn(this, "redo");
            }), undoSelection: It(function () {
              Nn(this, "undo", !0);
            }), redoSelection: It(function () {
              Nn(this, "redo", !0);
            }), setExtending: function setExtending(e) {
              this.extend = e;
            }, getExtending: function getExtending() {
              return this.extend;
            }, historySize: function historySize() {
              for (var e = this.history, t = 0, n = 0, r = 0; r < e.done.length; r++) {
                e.done[r].ranges || ++t;
              }for (var r = 0; r < e.undone.length; r++) {
                e.undone[r].ranges || ++n;
              }return { undo: t, redo: n };
            }, clearHistory: function clearHistory() {
              this.history = new oi(this.history.maxGeneration);
            }, markClean: function markClean() {
              this.cleanGeneration = this.changeGeneration(!0);
            }, changeGeneration: function changeGeneration(e) {
              return e && (this.history.lastOp = this.history.lastSelOp = this.history.lastOrigin = null), this.history.generation;
            }, isClean: function isClean(e) {
              return this.history.generation == (e || this.cleanGeneration);
            }, getHistory: function getHistory() {
              return { done: gi(this.history.done), undone: gi(this.history.undone) };
            }, setHistory: function setHistory(e) {
              var t = this.history = new oi(this.history.maxGeneration);t.done = gi(e.done.slice(0), null, !0), t.undone = gi(e.undone.slice(0), null, !0);
            }, addLineClass: It(function (e, t, n) {
              return zn(this, e, "gutter" == t ? "gutter" : "class", function (e) {
                var r = "text" == t ? "textClass" : "background" == t ? "bgClass" : "gutter" == t ? "gutterClass" : "wrapClass";if (e[r]) {
                  if (Yi(n).test(e[r])) return !1;e[r] += " " + n;
                } else e[r] = n;return !0;
              });
            }), removeLineClass: It(function (e, t, n) {
              return zn(this, e, "gutter" == t ? "gutter" : "class", function (e) {
                var r = "text" == t ? "textClass" : "background" == t ? "bgClass" : "gutter" == t ? "gutterClass" : "wrapClass",
                    i = e[r];if (!i) return !1;if (null == n) e[r] = null;else {
                  var o = i.match(Yi(n));if (!o) return !1;var a = o.index + o[0].length;e[r] = i.slice(0, o.index) + (o.index && a != i.length ? " " : "") + i.slice(a) || null;
                }return !0;
              });
            }), addLineWidget: It(function (e, t, n) {
              return Tr(this, e, t, n);
            }), removeLineWidget: function removeLineWidget(e) {
              e.clear();
            }, markText: function markText(e, t, n) {
              return Vn(this, me(this, e), me(this, t), n, n && n.type || "range");
            }, setBookmark: function setBookmark(e, t) {
              var n = { replacedWith: t && (null == t.nodeType ? t.widget : t), insertLeft: t && t.insertLeft, clearWhenEmpty: !1, shared: t && t.shared, handleMouseEvents: t && t.handleMouseEvents };return e = me(this, e), Vn(this, e, e, n, "bookmark");
            }, findMarksAt: function findMarksAt(e) {
              e = me(this, e);var t = [],
                  n = Zr(this, e.line).markedSpans;if (n) for (var r = 0; r < n.length; ++r) {
                var i = n[r];(null == i.from || i.from <= e.ch) && (null == i.to || i.to >= e.ch) && t.push(i.marker.parent || i.marker);
              }return t;
            }, findMarks: function findMarks(e, t, n) {
              e = me(this, e), t = me(this, t);var r = [],
                  i = e.line;return this.iter(e.line, t.line + 1, function (o) {
                var a = o.markedSpans;if (a) for (var l = 0; l < a.length; l++) {
                  var s = a[l];null != s.to && i == e.line && e.ch >= s.to || null == s.from && i != e.line || null != s.from && i == t.line && s.from >= t.ch || n && !n(s.marker) || r.push(s.marker.parent || s.marker);
                }++i;
              }), r;
            }, getAllMarks: function getAllMarks() {
              var e = [];return this.iter(function (t) {
                var n = t.markedSpans;if (n) for (var r = 0; r < n.length; ++r) {
                  null != n[r].from && e.push(n[r].marker);
                }
              }), e;
            }, posFromIndex: function posFromIndex(e) {
              var t,
                  n = this.first,
                  r = this.lineSeparator().length;return this.iter(function (i) {
                var o = i.text.length + r;return o > e ? (t = e, !0) : (e -= o, void ++n);
              }), me(this, Bo(n, t));
            }, indexFromPos: function indexFromPos(e) {
              e = me(this, e);var t = e.ch;if (e.line < this.first || e.ch < 0) return 0;var n = this.lineSeparator().length;return this.iter(this.first, e.line, function (e) {
                t += e.text.length + n;
              }), t;
            }, copy: function copy(e) {
              var t = new Ca(Qr(this, this.first, this.first + this.size), this.modeOption, this.first, this.lineSep);return t.scrollTop = this.scrollTop, t.scrollLeft = this.scrollLeft, t.sel = this.sel, t.extend = !1, e && (t.history.undoDepth = this.history.undoDepth, t.setHistory(this.getHistory())), t;
            }, linkedDoc: function linkedDoc(e) {
              e || (e = {});var t = this.first,
                  n = this.first + this.size;null != e.from && e.from > t && (t = e.from), null != e.to && e.to < n && (n = e.to);var r = new Ca(Qr(this, t, n), e.mode || this.modeOption, t, this.lineSep);return e.sharedHist && (r.history = this.history), (this.linked || (this.linked = [])).push({ doc: r, sharedHist: e.sharedHist }), r.linked = [{ doc: this, isParent: !0, sharedHist: e.sharedHist }], Zn(r, Xn(this)), r;
            }, unlinkDoc: function unlinkDoc(t) {
              if (t instanceof e && (t = t.doc), this.linked) for (var n = 0; n < this.linked.length; ++n) {
                var r = this.linked[n];if (r.doc == t) {
                  this.linked.splice(n, 1), t.unlinkDoc(this), Jn(Xn(this));break;
                }
              }if (t.history == this.history) {
                var i = [t.id];Kr(t, function (e) {
                  i.push(e.id);
                }, !0), t.history = new oi(null), t.history.done = gi(this.history.done, i), t.history.undone = gi(this.history.undone, i);
              }
            }, iterLinkedDocs: function iterLinkedDocs(e) {
              Kr(this, e);
            }, getMode: function getMode() {
              return this.mode;
            }, getEditor: function getEditor() {
              return this.cm;
            }, splitLines: function splitLines(e) {
              return this.lineSep ? e.split(this.lineSep) : tl(e);
            }, lineSeparator: function lineSeparator() {
              return this.lineSep || "\n";
            } }), Ca.prototype.eachLine = Ca.prototype.iter;var La = "iter insert remove copy getEditor constructor".split(" ");for (var Ta in Ca.prototype) {
            Ca.prototype.hasOwnProperty(Ta) && Pi(La, Ta) < 0 && (e.prototype[Ta] = function (e) {
              return function () {
                return e.apply(this.doc, arguments);
              };
            }(Ca.prototype[Ta]));
          }Ai(Ca);var Ma = e.e_preventDefault = function (e) {
            e.preventDefault ? e.preventDefault() : e.returnValue = !1;
          },
              Na = e.e_stopPropagation = function (e) {
            e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0;
          },
              Aa = e.e_stop = function (e) {
            Ma(e), Na(e);
          },
              Ea = e.on = function (e, t, n) {
            if (e.addEventListener) e.addEventListener(t, n, !1);else if (e.attachEvent) e.attachEvent("on" + t, n);else {
              var r = e._handlers || (e._handlers = {}),
                  i = r[t] || (r[t] = []);i.push(n);
            }
          },
              Oa = [],
              Ia = e.off = function (e, t, n) {
            if (e.removeEventListener) e.removeEventListener(t, n, !1);else if (e.detachEvent) e.detachEvent("on" + t, n);else for (var r = Si(e, t, !1), i = 0; i < r.length; ++i) {
              if (r[i] == n) {
                r.splice(i, 1);break;
              }
            }
          },
              Pa = e.signal = function (e, t) {
            var n = Si(e, t, !0);if (n.length) for (var r = Array.prototype.slice.call(arguments, 2), i = 0; i < n.length; ++i) {
              n[i].apply(null, r);
            }
          },
              Ra = null,
              Da = 30,
              Ha = e.Pass = { toString: function toString() {
              return "CodeMirror.Pass";
            } },
              Wa = { scroll: !1 },
              Ba = { origin: "*mouse" },
              _a = { origin: "+move" };Ei.prototype.set = function (e, t) {
            clearTimeout(this.id), this.id = setTimeout(t, e);
          };var Fa = e.countColumn = function (e, t, n, r, i) {
            null == t && (t = e.search(/[^\s\u00a0]/), -1 == t && (t = e.length));for (var o = r || 0, a = i || 0;;) {
              var l = e.indexOf("	", o);if (0 > l || l >= t) return a + (t - o);a += l - o, a += n - a % n, o = l + 1;
            }
          },
              za = e.findColumn = function (e, t, n) {
            for (var r = 0, i = 0;;) {
              var o = e.indexOf("	", r);-1 == o && (o = e.length);var a = o - r;if (o == e.length || i + a >= t) return r + Math.min(a, t - i);if (i += o - r, i += n - i % n, r = o + 1, i >= t) return r;
            }
          },
              ja = [""],
              Ua = function Ua(e) {
            e.select();
          };No ? Ua = function Ua(e) {
            e.selectionStart = 0, e.selectionEnd = e.value.length;
          } : xo && (Ua = function Ua(e) {
            try {
              e.select();
            } catch (t) {}
          });var qa,
              Ga = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/,
              Ya = e.isWordChar = function (e) {
            return (/\w/.test(e) || e > "" && (e.toUpperCase() != e.toLowerCase() || Ga.test(e))
            );
          },
              $a = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;qa = document.createRange ? function (e, t, n, r) {
            var i = document.createRange();return i.setEnd(r || e, n), i.setStart(e, t), i;
          } : function (e, t, n) {
            var r = document.body.createTextRange();try {
              r.moveToElementText(e.parentNode);
            } catch (i) {
              return r;
            }return r.collapse(!0), r.moveEnd("character", n), r.moveStart("character", t), r;
          };var Va = e.contains = function (e, t) {
            if (3 == t.nodeType && (t = t.parentNode), e.contains) return e.contains(t);do {
              if (11 == t.nodeType && (t = t.host), t == e) return !0;
            } while (t = t.parentNode);
          };xo && 11 > bo && (Gi = function Gi() {
            try {
              return document.activeElement;
            } catch (e) {
              return document.body;
            }
          });var Ka,
              Xa,
              Za = e.rmClass = function (e, t) {
            var n = e.className,
                r = Yi(t).exec(n);if (r) {
              var i = n.slice(r.index + r[0].length);e.className = n.slice(0, r.index) + (i ? r[1] + i : "");
            }
          },
              Ja = e.addClass = function (e, t) {
            var n = e.className;Yi(t).test(n) || (e.className += (n ? " " : "") + t);
          },
              Qa = !1,
              el = function () {
            if (xo && 9 > bo) return !1;var e = ji("div");return "draggable" in e || "dragDrop" in e;
          }(),
              tl = e.splitLines = 3 != "\n\nb".split(/\n/).length ? function (e) {
            for (var t = 0, n = [], r = e.length; r >= t;) {
              var i = e.indexOf("\n", t);-1 == i && (i = e.length);var o = e.slice(t, "\r" == e.charAt(i - 1) ? i - 1 : i),
                  a = o.indexOf("\r");-1 != a ? (n.push(o.slice(0, a)), t += a + 1) : (n.push(o), t = i + 1);
            }return n;
          } : function (e) {
            return e.split(/\r\n?|\n/);
          },
              nl = window.getSelection ? function (e) {
            try {
              return e.selectionStart != e.selectionEnd;
            } catch (t) {
              return !1;
            }
          } : function (e) {
            try {
              var t = e.ownerDocument.selection.createRange();
            } catch (n) {}return t && t.parentElement() == e ? 0 != t.compareEndPoints("StartToEnd", t) : !1;
          },
              rl = function () {
            var e = ji("div");return "oncopy" in e ? !0 : (e.setAttribute("oncopy", "return;"), "function" == typeof e.oncopy);
          }(),
              il = null,
              ol = e.keyNames = { 3: "Enter", 8: "Backspace", 9: "Tab", 13: "Enter", 16: "Shift", 17: "Ctrl", 18: "Alt", 19: "Pause", 20: "CapsLock", 27: "Esc", 32: "Space", 33: "PageUp", 34: "PageDown", 35: "End", 36: "Home", 37: "Left", 38: "Up", 39: "Right", 40: "Down", 44: "PrintScrn", 45: "Insert", 46: "Delete", 59: ";", 61: "=", 91: "Mod", 92: "Mod", 93: "Mod", 106: "*", 107: "=", 109: "-", 110: ".", 111: "/", 127: "Delete", 173: "-", 186: ";", 187: "=", 188: ",", 189: "-", 190: ".", 191: "/", 192: "`", 219: "[", 220: "\\", 221: "]", 222: "'", 63232: "Up", 63233: "Down", 63234: "Left", 63235: "Right", 63272: "Delete", 63273: "Home", 63275: "End", 63276: "PageUp", 63277: "PageDown", 63302: "Insert" };!function () {
            for (var e = 0; 10 > e; e++) {
              ol[e + 48] = ol[e + 96] = String(e);
            }for (var e = 65; 90 >= e; e++) {
              ol[e] = String.fromCharCode(e);
            }for (var e = 1; 12 >= e; e++) {
              ol[e + 111] = ol[e + 63235] = "F" + e;
            }
          }();var al,
              ll = function () {
            function e(e) {
              return 247 >= e ? n.charAt(e) : e >= 1424 && 1524 >= e ? "R" : e >= 1536 && 1773 >= e ? r.charAt(e - 1536) : e >= 1774 && 2220 >= e ? "r" : e >= 8192 && 8203 >= e ? "w" : 8204 == e ? "b" : "L";
            }function t(e, t, n) {
              this.level = e, this.from = t, this.to = n;
            }var n = "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN",
                r = "rrrrrrrrrrrr,rNNmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmrrrrrrrnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmNmmmm",
                i = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/,
                o = /[stwN]/,
                a = /[LRr]/,
                l = /[Lb1n]/,
                s = /[1n]/,
                c = "L";return function (n) {
              if (!i.test(n)) return !1;for (var r, u = n.length, f = [], h = 0; u > h; ++h) {
                f.push(r = e(n.charCodeAt(h)));
              }for (var h = 0, d = c; u > h; ++h) {
                var r = f[h];"m" == r ? f[h] = d : d = r;
              }for (var h = 0, p = c; u > h; ++h) {
                var r = f[h];"1" == r && "r" == p ? f[h] = "n" : a.test(r) && (p = r, "r" == r && (f[h] = "R"));
              }for (var h = 1, d = f[0]; u - 1 > h; ++h) {
                var r = f[h];"+" == r && "1" == d && "1" == f[h + 1] ? f[h] = "1" : "," != r || d != f[h + 1] || "1" != d && "n" != d || (f[h] = d), d = r;
              }for (var h = 0; u > h; ++h) {
                var r = f[h];if ("," == r) f[h] = "N";else if ("%" == r) {
                  for (var m = h + 1; u > m && "%" == f[m]; ++m) {}for (var g = h && "!" == f[h - 1] || u > m && "1" == f[m] ? "1" : "N", v = h; m > v; ++v) {
                    f[v] = g;
                  }h = m - 1;
                }
              }for (var h = 0, p = c; u > h; ++h) {
                var r = f[h];"L" == p && "1" == r ? f[h] = "L" : a.test(r) && (p = r);
              }for (var h = 0; u > h; ++h) {
                if (o.test(f[h])) {
                  for (var m = h + 1; u > m && o.test(f[m]); ++m) {}for (var y = "L" == (h ? f[h - 1] : c), x = "L" == (u > m ? f[m] : c), g = y || x ? "L" : "R", v = h; m > v; ++v) {
                    f[v] = g;
                  }h = m - 1;
                }
              }for (var b, w = [], h = 0; u > h;) {
                if (l.test(f[h])) {
                  var k = h;for (++h; u > h && l.test(f[h]); ++h) {}w.push(new t(0, k, h));
                } else {
                  var S = h,
                      C = w.length;for (++h; u > h && "L" != f[h]; ++h) {}for (var v = S; h > v;) {
                    if (s.test(f[v])) {
                      v > S && w.splice(C, 0, new t(1, S, v));var L = v;for (++v; h > v && s.test(f[v]); ++v) {}w.splice(C, 0, new t(2, L, v)), S = v;
                    } else ++v;
                  }h > S && w.splice(C, 0, new t(1, S, h));
                }
              }return 1 == w[0].level && (b = n.match(/^\s+/)) && (w[0].from = b[0].length, w.unshift(new t(0, 0, b[0].length))), 1 == Ii(w).level && (b = n.match(/\s+$/)) && (Ii(w).to -= b[0].length, w.push(new t(0, u - b[0].length, u))), 2 == w[0].level && w.unshift(new t(1, w[0].to, w[0].to)), w[0].level != Ii(w).level && w.push(new t(w[0].level, u, u)), w;
            };
          }();return e.version = "5.15.2", e;
        });
      }, {}], 11: [function (t, n, r) {
        !function (i) {
          "object" == (typeof r === "undefined" ? "undefined" : _typeof(r)) && "object" == (typeof n === "undefined" ? "undefined" : _typeof(n)) ? i(t("../../lib/codemirror"), t("../markdown/markdown"), t("../../addon/mode/overlay")) : "function" == typeof e && e.amd ? e(["../../lib/codemirror", "../markdown/markdown", "../../addon/mode/overlay"], i) : i(CodeMirror);
        }(function (e) {
          "use strict";
          var t = /^((?:(?:aaas?|about|acap|adiumxtra|af[ps]|aim|apt|attachment|aw|beshare|bitcoin|bolo|callto|cap|chrome(?:-extension)?|cid|coap|com-eventbrite-attendee|content|crid|cvs|data|dav|dict|dlna-(?:playcontainer|playsingle)|dns|doi|dtn|dvb|ed2k|facetime|feed|file|finger|fish|ftp|geo|gg|git|gizmoproject|go|gopher|gtalk|h323|hcp|https?|iax|icap|icon|im|imap|info|ipn|ipp|irc[6s]?|iris(?:\.beep|\.lwz|\.xpc|\.xpcs)?|itms|jar|javascript|jms|keyparc|lastfm|ldaps?|magnet|mailto|maps|market|message|mid|mms|ms-help|msnim|msrps?|mtqp|mumble|mupdate|mvn|news|nfs|nih?|nntp|notes|oid|opaquelocktoken|palm|paparazzi|platform|pop|pres|proxy|psyc|query|res(?:ource)?|rmi|rsync|rtmp|rtsp|secondlife|service|session|sftp|sgn|shttp|sieve|sips?|skype|sm[bs]|snmp|soap\.beeps?|soldat|spotify|ssh|steam|svn|tag|teamspeak|tel(?:net)?|tftp|things|thismessage|tip|tn3270|tv|udp|unreal|urn|ut2004|vemmi|ventrilo|view-source|webcal|wss?|wtai|wyciwyg|xcon(?:-userid)?|xfire|xmlrpc\.beeps?|xmpp|xri|ymsgr|z39\.50[rs]?):(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]|\([^\s()<>]*\))+(?:\([^\s()<>]*\)|[^\s`*!()\[\]{};:'".,<>?«»“”‘’]))/i;e.defineMode("gfm", function (n, r) {
            function i(e) {
              return e.code = !1, null;
            }var o = 0,
                a = { startState: function startState() {
                return { code: !1, codeBlock: !1, ateSpace: !1 };
              }, copyState: function copyState(e) {
                return { code: e.code, codeBlock: e.codeBlock, ateSpace: e.ateSpace };
              }, token: function token(e, n) {
                if (n.combineTokens = null, n.codeBlock) return e.match(/^```+/) ? (n.codeBlock = !1, null) : (e.skipToEnd(), null);if (e.sol() && (n.code = !1), e.sol() && e.match(/^```+/)) return e.skipToEnd(), n.codeBlock = !0, null;if ("`" === e.peek()) {
                  e.next();var i = e.pos;e.eatWhile("`");var a = 1 + e.pos - i;return n.code ? a === o && (n.code = !1) : (o = a, n.code = !0), null;
                }if (n.code) return e.next(), null;if (e.eatSpace()) return n.ateSpace = !0, null;if ((e.sol() || n.ateSpace) && (n.ateSpace = !1, r.gitHubSpice !== !1)) {
                  if (e.match(/^(?:[a-zA-Z0-9\-_]+\/)?(?:[a-zA-Z0-9\-_]+@)?(?:[a-f0-9]{7,40}\b)/)) return n.combineTokens = !0, "link";if (e.match(/^(?:[a-zA-Z0-9\-_]+\/)?(?:[a-zA-Z0-9\-_]+)?#[0-9]+\b/)) return n.combineTokens = !0, "link";
                }return e.match(t) && "](" != e.string.slice(e.start - 2, e.start) && (0 == e.start || /\W/.test(e.string.charAt(e.start - 1))) ? (n.combineTokens = !0, "link") : (e.next(), null);
              }, blankLine: i },
                l = { underscoresBreakWords: !1, taskLists: !0, fencedCodeBlocks: "```", strikethrough: !0 };for (var s in r) {
              l[s] = r[s];
            }return l.name = "markdown", e.overlayMode(e.getMode(n, l), a);
          }, "markdown"), e.defineMIME("text/x-gfm", "gfm");
        });
      }, { "../../addon/mode/overlay": 8, "../../lib/codemirror": 10, "../markdown/markdown": 12 }], 12: [function (t, n, r) {
        !function (i) {
          "object" == (typeof r === "undefined" ? "undefined" : _typeof(r)) && "object" == (typeof n === "undefined" ? "undefined" : _typeof(n)) ? i(t("../../lib/codemirror"), t("../xml/xml"), t("../meta")) : "function" == typeof e && e.amd ? e(["../../lib/codemirror", "../xml/xml", "../meta"], i) : i(CodeMirror);
        }(function (e) {
          "use strict";
          e.defineMode("markdown", function (t, n) {
            function r(n) {
              if (e.findModeByName) {
                var r = e.findModeByName(n);r && (n = r.mime || r.mimes[0]);
              }var i = e.getMode(t, n);return "null" == i.name ? null : i;
            }function i(e, t, n) {
              return t.f = t.inline = n, n(e, t);
            }function o(e, t, n) {
              return t.f = t.block = n, n(e, t);
            }function a(e) {
              return !e || !/\S/.test(e.string);
            }function l(e) {
              return e.linkTitle = !1, e.em = !1, e.strong = !1, e.strikethrough = !1, e.quote = 0, e.indentedCode = !1, k && e.f == c && (e.f = p, e.block = s), e.trailingSpace = 0, e.trailingSpaceNewLine = !1, e.prevLine = e.thisLine, e.thisLine = null, null;
            }function s(t, o) {
              var l = t.sol(),
                  s = o.list !== !1,
                  c = o.indentedCode;o.indentedCode = !1, s && (o.indentationDiff >= 0 ? (o.indentationDiff < 4 && (o.indentation -= o.indentationDiff), o.list = null) : o.indentation > 0 ? o.list = null : o.list = !1);var f = null;if (o.indentationDiff >= 4) return t.skipToEnd(), c || a(o.prevLine) ? (o.indentation -= 4, o.indentedCode = !0, S.code) : null;if (t.eatSpace()) return null;if ((f = t.match(A)) && f[1].length <= 6) return o.header = f[1].length, n.highlightFormatting && (o.formatting = "header"), o.f = o.inline, h(o);if (!(a(o.prevLine) || o.quote || s || c) && (f = t.match(E))) return o.header = "=" == f[0].charAt(0) ? 1 : 2, n.highlightFormatting && (o.formatting = "header"), o.f = o.inline, h(o);if (t.eat(">")) return o.quote = l ? 1 : o.quote + 1, n.highlightFormatting && (o.formatting = "quote"), t.eatSpace(), h(o);if ("[" === t.peek()) return i(t, o, y);if (t.match(L, !0)) return o.hr = !0, S.hr;if ((a(o.prevLine) || s) && (t.match(T, !1) || t.match(M, !1))) {
                var d = null;for (t.match(T, !0) ? d = "ul" : (t.match(M, !0), d = "ol"), o.indentation = t.column() + t.current().length, o.list = !0; o.listStack && t.column() < o.listStack[o.listStack.length - 1];) {
                  o.listStack.pop();
                }return o.listStack.push(o.indentation), n.taskLists && t.match(N, !1) && (o.taskList = !0), o.f = o.inline, n.highlightFormatting && (o.formatting = ["list", "list-" + d]), h(o);
              }return n.fencedCodeBlocks && (f = t.match(I, !0)) ? (o.fencedChars = f[1], o.localMode = r(f[2]), o.localMode && (o.localState = e.startState(o.localMode)), o.f = o.block = u, n.highlightFormatting && (o.formatting = "code-block"), o.code = -1, h(o)) : i(t, o, o.inline);
            }function c(t, n) {
              var r = w.token(t, n.htmlState);if (!k) {
                var i = e.innerMode(w, n.htmlState);("xml" == i.mode.name && null === i.state.tagStart && !i.state.context && i.state.tokenize.isInText || n.md_inside && t.current().indexOf(">") > -1) && (n.f = p, n.block = s, n.htmlState = null);
              }return r;
            }function u(e, t) {
              return t.fencedChars && e.match(t.fencedChars, !1) ? (t.localMode = t.localState = null, t.f = t.block = f, null) : t.localMode ? t.localMode.token(e, t.localState) : (e.skipToEnd(), S.code);
            }function f(e, t) {
              e.match(t.fencedChars), t.block = s, t.f = p, t.fencedChars = null, n.highlightFormatting && (t.formatting = "code-block"), t.code = 1;var r = h(t);return t.code = 0, r;
            }function h(e) {
              var t = [];if (e.formatting) {
                t.push(S.formatting), "string" == typeof e.formatting && (e.formatting = [e.formatting]);for (var r = 0; r < e.formatting.length; r++) {
                  t.push(S.formatting + "-" + e.formatting[r]), "header" === e.formatting[r] && t.push(S.formatting + "-" + e.formatting[r] + "-" + e.header), "quote" === e.formatting[r] && (!n.maxBlockquoteDepth || n.maxBlockquoteDepth >= e.quote ? t.push(S.formatting + "-" + e.formatting[r] + "-" + e.quote) : t.push("error"));
                }
              }if (e.taskOpen) return t.push("meta"), t.length ? t.join(" ") : null;if (e.taskClosed) return t.push("property"), t.length ? t.join(" ") : null;if (e.linkHref ? t.push(S.linkHref, "url") : (e.strong && t.push(S.strong), e.em && t.push(S.em), e.strikethrough && t.push(S.strikethrough), e.linkText && t.push(S.linkText), e.code && t.push(S.code)), e.header && t.push(S.header, S.header + "-" + e.header), e.quote && (t.push(S.quote), !n.maxBlockquoteDepth || n.maxBlockquoteDepth >= e.quote ? t.push(S.quote + "-" + e.quote) : t.push(S.quote + "-" + n.maxBlockquoteDepth)), e.list !== !1) {
                var i = (e.listStack.length - 1) % 3;i ? 1 === i ? t.push(S.list2) : t.push(S.list3) : t.push(S.list1);
              }return e.trailingSpaceNewLine ? t.push("trailing-space-new-line") : e.trailingSpace && t.push("trailing-space-" + (e.trailingSpace % 2 ? "a" : "b")), t.length ? t.join(" ") : null;
            }function d(e, t) {
              return e.match(O, !0) ? h(t) : void 0;
            }function p(t, r) {
              var i = r.text(t, r);if ("undefined" != typeof i) return i;if (r.list) return r.list = null, h(r);if (r.taskList) {
                var a = "x" !== t.match(N, !0)[1];return a ? r.taskOpen = !0 : r.taskClosed = !0, n.highlightFormatting && (r.formatting = "task"), r.taskList = !1, h(r);
              }if (r.taskOpen = !1, r.taskClosed = !1, r.header && t.match(/^#+$/, !0)) return n.highlightFormatting && (r.formatting = "header"), h(r);var l = t.sol(),
                  s = t.next();if (r.linkTitle) {
                r.linkTitle = !1;var u = s;"(" === s && (u = ")"), u = (u + "").replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");var f = "^\\s*(?:[^" + u + "\\\\]+|\\\\\\\\|\\\\.)" + u;if (t.match(new RegExp(f), !0)) return S.linkHref;
              }if ("`" === s) {
                var d = r.formatting;n.highlightFormatting && (r.formatting = "code"), t.eatWhile("`");var p = t.current().length;if (0 == r.code) return r.code = p, h(r);if (p == r.code) {
                  var v = h(r);return r.code = 0, v;
                }return r.formatting = d, h(r);
              }if (r.code) return h(r);if ("\\" === s && (t.next(), n.highlightFormatting)) {
                var y = h(r),
                    x = S.formatting + "-escape";return y ? y + " " + x : x;
              }if ("!" === s && t.match(/\[[^\]]*\] ?(?:\(|\[)/, !1)) return t.match(/\[[^\]]*\]/), r.inline = r.f = g, S.image;if ("[" === s && t.match(/[^\]]*\](\(.*\)| ?\[.*?\])/, !1)) return r.linkText = !0, n.highlightFormatting && (r.formatting = "link"), h(r);if ("]" === s && r.linkText && t.match(/\(.*?\)| ?\[.*?\]/, !1)) {
                n.highlightFormatting && (r.formatting = "link");var y = h(r);return r.linkText = !1, r.inline = r.f = g, y;
              }if ("<" === s && t.match(/^(https?|ftps?):\/\/(?:[^\\>]|\\.)+>/, !1)) {
                r.f = r.inline = m, n.highlightFormatting && (r.formatting = "link");var y = h(r);return y ? y += " " : y = "", y + S.linkInline;
              }if ("<" === s && t.match(/^[^> \\]+@(?:[^\\>]|\\.)+>/, !1)) {
                r.f = r.inline = m, n.highlightFormatting && (r.formatting = "link");var y = h(r);return y ? y += " " : y = "", y + S.linkEmail;
              }if ("<" === s && t.match(/^(!--|\w)/, !1)) {
                var b = t.string.indexOf(">", t.pos);if (-1 != b) {
                  var k = t.string.substring(t.start, b);/markdown\s*=\s*('|"){0,1}1('|"){0,1}/.test(k) && (r.md_inside = !0);
                }return t.backUp(1), r.htmlState = e.startState(w), o(t, r, c);
              }if ("<" === s && t.match(/^\/\w*?>/)) return r.md_inside = !1, "tag";var C = !1;if (!n.underscoresBreakWords && "_" === s && "_" !== t.peek() && t.match(/(\w)/, !1)) {
                var L = t.pos - 2;if (L >= 0) {
                  var T = t.string.charAt(L);"_" !== T && T.match(/(\w)/, !1) && (C = !0);
                }
              }if ("*" === s || "_" === s && !C) {
                if (l && " " === t.peek()) ;else {
                  if (r.strong === s && t.eat(s)) {
                    n.highlightFormatting && (r.formatting = "strong");var v = h(r);return r.strong = !1, v;
                  }if (!r.strong && t.eat(s)) return r.strong = s, n.highlightFormatting && (r.formatting = "strong"), h(r);if (r.em === s) {
                    n.highlightFormatting && (r.formatting = "em");var v = h(r);return r.em = !1, v;
                  }if (!r.em) return r.em = s, n.highlightFormatting && (r.formatting = "em"), h(r);
                }
              } else if (" " === s && (t.eat("*") || t.eat("_"))) {
                if (" " === t.peek()) return h(r);t.backUp(1);
              }if (n.strikethrough) if ("~" === s && t.eatWhile(s)) {
                if (r.strikethrough) {
                  n.highlightFormatting && (r.formatting = "strikethrough");var v = h(r);return r.strikethrough = !1, v;
                }if (t.match(/^[^\s]/, !1)) return r.strikethrough = !0, n.highlightFormatting && (r.formatting = "strikethrough"), h(r);
              } else if (" " === s && t.match(/^~~/, !0)) {
                if (" " === t.peek()) return h(r);t.backUp(2);
              }return " " === s && (t.match(/ +$/, !1) ? r.trailingSpace++ : r.trailingSpace && (r.trailingSpaceNewLine = !0)), h(r);
            }function m(e, t) {
              var r = e.next();if (">" === r) {
                t.f = t.inline = p, n.highlightFormatting && (t.formatting = "link");var i = h(t);return i ? i += " " : i = "", i + S.linkInline;
              }return e.match(/^[^>]+/, !0), S.linkInline;
            }function g(e, t) {
              if (e.eatSpace()) return null;var r = e.next();return "(" === r || "[" === r ? (t.f = t.inline = v("(" === r ? ")" : "]", 0), n.highlightFormatting && (t.formatting = "link-string"), t.linkHref = !0, h(t)) : "error";
            }function v(e) {
              return function (t, r) {
                var i = t.next();if (i === e) {
                  r.f = r.inline = p, n.highlightFormatting && (r.formatting = "link-string");var o = h(r);return r.linkHref = !1, o;
                }return t.match(P[e]), r.linkHref = !0, h(r);
              };
            }function y(e, t) {
              return e.match(/^([^\]\\]|\\.)*\]:/, !1) ? (t.f = x, e.next(), n.highlightFormatting && (t.formatting = "link"), t.linkText = !0, h(t)) : i(e, t, p);
            }function x(e, t) {
              if (e.match(/^\]:/, !0)) {
                t.f = t.inline = b, n.highlightFormatting && (t.formatting = "link");var r = h(t);return t.linkText = !1, r;
              }return e.match(/^([^\]\\]|\\.)+/, !0), S.linkText;
            }function b(e, t) {
              return e.eatSpace() ? null : (e.match(/^[^\s]+/, !0), void 0 === e.peek() ? t.linkTitle = !0 : e.match(/^(?:\s+(?:"(?:[^"\\]|\\\\|\\.)+"|'(?:[^'\\]|\\\\|\\.)+'|\((?:[^)\\]|\\\\|\\.)+\)))?/, !0), t.f = t.inline = p, S.linkHref + " url");
            }var w = e.getMode(t, "text/html"),
                k = "null" == w.name;void 0 === n.highlightFormatting && (n.highlightFormatting = !1), void 0 === n.maxBlockquoteDepth && (n.maxBlockquoteDepth = 0), void 0 === n.underscoresBreakWords && (n.underscoresBreakWords = !0), void 0 === n.taskLists && (n.taskLists = !1), void 0 === n.strikethrough && (n.strikethrough = !1), void 0 === n.tokenTypeOverrides && (n.tokenTypeOverrides = {});var S = { header: "header", code: "comment", quote: "quote", list1: "variable-2", list2: "variable-3", list3: "keyword", hr: "hr", image: "tag", formatting: "formatting", linkInline: "link", linkEmail: "link", linkText: "link", linkHref: "string", em: "em", strong: "strong", strikethrough: "strikethrough" };for (var C in S) {
              S.hasOwnProperty(C) && n.tokenTypeOverrides[C] && (S[C] = n.tokenTypeOverrides[C]);
            }var L = /^([*\-_])(?:\s*\1){2,}\s*$/,
                T = /^[*\-+]\s+/,
                M = /^[0-9]+([.)])\s+/,
                N = /^\[(x| )\](?=\s)/,
                A = n.allowAtxHeaderWithoutSpace ? /^(#+)/ : /^(#+)(?: |$)/,
                E = /^ *(?:\={1,}|-{1,})\s*$/,
                O = /^[^#!\[\]*_\\<>` "'(~]+/,
                I = new RegExp("^(" + (n.fencedCodeBlocks === !0 ? "~~~+|```+" : n.fencedCodeBlocks) + ")[ \\t]*([\\w+#-]*)"),
                P = { ")": /^(?:[^\\\(\)]|\\.|\((?:[^\\\(\)]|\\.)*\))*?(?=\))/, "]": /^(?:[^\\\[\]]|\\.|\[(?:[^\\\[\\]]|\\.)*\])*?(?=\])/ },
                R = { startState: function startState() {
                return { f: s, prevLine: null, thisLine: null, block: s, htmlState: null, indentation: 0, inline: p, text: d, formatting: !1, linkText: !1, linkHref: !1, linkTitle: !1, code: 0, em: !1, strong: !1, header: 0, hr: !1, taskList: !1, list: !1, listStack: [], quote: 0, trailingSpace: 0, trailingSpaceNewLine: !1, strikethrough: !1, fencedChars: null };
              }, copyState: function copyState(t) {
                return { f: t.f, prevLine: t.prevLine, thisLine: t.thisLine, block: t.block, htmlState: t.htmlState && e.copyState(w, t.htmlState), indentation: t.indentation, localMode: t.localMode, localState: t.localMode ? e.copyState(t.localMode, t.localState) : null, inline: t.inline, text: t.text, formatting: !1, linkTitle: t.linkTitle, code: t.code, em: t.em, strong: t.strong, strikethrough: t.strikethrough, header: t.header, hr: t.hr, taskList: t.taskList, list: t.list, listStack: t.listStack.slice(0), quote: t.quote, indentedCode: t.indentedCode, trailingSpace: t.trailingSpace, trailingSpaceNewLine: t.trailingSpaceNewLine, md_inside: t.md_inside, fencedChars: t.fencedChars };
              }, token: function token(e, t) {
                if (t.formatting = !1, e != t.thisLine) {
                  var n = t.header || t.hr;if (t.header = 0, t.hr = !1, e.match(/^\s*$/, !0) || n) {
                    if (l(t), !n) return null;t.prevLine = null;
                  }t.prevLine = t.thisLine, t.thisLine = e, t.taskList = !1, t.trailingSpace = 0, t.trailingSpaceNewLine = !1, t.f = t.block;var r = e.match(/^\s*/, !0)[0].replace(/\t/g, "    ").length;if (t.indentationDiff = Math.min(r - t.indentation, 4), t.indentation = t.indentation + t.indentationDiff, r > 0) return null;
                }return t.f(e, t);
              }, innerMode: function innerMode(e) {
                return e.block == c ? { state: e.htmlState, mode: w } : e.localState ? { state: e.localState, mode: e.localMode } : { state: e, mode: R };
              }, blankLine: l, getType: h, fold: "markdown" };return R;
          }, "xml"), e.defineMIME("text/x-markdown", "markdown");
        });
      }, { "../../lib/codemirror": 10, "../meta": 13, "../xml/xml": 14 }], 13: [function (t, n, r) {
        !function (i) {
          "object" == (typeof r === "undefined" ? "undefined" : _typeof(r)) && "object" == (typeof n === "undefined" ? "undefined" : _typeof(n)) ? i(t("../lib/codemirror")) : "function" == typeof e && e.amd ? e(["../lib/codemirror"], i) : i(CodeMirror);
        }(function (e) {
          "use strict";
          e.modeInfo = [{ name: "APL", mime: "text/apl", mode: "apl", ext: ["dyalog", "apl"] }, { name: "PGP", mimes: ["application/pgp", "application/pgp-keys", "application/pgp-signature"], mode: "asciiarmor", ext: ["pgp"] }, { name: "ASN.1", mime: "text/x-ttcn-asn", mode: "asn.1", ext: ["asn", "asn1"] }, { name: "Asterisk", mime: "text/x-asterisk", mode: "asterisk", file: /^extensions\.conf$/i }, { name: "Brainfuck", mime: "text/x-brainfuck", mode: "brainfuck", ext: ["b", "bf"] }, { name: "C", mime: "text/x-csrc", mode: "clike", ext: ["c", "h"] }, { name: "C++", mime: "text/x-c++src", mode: "clike", ext: ["cpp", "c++", "cc", "cxx", "hpp", "h++", "hh", "hxx"], alias: ["cpp"] }, { name: "Cobol", mime: "text/x-cobol", mode: "cobol", ext: ["cob", "cpy"] }, { name: "C#", mime: "text/x-csharp", mode: "clike", ext: ["cs"], alias: ["csharp"] }, { name: "Clojure", mime: "text/x-clojure", mode: "clojure", ext: ["clj", "cljc", "cljx"] }, { name: "ClojureScript", mime: "text/x-clojurescript", mode: "clojure", ext: ["cljs"] }, { name: "Closure Stylesheets (GSS)", mime: "text/x-gss", mode: "css", ext: ["gss"] }, { name: "CMake", mime: "text/x-cmake", mode: "cmake", ext: ["cmake", "cmake.in"], file: /^CMakeLists.txt$/ }, { name: "CoffeeScript", mime: "text/x-coffeescript", mode: "coffeescript", ext: ["coffee"], alias: ["coffee", "coffee-script"] }, { name: "Common Lisp", mime: "text/x-common-lisp", mode: "commonlisp", ext: ["cl", "lisp", "el"], alias: ["lisp"] }, { name: "Cypher", mime: "application/x-cypher-query", mode: "cypher", ext: ["cyp", "cypher"] }, { name: "Cython", mime: "text/x-cython", mode: "python", ext: ["pyx", "pxd", "pxi"] }, { name: "Crystal", mime: "text/x-crystal", mode: "crystal", ext: ["cr"] }, { name: "CSS", mime: "text/css", mode: "css", ext: ["css"] }, { name: "CQL", mime: "text/x-cassandra", mode: "sql", ext: ["cql"] }, { name: "D", mime: "text/x-d", mode: "d", ext: ["d"] }, { name: "Dart", mimes: ["application/dart", "text/x-dart"], mode: "dart", ext: ["dart"] }, { name: "diff", mime: "text/x-diff", mode: "diff", ext: ["diff", "patch"] }, { name: "Django", mime: "text/x-django", mode: "django" }, { name: "Dockerfile", mime: "text/x-dockerfile", mode: "dockerfile", file: /^Dockerfile$/ }, { name: "DTD", mime: "application/xml-dtd", mode: "dtd", ext: ["dtd"] }, { name: "Dylan", mime: "text/x-dylan", mode: "dylan", ext: ["dylan", "dyl", "intr"] }, { name: "EBNF", mime: "text/x-ebnf", mode: "ebnf" }, { name: "ECL", mime: "text/x-ecl", mode: "ecl", ext: ["ecl"] }, { name: "edn", mime: "application/edn", mode: "clojure", ext: ["edn"] }, { name: "Eiffel", mime: "text/x-eiffel", mode: "eiffel", ext: ["e"] }, { name: "Elm", mime: "text/x-elm", mode: "elm", ext: ["elm"] }, { name: "Embedded Javascript", mime: "application/x-ejs", mode: "htmlembedded", ext: ["ejs"] }, { name: "Embedded Ruby", mime: "application/x-erb", mode: "htmlembedded", ext: ["erb"] }, { name: "Erlang", mime: "text/x-erlang", mode: "erlang", ext: ["erl"] }, { name: "Factor", mime: "text/x-factor", mode: "factor", ext: ["factor"] }, { name: "FCL", mime: "text/x-fcl", mode: "fcl" }, { name: "Forth", mime: "text/x-forth", mode: "forth", ext: ["forth", "fth", "4th"] }, { name: "Fortran", mime: "text/x-fortran", mode: "fortran", ext: ["f", "for", "f77", "f90"] }, { name: "F#", mime: "text/x-fsharp", mode: "mllike", ext: ["fs"], alias: ["fsharp"] }, { name: "Gas", mime: "text/x-gas", mode: "gas", ext: ["s"] }, { name: "Gherkin", mime: "text/x-feature", mode: "gherkin", ext: ["feature"] }, { name: "GitHub Flavored Markdown", mime: "text/x-gfm", mode: "gfm", file: /^(readme|contributing|history).md$/i }, { name: "Go", mime: "text/x-go", mode: "go", ext: ["go"] }, { name: "Groovy", mime: "text/x-groovy", mode: "groovy", ext: ["groovy", "gradle"] }, { name: "HAML", mime: "text/x-haml", mode: "haml", ext: ["haml"] }, { name: "Haskell", mime: "text/x-haskell", mode: "haskell", ext: ["hs"] }, { name: "Haskell (Literate)", mime: "text/x-literate-haskell", mode: "haskell-literate", ext: ["lhs"] }, { name: "Haxe", mime: "text/x-haxe", mode: "haxe", ext: ["hx"] }, { name: "HXML", mime: "text/x-hxml", mode: "haxe", ext: ["hxml"] }, { name: "ASP.NET", mime: "application/x-aspx", mode: "htmlembedded", ext: ["aspx"], alias: ["asp", "aspx"] }, { name: "HTML", mime: "text/html", mode: "htmlmixed", ext: ["html", "htm"], alias: ["xhtml"] }, { name: "HTTP", mime: "message/http", mode: "http" }, { name: "IDL", mime: "text/x-idl", mode: "idl", ext: ["pro"] }, { name: "Jade", mime: "text/x-jade", mode: "jade", ext: ["jade"] }, { name: "Java", mime: "text/x-java", mode: "clike", ext: ["java"] }, { name: "Java Server Pages", mime: "application/x-jsp", mode: "htmlembedded", ext: ["jsp"], alias: ["jsp"] }, { name: "JavaScript", mimes: ["text/javascript", "text/ecmascript", "application/javascript", "application/x-javascript", "application/ecmascript"], mode: "javascript", ext: ["js"], alias: ["ecmascript", "js", "node"] }, { name: "JSON", mimes: ["application/json", "application/x-json"], mode: "javascript", ext: ["json", "map"], alias: ["json5"] }, { name: "JSON-LD", mime: "application/ld+json", mode: "javascript", ext: ["jsonld"], alias: ["jsonld"] }, { name: "JSX", mime: "text/jsx", mode: "jsx", ext: ["jsx"] }, { name: "Jinja2", mime: "null", mode: "jinja2" }, { name: "Julia", mime: "text/x-julia", mode: "julia", ext: ["jl"] }, { name: "Kotlin", mime: "text/x-kotlin", mode: "clike", ext: ["kt"] }, { name: "LESS", mime: "text/x-less", mode: "css", ext: ["less"] }, { name: "LiveScript", mime: "text/x-livescript", mode: "livescript", ext: ["ls"], alias: ["ls"] }, { name: "Lua", mime: "text/x-lua", mode: "lua", ext: ["lua"] }, { name: "Markdown", mime: "text/x-markdown", mode: "markdown", ext: ["markdown", "md", "mkd"] }, { name: "mIRC", mime: "text/mirc", mode: "mirc" }, { name: "MariaDB SQL", mime: "text/x-mariadb", mode: "sql" }, { name: "Mathematica", mime: "text/x-mathematica", mode: "mathematica", ext: ["m", "nb"] }, { name: "Modelica", mime: "text/x-modelica", mode: "modelica", ext: ["mo"] }, { name: "MUMPS", mime: "text/x-mumps", mode: "mumps", ext: ["mps"] }, { name: "MS SQL", mime: "text/x-mssql", mode: "sql" }, { name: "mbox", mime: "application/mbox", mode: "mbox", ext: ["mbox"] }, { name: "MySQL", mime: "text/x-mysql", mode: "sql" }, { name: "Nginx", mime: "text/x-nginx-conf", mode: "nginx", file: /nginx.*\.conf$/i }, { name: "NSIS", mime: "text/x-nsis", mode: "nsis", ext: ["nsh", "nsi"] }, { name: "NTriples", mime: "text/n-triples", mode: "ntriples", ext: ["nt"] }, { name: "Objective C", mime: "text/x-objectivec", mode: "clike", ext: ["m", "mm"], alias: ["objective-c", "objc"] }, { name: "OCaml", mime: "text/x-ocaml", mode: "mllike", ext: ["ml", "mli", "mll", "mly"] }, { name: "Octave", mime: "text/x-octave", mode: "octave", ext: ["m"] }, { name: "Oz", mime: "text/x-oz", mode: "oz", ext: ["oz"] }, { name: "Pascal", mime: "text/x-pascal", mode: "pascal", ext: ["p", "pas"] }, { name: "PEG.js", mime: "null", mode: "pegjs", ext: ["jsonld"] }, { name: "Perl", mime: "text/x-perl", mode: "perl", ext: ["pl", "pm"] }, { name: "PHP", mime: "application/x-httpd-php", mode: "php", ext: ["php", "php3", "php4", "php5", "phtml"] }, { name: "Pig", mime: "text/x-pig", mode: "pig", ext: ["pig"] }, { name: "Plain Text", mime: "text/plain", mode: "null", ext: ["txt", "text", "conf", "def", "list", "log"] }, { name: "PLSQL", mime: "text/x-plsql", mode: "sql", ext: ["pls"] }, { name: "PowerShell", mime: "application/x-powershell", mode: "powershell", ext: ["ps1", "psd1", "psm1"] }, { name: "Properties files", mime: "text/x-properties", mode: "properties", ext: ["properties", "ini", "in"], alias: ["ini", "properties"] }, { name: "ProtoBuf", mime: "text/x-protobuf", mode: "protobuf", ext: ["proto"] }, { name: "Python", mime: "text/x-python", mode: "python", ext: ["BUILD", "bzl", "py", "pyw"], file: /^(BUCK|BUILD)$/ }, { name: "Puppet", mime: "text/x-puppet", mode: "puppet", ext: ["pp"] }, { name: "Q", mime: "text/x-q", mode: "q", ext: ["q"] }, { name: "R", mime: "text/x-rsrc", mode: "r", ext: ["r"], alias: ["rscript"] }, { name: "reStructuredText", mime: "text/x-rst", mode: "rst", ext: ["rst"], alias: ["rst"] }, { name: "RPM Changes", mime: "text/x-rpm-changes", mode: "rpm" }, { name: "RPM Spec", mime: "text/x-rpm-spec", mode: "rpm", ext: ["spec"] }, { name: "Ruby", mime: "text/x-ruby", mode: "ruby", ext: ["rb"], alias: ["jruby", "macruby", "rake", "rb", "rbx"] }, { name: "Rust", mime: "text/x-rustsrc", mode: "rust", ext: ["rs"] }, { name: "SAS", mime: "text/x-sas", mode: "sas", ext: ["sas"] }, { name: "Sass", mime: "text/x-sass", mode: "sass", ext: ["sass"] }, { name: "Scala", mime: "text/x-scala", mode: "clike", ext: ["scala"] }, { name: "Scheme", mime: "text/x-scheme", mode: "scheme", ext: ["scm", "ss"] }, { name: "SCSS", mime: "text/x-scss", mode: "css", ext: ["scss"] }, { name: "Shell", mime: "text/x-sh", mode: "shell", ext: ["sh", "ksh", "bash"], alias: ["bash", "sh", "zsh"], file: /^PKGBUILD$/ }, { name: "Sieve", mime: "application/sieve", mode: "sieve", ext: ["siv", "sieve"] }, { name: "Slim", mimes: ["text/x-slim", "application/x-slim"], mode: "slim", ext: ["slim"] }, { name: "Smalltalk", mime: "text/x-stsrc", mode: "smalltalk", ext: ["st"] }, { name: "Smarty", mime: "text/x-smarty", mode: "smarty", ext: ["tpl"] }, { name: "Solr", mime: "text/x-solr", mode: "solr" }, { name: "Soy", mime: "text/x-soy", mode: "soy", ext: ["soy"], alias: ["closure template"] }, { name: "SPARQL", mime: "application/sparql-query", mode: "sparql", ext: ["rq", "sparql"], alias: ["sparul"] }, { name: "Spreadsheet", mime: "text/x-spreadsheet", mode: "spreadsheet", alias: ["excel", "formula"] }, { name: "SQL", mime: "text/x-sql", mode: "sql", ext: ["sql"] }, { name: "Squirrel", mime: "text/x-squirrel", mode: "clike", ext: ["nut"] }, { name: "Swift", mime: "text/x-swift", mode: "swift", ext: ["swift"] }, { name: "sTeX", mime: "text/x-stex", mode: "stex" }, { name: "LaTeX", mime: "text/x-latex", mode: "stex", ext: ["text", "ltx"], alias: ["tex"] }, { name: "SystemVerilog", mime: "text/x-systemverilog", mode: "verilog", ext: ["v"] }, { name: "Tcl", mime: "text/x-tcl", mode: "tcl", ext: ["tcl"] }, { name: "Textile", mime: "text/x-textile", mode: "textile", ext: ["textile"] }, { name: "TiddlyWiki ", mime: "text/x-tiddlywiki", mode: "tiddlywiki" }, { name: "Tiki wiki", mime: "text/tiki", mode: "tiki" }, { name: "TOML", mime: "text/x-toml", mode: "toml", ext: ["toml"] }, { name: "Tornado", mime: "text/x-tornado", mode: "tornado" }, { name: "troff", mime: "text/troff", mode: "troff", ext: ["1", "2", "3", "4", "5", "6", "7", "8", "9"] }, { name: "TTCN", mime: "text/x-ttcn", mode: "ttcn", ext: ["ttcn", "ttcn3", "ttcnpp"] }, { name: "TTCN_CFG", mime: "text/x-ttcn-cfg", mode: "ttcn-cfg", ext: ["cfg"] }, { name: "Turtle", mime: "text/turtle", mode: "turtle", ext: ["ttl"] }, { name: "TypeScript", mime: "application/typescript", mode: "javascript", ext: ["ts"], alias: ["ts"] }, { name: "Twig", mime: "text/x-twig", mode: "twig" }, { name: "Web IDL", mime: "text/x-webidl", mode: "webidl", ext: ["webidl"] }, { name: "VB.NET", mime: "text/x-vb", mode: "vb", ext: ["vb"] }, { name: "VBScript", mime: "text/vbscript", mode: "vbscript", ext: ["vbs"] }, { name: "Velocity", mime: "text/velocity", mode: "velocity", ext: ["vtl"] }, { name: "Verilog", mime: "text/x-verilog", mode: "verilog", ext: ["v"] }, { name: "VHDL", mime: "text/x-vhdl", mode: "vhdl", ext: ["vhd", "vhdl"] }, { name: "XML", mimes: ["application/xml", "text/xml"], mode: "xml", ext: ["xml", "xsl", "xsd"], alias: ["rss", "wsdl", "xsd"] }, { name: "XQuery", mime: "application/xquery", mode: "xquery", ext: ["xy", "xquery"] }, { name: "Yacas", mime: "text/x-yacas", mode: "yacas", ext: ["ys"] }, { name: "YAML", mime: "text/x-yaml", mode: "yaml", ext: ["yaml", "yml"], alias: ["yml"] }, { name: "Z80", mime: "text/x-z80", mode: "z80", ext: ["z80"] }, { name: "mscgen", mime: "text/x-mscgen", mode: "mscgen", ext: ["mscgen", "mscin", "msc"] }, { name: "xu", mime: "text/x-xu", mode: "mscgen", ext: ["xu"] }, { name: "msgenny", mime: "text/x-msgenny", mode: "mscgen", ext: ["msgenny"] }];for (var t = 0; t < e.modeInfo.length; t++) {
            var n = e.modeInfo[t];n.mimes && (n.mime = n.mimes[0]);
          }e.findModeByMIME = function (t) {
            t = t.toLowerCase();for (var n = 0; n < e.modeInfo.length; n++) {
              var r = e.modeInfo[n];if (r.mime == t) return r;if (r.mimes) for (var i = 0; i < r.mimes.length; i++) {
                if (r.mimes[i] == t) return r;
              }
            }
          }, e.findModeByExtension = function (t) {
            for (var n = 0; n < e.modeInfo.length; n++) {
              var r = e.modeInfo[n];if (r.ext) for (var i = 0; i < r.ext.length; i++) {
                if (r.ext[i] == t) return r;
              }
            }
          }, e.findModeByFileName = function (t) {
            for (var n = 0; n < e.modeInfo.length; n++) {
              var r = e.modeInfo[n];if (r.file && r.file.test(t)) return r;
            }var i = t.lastIndexOf("."),
                o = i > -1 && t.substring(i + 1, t.length);return o ? e.findModeByExtension(o) : void 0;
          }, e.findModeByName = function (t) {
            t = t.toLowerCase();for (var n = 0; n < e.modeInfo.length; n++) {
              var r = e.modeInfo[n];if (r.name.toLowerCase() == t) return r;if (r.alias) for (var i = 0; i < r.alias.length; i++) {
                if (r.alias[i].toLowerCase() == t) return r;
              }
            }
          };
        });
      }, { "../lib/codemirror": 10 }], 14: [function (t, n, r) {
        !function (i) {
          "object" == (typeof r === "undefined" ? "undefined" : _typeof(r)) && "object" == (typeof n === "undefined" ? "undefined" : _typeof(n)) ? i(t("../../lib/codemirror")) : "function" == typeof e && e.amd ? e(["../../lib/codemirror"], i) : i(CodeMirror);
        }(function (e) {
          "use strict";
          var t = { autoSelfClosers: { area: !0, base: !0, br: !0, col: !0, command: !0, embed: !0, frame: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0, menuitem: !0 }, implicitlyClosed: { dd: !0, li: !0, optgroup: !0, option: !0, p: !0, rp: !0, rt: !0, tbody: !0, td: !0, tfoot: !0, th: !0, tr: !0 }, contextGrabbers: { dd: { dd: !0, dt: !0 }, dt: { dd: !0, dt: !0 }, li: { li: !0 }, option: { option: !0, optgroup: !0 }, optgroup: { optgroup: !0 }, p: { address: !0, article: !0, aside: !0, blockquote: !0, dir: !0, div: !0, dl: !0, fieldset: !0, footer: !0, form: !0, h1: !0, h2: !0, h3: !0, h4: !0, h5: !0, h6: !0, header: !0, hgroup: !0, hr: !0, menu: !0, nav: !0, ol: !0, p: !0, pre: !0, section: !0, table: !0, ul: !0 }, rp: { rp: !0, rt: !0 }, rt: { rp: !0, rt: !0 }, tbody: { tbody: !0, tfoot: !0 }, td: { td: !0, th: !0 }, tfoot: { tbody: !0 }, th: { td: !0, th: !0 }, thead: { tbody: !0, tfoot: !0 }, tr: { tr: !0 } }, doNotIndent: { pre: !0 }, allowUnquoted: !0, allowMissing: !0, caseFold: !0 },
              n = { autoSelfClosers: {}, implicitlyClosed: {}, contextGrabbers: {}, doNotIndent: {}, allowUnquoted: !1, allowMissing: !1, caseFold: !1 };e.defineMode("xml", function (r, i) {
            function o(e, t) {
              function n(n) {
                return t.tokenize = n, n(e, t);
              }var r = e.next();if ("<" == r) return e.eat("!") ? e.eat("[") ? e.match("CDATA[") ? n(s("atom", "]]>")) : null : e.match("--") ? n(s("comment", "-->")) : e.match("DOCTYPE", !0, !0) ? (e.eatWhile(/[\w\._\-]/), n(c(1))) : null : e.eat("?") ? (e.eatWhile(/[\w\._\-]/), t.tokenize = s("meta", "?>"), "meta") : (T = e.eat("/") ? "closeTag" : "openTag", t.tokenize = a, "tag bracket");if ("&" == r) {
                var i;return i = e.eat("#") ? e.eat("x") ? e.eatWhile(/[a-fA-F\d]/) && e.eat(";") : e.eatWhile(/[\d]/) && e.eat(";") : e.eatWhile(/[\w\.\-:]/) && e.eat(";"), i ? "atom" : "error";
              }return e.eatWhile(/[^&<]/), null;
            }function a(e, t) {
              var n = e.next();if (">" == n || "/" == n && e.eat(">")) return t.tokenize = o, T = ">" == n ? "endTag" : "selfcloseTag", "tag bracket";if ("=" == n) return T = "equals", null;if ("<" == n) {
                t.tokenize = o, t.state = d, t.tagName = t.tagStart = null;var r = t.tokenize(e, t);return r ? r + " tag error" : "tag error";
              }return (/[\'\"]/.test(n) ? (t.tokenize = l(n), t.stringStartCol = e.column(), t.tokenize(e, t)) : (e.match(/^[^\s\u00a0=<>\"\']*[^\s\u00a0=<>\"\'\/]/), "word")
              );
            }function l(e) {
              var t = function t(_t2, n) {
                for (; !_t2.eol();) {
                  if (_t2.next() == e) {
                    n.tokenize = a;break;
                  }
                }return "string";
              };return t.isInAttribute = !0, t;
            }function s(e, t) {
              return function (n, r) {
                for (; !n.eol();) {
                  if (n.match(t)) {
                    r.tokenize = o;break;
                  }n.next();
                }return e;
              };
            }function c(e) {
              return function (t, n) {
                for (var r; null != (r = t.next());) {
                  if ("<" == r) return n.tokenize = c(e + 1), n.tokenize(t, n);if (">" == r) {
                    if (1 == e) {
                      n.tokenize = o;break;
                    }return n.tokenize = c(e - 1), n.tokenize(t, n);
                  }
                }return "meta";
              };
            }function u(e, t, n) {
              this.prev = e.context, this.tagName = t, this.indent = e.indented, this.startOfLine = n, (S.doNotIndent.hasOwnProperty(t) || e.context && e.context.noIndent) && (this.noIndent = !0);
            }function f(e) {
              e.context && (e.context = e.context.prev);
            }function h(e, t) {
              for (var n;;) {
                if (!e.context) return;if (n = e.context.tagName, !S.contextGrabbers.hasOwnProperty(n) || !S.contextGrabbers[n].hasOwnProperty(t)) return;f(e);
              }
            }function d(e, t, n) {
              return "openTag" == e ? (n.tagStart = t.column(), p) : "closeTag" == e ? m : d;
            }function p(e, t, n) {
              return "word" == e ? (n.tagName = t.current(), M = "tag", y) : (M = "error", p);
            }function m(e, t, n) {
              if ("word" == e) {
                var r = t.current();return n.context && n.context.tagName != r && S.implicitlyClosed.hasOwnProperty(n.context.tagName) && f(n), n.context && n.context.tagName == r || S.matchClosing === !1 ? (M = "tag", g) : (M = "tag error", v);
              }return M = "error", v;
            }function g(e, t, n) {
              return "endTag" != e ? (M = "error", g) : (f(n), d);
            }function v(e, t, n) {
              return M = "error", g(e, t, n);
            }function y(e, t, n) {
              if ("word" == e) return M = "attribute", x;if ("endTag" == e || "selfcloseTag" == e) {
                var r = n.tagName,
                    i = n.tagStart;return n.tagName = n.tagStart = null, "selfcloseTag" == e || S.autoSelfClosers.hasOwnProperty(r) ? h(n, r) : (h(n, r), n.context = new u(n, r, i == n.indented)), d;
              }return M = "error", y;
            }function x(e, t, n) {
              return "equals" == e ? b : (S.allowMissing || (M = "error"), y(e, t, n));
            }function b(e, t, n) {
              return "string" == e ? w : "word" == e && S.allowUnquoted ? (M = "string", y) : (M = "error", y(e, t, n));
            }function w(e, t, n) {
              return "string" == e ? w : y(e, t, n);
            }var k = r.indentUnit,
                S = {},
                C = i.htmlMode ? t : n;for (var L in C) {
              S[L] = C[L];
            }for (var L in i) {
              S[L] = i[L];
            }var T, M;return o.isInText = !0, { startState: function startState(e) {
                var t = { tokenize: o, state: d, indented: e || 0, tagName: null, tagStart: null, context: null };return null != e && (t.baseIndent = e), t;
              }, token: function token(e, t) {
                if (!t.tagName && e.sol() && (t.indented = e.indentation()), e.eatSpace()) return null;T = null;var n = t.tokenize(e, t);return (n || T) && "comment" != n && (M = null, t.state = t.state(T || n, e, t), M && (n = "error" == M ? n + " error" : M)), n;
              }, indent: function indent(t, n, r) {
                var i = t.context;if (t.tokenize.isInAttribute) return t.tagStart == t.indented ? t.stringStartCol + 1 : t.indented + k;if (i && i.noIndent) return e.Pass;if (t.tokenize != a && t.tokenize != o) return r ? r.match(/^(\s*)/)[0].length : 0;if (t.tagName) return S.multilineTagIndentPastTag !== !1 ? t.tagStart + t.tagName.length + 2 : t.tagStart + k * (S.multilineTagIndentFactor || 1);if (S.alignCDATA && /<!\[CDATA\[/.test(n)) return 0;var l = n && /^<(\/)?([\w_:\.-]*)/.exec(n);if (l && l[1]) for (; i;) {
                  if (i.tagName == l[2]) {
                    i = i.prev;break;
                  }if (!S.implicitlyClosed.hasOwnProperty(i.tagName)) break;i = i.prev;
                } else if (l) for (; i;) {
                  var s = S.contextGrabbers[i.tagName];if (!s || !s.hasOwnProperty(l[2])) break;i = i.prev;
                }for (; i && i.prev && !i.startOfLine;) {
                  i = i.prev;
                }return i ? i.indent + k : t.baseIndent || 0;
              }, electricInput: /<\/[\s\w:]+>$/, blockCommentStart: "<!--", blockCommentEnd: "-->", configuration: S.htmlMode ? "html" : "xml", helperType: S.htmlMode ? "html" : "xml", skipAttribute: function skipAttribute(e) {
                e.state == b && (e.state = y);
              } };
          }), e.defineMIME("text/xml", "xml"), e.defineMIME("application/xml", "xml"), e.mimeModes.hasOwnProperty("text/html") || e.defineMIME("text/html", { name: "xml", htmlMode: !0 });
        });
      }, { "../../lib/codemirror": 10 }], 15: [function (e, t, n) {
        n.read = function (e, t, n, r, i) {
          var o,
              a,
              l = 8 * i - r - 1,
              s = (1 << l) - 1,
              c = s >> 1,
              u = -7,
              f = n ? i - 1 : 0,
              h = n ? -1 : 1,
              d = e[t + f];for (f += h, o = d & (1 << -u) - 1, d >>= -u, u += l; u > 0; o = 256 * o + e[t + f], f += h, u -= 8) {}for (a = o & (1 << -u) - 1, o >>= -u, u += r; u > 0; a = 256 * a + e[t + f], f += h, u -= 8) {}if (0 === o) o = 1 - c;else {
            if (o === s) return a ? NaN : (d ? -1 : 1) * (1 / 0);a += Math.pow(2, r), o -= c;
          }return (d ? -1 : 1) * a * Math.pow(2, o - r);
        }, n.write = function (e, t, n, r, i, o) {
          var a,
              l,
              s,
              c = 8 * o - i - 1,
              u = (1 << c) - 1,
              f = u >> 1,
              h = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
              d = r ? 0 : o - 1,
              p = r ? 1 : -1,
              m = 0 > t || 0 === t && 0 > 1 / t ? 1 : 0;for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (l = isNaN(t) ? 1 : 0, a = u) : (a = Math.floor(Math.log(t) / Math.LN2), t * (s = Math.pow(2, -a)) < 1 && (a--, s *= 2), t += a + f >= 1 ? h / s : h * Math.pow(2, 1 - f), t * s >= 2 && (a++, s /= 2), a + f >= u ? (l = 0, a = u) : a + f >= 1 ? (l = (t * s - 1) * Math.pow(2, i), a += f) : (l = t * Math.pow(2, f - 1) * Math.pow(2, i), a = 0)); i >= 8; e[n + d] = 255 & l, d += p, l /= 256, i -= 8) {}for (a = a << i | l, c += i; c > 0; e[n + d] = 255 & a, d += p, a /= 256, c -= 8) {}e[n + d - p] |= 128 * m;
        };
      }, {}], 16: [function (e, t, n) {
        var r = {}.toString;t.exports = Array.isArray || function (e) {
          return "[object Array]" == r.call(e);
        };
      }, {}], 17: [function (t, n, r) {
        (function (t) {
          (function () {
            function t(e) {
              this.tokens = [], this.tokens.links = {}, this.options = e || h.defaults, this.rules = d.normal, this.options.gfm && (this.options.tables ? this.rules = d.tables : this.rules = d.gfm);
            }function i(e, t) {
              if (this.options = t || h.defaults, this.links = e, this.rules = p.normal, this.renderer = this.options.renderer || new o(), this.renderer.options = this.options, !this.links) throw new Error("Tokens array requires a `links` property.");this.options.gfm ? this.options.breaks ? this.rules = p.breaks : this.rules = p.gfm : this.options.pedantic && (this.rules = p.pedantic);
            }function o(e) {
              this.options = e || {};
            }function a(e) {
              this.tokens = [], this.token = null, this.options = e || h.defaults, this.options.renderer = this.options.renderer || new o(), this.renderer = this.options.renderer, this.renderer.options = this.options;
            }function l(e, t) {
              return e.replace(t ? /&/g : /&(?!#?\w+;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
            }function s(e) {
              return e.replace(/&([#\w]+);/g, function (e, t) {
                return t = t.toLowerCase(), "colon" === t ? ":" : "#" === t.charAt(0) ? "x" === t.charAt(1) ? String.fromCharCode(parseInt(t.substring(2), 16)) : String.fromCharCode(+t.substring(1)) : "";
              });
            }function c(e, t) {
              return e = e.source, t = t || "", function n(r, i) {
                return r ? (i = i.source || i, i = i.replace(/(^|[^\[])\^/g, "$1"), e = e.replace(r, i), n) : new RegExp(e, t);
              };
            }function u() {}function f(e) {
              for (var t, n, r = 1; r < arguments.length; r++) {
                t = arguments[r];for (n in t) {
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                }
              }return e;
            }function h(e, n, r) {
              if (r || "function" == typeof n) {
                r || (r = n, n = null), n = f({}, h.defaults, n || {});var i,
                    o,
                    s = n.highlight,
                    c = 0;try {
                  i = t.lex(e, n);
                } catch (u) {
                  return r(u);
                }o = i.length;var d = function d(e) {
                  if (e) return n.highlight = s, r(e);var t;try {
                    t = a.parse(i, n);
                  } catch (o) {
                    e = o;
                  }return n.highlight = s, e ? r(e) : r(null, t);
                };if (!s || s.length < 3) return d();if (delete n.highlight, !o) return d();for (; c < i.length; c++) {
                  !function (e) {
                    return "code" !== e.type ? --o || d() : s(e.text, e.lang, function (t, n) {
                      return t ? d(t) : null == n || n === e.text ? --o || d() : (e.text = n, e.escaped = !0, void (--o || d()));
                    });
                  }(i[c]);
                }
              } else try {
                return n && (n = f({}, h.defaults, n)), a.parse(t.lex(e, n), n);
              } catch (u) {
                if (u.message += "\nPlease report this to https://github.com/chjj/marked.", (n || h.defaults).silent) return "<p>An error occured:</p><pre>" + l(u.message + "", !0) + "</pre>";throw u;
              }
            }var d = { newline: /^\n+/, code: /^( {4}[^\n]+\n*)+/, fences: u, hr: /^( *[-*_]){3,} *(?:\n+|$)/, heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/, nptable: u, lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/, blockquote: /^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/, list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/, html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/, def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/, table: u, paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/, text: /^[^\n]+/ };d.bullet = /(?:[*+-]|\d+\.)/, d.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/, d.item = c(d.item, "gm")(/bull/g, d.bullet)(), d.list = c(d.list)(/bull/g, d.bullet)("hr", "\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))")("def", "\\n+(?=" + d.def.source + ")")(), d.blockquote = c(d.blockquote)("def", d.def)(), d._tag = "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b", d.html = c(d.html)("comment", /<!--[\s\S]*?-->/)("closed", /<(tag)[\s\S]+?<\/\1>/)("closing", /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g, d._tag)(), d.paragraph = c(d.paragraph)("hr", d.hr)("heading", d.heading)("lheading", d.lheading)("blockquote", d.blockquote)("tag", "<" + d._tag)("def", d.def)(), d.normal = f({}, d), d.gfm = f({}, d.normal, { fences: /^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/, paragraph: /^/, heading: /^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/ }), d.gfm.paragraph = c(d.paragraph)("(?!", "(?!" + d.gfm.fences.source.replace("\\1", "\\2") + "|" + d.list.source.replace("\\1", "\\3") + "|")(), d.tables = f({}, d.gfm, { nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/, table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/ }), t.rules = d, t.lex = function (e, n) {
              var r = new t(n);return r.lex(e);
            }, t.prototype.lex = function (e) {
              return e = e.replace(/\r\n|\r/g, "\n").replace(/\t/g, "    ").replace(/\u00a0/g, " ").replace(/\u2424/g, "\n"), this.token(e, !0);
            }, t.prototype.token = function (e, t, n) {
              for (var r, i, o, a, l, s, c, u, f, e = e.replace(/^ +$/gm, ""); e;) {
                if ((o = this.rules.newline.exec(e)) && (e = e.substring(o[0].length), o[0].length > 1 && this.tokens.push({ type: "space" })), o = this.rules.code.exec(e)) e = e.substring(o[0].length), o = o[0].replace(/^ {4}/gm, ""), this.tokens.push({ type: "code", text: this.options.pedantic ? o : o.replace(/\n+$/, "") });else if (o = this.rules.fences.exec(e)) e = e.substring(o[0].length), this.tokens.push({ type: "code", lang: o[2], text: o[3] || "" });else if (o = this.rules.heading.exec(e)) e = e.substring(o[0].length), this.tokens.push({ type: "heading", depth: o[1].length, text: o[2] });else if (t && (o = this.rules.nptable.exec(e))) {
                  for (e = e.substring(o[0].length), s = { type: "table", header: o[1].replace(/^ *| *\| *$/g, "").split(/ *\| */), align: o[2].replace(/^ *|\| *$/g, "").split(/ *\| */), cells: o[3].replace(/\n$/, "").split("\n") }, u = 0; u < s.align.length; u++) {
                    /^ *-+: *$/.test(s.align[u]) ? s.align[u] = "right" : /^ *:-+: *$/.test(s.align[u]) ? s.align[u] = "center" : /^ *:-+ *$/.test(s.align[u]) ? s.align[u] = "left" : s.align[u] = null;
                  }for (u = 0; u < s.cells.length; u++) {
                    s.cells[u] = s.cells[u].split(/ *\| */);
                  }this.tokens.push(s);
                } else if (o = this.rules.lheading.exec(e)) e = e.substring(o[0].length), this.tokens.push({ type: "heading", depth: "=" === o[2] ? 1 : 2, text: o[1] });else if (o = this.rules.hr.exec(e)) e = e.substring(o[0].length), this.tokens.push({ type: "hr" });else if (o = this.rules.blockquote.exec(e)) e = e.substring(o[0].length), this.tokens.push({ type: "blockquote_start" }), o = o[0].replace(/^ *> ?/gm, ""), this.token(o, t, !0), this.tokens.push({ type: "blockquote_end" });else if (o = this.rules.list.exec(e)) {
                  for (e = e.substring(o[0].length), a = o[2], this.tokens.push({ type: "list_start", ordered: a.length > 1 }), o = o[0].match(this.rules.item), r = !1, f = o.length, u = 0; f > u; u++) {
                    s = o[u], c = s.length, s = s.replace(/^ *([*+-]|\d+\.) +/, ""), ~s.indexOf("\n ") && (c -= s.length, s = this.options.pedantic ? s.replace(/^ {1,4}/gm, "") : s.replace(new RegExp("^ {1," + c + "}", "gm"), "")), this.options.smartLists && u !== f - 1 && (l = d.bullet.exec(o[u + 1])[0], a === l || a.length > 1 && l.length > 1 || (e = o.slice(u + 1).join("\n") + e, u = f - 1)), i = r || /\n\n(?!\s*$)/.test(s), u !== f - 1 && (r = "\n" === s.charAt(s.length - 1), i || (i = r)), this.tokens.push({ type: i ? "loose_item_start" : "list_item_start" }), this.token(s, !1, n), this.tokens.push({ type: "list_item_end" });
                  }this.tokens.push({ type: "list_end" });
                } else if (o = this.rules.html.exec(e)) e = e.substring(o[0].length), this.tokens.push({ type: this.options.sanitize ? "paragraph" : "html", pre: !this.options.sanitizer && ("pre" === o[1] || "script" === o[1] || "style" === o[1]), text: o[0] });else if (!n && t && (o = this.rules.def.exec(e))) e = e.substring(o[0].length), this.tokens.links[o[1].toLowerCase()] = { href: o[2], title: o[3] };else if (t && (o = this.rules.table.exec(e))) {
                  for (e = e.substring(o[0].length), s = { type: "table",
                    header: o[1].replace(/^ *| *\| *$/g, "").split(/ *\| */), align: o[2].replace(/^ *|\| *$/g, "").split(/ *\| */), cells: o[3].replace(/(?: *\| *)?\n$/, "").split("\n") }, u = 0; u < s.align.length; u++) {
                    /^ *-+: *$/.test(s.align[u]) ? s.align[u] = "right" : /^ *:-+: *$/.test(s.align[u]) ? s.align[u] = "center" : /^ *:-+ *$/.test(s.align[u]) ? s.align[u] = "left" : s.align[u] = null;
                  }for (u = 0; u < s.cells.length; u++) {
                    s.cells[u] = s.cells[u].replace(/^ *\| *| *\| *$/g, "").split(/ *\| */);
                  }this.tokens.push(s);
                } else if (t && (o = this.rules.paragraph.exec(e))) e = e.substring(o[0].length), this.tokens.push({ type: "paragraph", text: "\n" === o[1].charAt(o[1].length - 1) ? o[1].slice(0, -1) : o[1] });else if (o = this.rules.text.exec(e)) e = e.substring(o[0].length), this.tokens.push({ type: "text", text: o[0] });else if (e) throw new Error("Infinite loop on byte: " + e.charCodeAt(0));
              }return this.tokens;
            };var p = { escape: /^\\([\\`*{}\[\]()#+\-.!_>])/, autolink: /^<([^ >]+(@|:\/)[^ >]+)>/, url: u, tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/, link: /^!?\[(inside)\]\(href\)/, reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/, nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/, strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/, em: /^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/, code: /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/, br: /^ {2,}\n(?!\s*$)/, del: u, text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/ };p._inside = /(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/, p._href = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/, p.link = c(p.link)("inside", p._inside)("href", p._href)(), p.reflink = c(p.reflink)("inside", p._inside)(), p.normal = f({}, p), p.pedantic = f({}, p.normal, { strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/, em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/ }), p.gfm = f({}, p.normal, { escape: c(p.escape)("])", "~|])")(), url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/, del: /^~~(?=\S)([\s\S]*?\S)~~/, text: c(p.text)("]|", "~]|")("|", "|https?://|")() }), p.breaks = f({}, p.gfm, { br: c(p.br)("{2,}", "*")(), text: c(p.gfm.text)("{2,}", "*")() }), i.rules = p, i.output = function (e, t, n) {
              var r = new i(t, n);return r.output(e);
            }, i.prototype.output = function (e) {
              for (var t, n, r, i, o = ""; e;) {
                if (i = this.rules.escape.exec(e)) e = e.substring(i[0].length), o += i[1];else if (i = this.rules.autolink.exec(e)) e = e.substring(i[0].length), "@" === i[2] ? (n = ":" === i[1].charAt(6) ? this.mangle(i[1].substring(7)) : this.mangle(i[1]), r = this.mangle("mailto:") + n) : (n = l(i[1]), r = n), o += this.renderer.link(r, null, n);else if (this.inLink || !(i = this.rules.url.exec(e))) {
                  if (i = this.rules.tag.exec(e)) !this.inLink && /^<a /i.test(i[0]) ? this.inLink = !0 : this.inLink && /^<\/a>/i.test(i[0]) && (this.inLink = !1), e = e.substring(i[0].length), o += this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(i[0]) : l(i[0]) : i[0];else if (i = this.rules.link.exec(e)) e = e.substring(i[0].length), this.inLink = !0, o += this.outputLink(i, { href: i[2], title: i[3] }), this.inLink = !1;else if ((i = this.rules.reflink.exec(e)) || (i = this.rules.nolink.exec(e))) {
                    if (e = e.substring(i[0].length), t = (i[2] || i[1]).replace(/\s+/g, " "), t = this.links[t.toLowerCase()], !t || !t.href) {
                      o += i[0].charAt(0), e = i[0].substring(1) + e;continue;
                    }this.inLink = !0, o += this.outputLink(i, t), this.inLink = !1;
                  } else if (i = this.rules.strong.exec(e)) e = e.substring(i[0].length), o += this.renderer.strong(this.output(i[2] || i[1]));else if (i = this.rules.em.exec(e)) e = e.substring(i[0].length), o += this.renderer.em(this.output(i[2] || i[1]));else if (i = this.rules.code.exec(e)) e = e.substring(i[0].length), o += this.renderer.codespan(l(i[2], !0));else if (i = this.rules.br.exec(e)) e = e.substring(i[0].length), o += this.renderer.br();else if (i = this.rules.del.exec(e)) e = e.substring(i[0].length), o += this.renderer.del(this.output(i[1]));else if (i = this.rules.text.exec(e)) e = e.substring(i[0].length), o += this.renderer.text(l(this.smartypants(i[0])));else if (e) throw new Error("Infinite loop on byte: " + e.charCodeAt(0));
                } else e = e.substring(i[0].length), n = l(i[1]), r = n, o += this.renderer.link(r, null, n);
              }return o;
            }, i.prototype.outputLink = function (e, t) {
              var n = l(t.href),
                  r = t.title ? l(t.title) : null;return "!" !== e[0].charAt(0) ? this.renderer.link(n, r, this.output(e[1])) : this.renderer.image(n, r, l(e[1]));
            }, i.prototype.smartypants = function (e) {
              return this.options.smartypants ? e.replace(/---/g, "—").replace(/--/g, "–").replace(/(^|[-\u2014\/(\[{"\s])'/g, "$1‘").replace(/'/g, "’").replace(/(^|[-\u2014\/(\[{\u2018\s])"/g, "$1“").replace(/"/g, "”").replace(/\.{3}/g, "…") : e;
            }, i.prototype.mangle = function (e) {
              if (!this.options.mangle) return e;for (var t, n = "", r = e.length, i = 0; r > i; i++) {
                t = e.charCodeAt(i), Math.random() > .5 && (t = "x" + t.toString(16)), n += "&#" + t + ";";
              }return n;
            }, o.prototype.code = function (e, t, n) {
              if (this.options.highlight) {
                var r = this.options.highlight(e, t);null != r && r !== e && (n = !0, e = r);
              }return t ? '<pre><code class="' + this.options.langPrefix + l(t, !0) + '">' + (n ? e : l(e, !0)) + "\n</code></pre>\n" : "<pre><code>" + (n ? e : l(e, !0)) + "\n</code></pre>";
            }, o.prototype.blockquote = function (e) {
              return "<blockquote>\n" + e + "</blockquote>\n";
            }, o.prototype.html = function (e) {
              return e;
            }, o.prototype.heading = function (e, t, n) {
              return "<h" + t + ' id="' + this.options.headerPrefix + n.toLowerCase().replace(/[^\w]+/g, "-") + '">' + e + "</h" + t + ">\n";
            }, o.prototype.hr = function () {
              return this.options.xhtml ? "<hr/>\n" : "<hr>\n";
            }, o.prototype.list = function (e, t) {
              var n = t ? "ol" : "ul";return "<" + n + ">\n" + e + "</" + n + ">\n";
            }, o.prototype.listitem = function (e) {
              return "<li>" + e + "</li>\n";
            }, o.prototype.paragraph = function (e) {
              return "<p>" + e + "</p>\n";
            }, o.prototype.table = function (e, t) {
              return "<table>\n<thead>\n" + e + "</thead>\n<tbody>\n" + t + "</tbody>\n</table>\n";
            }, o.prototype.tablerow = function (e) {
              return "<tr>\n" + e + "</tr>\n";
            }, o.prototype.tablecell = function (e, t) {
              var n = t.header ? "th" : "td",
                  r = t.align ? "<" + n + ' style="text-align:' + t.align + '">' : "<" + n + ">";return r + e + "</" + n + ">\n";
            }, o.prototype.strong = function (e) {
              return "<strong>" + e + "</strong>";
            }, o.prototype.em = function (e) {
              return "<em>" + e + "</em>";
            }, o.prototype.codespan = function (e) {
              return "<code>" + e + "</code>";
            }, o.prototype.br = function () {
              return this.options.xhtml ? "<br/>" : "<br>";
            }, o.prototype.del = function (e) {
              return "<del>" + e + "</del>";
            }, o.prototype.link = function (e, t, n) {
              if (this.options.sanitize) {
                try {
                  var r = decodeURIComponent(s(e)).replace(/[^\w:]/g, "").toLowerCase();
                } catch (i) {
                  return "";
                }if (0 === r.indexOf("javascript:") || 0 === r.indexOf("vbscript:")) return "";
              }var o = '<a href="' + e + '"';return t && (o += ' title="' + t + '"'), o += ">" + n + "</a>";
            }, o.prototype.image = function (e, t, n) {
              var r = '<img src="' + e + '" alt="' + n + '"';return t && (r += ' title="' + t + '"'), r += this.options.xhtml ? "/>" : ">";
            }, o.prototype.text = function (e) {
              return e;
            }, a.parse = function (e, t, n) {
              var r = new a(t, n);return r.parse(e);
            }, a.prototype.parse = function (e) {
              this.inline = new i(e.links, this.options, this.renderer), this.tokens = e.reverse();for (var t = ""; this.next();) {
                t += this.tok();
              }return t;
            }, a.prototype.next = function () {
              return this.token = this.tokens.pop();
            }, a.prototype.peek = function () {
              return this.tokens[this.tokens.length - 1] || 0;
            }, a.prototype.parseText = function () {
              for (var e = this.token.text; "text" === this.peek().type;) {
                e += "\n" + this.next().text;
              }return this.inline.output(e);
            }, a.prototype.tok = function () {
              switch (this.token.type) {case "space":
                  return "";case "hr":
                  return this.renderer.hr();case "heading":
                  return this.renderer.heading(this.inline.output(this.token.text), this.token.depth, this.token.text);case "code":
                  return this.renderer.code(this.token.text, this.token.lang, this.token.escaped);case "table":
                  var e,
                      t,
                      n,
                      r,
                      i,
                      o = "",
                      a = "";for (n = "", e = 0; e < this.token.header.length; e++) {
                    r = { header: !0, align: this.token.align[e] }, n += this.renderer.tablecell(this.inline.output(this.token.header[e]), { header: !0, align: this.token.align[e] });
                  }for (o += this.renderer.tablerow(n), e = 0; e < this.token.cells.length; e++) {
                    for (t = this.token.cells[e], n = "", i = 0; i < t.length; i++) {
                      n += this.renderer.tablecell(this.inline.output(t[i]), { header: !1, align: this.token.align[i] });
                    }a += this.renderer.tablerow(n);
                  }return this.renderer.table(o, a);case "blockquote_start":
                  for (var a = ""; "blockquote_end" !== this.next().type;) {
                    a += this.tok();
                  }return this.renderer.blockquote(a);case "list_start":
                  for (var a = "", l = this.token.ordered; "list_end" !== this.next().type;) {
                    a += this.tok();
                  }return this.renderer.list(a, l);case "list_item_start":
                  for (var a = ""; "list_item_end" !== this.next().type;) {
                    a += "text" === this.token.type ? this.parseText() : this.tok();
                  }return this.renderer.listitem(a);case "loose_item_start":
                  for (var a = ""; "list_item_end" !== this.next().type;) {
                    a += this.tok();
                  }return this.renderer.listitem(a);case "html":
                  var s = this.token.pre || this.options.pedantic ? this.token.text : this.inline.output(this.token.text);return this.renderer.html(s);case "paragraph":
                  return this.renderer.paragraph(this.inline.output(this.token.text));case "text":
                  return this.renderer.paragraph(this.parseText());}
            }, u.exec = u, h.options = h.setOptions = function (e) {
              return f(h.defaults, e), h;
            }, h.defaults = { gfm: !0, tables: !0, breaks: !1, pedantic: !1, sanitize: !1, sanitizer: null, mangle: !0, smartLists: !1, silent: !1, highlight: null, langPrefix: "lang-", smartypants: !1, headerPrefix: "", renderer: new o(), xhtml: !1 }, h.Parser = a, h.parser = a.parse, h.Renderer = o, h.Lexer = t, h.lexer = t.lex, h.InlineLexer = i, h.inlineLexer = i.output, h.parse = h, "undefined" != typeof n && "object" == (typeof r === "undefined" ? "undefined" : _typeof(r)) ? n.exports = h : "function" == typeof e && e.amd ? e(function () {
              return h;
            }) : this.marked = h;
          }).call(function () {
            return this || ("undefined" != typeof window ? window : t);
          }());
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
      }, {}], 18: [function (e, t, n) {
        (function (n, r) {
          "use strict";
          var i = function i(e, t, n, _i2) {
            if (_i2 = _i2 || {}, this.dictionary = null, this.rules = {}, this.dictionaryTable = {}, this.compoundRules = [], this.compoundRuleCodes = {}, this.replacementTable = [], this.flags = _i2.flags || {}, e) {
              if (this.dictionary = e, "undefined" != typeof window && "chrome" in window && "extension" in window.chrome && "getURL" in window.chrome.extension) t || (t = this._readFile(chrome.extension.getURL("lib/typo/dictionaries/" + e + "/" + e + ".aff"))), n || (n = this._readFile(chrome.extension.getURL("lib/typo/dictionaries/" + e + "/" + e + ".dic")));else {
                if (_i2.dictionaryPath) var o = _i2.dictionaryPath;else if ("undefined" != typeof r) var o = r + "/dictionaries";else var o = "./dictionaries";t || (t = this._readFile(o + "/" + e + "/" + e + ".aff")), n || (n = this._readFile(o + "/" + e + "/" + e + ".dic"));
              }this.rules = this._parseAFF(t), this.compoundRuleCodes = {};for (var a = 0, l = this.compoundRules.length; l > a; a++) {
                for (var s = this.compoundRules[a], c = 0, u = s.length; u > c; c++) {
                  this.compoundRuleCodes[s[c]] = [];
                }
              }"ONLYINCOMPOUND" in this.flags && (this.compoundRuleCodes[this.flags.ONLYINCOMPOUND] = []), this.dictionaryTable = this._parseDIC(n);for (var a in this.compoundRuleCodes) {
                0 == this.compoundRuleCodes[a].length && delete this.compoundRuleCodes[a];
              }for (var a = 0, l = this.compoundRules.length; l > a; a++) {
                for (var f = this.compoundRules[a], h = "", c = 0, u = f.length; u > c; c++) {
                  var d = f[c];h += d in this.compoundRuleCodes ? "(" + this.compoundRuleCodes[d].join("|") + ")" : d;
                }this.compoundRules[a] = new RegExp(h, "i");
              }
            }return this;
          };i.prototype = { load: function load(e) {
              for (var t in e) {
                this[t] = e[t];
              }return this;
            }, _readFile: function _readFile(t, r) {
              if (r || (r = "utf8"), "undefined" != typeof XMLHttpRequest) {
                var i = new XMLHttpRequest();return i.open("GET", t, !1), i.overrideMimeType && i.overrideMimeType("text/plain; charset=" + r), i.send(null), i.responseText;
              }if ("undefined" != typeof e) {
                var o = e("fs");try {
                  if (o.existsSync(t)) {
                    var a = o.statSync(t),
                        l = o.openSync(t, "r"),
                        s = new n(a.size);return o.readSync(l, s, 0, s.length, null), s.toString(r, 0, s.length);
                  }console.log("Path " + t + " does not exist.");
                } catch (c) {
                  return console.log(c), "";
                }
              }
            }, _parseAFF: function _parseAFF(e) {
              var t = {};e = this._removeAffixComments(e);for (var n = e.split("\n"), r = 0, i = n.length; i > r; r++) {
                var o = n[r],
                    a = o.split(/\s+/),
                    l = a[0];if ("PFX" == l || "SFX" == l) {
                  for (var s = a[1], c = a[2], u = parseInt(a[3], 10), f = [], h = r + 1, d = r + 1 + u; d > h; h++) {
                    var o = n[h],
                        p = o.split(/\s+/),
                        m = p[2],
                        g = p[3].split("/"),
                        v = g[0];"0" === v && (v = "");var y = this.parseRuleCodes(g[1]),
                        x = p[4],
                        b = {};b.add = v, y.length > 0 && (b.continuationClasses = y), "." !== x && ("SFX" === l ? b.match = new RegExp(x + "$") : b.match = new RegExp("^" + x)), "0" != m && ("SFX" === l ? b.remove = new RegExp(m + "$") : b.remove = m), f.push(b);
                  }t[s] = { type: l, combineable: "Y" == c, entries: f }, r += u;
                } else if ("COMPOUNDRULE" === l) {
                  for (var u = parseInt(a[1], 10), h = r + 1, d = r + 1 + u; d > h; h++) {
                    var o = n[h],
                        p = o.split(/\s+/);this.compoundRules.push(p[1]);
                  }r += u;
                } else if ("REP" === l) {
                  var p = o.split(/\s+/);3 === p.length && this.replacementTable.push([p[1], p[2]]);
                } else this.flags[l] = a[1];
              }return t;
            }, _removeAffixComments: function _removeAffixComments(e) {
              return e = e.replace(/#.*$/gm, ""), e = e.replace(/^\s\s*/m, "").replace(/\s\s*$/m, ""), e = e.replace(/\n{2,}/g, "\n"), e = e.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
            }, _parseDIC: function _parseDIC(e) {
              function t(e, t) {
                e in r && "object" == _typeof(r[e]) || (r[e] = []), r[e].push(t);
              }e = this._removeDicComments(e);for (var n = e.split("\n"), r = {}, i = 1, o = n.length; o > i; i++) {
                var a = n[i],
                    l = a.split("/", 2),
                    s = l[0];if (l.length > 1) {
                  var c = this.parseRuleCodes(l[1]);"NEEDAFFIX" in this.flags && -1 != c.indexOf(this.flags.NEEDAFFIX) || t(s, c);for (var u = 0, f = c.length; f > u; u++) {
                    var h = c[u],
                        d = this.rules[h];if (d) for (var p = this._applyRule(s, d), m = 0, g = p.length; g > m; m++) {
                      var v = p[m];if (t(v, []), d.combineable) for (var y = u + 1; f > y; y++) {
                        var x = c[y],
                            b = this.rules[x];if (b && b.combineable && d.type != b.type) for (var w = this._applyRule(v, b), k = 0, S = w.length; S > k; k++) {
                          var C = w[k];t(C, []);
                        }
                      }
                    }h in this.compoundRuleCodes && this.compoundRuleCodes[h].push(s);
                  }
                } else t(s.trim(), []);
              }return r;
            }, _removeDicComments: function _removeDicComments(e) {
              return e = e.replace(/^\t.*$/gm, "");
            }, parseRuleCodes: function parseRuleCodes(e) {
              if (!e) return [];if (!("FLAG" in this.flags)) return e.split("");if ("long" === this.flags.FLAG) {
                for (var t = [], n = 0, r = e.length; r > n; n += 2) {
                  t.push(e.substr(n, 2));
                }return t;
              }return "num" === this.flags.FLAG ? textCode.split(",") : void 0;
            }, _applyRule: function _applyRule(e, t) {
              for (var n = t.entries, r = [], i = 0, o = n.length; o > i; i++) {
                var a = n[i];if (!a.match || e.match(a.match)) {
                  var l = e;if (a.remove && (l = l.replace(a.remove, "")), "SFX" === t.type ? l += a.add : l = a.add + l, r.push(l), "continuationClasses" in a) for (var s = 0, c = a.continuationClasses.length; c > s; s++) {
                    var u = this.rules[a.continuationClasses[s]];u && (r = r.concat(this._applyRule(l, u)));
                  }
                }
              }return r;
            }, check: function check(e) {
              var t = e.replace(/^\s\s*/, "").replace(/\s\s*$/, "");if (this.checkExact(t)) return !0;if (t.toUpperCase() === t) {
                var n = t[0] + t.substring(1).toLowerCase();if (this.hasFlag(n, "KEEPCASE")) return !1;if (this.checkExact(n)) return !0;
              }var r = t.toLowerCase();if (r !== t) {
                if (this.hasFlag(r, "KEEPCASE")) return !1;if (this.checkExact(r)) return !0;
              }return !1;
            }, checkExact: function checkExact(e) {
              var t = this.dictionaryTable[e];if ("undefined" == typeof t) {
                if ("COMPOUNDMIN" in this.flags && e.length >= this.flags.COMPOUNDMIN) for (var n = 0, r = this.compoundRules.length; r > n; n++) {
                  if (e.match(this.compoundRules[n])) return !0;
                }return !1;
              }if ("object" == (typeof t === "undefined" ? "undefined" : _typeof(t))) {
                for (var n = 0, r = t.length; r > n; n++) {
                  if (!this.hasFlag(e, "ONLYINCOMPOUND", t[n])) return !0;
                }return !1;
              }
            }, hasFlag: function hasFlag(e, t, n) {
              if (t in this.flags) {
                if ("undefined" == typeof n) var n = Array.prototype.concat.apply([], this.dictionaryTable[e]);if (n && -1 !== n.indexOf(this.flags[t])) return !0;
              }return !1;
            }, alphabet: "", suggest: function suggest(e, t) {
              function n(e) {
                for (var t = [], n = 0, r = e.length; r > n; n++) {
                  for (var i = e[n], o = [], a = 0, l = i.length + 1; l > a; a++) {
                    o.push([i.substring(0, a), i.substring(a, i.length)]);
                  }for (var s = [], a = 0, l = o.length; l > a; a++) {
                    var u = o[a];u[1] && s.push(u[0] + u[1].substring(1));
                  }for (var f = [], a = 0, l = o.length; l > a; a++) {
                    var u = o[a];u[1].length > 1 && f.push(u[0] + u[1][1] + u[1][0] + u[1].substring(2));
                  }for (var h = [], a = 0, l = o.length; l > a; a++) {
                    var u = o[a];if (u[1]) for (var d = 0, p = c.alphabet.length; p > d; d++) {
                      h.push(u[0] + c.alphabet[d] + u[1].substring(1));
                    }
                  }for (var m = [], a = 0, l = o.length; l > a; a++) {
                    var u = o[a];if (u[1]) for (var d = 0, p = c.alphabet.length; p > d; d++) {
                      h.push(u[0] + c.alphabet[d] + u[1]);
                    }
                  }t = t.concat(s), t = t.concat(f), t = t.concat(h), t = t.concat(m);
                }return t;
              }function r(e) {
                for (var t = [], n = 0; n < e.length; n++) {
                  c.check(e[n]) && t.push(e[n]);
                }return t;
              }function i(e) {
                function i(e, t) {
                  return e[1] < t[1] ? -1 : 1;
                }for (var o = n([e]), a = n(o), l = r(o).concat(r(a)), s = {}, u = 0, f = l.length; f > u; u++) {
                  l[u] in s ? s[l[u]] += 1 : s[l[u]] = 1;
                }var h = [];for (var u in s) {
                  h.push([u, s[u]]);
                }h.sort(i).reverse();for (var d = [], u = 0, f = Math.min(t, h.length); f > u; u++) {
                  c.hasFlag(h[u][0], "NOSUGGEST") || d.push(h[u][0]);
                }return d;
              }if (t || (t = 5), this.check(e)) return [];for (var o = 0, a = this.replacementTable.length; a > o; o++) {
                var l = this.replacementTable[o];if (-1 !== e.indexOf(l[0])) {
                  var s = e.replace(l[0], l[1]);if (this.check(s)) return [s];
                }
              }var c = this;return c.alphabet = "abcdefghijklmnopqrstuvwxyz", i(e);
            } }, "undefined" != typeof t && (t.exports = i);
        }).call(this, e("buffer").Buffer, "/node_modules/typo-js");
      }, { buffer: 3, fs: 2 }], 19: [function (e, t, n) {
        var r = e("codemirror");r.commands.tabAndIndentMarkdownList = function (e) {
          var t = e.listSelections(),
              n = t[0].head,
              r = e.getStateAfter(n.line),
              i = r.list !== !1;if (i) return void e.execCommand("indentMore");if (e.options.indentWithTabs) e.execCommand("insertTab");else {
            var o = Array(e.options.tabSize + 1).join(" ");e.replaceSelection(o);
          }
        }, r.commands.shiftTabAndUnindentMarkdownList = function (e) {
          var t = e.listSelections(),
              n = t[0].head,
              r = e.getStateAfter(n.line),
              i = r.list !== !1;if (i) return void e.execCommand("indentLess");if (e.options.indentWithTabs) e.execCommand("insertTab");else {
            var o = Array(e.options.tabSize + 1).join(" ");e.replaceSelection(o);
          }
        };
      }, { codemirror: 10 }], 20: [function (e, t, n) {
        "use strict";
        function r(e) {
          return e = U ? e.replace("Ctrl", "Cmd") : e.replace("Cmd", "Ctrl");
        }function i(e, t, n) {
          e = e || {};var r = document.createElement("a");return t = void 0 == t ? !0 : t, e.title && t && (r.title = a(e.title, e.action, n), U && (r.title = r.title.replace("Ctrl", "⌘"), r.title = r.title.replace("Alt", "⌥"))), r.tabIndex = -1, r.className = e.className, r;
        }function o() {
          var e = document.createElement("i");return e.className = "separator", e.innerHTML = "|", e;
        }function a(e, t, n) {
          var i,
              o = e;return t && (i = Y(t), n[i] && (o += " (" + r(n[i]) + ")")), o;
        }function l(e, t) {
          t = t || e.getCursor("start");var n = e.getTokenAt(t);if (!n.type) return {};for (var r, i, o = n.type.split(" "), a = {}, l = 0; l < o.length; l++) {
            r = o[l], "strong" === r ? a.bold = !0 : "variable-2" === r ? (i = e.getLine(t.line), /^\s*\d+\.\s/.test(i) ? a["ordered-list"] = !0 : a["unordered-list"] = !0) : "atom" === r ? a.quote = !0 : "em" === r ? a.italic = !0 : "quote" === r ? a.quote = !0 : "strikethrough" === r ? a.strikethrough = !0 : "comment" === r ? a.code = !0 : "link" === r ? a.link = !0 : "tag" === r ? a.image = !0 : r.match(/^header(\-[1-6])?$/) && (a[r.replace("header", "heading")] = !0);
          }return a;
        }function s(e) {
          var t = e.codemirror;t.setOption("fullScreen", !t.getOption("fullScreen")), t.getOption("fullScreen") ? (V = document.body.style.overflow, document.body.style.overflow = "hidden") : document.body.style.overflow = V;var n = t.getWrapperElement();/fullscreen/.test(n.previousSibling.className) ? n.previousSibling.className = n.previousSibling.className.replace(/\s*fullscreen\b/, "") : n.previousSibling.className += " fullscreen";var r = e.toolbarElements.fullscreen;/active/.test(r.className) ? r.className = r.className.replace(/\s*active\s*/g, "") : r.className += " active";var i = t.getWrapperElement().nextSibling;/editor-preview-active-side/.test(i.className) && N(e);
        }function c(e) {
          P(e, "bold", e.options.blockStyles.bold);
        }function u(e) {
          P(e, "italic", e.options.blockStyles.italic);
        }function f(e) {
          P(e, "strikethrough", "~~");
        }function h(e) {
          function t(e) {
            if ("object" != (typeof e === "undefined" ? "undefined" : _typeof(e))) throw "fencing_line() takes a 'line' object (not a line number, or line text).  Got: " + (typeof e === "undefined" ? "undefined" : _typeof(e)) + ": " + e;return e.styles && e.styles[2] && -1 !== e.styles[2].indexOf("formatting-code-block");
          }function n(e) {
            return e.state.base.base || e.state.base;
          }function r(e, r, i, o, a) {
            i = i || e.getLineHandle(r), o = o || e.getTokenAt({ line: r, ch: 1 }), a = a || !!i.text && e.getTokenAt({ line: r, ch: i.text.length - 1 });var l = o.type ? o.type.split(" ") : [];return a && n(a).indentedCode ? "indented" : -1 === l.indexOf("comment") ? !1 : n(o).fencedChars || n(a).fencedChars || t(i) ? "fenced" : "single";
          }function i(e, t, n, r) {
            var i = t.line + 1,
                o = n.line + 1,
                a = t.line !== n.line,
                l = r + "\n",
                s = "\n" + r;a && o++, a && 0 === n.ch && (s = r + "\n", o--), E(e, !1, [l, s]), e.setSelection({ line: i, ch: 0 }, { line: o, ch: 0 });
          }var o,
              a,
              l,
              s = e.options.blockStyles.code,
              c = e.codemirror,
              u = c.getCursor("start"),
              f = c.getCursor("end"),
              h = c.getTokenAt({ line: u.line, ch: u.ch || 1 }),
              d = c.getLineHandle(u.line),
              p = r(c, u.line, d, h);if ("single" === p) {
            var m = d.text.slice(0, u.ch).replace("`", ""),
                g = d.text.slice(u.ch).replace("`", "");c.replaceRange(m + g, { line: u.line, ch: 0 }, { line: u.line, ch: 99999999999999 }), u.ch--, u !== f && f.ch--, c.setSelection(u, f), c.focus();
          } else if ("fenced" === p) {
            if (u.line !== f.line || u.ch !== f.ch) {
              for (o = u.line; o >= 0 && (d = c.getLineHandle(o), !t(d)); o--) {}var v,
                  y,
                  x,
                  b,
                  w = c.getTokenAt({ line: o, ch: 1 }),
                  k = n(w).fencedChars;t(c.getLineHandle(u.line)) ? (v = "", y = u.line) : t(c.getLineHandle(u.line - 1)) ? (v = "", y = u.line - 1) : (v = k + "\n", y = u.line), t(c.getLineHandle(f.line)) ? (x = "", b = f.line, 0 === f.ch && (b += 1)) : 0 !== f.ch && t(c.getLineHandle(f.line + 1)) ? (x = "", b = f.line + 1) : (x = k + "\n", b = f.line + 1), 0 === f.ch && (b -= 1), c.operation(function () {
                c.replaceRange(x, { line: b, ch: 0 }, { line: b + (x ? 0 : 1), ch: 0 }), c.replaceRange(v, { line: y, ch: 0 }, { line: y + (v ? 0 : 1), ch: 0 });
              }), c.setSelection({ line: y + (v ? 1 : 0), ch: 0 }, { line: b + (v ? 1 : -1), ch: 0 }), c.focus();
            } else {
              var S = u.line;if (t(c.getLineHandle(u.line)) && ("fenced" === r(c, u.line + 1) ? (o = u.line, S = u.line + 1) : (a = u.line, S = u.line - 1)), void 0 === o) for (o = S; o >= 0 && (d = c.getLineHandle(o), !t(d)); o--) {}if (void 0 === a) for (l = c.lineCount(), a = S; l > a && (d = c.getLineHandle(a), !t(d)); a++) {}c.operation(function () {
                c.replaceRange("", { line: o, ch: 0 }, { line: o + 1, ch: 0 }), c.replaceRange("", { line: a - 1, ch: 0 }, { line: a, ch: 0 });
              }), c.focus();
            }
          } else if ("indented" === p) {
            if (u.line !== f.line || u.ch !== f.ch) o = u.line, a = f.line, 0 === f.ch && a--;else {
              for (o = u.line; o >= 0; o--) {
                if (d = c.getLineHandle(o), !d.text.match(/^\s*$/) && "indented" !== r(c, o, d)) {
                  o += 1;break;
                }
              }for (l = c.lineCount(), a = u.line; l > a; a++) {
                if (d = c.getLineHandle(a), !d.text.match(/^\s*$/) && "indented" !== r(c, a, d)) {
                  a -= 1;break;
                }
              }
            }var C = c.getLineHandle(a + 1),
                L = C && c.getTokenAt({ line: a + 1, ch: C.text.length - 1 }),
                T = L && n(L).indentedCode;T && c.replaceRange("\n", { line: a + 1, ch: 0 });for (var M = o; a >= M; M++) {
              c.indentLine(M, "subtract");
            }c.focus();
          } else {
            var N = u.line === f.line && u.ch === f.ch && 0 === u.ch,
                A = u.line !== f.line;N || A ? i(c, u, f, s) : E(c, !1, ["`", "`"]);
          }
        }function d(e) {
          var t = e.codemirror;I(t, "quote");
        }function p(e) {
          var t = e.codemirror;O(t, "smaller");
        }function m(e) {
          var t = e.codemirror;O(t, "bigger");
        }function g(e) {
          var t = e.codemirror;O(t, void 0, 1);
        }function v(e) {
          var t = e.codemirror;O(t, void 0, 2);
        }function y(e) {
          var t = e.codemirror;O(t, void 0, 3);
        }function x(e) {
          var t = e.codemirror;I(t, "unordered-list");
        }function b(e) {
          var t = e.codemirror;I(t, "ordered-list");
        }function w(e) {
          var t = e.codemirror;R(t);
        }function k(e) {
          var t = e.codemirror,
              n = l(t),
              r = e.options,
              i = "http://";return r.promptURLs && (i = prompt(r.promptTexts.link), !i) ? !1 : void E(t, n.link, r.insertTexts.link, i);
        }function S(e) {
          var t = e.codemirror,
              n = l(t),
              r = e.options,
              i = "http://";return r.promptURLs && (i = prompt(r.promptTexts.image), !i) ? !1 : void E(t, n.image, r.insertTexts.image, i);
        }function C(e) {
          var t = e.codemirror,
              n = l(t),
              r = e.options;E(t, n.table, r.insertTexts.table);
        }function L(e) {
          var t = e.codemirror,
              n = l(t),
              r = e.options;E(t, n.image, r.insertTexts.horizontalRule);
        }function T(e) {
          var t = e.codemirror;t.undo(), t.focus();
        }function M(e) {
          var t = e.codemirror;t.redo(), t.focus();
        }function N(e) {
          var t = e.codemirror,
              n = t.getWrapperElement(),
              r = n.nextSibling,
              i = e.toolbarElements["side-by-side"],
              o = !1;/editor-preview-active-side/.test(r.className) ? (r.className = r.className.replace(/\s*editor-preview-active-side\s*/g, ""), i.className = i.className.replace(/\s*active\s*/g, ""), n.className = n.className.replace(/\s*CodeMirror-sided\s*/g, " ")) : (setTimeout(function () {
            t.getOption("fullScreen") || s(e), r.className += " editor-preview-active-side";
          }, 1), i.className += " active", n.className += " CodeMirror-sided", o = !0);var a = n.lastChild;if (/editor-preview-active/.test(a.className)) {
            a.className = a.className.replace(/\s*editor-preview-active\s*/g, "");var l = e.toolbarElements.preview,
                c = n.previousSibling;l.className = l.className.replace(/\s*active\s*/g, ""), c.className = c.className.replace(/\s*disabled-for-preview*/g, "");
          }var u = function u() {
            r.innerHTML = e.options.previewRender(e.value(), r);
          };t.sideBySideRenderingFunction || (t.sideBySideRenderingFunction = u), o ? (r.innerHTML = e.options.previewRender(e.value(), r), t.on("update", t.sideBySideRenderingFunction)) : t.off("update", t.sideBySideRenderingFunction), t.refresh();
        }function A(e) {
          var t = e.codemirror,
              n = t.getWrapperElement(),
              r = n.previousSibling,
              i = e.options.toolbar ? e.toolbarElements.preview : !1,
              o = n.lastChild;o && /editor-preview/.test(o.className) || (o = document.createElement("div"), o.className = "editor-preview", n.appendChild(o)), /editor-preview-active/.test(o.className) ? (o.className = o.className.replace(/\s*editor-preview-active\s*/g, ""), i && (i.className = i.className.replace(/\s*active\s*/g, ""), r.className = r.className.replace(/\s*disabled-for-preview*/g, ""))) : (setTimeout(function () {
            o.className += " editor-preview-active";
          }, 1), i && (i.className += " active", r.className += " disabled-for-preview")), o.innerHTML = e.options.previewRender(e.value(), o);var a = t.getWrapperElement().nextSibling;/editor-preview-active-side/.test(a.className) && N(e);
        }function E(e, t, n, r) {
          if (!/editor-preview-active/.test(e.getWrapperElement().lastChild.className)) {
            var i,
                o = n[0],
                a = n[1],
                l = e.getCursor("start"),
                s = e.getCursor("end");r && (a = a.replace("#url#", r)), t ? (i = e.getLine(l.line), o = i.slice(0, l.ch), a = i.slice(l.ch), e.replaceRange(o + a, { line: l.line, ch: 0 })) : (i = e.getSelection(), e.replaceSelection(o + i + a), l.ch += o.length, l !== s && (s.ch += o.length)), e.setSelection(l, s), e.focus();
          }
        }function O(e, t, n) {
          if (!/editor-preview-active/.test(e.getWrapperElement().lastChild.className)) {
            for (var r = e.getCursor("start"), i = e.getCursor("end"), o = r.line; o <= i.line; o++) {
              !function (r) {
                var i = e.getLine(r),
                    o = i.search(/[^#]/);i = void 0 !== t ? 0 >= o ? "bigger" == t ? "###### " + i : "# " + i : 6 == o && "smaller" == t ? i.substr(7) : 1 == o && "bigger" == t ? i.substr(2) : "bigger" == t ? i.substr(1) : "#" + i : 1 == n ? 0 >= o ? "# " + i : o == n ? i.substr(o + 1) : "# " + i.substr(o + 1) : 2 == n ? 0 >= o ? "## " + i : o == n ? i.substr(o + 1) : "## " + i.substr(o + 1) : 0 >= o ? "### " + i : o == n ? i.substr(o + 1) : "### " + i.substr(o + 1), e.replaceRange(i, { line: r, ch: 0 }, { line: r, ch: 99999999999999 });
              }(o);
            }e.focus();
          }
        }function I(e, t) {
          if (!/editor-preview-active/.test(e.getWrapperElement().lastChild.className)) {
            for (var n = l(e), r = e.getCursor("start"), i = e.getCursor("end"), o = { quote: /^(\s*)\>\s+/, "unordered-list": /^(\s*)(\*|\-|\+)\s+/, "ordered-list": /^(\s*)\d+\.\s+/ }, a = { quote: "> ", "unordered-list": "* ", "ordered-list": "1. " }, s = r.line; s <= i.line; s++) {
              !function (r) {
                var i = e.getLine(r);i = n[t] ? i.replace(o[t], "$1") : a[t] + i, e.replaceRange(i, { line: r, ch: 0 }, { line: r, ch: 99999999999999 });
              }(s);
            }e.focus();
          }
        }function P(e, t, n, r) {
          if (!/editor-preview-active/.test(e.codemirror.getWrapperElement().lastChild.className)) {
            r = "undefined" == typeof r ? n : r;var i,
                o = e.codemirror,
                a = l(o),
                s = n,
                c = r,
                u = o.getCursor("start"),
                f = o.getCursor("end");a[t] ? (i = o.getLine(u.line), s = i.slice(0, u.ch), c = i.slice(u.ch), "bold" == t ? (s = s.replace(/(\*\*|__)(?![\s\S]*(\*\*|__))/, ""), c = c.replace(/(\*\*|__)/, "")) : "italic" == t ? (s = s.replace(/(\*|_)(?![\s\S]*(\*|_))/, ""), c = c.replace(/(\*|_)/, "")) : "strikethrough" == t && (s = s.replace(/(\*\*|~~)(?![\s\S]*(\*\*|~~))/, ""), c = c.replace(/(\*\*|~~)/, "")), o.replaceRange(s + c, { line: u.line, ch: 0 }, { line: u.line, ch: 99999999999999 }), "bold" == t || "strikethrough" == t ? (u.ch -= 2, u !== f && (f.ch -= 2)) : "italic" == t && (u.ch -= 1, u !== f && (f.ch -= 1))) : (i = o.getSelection(), "bold" == t ? (i = i.split("**").join(""), i = i.split("__").join("")) : "italic" == t ? (i = i.split("*").join(""), i = i.split("_").join("")) : "strikethrough" == t && (i = i.split("~~").join("")), o.replaceSelection(s + i + c), u.ch += n.length, f.ch = u.ch + i.length), o.setSelection(u, f), o.focus();
          }
        }function R(e) {
          if (!/editor-preview-active/.test(e.getWrapperElement().lastChild.className)) for (var t, n = e.getCursor("start"), r = e.getCursor("end"), i = n.line; i <= r.line; i++) {
            t = e.getLine(i), t = t.replace(/^[ ]*([# ]+|\*|\-|[> ]+|[0-9]+(.|\)))[ ]*/, ""), e.replaceRange(t, { line: i, ch: 0 }, { line: i, ch: 99999999999999 });
          }
        }function D(e, t) {
          for (var n in t) {
            t.hasOwnProperty(n) && (t[n] instanceof Array ? e[n] = t[n].concat(e[n] instanceof Array ? e[n] : []) : null !== t[n] && "object" == _typeof(t[n]) && t[n].constructor === Object ? e[n] = D(e[n] || {}, t[n]) : e[n] = t[n]);
          }return e;
        }function H(e) {
          for (var t = 1; t < arguments.length; t++) {
            e = D(e, arguments[t]);
          }return e;
        }function W(e) {
          var t = /[a-zA-Z0-9_\u0392-\u03c9\u0410-\u04F9]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/g,
              n = e.match(t),
              r = 0;if (null === n) return r;for (var i = 0; i < n.length; i++) {
            r += n[i].charCodeAt(0) >= 19968 ? n[i].length : 1;
          }return r;
        }function B(e) {
          e = e || {}, e.parent = this;var t = !0;if (e.autoDownloadFontAwesome === !1 && (t = !1), e.autoDownloadFontAwesome !== !0) for (var n = document.styleSheets, r = 0; r < n.length; r++) {
            n[r].href && n[r].href.indexOf("//maxcdn.bootstrapcdn.com/font-awesome/") > -1 && (t = !1);
          }if (t) {
            var i = document.createElement("link");i.rel = "stylesheet", i.href = "https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css", document.getElementsByTagName("head")[0].appendChild(i);
          }if (e.element) this.element = e.element;else if (null === e.element) return void console.log("SimpleMDE: Error. No element was found.");if (void 0 === e.toolbar) {
            e.toolbar = [];for (var o in K) {
              K.hasOwnProperty(o) && (-1 != o.indexOf("separator-") && e.toolbar.push("|"), (K[o]["default"] === !0 || e.showIcons && e.showIcons.constructor === Array && -1 != e.showIcons.indexOf(o)) && e.toolbar.push(o));
            }
          }e.hasOwnProperty("status") || (e.status = ["autosave", "lines", "words", "cursor"]), e.previewRender || (e.previewRender = function (e) {
            return this.parent.markdown(e);
          }), e.parsingConfig = H({ highlightFormatting: !0 }, e.parsingConfig || {}), e.insertTexts = H({}, X, e.insertTexts || {}), e.promptTexts = Z, e.blockStyles = H({}, J, e.blockStyles || {}), e.shortcuts = H({}, G, e.shortcuts || {}), void 0 != e.autosave && void 0 != e.autosave.unique_id && "" != e.autosave.unique_id && (e.autosave.uniqueId = e.autosave.unique_id), this.options = e, this.render(), !e.initialValue || this.options.autosave && this.options.autosave.foundSavedValue === !0 || this.value(e.initialValue);
        }function _() {
          if ("object" != (typeof localStorage === "undefined" ? "undefined" : _typeof(localStorage))) return !1;try {
            localStorage.setItem("smde_localStorage", 1), localStorage.removeItem("smde_localStorage");
          } catch (e) {
            return !1;
          }return !0;
        }var F = e("codemirror");e("codemirror/addon/edit/continuelist.js"), e("./codemirror/tablist"), e("codemirror/addon/display/fullscreen.js"), e("codemirror/mode/markdown/markdown.js"), e("codemirror/addon/mode/overlay.js"), e("codemirror/addon/display/placeholder.js"), e("codemirror/addon/selection/mark-selection.js"), e("codemirror/mode/gfm/gfm.js"), e("codemirror/mode/xml/xml.js");var z = e("codemirror-spell-checker"),
            j = e("marked"),
            U = /Mac/.test(navigator.platform),
            q = { toggleBold: c, toggleItalic: u, drawLink: k, toggleHeadingSmaller: p, toggleHeadingBigger: m, drawImage: S, toggleBlockquote: d, toggleOrderedList: b, toggleUnorderedList: x, toggleCodeBlock: h, togglePreview: A, toggleStrikethrough: f, toggleHeading1: g, toggleHeading2: v, toggleHeading3: y, cleanBlock: w, drawTable: C, drawHorizontalRule: L, undo: T, redo: M, toggleSideBySide: N, toggleFullScreen: s },
            G = { toggleBold: "Cmd-B", toggleItalic: "Cmd-I", drawLink: "Cmd-K", toggleHeadingSmaller: "Cmd-H", toggleHeadingBigger: "Shift-Cmd-H", cleanBlock: "Cmd-E", drawImage: "Cmd-Alt-I", toggleBlockquote: "Cmd-'", toggleOrderedList: "Cmd-Alt-L", toggleUnorderedList: "Cmd-L", toggleCodeBlock: "Cmd-Alt-C", togglePreview: "Cmd-P", toggleSideBySide: "F9", toggleFullScreen: "F11" },
            Y = function Y(e) {
          for (var t in q) {
            if (q[t] === e) return t;
          }return null;
        },
            $ = function $() {
          var e = !1;return function (t) {
            (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(t) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0, 4))) && (e = !0);
          }(navigator.userAgent || navigator.vendor || window.opera), e;
        },
            V = "",
            K = { bold: { name: "bold", action: c, className: "fa fa-bold", title: "Bold", "default": !0 }, italic: { name: "italic", action: u, className: "fa fa-italic", title: "Italic", "default": !0 }, strikethrough: { name: "strikethrough", action: f, className: "fa fa-strikethrough", title: "Strikethrough" }, heading: { name: "heading", action: p, className: "fa fa-header", title: "Heading", "default": !0 }, "heading-smaller": { name: "heading-smaller", action: p, className: "fa fa-header fa-header-x fa-header-smaller", title: "Smaller Heading" }, "heading-bigger": { name: "heading-bigger", action: m, className: "fa fa-header fa-header-x fa-header-bigger", title: "Bigger Heading" }, "heading-1": { name: "heading-1", action: g, className: "fa fa-header fa-header-x fa-header-1", title: "Big Heading" }, "heading-2": { name: "heading-2", action: v, className: "fa fa-header fa-header-x fa-header-2", title: "Medium Heading" }, "heading-3": { name: "heading-3", action: y, className: "fa fa-header fa-header-x fa-header-3", title: "Small Heading" }, "separator-1": { name: "separator-1" }, code: { name: "code", action: h, className: "fa fa-code", title: "Code" }, quote: { name: "quote", action: d, className: "fa fa-quote-left", title: "Quote", "default": !0 }, "unordered-list": { name: "unordered-list", action: x, className: "fa fa-list-ul", title: "Generic List", "default": !0 }, "ordered-list": { name: "ordered-list", action: b, className: "fa fa-list-ol", title: "Numbered List", "default": !0 }, "clean-block": { name: "clean-block", action: w, className: "fa fa-eraser fa-clean-block", title: "Clean block" }, "separator-2": { name: "separator-2" }, link: { name: "link", action: k, className: "fa fa-link", title: "Create Link", "default": !0 }, image: { name: "image", action: S, className: "fa fa-picture-o", title: "Insert Image", "default": !0 }, table: { name: "table", action: C, className: "fa fa-table", title: "Insert Table" }, "horizontal-rule": { name: "horizontal-rule", action: L, className: "fa fa-minus", title: "Insert Horizontal Line" }, "separator-3": { name: "separator-3" }, preview: { name: "preview", action: A, className: "fa fa-eye no-disable", title: "Toggle Preview", "default": !0 }, "side-by-side": { name: "side-by-side", action: N, className: "fa fa-columns no-disable no-mobile", title: "Toggle Side by Side", "default": !0 }, fullscreen: { name: "fullscreen", action: s, className: "fa fa-arrows-alt no-disable no-mobile", title: "Toggle Fullscreen", "default": !0 }, "separator-4": { name: "separator-4" }, guide: { name: "guide", action: "https://simplemde.com/markdown-guide", className: "fa fa-question-circle", title: "Markdown Guide", "default": !0 }, "separator-5": { name: "separator-5" }, undo: { name: "undo", action: T, className: "fa fa-undo no-disable", title: "Undo" }, redo: { name: "redo", action: M, className: "fa fa-repeat no-disable", title: "Redo" } },
            X = { link: ["[", "](#url#)"], image: ["![](", "#url#)"], table: ["", "\n\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text     | Text     |\n\n"], horizontalRule: ["", "\n\n-----\n\n"] },
            Z = { link: "URL for the link:", image: "URL of the image:" },
            J = { bold: "**", code: "```", italic: "*" };B.prototype.markdown = function (e) {
          if (j) {
            var t = {};return this.options && this.options.renderingConfig && this.options.renderingConfig.singleLineBreaks === !1 ? t.breaks = !1 : t.breaks = !0, this.options && this.options.renderingConfig && this.options.renderingConfig.codeSyntaxHighlighting === !0 && window.hljs && (t.highlight = function (e) {
              return window.hljs.highlightAuto(e).value;
            }), j.setOptions(t), j(e);
          }
        }, B.prototype.render = function (e) {
          if (e || (e = this.element || document.getElementsByTagName("textarea")[0]), !this._rendered || this._rendered !== e) {
            this.element = e;var t = this.options,
                n = this,
                i = {};for (var o in t.shortcuts) {
              null !== t.shortcuts[o] && null !== q[o] && !function (e) {
                i[r(t.shortcuts[e])] = function () {
                  q[e](n);
                };
              }(o);
            }i.Enter = "newlineAndIndentContinueMarkdownList", i.Tab = "tabAndIndentMarkdownList", i["Shift-Tab"] = "shiftTabAndUnindentMarkdownList", i.Esc = function (e) {
              e.getOption("fullScreen") && s(n);
            }, document.addEventListener("keydown", function (e) {
              e = e || window.event, 27 == e.keyCode && n.codemirror.getOption("fullScreen") && s(n);
            }, !1);var a, l;if (t.spellChecker !== !1 ? (a = "spell-checker", l = t.parsingConfig, l.name = "gfm", l.gitHubSpice = !1, z({ codeMirrorInstance: F })) : (a = t.parsingConfig, a.name = "gfm", a.gitHubSpice = !1), this.codemirror = F.fromTextArea(e, { mode: a, backdrop: l, theme: "paper", tabSize: void 0 != t.tabSize ? t.tabSize : 2, indentUnit: void 0 != t.tabSize ? t.tabSize : 2, indentWithTabs: t.indentWithTabs !== !1, lineNumbers: !1, autofocus: t.autofocus === !0, extraKeys: i, lineWrapping: t.lineWrapping !== !1, allowDropFileTypes: ["text/plain"], placeholder: t.placeholder || e.getAttribute("placeholder") || "", styleSelectedText: void 0 != t.styleSelectedText ? t.styleSelectedText : !0 }), t.forceSync === !0) {
              var c = this.codemirror;c.on("change", function () {
                c.save();
              });
            }this.gui = {}, t.toolbar !== !1 && (this.gui.toolbar = this.createToolbar()), t.status !== !1 && (this.gui.statusbar = this.createStatusbar()), void 0 != t.autosave && t.autosave.enabled === !0 && this.autosave(), this.gui.sideBySide = this.createSideBySide(), this._rendered = this.element;var u = this.codemirror;setTimeout(function () {
              u.refresh();
            }.bind(u), 0);
          }
        }, B.prototype.autosave = function () {
          if (_()) {
            var e = this;if (void 0 == this.options.autosave.uniqueId || "" == this.options.autosave.uniqueId) return void console.log("SimpleMDE: You must set a uniqueId to use the autosave feature");null != e.element.form && void 0 != e.element.form && e.element.form.addEventListener("submit", function () {
              localStorage.removeItem("smde_" + e.options.autosave.uniqueId);
            }), this.options.autosave.loaded !== !0 && ("string" == typeof localStorage.getItem("smde_" + this.options.autosave.uniqueId) && "" != localStorage.getItem("smde_" + this.options.autosave.uniqueId) && (this.codemirror.setValue(localStorage.getItem("smde_" + this.options.autosave.uniqueId)), this.options.autosave.foundSavedValue = !0), this.options.autosave.loaded = !0), localStorage.setItem("smde_" + this.options.autosave.uniqueId, e.value());var t = document.getElementById("autosaved");if (null != t && void 0 != t && "" != t) {
              var n = new Date(),
                  r = n.getHours(),
                  i = n.getMinutes(),
                  o = "am",
                  a = r;a >= 12 && (a = r - 12, o = "pm"), 0 == a && (a = 12), i = 10 > i ? "0" + i : i, t.innerHTML = "Autosaved: " + a + ":" + i + " " + o;
            }this.autosaveTimeoutId = setTimeout(function () {
              e.autosave();
            }, this.options.autosave.delay || 1e4);
          } else console.log("SimpleMDE: localStorage not available, cannot autosave");
        }, B.prototype.clearAutosavedValue = function () {
          if (_()) {
            if (void 0 == this.options.autosave || void 0 == this.options.autosave.uniqueId || "" == this.options.autosave.uniqueId) return void console.log("SimpleMDE: You must set a uniqueId to clear the autosave value");localStorage.removeItem("smde_" + this.options.autosave.uniqueId);
          } else console.log("SimpleMDE: localStorage not available, cannot autosave");
        }, B.prototype.createSideBySide = function () {
          var e = this.codemirror,
              t = e.getWrapperElement(),
              n = t.nextSibling;n && /editor-preview-side/.test(n.className) || (n = document.createElement("div"), n.className = "editor-preview-side", t.parentNode.insertBefore(n, t.nextSibling));var r = !1,
              i = !1;return e.on("scroll", function (e) {
            if (r) return void (r = !1);i = !0;var t = e.getScrollInfo().height - e.getScrollInfo().clientHeight,
                o = parseFloat(e.getScrollInfo().top) / t,
                a = (n.scrollHeight - n.clientHeight) * o;n.scrollTop = a;
          }), n.onscroll = function () {
            if (i) return void (i = !1);r = !0;var t = n.scrollHeight - n.clientHeight,
                o = parseFloat(n.scrollTop) / t,
                a = (e.getScrollInfo().height - e.getScrollInfo().clientHeight) * o;e.scrollTo(0, a);
          }, n;
        }, B.prototype.createToolbar = function (e) {
          if (e = e || this.options.toolbar, e && 0 !== e.length) {
            var t;for (t = 0; t < e.length; t++) {
              void 0 != K[e[t]] && (e[t] = K[e[t]]);
            }var n = document.createElement("div");n.className = "editor-toolbar";var r = this,
                a = {};for (r.toolbar = e, t = 0; t < e.length; t++) {
              if (("guide" != e[t].name || r.options.toolbarGuideIcon !== !1) && !(r.options.hideIcons && -1 != r.options.hideIcons.indexOf(e[t].name) || ("fullscreen" == e[t].name || "side-by-side" == e[t].name) && $())) {
                if ("|" === e[t]) {
                  for (var s = !1, c = t + 1; c < e.length; c++) {
                    "|" === e[c] || r.options.hideIcons && -1 != r.options.hideIcons.indexOf(e[c].name) || (s = !0);
                  }if (!s) continue;
                }!function (e) {
                  var t;t = "|" === e ? o() : i(e, r.options.toolbarTips, r.options.shortcuts), e.action && ("function" == typeof e.action ? t.onclick = function (t) {
                    t.preventDefault(), e.action(r);
                  } : "string" == typeof e.action && (t.href = e.action, t.target = "_blank")), a[e.name || e] = t, n.appendChild(t);
                }(e[t]);
              }
            }r.toolbarElements = a;var u = this.codemirror;u.on("cursorActivity", function () {
              var e = l(u);for (var t in a) {
                !function (t) {
                  var n = a[t];e[t] ? n.className += " active" : "fullscreen" != t && "side-by-side" != t && (n.className = n.className.replace(/\s*active\s*/g, ""));
                }(t);
              }
            });var f = u.getWrapperElement();return f.parentNode.insertBefore(n, f), n;
          }
        }, B.prototype.createStatusbar = function (e) {
          e = e || this.options.status;var t = this.options,
              n = this.codemirror;if (e && 0 !== e.length) {
            var r,
                i,
                o,
                a = [];for (r = 0; r < e.length; r++) {
              if (i = void 0, o = void 0, "object" == _typeof(e[r])) a.push({ className: e[r].className, defaultValue: e[r].defaultValue, onUpdate: e[r].onUpdate });else {
                var l = e[r];"words" === l ? (o = function o(e) {
                  e.innerHTML = W(n.getValue());
                }, i = function i(e) {
                  e.innerHTML = W(n.getValue());
                }) : "lines" === l ? (o = function o(e) {
                  e.innerHTML = n.lineCount();
                }, i = function i(e) {
                  e.innerHTML = n.lineCount();
                }) : "cursor" === l ? (o = function o(e) {
                  e.innerHTML = "0:0";
                }, i = function i(e) {
                  var t = n.getCursor();e.innerHTML = t.line + ":" + t.ch;
                }) : "autosave" === l && (o = function o(e) {
                  void 0 != t.autosave && t.autosave.enabled === !0 && e.setAttribute("id", "autosaved");
                }), a.push({ className: l, defaultValue: o, onUpdate: i });
              }
            }var s = document.createElement("div");for (s.className = "editor-statusbar", r = 0; r < a.length; r++) {
              var c = a[r],
                  u = document.createElement("span");u.className = c.className, "function" == typeof c.defaultValue && c.defaultValue(u), "function" == typeof c.onUpdate && this.codemirror.on("update", function (e, t) {
                return function () {
                  t.onUpdate(e);
                };
              }(u, c)), s.appendChild(u);
            }var f = this.codemirror.getWrapperElement();return f.parentNode.insertBefore(s, f.nextSibling), s;
          }
        }, B.prototype.value = function (e) {
          return void 0 === e ? this.codemirror.getValue() : (this.codemirror.getDoc().setValue(e), this);
        }, B.toggleBold = c, B.toggleItalic = u, B.toggleStrikethrough = f, B.toggleBlockquote = d, B.toggleHeadingSmaller = p, B.toggleHeadingBigger = m, B.toggleHeading1 = g, B.toggleHeading2 = v, B.toggleHeading3 = y, B.toggleCodeBlock = h, B.toggleUnorderedList = x, B.toggleOrderedList = b, B.cleanBlock = w, B.drawLink = k, B.drawImage = S, B.drawTable = C, B.drawHorizontalRule = L, B.undo = T, B.redo = M, B.togglePreview = A, B.toggleSideBySide = N, B.toggleFullScreen = s, B.prototype.toggleBold = function () {
          c(this);
        }, B.prototype.toggleItalic = function () {
          u(this);
        }, B.prototype.toggleStrikethrough = function () {
          f(this);
        }, B.prototype.toggleBlockquote = function () {
          d(this);
        }, B.prototype.toggleHeadingSmaller = function () {
          p(this);
        }, B.prototype.toggleHeadingBigger = function () {
          m(this);
        }, B.prototype.toggleHeading1 = function () {
          g(this);
        }, B.prototype.toggleHeading2 = function () {
          v(this);
        }, B.prototype.toggleHeading3 = function () {
          y(this);
        }, B.prototype.toggleCodeBlock = function () {
          h(this);
        }, B.prototype.toggleUnorderedList = function () {
          x(this);
        }, B.prototype.toggleOrderedList = function () {
          b(this);
        }, B.prototype.cleanBlock = function () {
          w(this);
        }, B.prototype.drawLink = function () {
          k(this);
        }, B.prototype.drawImage = function () {
          S(this);
        }, B.prototype.drawTable = function () {
          C(this);
        }, B.prototype.drawHorizontalRule = function () {
          L(this);
        }, B.prototype.undo = function () {
          T(this);
        }, B.prototype.redo = function () {
          M(this);
        }, B.prototype.togglePreview = function () {
          A(this);
        }, B.prototype.toggleSideBySide = function () {
          N(this);
        }, B.prototype.toggleFullScreen = function () {
          s(this);
        }, B.prototype.isPreviewActive = function () {
          var e = this.codemirror,
              t = e.getWrapperElement(),
              n = t.lastChild;return (/editor-preview-active/.test(n.className)
          );
        }, B.prototype.isSideBySideActive = function () {
          var e = this.codemirror,
              t = e.getWrapperElement(),
              n = t.nextSibling;return (/editor-preview-active-side/.test(n.className)
          );
        }, B.prototype.isFullscreenActive = function () {
          var e = this.codemirror;return e.getOption("fullScreen");
        }, B.prototype.getState = function () {
          var e = this.codemirror;return l(e);
        }, B.prototype.toTextArea = function () {
          var e = this.codemirror,
              t = e.getWrapperElement();t.parentNode && (this.gui.toolbar && t.parentNode.removeChild(this.gui.toolbar), this.gui.statusbar && t.parentNode.removeChild(this.gui.statusbar), this.gui.sideBySide && t.parentNode.removeChild(this.gui.sideBySide)), e.toTextArea(), this.autosaveTimeoutId && (clearTimeout(this.autosaveTimeoutId), this.autosaveTimeoutId = void 0, this.clearAutosavedValue());
        }, t.exports = B;
      }, { "./codemirror/tablist": 19, codemirror: 10, "codemirror-spell-checker": 4, "codemirror/addon/display/fullscreen.js": 5, "codemirror/addon/display/placeholder.js": 6, "codemirror/addon/edit/continuelist.js": 7, "codemirror/addon/mode/overlay.js": 8, "codemirror/addon/selection/mark-selection.js": 9, "codemirror/mode/gfm/gfm.js": 11, "codemirror/mode/markdown/markdown.js": 12, "codemirror/mode/xml/xml.js": 14, marked: 17 }] }, {}, [20])(20);
  });
});
define('text!assets/css/styles.css', ['module'], function(module) { module.exports = "/*Normalización*/\n\ninput[type=\"number\"]::-webkit-outer-spin-button,\ninput[type=\"number\"]::-webkit-inner-spin-button {\n    -webkit-appearance: none;\n    margin: 0;\n}\ninput[type=\"number\"] {\n    -moz-appearance: textfield;\n}\n\nhtml,\nbody {\n  height: 100%;\n}\n\npre {\n  font-family: monospace;\n}\n\n.navbar-toggle {\n  margin-top: 13px;\n  margin-bottom: 13px;\n}\n\n.navbar-toggle .icon-bar {\n  display: block;\n  width: 22px;\n  height: 3px;\n  border-radius: 1px;\n  background-color: #FFF;\n}\n\n.navbar-collapse.collapse.in {\n  background-color: #e74c3c;\n}\n\n@media (max-width: 767px) {\n  table {\n    display: block;\n    overflow-x: auto;\n  }\n  .breadcrumb {\n    display: none;\n  }\n  .filter-left, .filter-right {\n    text-align: left!important;\n  }\n  .filter-right {\n    margin-top:13px;\n  }\n  .filter-left .btn.btn-default.dropdown-toggle,\n  .filter-right .btn.btn-default.dropdown-toggle {\n    padding-left: 0!important;\n    padding-right: 0!important;\n    padding-bottom: 0!important;\n  }\n  .ufps-navbar-search {\n    width: 95%;\n  }\n  .ufps-sign-links {\n    margin-bottom: 25px;\n  }\n}\n\n@media (max-width: 991px) {\n  .navbar-header {\n    float: none;\n  }\n  .navbar-left,\n  .navbar-right {\n    float: none !important;\n  }\n  .navbar-toggle {\n    display: block;\n  }\n  .navbar-collapse {\n    border-top: 1px solid transparent;\n    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);\n  }\n  .navbar-fixed-top {\n    top: 0;\n    border-width: 0 0 1px;\n  }\n  .navbar-collapse.collapse {\n    display: none !important;\n  }\n  .navbar-nav {\n    float: none !important;\n    margin-top: 7.5px;\n  }\n  .navbar-nav>li {\n    float: none;\n  }\n  .navbar-nav>li>a {\n    padding-top: 10px;\n    padding-bottom: 10px;\n  }\n  .collapse.in {\n    display: block !important;\n    overflow-y: auto !important;\n  }\n}\n\n.nav>li>a:focus,\n.nav>li>a:hover {\n  background-color: transparent !important;\n}\n\n/*Estilos not-logged*/\n\n.ufps-container-sign {\n  min-height: 100%;\n  background-color: #E74C3C;\n}\n\n.ufps-container-sign .ufps-logo-sign {\n  margin-top: 40px;\n  height: 120px;\n}\n\n.ufps-container-sign .ufps-logo-sign-in {\n  margin-top: 20px;\n  height: 80px;\n}\n\n.ufps-form-sign {\n  margin-top: 30px;\n}\n\n.ufps-container-sign h1 {\n  font-size: 24px;\n}\n\n.ufps-container-sign h1,\n.ufps-container-sign label,\n.ufps-container-sign p {\n  color: #FFF;\n}\n\n.ufps-container-sign .ufps-sign-input,\n.ufps-navbar-input {\n  box-shadow: 0 0 10px #C0392B;\n  border: none;\n  height: 45px;\n  border-radius: 2px;\n  font-size: 16px;\n  transition: all .3s ease;\n}\n\n.ufps-navbar-input {\n  box-shadow: none;\n}\n\n.ufps-input-navbar-addon {\n  background-color: #FFF;\n  border: none;\n  cursor: pointer;\n}\n\n.ufps-navbar-input:focus {\n  box-shadow: none;\n}\n\n.ufps-container-sign .ufps-btn-sign {\n  width: 100%;\n  height: 45px;\n  border: 1px solid #ECF0F1;\n  color: #FFF;\n  font-size: 16px;\n  border-radius: 2px;\n  background-color: transparent;\n  margin-top: 20px;\n  transition: all .3s ease;\n}\n\n.ufps-container-sign .ufps-btn-sign:hover,\n.ufps-container-sign .ufps-btn-sign:active,\n.ufps-container-sign .ufps-btn-sign:hover:active,\n.ufps-container-sign .ufps-btn-sign:focus {\n  background-color: #FFF;\n  color: #C0392B;\n  box-shadow: 0 0 10px #C0392B;\n}\n\n.ufps-container-sign .ufps-btn-sign:focus {\n  outline: 0;\n  background-color: #FFF;\n  border: 1px solid #BDC3C7;\n}\n\n.ufps-sign-links {\n  margin-top: 20px;\n  margin-left: 0;\n  margin-right: 0;\n  padding-left: 0;\n  padding-right: 0;\n}\n\n.ufps-sign-links,\n.ufps-sign-links a {\n  color: #FFF;\n  cursor: pointer;\n}\n\n.ufps-sign-about {\n  margin-top: 40px;\n}\n\n.ufps-sign-about p {\n  color: #FFF;\n  font-size: 14px;\n}\n\n.ufps-sign-in-correct, .ufps-sign-in-incorrect {\n  color: #FFF;\n}\n\n/*Formulario de registro*/\n\n.ufps-form-inline {\n  position: relative;\n  margin-bottom: 20px;\n}\n\n.ufps-form-inline input {\n  font-size: 14px;\n  padding: 5px 10px 7px 5px;\n  background: transparent;\n  display: block;\n  width: 100%;\n  border: none;\n  color: #FFF;\n  border-bottom: 1px solid #FFF;\n}\n\n.ufps-form-inline input:focus {\n  outline: none;\n}\n\n.ufps-form-inline label {\n  color: #FFF;\n  font-size: 14px;\n  font-weight: normal;\n  position: absolute;\n  pointer-events: none;\n  left: 5px;\n  top: 10px;\n  transition: 0.2s ease all;\n  -moz-transition: 0.2s ease all;\n  -webkit-transition: 0.2s ease all;\n}\n\n.ufps-form-inline input:focus~label,\n.ufps-form-inline input:valid~label {\n  top: -14px;\n  font-size: 12px;\n  font-weight: bold;\n  color: #FFF;\n}\n\n.ufps-form-inline .ufps-form-bar {\n  position: relative;\n  display: block;\n  width: 100%;\n}\n\n.ufps-form-inline .ufps-form-bar:before,\n.ufps-form-inline .ufps-form-bar:after {\n  content: '';\n  height: 2px;\n  width: 0;\n  bottom: 1px;\n  position: absolute;\n  background: #FFF;\n  transition: 0.2s ease all;\n  -moz-transition: 0.2s ease all;\n  -webkit-transition: 0.2s ease all;\n}\n\n.ufps-form-inline .ufps-form-bar:before {\n  left: 50%;\n}\n\n.ufps-form-inline .ufps-form-bar:after {\n  right: 50%;\n}\n\n.ufps-form-inline input:focus~.ufps-form-bar:before,\n.ufps-form-inline input:focus~.ufps-form-bar:after {\n  width: 50%;\n}\n\n/*Navbar*/\n\n.ufps-navbar {\n  background-color: #344958;\n  border-radius: 0;\n  border: none;\n  height: 65px;\n}\n\n.ufps-brand {\n  height: 65px;\n  padding: 5px 15px 5px 15px;\n}\n\n.ufps-brand img {\n  height: 55px;\n}\n\n.ufps-btn-nav a {\n  height: 65px;\n  padding-left: 18px !important;\n  padding-right: 18px !important;\n  line-height: 35px !important;\n  font-size: 16px;\n  color: #ACB2B6;\n  transition: all .3s ease;\n}\n\n.ufps-btn-nav.active a {\n  border-bottom: 6px solid #E74C3C;\n  color: #FFF;\n}\n\n.ufps-btn-nav a:hover {\n  background-color: transparent !important;\n  color: #FFF !important;\n}\n\n.ufps-btn-nav.dropdown.open>a {\n  background-color: transparent;\n  color: #FFF !important;\n  border-color: #FFF !important;\n}\n\n.ufps-dropdown-menu {\n  border: none;\n  border-radius: 0;\n}\n\n.ufps-dropdown-menu>li>a {\n  height: 40px;\n  line-height: 35px;\n  color: #444 !important;\n  border-bottom: 0px !important;\n}\n\n.ufps-dropdown-menu>li>a:hover {\n  background-color: #E74C3C !important;\n  color: #FFF !important;\n}\n\n.ufps-navbar-search {\n  margin-top: 2px;\n}\n\n.ufps-avatar {\n  width: 55px;\n  height: 55px;\n  border-radius: 2px;\n}\n\n.ufps-dropdown-user a {\n  padding-top: 5px !important;\n  padding-bottom: 5px !important;\n}\n\n/*Barra de progreso*/\n\n#nprogress .bar {\n  background: #FFF !important;\n  box-shadow: 0 0 10px rgba(155, 155, 155, .5);\n  height: 4px !important;\n}\n\n#nprogress .peg {\n  box-shadow: 0 0 10px #FFF, 0 0 5px #FFF !important;\n}\n\n#nprogress .spinner-icon {\n  border-top-color: #FFF !important;\n  border-left-color: #FFF !important;\n}\n\n/*Notificaciones*/\n\n.alert {\n  position: fixed;\n  z-index: 100;\n  font-family: Helvetica Neue, Helvetica, san-serif;\n  font-size: 16px;\n  top: 65px;\n  left: 30%;\n  width: 40%;\n  color: #444;\n  padding: 10px;\n  opacity: .9;\n  text-align: center;\n  background-color: #fff;\n  border: none;\n  border-top-left-radius: 0;\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 3px;\n  border-bottom-left-radius: 3px;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);\n  transition: all .4s ease;\n}\n\n.alert:hover {\n  opacity: 1;\n}\n\n.alert-success {\n  background-color: #18bc9c;\n  color: #FFF;\n}\n\n.alert-danger {\n  background-color: #e74c3c;\n  color: #FFF;\n}\n\n.alert-info {\n  background-color: #3498db;\n  color: #FFF;\n}\n\n.alert-warning {\n  background-color: #ff9800;\n  color: #FFF;\n}\n\n.ufps-dropdown-menu {\n  cursor: pointer;\n}\n\n.ufps-bg {\n  position: absolute;\n  top: 0;\n  height: 100%;\n  overflow-y: auto;\n  left: 0;\n  right: 0;\n}\n\n@media (min-width: 768px) {\n  .ufps-bg {\n    background-image: url(src/assets/img/bg-pc.jpg);\n    background-position: center center;\n    background-repeat: no-repeat;\n    background-attachment: fixed;\n    background-size: cover;\n    background-color: #34495E;\n  }\n}\n\n.fix {\n  clear: both;\n}\n\n.ufps-separator {\n  width: 100%;\n  height: 40px;\n}\n\n.ufps-separator-mini {\n  width: 100%;\n  height: 10px;\n  \n}\n\nbody {\n  background-color: #ECF0F1;\n}\n\n.body-slot {\n  padding-top: 65px;\n  background-color: #ECF0F1;\n}\n\nhr {\n  border-top: 1px solid #e74c3c;\n}\n\n.ufps-navbar {\n  background-color: #e74c3c;\n}\n\n.ufps-btn-nav.active a {\n  border-bottom: 10px solid #ffffff;\n  color: #FFF;\n}\n\n.ufps-btn-nav a {\n  color: #eee;\n}\n\n.ufps-card {\n  box-shadow: 0 0 10px rgba(0, 0, 0, .2);\n  border-radius: 3px;\n  text-align: center;\n  padding-left: 0;\n  padding-right: 0;\n  margin-top: 25px;\n}\n\n.ufps-card-title {\n  border-top-left-radius: 3px;\n  border-top-right-radius: 3px;\n  color: #FFF;\n  text-shadow: 0 0 20px rgba(0, 0, 0, 0.55);\n  height: 100px;\n  position: relative;\n}\n\n.ufps-card-material {\n  border-bottom-left-radius: 3px;\n  border-bottom-right-radius: 3px;\n  height: 130px;\n}\n\n.ufps-card-container a,\n.ufps-card-container a:hover,\n.ufps-card-container a:active {\n  cursor: pointer;\n  text-decoration: none !important;\n}\n\n.ufps-edit-category,\n.ufps-remove-category {\n  position: absolute;\n  top: 5px;\n  opacity: .4;\n  transition: all .3s ease;\n  cursor: pointer;\n  color: #FFF !important;\n}\n\n.ufps-edit-category {\n  left: 5px;\n}\n\n.ufps-remove-category {\n  right: 5px;\n}\n\n.ufps-card-container:hover .ufps-edit-category,\n.ufps-card-container:hover .ufps-remove-category {\n  opacity: 1;\n}\n\n.ufps-card-container:nth-child(3n + 0) .ufps-card-title {\n  background: #87e0fd;\n  background: -moz-linear-gradient(left, #87e0fd 0%, #53cbf1 40%, #05abe0 100%);\n  background: -webkit-linear-gradient(left, #87e0fd 0%, #53cbf1 40%, #05abe0 100%);\n  background: linear-gradient(to right, #87e0fd 0%, #53cbf1 40%, #05abe0 100%);\n  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#87e0fd', endColorstr='#05abe0', GradientType=1);\n}\n\n.ufps-card-container:nth-child(3n + 1) .ufps-card-title {\n  background: #e74c3c;\n  background: -moz-linear-gradient(left, #e74c3c 0%, #e74c3c 40%, #9e2424 100%);\n  background: -webkit-linear-gradient(left, #e74c3c 0%, #e74c3c 40%, #9e2424 100%);\n  background: linear-gradient(to right, #e74c3c 0%, #e74c3c 40%, #9e2424 100%);\n  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#e74c3c', endColorstr='#9e2424', GradientType=1);\n}\n\n.ufps-card-container:nth-child(3n + 2) .ufps-card-title {\n  background: #1abc9c;\n  background: -moz-linear-gradient(left, #1abc9c 0%, #1abc9c 40%, #27ae60 100%);\n  background: -webkit-linear-gradient(left, #1abc9c 0%, #1abc9c 40%, #27ae60 100%);\n  background: linear-gradient(to right, #1abc9c 0%, #1abc9c 40%, #27ae60 100%);\n  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#1abc9c', endColorstr='#27ae60', GradientType=1);\n}\n\n.ufps-card-new {\n  cursor: pointer;\n}\n\n.ufps-card-new .ufps-card-title {\n  background: #BBB !important;\n}\n\n.ufps-card-title h1,\n.ufps-card-title a,\n.ufps-card-title h1 a {\n  margin: 0;\n  font-size: 22px;\n  text-align: center;\n  position: relative;\n  color: #FFF !important;\n  padding-left: 3%;\n  padding-right: 3%;\n  top: 50%;\n  -ms-transform: translateY(-50%);\n  -webkit-transform: translateY(-50%);\n  transform: translateY(-50%);\n}\n\n.ufps-card-title h1 span {\n  border: 4px solid #FFF;\n  border-radius: 50%;\n  padding: 6px 6px 8px 7px;\n}\n\n.ufps-card-link {\n  padding-top: 5px;\n  padding-bottom: 5px;\n}\n\n.ufps-card-link a,\n.ufps-card-link a:hover {\n  color: #555;\n  text-decoration: none;\n}\n\ntable {\n  border-collapse: collapse;\n  width: 100%;\n}\n\nth,\ntd {\n  text-align: left;\n  padding: 14px;\n}\n\ntr:nth-child(even) {\n  background-color: #F2F2F2;\n}\n\ntr:nth-child(odd) {\n  background-color: #FFF;\n}\n\nth {\n  background-color: #e74c3c;\n  color: white;\n}\n\n.dropdown-inline {\n  display: inline;\n}\n\n.dropdown-mini {\n  min-width: 0;\n  margin-top: 11px;\n}\n\n.ufps-dropdown button,\n.ufps-dropdown button:hover,\n.ufps-dropdown button:focus,\n.ufps-dropdown button:active {\n  border-radius: 0;\n  border: none;\n  background-color: transparent !important;\n  border-bottom: 3px solid #e74c3c !important;\n  outline: none !important;\n  box-shadow: none !important;\n}\n\n/* PAGINACIÓN */\n\n.pagination>li>a,\n.pagination>li>span {\n  color: #666;\n  cursor: pointer;\n}\n\n.pagination>li>a:focus,\n.pagination>li>a:hover,\n.pagination>li>span:focus,\n.pagination>li>span:hover {\n  color: #444;\n}\n\n.pagination>.active>a,\n.pagination>.active>a:focus,\n.pagination>.active>a:hover,\n.pagination>.active>span,\n.pagination>.active>span:focus,\n.pagination>.active>span:hover {\n  background-color: #e74c3c;\n  border-color: #e74c3c;\n}\n\n.pagination>.disabled>a,\n.pagination>.disabled>a:focus,\n.pagination>.disabled>a:hover,\n.pagination>.disabled>span,\n.pagination>.disabled>span:focus,\n.pagination>.disabled>span:hover {\n  color: #BBB;\n}\n\n/*FIXES*/\n\n.modal-backdrop.in {\n  filter: alpha(opacity=90);\n  opacity: .9;\n}\n\n.modal-content {\n  border-radius: 0px;\n}\n\n.form-control,\n.form-control:focus {\n  border-radius: 2px;\n  border-color: #AAA;\n  box-shadow: none;\n}\n\n/*BOTONES*/\n\n.ufps-btn-default,\n.ufps-btn-default:hover,\n.ufps-btn-default:focus,\n.ufps-btn-default:active {\n  background-color: #e74c3c;\n  border-color: #e74c3c;\n  color: #FFF;\n  outline: 0;\n}\n\n.ufps-input-creator input.form-control,\ntextarea.form-control {\n  border-right: 0;\n}\n\n.ufps-input-creator .form-control {\n  border-color: #CCC;\n}\n\n.ufps-input-creator textarea.form-control {\n  height: 100px;\n}\n\n.ufps-input-creator span.input-group-addon,\n.ufps-input-creator span.input-group-addon:hover,\n.ufps-input-creator span.input-group-addon:active {\n  background-color: #FFF !important;\n  border-left: none !important;\n  border-radius: 2px !important;\n}\n\n.nav-pills.nav-maraton>li>a,\n.nav-maraton.nav-pills>li>a:hover,\n.nav-maraton.nav-pills>li>a:focus {\n  color: #444;\n  cursor: pointer;\n}\n\n.nav-pills.nav-maraton>li.active>a,\n.nav-maraton.nav-pills>li.active>a:hover,\n.nav-maraton.nav-pills>li.active>a:focus {\n  background-color: #e74c3c !important;\n  color: #FFF !important;\n}\n\n.nav>li.disabled>a {\n  cursor: not-allowed !important;\n}\n\n.ufps-input-creator select {\n  border-color: #CCC;\n  border-radius: 2px;\n  border-right: 0;\n}\n\n.inputfile-btn {\n  width: 0.1px;\n  height: 0.1px;\n  opacity: 0;\n  overflow: hidden;\n  position: absolute;\n  z-index: -1;\n}\n\n.inputfile-btn+label {\n  width: 90%;\n  background-color: #e74c3c;\n  color: #FFF;\n  border-radius: 2px;\n  padding: 6px;\n  float: right;\n  text-align: center;\n  height: 20px;\n  box-sizing: content-box;\n  transition: all .3s ease;\n  cursor: pointer;\n}\n\n.inputfile-btn:focus+label,\n.inputfile-btn+label:hover {\n  box-shadow: 0 0 10px rgba(0, 0, 0, .2);\n}\n\n.active.selected {\n  color: #222!Important;\n}\n\n.ufps-container-404 {\n  margin-top: 40px;\n}\n.img-404 {\n  margin: 20px auto;\n}\n\n/*EDITOR*/\n\n.editor-toolbar.fullscreen,\n.CodeMirror-fullscreen,\n.editor-preview-side {\n  z-index: 10000 !important;\n}\n\n.ufps-btn-submit,\n.ufps-btn-submit:hover,\n.ufps-btn-submit:active,\n.ufps-btn-submit:focus {\n  margin-top: 20px;\n  background-color: #e74c3c;\n  color: #FFF;\n  border-radius: 2px;\n}\n\n.ufps-language {\n  color: #666;\n}\n\n.ufps-language .active,\n.ufps-language .active a {\n  color: #666;\n  cursor: pointer;\n}\n\n.ufps-language .inactive,\n.ufps-language .inactive a {\n  color: #CCC;\n  cursor: not-allowed;\n}\n\na {\n  cursor: pointer!important;\n}\n\na.inactive {\n  background-color: #e2a29b;\n  cursor:not-allowed;\n}\n\n.ufps-name-problem-list,\n.ufps-edit-problem-list {\n  float: left;\n}\n\n.ufps-name-problem-list {\n  margin-bottom: 0;\n}\n\n.ufps-name-problem-list-l {\n  float: none !important;\n}\n\n.ufps-edit-problem-list {\n  opacity: 0.4;\n  cursor: pointer;\n  color: #000;\n  transition: all .3s ease;\n  margin-left: 10px;\n}\n\n.ufps-td-problem:hover .ufps-edit-problem-list {\n  opacity: 1;\n}\n\n/*MARKDOWN EDITOR*/\n\n.ufps-problem-title {\n  font-size: 32px;\n  font-weight: bold;\n}\n\n.ufps-markdown-editor h1 {\n  font-size: 28px;\n  font-weight: bold;\n}\n\n.ufps-markdown-editor h2 {\n  font-size: 28px;\n}\n\n.ufps-markdown-editor h3 {\n  font-size: 22px;\n}\n\n.ufps-markdown-editor h4 {\n  font-size: 20px;\n}\n\n.ufps-markdown-editor h5 {\n  font-size: 18px;\n}\n\n.ufps-markdown-editor h6 {\n  font-size: 16px;\n}\n\n.ufps-submit-form .input-group {\n  width: 100%;\n}\n\n.ufps-submit-form .inputfile-btn+label {\n  width: 100%;\n  height: 32px;\n  box-sizing: border-box;\n  float: none;\n}\n\n.ufps-submit-form .ufps-btn-submit, .ufps-btn-edit-problem {\n  width: 100%;\n}\n\n.ufps-name-problem-list a {\n  color: #444;\n}\n\n.example-in-out {\n  padding: 0;\n}\n\n.example-in-out pre {\n  padding: 14px;\n  margin: 0;\n  border: none;\n}\n\niframe {\n  width: 100%;\n}\n\n.ufps-container-iframe {\n  position: relative;\n  width: 100%;\n  height: 0;\n  padding-bottom: 56.25%;\n}\n\n.ufps-iframe {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n\n.form-horizontal-assignment .control-label {\n  text-align: left !important;\n}\n\n.ufps-font-size-small {\n  font-size: 11px;\n}\n\n.ufps-score-correct,\n.ufps-score-incorrect,\n.ufps-score-judging,\n.ufps-score-first,\n.ufps-score-gold {\n  background-image: url(src/assets/img/score-bg.png);\n  margin: auto;\n  width: 32px;\n  height: 35px;\n}\n\ntr:nth-child(2n+1) td .ufps-score-correct,\ntr:nth-child(2n+1) td .ufps-score-incorrect,\ntr:nth-child(2n+1) td .ufps-score-judging,\ntr:nth-child(2n+1) td .ufps-score-first,\ntr:nth-child(2n+1) td .ufps-score-gold {\n  background-image: url(src/assets/img/score-light.png);\n  border-right: 1px solid #FFF;\n}\n\ntr:nth-child(2n) td .ufps-score-correct,\ntr:nth-child(2n) td .ufps-score-incorrect,\ntr:nth-child(2n) td .ufps-score-judging,\ntr:nth-child(2n) td .ufps-score-first,\ntr:nth-child(2n) td .ufps-score-gold {\n  background-image: url(src/assets/img/score-dark.png);\n  border-right: 1px solid #f2f2f2;\n\n}\n\n.ufps-score-correct {\n  background-color: #e74c3c;\n}\n\n.ufps-score-incorrect {\n  background-color: #999;\n}\n\n.ufps-score-judging {\n  background-color: #ff988e;\n  border-color: #ff988e;\n}\n\n.ufps-score-first {\n  background-color: #a91b0d;\n}\n\n.ufps-score-gold {\n  background-color: #d4af37;\n}\n\n.ufps-score>tbody>tr>td {\n  padding-top: 2px;\n  padding-bottom: 2px;\n  height: 60px;\n}\n\n.problem-resolved {\n  width: 50px;\n}\n\n.disabled-select {\n  cursor: not-allowed !important;\n  opacity: 0.65;\n}\n\n.search-btn {\n  background-color: transparent;\n  border: none;\n  height: 45px;\n  width: 30px;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.form-group.ufps-navbar-search {\n  position: relative;\n}\n\n.navbar-form {\n  padding-right: 0;\n}\n.ufps-btn-nav a.icon-more-a {\n  padding-left: 11px!important;\n}\n.icon-more {\n  font-size: 24px;\n  padding-top: 13px;\n}\n.username-gray {\n  color: #888;\n}\n\n.panel-space {\n  padding: 15px 40px!important;\n}\n\n.breadcrumb li a {\n  color: #e74c3c;\n}\n\n.breadcrumb {\n  margin-top: 10px;\n  background-color: transparent!important;\n}\n\n.container-contest .breadcrumb {\n  margin-bottom: 0!important;\n}\n.container-contest h2 {\n  margin-top: 0!important;\n}\n\n.link-register {\n  color: #e74c3c;\n}\n\n.bread-mini {\n  margin-bottom: 0;\n}\n\n.text-lg-a,.text-lg-a p {\n  font-size: 18px;\n}\n\n.panel-resolved {\n  background-color: #e74c3c;\n  color: #FFF;\n}"; });
define('text!assets/css/simplemde.min.css', ['module'], function(module) { module.exports = "/**\n * simplemde v1.11.2\n * Copyright Next Step Webs, Inc.\n * @link https://github.com/NextStepWebs/simplemde-markdown-editor\n * @license MIT\n */\n.CodeMirror{color:#000}.CodeMirror-lines{padding:4px 0}.CodeMirror pre{padding:0 4px}.CodeMirror-gutter-filler,.CodeMirror-scrollbar-filler{background-color:#fff}.CodeMirror-gutters{border-right:1px solid #ddd;background-color:#f7f7f7;white-space:nowrap}.CodeMirror-linenumber{padding:0 3px 0 5px;min-width:20px;text-align:right;color:#999;white-space:nowrap}.CodeMirror-guttermarker{color:#000}.CodeMirror-guttermarker-subtle{color:#999}.CodeMirror-cursor{border-left:1px solid #000;border-right:none;width:0}.CodeMirror div.CodeMirror-secondarycursor{border-left:1px solid silver}.cm-fat-cursor .CodeMirror-cursor{width:auto;border:0!important;background:#7e7}.cm-fat-cursor div.CodeMirror-cursors{z-index:1}.cm-animate-fat-cursor{width:auto;border:0;-webkit-animation:blink 1.06s steps(1) infinite;-moz-animation:blink 1.06s steps(1) infinite;animation:blink 1.06s steps(1) infinite;background-color:#7e7}@-moz-keyframes blink{50%{background-color:transparent}}@-webkit-keyframes blink{50%{background-color:transparent}}@keyframes blink{50%{background-color:transparent}}.cm-tab{display:inline-block;text-decoration:inherit}.CodeMirror-ruler{border-left:1px solid #ccc;position:absolute}.cm-s-default .cm-header{color:#00f}.cm-s-default .cm-quote{color:#090}.cm-negative{color:#d44}.cm-positive{color:#292}.cm-header,.cm-strong{font-weight:700}.cm-em{font-style:italic}.cm-link{text-decoration:underline}.cm-strikethrough{text-decoration:line-through}.cm-s-default .cm-keyword{color:#708}.cm-s-default .cm-atom{color:#219}.cm-s-default .cm-number{color:#164}.cm-s-default .cm-def{color:#00f}.cm-s-default .cm-variable-2{color:#05a}.cm-s-default .cm-variable-3{color:#085}.cm-s-default .cm-comment{color:#a50}.cm-s-default .cm-string{color:#a11}.cm-s-default .cm-string-2{color:#f50}.cm-s-default .cm-meta,.cm-s-default .cm-qualifier{color:#555}.cm-s-default .cm-builtin{color:#30a}.cm-s-default .cm-bracket{color:#997}.cm-s-default .cm-tag{color:#170}.cm-s-default .cm-attribute{color:#00c}.cm-s-default .cm-hr{color:#999}.cm-s-default .cm-link{color:#00c}.cm-invalidchar,.cm-s-default .cm-error{color:red}.CodeMirror-composing{border-bottom:2px solid}div.CodeMirror span.CodeMirror-matchingbracket{color:#0f0}div.CodeMirror span.CodeMirror-nonmatchingbracket{color:#f22}.CodeMirror-matchingtag{background:rgba(255,150,0,.3)}.CodeMirror-activeline-background{background:#e8f2ff}.CodeMirror{position:relative;overflow:hidden;background:#fff}.CodeMirror-scroll{overflow:scroll!important;margin-bottom:-30px;margin-right:-30px;padding-bottom:30px;height:100%;outline:0;position:relative}.CodeMirror-sizer{position:relative;border-right:30px solid transparent}.CodeMirror-gutter-filler,.CodeMirror-hscrollbar,.CodeMirror-scrollbar-filler,.CodeMirror-vscrollbar{position:absolute;z-index:6;display:none}.CodeMirror-vscrollbar{right:0;top:0;overflow-x:hidden;overflow-y:scroll}.CodeMirror-hscrollbar{bottom:0;left:0;overflow-y:hidden;overflow-x:scroll}.CodeMirror-scrollbar-filler{right:0;bottom:0}.CodeMirror-gutter-filler{left:0;bottom:0}.CodeMirror-gutters{position:absolute;left:0;top:0;min-height:100%;z-index:3}.CodeMirror-gutter{white-space:normal;height:100%;display:inline-block;vertical-align:top;margin-bottom:-30px}.CodeMirror-gutter-wrapper{position:absolute;z-index:4;background:0 0!important;border:none!important;-webkit-user-select:none;-moz-user-select:none;user-select:none}.CodeMirror-gutter-background{position:absolute;top:0;bottom:0;z-index:4}.CodeMirror-gutter-elt{position:absolute;cursor:default;z-index:4}.CodeMirror-lines{cursor:text;min-height:1px}.CodeMirror pre{-moz-border-radius:0;-webkit-border-radius:0;border-radius:0;border-width:0;background:0 0;font-family:inherit;font-size:inherit;margin:0;white-space:pre;word-wrap:normal;line-height:inherit;color:inherit;z-index:2;position:relative;overflow:visible;-webkit-tap-highlight-color:transparent;-webkit-font-variant-ligatures:none;font-variant-ligatures:none}.CodeMirror-wrap pre{word-wrap:break-word;white-space:pre-wrap;word-break:normal}.CodeMirror-linebackground{position:absolute;left:0;right:0;top:0;bottom:0;z-index:0}.CodeMirror-linewidget{position:relative;z-index:2;overflow:auto}.CodeMirror-code{outline:0}.CodeMirror-gutter,.CodeMirror-gutters,.CodeMirror-linenumber,.CodeMirror-scroll,.CodeMirror-sizer{-moz-box-sizing:content-box;box-sizing:content-box}.CodeMirror-measure{position:absolute;width:100%;height:0;overflow:hidden;visibility:hidden}.CodeMirror-cursor{position:absolute}.CodeMirror-measure pre{position:static}div.CodeMirror-cursors{visibility:hidden;position:relative;z-index:3}.CodeMirror-focused div.CodeMirror-cursors,div.CodeMirror-dragcursors{visibility:visible}.CodeMirror-selected{background:#d9d9d9}.CodeMirror-focused .CodeMirror-selected,.CodeMirror-line::selection,.CodeMirror-line>span::selection,.CodeMirror-line>span>span::selection{background:#d7d4f0}.CodeMirror-crosshair{cursor:crosshair}.CodeMirror-line::-moz-selection,.CodeMirror-line>span::-moz-selection,.CodeMirror-line>span>span::-moz-selection{background:#d7d4f0}.cm-searching{background:#ffa;background:rgba(255,255,0,.4)}.cm-force-border{padding-right:.1px}@media print{.CodeMirror div.CodeMirror-cursors{visibility:hidden}}.cm-tab-wrap-hack:after{content:''}span.CodeMirror-selectedtext{background:0 0}.CodeMirror{height:auto;min-height:300px;border:1px solid #ddd;border-bottom-left-radius:4px;border-bottom-right-radius:4px;padding:10px;font:inherit;z-index:1}.CodeMirror-scroll{min-height:300px}.CodeMirror-fullscreen{background:#fff;position:fixed!important;top:50px;left:0;right:0;bottom:0;height:auto;z-index:9}.CodeMirror-sided{width:50%!important}.editor-toolbar{position:relative;opacity:.6;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;-o-user-select:none;user-select:none;padding:0 10px;border-top:1px solid #bbb;border-left:1px solid #bbb;border-right:1px solid #bbb;border-top-left-radius:4px;border-top-right-radius:4px}.editor-toolbar:after,.editor-toolbar:before{display:block;content:' ';height:1px}.editor-toolbar:before{margin-bottom:8px}.editor-toolbar:after{margin-top:8px}.editor-toolbar:hover,.editor-wrapper input.title:focus,.editor-wrapper input.title:hover{opacity:.8}.editor-toolbar.fullscreen{width:100%;height:50px;overflow-x:auto;overflow-y:hidden;white-space:nowrap;padding-top:10px;padding-bottom:10px;box-sizing:border-box;background:#fff;border:0;position:fixed;top:0;left:0;opacity:1;z-index:9}.editor-toolbar.fullscreen::before{width:20px;height:50px;background:-moz-linear-gradient(left,rgba(255,255,255,1) 0,rgba(255,255,255,0) 100%);background:-webkit-gradient(linear,left top,right top,color-stop(0,rgba(255,255,255,1)),color-stop(100%,rgba(255,255,255,0)));background:-webkit-linear-gradient(left,rgba(255,255,255,1) 0,rgba(255,255,255,0) 100%);background:-o-linear-gradient(left,rgba(255,255,255,1) 0,rgba(255,255,255,0) 100%);background:-ms-linear-gradient(left,rgba(255,255,255,1) 0,rgba(255,255,255,0) 100%);background:linear-gradient(to right,rgba(255,255,255,1) 0,rgba(255,255,255,0) 100%);position:fixed;top:0;left:0;margin:0;padding:0}.editor-toolbar.fullscreen::after{width:20px;height:50px;background:-moz-linear-gradient(left,rgba(255,255,255,0) 0,rgba(255,255,255,1) 100%);background:-webkit-gradient(linear,left top,right top,color-stop(0,rgba(255,255,255,0)),color-stop(100%,rgba(255,255,255,1)));background:-webkit-linear-gradient(left,rgba(255,255,255,0) 0,rgba(255,255,255,1) 100%);background:-o-linear-gradient(left,rgba(255,255,255,0) 0,rgba(255,255,255,1) 100%);background:-ms-linear-gradient(left,rgba(255,255,255,0) 0,rgba(255,255,255,1) 100%);background:linear-gradient(to right,rgba(255,255,255,0) 0,rgba(255,255,255,1) 100%);position:fixed;top:0;right:0;margin:0;padding:0}.editor-toolbar a{display:inline-block;text-align:center;text-decoration:none!important;color:#2c3e50!important;width:30px;height:30px;margin:0;border:1px solid transparent;border-radius:3px;cursor:pointer}.editor-toolbar a.active,.editor-toolbar a:hover{background:#fcfcfc;border-color:#95a5a6}.editor-toolbar a:before{line-height:30px}.editor-toolbar i.separator{display:inline-block;width:0;border-left:1px solid #d9d9d9;border-right:1px solid #fff;color:transparent;text-indent:-10px;margin:0 6px}.editor-toolbar a.fa-header-x:after{font-family:Arial,\"Helvetica Neue\",Helvetica,sans-serif;font-size:65%;vertical-align:text-bottom;position:relative;top:2px}.editor-toolbar a.fa-header-1:after{content:\"1\"}.editor-toolbar a.fa-header-2:after{content:\"2\"}.editor-toolbar a.fa-header-3:after{content:\"3\"}.editor-toolbar a.fa-header-bigger:after{content:\"▲\"}.editor-toolbar a.fa-header-smaller:after{content:\"▼\"}.editor-toolbar.disabled-for-preview a:not(.no-disable){pointer-events:none;background:#fff;border-color:transparent;text-shadow:inherit}@media only screen and (max-width:700px){.editor-toolbar a.no-mobile{display:none}}.editor-statusbar{padding:8px 10px;font-size:12px;color:#959694;text-align:right}.editor-statusbar span{display:inline-block;min-width:4em;margin-left:1em}.editor-preview,.editor-preview-side{padding:10px;background:#fafafa;overflow:auto;display:none;box-sizing:border-box}.editor-statusbar .lines:before{content:'lines: '}.editor-statusbar .words:before{content:'words: '}.editor-statusbar .characters:before{content:'characters: '}.editor-preview{position:absolute;width:100%;height:100%;top:0;left:0;z-index:7}.editor-preview-side{position:fixed;bottom:0;width:50%;top:50px;right:0;z-index:9;border:1px solid #ddd}.editor-preview-active,.editor-preview-active-side{display:block}.editor-preview-side>p,.editor-preview>p{margin-top:0}.editor-preview pre,.editor-preview-side pre{background:#eee;margin-bottom:10px}.editor-preview table td,.editor-preview table th,.editor-preview-side table td,.editor-preview-side table th{border:1px solid #ddd;padding:5px}.CodeMirror .CodeMirror-code .cm-tag{color:#63a35c}.CodeMirror .CodeMirror-code .cm-attribute{color:#795da3}.CodeMirror .CodeMirror-code .cm-string{color:#183691}.CodeMirror .CodeMirror-selected{background:#d9d9d9}.CodeMirror .CodeMirror-code .cm-header-1{font-size:200%;line-height:200%}.CodeMirror .CodeMirror-code .cm-header-2{font-size:160%;line-height:160%}.CodeMirror .CodeMirror-code .cm-header-3{font-size:125%;line-height:125%}.CodeMirror .CodeMirror-code .cm-header-4{font-size:110%;line-height:110%}.CodeMirror .CodeMirror-code .cm-comment{background:rgba(0,0,0,.05);border-radius:2px}.CodeMirror .CodeMirror-code .cm-link{color:#7f8c8d}.CodeMirror .CodeMirror-code .cm-url{color:#aab2b3}.CodeMirror .CodeMirror-code .cm-strikethrough{text-decoration:line-through}.CodeMirror .CodeMirror-placeholder{opacity:.5}.CodeMirror .cm-spell-error:not(.cm-url):not(.cm-comment):not(.cm-tag):not(.cm-word){background:rgba(255,0,0,.15)}"; });
define('app',['exports', 'services/services', './authorize-step'], function (exports, _services, _authorizeStep) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    App.inject = function inject() {
      return [_services.Auth, _services.Http];
    };

    function App(authService, httpService) {
      _classCallCheck(this, App);

      this.httpService = httpService;
      this.authService = authService;
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      config.title = 'UFPS Training Center';
      config.addPipelineStep('authorize', _authorizeStep.AuthorizeStep);
      config.options.pushState = true;
      config.options.root = '/';
      config.map([{
        route: '',
        redirect: 'problemas'
      }, {
        name: 'login',
        route: 'iniciar-sesion',
        moduleId: './modules/login/login',
        title: 'Iniciar Sesión',
        layoutView: './layouts/not-logged.html',
        settings: {
          roles: ['visitor']
        }
      }, {
        name: 'signin',
        route: 'registro',
        moduleId: './modules/signin/signin',
        title: 'Regístrate',
        layoutView: './layouts/not-logged.html',
        settings: {
          roles: ['visitor']
        }
      }, {
        name: 'recovery-password',
        route: 'recuperar-password',
        moduleId: './modules/recovery/recovery-password',
        title: 'Recuperar Contraseña',
        layoutView: './layouts/not-logged.html',
        settings: {
          roles: ['visitor']
        }
      }, {
        name: 'reset-password',
        route: 'cambiar-password/:token',
        moduleId: './modules/recovery/reset-password',
        title: 'Recuperar Contraseña',
        layoutView: './layouts/not-logged.html',
        settings: {
          roles: ['visitor']
        }
      }, {
        name: 'search',
        route: 'buscar/:query',
        moduleId: './modules/search/search',
        title: 'Búsqueda',
        layoutView: './layouts/logged.html',
        nav: true,
        href: '/buscar/+',
        settings: {
          roles: ['admin', 'coach', 'student']
        }
      }, {
        name: 'problems',
        route: 'problemas',
        moduleId: './modules/problems/problem',
        layoutView: './layouts/logged.html',
        nav: true,
        settings: {
          roles: ['admin', 'coach', 'student']
        }
      }, {
        name: 'ranking',
        route: 'ranking',
        moduleId: './modules/ranking/ranking',
        layoutView: './layouts/logged.html',
        title: 'Ranking',
        nav: true,
        settings: {
          roles: ['admin', 'coach', 'student']
        }
      }, {
        name: 'submissions',
        route: 'envios',
        moduleId: './modules/submissions/submissions',
        layoutView: './layouts/logged.html',
        title: 'Mis envios',
        nav: true,
        settings: {
          roles: ['coach', 'student']
        }
      }, {
        name: 'contest',
        route: 'maraton',
        moduleId: './modules/contest/contest',
        layoutView: './layouts/logged.html',
        nav: true,
        settings: {
          roles: ['admin', 'coach', 'student']
        }
      }, {
        name: 'classes',
        route: 'clases',
        moduleId: './modules/syllabus/syllabus',
        layoutView: './layouts/logged.html',
        nav: true,
        settings: {
          roles: ['coach', 'student']
        }
      }, {
        name: 'material',
        route: ['materials', 'materials/:id'],
        moduleId: './modules/material/material',
        layoutView: './layouts/logged.html',
        nav: true,
        settings: {
          roles: ['admin', 'coach', 'student', 'visitor']
        }
      }, {
        name: 'public-material',
        route: ['material-publico'],
        moduleId: './modules/material/public-material/public-material',
        layoutView: './layouts/logged.html',
        title: 'Material',
        nav: true,
        settings: {
          roles: ['visitor']
        }
      }, {
        route: '/material-publico/:id',
        name: 'specific-material',
        moduleId: 'modules/material/specific-public-material/specific-public-material',
        title: 'Material',
        settings: {
          roles: ['visitor']
        }
      }, {
        name: 'admin',
        route: ['administracion'],
        moduleId: './modules/admin/admin',
        layoutView: './layouts/logged.html',
        title: 'Administración',
        nav: true,
        settings: {
          roles: ['admin']
        }
      }, {
        name: 'about',
        route: ['acerca-de'],
        moduleId: './modules/about/about',
        layoutView: './layouts/logged.html',
        title: 'Acerca de',
        nav: true,
        settings: {
          roles: ['admin', 'coach', 'student']
        }
      }, {
        name: 'profile',
        route: ['perfil'],
        moduleId: './modules/profile/profile',
        layoutView: './layouts/logged.html',
        title: 'Perfil',
        nav: true,
        settings: {
          roles: ['admin', 'coach', 'student']
        }
      }]);

      var handleUnknownRoutes = function handleUnknownRoutes(instruction) {
        return {
          route: '404',
          moduleId: './modules/error-404/error-404',
          layoutView: './layouts/logged.html',
          title: 'Error 404',
          settings: {
            roles: ['admin', 'coach', 'student', 'visitor']
          }
        };
      };

      config.mapUnknownRoutes(handleUnknownRoutes);

      this.router = router;
    };

    return App;
  }();
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n    <require from=\"bootstrap/css/bootstrap.css\"></require>\n    <require from=\"./assets/css/styles.css\"></require>\n    <loading-indicator loading.bind=\"router.isNavigating || httpService.httpClient.isRequesting\"></loading-indicator>\n    <app-header if.bind=\"authService.authenticated\"></app-header>\n    <router-view></router-view>\n</template>\n"; });
//# sourceMappingURL=app-bundle.js.map
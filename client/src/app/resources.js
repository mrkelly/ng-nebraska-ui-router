angular.module('app.resources', [ ])
  .factory('$control', function ($q, $api) {
    var control = {

      page : function (resource, page, query) {
        var queryObject = {
          page: page
        };

        if (angular.isObject(query)) {
          queryObject = angular.extend(queryObject, query);
        }

        return $api[resource].page(queryObject).$promise;
      },

      list : function (resource, query) {
        var queryObject = {};

        if (angular.isObject(query)) {
          queryObject = angular.extend(queryObject, query);
        }

        return $api[resource].query(queryObject).$promise;
      },

      get : function (resource, params) {
        return $api[resource].get(params).$promise;
      },

      create : function(resource, model, params) {
        return new $api[resource](model).$save(params);
      },

      update : function (resource, model) {
        var updated = $api[resource].update(model);
        return updated.$promise || updated;
      },
      
      login : function (model, current) {
        if (current) {
          return $api.login.current().$promise;
        }
        return $api.login.login(model).$promise;
      },

      logout : function () {
        return $api.logout.logout().$promise;
      }
    };

    return control;
  })

  .factory('$api', function ($resource, apiUrl) {
    var extraMethods = {
      'page' : {
        method: 'GET',
        params: {
          verb: 'page',
          page: '@page',
          size: '10'
        }
      },
      'update' : {
        method: 'PUT'
      }
    };

    var idAndVerb = {
      id: '@id',
      verb: '@verb'
    };

    var api = {
      idAndVerb : idAndVerb,

      add : function (config) {
        var params, url;

        // If the url follows the expected pattern, we can set cool defaults
        if (!config.unnatural) {
          var orig = angular.copy(idAndVerb);
          params = angular.extend(orig, config.params);
          url = apiUrl + config.url + '/:id/:verb';

        // otherwise we have to declare the entire configuration. 
        } else {
          params = config.params;
          url = apiUrl + config.url;
        }
        
        // If we supply a method configuration, use that instead of the default extra. 
        var methods = config.methods || extraMethods;

        api[config.resource] = $resource(url, params, methods);
      }
    };
    
    return api;
  });
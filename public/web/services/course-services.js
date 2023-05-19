app.provider('course', [function() {

    var courseURL;
    return {

        config: function(config) {
            courseURL = config.course || config;
        },
        $get: ['$http', function($http) {

            return {
                getAllCourse: function(profile, course) {
                    return $http({
                        method: 'GET',
                        url: courseURL.getAllCourse,
                        params: {
                            profile: profile,
                            course: course
                        }
                    })
                },
                getCourseById: function(profile, course) {
                    return $http({
                        method: 'GET',
                        url: courseURL.getCourseById,
                        params: {
                            profile: profile,
                            course: course
                        }
                    })
                },
                createNewCourse: function(profile, course) {
                    return $http({
                        method: 'POST',
                        url: courseURL.createNewCourse,
                        params: {
                            profile: profile,
                            course: course
                        }
                    })
                },
                updateCourseById: function(profile, course) {
                    return $http({
                        method: 'PUT',
                        url: courseURL.updateCourseById,
                        params: {
                            profile: profile,
                            course: course
                        }
                    })
                },
                deleteCourseById: function(profile, course) {
                    return $http({
                        method: 'DELETE',
                        url: courseURL.deleteCourseById,
                        params: {
                            profile: profile,
                            course: course
                        }
                    })
                }
            }

        }]

    }
}])
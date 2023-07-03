export function getScenario(data, handler) {
    $.ajax({
        type: "GET",
        url: "/api/v1/scenario",
        data: data,
        success: function (result) {
            handler(result)
        }
    });
}

export function postScenario(data, handler) {
    $.ajax({
        type: "POST",
        url: "/api/v1/scenario",
        data: JSON.stringify(data),
        success: function (result) {
            handler(result)
        },
        dataType: "json",
        contentType: "application/json"
    });
}

export function postSurveyScenario(data, handler) {
    $.ajax({
        type: "POST",
        url: "/api/v1/survey_scenario",
        data: JSON.stringify(data),
        success: function (result) {
            handler(result)
        },
        dataType: "json",
        contentType: "application/json"
    });
}

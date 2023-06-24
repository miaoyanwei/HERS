
export function getResult(handler) {
    $.ajax({
        type: "GET",
        url: "/api/v1/result",
        success: function (result) {
            handler(result)
        },
        dataType: "json",
        contentType: "application/json"
    });
}

// Get current total cost
$.get("/app/myapp/flex", function(data){
    alert(data.total_cost)
    $("#totalcost-placeholder").replaceWith(data.total_cost);
});
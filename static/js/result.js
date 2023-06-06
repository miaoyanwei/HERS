$.get("/app/myapp/flex", function(data){

    // Get current total cost
    $("#totalcost-placeholder").replaceWith(data.total_cost);


    // Get check or uncheck icons

    if (data.pv) {
        $("#pv-true").css('display', 'block')
    } else {
        $("#pv-false").css('display', 'block')
    }

    if (data.battery) {
        $("#battery-true").css('display', 'block')
    } else {
        $("#battery-false").css('display', 'block')
    }

    if (data.sems) {
        $("#sems-true").css('display', 'block')
    } else {
        $("#sems-false").css('display', 'block')
    }

    if (data.heatsource) {
        $("#heatsource-true").css('display', 'block')
    } else {
        $("#heatsource-false").css('display', 'block')
    }

    if (data.hotwatertank) {
        $("#hotwatertank-true").css('display', 'block')
    } else {
        $("#hotwatertank-false").css('display', 'block')
    }

    if (data.spaceheatingtank) {
        $("#spaceheatingtank-true").css('display', 'block')
    } else {
        $("#spaceheatingtank-false").css('display', 'block')
    }

    if (data.ac) {
        $("#ac-true").css('display', 'block')
    } else {
        $("#ac-false").css('display', 'block')
    }

    if (data.renovation) {
        $("#renovation-true").css('display', 'block')
    } else {
        $("#renovation-false").css('display', 'block')
    }


    // Get recommendation list

    const rec_list = data.recommendationList;
    let reclisthtml = '';
    rec_list.forEach((item,index)=>{
        entry = '<div class="col-md-6">'
            + '<div class="improved">'
                + '<h2 class="bill">Save <span>&#8364;</span><span id="savedcost-placeholder"></span>'
                + item.recommendationBill.energy_bill_year
                + '<span style="font-size: 16px; font-weight: normal;"> / year</span></h2>'
                + '<p>If the following configurations are applied, the annual energy bill is estimated to be <span>&#8364;</span><span id="totalcost-placeholder"></span>'
                + item.recommendationBill.energy_bill_saved_year
                + '</p>'
                + '<button type="button" class="btn btn-outline-dark" onclick="window.location.href=\'simulation.html\';">More details '
                    + '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-short" viewBox="0 0 16 16">'
                    + '<path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>'
                    + '</svg>'
                + '</button>'
                
                // Get configurations

                let confightml = '';
                item.configurationList.forEach((technology,index)=>{
                    config = '<div class="config">'
                        + technology
                        + '<br>'
                        + '</div>'
                    confightml += config
                });
                + confightml
                + '<hr>'
                + '<p>Investment costs from<span>&#8364;'
                + item.investmentCost
                + '</p>'
            + '</div>'
        + '</div>'

        reclisthtml += entry
    });

    $("#recommandation-list").html(reclisthtml)
    
});
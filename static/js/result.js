function handle_result(data) {

    var current = data.current

    // Get current total cost
    $("#totalcost-placeholder").replaceWith(current.energy_data.energy_bill_year);
    // Get person number
    $("#personNumber-placeholder").replaceWith(data.profile.person);
    // Get location
    $("#location-placeholder").replaceWith(data.profile.location);

    // Get check or uncheck icons
    improvement = new Map()
    improvement.set('pv_size', 'Upgrade the PV system')
    improvement.set('battery_capacity', 'Upgrade the battery system')
    improvement.set('sems', 'Add a SEMS system')
    improvement.set('heating_system_type', 'Change to a heat pump system')
    improvement.set('building_renovation', 'Renovate the building')

    if (current.config.pv_size) {
        $("#pv-true").css('display', 'inline')
    } else {
        $("#pv-false").css('display', 'inline')
    }

    if (current.config.battery_capacity) {
        $("#battery-true").css('display', 'inline')
    } else {
        $("#battery-false").css('display', 'inline')
    }

    if (current.config.sems) {
        $("#sems-true").css('display', 'inline')
    } else {
        $("#sems-false").css('display', 'inline')
    }

    if (current.config.heating_system_type) {
        $("#heatsource-true").css('display', 'inline')
    } else {
        $("#heatsource-false").css('display', 'inline')
    }

    if (current.config.building_renovation) {
        $("#renovation-true").css('display', 'inline')
    } else {
        $("#renovation-false").css('display', 'inline')
    }


    // Get recommendation list

    const rec_list = data.recommendation;

    if (rec_list.length != 0) {

        // Show withRec text

        $("#withRec").show()
        $("#withoutRec").hide()

        // Get recommendation

        let reclisthtml = '';
        rec_list.forEach((item, index) => {
            entry = '<div class="col-md-6">'
                + '<div class="card h-100 improved">'
                + '<h2 class="bill">Save <span>&#8364;</span><span id="savedcost-placeholder"></span>'
                + (current.energy_data.energy_bill_year - item.energy_data.energy_bill_year)
                + '<span style="font-size: 16px; font-weight: normal;"> / year</span></h2>'
                + '<p>If the following configurations are applied, the annual energy bill is estimated to be <span>&#8364;</span><span id="totalcost-placeholder"></span>'
                + item.energy_data.energy_bill_year
                + '</p>'
                + '<button class="btn btn-outline-dark" onclick="window.location.href=\'simulation.html\';">More details '
                + '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-short" viewBox="0 0 16 16">'
                + '<path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>'
                + '</svg>'
                + '</button>'

            // Get configurations

            let confightml = '';
            for (var key in item.config) {
                var value = item.config[key]
                if (current.config[key] !== value) {
                    config = '<div class="config">'
                            + improvement.get(key)
                            + '<br>'
                            + '</div>'
                    confightml += config
                }
            }
            //item.configurationList.forEach((technology, index) => {
            //    config = '<div class="config">'
            //        + technology
            //        + '<br>'
            //        + '</div>'
            //    confightml += config
            //});
            confightml += ('<small class="card-footer" style="color:#345A46; background-color:#fff; line-height:1;"><em>The annualised investment cost is approx. <span>&#8364;'
            + item.investment_cost
            + '</em></small>'
            + '</div>'
            + '</div>')
            entry += confightml

            reclisthtml += entry
        });

        $("#recommandation-list").html(reclisthtml)

    } else {

        // Hide withRec text

        $("#withRec").hide()
        $("#withoutRec").show()
    }

}

$.ajax({
    type: "GET",
    url: "/api/v1/result",
    success: function (result) {
        handle_result(result)
    },
    dataType: "json",
    contentType: "application/json"
});

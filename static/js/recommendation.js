

export function handleResult(energy_cost, recommendation, scenario) {

    // Get current total cost
    $("#totalcost-placeholder").replaceWith(energy_cost.yearly_bill);
    // Get person number
    $("#personNumber-placeholder").replaceWith(scenario.building.person_num);
    // Get location
    $("#location-placeholder").replaceWith(scenario.region.code);


    // Recommendation content

    let improvement = new Map()

    if (scenario.pv.size === 0) {
        improvement.set('pv', '<i class="bi bi-plus"></i>Add a PV system')
    } else {
        improvement.set('pv', '<i class="bi bi-arrow-up-short"></i>Upgrade the PV system')
    }
    if (scenario.battery.capacity === 0) {
        improvement.set('battery', '<i class="bi bi-plus"></i>Add a battery system')
    } else {
        improvement.set('battery', '<i class="bi bi-arrow-up-short"></i>Upgrade the battery system')
    }
    improvement.set('sems', '<i class="bi bi-plus"></i>Add a SEMS system')
    improvement.set('boiler', '<i class="bi bi-arrow-up-short"></i>Change to a heat pump system')
    improvement.set('building', '<i class="bi bi-arrow-up-short"></i>Renovate the building')


    // Get check or uncheck icons

    if (scenario.pv.size) {
        $("#pv-true").css('display', 'inline')
        // Get current PV size
        $("#currentPVSize").replaceWith(getImprovementInfo('pv', scenario.pv));
    } else {
        $("#pv-false").css('display', 'inline')
    }

    if (scenario.battery.capacity) {
        $("#battery-true").css('display', 'inline')
        // Get current Battery capacity
        $("#currentBatteryCapacity").replaceWith(getImprovementInfo('battery', scenario.battery));
    } else {
        $("#battery-false").css('display', 'inline')
    }

    if (scenario.sems === true) {
        $("#sems-true").css('display', 'inline')
    } else {
        $("#sems-false").css('display', 'inline')
    }

    if (scenario.boiler.type) {
        $("#heatsource-true").css('display', 'inline')
    } else {
        $("#heatsource-false").css('display', 'inline')
    }

    if (scenario.building.renovated) {
        $("#renovation-true").css('display', 'inline')
    } else {
        $("#renovation-false").css('display', 'inline')
    }


    // Get recommendation list
    let rec_list = recommendation.list
    if (rec_list.length != 0) {

        // Show withRec text

        $("#withRec").show()
        $("#withoutRec").hide()

        // Get recommendation

        let reclisthtml = '';
        rec_list.forEach((item, index) => {
            var entry = '<div class="col-md-6">'
                + '<div class="card h-100 improved">'
                + '<em id="recTag">'
                + item.type
                + '</em>'
                + '<div class="card-body">'
                + '<h2 id="recSave">Save <span>&#8364;</span><span id="savedcost-placeholder"></span>'
                + (energy_cost.yearly_bill - item.yearly_bill)
                + '<span style="font-size: 16px; font-weight: normal;"> / year</span></h2>'
                + '<small>If the following configurations are applied, the annual energy bill is estimated to be <span>&#8364;</span><span id="totalcost-placeholder"></span>'
                + item.yearly_bill
                + '<br></small>'
                + '<button class="btn btn-outline-dark" id="btn-detail-'
                + index
                + '">More details '
                + '<i class="bi bi-arrow-right"></i>'
                + '</button>'

            // Get configurations

            let confightml = '';
            for (let key in item.config) {
                if (key === 'region')
                    continue
                let value = item.config[key]
                if (JSON.stringify(scenario[key]) !== JSON.stringify(value)) {
                    let config = '<div class="card-content config">'
                        + improvement.get(key)
                        + getImprovementInfo(key, value)
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
            confightml += ('</div>'
                + '<small class="card-footer" style="background-color:#fff;">The annualised investment cost is approx. <span>&#8364;'
                + item.investment_cost
                + '</small>'
                + '</div>'
                + '</div>')
            entry += confightml

            reclisthtml += entry

        });

        $("#recommandation-list").html(reclisthtml)
        rec_list.forEach((item, index) => {
            document.querySelector('#btn-detail-' + index).addEventListener('click',
                function () {
                    document.cookie = "selected_id=" + JSON.stringify(item.id);
                    document.cookie = "selected_sems=" + JSON.stringify(item.config.sems);
                    document.cookie = "selected_investment_cost=" + JSON.stringify(item.investment_cost);
                    window.location.href = '/html/simulation.html';
                });
        });
        
    } else {


        // Hide withRec text
        $("#withRec").hide()
        $("#withoutRec").show()

    }
}


// Add configuration detail of PV and Battery
function getImprovementInfo(key, value) {
    if (key == 'pv') {
        return ' (' + value.size + 'kWp)'
    }
    else if (key == 'battery') {
        return ' (' + value.capacity + 'kWh)'
    }
    else {
        return ''
    }
}

export function getRecommendation() {
    // get cookie my_scenario=id
    let my_scenario = document.cookie.split('; ').find(row => row.startsWith('my_scenario')).split('=')[1]
    let my_sems = document.cookie.split('; ').find(row => row.startsWith('my_sems')).split('=')[1]

    $.when($.ajax({
        type: "GET",
        url: "/api/v1/energy_cost",
        data: {
            'id': my_scenario,
            'sems': my_sems
        }
    }),
        $.ajax({
            type: "GET",
            url: "/api/v1/recommendation",
            data: {
                'id': my_scenario,
                'sems': my_sems
            }
        }),
        $.ajax({
            type: "GET",
            url: "/api/v1/scenario",
            data: {
                'id': my_scenario,
            }
        })).done(function (a, b, c) {
            let scenario = JSON.parse(c[0]);
            scenario.sems = my_sems;
            handleResult(JSON.parse(a[0]), JSON.parse(b[0]), scenario)
        })
}

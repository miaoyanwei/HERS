

export function handleResult(data) {

    let current = data.current

    // Get current total cost
    $("#totalcost-placeholder").replaceWith(current.energy_data.energy_bill_year);
    // Get person number
    $("#personNumber-placeholder").replaceWith(data.profile.person);
    // Get location
    $("#location-placeholder").replaceWith(data.profile.location);


    // Recommendation content

    let improvement = new Map()

    if (current.config.pv_size === 0) {
        improvement.set('pv_size', '<i class="bi bi-plus"></i>Add a PV system')
    } else {
        improvement.set('pv_size', '<i class="bi bi-arrow-up-short"></i>Upgrade the PV system')
    }
    if (current.config.battery_capacity === 0) {
        improvement.set('battery_capacity', '<i class="bi bi-plus"></i>Add a battery system')
    } else {
        improvement.set('battery_capacity', '<i class="bi bi-arrow-up-short"></i>Upgrade the battery system')
    }
    improvement.set('sems', '<i class="bi bi-plus"></i>Add a SEMS system')
    improvement.set('heating_system_type', '<i class="bi bi-arrow-up-short"></i>Change to a heat pump system')
    improvement.set('building_renovation', '<i class="bi bi-arrow-up-short"></i>Renovate the building')


    // Get check or uncheck icons

    if (current.config.pv_size) {
        $("#pv-true").css('display', 'inline')
        // Get current PV size
        $("#currentPVSize").replaceWith(getImprovementInfo('pv_size', current.config.pv_size));
    } else {
        $("#pv-false").css('display', 'inline')
    }

    if (current.config.battery_capacity) {
        $("#battery-true").css('display', 'inline')
        // Get current Battery capacity
        $("#currentBatteryCapacity").replaceWith(getImprovementInfo('battery_capacity', current.config.battery_capacity));
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
            var entry = '<div class="col-md-6">'
                + '<div class="card h-100 improved">'
                + '<div class="card-body">'
                + '<h2 class="bill">Save <span>&#8364;</span><span id="savedcost-placeholder"></span>'
                + (current.energy_data.energy_bill_year - item.energy_data.energy_bill_year)
                + '<span style="font-size: 16px; font-weight: normal;"> / year</span></h2>'
                + '<p>If the following configurations are applied, the annual energy bill is estimated to be <span>&#8364;</span><span id="totalcost-placeholder"></span>'
                + item.energy_data.energy_bill_year
                + '</p>'
                + '<button class="btn btn-outline-dark" id="btn-detail-'
                + index
                + '">More details '
                + '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-short" viewBox="0 0 16 16">'
                + '<path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>'
                + '</svg>'
                + '</button>'

            // Get configurations

            let confightml = '';
            for (let key in item.config) {
                let value = item.config[key]
                if (current.config[key] !== value) {
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
                + '<small class="card-footer" style="color:#345A46; background-color:#fff; line-height:1;"><em>The annualised investment cost is approx. <span>&#8364;'
                + item.investment_cost
                + '</em></small>'
                + '</div>'
                + '</div>')
            entry += confightml

            reclisthtml += entry
        });
        $("#recommandation-list").html(reclisthtml)
        rec_list.forEach((item, index) => {
            document.querySelector('#btn-detail-' + index).addEventListener('click',
                function () {
                    document.cookie = "selection=" + JSON.stringify(index);
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
function getImprovementInfo(key, value)
{
    if (key == 'pv_size') 
    {
        return ' (' + value + 'kWp)'
    }
    else if (key == 'battery_capacity')
    {
        return ' (' + value + 'kWh)'
    }
    else
    {
        return ''
    }
}

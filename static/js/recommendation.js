
let gEnergyResultYear = {};
let gRecommendations = {};
let gRecommendationConfigs = [];

class Scenario {
    constructor(components, definition) {
        this.components = components;
        this.definition = definition;
    }
    
    getByName(componentName) {
        let id = parseInt(this.components["ID_" + componentName]);
        let configurations = this.definition[componentName];
        for (let config of configurations) {
            if (config["ID_" + componentName] === id) {
                return config;
            }
        }
        return null;
    }

    get Building() {
        return this.getByName("Building");
    }

    get Boiler() {
        return this.getByName("Boiler");
    }

    get Battery() {
        return this.getByName("Battery");
    }

    get PV() {
        return this.getByName("PV");
    }

    get HotWaterTank() {
        return this.getByName("HotWaterTank");
    }
}

function handleResult() {
    let surveyResult = JSON.parse(localStorage.getItem('surveyResult'));
    let myScenario = new Scenario(surveyResult.myComponents, surveyResult.availableComponents);
    // Get current total cost
    $("#totalcost-placeholder").replaceWith(gEnergyResultYear.TotalCost);
    // Get person number
    $("#personNumber-placeholder").replaceWith(myScenario.Building.person_num);
    // Get location
    $("#location-placeholder").replaceWith(surveyResult.myCountryCode);


    // Recommendation content

    let improvement = new Map()

    if (myScenario.PV.size === 0) {
        improvement.set('PV', '<i class="bi bi-plus"></i>Add a PV system')
    } else {
        improvement.set('PV', '<i class="bi bi-arrow-up-short"></i>Upgrade the PV system')
    }
    if (myScenario.Battery.capacity === 0) {
        improvement.set('Battery', '<i class="bi bi-plus"></i>Add a battery system')
    } else {
        improvement.set('Battery', '<i class="bi bi-arrow-up-short"></i>Upgrade the battery system')
    }
    improvement.set('SEMS', '<i class="bi bi-plus"></i>Add a SEMS system')
    improvement.set('Boiler', '<i class="bi bi-arrow-up-short"></i>Change to a heat pump system')
    improvement.set('Building', '<i class="bi bi-arrow-up-short"></i>Renovate the building')

    // Get check or uncheck icons

    if (myScenario.PV.size !== 0) {
        $("#pv-true").css('display', 'inline')
        // Get current PV size
        $("#currentPVSize").replaceWith(getImprovementInfo('PV', myScenario.PV));
    } else {
        $("#pv-false").css('display', 'inline')
    }

    if (myScenario.Battery.capacity !== 0) {
        $("#battery-true").css('display', 'inline')
        // Get current Battery capacity
        $("#currentBatteryCapacity").replaceWith(getImprovementInfo('Battery', myScenario.Battery));
    } else {
        $("#battery-false").css('display', 'inline')
    }

    if (surveyResult.mySems) {
        $("#sems-true").css('display', 'inline')
    } else {
        $("#sems-false").css('display', 'inline')
    }

    if (myScenario.Boiler.type === 0) {
        $("#heatsource-true").css('display', 'inline')
    } else {
        $("#heatsource-false").css('display', 'inline')
    }

    if (myScenario.Building.ID_Building % 2 !== 0) {
        $("#renovation-true").css('display', 'inline')
    } else {
        $("#renovation-false").css('display', 'inline')
    }


    // Get recommendation list
    if (gRecommendations.length != 0) {

        // Show withRec text

        $("#withRec").show()
        $("#withoutRec").hide()

        // Get recommendation

        let reclisthtml = '';
        let index = 0;
       for (let key in gRecommendations) {
            let item = gRecommendations[key];
            var entry = '<div class="col-md-6">'
                + '<div class="card h-100 improved">'
                + '<em id="recTag">'
                + key
                + '</em>'
                + '<div class="card-body">'
                + '<h2 id="recSave">Save <span>&#8364;</span><span id="savedcost-placeholder"></span>'
                + item.Savings
                + '<span style="font-size: 16px; font-weight: normal;"> / year</span></h2>'
                + '<small>If the following configurations are applied, the annual energy bill is estimated to be <span>&#8364;</span><span id="totalcost-placeholder"></span>'
                + item.TotalCost
                + '<br></small>'
                + '<button class="btn btn-outline-dark" id="btn-detail-'
                + index++
                + '">More details '
                + '<i class="bi bi-arrow-right"></i>'
                + '</button>'

            // Get configurations

            let confightml = '';
            for (let config of gRecommendationConfigs) {
                if (config.ID_Scenario !== item.ID_Scenario)
                    continue
                let scenario = new Scenario(config, surveyResult.availableComponents)
                for (let key in config) {
                    if (key === 'ID_Scenario' || key === 'ID_Region' || key === 'ID_SpaceHeatingTank')
                        continue
                    let value = config[key]
                    // Add info for each improvement
                    if (surveyResult.myComponents[key] !== value) {
                        let name = key.replace('ID_', '')
                        let config = '<div class="card-content config">'
                            + improvement.get(name)
                            + getImprovementInfo(name, scenario.getByName(name))
                            + '<br>'
                            + '</div>'
                        confightml += config
                    }
                }
                if (config.SEMS !== surveyResult.mySems) {
                    let config = '<div class="card-content config">'
                        + improvement.get('SEMS')
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
                + item.TotalCost
                + '</small>'
                + '</div>'
                + '</div>')
            entry += confightml
            reclisthtml += entry

        };
        $("#recommandation-list").html(reclisthtml)
        
        index = 0;
        for (let key in gRecommendations) {
            let item = gRecommendations[key];
            document.querySelector('#btn-detail-' + index++).addEventListener('click',
                function () {
                    localStorage.setItem('selectedRecommendation', JSON.stringify(item));
                    window.location.href = '/html/simulation.html';
                });
        }
        
    } else {


        // Hide withRec text
        $("#withRec").hide()
        $("#withoutRec").show()

    }
}


// Add configuration detail of PV and Battery
function getImprovementInfo(key, value) {
    if (key == 'PV') {
        return ' (' + value.size + 'kWp)'
    }
    else if (key == 'Battery') {
        return ' (' + value.capacity + 'kWh)'
    }
    else {
        return ''
    }
}

function getRecommendationConfigs() {
    let surveyResult = JSON.parse(localStorage.getItem('surveyResult'));
    let myCountryCode = surveyResult.myCountryCode;
    let requests = [];
    for (let type in gRecommendations) {
        requests.push(
            $.ajax({
                type: "GET",
                url: "/api/v1/" + myCountryCode + "/scenario",
                data: {
                    'ID_Scenario': gRecommendations[type].ID_Scenario,
                },
                dataType: "json",
                contentType: "application/json"
            })
        )
    }
    $.when.apply(null, requests).done(function () {
        $.each(arguments, function (_, data) {
            gRecommendationConfigs.push(data[0][0]);
        });
        handleResult();
    });
}



export function startRecommendation() {
    let surveyResult = JSON.parse(localStorage.getItem('surveyResult'));
    let myScenario = surveyResult.myScenario;
    let mySems = surveyResult.mySems;
    let myCountryCode = surveyResult.myCountryCode;
    let energyResultYearUrl = '';

    if (mySems) {
        energyResultYearUrl = '/api/v1/' + myCountryCode + '/result/optimization_year';
    } else {
        energyResultYearUrl = '/api/v1/' + myCountryCode + '/result/reference_year';
    }

    $.when(
        $.ajax({
            type: "GET",
            url: energyResultYearUrl,
            data: {
                'ID_Scenario': myScenario,
            },
            dataType: "json",
            contentType: "application/json"
        }),
        $.ajax({
            type: "GET",
            url: "/api/v1/" + myCountryCode + "/recommendation",
            data: {
                'ID_Scenario': myScenario,
                'SEMS': mySems
            },
            dataType: "json",
            contentType: "application/json"
        })
    ).done(function (a, b) {
        gEnergyResultYear = a[0][0];
        gRecommendations = b[0];
        getRecommendationConfigs();
    })
}

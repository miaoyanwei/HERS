
import * as scenario from './scenario.js';
import * as country from './country.js';

// Country Survey

var buildingDataCache;
var countryCode;

function handleBuildingData(getBuildingResult, getPvResult, getBatteryResult, getBoilerResult) {
  var buildingTime = []
  var peopleNumber = []
  var pvSize = []
  var batterySize = []
  var boilerType = []

  buildingDataCache = getBuildingResult;

  // Building related
  for (const e of getBuildingResult) {
    var range = e.construction_period_start + "-" + e.construction_period_end;
    if (!buildingTime.includes(range)) {
      buildingTime.push(range);
    }
    
    // People number
    if (!peopleNumber.includes(e.person_num)) {
      peopleNumber.push(e.person_num);
    }
  }

  // PV size
  for (const pv of getPvResult) {
    if (pv.size !== 0) {
      pvSize.push({"value" : pv.ID_PV, "text" : pv.size + " kilowatt-peak"});
    }
  }

  // Battery size
  for (const b of getBatteryResult) {
    if (b.capacity !== 0) {
      batterySize.push({"value" : b.ID_Battery, "text" : b.capacity/1000 + " kilowatt-hours"});
    }
  }

  // Heating type
  for (const boiler of getBoilerResult) {
    if (boiler.type === "Air_HP") {
      boilerType.push({"value" : boiler.ID_Boiler, "text" : "Heat pump"});
    }
    if (boiler.type === "gases") {
      boilerType.push({"value" : boiler.ID_Boiler, "text" : "Natural gas boiler"});
    }
    if (boiler.type === "solids") {
      boilerType.push({"value" : boiler.ID_Boiler, "text" : "Biomass boiler"});
    }
    if (boiler.type === "district_heating") {
      boilerType.push({"value" : boiler.ID_Boiler, "text" : "District heating"});
    }
    if (boiler.type === "liquids") {
      boilerType.push({"value" : boiler.ID_Boiler, "text" : "Heating oil boiler"});
    }
  }

  setupHouseholdSurvey(buildingTime, peopleNumber, pvSize, batterySize, boilerType);
}

function handleCountryData(survey) {
  var country = survey.data.region_code;
  document.cookie = "country=" + survey.data.region_code;

  countryCode = survey.data.region_code;

  // Get all building data
  $.when(
    $.ajax({
      type: "GET",
      url: "/api/v1/" + country + "/component/building",
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "GET",
      url: "/api/v1/" + country + "/component/pv",
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "GET",
      url: "/api/v1/" + country + "/component/battery",
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "GET",
      url: "/api/v1/" + country + "/component/boiler",
      dataType: "json",
      contentType: "application/json"
    })
    ).done(function(buildingResult, pvResult,batterySize, boilerType) {
      handleBuildingData(buildingResult[0], pvResult[0], batterySize[0], boilerType[0]);
    })
}

function handleCountryName(getCountryCode) {
  var countryCode = []
  for (const code of getCountryCode) {
    let name = country.countryEnglish[code];
    if (typeof name === "undefined") {
      name = code;
    }
    countryCode.push({"value" : code, "text" : name});
  }

  setupCountrySurvey(countryCode);
}

export function startSurvey() {
  $.ajax({
    type: "GET",
    url: "/api/v1/db",
    dataType: "json",
    contentType: "application/json"
  }).done (function(countryCode) {
    handleCountryName(countryCode);
  });
}

function setupCountrySurvey(countryCode) {
  var surveyJSON = {
    "title": {
      "default": "q_en",
      "de": "q_de"
    },
    "description": " ",
    "logoWidth": "0px",
    "logoHeight": "0px",
    "logoFit": "none",
    "logoPosition": "right",
    "pages": [

      {
        "name": "region",
        "elements": [
          {
            "type": "dropdown",
            "name": "region_code",
            "title": {
              "default": "Country",
              "de": "Land"
            },
            "isRequired": true,
            "choices": countryCode,
            "placeholder": {
              "default": "Select country",
              "de": "Land wählen"
            },
            "autocomplete": "country"
          }
        ],
        "title": {
          "default": "Where is the house located?",
          "de": "Wo befindet sich das Haus?"
        },
        "description": {
          "default": "Understanding the location of the house can provide valuable insight into its environmental factors, such as the amount of sunlight it receives.",
          "de": "Wenn man den Standort des Hauses kennt, erhält man wertvolle Informationen über die Umweltfaktoren, wie z. B. die Menge an Sonnenlicht, die das Haus erhält."
        }
      },

    ],
    "showTitle": false,
    "showCompletedPage": false
  }

  Survey.StylesManager.applyTheme("defaultV2");
  var survey = new Survey.Model(surveyJSON);
  $("#surveyContainer").Survey({
    model: survey,
    onComplete: handleCountryData
  });
}


// Household Config Survey

function handleResult(result) {
  console.log(result);
  document.cookie = "my_scenario=" + result.id;
  window.location.href = '/html/recommendation.html';
}

// Miao: Send data to server
function sendDataToServer(survey) {
  document.cookie = "my_sems=" + survey.data.sems_exist;
  scenario.postSurveyScenario(survey.data, handleResult);
}

function findBuildingID(person_num, construction, renovated) {
  for (var building of buildingDataCache) {
    if (building.person_num === person_num && 
      building.construction_period_start === parseInt(construction.split('-')[0], 10) &&
      building.construction_period_end === parseInt(construction.split('-')[1], 10) &&
      (Boolean)(building.ID_Building % 2) === renovated)
    {
      return building.ID_Building;
    }
  }
}

function handleHousehold(surveyResult) {
  
  var pvId = 3;
  if (surveyResult.data.pv_exist) {
    pvId = surveyResult.data.pv_size;
  }

  var batteryId = 3;
  if (surveyResult.data.battery_exist) {
    batteryId = surveyResult.data.battery_capacity;
  }

  var boilerId = surveyResult.data.boiler_type;

  var waterTankId = 2;
  var spaceTankId = 2;
  if (surveyResult.data.tank_exist) {
    waterTankId = 1;
    spaceTankId = 1;
  }

  var buildingId = findBuildingID (surveyResult.data.building_person_num, 
    surveyResult.data.building_construction, 
    surveyResult.data.building_renovated, 
  );

  var componentIds = {
    "ID_PV" : pvId,
    "ID_Battery" : batteryId,
    "ID_Boiler" : boilerId,
    "ID_Building" : buildingId,
    "ID_HotWaterTank" : waterTankId,
    "ID_SpaceHeatingTank" : spaceTankId
  }

  getScenarioId(componentIds);
}

export function getScenarioId(componentIds) {
  $.ajax({
      type: "GET",
      url: "/api/v1/" + countryCode + "/scenario" ,
      data: componentIds,
      success: function (result) {
          print (result)
      }
  });
}

export function setupHouseholdSurvey(buildingTime, peopleNumber, pvSize, batterySize, boilerType) {
  var surveyJSON = {
    "title": {
      "default": "q_en",
      "de": "q_de"
    },
    "description": " ",
    "logoWidth": "0px",
    "logoHeight": "0px",
    "logoFit": "none",
    "logoPosition": "right",
    "pages": [

      {
        "name": "building_1",
        "elements": [
          {
            "type": "dropdown",
            "name": "building_construction",
            "title": {
              "default": "When was the house built?",
              "de": "Wann wurde das Haus gebaut?"
            },
            "description": {
              "default": "Knowing the year a house was built can provide insight into its construction materials, such as the composition of the walls.",
              "de": "Die Kenntnis des Baujahrs eines Hauses kann Aufschluss über die Baumaterialien geben, z. B. über die Zusammensetzung der Wände."
            },
            "isRequired": true,
            "choices": buildingTime
          }
        ],
        "title": {
          "default": "House condition",
          "de": "Zustand des Hauses"
        },
        "description": {
          "default": "Knowing the condition of a house can assist in understanding its energy consumption by calculating factors such as insulation efficiency.",
          "de": "Die Kenntnis des Zustands eines Hauses kann helfen, den Energieverbrauch zu verstehen, indem Faktoren wie die Isolierungseffizienz berechnet werden."
        }
      },
      {
        "name": "building_2",
        "elements": [
          {
            "type": "boolean",
            "name": "building_renovated",
            "visibleIf": "{building_construction} notempty",
            "title": {
              "default": "Has the house ever been renovated before?",
              "de": "Ist das Haus schon einmal renoviert worden?"
            },
            "description": {
              "default": "Renovations can include upgrading insulation, replacing windows with energy-efficient ones, installing high-efficiency HVAC systems, sealing air leaks, etc. ",
              "de": "Zu den Renovierungsarbeiten gehören die Verbesserung der Isolierung, der Austausch von Fenstern durch energieeffiziente, der Einbau hocheffizienter HLK-Systeme, das Abdichten von Luftlecks usw. "
            },
            "isRequired": true
          }
        ],
        "title": {
          "default": "House condition",
          "de": "Zustand des Hauses"
        },
        "description": {
          "default": "Knowing the condition of a house can assist in understanding its energy consumption by calculating factors such as insulation efficiency.",
          "de": "Die Kenntnis des Zustands eines Hauses kann helfen, den Energieverbrauch zu verstehen, indem Faktoren wie die Isolierungseffizienz berechnet werden."
        }
      },
      {
        "name": "behaviour_1",
        "elements": [
          {
            "type": "dropdown",
            "name": "building_person_num",
            "title": {
              "default": "People",
              "de": "Menschen"
            },
            "isRequired": true,
            "choices": peopleNumber
          }
        ],
        "title": {
          "default": "How many people are living in the house?",
          "de": "Wie viele Personen wohnen in dem Haus?"
        }
      },

      {
        "name": "spacecooling",
        "elements": [
          {
            "type": "boolean",
            "name": "cooling_exist",
            "title": {
              "default": "Is there any air conditioner in the house?",
              "de": "Gibt es eine Klimaanlage im Haus?"
            },
            "isRequired": true
          }
        ],
        "title": {
          "default": "Energy system",
          "de": "Energie System"
        }
      },
      {
        "name": "boiler",
        "elements": [
          {
            "type": "dropdown",
            "name": "boiler_type",
            "title": {
              "default": "What type of heating system is used in the house?",
              "de": "Welche Art von Heizanlage wird im Haus verwendet?"
            },
            "isRequired": true,
            "choices": boilerType
          }
        ],
        "title": {
          "default": "Energy system",
          "de": "Energie System"
        }
      },
      {
        "name": "tank",
        "elements": [
          {
            "type": "boolean",
            "name": "tank_exist",
            "title": {
              "default": "Is there a hot water tank in the house?",
              "de": "Gibt es einen Warmwasserspeicher im Haus?"
            },
            "description": {
              "default": "A hot water tank or a space heating tank is a device used to store hot water for domestic use or to provide heat in homes.",
              "de": "Ein Warmwasserspeicher ist ein Gerät, das zur Speicherung von Warmwasser für den Gebrauch in Haushalten verwendet wird. "
            },
            "isRequired": true
          }
        ],
        "title": {
          "default": "Energy system",
          "de": "Energie System"
        }
      },

      {
        "name": "hes_pv",
        "elements": [
          {
            "type": "boolean",
            "name": "pv_exist",
            "title": {
              "default": "Is there a photovoltaic (PV) system in the House?",
              "de": "Gibt es eine Photovoltaikanlage (PV) im Haus?"
            },
            "description": {
              "default": "A PV system is a system that uses solar panels to convert sunlight into electricity for use in a building.",
              "de": "Eine PV-Anlage ist ein System, das Sonnenlicht mit Hilfe von Solarmodulen in Strom für die Nutzung in einem Gebäude umwandelt."
            },
            "isRequired": true
          },
          {
            "type": "dropdown",
            "name": "pv_size",
            "visible": false,
            "visibleIf": "{pv_exist} = true",
            "title": {
              "default": "What is the size of the PV system? ",
              "de": "Wie groß ist die PV-Anlage? (Kilowatts-peak)"
            },
            "description": {
              "de": "Die durchschnittliche Größe einer PV-Anlage beträgt 5 kW_peak",
              "default": "The average size of a PV system is 5 kilowatt-peak"
            },
            "choices": pvSize
          }
        ],
        "title": {
          "default": "Energy system",
          "de": "Energie System"
        }
      },
      {
        "name": "hes_battery",
        "elements": [
          {
            "type": "boolean",
            "name": "battery_exist",
            "title": {
              "default": "Is there a battery system in the house?",
              "de": "Gibt es ein Batteriesystem im Haus?"
            },
            "description": {
              "default": "A home battery system is a device that stores energy produced by solar panels or other sources to be used later when needed.",
              "de": "Ein Hausbatteriesystem ist ein Gerät, das die von Sonnenkollektoren oder anderen Quellen erzeugte Energie speichert, um sie später bei Bedarf zu nutzen."
            },
            "isRequired": true
          },
          {
            "type": "dropdown",
            "name": "battery_capacity",
            "visible": false,
            "visibleIf": "{battery_exist} = true",
            "title": {
              "default": "What is the capacity of the battery? ",
              "de": "Wie hoch ist die Kapazität der Batterie? (Kilowattstunden)"
            },
            "description": {
              "default": "The average capacity of a home battery system is around 10 kilowatt-hours",
              "de": "Die durchschnittliche Kapazität eines Batteriesystems beträgt etwa 10 Kilowattstunden"
            },
            "choices": batterySize
          }
        ],
        "title": {
          "default": "Energy system",
          "de": "Energie System"
        }
      },
      {
        "name": "hes_sems",
        "elements": [
          {
            "type": "boolean",
            "name": "sems_exist",
            "title": {
              "default": "Is there a smart energy management system (SEMS) in the house?",
              "de": "Gibt es ein intelligentes Energiemanagementsystem im Haus?"
            },
            "description": {
              "default": "A SEMS is a technology to optimise energy usage, monitor consumption, and enhance energy efficiency.",
              "de": "Ein SEMS ist eine Technologie zur Optimierung der Energienutzung, zur Überwachung des Verbrauchs und zur Verbesserung der Energieeffizienz."
            },
            "isRequired": true
          }
        ],
        "title": {
          "default": "Energy system",
          "de": "Energie System"
        }
      }
    ],
    "showTitle": false,
    "showCompletedPage": false
  }

  Survey.StylesManager.applyTheme("defaultV2");
  var survey = new Survey.Model(surveyJSON);
  $("#surveyContainer").Survey({
    model: survey,
    onComplete: handleHousehold
  });
}


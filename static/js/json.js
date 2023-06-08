Survey.StylesManager.applyTheme("defaultV2");

var surveyJSON =  {
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
      "name": "region_country",
      "title": {
       "default": "Country",
       "de": "Land"
      },
      "isRequired": true,
      "choices": [
       "Deutschland"
      ],
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
      "choices": [
       {
        "value": "1880-1918",
        "text": "before 1919"
       },
       "1919-1948",
       "1949-1957",
       "1958-1968",
       "1969-1978",
       "1979-1983",
       "1984-1994",
       "1995-2011",
       {
        "value": "2012-2022",
        "text": "after 2011"
       }
      ]
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
      "name": "building_renovate",
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
      "name": "person_no",
      "title": {
       "default": "People",
       "de": "Menschen"
      },
      "isRequired": true,
      "choices": [
      {
        "value": "2",
        "text": "less than 3"
      },
      "3",
      "4",
      "5",
      {
        "value": "6",
        "text": "more than 5"
      }
      ]
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
      "name": "SpaceCoolingTechnology_exist",
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
      "choices": [
       {
        "value": "Biomass boiler",
        "text": {
         "de": "Biomassekessel"
        }
       },
       {
        "value": "District heating",
        "text": {
         "de": "Fernwärme"
        }
       },
       {
        "value": "Heat pump",
        "text": {
         "de": "Wärmepumpe"
        }
       },
       {
        "value": "Heating oil boiler",
        "text": {
         "de": "Heizölkessel"
        }
       },
       {
        "value": "Natural gas boiler",
        "text": {
         "de": "Erdgaskessel"
        }
       }
      ]
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
        "default": "A hot water tank is a device used to store domestic hot water for use in homes. ",
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
       "default": "What is the size of the PV system? (kilowatt-peak)",
       "de": "Wie groß ist die PV-Anlage? (Kilowatts-peak)"
      },
      "description": {
       "de": "Die durchschnittliche Größe einer PV-Anlage beträgt 5 kW_peak",
       "default": "The average size of a PV system is 5 kWp"
      },
      "choices": [
        "5",
        "7.5",
        "10",
      ]
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
       "default": "What is the capacity of the battery? (kilowatt-hours)",
       "de": "Wie hoch ist die Kapazität der Batterie? (Kilowattstunden)"
      },
      "description": {
       "default": "The average capacity of a home battery system is around 10 kWh",
       "de": "Die durchschnittliche Kapazität eines Batteriesystems beträgt etwa 10 Kilowattstunden"
      },
      "choices": [
        "5",
        "10",
        "15",
        "20"
      ]
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
  "showCompletedPage": false,
  "navigateToUrl": "result.html"
}


// Miao: Send data to server
function sendDataToServer(survey) {
  $.ajax({
      type: "POST",
      url: "/app/myapp/flex",
      data: JSON.stringify(survey.data), // create strings from the objects
      success: function (result) {
         console.log(result);
      },
      dataType: "json"
    });
  alert("The results are: " + JSON.stringify(survey.data));
}


var survey = new Survey.Model(surveyJSON);
$("#surveyContainer").Survey({
    model: survey,
    onComplete: sendDataToServer
});
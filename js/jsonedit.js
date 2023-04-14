{
    "title": " ",
    "description": " ",
    "logoWidth": "0px",
    "logoHeight": "0px",
    "logoFit": "none",
    "logoPosition": "right",
    "pages": [
     {
      "name": "cat_region",
      "elements": [
       {
        "type": "dropdown",
        "name": "cat_region_country",
        "title": "Country",
        "isRequired": true,
        "choices": [
         "България ",
         "Česko",
         "Danmark",
         "Deutschland",
         "Eesti",
         "Éire/Ireland",
         "Ελλάδα ",
         "España",
         "France",
         "Hrvatska",
         "Italia",
         "Κύπρος ",
         "Latvija",
         "Lietuva",
         "Luxembourg",
         "Magyarország",
         "Malta",
         "Nederland",
         "Österreich",
         "Polska",
         "Portugal",
         "România",
         "Slovenija",
         "Slovensko",
         "Suomi/Finland",
         "Sverige",
         "United Kingdom",
         "Ísland",
         "Liechtenstein",
         "Norge",
         "Schweiz/Suisse/Svizzera",
         "Црна Гора ",
         "Северна Македонија",
         "Shqipëria",
         "Srbija/Сpбија",
         "Türkiye"
        ],
        "placeholder": "Select country",
        "autocomplete": "country"
       },
       {
        "type": "dropdown",
        "name": "cat_region_state_de",
        "visible": false,
        "visibleIf": "{cat_region_country} = 'Deutschland'",
        "title": "State",
        "isRequired": true,
        "choices": [
         "Baden-Württemberg",
         "Bayern",
         "Berlin",
         "Brandenburg",
         "Bremen",
         "Hamburg",
         "Hessen",
         "Mecklenburg-Vorpommern",
         "Niedersachsen",
         "Nordrhein-Westfalen",
         "Rheinland-Pfalz",
         "Saarland",
         "Sachsen",
         "Sachsen-Anhalt",
         "Schleswig-Holstein",
         "Thüringen",
         "Other"
        ],
        "placeholder": "Select state"
       },
       {
        "type": "dropdown",
        "name": "cat_region_city_nrw",
        "visible": false,
        "visibleIf": "{cat_region_state_de} = 'Nordrhein-Westfalen'",
        "title": "City",
        "isRequired": true,
        "choices": [
         "Düsseldorf",
         "Köln",
         "Münster",
         "Detmold",
         "Arnsberg"
        ],
        "placeholder": "Select city"
       },
       {
        "type": "dropdown",
        "name": "cat_region_area_koeln",
        "visible": false,
        "visibleIf": "{cat_region_city_nrw} = 'Köln'",
        "title": "Area",
        "isRequired": true,
        "choices": [
         "Bonn, Kreisfreie Stadt",
         "Köln, Kreisfreie Stadt",
         "Leverkusen, Kreisfreie Stadt",
         "Düren",
         "Rhein-Erft-Kreis",
         "Euskirchen",
         "Heinsberg",
         "Oberbergischer Kreis",
         "Rheinisch-Bergischer Kreis",
         "Rhein-Sieg-Kreis",
         "Städteregion Aachen"
        ],
        "placeholder": "Select area"
       }
      ],
      "title": "Which country does the house belong to?",
      "description": "Understanding the location of the house can provide valuable insight into its environmental factors, such as the amount of sunlight it receives."
     },
     {
      "name": "cat_con_1",
      "elements": [
       {
        "type": "text",
        "name": "cat_con_size",
        "title": "What is the size of the house? ",
        "description": "Square metre",
        "isRequired": true,
        "inputType": "number",
        "min": 0
       }
      ],
      "title": "House condition",
      "description": "Knowing the condition of a house can assist in understanding its energy consumption by calculating factors such as insulation efficiency."
     },
     {
      "name": "cat_con_2",
      "elements": [
       {
        "type": "dropdown",
        "name": "cat_con_year",
        "title": "When was the house built?",
        "description": "Knowing the year a house was built can provide insight into its construction materials, such as the composition of the walls.",
        "isRequired": true,
        "choices": [
         {
          "value": "Item 1",
          "text": "before \" \""
         },
         {
          "value": "Item 2",
          "text": "\" \" - \" \""
         },
         {
          "value": "Item 3",
          "text": "\" \" - now"
         }
        ]
       }
      ],
      "title": "House condition",
      "description": "Knowing the condition of a house can assist in understanding its energy consumption by calculating factors such as insulation efficiency."
     },
     {
      "name": "cat_con_3",
      "elements": [
       {
        "type": "boolean",
        "name": "cat_con_renovate",
        "visibleIf": "{cat_con_year} notempty",
        "title": "Has the house ever been renovated before?",
        "description": "Renovations can include upgrading insulation, replacing windows with energy-efficient ones, installing high-efficiency HVAC systems, sealing air leaks, etc. ",
        "isRequired": true
       },
       {
        "type": "checkbox",
        "name": "cat_con_renovate_selection",
        "visible": false,
        "visibleIf": "{cat_con_renovate} = true",
        "title": "What have been renovated in the house?",
        "isRequired": true,
        "choices": [
         {
          "value": "Item 1",
          "text": "Basement"
         },
         {
          "value": "Item 2",
          "text": "Roof"
         },
         {
          "value": "Item 3",
          "text": "Window"
         },
         {
          "value": "Item 4",
          "text": "Wall"
         }
        ],
        "showSelectAllItem": true
       }
      ],
      "title": "House condition",
      "description": "Knowing the condition of a house can assist in understanding its energy consumption by calculating factors such as insulation efficiency."
     },
     {
      "name": "cat_use_1",
      "elements": [
       {
        "type": "text",
        "name": "cat_use_adultNo",
        "title": "Adults",
        "description": "Age 25 and above",
        "isRequired": true,
        "inputType": "number",
        "min": 0
       },
       {
        "type": "text",
        "name": "cat_use_childrenNo",
        "title": "Young people",
        "description": "Age 0-25",
        "isRequired": true,
        "inputType": "number",
        "min": 0
       }
      ],
      "title": "How many people are living in the house?"
     },
     {
      "name": "cat_use_2",
      "elements": [
       {
        "type": "dropdown",
        "name": "cat_use_wfh_1",
        "visible": false,
        "visibleIf": "{cat_use_adultNo} > 0",
        "title": "Adult 1",
        "isRequired": true,
        "choices": [
         {
          "value": "Item 1",
          "text": "0 day per week"
         },
         {
          "value": "Item 2",
          "text": "1 day per week"
         },
         {
          "value": "Item 3",
          "text": "2 day per week"
         },
         {
          "value": "Item 4",
          "text": "3 day per week"
         },
         {
          "value": "Item 5",
          "text": "4 day per week"
         },
         {
          "value": "Item 6",
          "text": "5 day per week"
         }
        ]
       },
       {
        "type": "dropdown",
        "name": "cat_use_wfh_2",
        "visible": false,
        "visibleIf": "{cat_use_adultNo} > 1",
        "title": "Adult 2",
        "isRequired": true,
        "choices": [
         {
          "value": "Item 1",
          "text": "0 day per week"
         },
         {
          "value": "Item 2",
          "text": "1 day per week"
         },
         {
          "value": "Item 3",
          "text": "2 day per week"
         },
         {
          "value": "Item 4",
          "text": "3 day per week"
         },
         {
          "value": "Item 5",
          "text": "4 day per week"
         },
         {
          "value": "Item 6",
          "text": "5 day per week"
         }
        ]
       },
       {
        "type": "dropdown",
        "name": "cat_use_wfh_3",
        "visible": false,
        "visibleIf": "{cat_use_adultNo} > 2",
        "title": "Adult 3",
        "isRequired": true,
        "choices": [
         {
          "value": "Item 1",
          "text": "0 day per week"
         },
         {
          "value": "Item 2",
          "text": "1 day per week"
         },
         {
          "value": "Item 3",
          "text": "2 day per week"
         },
         {
          "value": "Item 4",
          "text": "3 day per week"
         },
         {
          "value": "Item 5",
          "text": "4 day per week"
         },
         {
          "value": "Item 6",
          "text": "5 day per week"
         }
        ]
       },
       {
        "type": "dropdown",
        "name": "cat_use_wfh_4",
        "visible": false,
        "visibleIf": "{cat_use_adultNo} > 3",
        "title": "Adult 4",
        "isRequired": true,
        "choices": [
         {
          "value": "Item 1",
          "text": "0 day per week"
         },
         {
          "value": "Item 2",
          "text": "1 day per week"
         },
         {
          "value": "Item 3",
          "text": "2 day per week"
         },
         {
          "value": "Item 4",
          "text": "3 day per week"
         },
         {
          "value": "Item 5",
          "text": "4 day per week"
         },
         {
          "value": "Item 6",
          "text": "5 day per week"
         }
        ]
       },
       {
        "type": "dropdown",
        "name": "cat_use_wfh_5",
        "visible": false,
        "visibleIf": "{cat_use_adultNo} > 4",
        "title": "Adult 5",
        "isRequired": true,
        "choices": [
         {
          "value": "Item 1",
          "text": "0 day per week"
         },
         {
          "value": "Item 2",
          "text": "1 day per week"
         },
         {
          "value": "Item 3",
          "text": "2 day per week"
         },
         {
          "value": "Item 4",
          "text": "3 day per week"
         },
         {
          "value": "Item 5",
          "text": "4 day per week"
         },
         {
          "value": "Item 6",
          "text": "5 day per week"
         }
        ]
       },
       {
        "type": "dropdown",
        "name": "cat_use_wfh_6",
        "visible": false,
        "visibleIf": "{cat_use_adultNo} > 5\n",
        "title": "Adult 6",
        "isRequired": true,
        "choices": [
         {
          "value": "Item 1",
          "text": "0 day per week"
         },
         {
          "value": "Item 2",
          "text": "1 day per week"
         },
         {
          "value": "Item 3",
          "text": "2 day per week"
         },
         {
          "value": "Item 4",
          "text": "3 day per week"
         },
         {
          "value": "Item 5",
          "text": "4 day per week"
         },
         {
          "value": "Item 6",
          "text": "5 day per week"
         }
        ]
       },
       {
        "type": "dropdown",
        "name": "question2",
        "visible": false,
        "visibleIf": "{cat_use_adultNo} > 6\n\n",
        "title": "Adult 7",
        "isRequired": true,
        "choices": [
         {
          "value": "Item 1",
          "text": "0 day per week"
         },
         {
          "value": "Item 2",
          "text": "1 day per week"
         },
         {
          "value": "Item 3",
          "text": "2 day per week"
         },
         {
          "value": "Item 4",
          "text": "3 day per week"
         },
         {
          "value": "Item 5",
          "text": "4 day per week"
         },
         {
          "value": "Item 6",
          "text": "5 day per week"
         }
        ]
       },
       {
        "type": "dropdown",
        "name": "cat_use_wfh_8",
        "visible": false,
        "visibleIf": "{cat_use_adultNo} > 8\n\n\n",
        "title": "Adult 8",
        "isRequired": true,
        "choices": [
         {
          "value": "Item 1",
          "text": "0 day per week"
         },
         {
          "value": "Item 2",
          "text": "1 day per week"
         },
         {
          "value": "Item 3",
          "text": "2 day per week"
         },
         {
          "value": "Item 4",
          "text": "3 day per week"
         },
         {
          "value": "Item 5",
          "text": "4 day per week"
         },
         {
          "value": "Item 6",
          "text": "5 day per week"
         }
        ]
       }
      ],
      "title": "How often does each adult work from home?"
     },
     {
      "name": "cat_use_3",
      "elements": [
       {
        "type": "boolean",
        "name": "cat_use_car",
        "title": "Does anyone in the house have an electric car?",
        "isRequired": true
       }
      ],
      "title": "Energy use"
     },
     {
      "name": "cat_use_4",
      "elements": [
       {
        "type": "boolean",
        "name": "cat_use_ac",
        "title": "Is there any air conditioner in the house?",
        "isRequired": true
       },
       {
        "type": "text",
        "name": "cat_use_ac_power",
        "visible": false,
        "visibleIf": "{cat_use_ac} = true",
        "title": "What is the power of the air conditioner?",
        "description": "Watts per hour \n(The average power of an air conditioner is 3000 watts per hour)",
        "defaultValueExpression": "3000",
        "inputType": "number",
        "min": 0
       },
       {
        "type": "dropdown",
        "name": "cat_use_ac_efficiency",
        "visible": false,
        "visibleIf": "{cat_use_ac} = true",
        "title": "What is the energy efficiency class of the air conditioner?",
        "description": "(The average energy efficiency class of an air conditioner is class F)",
        "defaultValueExpression": "F",
        "choices": [
         {
          "value": "Item 1",
          "text": "Class A"
         },
         {
          "value": "Item 2",
          "text": "Class B"
         },
         {
          "value": "Item 3",
          "text": "Class C"
         },
         {
          "value": "Item 4",
          "text": "Class D"
         },
         {
          "value": "Item 5",
          "text": "Class E"
         },
         {
          "value": "Item 6",
          "text": "Class F"
         },
         {
          "value": "Item 7",
          "text": "Class G"
         }
        ]
       }
      ],
      "title": "Energy use"
     },
     {
      "name": "cat_use_5",
      "elements": [
       {
        "type": "dropdown",
        "name": "cat_use_source",
        "title": "What type of heating energy is used in the house?",
        "isRequired": true,
        "choices": [
         "Biomass",
         "District heating",
         "Electricity",
         "Heating oil",
         "Natural gas",
         "Others"
        ]
       }
      ],
      "title": "Energy use"
     },
     {
      "name": "cat_use_6",
      "elements": [
       {
        "type": "dropdown",
        "name": "cat_use_mintemp",
        "title": "Minimal temperature",
        "description": "degrees Celsius",
        "isRequired": true,
        "choices": [
         {
          "value": "Item 1",
          "text": "0"
         },
         {
          "value": "Item 2",
          "text": "1"
         },
         {
          "value": "Item 4",
          "text": "3"
         },
         {
          "value": "Item 5",
          "text": "4"
         },
         {
          "value": "Item 6",
          "text": "5"
         },
         {
          "value": "Item 7",
          "text": "6"
         },
         {
          "value": "Item 8",
          "text": "7"
         },
         {
          "value": "Item 9",
          "text": "8"
         },
         {
          "value": "Item 10",
          "text": "9"
         },
         {
          "value": "Item 11",
          "text": "10"
         },
         {
          "value": "Item 12",
          "text": "11"
         },
         {
          "value": "Item 13",
          "text": "12"
         },
         {
          "value": "Item 14",
          "text": "13"
         },
         {
          "value": "Item 15",
          "text": "14"
         },
         {
          "value": "Item 16",
          "text": "15"
         },
         {
          "value": "Item 17",
          "text": "16"
         },
         {
          "value": "Item 18",
          "text": "17"
         },
         {
          "value": "Item 19",
          "text": "18"
         },
         {
          "value": "Item 20",
          "text": "19"
         },
         {
          "value": "Item 21",
          "text": "20"
         },
         {
          "value": "Item 22",
          "text": "21"
         },
         {
          "value": "Item 23",
          "text": "22"
         },
         {
          "value": "Item 24",
          "text": "23"
         },
         {
          "value": "Item 25",
          "text": "24"
         },
         {
          "value": "Item 26",
          "text": "25"
         },
         {
          "value": "Item 27",
          "text": "26"
         },
         {
          "value": "Item 28",
          "text": "27"
         },
         {
          "value": "Item 29",
          "text": "28"
         }
        ],
        "showOtherItem": true,
        "placeholder": "Select"
       },
       {
        "type": "dropdown",
        "name": "question1",
        "title": "Maximal temperature",
        "description": "degrees Celsius",
        "isRequired": true,
        "choices": [
         {
          "value": "Item 1",
          "text": "0"
         },
         {
          "value": "Item 2",
          "text": "1"
         },
         {
          "value": "Item 4",
          "text": "3"
         },
         {
          "value": "Item 5",
          "text": "4"
         },
         {
          "value": "Item 6",
          "text": "5"
         },
         {
          "value": "Item 7",
          "text": "6"
         },
         {
          "value": "Item 8",
          "text": "7"
         },
         {
          "value": "Item 9",
          "text": "8"
         },
         {
          "value": "Item 10",
          "text": "9"
         },
         {
          "value": "Item 11",
          "text": "10"
         },
         {
          "value": "Item 12",
          "text": "11"
         },
         {
          "value": "Item 13",
          "text": "12"
         },
         {
          "value": "Item 14",
          "text": "13"
         },
         {
          "value": "Item 15",
          "text": "14"
         },
         {
          "value": "Item 16",
          "text": "15"
         },
         {
          "value": "Item 17",
          "text": "16"
         },
         {
          "value": "Item 18",
          "text": "17"
         },
         {
          "value": "Item 19",
          "text": "18"
         },
         {
          "value": "Item 20",
          "text": "19"
         },
         {
          "value": "Item 21",
          "text": "20"
         },
         {
          "value": "Item 22",
          "text": "21"
         },
         {
          "value": "Item 23",
          "text": "22"
         },
         {
          "value": "Item 24",
          "text": "23"
         },
         {
          "value": "Item 25",
          "text": "24"
         },
         {
          "value": "Item 26",
          "text": "25"
         },
         {
          "value": "Item 27",
          "text": "26"
         },
         {
          "value": "Item 28",
          "text": "27"
         },
         {
          "value": "Item 29",
          "text": "28"
         }
        ],
        "showOtherItem": true,
        "placeholder": "Select"
       }
      ],
      "title": "What is the ideal home temperature range?"
     },
     {
      "name": "cat_hes_1",
      "elements": [
       {
        "type": "boolean",
        "name": "cat_hes_pv",
        "title": "Is there a photovoltaic (PV) system in the House?",
        "description": "A PV system is a system that uses solar panels to convert sunlight into electricity for use in a building.",
        "isRequired": true
       },
       {
        "type": "text",
        "name": "cat_hes_pv_size",
        "visible": false,
        "visibleIf": "{cat_hes_pv} = true",
        "title": "What is the size of the PV system?",
        "description": "kW_peak\n(The average size of a PV system is 4kW_peak)",
        "defaultValueExpression": "4",
        "isRequired": true,
        "inputType": "number",
        "min": 0
       }
      ],
      "title": "Home energy system"
     },
     {
      "name": "cat_hes_2",
      "elements": [
       {
        "type": "boolean",
        "name": "cat_hes_battery",
        "title": "Is there a battery system in the house?",
        "description": "A home battery system is a device that stores energy produced by solar panels or other sources to be used later when needed.",
        "isRequired": true
       },
       {
        "type": "text",
        "name": "cat_hes_battery_cap",
        "visible": false,
        "visibleIf": "{cat_hes_battery} = true",
        "title": "What is the capacity of the battery?",
        "description": "Kilowatt-hours\n(The average capacity of a home battery system is around 5 kilowatt-hours)",
        "defaultValueExpression": "5",
        "inputType": "number",
        "min": 0
       }
      ],
      "title": "Home energy system"
     },
     {
      "name": "cat_hes_3",
      "elements": [
       {
        "type": "boolean",
        "name": "cat_use_sems",
        "title": "Is there a smart energy management system in the house?",
        "isRequired": true
       }
      ],
      "title": "Home energy system"
     }
    ],
    "showTitle": false,
    "showCompletedPage": false,
    "navigateToUrl": "/result.html"
   }
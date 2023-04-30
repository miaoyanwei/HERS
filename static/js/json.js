Survey.StylesManager.applyTheme("defaultV2");

var surveyJSON =  {
    "title": {
     "default": " q_en",
     "de": "q_de"
    },
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
        "title": {
         "default": "Country",
         "de": "Land"
        },
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
        "placeholder": {
         "default": "Select country",
         "de": "Land wählen"
        },
        "autocomplete": "country"
       },
       {
        "type": "dropdown",
        "name": "cat_region_state_de",
        "visible": false,
        "visibleIf": "{cat_region_country} = 'Deutschland'",
        "title": {
         "default": "State",
         "de": "Staat"
        },
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
        "placeholder": {
         "default": "Select state",
         "de": "Zustand wählen"
        }
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_nrw",
        "visible": false,
        "visibleIf": "{cat_region_state_de} = 'Nordrhein-Westfalen'",
        "title": {
         "default": "City",
         "de": "Stadt"
        },
        "isRequired": true,
        "choices": [
         "Düsseldorf",
         "Köln",
         "Münster",
         "Detmold",
         "Arnsberg"
        ],
        "placeholder": {
         "default": "Select city",
         "de": "Stadt wählen"
        }
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_bw",
        "visible": false,
        "visibleIf": "{cat_region_state_de} = 'Baden-Württemberg'",
        "title": {
         "default": "City",
         "de": "Stadt"
        },
        "isRequired": true,
        "choices": [
         "Stuttgart",
         "Karlsruhe",
         "Freiburg",
         "Tübingen"
        ],
        "placeholder": {
         "default": "Select city",
         "de": "Stadt wählen"
        }
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_bayern",
        "visible": false,
        "visibleIf": "{cat_region_state_de} = 'Bayern'",
        "title": {
         "default": "City",
         "de": "Stadt"
        },
        "isRequired": true,
        "choices": [
         "Oberbayern",
         "Niederbayern",
         "Oberpfalz",
         "Oberfranken",
         "Mittelfranken",
         "Unterfranken",
         "Schwaben"
        ],
        "placeholder": {
         "default": "Select city",
         "de": "Stadt wählen"
        }
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_hessen",
        "visible": false,
        "visibleIf": "{cat_region_state_de} = 'Hessen'",
        "title": {
         "default": "City",
         "de": "Stadt"
        },
        "isRequired": true,
        "choices": [
         "Darmstadt",
         "Gießen",
         "Kassel"
        ],
        "placeholder": {
         "default": "Select city",
         "de": "Stadt wählen"
        }
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_niedersachsen",
        "visible": false,
        "visibleIf": "{cat_region_state_de} = 'Niedersachsen'",
        "title": {
         "default": "City",
         "de": "Stadt"
        },
        "isRequired": true,
        "choices": [
         "Braunschweig",
         "Hannover",
         "Lüneburg",
         "Weser-Ems"
        ],
        "placeholder": {
         "default": "Select city",
         "de": "Stadt wählen"
        }
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_rp",
        "visible": false,
        "visibleIf": "{cat_region_state_de} = 'Rheinland-Pfalz'",
        "title": {
         "default": "City",
         "de": "Stadt"
        },
        "isRequired": true,
        "choices": [
         "Koblenz",
         "Trier",
         "Rheinhessen-Pfalz"
        ],
        "placeholder": {
         "default": "Select city",
         "de": "Stadt wählen"
        }
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_sachsen",
        "visible": false,
        "visibleIf": "{cat_region_state_de} = 'Sachsen'",
        "title": {
         "default": "City",
         "de": "Stadt"
        },
        "isRequired": true,
        "choices": [
         "Dresden",
         "Chemnitz",
         "Leipzig"
        ],
        "placeholder": {
         "default": "Select city",
         "de": "Stadt wählen"
        }
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_koeln",
        "visible": false,
        "visibleIf": "{cat_region_de_nrw} = 'Köln'",
        "title": {
         "default": "Area",
         "de": "Bereich"
        },
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
        "placeholder": {
         "default": "Select area",
         "de": "Bereich wählen"
        }
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_bw_stuttgart",
        "visible": false,
        "visibleIf": "{cat_region_de_bw} = 'Stuttgart'",
        "title": {
         "default": "Area",
         "de": "Bereich"
        },
        "isRequired": true,
        "choices": [
         "Stuttgart, Stadtkreis",
         "Böblingen",
         "Esslingen",
         "Göppingen",
         "Ludwigsburg",
         "Rems-Murr-Kreis",
         "Heilbronn, Stadtkreis",
         "Heilbronn, Landkreis",
         "Hohenlohekreis",
         "Schwäbisch Hall",
         "Main-Tauber-Kreis",
         "Heidenheim",
         "Ostalbkreis"
        ],
        "placeholder": {
         "default": "Select area",
         "de": "Bereich wählen"
        }
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_bw_karlsruhe",
        "visible": false,
        "visibleIf": "{cat_region_de_bw} = 'Karlsruhe'",
        "title": {
         "default": "Area",
         "de": "Bereich"
        },
        "isRequired": true,
        "choices": [
         "Baden-Baden, Stadtkreis",
         "Karlsruhe, Stadtkreis",
         "Karlsruhe, Landkreis",
         "Rastatt",
         "Heidelberg, Stadtkreis",
         "Mannheim, Stadtkreis",
         "Neckar-Odenwald-Kreis",
         "Rhein-Neckar-Kreis",
         "Pforzheim, Stadtkreis",
         "Calw",
         "Enzkreis",
         "Freudenstadt"
        ],
        "placeholder": {
         "default": "Select area",
         "de": "Bereich wählen"
        }
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_bw_freiburg",
        "visible": false,
        "visibleIf": "{cat_region_de_bw} = 'Freiburg'",
        "title": {
         "default": "Area",
         "de": "Bereich"
        },
        "isRequired": true,
        "choices": [
         "Freiburg im Breisgau, Stadtkreis",
         "Breisgau-Hochschwarzwald",
         "Emmendingen",
         "Ortenaukreis",
         "Rottweil",
         "Schwarzwald-Baar-Kreis",
         "Tuttlingen",
         "Konstanz",
         "Lörrach",
         "Waldshut"
        ],
        "placeholder": {
         "default": "Select area",
         "de": "Bereich wählen"
        }
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_bw_tuebingen",
        "visible": false,
        "visibleIf": "{cat_region_de_bw} = 'Tübingen'",
        "title": {
         "default": "Area",
         "de": "Bereich"
        },
        "isRequired": true,
        "choices": [
         "Reutlingen",
         "Tübingen, Landkreis",
         "Zollernalbkreis",
         "Ulm, Stadtkreis",
         "Alb-Donau-Kreis",
         "Biberach",
         "Bodenseekreis",
         "Ravensburg",
         "Sigmaringen"
        ],
        "placeholder": {
         "default": "Select area",
         "de": "Bereich wählen"
        }
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_bayern_oberbayern",
        "visible": false,
        "visibleIf": "{cat_region_de_bayern} = 'Oberbayern'",
        "title": {
         "default": "Area",
         "de": "Bereich"
        },
        "isRequired": true,
        "choices": [
         "Ingolstadt, Kreisfreie Stadt",
         "München, Kreisfreie Stadt",
         "Rosenheim, Kreisfreie Stadt",
         "Altötting",
         "Berchtesgadener Land",
         "Bad Tölz-Wolfratshausen",
         "Dachau",
         "Ebersberg",
         "Eichstätt",
         "Erding",
         "Freising",
         "Fürstenfeldbruck",
         "Garmisch-Partenkirchen",
         "Landsberg am Lech",
         "Miesbach",
         "Mühldorf a. Inn",
         "München, Landkreis",
         "Neuburg-Schrobenhausen",
         "Pfaffenhofen a. d. Ilm",
         "Rosenheim, Landkreis",
         "Starnberg",
         "Traunstein",
         "Weilheim-Schongau"
        ],
        "placeholder": {
         "default": "Select area",
         "de": "Bereich wählen"
        }
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_bayern_niederbayern",
        "visible": false,
        "visibleIf": "{cat_region_de_bayern} = 'Niederbayern'",
        "title": {
         "default": "Area",
         "de": "Bereich"
        },
        "isRequired": true,
        "choices": [
         "Landshut, Kreisfreie Stadt",
         "Passau, Kreisfreie Stadt",
         "Straubing, Kreisfreie Stadt",
         "Deggendorf",
         "Freyung-Grafenau",
         "Kelheim",
         "Landshut, Landkreis",
         "Passau, Landkreis",
         "Regen",
         "Rottal-Inn",
         "Straubing-Bogen",
         "Dingolfing-Landau"
        ],
        "placeholder": {
         "default": "Select area",
         "de": "Bereich wählen"
        }
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_bayern_oberpfalz",
        "visible": false,
        "visibleIf": "{cat_region_de_bayern} = 'Oberpfalz'",
        "title": {
         "default": "Area",
         "de": "Bereich"
        },
        "isRequired": true,
        "choices": [
         "Amberg, Kreisfreie Stadt",
         "Regensburg, Kreisfreie Stadt",
         "Weiden i. d. Opf, Kreisfreie Stadt",
         "Amberg-Sulzbach",
         "Cham",
         "Neumarkt i. d. OPf.",
         "Neustadt a. d. Waldnaab",
         "Regensburg, Landkreis",
         "Schwandorf",
         "Tirschenreuth"
        ],
        "placeholder": {
         "default": "Select area",
         "de": "Bereich wählen"
        }
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_bayern_oberfranken",
        "visible": false,
        "visibleIf": "{cat_region_de_bayern} = 'Oberfranken'",
        "title": {
         "default": "Area",
         "de": "Bereich "
        },
        "isRequired": true,
        "choices": [
         "Bamberg, Kreisfreie Stadt",
         "Bayreuth, Kreisfreie Stadt",
         "Coburg, Kreisfreie Stadt",
         "Hof, Kreisfreie Stadt",
         "Bamberg, Landkreis",
         "Bayreuth, Landkreis",
         "Coburg, Landkreis",
         "Forchheim",
         "Hof, Landkreis",
         "Kronach",
         "Kulmbach",
         "Lichtenfels",
         "Wunsiedel i. Fichtelgebirge"
        ],
        "placeholder": {
         "default": "Select area",
         "de": "Bereich wählen"
        }
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_bayern_mittelfranken",
        "visible": false,
        "visibleIf": "{cat_region_de_bayern} = 'Mittelfranken'",
        "title": {
         "default": "Area",
         "de": "Bereich"
        },
        "isRequired": true,
        "choices": [
         "Ansbach, Kreisfreie Stadt",
         "Erlangen, Kreisfreie Stadt",
         "Fürth, Kreisfreie Stadt",
         "Nürnberg, Kreisfreie Stadt",
         "Schwabach, Kreisfreie Stadt",
         "Ansbach, Landkreis",
         "Erlangen-Höchstadt",
         "Fürth, Landkreis",
         "Nürnberger Land",
         "Neustadt a. d. Aisch-Bad Windsheim",
         "Roth",
         "Weißenburg-Gunzenhausen"
        ],
        "placeholder": {
         "default": "Select area",
         "de": "Bereich wählen"
        }
       },
       {
        "type": "dropdown",
        "name": "cat_re_de_bayern_unterfranken",
        "visible": false,
        "visibleIf": "{cat_region_de_bayern} = 'Unterfranken'",
        "title": {
         "default": "Area",
         "de": "Bereich"
        },
        "isRequired": true,
        "choices": [
         "Aschaffenburg, Kreisfreie Stadt",
         "Schweinfurt, Kreisfreie Stadt",
         "Würzburg, Kreisfreie Stadt",
         "Aschaffenburg, Landkreis",
         "Bad Kissingen",
         "Rhön-Grabfeld",
         "Haßberge",
         "Kitzingen",
         "Miltenberg",
         "Main-Spessart",
         "Schweinfurt, Landkreis",
         "Würzburg, Landkreis"
        ],
        "placeholder": {
         "default": "Select area",
         "de": "Bereich wählen"
        }
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_brandenburg",
        "visible": false,
        "visibleIf": "{cat_region_state_de} = 'Brandenburg'",
        "title": {
         "default": "Area",
         "de": "Bereich"
        },
        "isRequired": true,
        "choices": [
         "Brandenburg an der Havel, Kreisfreie Stadt",
         "Cottbus, Kreisfreie Stadt",
         "Frankfurt (Oder), Kreisfreie Stadt",
         "Potsdam, Kreisfreie Stadt",
         "Barnim",
         "Dahme-Spreewald",
         "Elbe-Elster",
         "Havelland",
         "Märkisch-Oderland",
         "Oberhavel",
         "Oberspreewald-Lausitz",
         "Oder-Spree",
         "Ostprignitz-Ruppin",
         "Potsdam-Mittelmark",
         "Prignitz",
         "Spree-Neiße",
         "Teltow-Fläming",
         "Uckermark"
        ],
        "placeholder": {
         "default": "Select area",
         "de": "Bereich wählen"
        }
       },
       {
        "type": "dropdown",
        "name": "cat_region_bremen",
        "visible": false,
        "visibleIf": "{cat_region_state_de} = 'Bremen'",
        "title": {
         "default": "Area",
         "de": "Bereich"
        },
        "isRequired": true,
        "choices": [
         "Bremen, Kreisfreie Stadt",
         "Bremerhaven, Kreisfreie Stadt"
        ],
        "placeholder": {
         "default": "Select area",
         "de": "Bereich wählen"
        }
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_hessen_darmstadt",
        "visible": false,
        "visibleIf": "{cat_region_de_hessen} = 'Darmstadt'",
        "title": {
         "default": "Area",
         "de": "Bereich"
        },
        "isRequired": true,
        "choices": [
         "Darmstadt, Kreisfreie Stadt",
         "Frankfurt am Main, Kreisfreie Stadt",
         "Offenbach am Main, Kreisfreie Stadt",
         "Wiesbaden, Kreisfreie Stadt",
         "Bergstraße",
         "Darmstadt-Dieburg",
         "Groß-Gerau",
         "Hochtaunuskreis",
         "Main-Kinzig-Kreis",
         "Main-Taunus-Kreis",
         "Odenwaldkreis",
         "Offenbach, Landkreis",
         "Rheingau-Taunus-Kreis",
         "Wetteraukreis"
        ],
        "placeholder": {
         "default": "Select area",
         "de": "Bereich wählen"
        }
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_hessen_giesen",
        "visible": false,
        "visibleIf": "{cat_region_de_hessen} = 'Gießen'",
        "title": {
         "default": "Area",
         "de": "Bereich"
        },
        "isRequired": true,
        "choices": [
         "Gießen, Landkreis",
         "Lahn-Dill-Kreis",
         "Limburg-Weilburg",
         "Marburg-Biedenkopf",
         "Vogelsbergkreis"
        ],
        "placeholder": {
         "default": "Select area",
         "de": "Bereich wählen"
        }
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_hessen_kassel",
        "visible": false,
        "visibleIf": "{cat_region_de_hessen} = 'Kassel'",
        "title": {
         "default": "Area",
         "de": "Bereich"
        },
        "isRequired": true,
        "choices": [
         "Kassel, Kreisfreie Stadt",
         "Fulda",
         "Hersfeld-Rotenburg",
         "Kassel, Landkreis",
         "Schwalm-Eder-Kreis",
         "Waldeck-Frankenberg",
         "Werra-Meißner-Kreis"
        ],
        "placeholder": {
         "default": "Select area",
         "de": "Bereich wählen"
        }
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_mv",
        "visible": false,
        "visibleIf": "{cat_region_state_de} = 'Mecklenburg-Vorpommern'",
        "title": {
         "default": "Area",
         "de": "Bereich"
        },
        "isRequired": true,
        "choices": [
         "Rostock, Kreisfreie Stadt",
         "Schwerin, Kreisfreie Stadt",
         "Mecklenburgische Seenplatte",
         "Landkreis Rostock",
         "Vorpommern-Rügen",
         "Nordwestmecklenburg",
         "Vorpommern-Greifswald",
         "Ludwigslust-Parchim"
        ],
        "placeholder": {
         "default": "Select area",
         "de": "Bereich wählen"
        }
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_ns_braunschweig",
        "visible": false,
        "visibleIf": "{cat_region_de_niedersachsen} = 'Braunschweig'",
        "title": {
         "default": "Area",
         "de": "Bereich"
        },
        "isRequired": true,
        "choices": [
         "Braunschweig, Kreisfreie Stadt",
         "Salzgitter, Kreisfreie Stadt",
         "Wolfsburg, Kreisfreie Stadt",
         "Gifhorn",
         "Goslar",
         "Helmstedt",
         "Northeim",
         "Peine",
         "Wolfenbüttel",
         "Göttingen"
        ],
        "placeholder": {
         "default": "Select area",
         "de": "Bereich wählen"
        }
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_ns_hannover",
        "visible": false,
        "visibleIf": "{cat_region_de_niedersachsen} = 'Hannover'",
        "title": {
         "default": "Area",
         "de": "Bereich"
        },
        "isRequired": true,
        "choices": [
         "Diepholz",
         "Hameln-Pyrmont",
         "Hildesheim",
         "Holzminden",
         "Nienburg (Weser)",
         "Schaumburg",
         "Region Hannover"
        ],
        "placeholder": {
         "default": "Select area",
         "de": "Bereich wählen"
        }
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_ns_luenburg",
        "visible": false,
        "visibleIf": "{cat_region_de_niedersachsen} = 'Lüneburg'",
        "title": {
         "default": "Area",
         "de": "Bereich"
        },
        "isRequired": true,
        "choices": [
         "Celle",
         "Cuxhaven",
         "Harburg",
         "Lüchow-Dannenberg",
         "Lüneburg, Landkreis",
         "Osterholz",
         "Rotenburg (Wümme)",
         "Heidekreis",
         "Stade",
         "Uelzen",
         "Verden"
        ],
        "placeholder": {
         "default": "Select area",
         "de": "Bereich wählen"
        }
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_ns_we",
        "visible": false,
        "visibleIf": "{cat_region_de_niedersachsen} = 'Weser-Ems'",
        "title": "Area",
        "isRequired": true,
        "choices": [
         "Delmenhorst, Kreisfreie Stadt",
         "Emden, Kreisfreie Stadt",
         "Oldenburg (Oldenburg), Kreisfreie Stadt",
         "Osnabrück, Kreisfreie Stadt",
         "Wilhelmshaven, Kreisfreie Stadt",
         "Ammerland",
         "Aurich",
         "Cloppenburg",
         "Emsland",
         "Friesland (DE)",
         "Grafschaft Bentheim",
         "Leer",
         "Oldenburg, Landkreis",
         "Osnabrück, Landkreis",
         "Vechta",
         "Wesermarsch",
         "Wittmund"
        ],
        "placeholder": "Select area"
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_nrw_duesseldorf",
        "visible": false,
        "visibleIf": "{cat_region_de_nrw} = 'Düsseldorf'",
        "title": "Area",
        "isRequired": true,
        "choices": [
         "Düsseldorf, Kreisfreie Stadt",
         "Duisburg, Kreisfreie Stadt",
         "Essen, Kreisfreie Stadt",
         "Krefeld, Kreisfreie Stadt",
         "Mönchengladbach, Kreisfreie Stadt",
         "Mülheim an der Ruhr, Kreisfreie Stadt",
         "Oberhausen, Kreisfreie Stadt",
         "Remscheid, Kreisfreie Stadt",
         "Solingen, Kreisfreie Stadt",
         "Wuppertal, Kreisfreie Stadt",
         "Kleve",
         "Mettmann",
         "Rhein-Kreis Neuss",
         "Viersen",
         "Wesel"
        ],
        "placeholder": "Select area"
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_nrw_muenster",
        "visible": false,
        "visibleIf": "{cat_region_de_nrw} = 'Münster'",
        "title": {
         "default": "Area",
         "de": "Bereich"
        },
        "isRequired": true,
        "choices": [
         "Bottrop, Kreisfreie Stadt",
         "Gelsenkirchen, Kreisfreie Stadt",
         "Münster, Kreisfreie Stadt",
         "Borken",
         "Coesfeld",
         "Recklinghausen",
         "Steinfurt",
         "Warendorf"
        ],
        "placeholder": {
         "default": "Select area",
         "de": "Bereich wählen"
        }
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_nrw_detmold",
        "visible": false,
        "visibleIf": "{cat_region_de_nrw} = 'Detmold'",
        "title": {
         "default": "Area",
         "de": "Bereich "
        },
        "isRequired": true,
        "choices": [
         "Bielefeld, Kreisfreie Stadt",
         "Gütersloh",
         "Herford",
         "Höxter",
         "Lippe",
         "Minden-Lübbecke",
         "Paderborn"
        ],
        "placeholder": {
         "default": "Select area",
         "de": "Bereich wählen"
        }
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_nrw_arnsberg",
        "visible": false,
        "visibleIf": "{cat_region_de_nrw} = 'Arnsberg'",
        "title": {
         "default": "Area",
         "de": "Bereich"
        },
        "isRequired": true,
        "choices": [
         "Bochum, Kreisfreie Stadt",
         "Dortmund, Kreisfreie Stadt",
         "Hagen, Kreisfreie Stadt",
         "Hamm, Kreisfreie Stadt",
         "Herne, Kreisfreie Stadt",
         "Ennepe-Ruhr-Kreis",
         "Hochsauerlandkreis",
         "Märkischer Kreis",
         "Olpe",
         "Siegen-Wittgenstein",
         "Soest",
         "Unna"
        ],
        "placeholder": {
         "default": "Select area",
         "de": "Bereich wählen"
        }
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_rp_koblenz",
        "visible": false,
        "visibleIf": "{cat_region_de_rp} = 'Koblenz'",
        "title": {
         "default": "Area",
         "de": "Bereich"
        },
        "isRequired": true,
        "choices": [
         "Koblenz, Kreisfreie Stadt",
         "Ahrweiler",
         "Altenkirchen (Westerwald)",
         "Bad Kreuznach",
         "Birkenfeld",
         "Mayen-Koblenz",
         "Neuwied",
         "Rhein-Lahn-Kreis",
         "Westerwaldkreis",
         "Cochem-Zell",
         "Rhein-Hunsrück-Kreis"
        ],
        "placeholder": {
         "default": "Select area",
         "de": "Bereich wählen"
        }
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_rp_trier",
        "visible": false,
        "visibleIf": "{cat_region_de_rp} = 'Trier'",
        "title": {
         "default": "Area",
         "de": "Bereich"
        },
        "isRequired": true,
        "choices": [
         "Trier, Kreisfreie Stadt",
         "Bernkastel-Wittlich",
         "Eifelkreis Bitburg-Prüm",
         "Vulkaneifel",
         "Trier-Saarburg"
        ],
        "placeholder": {
         "default": "Select area",
         "de": "Bereich wählen"
        }
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_rp_rp",
        "visible": false,
        "visibleIf": "{cat_region_de_rp} = 'Rheinhessen-Pfalz'",
        "title": {
         "default": "Area",
         "de": "Bereich"
        },
        "isRequired": true,
        "choices": [
         "Frankenthal (Pfalz), Kreisfreie Stadt",
         "Kaiserslautern, Kreisfreie Stadt",
         "Landau in der Pfalz, Kreisfreie Stadt",
         "Ludwigshafen am Rhein, Kreisfreie Stadt",
         "Mainz, Kreisfreie Stadt",
         "Neustadt an der Weinstraße, Kreisfreie Stadt",
         "Pirmasens, Kreisfreie Stadt",
         "Speyer, Kreisfreie Stadt",
         "Worms, Kreisfreie Stadt",
         "Zweibrücken, Kreisfreie Stadt",
         "Alzey-Worms",
         "Bad Dürkheim",
         "Donnersbergkreis",
         "Germersheim",
         "Kaiserslautern, Landkreis",
         "Kusel",
         "Südliche Weinstraße",
         "Rhein-Pfalz-Kreis",
         "Mainz-Bingen",
         "Südwestpfalz"
        ],
        "placeholder": {
         "default": "Select area",
         "de": "Bereich wählen"
        }
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_saarland",
        "visible": false,
        "visibleIf": "{cat_region_state_de} = 'Saarland'",
        "title": {
         "default": "Area",
         "de": "Bereich"
        },
        "isRequired": true,
        "choices": [
         "Regionalverband Saarbrücken",
         "Merzig-Wadern",
         "Neunkirchen",
         "Saarlouis",
         "Saarpfalz-Kreis",
         "St. Wendel"
        ],
        "placeholder": {
         "default": "Select area",
         "de": "Bereich wählen"
        }
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_sachen_dresden",
        "visible": false,
        "visibleIf": "{cat_region_de_sachsen} = 'Dresden'",
        "title": {
         "default": "Area",
         "de": "Bereich"
        },
        "isRequired": true,
        "choices": [
         "Dresden, Kreisfreie Stadt",
         "Bautzen",
         "Görlitz",
         "Meißen",
         "Sächsische Schweiz-Osterzgebirge"
        ],
        "placeholder": {
         "default": "Select area",
         "de": "Bereich wählen"
        }
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_sachsen_chemnitz",
        "visible": false,
        "visibleIf": "{cat_region_de_sachsen} = 'Chemnitz'",
        "title": {
         "default": "Area",
         "de": "Bereich"
        },
        "isRequired": true,
        "choices": [
         "Chemnitz, Kreisfreie Stadt",
         "Erzgebirgskreis",
         "Mittelsachsen",
         "Vogtlandkreis",
         "Zwickau"
        ],
        "placeholder": {
         "default": "Select area",
         "de": "Bereich wählen"
        }
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_sachsen_leipzig",
        "visible": false,
        "visibleIf": "{cat_region_de_sachsen} = 'Leipzig'",
        "title": {
         "default": "Area",
         "de": "Bereich"
        },
        "isRequired": true,
        "choices": [
         "Leipzig, Kreisfreie Stadt",
         "Leipzig",
         "Nordsachsen"
        ],
        "placeholder": {
         "default": "Select area",
         "de": "Bereich wählen"
        }
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_sa",
        "visible": false,
        "visibleIf": "{cat_region_state_de} = 'Sachsen-Anhalt'",
        "title": {
         "default": "Area",
         "de": "Bereich"
        },
        "isRequired": true,
        "choices": [
         "Dessau-Roßlau, Kreisfreie Stadt",
         "Halle (Saale), Kreisfreie Stadt",
         "Magdeburg, Kreisfreie Stadt",
         "Altmarkkreis Salzwedel",
         "Anhalt-Bitterfeld",
         "Jerichower Land",
         "Börde",
         "Burgenlandkreis",
         "Harz",
         "Mansfeld-Südharz",
         "Saalekreis",
         "Salzlandkreis",
         "Stendal",
         "Wittenberg"
        ],
        "placeholder": {
         "default": "Select area",
         "de": "Bereich wählen"
        }
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_sh",
        "visible": false,
        "visibleIf": "{cat_region_state_de} = 'Schleswig-Holstein'",
        "title": {
         "default": "Area",
         "de": "Bereich"
        },
        "isRequired": true,
        "choices": [
         "Flensburg, Kreisfreie Stadt",
         "Kiel, Kreisfreie Stadt",
         "Lübeck, Kreisfreie Stadt",
         "Neumünster, Kreisfreie Stadt",
         "Dithmarschen",
         "Herzogtum Lauenburg",
         "Nordfriesland",
         "Ostholstein",
         "Pinneberg",
         "Plön",
         "Rendsburg-Eckernförde",
         "Schleswig-Flensburg",
         "Segeberg",
         "Steinburg",
         "Stormarn"
        ],
        "placeholder": {
         "default": "Select area",
         "de": "Bereich wählen"
        }
       },
       {
        "type": "dropdown",
        "name": "cat_region_de_thueringen",
        "visible": false,
        "visibleIf": "{cat_region_state_de} = 'Thüringen'",
        "title": {
         "default": "Area",
         "de": "Bereich"
        },
        "isRequired": true,
        "choices": [
         "Erfurt, Kreisfreie Stadt",
         "Gera, Kreisfreie Stadt",
         "Jena, Kreisfreie Stadt",
         "Suhl, Kreisfreie Stadt",
         "Weimar, Kreisfreie Stadt",
         "Eichsfeld",
         "Nordhausen",
         "Unstrut-Hainich-Kreis",
         "Kyffhäuserkreis",
         "Schmalkalden-Meiningen",
         "Gotha",
         "Sömmerda",
         "Hildburghausen",
         "Ilm-Kreis",
         "Weimarer Land",
         "Sonneberg",
         "Saalfeld-Rudolstadt",
         "Saale-Holzland-Kreis",
         "Saale-Orla-Kreis",
         "Greiz",
         "Altenburger Land",
         "Eisenach, Kreisfreie Stadt",
         "Wartburgkreis"
        ],
        "placeholder": {
         "default": "Select area",
         "de": "Bereich wählen"
        }
       }
      ],
      "title": {
       "default": "Where is the house located?",
       "de": "Zu welcher Region gehört das Haus?"
      },
      "description": {
       "default": "Understanding the location of the house can provide valuable insight into its environmental factors, such as the amount of sunlight it receives.",
       "de": "Wenn man den Standort des Hauses kennt, erhält man wertvolle Informationen über die Umweltfaktoren, wie z. B. die Menge an Sonnenlicht, die das Haus erhält."
      }
     },
     {
      "name": "cat_con_2",
      "elements": [
       {
        "type": "dropdown",
        "name": "cat_con_year",
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
          "value": "Item 1",
          "text": {
           "default": "before 1880",
           "de": "vor 1880"
          }
         },
         {
          "value": "Item 2",
          "text": "1880-1889"
         },
         {
          "value": "Item 3",
          "text": "1890-1899"
         },
         {
          "value": "Item 4",
          "text": "1900-1909"
         },
         {
          "value": "Item 5",
          "text": "1910-1919"
         },
         {
          "value": "Item 6",
          "text": "1920-1929"
         },
         {
          "value": "Item 7",
          "text": "1930-1939"
         },
         {
          "value": "Item 8",
          "text": "1940-1949"
         },
         {
          "value": "Item 9",
          "text": "1950-1959"
         },
         {
          "value": "Item 10",
          "text": "1960-1969"
         },
         {
          "value": "Item 11",
          "text": "1970-1979"
         },
         {
          "value": "Item 12",
          "text": "1980-1989"
         },
         {
          "value": "Item 13",
          "text": "1990-1999"
         },
         {
          "value": "Item 14",
          "text": "2000-2009"
         },
         {
          "value": "Item 15",
          "text": "2010-2019"
         },
         {
          "value": "Item 16",
          "text": {
            "default": "after 2020",
            "de": "nach 2020"
          }
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
      "name": "cat_con_3",
      "elements": [
       {
        "type": "boolean",
        "name": "cat_con_renovate",
        "visibleIf": "{cat_con_year} notempty",
        "title": {
         "default": "Has the house ever been renovated before?",
         "de": "Ist das Haus schon einmal renoviert worden?"
        },
        "description": {
         "default": "Renovations can include upgrading insulation, replacing windows with energy-efficient ones, installing high-efficiency HVAC systems, sealing air leaks, etc. ",
         "de": "Zu den Renovierungsarbeiten gehören die Verbesserung der Isolierung, der Austausch von Fenstern durch energieeffiziente, der Einbau hocheffizienter HLK-Systeme, das Abdichten von Luftlecks usw. "
        },
        "isRequired": true
       },
       {
        "type": "checkbox",
        "name": "cat_con_renovate_selection",
        "visible": false,
        "visibleIf": "{cat_con_renovate} = true",
        "title": {
         "default": "What has been renovated in the house?",
         "de": "Was wurde im Haus renoviert?"
        },
        "isRequired": true,
        "choices": [
         {
          "value": "Item 1",
          "text": {
           "default": "Basement",
           "de": "Untergeschoss"
          }
         },
         {
          "value": "Item 2",
          "text": {
           "default": "Roof",
           "de": "Dach"
          }
         },
         {
          "value": "Item 3",
          "text": {
           "default": "Window",
           "de": "Fenster"
          }
         },
         {
          "value": "Item 4",
          "text": {
           "default": "Wall",
           "de": "Wand"
          }
         }
        ],
        "showSelectAllItem": true
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
      "name": "cat_use_1",
      "elements": [
       {
        "type": "text",
        "name": "cat_use_adultNo",
        "title": {
         "default": "Adults",
         "de": "Erwachsene"
        },
        "description": {
         "default": "People who work",
         "de": "Alter 25 und älter"
        },
        "isRequired": true,
        "inputType": "number",
        "min": 0
       },
       {
        "type": "text",
        "name": "cat_use_childrenNo",
        "title": {
         "default": "Children and students",
         "de": "Junge Menschen"
        },
        "description": {
         "default": "People who attend kindergarten, school, or university",
         "de": "Alter 0-25"
        },
        "isRequired": true,
        "inputType": "number",
        "min": 0
       }
      ],
      "title": {
       "default": "How many people are living in the house?",
       "de": "Wie viele Personen wohnen in dem Haus?"
      }
     },
     {
      "name": "cat_use_2",
      "elements": [
       {
        "type": "dropdown",
        "name": "cat_use_wfh_1",
        "visible": false,
        "visibleIf": "{cat_use_adultNo} > 0",
        "title": {
         "default": "Adult 1",
         "de": "Erwachsene/er"
        },
        "isRequired": true,
        "choices": [
         {
          "value": "Item 1",
          "text": {
           "default": "0 day per week",
           "de": "0 Tag pro Woche"
          }
         },
         {
          "value": "Item 2",
          "text": {
           "default": "1 day per week",
           "de": "1 Tag pro Woche"
          }
         },
         {
          "value": "Item 3",
          "text": {
           "default": "2 day per week",
           "de": "2 Tage pro Woche"
          }
         },
         {
          "value": "Item 4",
          "text": {
           "default": "3 day per week",
           "de": "3 Tage pro Woche"
          }
         },
         {
          "value": "Item 5",
          "text": {
           "default": "4 day per week",
           "de": "4 Tage pro Woche"
          }
         },
         {
          "value": "Item 6",
          "text": {
           "default": "5 day per week",
           "de": "5 Tage pro Woche"
          }
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
       },
       {
        "type": "dropdown",
        "name": "cat_use_wfh_9",
        "visible": false,
        "visibleIf": "{cat_use_adultNo} > 9\n\n\n",
        "title": "Adult 9",
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
      "title": {
       "default": "How often does each adult work from home?",
       "de": "Wie oft arbeitet jeder Erwachsene von zu Hause aus?"
      }
     },
     {
      "name": "cat_use_4",
      "elements": [
       {
        "type": "boolean",
        "name": "cat_use_ac",
        "title": {
         "default": "Is there any air conditioner in the house?",
         "de": "Gibt es eine Klimaanlage im Haus?"
        },
        "isRequired": true
       }
      ],
      "title": {
       "default": "Energy use",
       "de": "Energieeinsatz"
      }
     },
     {
      "name": "cat_use_5",
      "elements": [
       {
        "type": "dropdown",
        "name": "cat_use_source",
        "title": {
         "default": "What type of heating energy is used in the house?",
         "de": "Welche Art von Heizenergie wird im Haus verwendet?"
        },
        "isRequired": true,
        "choices": [
         {
          "value": "Biomass",
          "text": {
           "de": "Biomasse"
          }
         },
         {
          "value": "District heating",
          "text": {
           "de": "Fernwärme "
          }
         },
         {
          "value": "Electricity",
          "text": {
           "de": "Strom"
          }
         },
         {
          "value": "Heating oil",
          "text": {
           "de": "Heizöl"
          }
         },
         {
          "value": "Natural gas",
          "text": {
           "de": "Erdgas"
          }
         }
        ]
       }
      ],
      "title": {
       "default": "Energy use",
       "de": "Energieeinsatz"
      }
     },
     {
      "name": "cat_hes_1",
      "elements": [
       {
        "type": "boolean",
        "name": "cat_hes_pv",
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
        "type": "text",
        "name": "cat_hes_pv_size",
        "visible": false,
        "visibleIf": "{cat_hes_pv} = true",
        "title": {
         "default": "What is the size of the PV system? (kilowatt-peak)",
         "de": "Wie groß ist die PV-Anlage?"
        },
        "description": {
         "de": "kW_peak (Die durchschnittliche Größe einer PV-Anlage beträgt 4 kW_peak)",
         "default": "The average size of a PV system is 5 kWp"
        },
        "defaultValueExpression": "5",
        "inputType": "number",
        "min": 0
       }
      ],
      "title": {
       "default": "Home energy system",
       "de": "Home Energie System"
      }
     },
     {
      "name": "cat_hes_2",
      "elements": [
       {
        "type": "boolean",
        "name": "cat_hes_battery",
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
        "type": "text",
        "name": "cat_hes_battery_cap",
        "visible": false,
        "visibleIf": "{cat_hes_battery} = true",
        "title": {
         "default": "What is the capacity of the battery? (kilowatt-hours)",
         "de": "Wie hoch ist die Kapazität der Batterie?"
        },
        "description": {
         "default": "The average capacity of a home battery system is around 7 kWh",
         "de": "Kilowattstunden (Die durchschnittliche Kapazität eines Heimbatteriesystems beträgt etwa 5 Kilowattstunden)"
        },
        "defaultValueExpression": "7",
        "inputType": "number",
        "min": 0
       }
      ],
      "title": {
       "default": "Home energy system",
       "de": "Home Energie System"
      }
     },
     {
      "name": "cat_hes_3",
      "elements": [
       {
        "type": "boolean",
        "name": "cat_use_sems",
        "title": {
         "default": "Is there a smart energy management system (SEMS) in the house?",
         "de": "Gibt es ein intelligentes Energiemanagementsystem im Haus?"
        },
        "isRequired": true
       }
      ],
      "title": {
       "default": "Home energy system",
       "de": "Home Energie System"
      }
     }
    ],
    "showTitle": false,
    "showCompletedPage": false,
    "navigateToUrl": "/result.html"
   }



// Miao: Send data to server
function sendDataToServer(survey) {
    $.ajax({
        type: "POST",
        url: "/app/myapp/flex",
        data: survey.data,
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
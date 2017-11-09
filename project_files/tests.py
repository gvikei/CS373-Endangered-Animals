#!/usr/bin/env python3

# pylint: disable = bad-whitespace
# pylint: disable = invalid-name
# pylint: disable = missing-publictring

# --------------------------------------
# projects/python/collatz/TestCollatz.py
# Copyright (C) 2017
# Glenn P. Downing
# --------------------------------------

# https://public.python.org/3.4/reference/simple_stmts.html#grammar-token-assert_stmt

# -------
# imports
# -------
import json
import requests
from io import StringIO
from jsondiff import diff
from unittest import main, TestCase

# from main import get_common_name_of_animal, get_single_animal_data, get_single_habitat_data, get_single_threat_data, get_single_country_data
# from main import get_all_animal_data, get_all_habitat_data, get_all_threat_data, get_all_country_data
# -----------
# TestCollatz
# -----------


def createErrorMessage(error, message):
    warning = {}
    warning["error"] = error
    warning["message"] = message
    return json.dumps(warning)


class TestAnimals(TestCase):
    # ----
    # get_common_name_of_animal
    # ----
    def test_get_common_name_of_animal1(self):
        url = "https://swe-endangered-animals.appspot.com/get_common_name_of_animal/?sci_name=Abudefduf sexfasciatus"
        data = requests.get(url).json()
        string = data.get("common_name")
        correct_json_string = "Scissortail Sergeant"
        self.assertEqual(string, correct_json_string)

    def test_get_common_name_of_animal2(self):
        url = "https://swe-endangered-animals.appspot.com/get_common_name_of_animal/?sci_name=asdfasdfasdfadsf"
        data = requests.get(url).json()
        string = json.dumps(data)
        error = "Scientific name for animal not found in database"
        message = "Your search query for asdfasdfasdfadsf was not found in our database"
        correct_json_string = createErrorMessage(error, message)
        self.assertEqual(string, correct_json_string)

    # ----
    # get_single_animal_data
    # ----

    def test_single_animal1(self):
        url = "https://swe-endangered-animals.appspot.com/single_animal_data?animal_name=Semi-collared Hawk"
        data = requests.get(url).json()
        self.assertEqual("Accipiter collaris", data.get("scientificName"))
        self.assertEqual("Semi-collared Hawk", data.get("name"))
        self.assertEqual("Near Threatened", data.get("vulnerability"))
        self.assertEqual("BirdLife International 2016. Accipiter collaris. The IUCN Red List of Threatened Species 2016: e.T22695568A93516526. http://dx.doi.org/10.2305/IUCN.UK.2016-3.RLTS.T22695568A93516526.en", data.get("citationLink"))
        self.assertEqual("Resource & habitat protection",
                         data.get("conservationMeasure"))
        self.assertEqual(
            "https://www.youtube.com/watch?v=vy2RKH2v5_E", data.get("videoLink"))
        self.assertEqual(
            "http://faculty.ucr.edu/~chappell/INW/birds3raptors/semicollaredhawk019.jpg", data.get("imageLink"))
        assoc_habitats = ["Forest - Subtropical/Tropical Moist Montane"]
        self.assertEqual(assoc_habitats, data.get("assoc_habitats"))

        assoc_threats = ["Annual & perennial non-timber crops", "Agro-industry farming",
                         "Livestock farming & ranching", "Agro-industry grazing, ranching or farming", "Work & other activities"]
        self.assertEqual(assoc_threats, data.get("assoc_threats"))

        assoc_countries = ["Colombia", "Ecuador",
                           "Peru", "Venezuela, Bolivarian Republic of"]
        self.assertEqual(assoc_countries, data.get("assoc_countries"))

    def test_single_animal2(self):
        url = "https://swe-endangered-animals.appspot.com/single_animal_data?animal_name=asdfasdfasdfadsf"
        data = requests.get(url).json()
        string = json.dumps(data)
        error = "Animal not found in database"
        message = "Your search query for asdfasdfasdfadsf was not found in our database"
        correct_json_string = createErrorMessage(error, message)
        self.assertEqual(string, correct_json_string)

    # ----
    # get_single_habitat_data
    # ----

    def test_single_habitat1(self):
        url = "https://swe-endangered-animals.appspot.com/single_habitat_data/?habitat_name=Artificial/Aquatic - Ponds (below 8ha)"
        data = requests.get(url).json()
        self.assertEqual(
            "Artificial/Aquatic - Ponds (below 8ha)", data.get("name"))
        self.assertEqual("http://thumb1.shutterstock.com/display_pic_with_logo/1771478/323878760/stock-photo-small-artificial-decorative-pond-with-rocks-and-plants-on-the-backyard-in-summer-323878760.jpg", data.get("image"))
        self.assertEqual("Suitable", data.get("suitability"))
        assoc_animals = ["Acanthochelys pallidipectoris"]
        self.assertEqual(assoc_animals, data.get("assoc_animals"))
        assoc_countries = ["Paraguay", "Argentina",
                           "Bolivia, Plurinational States of"]
        self.assertEqual(assoc_countries, data.get("assoc_countries"))

    def test_single_habitat2(self):
        url = "https://swe-endangered-animals.appspot.com/single_habitat_data/?habitat_name=asdfasdfasdfadsf"
        data = requests.get(url).json()
        string = json.dumps(data)
        error = "Habitat not found in database"
        message = "Your search query for asdfasdfasdfadsf was not found in our database"
        correct_json_string = createErrorMessage(error, message)
        self.assertEqual(string, correct_json_string)

    # ----
    # get_single_threat_data
    # ----
    def test_get_threats1(self):
        url = "https://swe-endangered-animals.appspot.com/single_threat_data/?threat_name=Agro-industry farming"
        data = requests.get(url).json()
        array_animals = ["Accipiter butleri", "Accipiter butleri", "Ablepharus bivittatus", "Accipiter collaris", "Abronia oaxacae", "Acanthochelys pallidipectoris",
                         "Acanthosaura lepidogaster", "Abronia graminea", "Ablepharus deserti", "Acanthodactylus beershebensis", "Aburria aburri", "Acantopsis octoactinotos"]
        array_habitats = ["Wetlands (inland) - Shrub Dominated Wetlands",
                          "Wetlands (inland) - Permanent Rivers/Streams/Creeks (includes waterfalls)",
                          "Forest - Temperate",
                          "Grassland - Temperate",
                          "Forest - Subtropical/Tropical Moist Lowland",
                          "Desert - Temperate",
                          "Artificial/Aquatic - Ponds (below 8ha)",
                          "Shrubland - Subtropical/Tropical Dry",
                          "Artificial/Terrestrial - Rural Gardens",
                          "Wetlands (inland) - Seasonal/Intermittent Freshwater Marshes/Pools (under 8ha)",
                          "Forest - Subtropical/Tropical Moist Montane",
                          "Artificial/Terrestrial - Subtropical/Tropical Heavily Degraded Former Forest",
                          "Wetlands (inland) - Freshwater Springs and Oases",
                          "Artificial/Terrestrial - Plantations",
                          "Shrubland - Temperate",
                          "Grassland - Subtropical/Tropical Seasonally Wet/Flooded"]
        self.assertEqual("Agro-industry farming", data.get('name'))
        self.assertEqual(
            "https://vermont4evolution.files.wordpress.com/2011/07/mono1.jpg", data.get('image'))
        self.assertEqual("ongoing", data.get('timing'))
        self.assertEqual('4.5', data.get('severity'))
        self.assertEqual(array_animals, data.get('assoc_animals'))
        self.assertEqual(array_habitats, data.get('assoc_habitats'))


    def test_get_threats2(self):
        url = "https://swe-endangered-animals.appspot.com/single_threat_data/?threat_name=sdfsdfdssffs"
        data = requests.get(url).json()
        string = json.dumps(data)
        error = "Threat not found in database"
        message = "Your search query for sdfsdfdssffs was not found in our database"
        correct_json_string = createErrorMessage(error, message)
        self.assertEqual(string, correct_json_string)

    # ----
    # get_single_country_data
    # ----

    def test_single_country1(self):
        url = "https://swe-endangered-animals.appspot.com/single_country_data/?country_name=Albania"
        data = requests.get(url).json()
        self.assertEqual("Albania", data.get("name"))
        self.assertEqual(
            "http://cdn.wonderfulengineering.com/wp-content/uploads/2015/07/Albania-Flag-5.png", data.get("flag"))
        self.assertEqual("lat: 41.153332 lng: 20.168331",
                         data.get("coordinate"))
        assoc_animals = ["Accipiter gentilis",
                         "Acanthocybium solandri", "Accipiter brevipes"]
        self.assertEqual(assoc_animals, data.get("assoc_animals"))
        assoc_habitats = ["Forest - Boreal",
                          "Artificial/Terrestrial - Urban Areas",
                          "Wetlands (inland) - Permanent Rivers/Streams/Creeks (includes waterfalls)",
                          "Forest - Temperate",
                          "Shrubland - Subtropical/Tropical Dry",
                          "Artificial/Terrestrial - Rural Gardens",
                          "Marine Oceanic - Epipelagic (0-200m)",
                          "Marine Neritic - Pelagic",
                          "Grassland - Subtropical/Tropical Dry",
                          "Artificial/Terrestrial - Plantations",
                          "Shrubland - Mediterranean-type Shrubby Vegetation",
                          "Grassland - Tundra"
                          ]
        self.assertEqual(assoc_habitats, data.get("assoc_habitats"))

    def test_single_country2(self):
        url = "https://swe-endangered-animals.appspot.com/single_country_data/?country_name=sdfsdfdssffs"
        data = requests.get(url).json()
        string = json.dumps(data)
        error = "Country not found in database"
        message = "Your search query for sdfsdfdssffs was not found in our database"
        correct_json_string = createErrorMessage(error, message)
        self.assertEqual(string, correct_json_string)


# ----
# main
# ----


if __name__ == "__main__":  # pragma: no cover
    main()

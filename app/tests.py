#!/usr/bin/env python3

# pylint: disable = bad-whitespace
# pylint: disable = invalid-name
# pylint: disable = missing-docstring

# --------------------------------------
# projects/python/collatz/TestCollatz.py
# Copyright (C) 2017
# Glenn P. Downing
# --------------------------------------

# https://docs.python.org/3.4/reference/simple_stmts.html#grammar-token-assert_stmt

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
    # def test_get_common_name_of_animal1(self):
    #     url = "https://swe-endangered-animals.appspot.com/get_common_name_of_animal/?sci_name=Abudefduf sexfasciatus"
    #     data = requests.get(url).json()
    #     string = data.get("common_name")
    #     correct_json_string = "Scissortail Sergeant"
    #     self.assertEqual(string, correct_json_string)
    #
    # def test_get_common_name_of_animal2(self):
    #     url = "https://swe-endangered-animals.appspot.com/get_common_name_of_animal/?sci_name=asdfasdfasdfadsf"
    #     data = requests.get(url).json()
    #     string = json.dumps(data)
    #     error = "Scientific name for animal not found in database"
    #     message = "Your search query for asdfasdfasdfadsf was not found in our database"
    #     correct_json_string = createErrorMessage(error, message)
    #     self.assertEqual(string, correct_json_string)
    #
    # def test_get_common_name_of_animal3(self):
    #     url = "https://swe-endangered-animals.appspot.com/get_common_name_of_animal/?sci_name="
    #     data = requests.get(url).json()
    #     string = json.dumps(data)
    #     error = "Empty field for parameter inside /get_common_name_of_animal/"
    #     message = "Please enter a scientific name"
    #     correct_json_string = createErrorMessage(error, message)
    #     self.assertEqual(string, correct_json_string)

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
        self.assertEqual("http://apiv3.iucnredlist.org/api/v3/website/Accipiter collaris", data.get("webLink"))

        #Associated habitats. Make sure list contents are equal, list lengths are equal
        correct_assoc_habitats = ["Forest - Subtropical/Tropical Moist Montane"]
        req_assoc_habitats = data.get("assoc_habitats")
        self.assertEqual(len(correct_assoc_habitats), len(req_assoc_habitats))
        for habitat in req_assoc_habitats:
            self.assertTrue("True", habitat in correct_assoc_habitats)

        #Associated threats. Make sure list contents are equal, list lengths are equal
        correct_assoc_threats = ["Annual & perennial non-timber crops", "Agro-industry farming",
                         "Livestock farming & ranching", "Agro-industry grazing, ranching or farming", "Work & other activities"]
        req_assoc_threats = data.get("assoc_threats")
        self.assertEqual(len(correct_assoc_threats), len(req_assoc_threats))
        for threat in req_assoc_threats:
            self.assertTrue("True", threat in correct_assoc_threats)

        #Associated countries. Make sure list contents are equal, list lengths are equal
        correct_assoc_countries = ["Colombia", "Ecuador", "Peru", "Venezuela, Bolivarian Republic of"]
        req_assoc_countries = data.get("assoc_countries")
        self.assertEqual(len(correct_assoc_countries), len(req_assoc_countries))
        for country in req_assoc_countries:
            self.assertTrue("True", country in correct_assoc_countries)



    def test_single_animal2(self):
        url = "https://swe-endangered-animals.appspot.com/single_animal_data?animal_name=asdfasdfasdfadsf"
        data = requests.get(url).json()
        string = json.dumps(data)
        error = "Animal not found in database"
        message = "Your search query for asdfasdfasdfadsf was not found in our database"
        correct_json_string = createErrorMessage(error, message)
        self.assertEqual(string, correct_json_string)



    def test_single_animal3(self):
        url = "https://swe-endangered-animals.appspot.com/single_animal_data?animal_name="
        data = requests.get(url).json()
        string = json.dumps(data)
        error = "Empty field for parameter inside /single_animal_data/"
        message = "Please enter an animal name"
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

        #Associated animals. Check for same length, same content
        correct_assoc_animals = ["Chaco Side-necked Turtle"]
        req_assoc_animals = data.get("assoc_animals")
        self.assertEqual(len(correct_assoc_animals), len(req_assoc_animals))
        for animal in req_assoc_animals:
            self.assertTrue("True", animal in correct_assoc_animals)

        #Associated countries. Check for same length, same content
        correct_assoc_countries = ["Paraguay", "Argentina", "Bolivia, Plurinational States of"]
        req_assoc_countries = data.get("assoc_countries")
        self.assertEqual(len(correct_assoc_countries), len(req_assoc_countries))
        for country in req_assoc_countries:
            self.assertTrue("True", country in correct_assoc_countries)


    def test_single_habitat2(self):
        url = "https://swe-endangered-animals.appspot.com/single_habitat_data/?habitat_name=asdfasdfasdfadsf"
        data = requests.get(url).json()
        string = json.dumps(data)
        error = "Habitat not found in database"
        message = "Your search query for asdfasdfasdfadsf was not found in our database"
        correct_json_string = createErrorMessage(error, message)
        self.assertEqual(string, correct_json_string)

    def test_single_habitat3(self):
        url = "https://swe-endangered-animals.appspot.com/single_habitat_data/?habitat_name="
        data = requests.get(url).json()
        string = json.dumps(data)
        error = "Empty field for parameter inside /single_habitat_data/"
        message = "Please enter a habitat"
        correct_json_string = createErrorMessage(error, message)
        self.assertEqual(string, correct_json_string)
    # ----
    # get_single_threat_data
    # ----

    def test_get_threats1(self):
        url = "https://swe-endangered-animals.appspot.com/single_threat_data/?threat_name=Agro-industry farming"
        data = requests.get(url).json()
        self.assertEqual("Agro-industry farming", data.get('name'))
        self.assertEqual(
            "http://www.blog.kpmgafrica.com/wp-content/uploads/2013/04/watering_field.jpg", data.get('image'))
        self.assertEqual("ongoing", data.get('timing'))
        self.assertEqual('4.5', data.get('severity'))

        #Associated animals. Check for same length, same content
        correct_assoc_animals = ["Chaco Side-necked Turtle","Nicobar Sparrowhawk","Wattled Guan", "Be'er Sheva Fringe-fingered Lizard", "Desert Lidless Skink",
            "Semi-collared Hawk", "Terrestrial Arboreal Alligator Lizard", "Oaxaca Arboreal Alligator Lizard", "Brown Pricklenape","Long-faced Loach","Two-streaked Snake-eyed Skink"]
        req_assoc_animals = data.get("assoc_animals")
        self.assertEqual(len(correct_assoc_animals), len(req_assoc_animals))
        for animal in req_assoc_animals:
            self.assertTrue("True", animal in correct_assoc_animals)

        #Associated habitats. Make sure list contents are equal, list lengths are equal
        correct_assoc_habitats = ["Wetlands (inland) - Shrub Dominated Wetlands",
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
        req_assoc_habitats = data.get("assoc_habitats")
        self.assertEqual(len(correct_assoc_habitats), len(req_assoc_habitats))
        for habitat in req_assoc_habitats:
            self.assertTrue("True", habitat in correct_assoc_habitats)

    def test_get_threats2(self):
        url = "https://swe-endangered-animals.appspot.com/single_threat_data/?threat_name=sdfsdfdssffs"
        data = requests.get(url).json()
        string = json.dumps(data, ensure_ascii=False)
        error = "Threat not found in database"
        message = "Your search query for sdfsdfdssffs was not found in our database"
        correct_json_string = createErrorMessage(error, message)
        self.assertEqual(string, correct_json_string)

    def test_get_threats3(self):
        url = "https://swe-endangered-animals.appspot.com/single_threat_data/?threat_name="
        data = requests.get(url).json()
        string = json.dumps(data)
        error = "Empty field for parameter inside /single_threat_data/"
        message = "Please enter a threat"
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

        #Associated animals. Check for same length, same content
        correct_assoc_animals = ["Wahoo", "Northern Goshawk", "Levant Sparrowhawk"]
        req_assoc_animals = data.get("assoc_animals")
        self.assertEqual(len(correct_assoc_animals), len(req_assoc_animals))
        for animal in req_assoc_animals:
            self.assertTrue("True", animal in correct_assoc_animals)

        #Associated habitats. Make sure list contents are equal, list lengths are equal
        correct_assoc_habitats = ["Forest - Boreal",
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
        req_assoc_habitats = data.get("assoc_habitats")
        self.assertEqual(len(correct_assoc_habitats), len(req_assoc_habitats))
        for habitat in req_assoc_habitats:
            self.assertTrue("True", habitat in correct_assoc_habitats)


    def test_single_country2(self):
        url = "https://swe-endangered-animals.appspot.com/single_country_data/?country_name=sdfsdfdssffs"
        data = requests.get(url).json()
        string = json.dumps(data)
        error = "Country not found in database"
        message = "Your search query for sdfsdfdssffs was not found in our database"
        correct_json_string = createErrorMessage(error, message)
        self.assertEqual(string, correct_json_string)

    def test_single_country3(self):
        url = "https://swe-endangered-animals.appspot.com/single_country_data/?country_name="
        data = requests.get(url).json()
        string = json.dumps(data)
        error = "Empty field for parameter inside /single_country_data/"
        message = "Please enter a country"
        correct_json_string = createErrorMessage(error, message)
        self.assertEqual(string, correct_json_string)

    # ----
    # all_animal_data
    #
    # Returns a list of animals. Each animal is represented by a dict
    # video_url can be null. Everything else cannot be null
    # ----

    def test_no_nulls_all_animal_data(self):
        url = "https://swe-endangered-animals.appspot.com/all_animal_data"
        data = requests.get(url).json()
        for animal in data:
            self.assertEqual(-1, animal.get("name").find("null"))
            self.assertEqual(-1, animal.get("scientificName").find("null"))
            self.assertEqual(-1, animal.get("vulnerability").find("null"))
            self.assertEqual(-1, animal.get("citationLink").find("null"))
            self.assertEqual(-1,
                             animal.get("conservationMeasure").find("null"))
            self.assertEqual(-1, animal.get("webLink").find("null"))
            self.assertEqual(-1, animal.get("imageLink").find("null"))

            # Associated tables
            # Associated habitats. Make sure not null, has length > 0, each elem is not null
            assoc_habitats = animal.get("assoc_habitats")
            self.assertNotEqual(None, assoc_habitats)
            self.assertNotEqual(0, len(assoc_habitats))
            for habitat in assoc_habitats:
                self.assertEqual(-1, habitat.find("null"))

            # Associated countries. Make sure not null, has length > 0, each elem is not null
            assoc_countries = animal.get("assoc_countries")
            self.assertNotEqual(None, assoc_countries)
            self.assertNotEqual(0, len(assoc_countries))
            for country in assoc_countries:
                self.assertEqual(-1, country.find("null"))

            # Associated threats. Make sure not null, has length > 0, each elem is not null
            assoc_threats = animal.get("assoc_threats")
            self.assertNotEqual(None, assoc_threats)
            self.assertNotEqual(0, len(assoc_threats))
            for threat in assoc_threats:
                self.assertEqual(-1, threat.find("null"))

    # ----
    # all_habitat_data
    # ----

    def test_no_nulls_all_habitat_data(self):
        url = "https://swe-endangered-animals.appspot.com/all_habitat_data"
        data = requests.get(url).json()
        json_string = json.dumps(data)

        #Quick test to make sure no nulls
        self.assertEqual(-1, json_string.find("null"))

        #Detailed approach
        for habitat in data:
            self.assertEqual(-1, habitat.get("name").find("null"))
            self.assertEqual(-1, habitat.get("suitability").find("null"))
            self.assertEqual(-1, habitat.get("image").find("null"))

            # Associated tables
            # Associated animals. Make sure not null, has length > 0, each elem is not null
            assoc_animals = habitat.get("assoc_animals")
            if len(assoc_animals) == 0:
                print(habitat.get("name"))
            self.assertNotEqual(None, assoc_animals)
            self.assertNotEqual(0, len(assoc_animals))
            for animal in assoc_animals:
                self.assertEqual(-1, animal.find("null"))

            # Associated countries. Make sure not null, has length > 0, each elem is not null
            assoc_countries = habitat.get("assoc_countries")
            self.assertNotEqual(None, assoc_countries)
            self.assertNotEqual(0, len(assoc_countries))
            for country in assoc_countries:
                self.assertEqual(-1, country.find("null"))

            # Associated threats. Make sure not null, has length > 0, each elem is not null
            assoc_threats = habitat.get("assoc_threats")
            self.assertNotEqual(None, assoc_threats)
            self.assertNotEqual(0, len(assoc_threats))
            for threat in assoc_threats:
                self.assertEqual(-1, threat.find("null"))

    # ----
    # all_threat_data
    # ----

    def test_no_nulls_all_threat_data(self):
        url = "https://swe-endangered-animals.appspot.com/all_threat_data"
        data = requests.get(url).json()
        json_string = json.dumps(data)

        #Quick test to make sure no nulls
        self.assertEqual(-1, json_string.find("null"))

        #Detailed approach
        for threat in data:
            self.assertEqual(-1, threat.get("name").find("null"))
            self.assertEqual(-1, threat.get("timing").find("null"))
            self.assertEqual(-1, threat.get("severity").find("null"))
            self.assertEqual(-1, threat.get("image").find("null"))

            # Associated tables
            # Associated animals. Make sure not null, has length > 0, each elem is not null
            assoc_animals = threat.get("assoc_animals")
            self.assertNotEqual(None, assoc_animals)
            self.assertNotEqual(0, len(assoc_animals))
            for animal in assoc_animals:
                self.assertEqual(-1, animal.find("null"))

            # Associated habitats. Make sure not null, has length > 0, each elem is not null
            assoc_habitats = threat.get("assoc_habitats")
            self.assertNotEqual(None, assoc_habitats)
            self.assertNotEqual(0, len(assoc_habitats))
            for habitat in assoc_habitats:
                self.assertEqual(-1, habitat.find("null"))

    # ----
    # all_country_data
    # ----

    def test_no_nulls_all_country_data(self):
        url = "https://swe-endangered-animals.appspot.com/all_country_data"
        data = requests.get(url).json()
        json_string = json.dumps(data)

        #Quick test to make sure no nulls
        self.assertEqual(-1, json_string.find("null"))

        #Detailed approach
        for country in data:
            self.assertEqual(-1, country.get("name").find("null"))
            self.assertEqual(-1, country.get("flag").find("null"))
            self.assertEqual(-1, country.get("coordinate").find("null"))

            # Associated tables
            # Associated animals. Make sure not null, has length > 0, each elem is not null
            assoc_animals = country.get("assoc_animals")
            if assoc_animals == None:
                print(country.get("name"))
            self.assertNotEqual(None, assoc_animals)
            self.assertNotEqual(0, len(assoc_animals))
            for animal in assoc_animals:
                self.assertEqual(-1, animal.find("null"))

            # Associated habitats. Make sure not null, has length > 0, each elem is not null
            assoc_habitats = country.get("assoc_habitats")
            self.assertNotEqual(None, assoc_habitats)
            self.assertNotEqual(0, len(assoc_habitats))
            for habitat in assoc_habitats:
                self.assertEqual(-1, habitat.find("null"))

# ----
# main
# ----


if __name__ == "__main__":  # pragma: no cover
    main()

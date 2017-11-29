import os
import unittest

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions
from selenium.common.exceptions import TimeoutException

DRIVER = None
gecko_path = "/Users/Shivaji/Downloads/chromedriver"
# url = "localhost:8080/"
url = "http://endangered-animals.me/"

def getWebdriver():
    """ Keep track of one browser instance for all unit tests """
    global DRIVER
    DRIVER = DRIVER or webdriver.Chrome(executable_path=gecko_path)
    return DRIVER

def loadPage(page="", attempt=1):
    """ Prevent further execution until page fully loaded """

    # Give page 3 attempts to load
    if attempt >= 3:
        raise TimeoutException

    try:
        DRIVER.get(url+page)

        WebDriverWait(DRIVER, 10).until(
            expected_conditions.presence_of_element_located((By.CLASS_NAME, "navbar-header"))
        )

    except TimeoutException:
        # Reload page if timed out
        loadPage(page, attempt + 1)

def getHTML(type, elem):
    """ Return contents of desired element """
    return DRIVER.find_element(type, elem).get_attribute("innerHTML")

class UnitTests(unittest.TestCase):
    def setUp(self):
        self.browser = getWebdriver()

    @classmethod
    def tearDownClass(cls):
        DRIVER.quit()

    def test_homepage_is_accessible(self):
        """ Determine whether homepage loads """
        loadPage()
        self.assertIn("Planet Animal", getHTML(By.CLASS_NAME, "navbar-header"))

    def test_about_page_is_accessible(self):
        """ Determine whether About page loads """
        loadPage("about.html")
        self.assertIn("About Us", getHTML(By.TAG_NAME, "h1"))
    
    def test_animals_page_is_accessible(self):
        """ Determine whether Animals page loads """
        loadPage("animals.html")
        self.assertIn("Animals", getHTML(By.TAG_NAME, "h1"))
    
    def test_threats_page_is_accessible(self):
        """ Determine whether Threats page loads """
        loadPage("threats.html")
        self.assertIn("Threats", getHTML(By.TAG_NAME, "h1"))

    def test_habitats_page_is_accessible(self):
        """ Determine whether Habitats page loads """
        loadPage("habitats.html")
        self.assertIn("Habitats", getHTML(By.TAG_NAME, "h1"))

    def test_countries_page_is_accessible(self):
        """ Determine whether Countries page loads """
        loadPage("countries.html")
        self.assertIn("Countries", getHTML(By.TAG_NAME, "h1"))

    def test_animals_data_integrity(self):
        """
            Determine if search function works

            - Search last animal by common name
            - Verify using scientific name
            - Make sure case-insensitive highlighting works
        """
        loadPage("animals.html")

        # Search last animal in DB
        search = self.browser.find_element_by_css_selector("input.form-control")
        search.send_keys("guan")

        # Check if animal was searched properly
        results = getHTML(By.CLASS_NAME, "react-bs-table-container")
        self.assertIn("Aburria aburri", results)

        # Check if search highlighting exists
        self.assertIn("<u>Guan</u>", results)

    def test_threats_data_integrity(self):
        """
            Determine if search function works

            - Search for one of last threats
            - Verify using associated model
            - Make sure case-insensitive highlighting works
        """
        loadPage("threats.html")

        # Search last threat in DB
        search = self.browser.find_element_by_css_selector("input.form-control")
        search.send_keys("war")

        # Check if threat was searched properly
        results = getHTML(By.CLASS_NAME, "react-bs-table-container")
        self.assertIn("Yarkon Bream", results)

        # Check if search highlighting exists
        self.assertIn("<u>War</u>", results)

    def test_habitats_data_integrity(self):
        """
            Determine if search function works

            - Search for habitat by associated model
            - Verify habitat name
            - Make sure case-insensitive highlighting works
        """
        loadPage("habitats.html")

        # Search last habitat in DB
        search = self.browser.find_element_by_css_selector("input.form-control")
        search.send_keys("fringe-fingered")

        # Check if habitat was searched properly
        results = getHTML(By.CLASS_NAME, "react-bs-table-container")
        self.assertIn("Desert - Hot", results)

        # Check if search highlighting exists
        self.assertIn("<u>Fringe-fingered</u>", results)

    def test_countries_data_integrity(self):
        """
            Determine if search function works

            - Search for one of last countries
            - Verify using associated model
            - Make sure case-insensitive highlighting works
        """
        loadPage("countries.html")

        # Search last country in DB
        search = self.browser.find_element_by_css_selector("input.form-control")
        search.send_keys("yemen")

        # Check if country was searched properly
        results = getHTML(By.CLASS_NAME, "react-bs-table-container")
        self.assertIn("Surgeonfish", results)

        # Check if search highlighting exists
        self.assertIn("<u>Yemen</u>", results)


if __name__ == "__main__":
    unittest.main()

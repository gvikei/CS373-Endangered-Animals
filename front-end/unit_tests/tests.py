import os
import unittest

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions
from selenium.common.exceptions import TimeoutException

DRIVER = None
gecko_path = "/Users/Shivaji/Downloads/chromedriver"
url = "localhost:8080/"
# url = "http://endangered-animals.me/"

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
        loadPage()
        self.assertIn("Planet Animal", getHTML(By.CLASS_NAME, "navbar-header"))

    def test_about_page_is_accessible(self):
        loadPage("about.html")
        self.assertIn("About Us", getHTML(By.TAG_NAME, "h1"))
    
    def test_animals_page_is_accessible(self):
        loadPage("animals.html")
        self.assertIn("Animals", getHTML(By.TAG_NAME, "h1"))
    
    def test_threats_page_is_accessible(self):
        loadPage("threats.html")
        self.assertIn("Threats", getHTML(By.TAG_NAME, "h1"))

    def test_habitats_page_is_accessible(self):
        loadPage("habitats.html")
        self.assertIn("Habitats", getHTML(By.TAG_NAME, "h1"))

    def test_countries_page_is_accessible(self):
        loadPage("countries.html")
        self.assertIn("Countries", getHTML(By.TAG_NAME, "h1"))
    
    # def test_multiple_search_terms_in_countries_page(self):
    #     self.browser.get(url+"countries.html")
    #     html = self.browser.execute_script("return document.body;")
    #     # print ("html")
    #     search_box = self.browser.find_element_by_css_selector("react-bs-table-search-form")
    #     search_box.send_keys("United States Minor Outlying Islands")
    #     result = self.browser.find_element_by_xpath("/html/body/div/div[2]/div[3]/div[2]/table/tbody/tr/td[2]/a/b/u")
    #     # print (result)
    #     self.assertIn("Threats", self.browser.page_source)


if __name__ == "__main__":
    unittest.main()

import os
import unittest
from selenium import webdriver


class UnitTests(unittest.TestCase):
    def setUp(self):
        self.browser = webdriver.Chrome(executable_path='/Users/macuser/Downloads/chromedriver')

    def tearDown(self):
        self.browser.quit()

    def test_about_page_is_accessible(self):
        self.browser.get('http://endangered-animals.me/about.html')
        self.assertIn('About Us', self.browser.page_source)

    def test_animals_page_is_accessible(self):
        self.browser.get('http://endangered-animals.me/animals.html')
        self.assertIn('Animals', self.browser.page_source)

    def test_threats_page_is_accessible(self):
        self.browser.get('http://endangered-animals.me/threats.html')
        self.assertIn('Threats', self.browser.page_source)

    # def test_countries_page_is_accessible(self):
    #     self.browser.get('http://endangered-animals.me/countries.html')
    #     self.assertIn('Countries', self.browser.page_source)
    #
    # def test_habitats_page_is_accessible(self):
    #     self.browser.get('http://endangered-animals.me/habitats.html')
    #     header_element = self.browser.find_element_by_class_name("bs-docs-header")
    #     self.assertIn('Habitats', header_element.get_attribute('innerHTML'))

    def test_homepage_is_accessible(self):
        self.browser.get('http://endangered-animals.me')
        self.assertIn('Planet Animal', self.browser.title)

if __name__ == '__main__':
    unittest.main()

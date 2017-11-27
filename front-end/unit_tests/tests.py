import os
import unittest
from selenium import webdriver


class UnitTests(unittest.TestCase):
    def setUp(self):
        self.browser = webdriver.Chrome(executable_path='/Users/macuser/Downloads/chromedriver')

    def tearDown(self):
        self.browser.quit()

    # def test_about_page_is_accessible(self):
    #     self.browser.get('http://endangered-animals.me/about.html')
    #     self.assertIn('About Us', self.browser.page_source)
    #
    # def test_animals_page_is_accessible(self):
    #     self.browser.get('http://endangered-animals.me/animals.html')
    #     self.assertIn('Animals', self.browser.page_source)
    #
    # def test_threats_page_is_accessible(self):
    #     self.browser.get('http://endangered-animals.me/threats.html')
    #     self.assertIn('Threats', self.browser.page_source)

    # def test_countries_page_is_accessible(self):
    #     self.browser.get('http://endangered-animals.me/countries.html')
    #     self.assertIn('Countries', self.browser.page_source)
    #
    # def test_habitats_page_is_accessible(self):
    #     self.browser.get('http://endangered-animals.me/habitats.html')
    #     header_element = self.browser.find_element_by_class_name("bs-docs-header")
    #     self.assertIn('Habitats', header_element.get_attribute('innerHTML'))

    # def test_homepage_is_accessible(self):
    #     self.browser.get('http://endangered-animals.me')
    #     self.assertIn('Planet Animal', self.browser.title)

    def test_multiple_search_terms_in_countries_page(self):
        self.browser.get('http://endangered-animals.me/countries.html')
        html = self.browser.execute_script("return document.body;")
        print ('html')
        search_box = self.browser.find_element_by_css_selector("react-bs-table-search-form")
        search_box.send_keys('United States Minor Outlying Islands')
        result = self.browser.find_element_by_xpath('/html/body/div/div[2]/div[3]/div[2]/table/tbody/tr/td[2]/a/b/u')
        print (result)
        self.assertIn('Threats', self.browser.page_source)


if __name__ == '__main__':
    unittest.main()

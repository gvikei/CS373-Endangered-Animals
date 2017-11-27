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

    def test_homepage_is_accessible(self):
        self.browser.get('http://endangered-animals.me')
        self.assertIn('Planet Animal', self.browser.title)



if __name__ == '__main__':
    unittest.main()

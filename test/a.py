from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time

driver_path = './chromedriver'
browser = webdriver.Chrome(driver_path)

browser.get('http://localhost:8080/category')
item1 = browser.find_element_by_id('item_name0').text
browser.find_element_by_id('item_name0').click()

result1 = browser.find_element_by_tag_name('h3').text

if (item1 == result1) :
    print('success')
else :
    print('fail')
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

import os
print (os.path.dirname(__file__))

pw = 'kIDsdf234!'
n_pw = 'helloworld'
em = 'junghwan@a6.com'
uid = '11111106'
user = 'junghwan'
driver_path = './chromedriver'
browser = webdriver.Chrome(driver_path)

print('Sprint 1 Feature :\n' )
print('\t signin')
browser.get('http://localhost:8080/signup')
element = WebDriverWait(browser, 2).until(
        EC.presence_of_element_located((By.NAME, 'name'))
    )
user_name = browser.find_element_by_name('name')
user_name.send_keys(user)
last_name = browser.find_element_by_name('inputLastName')
last_name.send_keys('junghwan')
ubid = browser.find_element_by_name('ubid')
ubid.send_keys(uid)
email = browser.find_element_by_name('email')
email.send_keys(em)
ps = browser.find_element_by_name('password')
ps.send_keys(pw)
add1 = browser.find_element_by_name('Address')
add1.send_keys('127')
city = browser.find_element_by_name('City')
city.send_keys('Amherst')
zip1 = browser.find_element_by_name('Zip')
zip1.send_keys('12712')
state = browser.find_element_by_name('State')
state.send_keys('NY')
file_images = browser.find_element_by_name("user_image").send_keys(os.getcwd()+"/suji.jpeg")
login_attempt = browser.find_element_by_xpath("//*[@type='submit']")
login_attempt.submit()
try :
    all_options = browser.find_element_by_xpath("//*[@id='user_name_info']")
    if (all_options.text == ('Hi, '+user)) :
        print ('signin test : success')
    else :
        print ('signin test : fail')
except :
    print ('signin test : fail')

print()
print('------------------------------------------------')    
print('\t login ')

browser.get('http://localhost:8080/login')
element = WebDriverWait(browser, 2).until(
        EC.presence_of_element_located((By.NAME, 'email'))
    )
user = 'junghwan'
email = browser.find_element_by_name('email')
email.send_keys(em)
ps = browser.find_element_by_name('password')
ps.send_keys(pw)
login_attempt = browser.find_element_by_xpath("//*[@type='submit']")
login_attempt.submit()
try :
    all_options = browser.find_element_by_xpath("//*[@id='user_name_info']")
    if (all_options.text == ('Hi, '+user)) :
        print ('login test : success')
    else :
        print ('login test : fail')
except :
    print ('login test : fail')

print('Sprint 2 Feature :\n' )

print('------------------------------------------------')    
print('\t chage user information ')

browser.get('http://localhost:8080/accountsettings')

user = 'junghwan'
lname = 'yim'
add1_t = '127'
add2_t = '8333'
city_t = 'auburn'
zip_t = '12222'
stat1 = 'NY'
element = WebDriverWait(browser, 2).until(
        EC.presence_of_element_located((By.NAME, 'inputFirstName'))
    )
browser.find_element_by_name('inputFirstName').clear()
browser.find_element_by_name('inputLastName').clear()
browser.find_element_by_name('inputAddress').clear()
browser.find_element_by_name('inputAddress2').clear()
browser.find_element_by_name('inputCity').clear()
browser.find_element_by_name('inputZip').clear()


user_name = browser.find_element_by_name('inputFirstName')
user_name.send_keys(user)
last_name = browser.find_element_by_name('inputLastName')
last_name.send_keys(lname)
ps = browser.find_element_by_name('inputPassword4')
ps.send_keys(pw)
add1 = browser.find_element_by_name('inputAddress')
add1.send_keys(add1_t)
add2 = browser.find_element_by_name('inputAddress2')
add2.send_keys(add2_t)
city = browser.find_element_by_name('inputCity')
city.send_keys(city_t)
zip1 = browser.find_element_by_name('inputZip')
zip1.send_keys(zip_t)
state = browser.find_element_by_name('inputState')
state.send_keys(stat1)
login_attempt = browser.find_element_by_xpath("//*[@type='submit']")
login_attempt.submit()
try :
    browser.get('http://localhost:8080/accountsettings')
    element = WebDriverWait(browser, 2).until(
        EC.presence_of_element_located((By.NAME, 'inputFirstName'))
    )
    user_name = browser.find_element_by_name('inputFirstName').get_attribute('value')
    last_name = browser.find_element_by_name('inputLastName').get_attribute('value')
    add1 = browser.find_element_by_name('inputAddress').get_attribute('value')
    add2 = browser.find_element_by_name('inputAddress2').get_attribute('value')
    city = browser.find_element_by_name('inputCity').get_attribute('value')
    zip1 = browser.find_element_by_name('inputZip').get_attribute('value')
    state = browser.find_element_by_name('inputState').get_attribute('value')
  
    # print(user_name)
    if (user_name == user and last_name == lname and add1 == add1_t and add2 == add2_t and city == city_t and zip1 == zip_t and state == stat1) :
        print ('change user info test : success')
    else :
        print ('change user info test : fail')
except :
    print ('change user info test : fail')

print('------------------------------------------------')    
print('\t chage user password ')

browser.get('http://localhost:8080/modifyPassword')
element = WebDriverWait(browser, 2).until(
        EC.presence_of_element_located((By.NAME, 'oldPassword'))
    )
old_p = browser.find_element_by_name('oldPassword')
old_p.send_keys(pw)
new_p1 = browser.find_element_by_name('newPassword')
new_p1.send_keys(n_pw)
new_p2 = browser.find_element_by_name('newPassword2')
new_p2.send_keys(n_pw)

login_attempt = browser.find_element_by_xpath("//*[@type='submit']")
login_attempt.submit()

browser.get('http://localhost:8080/login')
element = WebDriverWait(browser, 2).until(
        EC.presence_of_element_located((By.NAME, 'email'))
    )

email = browser.find_element_by_name('email')
email.send_keys(em)
ps = browser.find_element_by_name('password')
ps.send_keys(n_pw)
login_attempt = browser.find_element_by_xpath("//*[@type='submit']")
login_attempt.submit()
try :
    all_options = browser.find_element_by_xpath("//*[@id='user_name_info']")
    if (all_options.text == ('Hi, '+user)) :
        print ('login test : success')
    else :
        print ('login test : fail')
except :
    print ('login test : fail')

print('------------------------------------------------')    
print('\t upload form  and show up the item')

browser.get('http://localhost:8080/uploadForm')

prod_name_t = 'OLED TV'
prod_desc_t = 'brand new tv'
prod_price_t = '100'
prod_cate_t = 'Electronics'

element = WebDriverWait(browser, 2).until(
        EC.presence_of_element_located((By.NAME, 'productName'))
    )

prod_name = browser.find_element_by_name('productName')
prod_name.send_keys(prod_name_t)
prod_desc = browser.find_element_by_name('productDescription')
prod_desc.send_keys(prod_desc_t)
prod_price = browser.find_element_by_name('productPrice')
prod_price.send_keys(prod_price_t)
prod_cate = browser.find_element_by_name('productCategory')
prod_cate.send_keys(prod_cate_t)

login_attempt = browser.find_element_by_xpath("//*[@type='submit']")
login_attempt.submit()

browser.get('http://localhost:8080/category')

prod_name_t = 'OLED TV'
prod_desc_t = 'brand new tv'
prod_price_t = '100'
prod_cate_t = 'Electronics'

item_name = browser.find_element_by_id('item_name0').text
item_desc = browser.find_element_by_id('item_desc0').text
item_price = browser.find_element_by_id('item_price0').text

try :
    if (item_name == prod_name_t and item_desc == prod_desc_t and item_price == '$'+prod_price_t) :
        print ('upload test : success')
    else :
        print ('upload test : fail')
except :
    print ('upload test : fail')


print('------------------------------------------------')    
print('\t logout ')

browser.get('http://localhost:8080/logout')
try :
    all_options = browser.find_element_by_xpath("//*[@id='login_part']")
    if (all_options.text == 'Login/Sign Up') :
        print ('logout test : success')
    else :
        print ('logout test : fail')
except :
    print ('logout test : fail')

browser.quit()
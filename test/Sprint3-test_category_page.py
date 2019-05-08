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

browser.get('https://www.bufbuynsell.net/login')
element = WebDriverWait(browser, 2).until(
        EC.presence_of_element_located((By.NAME, 'email'))
    )

email = browser.find_element_by_name('email')
email.send_keys('jyim@buffalo.edu')
ps = browser.find_element_by_name('password')
ps.send_keys('1234')
login_attempt = browser.find_element_by_xpath("//*[@type='submit']")
login_attempt.submit()
try :
    all_options = browser.find_element_by_xpath("//*[@id='user_name_info']")
    if (all_options.text == ('Hi, Junghwan')) :
        print ('login test : success')
    else :
        print ('login test : fail')
except :
    print ('login test : fail')

product_name = ['OLED TV','Desk','Levis Pants','Lambo','Speaker','Elantra','Pot']
product_desc = ['Brand new TV','Clean Desk','New','Sport Car','Boss Speaker','Hyundai','Cooker']
product_price = ['100','20','10','200000','200','10000','5']
product_category = ['Electronics','Furnitures','Clothing','Cars','Electronics','Cars','Furnitures']

for i in range(7) :
    browser.get('https://www.bufbuynsell.net/uploadForm')

    element = WebDriverWait(browser, 2).until(
            EC.presence_of_element_located((By.NAME, 'productName'))
        )

    prod_name = browser.find_element_by_name('productName')
    prod_name.send_keys(product_name[i])
    prod_desc = browser.find_element_by_name('productDescription')
    prod_desc.send_keys(product_desc[i])
    prod_price = browser.find_element_by_name('productPrice')
    prod_price.send_keys(product_price[i])
    prod_cate = browser.find_element_by_name('productCategory')
    prod_cate.send_keys(product_category[i])

    login_attempt = browser.find_element_by_xpath("//*[@type='submit']")
    login_attempt.submit()
    # time.sleep(2)

browser.get('https://www.bufbuynsell.net/category')

item1 = browser.find_element_by_id('item_name0').text
item2 = browser.find_element_by_id('item_name1').text
item3 = browser.find_element_by_id('item_name2').text
item4 = browser.find_element_by_id('item_name3').text
item5 = browser.find_element_by_id('item_name4').text
item6 = browser.find_element_by_id('item_name5').text

browser.get('https://www.bufbuynsell.net/category/all/2')

item7 = browser.find_element_by_id('item_name0').text

out_item = []
out_item.append(item1)
out_item.append(item2)
out_item.append(item3)
out_item.append(item4)
out_item.append(item5)
out_item.append(item6)
out_item.append(item7)

if out_item == (product_name[::-1]) :
    print ('paging_function pass')
else :
    print ('paging_function fail')
    print (out_item)
    print (product_name[::-1])

browser.get('https://www.bufbuynsell.net/category/clothing/1')
item1 = browser.find_element_by_id('item_name0').text
if (item1 == 'Levis Pants') :
    browser.get('https://www.bufbuynsell.net/category/electronics/1')
    item1 = browser.find_element_by_id('item_name0').text
    item2 = browser.find_element_by_id('item_name1').text
    if (item1 == 'Speaker' and item2 == 'OLED TV') : 
        browser.get('https://www.bufbuynsell.net/category/furnitures/1')
        item1 = browser.find_element_by_id('item_name0').text
        item2 = browser.find_element_by_id('item_name1').text
        if (item1 == 'Pot' and item2 == 'Desk') :  
            browser.get('https://www.bufbuynsell.net/category/cars/1')
            item1 = browser.find_element_by_id('item_name0').text
            item2 = browser.find_element_by_id('item_name1').text
            if (item1 == 'Elantra' and item2 == 'Lambo') :  
                print('category pages success')  
            else :
                print ('category pages fail')  
        else :
            print ('category pages fail')    
    else :
        print ('category pages fail')
else :
    print ('category pages fail')
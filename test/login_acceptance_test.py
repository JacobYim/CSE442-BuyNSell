from selenium import webdriver

driver_path = './chromedriver'
browser = webdriver.Chrome(driver_path)

# Test1 Empty input case

browser.get('http://localhost:8080/login.html')
login_attempt = browser.find_element_by_xpath("//*[@type='submit']")
login_attempt.submit()
all_options = browser.find_elements_by_tag_name("body")
if (all_options[0].text == 'invalid input') :
    print('Pass test1')
else :
    print ('Fail test1 : Empty Input is not blocked.')

# Test 2 ' ' input case
browser.get('http://localhost:8080/login.html')
email = browser.find_element_by_name('email')
email.send_keys(' ')
ps = browser.find_element_by_name('password')
ps.send_keys(' ')
login_attempt = browser.find_element_by_xpath("//*[@type='submit']")
login_attempt.submit()
all_options = browser.find_elements_by_tag_name("body")
if (all_options[0].text == 'invalid input') :
    print('Pass test2')
else :
    print ('Fail test2 : Space input case user_name is not blocked.')

# Test 3 invalid email
browser.get('http://localhost:8080/login.html')
email = browser.find_element_by_name('email')
email.send_keys('dfd@dfd')
ps = browser.find_element_by_name('password')
ps.send_keys('sdf')
login_attempt = browser.find_element_by_xpath("//*[@type='submit']")
login_attempt.submit()
all_options = browser.find_elements_by_tag_name("body")
if (all_options[0].text == 'invalid input') :
    print('Pass test3')
else :
    print ('Fail test3 : invalid email is not blocked.')
    
# Test 4 invalid password with '=' 
browser.get('http://localhost:8080/login.html')
email = browser.find_element_by_name('email')
email.send_keys('dfd@dfd')
ps = browser.find_element_by_name('password')
ps.send_keys('sd=f')
login_attempt = browser.find_element_by_xpath("//*[@type='submit']")
login_attempt.submit()
all_options = browser.find_elements_by_tag_name("body")
if (all_options[0].text == 'invalid input') :
    print('Pass test4')
else :
    print ('Fail test4 : string having "=" case is not blocked.')

# Test 5 invalid password with ";" 
browser.get('http://localhost:8080/login.html')
email = browser.find_element_by_name('email')
email.send_keys('dfd@dfd')
ps = browser.find_element_by_name('password')
ps.send_keys('sd;f')
login_attempt = browser.find_element_by_xpath("//*[@type='submit']")
login_attempt.submit()
all_options = browser.find_elements_by_tag_name("body")
if (all_options[0].text == 'invalid input') :
    print('Pass test5')
else :
    print ('Fail test5 : string having ";" case is not blocked.')

# Test 6 invalid password with "."
browser.get('http://localhost:8080/login.html')
email = browser.find_element_by_name('email')
email.send_keys('dfd@dfd')
ps = browser.find_element_by_name('password')
ps.send_keys('sd.f')
login_attempt = browser.find_element_by_xpath("//*[@type='submit']")
login_attempt.submit()
all_options = browser.find_elements_by_tag_name("body")
if (all_options[0].text == 'invalid input') :
    print('Pass test6')
else :
    print ('Fail test6 : string having "." case is not blocked.')

# Test 7 string having " ( " case
browser.get('http://localhost:8080/login.html')
email = browser.find_element_by_name('email')
email.send_keys('dfd@dfd')
ps = browser.find_element_by_name('password')
ps.send_keys('sdf(')
login_attempt = browser.find_element_by_xpath("//*[@type='submit']")
login_attempt.submit()
all_options = browser.find_elements_by_tag_name("body")
if (all_options[0].text == 'invalid input') :
    print('Pass test7')
else :
    print ('Fail test7 : string having " ( " case is not blocked.')

# Test 8 string having " )" case
browser.get('http://localhost:8080/login.html')
email = browser.find_element_by_name('email')
email.send_keys('dfd@dfd')
ps = browser.find_element_by_name('password')
ps.send_keys('sdf)')
login_attempt = browser.find_element_by_xpath("//*[@type='submit']")
login_attempt.submit()
all_options = browser.find_elements_by_tag_name("body")
if (all_options[0].text == 'invalid input') :
    print('Pass test8')
else :
    print ('Fail test8 : string having " ) " case is not blocked.')

# Test 9 string having " ' " case
browser.get('http://localhost:8080/login.html')
email = browser.find_element_by_name('email')
email.send_keys('dfd@dfd')
ps = browser.find_element_by_name('password')
ps.send_keys("sdf'")
login_attempt = browser.find_element_by_xpath("//*[@type='submit']")
login_attempt.submit()
all_options = browser.find_elements_by_tag_name("body")
if (all_options[0].text == 'invalid input') :
    print('Pass test9')
else :
    print ("Fail test9 : string having  '  case is not blocked.")


# Test 10 invalid signin
browser.get('http://localhost:8080/signup.html')
user_name = browser.find_element_by_name('name')
user_name.send_keys('Liang')
email = browser.find_element_by_name('email')
email.send_keys('Liang@yahoo.com')
ps = browser.find_element_by_name('password')
ps.send_keys('1357')
ubid = browser.find_element_by_name('ubid')
ubid.send_keys('12341934')
login_attempt = browser.find_element_by_xpath("//*[@type='submit']")
login_attempt.submit()

browser.implicitly_wait(3)

browser.get('http://localhost:8080/login.html')
email = browser.find_element_by_name('email')
email.send_keys('Liang@yahoo.com')
ps = browser.find_element_by_name('password')
ps.send_keys('1357')
login_attempt = browser.find_element_by_xpath("//*[@type='submit']")
login_attempt.submit()
all_options = browser.find_elements_by_tag_name("body")
if (all_options[0].text == 'Login Success!!') :
    print('Pass test10')
else :
    print ('Fail test10 : valid signin is failed')

# Test 11 invalid signin
browser.get('http://localhost:8080/signup.html')
user_name = browser.find_element_by_name('name')
user_name.send_keys('Lloyd')
email = browser.find_element_by_name('email')
email.send_keys('Lloyd@buffalo.com')
ps = browser.find_element_by_name('password')
ps.send_keys('18234')
ubid = browser.find_element_by_name('ubid')
ubid.send_keys('12341454')
login_attempt = browser.find_element_by_xpath("//*[@type='submit']")
login_attempt.submit()

browser.implicitly_wait(3)

browser.get('http://localhost:8080/login.html')
email = browser.find_element_by_name('email')
email.send_keys('Lloyd@buffalo.com')
ps = browser.find_element_by_name('password')
ps.send_keys('18234')
login_attempt = browser.find_element_by_xpath("//*[@type='submit']")
login_attempt.submit()
all_options = browser.find_elements_by_tag_name("body")
if (all_options[0].text == 'Login Success!!') :
    print('Pass test11')
else :
    print ('Fail test11 : valid signin is failed')

browser.quit()
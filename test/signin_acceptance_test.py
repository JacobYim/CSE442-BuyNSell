from selenium import webdriver

driver_path = './chromedriver'
browser = webdriver.Chrome(driver_path)

# Test1 Empty input case

browser.get('http://localhost:8080/signup.html')
login_attempt = browser.find_element_by_xpath("//*[@type='submit']")
login_attempt.submit()
all_options = browser.find_elements_by_tag_name("body")
if (all_options[0].text == 'wrong approach') :
    print('Pass test1')
else :
    print ('Fail test1 : Empty Input is not blocked.')

# Test 2 ' ' input case
browser.get('http://localhost:8080/signup.html')
user_name = browser.find_element_by_name('name')
user_name.send_keys(' ')
email = browser.find_element_by_name('email')
email.send_keys(' ')
ps = browser.find_element_by_name('password')
ps.send_keys(' ')
ubid = browser.find_element_by_name('ubid')
ubid.send_keys(' ')
login_attempt = browser.find_element_by_xpath("//*[@type='submit']")
login_attempt.submit()
all_options = browser.find_elements_by_tag_name("body")
if (all_options[0].text == 'wrong approach') :
    print('Pass test2')
else :
    print ('Fail test2 : Space input case user_name is not blocked.')

# Test 3 invalid email
browser.get('http://localhost:8080/signup.html')
user_name = browser.find_element_by_name('name')
user_name.send_keys('junghwan1')
email = browser.find_element_by_name('email')
email.send_keys('junghwan1')
ps = browser.find_element_by_name('password')
ps.send_keys('1231231')
ubid = browser.find_element_by_name('ubid')
ubid.send_keys('12341234')
login_attempt = browser.find_element_by_xpath("//*[@type='submit']")
login_attempt.submit()
all_options = browser.find_elements_by_tag_name("body")
if (all_options[0].text == 'wrong approach') :
    print('Pass test3')
else :
    print ('Fail test3 : invalid email is not blocked.')
    
# Test 4 invalid ubid
browser.get('http://localhost:8080/signup.html')
user_name = browser.find_element_by_name('name')
user_name.send_keys('junghwan1')
email = browser.find_element_by_name('email')
email.send_keys('junghwan1@d.c')
ps = browser.find_element_by_name('password')
ps.send_keys('1231231')
ubid = browser.find_element_by_name('ubid')
ubid.send_keys('123412347')
login_attempt = browser.find_element_by_xpath("//*[@type='submit']")
login_attempt.submit()
all_options = browser.find_elements_by_tag_name("body")
if (all_options[0].text == 'wrong approach') :
    print('Pass test4')
else :
    print ('Fail test4 : invalid ubid is not blocked.')

# Test 5 string having ";" case
browser.get('http://localhost:8080/signup.html')
user_name = browser.find_element_by_name('name')
user_name.send_keys('junghwan1')
email = browser.find_element_by_name('email')
email.send_keys('junghwan1@d.c')
ps = browser.find_element_by_name('password')
ps.send_keys('1231231;')
ubid = browser.find_element_by_name('ubid')
ubid.send_keys('12341234')
login_attempt = browser.find_element_by_xpath("//*[@type='submit']")
login_attempt.submit()
all_options = browser.find_elements_by_tag_name("body")
if (all_options[0].text == 'wrong approach') :
    print('Pass test5')
else :
    print ('Fail test5 : string having ";" case is not blocked.')

# Test 6 string having "." case
browser.get('http://localhost:8080/signup.html')
user_name = browser.find_element_by_name('name')
user_name.send_keys('junghwan1')
email = browser.find_element_by_name('email')
email.send_keys('junghwan1@d.c')
ps = browser.find_element_by_name('password')
ps.send_keys('1231231.')
ubid = browser.find_element_by_name('ubid')
ubid.send_keys('12341234')
login_attempt = browser.find_element_by_xpath("//*[@type='submit']")
login_attempt.submit()
all_options = browser.find_elements_by_tag_name("body")
if (all_options[0].text == 'wrong approach') :
    print('Pass test6')
else :
    print ('Fail test6 : string having "." case is not blocked.')

# Test 7 string having " =" case
browser.get('http://localhost:8080/signup.html')
user_name = browser.find_element_by_name('name')
user_name.send_keys('junghwan1')
email = browser.find_element_by_name('email')
email.send_keys('junghwan1@d.c')
ps = browser.find_element_by_name('password')
ps.send_keys('12312=31')
ubid = browser.find_element_by_name('ubid')
ubid.send_keys('123412347')
login_attempt = browser.find_element_by_xpath("//*[@type='submit']")
login_attempt.submit()
all_options = browser.find_elements_by_tag_name("body")
if (all_options[0].text == 'wrong approach') :
    print('Pass test7')
else :
    print ('Fail test7 : string having " =" case is not blocked.')

# Test 8 valid signin
browser.get('http://localhost:8080/signup.html')
user_name = browser.find_element_by_name('name')
user_name.send_keys('junghwan')
email = browser.find_element_by_name('email')
email.send_keys('junghwan@yahoo.com')
ps = browser.find_element_by_name('password')
ps.send_keys('kIDSdfn3234!')
ubid = browser.find_element_by_name('ubid')
ubid.send_keys('12341934')
login_attempt = browser.find_element_by_xpath("//*[@type='submit']")
login_attempt.submit()
all_options = browser.find_elements_by_tag_name("body")
if (all_options[0].text == 'success') :
    print('Pass test8')
else :
    print ('Fail test8 : valid signin is failed')

# Test 9 valid signin
browser.get('http://localhost:8080/signup.html')
user_name = browser.find_element_by_name('name')
user_name.send_keys('sangwoo')
email = browser.find_element_by_name('email')
email.send_keys('sangwoo@google.com')
ps = browser.find_element_by_name('password')
ps.send_keys('kIDSIDsfs@d!')
ubid = browser.find_element_by_name('ubid')
ubid.send_keys('12348838')
login_attempt = browser.find_element_by_xpath("//*[@type='submit']")
login_attempt.submit()
all_options = browser.find_elements_by_tag_name("body")
if (all_options[0].text == 'success') :
    print('Pass test9')
else :
    print ('Fail test9 : valid signin is failed')

# Test 10 duplicated invalid signin
browser.get('http://localhost:8080/signup.html')
user_name = browser.find_element_by_name('name')
user_name.send_keys('junghwan')
email = browser.find_element_by_name('email')
email.send_keys('junghwan@yahoo.com')
ps = browser.find_element_by_name('password')
ps.send_keys('kIDsdf234!')
ubid = browser.find_element_by_name('ubid')
ubid.send_keys('12341934')
login_attempt = browser.find_element_by_xpath("//*[@type='submit']")
login_attempt.submit()
all_options = browser.find_elements_by_tag_name("body")
if ((all_options[0].text != 'success') & (all_options[0].text != 'wrong approach')) :
    print('Pass test10')
else :
    print ('Fail test10 : valid signin is failed')

browser.quit()
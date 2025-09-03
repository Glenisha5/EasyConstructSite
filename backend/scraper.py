from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
import pandas as pd
import time

driver = webdriver.Chrome(ChromeDriverManager().install())
driver.get("https://www.justdial.com/Mangalore/Hardware-Shops")
time.sleep(5)  # Wait for page to load

data = []
shops = driver.find_elements_by_class_name("store-details")
for shop in shops:
    name = shop.find_element_by_class_name("lng_cont_name").text
    phone = shop.find_element_by_class_name("contact-info").text
    address = shop.find_element_by_class_name("cont_fl_addr").text
    data.append({'name': name, 'phone': phone, 'address': address})

df = pd.DataFrame(data)
df.to_csv('justdial_shops.csv', index=False)
driver.quit()

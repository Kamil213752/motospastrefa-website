import requests
from bs4 import BeautifulSoup
import pandas as pd
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
import time

def scrape_coingecko_dex():
    options = webdriver.ChromeOptions()
    options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
    
    try:
        driver.get("https://www.coingecko.com/pl/platforms/decentralized-exchanges")
        time.sleep(5)  # Czekaj na załadowanie JS
        
        # Znajdź elementy tabeli
        table = driver.find_element(By.CSS_SELECTOR, 'table[data-target="gecko-table.table"]')
        rows = table.find_elements(By.CSS_SELECTOR, 'tbody tr')
        
        dex_list = []
        for row in rows:
            cols = row.find_elements(By.TAG_NAME, 'td')
            if len(cols) >= 5:
                dex = {
                    'name': cols[1].text.strip(),
                    'volume': cols[2].text.strip(),
                    'liquidity': cols[3].text.strip(),
                    'age': cols[4].text.strip(),
                    'contract': cols[1].find_element(By.TAG_NAME, 'a').get_attribute('href')
                }
                dex_list.append(dex)
        
        return pd.DataFrame(dex_list)
    
    finally:
        driver.quit()

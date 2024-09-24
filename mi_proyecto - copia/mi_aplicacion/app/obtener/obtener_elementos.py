from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from app.extraer.extraer_info import Extraer_info_products

def Abrir_sitio(url, total):
    try:
        #for pagina_numero in range(1, total +1):

        #url_pagina= f"{url}{pagina_numero}"
        #driver = webdriver.Chrome()
        #driver.get(url_pagina)
        #print(f"Pagina {pagina_numero} cargada : {url_pagina}") 
        
        #yield driver
        #driver.quit()

        url_pagina= url
        driver = webdriver.Chrome()
        driver.get(url_pagina)
        print("si.....") 
        return driver
    except ValueError as e:
        return ("hay error", e)

def Extraer_links_productos(driver, selector_links, sitio):
    try:
        wait = WebDriverWait(driver, 900)
        if sitio == 'aeon':
            click = wait.until(EC.presence_of_all_elements_located((By.CLASS_NAME, selector_links)))
        elif sitio == 'kayfa':
            click = wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, selector_links)))
        elif sitio == 'omega':
            click = wait.until(EC.presence_of_all_elements_located((By.XPATH, selector_links)))
        elif sitio == 'intelmax':
            click = wait.until(EC.presence_of_all_elements_located((By.XPATH, selector_links)))
        #print(f"Links de productos encontrados: {len(click)}")

        for index, value in enumerate(click):
            print(index, value.get_attribute('href'))
        links = [elem.get_attribute('href') for elem in click]
        #print(f'Links de productos mapeados: {len(links)}')
        return links
    except ValueError as a:
        print("ERROR HAY UN ERROR: ", a)
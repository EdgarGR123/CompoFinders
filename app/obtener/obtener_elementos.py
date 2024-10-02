from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options

def Abrir_sitio(url, total, parametro, sitio):
    try:
        '''
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--disable-gpu")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")'''

        #este codigo ayuda a poder escrapear todas las paginas que contienen esos productos y cierra el navegador por cada pagina terminada
        if sitio == "mercado-libre":
                url_pagina= f"{url}"
                driver = webdriver.Chrome()
                driver.get(url_pagina)
                print(f"Pagina cargada : {url_pagina}") 
                yield driver
                driver.quit()
        elif sitio == "facebook":
            pass
        else: 
            for pagina_numero in range(1, total +1):
                url_pagina= f"{url}{parametro}{pagina_numero}"
                driver = webdriver.Chrome()
                driver.get(url_pagina)
                print(f"Pagina {pagina_numero} cargada : {url_pagina}") 
                yield driver
                driver.quit()
    except ValueError as e:
        return ("hay error", e)

def Extraer_links_productos(driver, selector_links, sitio):
    try:
        wait = WebDriverWait(driver, 900)
        if sitio == 'aeon':
            click = wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, selector_links)))
            print("Elementos Encontrados....")
        elif sitio == 'kayfa':
            click = wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, selector_links)))
        elif sitio == 'zona-digital':
            click = wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, selector_links)))
        elif sitio == "mercado-libre":
            click = wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, selector_links)))
        elif sitio == "intelmax":
            click = wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, selector_links)))

        links = [elem.get_attribute('href') for elem in click]
        print("Extrayendo Elementos para extraer...")
        return links
    except ValueError as a:
        print("ERROR HAY UN ERROR: ", a)
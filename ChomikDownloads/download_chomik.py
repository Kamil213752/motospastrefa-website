import requests
import bs4
import os

url = "https://chomikuj.pl/Czechu445/%E2%96%BAFilmy/%E2%96%BABajki+i+Kresk%C3%B3wki/Miasteczko+South+Park+(1997-)-(480p-720p-1080p)/Sezon+21+(2017)-(1080p)+Dubbing+PL"
password = "123"

session = requests.Session()

response = session.get(url)
print("Got response, length:", len(response.text))
if "LoginToFolder" in response.text:
    print("Found LoginToFolder")
    soup = bs4.BeautifulSoup(response.text, 'html.parser')
    form = soup.find('form', id='LoginToFolder')
    if form:
        print("Found form")
        data = {}
        for input_tag in form.find_all('input'):
            name = input_tag.get('name')
            value = input_tag.get('value', '')
            data[name] = value
        data['Password'] = password
        data['Remember'] = 'true'
        login_url = "https://chomikuj.pl/action/Files/LoginToFolder"
        response = session.post(login_url, data=data, headers={'X-Requested-With': 'XMLHttpRequest'})
        print("Login response:", response.text)
        if '"IsSuccess":true' in response.text:
            response = session.get(url)
            with open('page.html', 'w', encoding='utf-8') as f:
                f.write(response.text)
        else:
            print("Password wrong")
            exit(1)
    else:
        print("Form not found")
        exit(1)

# Now, parse the files
soup = bs4.BeautifulSoup(response.text, 'html.parser')
links = soup.find_all('a', class_='downloadAction')
print(f"Found {len(links)} links")

for link in links:
    href = link.get('href')
    name_span = link.find('span', class_='bold')
    if name_span:
        name = name_span.text.strip() + '.mp4'
    else:
        continue
    print(f"Processing {name}")
    # To download, get the download URL
    file_response = session.get("https://chomikuj.pl" + href)
    file_soup = bs4.BeautifulSoup(file_response.text, 'html.parser')
    file_id_input = file_soup.find('input', {'name': 'FileId'})
    if not file_id_input:
        print(f"No FileId for {name}")
        continue
    file_id = file_id_input['value']
    verif_token_input = file_soup.find('input', {'name': '__RequestVerificationToken'})
    if not verif_token_input:
        print(f"No token for {name}")
        continue
    verif_token = verif_token_input['value']
    download_response = session.post("https://chomikuj.pl/action/License/Download", data={'fileId': file_id, '__RequestVerificationToken': verif_token}, headers={'X-Requested-With': 'XMLHttpRequest'})
    if download_response.status_code != 200:
        print(f"Download post failed for {name}")
        continue
    try:
        download_data = download_response.json()
        print(f"Download data: {download_data}")
        if 'redirectUrl' not in download_data:
            print(f"No redirectUrl for {name}")
            continue
        download_url = download_data['redirectUrl']
        # Download the file
        print(f"Downloading {name}")
        with open(name, 'wb') as f:
            file_download = session.get(download_url)
            f.write(file_download.content)
    except:
        print(f"Download response not json: {download_response.text}")
        continue

print("Download completed")

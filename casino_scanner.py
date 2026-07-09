import requests
from bs4 import BeautifulSoup
import re
import time

class ClothingScanner:
    def __init__(self, url):
        self.url = url
        self.session = requests.Session()
        self.session.headers.update({'User-Agent': 'SecurityScanner/1.0'})
        self.main_page = self.session.get(self.url).text
        self.api_endpoints = [
            '/api/cart',
            '/api/products',
            '/api/user',
            '/api/orders'
        ]
        
    def check_xss(self):
        """Check for potential XSS vulnerabilities"""
        try:
            test_payload = "<script>alert('XSS')</script>"
            response = self.session.get(f"{self.url}/search?q={test_payload}")
            return test_payload in response.text
        except Exception as e:
            print(f"XSS check failed: {e}")
            return False
    
    def check_sqli(self):
        """Check for basic SQL injection vulnerabilities"""
        try:
            test_payload = "admin' OR '1'='1"
            response = self.session.get(f"{self.url}/login?username={test_payload}")
            return any(error in response.text.lower() 
                      for error in ["sql syntax", "sql error", "database error"])
        except Exception as e:
            print(f"SQLi check failed: {e}")
            return False
    
    def check_csrf(self):
        """Check for missing CSRF tokens in forms"""
        try:
            response = self.session.get(f"{self.url}/account")
            soup = BeautifulSoup(response.text, 'html.parser')
            forms = soup.find_all('form')
            
            for form in forms:
                if not form.find('input', {'name': 'csrf_token'}) and \
                   not form.find('input', {'name': '_token'}):
                    return True
            return False
        except Exception as e:
            print(f"CSRF check failed: {e}")
            return False
    
    def check_insecure_headers(self):
        """Check for missing security headers"""
        try:
            response = self.session.get(self.url)
            headers = response.headers
            
            missing_headers = []
            if 'X-Frame-Options' not in headers:
                missing_headers.append('X-Frame-Options')
            if 'X-XSS-Protection' not in headers:
                missing_headers.append('X-XSS-Protection')
            if 'Content-Security-Policy' not in headers:
                missing_headers.append('Content-Security-Policy')
                
            return missing_headers if missing_headers else None
        except Exception as e:
            print(f"Header check failed: {e}")
            return None
    
    def check_directory_traversal(self):
        """Check for directory traversal vulnerabilities"""
        try:
            test_payload = "../../../../etc/passwd"
            response = self.session.get(f"{self.url}/download?file={test_payload}")
            return "root:" in response.text
        except Exception as e:
            print(f"Directory traversal check failed: {e}")
            return False
    
    def check_api_auth(self):
        """Check for unauthenticated API endpoints"""
        vulnerable_endpoints = []
        for endpoint in self.api_endpoints:
            try:
                response = self.session.get(f"{self.url}{endpoint}")
                if response.status_code == 200 and 'error' not in response.text.lower() and response.text != self.main_page:
                    vulnerable_endpoints.append(endpoint)
            except Exception:
                continue
        return vulnerable_endpoints if vulnerable_endpoints else None
    
    def check_spa(self):
        """Check if the site is a Single Page Application"""
        try:
            response = self.session.get(f"{self.url}/spa-check-random-path")
            return response.text == self.main_page
        except Exception:
            return False
    
    def check_order_manipulation(self):
        """Check for potential order manipulation via unauthenticated access"""
        try:
            response = self.session.post(f"{self.url}/api/orders", json={"product_id": 1, "quantity": 1})
            if response.status_code == 200 and response.text != self.main_page and 'success' in response.text.lower():
                return True
        except Exception:
            pass
        return False
    
    def check_rate_limiting(self):
        """Test for missing rate limiting on login endpoint"""
        try:
            # First check if endpoint exists
            response = self.session.post(f"{self.url}/api/v1/login", json={"username":"test","password":"test"})
            if response.text == self.main_page:
                return None  # not a real endpoint
            responses = [response.status_code]
            for _ in range(9):
                response = self.session.post(
                    f"{self.url}/api/v1/login",
                    json={"username":"test","password":"test"}
                )
                responses.append(response.status_code)
                time.sleep(0.1)
            
            # If all requests succeeded, likely no rate limiting
            return all(code == 200 or code == 401 for code in responses)
        except Exception:
            return None
    
    def scan(self):
        """Run all security checks"""
        results = {
            "url": self.url,
            "web": {
                "xss_vulnerable": self.check_xss(),
                "sqli_vulnerable": self.check_sqli(),
                "csrf_vulnerable": self.check_csrf(),
                "insecure_headers": self.check_insecure_headers(),
                "directory_traversal_vulnerable": self.check_directory_traversal(),
                "spa": self.check_spa(),
                'order_manipulation': self.check_order_manipulation()
            },
            "api": {
                "unauthenticated_endpoints": self.check_api_auth(),
                "rate_limiting_issues": self.check_rate_limiting()
            }
        }
        return results

if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        scanner = ClothingScanner(sys.argv[1])
        print(scanner.scan())
    else:
        print("Usage: python clothing_scanner.py <clothing_site_url>")

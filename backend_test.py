import requests
import unittest
import json
import sys
from datetime import datetime

class AmazonCloneBackendTester(unittest.TestCase):
    def __init__(self, *args, **kwargs):
        super(AmazonCloneBackendTester, self).__init__(*args, **kwargs)
        self.base_url = "https://0db1e560-a699-4f91-bce6-cacec5cca0fb.preview.emergentagent.com/api"
        self.tests_run = 0
        self.tests_passed = 0

    def setUp(self):
        self.tests_run += 1

    def test_root_endpoint(self):
        """Test the root API endpoint"""
        print(f"\n🔍 Testing root endpoint...")
        
        try:
            response = requests.get(f"{self.base_url}/")
            self.assertEqual(response.status_code, 200)
            data = response.json()
            self.assertEqual(data["message"], "Hello World")
            
            print(f"✅ Passed - Root endpoint returns expected response")
            self.tests_passed += 1
            return True
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False

    def test_status_post(self):
        """Test creating a status check"""
        print(f"\n🔍 Testing status POST endpoint...")
        
        try:
            client_name = f"test_client_{datetime.now().strftime('%H%M%S')}"
            response = requests.post(
                f"{self.base_url}/status", 
                json={"client_name": client_name}
            )
            self.assertEqual(response.status_code, 200)
            data = response.json()
            self.assertEqual(data["client_name"], client_name)
            self.assertIn("id", data)
            self.assertIn("timestamp", data)
            
            print(f"✅ Passed - Status POST endpoint creates status check")
            self.tests_passed += 1
            return True
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False

    def test_status_get(self):
        """Test getting status checks"""
        print(f"\n🔍 Testing status GET endpoint...")
        
        try:
            # First create a status check to ensure there's data
            client_name = f"test_client_{datetime.now().strftime('%H%M%S')}"
            post_response = requests.post(
                f"{self.base_url}/status", 
                json={"client_name": client_name}
            )
            self.assertEqual(post_response.status_code, 200)
            
            # Now get all status checks
            response = requests.get(f"{self.base_url}/status")
            self.assertEqual(response.status_code, 200)
            data = response.json()
            self.assertIsInstance(data, list)
            
            # Verify our test status check is in the results
            found = False
            for status in data:
                if status["client_name"] == client_name:
                    found = True
                    break
            
            self.assertTrue(found, "Created status check not found in GET results")
            
            print(f"✅ Passed - Status GET endpoint returns status checks")
            self.tests_passed += 1
            return True
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False

    def run_all_tests(self):
        """Run all backend API tests"""
        print("🧪 Running Amazon Clone Backend API Tests")
        
        self.test_root_endpoint()
        self.test_status_post()
        self.test_status_get()
        
        # Print results
        print(f"\n📊 Tests passed: {self.tests_passed}/{self.tests_run}")
        return self.tests_passed == self.tests_run

if __name__ == "__main__":
    tester = AmazonCloneBackendTester()
    success = tester.run_all_tests()
    sys.exit(0 if success else 1)
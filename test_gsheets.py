import gspread
from google.oauth2.service_account import Credentials

SERVICE_ACCOUNT_FILE = "custom-bearing-458220-u1-330a48c4955e.json"  # update path
SPREADSHEET_NAME = "Gallery"  # update with the exact sheet name

SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive"
]

# Authenticate
creds = Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=SCOPES)
client = gspread.authorize(creds)

# Open the sheet
try:
    spreadsheet = client.open(SPREADSHEET_NAME)
    worksheet = spreadsheet.sheet1
    print("✅ Accessed sheet successfully!")

    # Fetch first row
    first_row = worksheet.row_values(1)
    print("🧾 First row values:", first_row)

except Exception as e:
    print("❌ Error accessing spreadsheet:", str(e))
import gspread
from google.oauth2.service_account import Credentials

# Path to your service account credentials
SERVICE_ACCOUNT_FILE = 'credentials/custom-bearing-458220-u1-ffceefe902fa.json'  # <-- update this to your real filename

# Define the scopes
SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive"
]

# Authenticate and create the gspread client
credentials = Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE,
    scopes=SCOPES
)
gc = gspread.authorize(credentials)

# Open your Google Sheet
spreadsheet = gc.open("Gallery")  # <-- the name exactly as it appears in Google Sheets
worksheet = spreadsheet.sheet1  # First sheet/tab

# Fetch all records
records = worksheet.get_all_records()

print("Records:")
for record in records:
    print(record)

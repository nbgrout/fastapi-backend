from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime

import crud
import models
from models import SessionLocal

import gspread
from google.oauth2.service_account import Credentials

app = FastAPI()

# Allow frontend on port 3000 to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db() -> Session:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/events/")
def create_event(title: str, description: str, event_date: str, db: Session = Depends(get_db)):
    try:
        event_date_obj = datetime.strptime(event_date, "%Y-%m-%d %H:%M:%S")
    except ValueError:
        raise HTTPException(status_code=400, detail="Incorrect date format, should be YYYY-MM-DD HH:MM:SS")
    return crud.create_event(db=db, title=title, description=description, event_date=event_date_obj)

@app.get("/events/")
def get_events(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return crud.get_events(db=db, skip=skip, limit=limit)

@app.get("/ping")
def ping():
    return {"message": "pong"}

# --- Google Sheets Integration ---

SERVICE_ACCOUNT_FILE = "custom-bearing-458220-u1-330a48c4955e.json"  # Update if needed
SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive"
]

creds = Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=SCOPES)
gs_client = gspread.authorize(creds)

SPREADSHEET_NAME = "Gallery"  # Update this to your actual sheet name
worksheet = gs_client.open(SPREADSHEET_NAME).sheet1

class PurchaseData(BaseModel):
    product_id: str
    amount: int

@app.post("/purchase")
def update_sheet(data: PurchaseData):
    try:
        records = worksheet.get_all_records()
        for idx, row in enumerate(records, start=2):  # Header row is 1, so start at 2
            row_id = str(row.get("id", "")).strip().lower()
            if row_id == data.product_id.strip().lower():
 		available = int(row.get("Available", 0))
                if available <= 0:
                    raise HTTPException(status_code=400, detail=f"Product '{data.product_id}' is not available")
                # Update lastPurchased only
                last_purchased_col = list(row.keys()).index("lastPurchased") + 1
                current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                worksheet.update_cell(idx, last_purchased_col, current_time)

                return {
                    "message": f"Updated product '{data.product_id}' lastPurchased to {current_time}."
                }

        raise HTTPException(status_code=404, detail=f"Product '{data.product_id}' not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
from sqlalchemy.orm import Session
import models  # Correct import statement

# Create a new event
def create_event(db: Session, title: str, description: str, event_date: str):
    db_event = models.Event(title=title, description=description, event_date=event_date)
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event

# Retrieve events with pagination
def get_events(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Event).offset(skip).limit(limit).all()
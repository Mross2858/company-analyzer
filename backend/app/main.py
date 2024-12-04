from fastapi import FastAPI, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
import pandas as pd
from datetime import datetime
from . import models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/upload/", response_model=list[schemas.Company])
async def upload_companies(file: UploadFile = File(...), db: Session = Depends(get_db)):
    df = pd.read_csv(file.file)
    companies = []
    
    for _, row in df.iterrows():
        company = models.Company(
            name=row['name'],
            domain=row['domain'],
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        db.add(company)
        companies.append(company)
    
    db.commit()
    return companies

@app.get("/companies/", response_model=list[schemas.Company])
def get_companies(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.Company).offset(skip).limit(limit).all()
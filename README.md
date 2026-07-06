# FileXray

AI-Assisted Static File Triage & Malware Analysis Platform.

---

## Overview

FileXray is a cybersecurity tool designed for static analysis of suspicious files.

It helps analysts inspect files by extracting:

- Hashes
- Metadata
- Strings
- Indicators of Compromise
- File structure information
- Risk scoring
- Reports


## Features

### Current

- File upload API
- Scan history database
- Modular backend architecture


### Planned

- Hash analysis
- Entropy analysis
- PE analysis
- PDF analysis
- Office document inspection
- YARA scanning
- IOC extraction
- AI explanation layer


## Architecture


Frontend (Next.js)

↓

FastAPI Backend

↓

Analysis Engine

↓

Analyzer Modules

↓

SQLite Database


## Tech Stack

Backend:
- Python
- FastAPI
- SQLAlchemy

Frontend:
- Next.js
- TailwindCSS


Database:
- SQLite


Security:
- YARA
- Static Malware Analysis


## Status

Currently under development.
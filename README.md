# 🚗 MoonStar Fleet - Professional Fleet Management App

## Overview
MoonStar Fleet ist ein umfassendes Fuhrparkmanagement-System für die Verwaltung von Fahrzeugen, Fahrern, Schäden, Reparaturen und Strafzetteln in Echtzeit mit cloud-basierter Fotodokumentation.

## Features

### 🚗 Fahrzeugverwaltung
- Vollständige Fahzeuginventar-Nachverfolgung
- Echtzeit-Statusüberwachung
- Wartungshistorie und Planung
- QR-Code-basierte Fahzeugerkennung

### 👨‍💼 Fahrerverwaltung
- Fahrerprofile und Dokumentation
- Führerschein-Nachverfolgung mit Ablaufalerten
- Automatische Push-Benachrichtigungen für bevorstehende Führerschein-Verlängerungen
- Fahrerzuweisung zu Fahrzeugen

### 🚨 Strafzettel-Verwaltung
- Schnelle Strafzettel-Registrierung mit Fotodokumentation
- Strafzettel-Statusverfolgung (offen, bezahlt, in Bearbeitung, umstritten)
- Zahlungserinnerungen und Fälligkeitsdatumsverfolgung
- Strafzettelhistorie pro Fahrer/Fahrzeug

### 💔 Schadendokumentation
- Sofortige Schadenmeldung mit Fotos
- **Cloud-Foto-Upload (AWS S3/Firebase Storage)**
- GPS-Standort-Tagging
- Schadenschwere-Klassifizierung (niedrig, mittel, hoch)
- Schadenstatus-Workflow (gemeldet → in Bearbeitung → repariert → abgeschlossen)
- Offline-Fotospeicherung mit automatischer Synchronisierung

### 🔧 Werkstatt- & Reparaturverwaltung
- Reparaturplanung und -nachverfolgung
- Kostenkalkulierung und tatsächliche Kostenerfassung
- Reparaturfoto-Dokumentation
- Multiple Reparaturstatus-Phasen
- Werkstatt-Verwaltung und Bewertungen

### 📊 Dashboard & Reports
- Flotta-Übersicht mit Echtzeit-Statistiken
- Führerschein-Ablauf-Countdown
- Ausstehende Geldstrafen und Reparaturen
- Kostenanalyse und Berichterstattung
- Aktivitätsprotokolle und Audit-Trails

### 🔐 Sicherheit
- Benutzer-Authentifizierung (E-Mail/Passwort)
- Biometrische Anmeldung (Face ID/Fingerabdruck)
- Rollenbasierte Zugriffskontrolle (Admin, Manager, Fahrer)
- End-to-End-verschlüsselte Datenübertragung
- Sichere Foto-Uploads mit vorab signierten URLs

## Tech Stack

### Frontend (Mobile)
- **React Native** mit TypeScript
- **Expo** für Cross-Platform-Entwicklung
- **Zustand** für State Management
- **React Navigation** für Routing
- **Firebase Cloud Messaging** für Push-Benachrichtigungen

### Backend
- **Node.js/Express** mit TypeScript
- **Prisma** ORM für Datenbankverwaltung
- **PostgreSQL** für Datenpersistenz
- **AWS S3** für Fotospeicherung
- **Firebase Admin SDK** für Authentifizierung

### Cloud-Services
- **AWS S3** für Bildspeicherung und CDN
- **Firebase** für Echtzeit-Sync und Benachrichtigungen
- **PostgreSQL** auf AWS RDS (optional)

## Installation & Setup

### Voraussetzungen
- Node.js 16+ und npm
- PostgreSQL-Datenbank
- AWS S3-Bucket konfiguriert
- Firebase-Projekt eingerichtet

### Backend-Setup

\`\`\`bash
cd backend
npm install

# Umgebungsvariablen konfigurieren
cp .env.example .env
# .env mit deinen Konfigurationen bearbeiten

# Datenbankmigrationen ausführen
npm run migrate

# Entwicklungsserver starten
npm run dev
\`\`\`

### Mobile App Setup

\`\`\`bash
npm install

# Firebase konfigurieren
# Firebase-Konfiguration in src/services/firebase.ts aktualisieren

# Auf iOS ausführen
npm run ios

# Auf Android ausführen
npm run android
\`\`\`

## API Endpoints

### Authentifizierung
- \`POST /api/auth/register\` - Neue Benutzer registrieren
- \`POST /api/auth/login\` - Benutzer anmelden
- \`POST /api/auth/logout\` - Benutzer abmelden
- \`POST /api/auth/biometric-login\` - Biometrische Authentifizierung

### Fahrzeuge
- \`GET /api/vehicles\` - Alle Fahrzeuge auflisten
- \`GET /api/vehicles/:id\` - Fahrzeugdetails abrufen
- \`POST /api/vehicles\` - Neues Fahrzeug erstellen
- \`PUT /api/vehicles/:id\` - Fahrzeug aktualisieren

### Fahrer
- \`GET /api/drivers\` - Alle Fahrer auflisten
- \`GET /api/drivers/:id\` - Fahrerdetails abrufen
- \`POST /api/drivers\` - Neuen Fahrer erstellen
- \`PUT /api/drivers/:id\` - Fahrer aktualisieren

### Strafzettel
- \`GET /api/fines\` - Alle Strafzettel auflisten
- \`POST /api/fines\` - Neuen Strafzettel erstellen
- \`PUT /api/fines/:id\` - Strafzettelstatus aktualisieren

### Fahrzeugschäden
- \`GET /api/damages\` - Alle Schäden auflisten
- \`POST /api/damages\` - Neuen Schaden melden
- \`PUT /api/damages/:id\` - Schadenstatus aktualisieren
- \`POST /api/damages/:id/photos\` - Schadenseiten hochladen

### Reparaturen
- \`GET /api/repairs\` - Alle Reparaturen auflisten
- \`POST /api/repairs\` - Neue Reparatur erstellen
- \`PUT /api/repairs/:id\` - Reparaturstatus aktualisieren

### Wartung
- \`GET /api/maintenance\` - Wartungsdatensätze auflisten
- \`POST /api/maintenance\` - Wartungsdatensatz erstellen

## Foto-Upload (Cloud-Integration)

### AWS S3 Integration
\`\`\`typescript
import { uploadToS3 } from '@services/s3Service';

const photoUrl = await uploadToS3({
  bucket: process.env.AWS_S3_BUCKET,
  file: imageData,
  folder: 'damages',
});
\`\`\`

### Offline-Fotoverwaltung
- Fotos werden lokal mit AsyncStorage gespeichert
- Automatische Synchronisierung bei Wiederherstellung der Verbindung
- Hintergrund-Sync mit Wiederholungslogik

## Datenbank-Schema

### Wichtige Tabellen
- \`users\` - Benutzerkonten und Authentifizierung
- \`vehicles\` - Fahzeuginventar
- \`drivers\` - Fahrerinformationen
- \`traffic_fines\` - Strafzetteldatensätze
- \`vehicle_damages\` - Schadenmeldungen
- \`damage_photos\` - Cloud-Fotoeverweise
- \`repairs\` - Reparaturdatensätze
- \`maintenance_records\` - Wartungshistorie
- \`activity_logs\` - Audit-Trail

## Deployment

### Docker Setup
\`\`\`bash
cd backend
docker build -t moonstar-fleet .
docker run -p 3000:3000 moonstar-fleet
\`\`\`

### Umgebungsvariablen
Siehe \`.env.example\` für alle erforderlichen Konfigurationen.

## Entwicklung

### Im Entwicklungsmodus ausführen
\`\`\`bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Mobile App
npm run ios
# oder
npm run android
\`\`\`

## Beitrag
Beiträge sind willkommen! Bitte befolgen Sie die Codierungsstandards und reichen Sie Pull-Requests ein.

## Lizenz
MIT

## Support
Bei Fragen wenden Sie sich an support@moonstarfleet.com oder erstellen Sie ein Problem im GitHub-Repository.

---

**Gemacht mit ❤️ für Fuhrparkmanager weltweit**

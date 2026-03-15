# GigShield AI

![Hackathon](https://img.shields.io/badge/Hackathon-Guidewire%20DEVTrails-blue)
![Phase](https://img.shields.io/badge/Phase-1%20Submission-green)
![Backend](https://img.shields.io/badge/Backend-SpringBoot-red)
![AI](https://img.shields.io/badge/AI-Enabled-purple)
![Status](https://img.shields.io/badge/Status-In%20Development-yellow)

AI-powered parametric insurance platform protecting gig delivery workers from income loss due to weather and environmental disruptions.
---

## Problem Statement

Gig economy delivery workers (Zomato, Swiggy, Amazon, Zepto, etc.) depend on daily earnings.  
External disruptions such as heavy rain, extreme heat, severe pollution, or local curfews can significantly reduce their working hours and cause income loss.

Currently, gig workers have **no insurance coverage for loss of income caused by these uncontrollable events**.

Our solution aims to provide **AI-driven parametric insurance** that automatically detects disruptions and compensates workers for lost income.

---

## Target Persona

Food Delivery Workers (Swiggy / Zomato)

Example scenario:

- Name: Ravi  
- Location: Vijayawada  
- Platform: Swiggy  
- Average daily earnings: ₹900  
- Working hours: 10 hours  

If heavy rain stops deliveries for **4 hours**, Ravi loses income.

Loss Calculation:

Income Loss = ₹900 × (4 / 10) = ₹360

GigShield AI automatically detects the disruption and triggers compensation.

---

## Solution Overview

GigShield AI is a **parametric insurance platform** designed for gig workers.

Instead of manual claims, the system automatically monitors environmental conditions and triggers payouts when predefined disruption conditions occur.

Key capabilities:

- Automated disruption monitoring
- AI-based risk profiling
- Weekly premium pricing
- Instant claim triggering
- Fraud detection mechanisms
- Dashboard for workers and insurers

---

## Parametric Disruption Triggers

The system continuously monitors external data sources to identify disruption events.

| Disruption Type | Trigger Condition |
|----------------|------------------|
| Heavy Rain | Rainfall > 40mm |
| Extreme Heat | Temperature > 45°C |
| Severe Pollution | AQI > 350 |
| Local Curfew | Government announcement |

When a trigger is detected, the system automatically calculates income loss and initiates a claim.

---

## Weekly Premium Model

Gig workers typically operate on a weekly earning cycle.  
Therefore, the insurance model follows a **weekly premium structure**.

Example:

Base Premium: ₹15 / week

AI adjusts premium based on risk factors such as:

- Historical weather patterns
- Pollution levels
- Flood-prone zones
- Delivery activity in the region

Example premium calculation:

Premium = Base Price + (Risk Score × Risk Factor)

---

## AI / ML Integration

AI components are integrated into the system to improve pricing accuracy and fraud prevention.

### Risk Assessment Model
Predicts disruption probability using factors such as:

- Rainfall history
- Temperature trends
- Pollution levels
- Geographic location

Example models:
- Random Forest
- Gradient Boosting

### Fraud Detection

The system detects anomalies such as:

- GPS spoofing
- Duplicate claims
- Claims triggered outside disruption zones

Possible approach:
- Isolation Forest anomaly detection

---

## System Architecture

Worker Application  
↓  
Backend Server (Spring Boot)  
↓  
Risk Engine + Parametric Trigger System  
↓  
External Data APIs (Weather / Pollution)  
↓  
Automated Claims Processing  
↓  
Instant Payout System

---

## Technology Stack

Backend  
Spring Boot (Java)

Frontend  
React / Web Interface

Database  
PostgreSQL / MySQL

AI / ML  
Python  
Scikit-learn

External APIs  
OpenWeather API  
AQI / Pollution API

Payments (Simulation)  
Razorpay Test Mode

---

## Development Roadmap

### Phase 1 (Ideation & Planning)
- Define worker persona
- Design system architecture
- Define parametric triggers
- Design weekly pricing model

### Phase 2 (Automation & Protection)
- Worker registration
- Policy management
- Dynamic premium calculation
- Claims processing

### Phase 3 (Scale & Optimization)
- Advanced fraud detection
- Instant payout simulation
- Worker & admin dashboards

---

## Demo Video

Video Explanation:  
[Insert your 2-minute demo video link here]

---

## Future Improvements

- Predictive disruption alerts
- Risk heatmap for delivery zones
- Dynamic coverage adjustment based on weather forecasts
- Integration with gig platforms

---

## Repository Structure

```
gigshield-ai
│
├── README.md
│
├── frontend
│   └── gigshield-web
│
├── backend
│   └── springboot-app
│
├── architecture
│   └── system-architecture.png
│
├── docs
│   └── idea-document.md
│
└── prototype
    └── ui-mockups.png
```

---

## Demo Prototype

The initial prototype demonstrates the following workflow:

1. Worker registers on the platform
2. AI-based risk profiling determines weekly premium
3. External disruption data is monitored using APIs
4. Parametric triggers detect events such as heavy rain
5. Claims are automatically triggered
6. Worker receives instant payout through simulated payment gateway

---

## Team

Guidewire DEVTrails 2026 Submission

Team Members:

- Lagadapati Tejith
- Sangavar Ganaraj
- Nandivada Uday Kiran
- Marthala Surendra Reddy
- Gowni Yashwanth

---

## Acknowledgements

This project is built as part of the **Guidewire DEVTrails 2026 Hackathon** focusing on AI-driven insurance innovation for India's gig economy.

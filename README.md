# AutomatePro - RPA Project

## Overview
AutomatePro is a business website that helps companies automate repetitive tasks using Robotic Process Automation (RPA). It includes a virtual assistant chatbot that answers questions about RPA services.

## Key Features

1. **Main Website (index.html)**
   - Shows services offered (process automation, data integration, AI-enhanced RPA)
   - Includes an ROI calculator to estimate cost savings
   - Has a contact form for business inquiries
   - Floating chatbot button that links to the bot page

2. **Chatbot Page (bot.html)**
   - Embedded chatbot that answers RPA questions 24/7
   - Connects to an external chatbot service (Chatbase)
   - Fallback chatbot functionality in JavaScript if the embedded one fails

3. **Responsive Design**
   - Works on phones, tablets, and computers
   - Mobile-friendly navigation menu

## How It Works

### Step 1: Website Structure
- The main page explains RPA services with images
- Users can scroll to different sections (services, calculator, contact)

### Step 2: ROI Calculator
1. Users adjust sliders for:
   - Number of employees
   - Monthly process hours
   - Average hourly rate
2. The calculator shows:
   - Yearly cost comparisons (manual vs RPA)
   - Savings projections in a chart and table

### Step 3: Chatbot Access
- Users click the robot icon button (bottom right) or navigation link
- They're taken to a dedicated chatbot page

### Step 4: Chatbot Interaction
1. The embedded chatbot appears in an iframe
2. Users can ask questions about:
   - RPA services
   - Cost savings
   - Industry applications
   - Implementation process
3. If the embedded chatbot fails, a simple JavaScript version takes over

## Technical Details

- **Frontend**: HTML, CSS, JavaScript
- **Libraries**: 
  - Chart.js for the calculator graphs
  - Font Awesome for icons
- **Responsive Design**: Adapts to all screen sizes

## Setup Instructions

1. Clone the repository
2. Open `index.html` in any web browser
3. No server required - works as static files

The project demonstrates how businesses can use web technology to explain technical services and provide instant customer support through a chatbot.

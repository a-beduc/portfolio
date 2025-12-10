# Alexandre Beduc – Developer Portfolio

This repository contains the source code for my personal developer portfolio.  
It presents a short introduction, a selection of projects, and a contact form.
It was made modular to be easily extendable.

## Features

- “About me” section
- Project cards with:
  - Screenshot
  - Short description
  - Tech stack
  - Links to GitHub and external resources (demo, docs, etc.)
- Contact form (hooked to a Google sheet API to receive the POST requests.)

## Tech Stack

- HTML / CSS / JavaScript
- JSON data for project descriptions and links

## Getting Started (If it interests you)

1. Clone this repository:
   ```bash
   git clone https://github.com/a-beduc/portfolio.git
   cd portfolio
   ```
   
2. From the repo-folder, start a server:
   ```bash
   python -m http.server 8000
   ```
   
3. Open `http://localhost:8000/index.html`

## Status
The portfolio is functional but still evolving.

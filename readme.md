# Cash Register

A point-of-sale style cash register application that calculates change based on item price, cash received, and the available contents of the cash drawer.

Built as part of the FreeCodeCamp JavaScript certification and enhanced with improved UI/UX and production-style structure.

## Live Demo
https://sharpsanders.github.io/cash-register/

![Cash Register Screenshot](./img/Screenshot-cash-register.png)

---

## Features

- Calculates change using real U.S. currency denominations
- Supports pennies through $100 bills
- Accurate financial calculations using **cent-based math** (prevents floating-point errors)
- Greedy algorithm for optimal change distribution
- Status handling for all scenarios:
  - `OPEN` — Change successfully returned
  - `CLOSED` — Drawer equals required change
  - `INSUFFICIENT_FUNDS` — Exact change cannot be returned
- Prevents purchases when cash provided is insufficient
- Clean, responsive dark-themed UI

---

## Supported Currency Units

| Unit          | Value |
|---------------|--------|
| PENNY         | $0.01 |
| NICKEL        | $0.05 |
| DIME          | $0.10 |
| QUARTER       | $0.25 |
| ONE           | $1 |
| FIVE          | $5 |
| TEN           | $10 |
| TWENTY        | $20 |
| ONE HUNDRED   | $100 |

---

## How It Works

1. User enters the cash amount received.
2. The application compares payment against item price.
3. Required change is calculated.
4. A greedy algorithm determines optimal bill/coin distribution.
5. The UI updates dynamically with status and change breakdown.

All calculations are performed in cents to maintain financial precision.

---

## Tech Stack

- HTML5
- CSS3 (custom responsive dark theme)
- JavaScript (ES6+)

No frameworks or external libraries.

---

## Concepts Demonstrated

- DOM manipulation
- Event handling
- Arrays & objects
- Greedy change-making algorithm
- Floating-point precision handling
- Conditional logic
- UI state management

---

## Example Test Scenarios

### Exact Payment
Price: 19.50
Cash: 19.50
Result: No change due


### Normal Transaction
Price: 19.50
Cash: 20.00
Result: Status: OPEN
Change: QUARTER: $0.50


### Insufficient Funds
Price: 19.50
Cash: 20.00
Drawer: Missing required denominations
Result: Status: INSUFFICIENT_FUNDS


---

## Project Structure

cash-register/
├── index.html
├── styles.css
├── script.js
└── img/
└── Screenshot-cash-register.png


---

## What I Practiced

- Writing a financial-safe calculation system
- Implementing greedy algorithms for optimal output
- Handling edge cases and drawer-state logic
- Separating calculation logic from UI rendering
- Designing clean, responsive interface layouts

---

## Run Locally

```bash
git clone https://github.com/SharpSanders/cash-register.git
cd cash-register
Open index.html in your browser.

No build tools required.

Built by Trevyn Sanders
GitHub: https://github.com/SharpSanders
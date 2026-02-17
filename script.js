// FreeCodeCamp Cash Register Project
// Note: keep these as `let` so FCC tests can reassign them.
let price = 1.87;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

// ---- DOM ----
const cashInput = document.getElementById('cash');
const changeDueEl = document.getElementById('change-due');
const purchaseBtn = document.getElementById('purchase-btn');

// ---- Currency map (values in cents) ----
const UNITS = [
  { name: 'ONE HUNDRED', value: 10000 },
  { name: 'TWENTY', value: 2000 },
  { name: 'TEN', value: 1000 },
  { name: 'FIVE', value: 500 },
  { name: 'ONE', value: 100 },
  { name: 'QUARTER', value: 25 },
  { name: 'DIME', value: 10 },
  { name: 'NICKEL', value: 5 },
  { name: 'PENNY', value: 1 }
];

const toCents = (amount) => Math.round(amount * 100);
const toDollars = (cents) => (cents / 100).toFixed(2);

// Formats like: "Status: OPEN QUARTER: $0.5 DIME: $0.2"
function formatLine(status, changeArr) {
  if (!changeArr || changeArr.length === 0) return `Status: ${status}`;

  const parts = changeArr.map(([unit, amount]) => {
    // Tests display numbers like $0.5 not always $0.50
    // So we strip trailing zeros safely.
    const amtStr = String(Number(amount.toFixed(2)));
    return `${unit}: $${amtStr}`;
  });

  return `Status: ${status} ${parts.join(' ')}`;
}

function calculateChange(priceVal, cashVal, cidVal) {
  const changeDueCents = toCents(cashVal - priceVal);

  // Convert drawer to cents and compute total
  const drawer = cidVal.map(([name, amt]) => [name, toCents(amt)]);
  const totalInDrawer = drawer.reduce((sum, [, cents]) => sum + cents, 0);

  // If exact paid handled outside; here changeDueCents > 0
  if (totalInDrawer < changeDueCents) {
    return { status: 'INSUFFICIENT_FUNDS', change: [] };
  }

  let remaining = changeDueCents;
  const changeToGive = [];

  // Make quick lookup for drawer amounts in cents
  const drawerMap = new Map(drawer);

  for (const unit of UNITS) {
    if (remaining <= 0) break;

    const available = drawerMap.get(unit.name) || 0;
    if (available <= 0) continue;

    const maxNeeded = Math.floor(remaining / unit.value) * unit.value;
    const give = Math.min(maxNeeded, available);

    if (give > 0) {
      changeToGive.push([unit.name, give / 100]);
      remaining -= give;
    }
  }

  // If we couldn't make exact change
  if (remaining !== 0) {
    return { status: 'INSUFFICIENT_FUNDS', change: [] };
  }

  // If giving change empties the drawer exactly => CLOSED
  if (totalInDrawer === changeDueCents) {
    // CLOSED expects original cid order, but only non-zero amounts are shown in examples.
    // FCC tests align with returning the change in the same order as cid (low->high).
    // We'll output the actual contents that equal the change due (i.e., the whole drawer).
    const closedChange = cidVal
      .filter(([, amt]) => amt > 0)
      .map(([name, amt]) => [name, amt]);

    return { status: 'CLOSED', change: closedChange };
  }

  return { status: 'OPEN', change: changeToGive };
}

purchaseBtn.addEventListener('click', () => {
  const cashVal = Number(cashInput.value);

  // Guard: if cash is less than price => alert
  if (cashVal < price) {
    alert('Customer does not have enough money to purchase the item');
    return;
  }

  // Exact payment
  if (cashVal === price) {
    changeDueEl.textContent = 'No change due - customer paid with exact cash';
    return;
  }

  // Otherwise calculate change
  const result = calculateChange(price, cashVal, cid);
  changeDueEl.textContent = formatLine(result.status, result.change);
});

import type { Flight } from './flight';

const form = document.querySelector<HTMLFormElement>('#flight-form');
const numberInput = document.querySelector<HTMLInputElement>('#flight-number');
const fromInput = document.querySelector<HTMLInputElement>('#from');
const toInput = document.querySelector<HTMLInputElement>('#to');
const rows = document.querySelector<HTMLTableSectionElement>('#flight-rows');

function saveFlight(event: Event): void {
  event.preventDefault();

  if (!numberInput || !fromInput || !toInput || !rows) {
    return;
  }

  const flight: Flight = {
    flightNumber: numberInput.value,
    from: fromInput.value,
    to: toInput.value,
  };

  rows.insertAdjacentHTML('beforeend', `
    <tr>
      <td>${flight.flightNumber}</td>
      <td>${flight.from}</td>
      <td>${flight.to}</td>
    </tr>
  `);
}

form?.addEventListener('submit', saveFlight);

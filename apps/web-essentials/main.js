const form = document.querySelector('#flight-form');
const numberInput = document.querySelector('#flight-number');
const fromInput = document.querySelector('#from');
const toInput = document.querySelector('#to');
const rows = document.querySelector('#flight-rows');

function saveFlight(event) {
  event.preventDefault();

  const flight = {
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

form.addEventListener('submit', saveFlight);

import './style.css';
import dayjs from 'dayjs';

const form = document.getElementById('bday-form');
const dialog = document.getElementById('result-dialog');
const dialogContent = document.getElementById('dialog-content');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const birthDate = dayjs(document.getElementById('bday-input').value);
  const today = dayjs().startOf('day');
  const daysLived = today.diff(birthDate, 'days');
  
  let nextBday = dayjs(birthDate).year(today.year());
  if (nextBday.isBefore(today, 'day')) nextBday = nextBday.add(1, 'year');

  const weeksToBday = nextBday.diff(today, 'weeks');
  const isToday = today.isSame(nextBday, 'day');

  let html = `<p>Minęło ${daysLived} dni od Twoich narodzin.</p>`;
  if (isToday) {
    html += `<p class="font-bold">Wszystkiego najlepszego!</p>`;
  } else {
    html += `<p>Tygodni do urodzin: ${weeksToBday}</p>`;
    if (weeksToBday === 0) html += `<p>Masz urodziny w tym tygodniu!</p>`;
  }

  dialogContent.innerHTML = html;
  dialog.showModal();
});

document.getElementById('close-dialog').onclick = () => dialog.close();
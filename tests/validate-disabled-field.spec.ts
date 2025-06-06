import { test, expect } from '@playwright/test';
import { DatePickerPage } from './pages/DatePickerPage';

function formatDate(mm: number, dd: number, yyyy: number) {
  // jQuery UI datepicker uses mm/dd/yy
  return `${mm.toString().padStart(2, '0')}/${dd.toString().padStart(2, '0')}/${yyyy}`;
}

test('Reserva de una cita seleccionando el día 15 del mes actual', async ({ page }) => {
  const datePicker = new DatePickerPage(page);
  await datePicker.open();
  await datePicker.clickDateInput();
  await datePicker.selectDay('15');
  const today = new Date();
  const expected = formatDate(today.getMonth() + 1, 15, today.getFullYear());
  const value = await datePicker.getInputValue();
  expect(value).toBe(expected);
});

test('Selección de una fecha específica en el próximo mes (día 10)', async ({ page }) => {
  const datePicker = new DatePickerPage(page);
  await datePicker.open();
  await datePicker.clickDateInput();
  await datePicker.goToNextMonth();
  await datePicker.selectDay('10');
  const today = new Date();
  let nextMonth = today.getMonth() + 2;
  let year = today.getFullYear();
  if (nextMonth > 12) {
    nextMonth = 1;
    year++;
  }
  const expected = formatDate(nextMonth, 10, year);
  const value = await datePicker.getInputValue();
  expect(value).toBe(expected);
});

/*
test('Validar que no se puede escribir fecha manualmente (debería fallar en la demo)', async ({ page }) => {
  const datePicker = new DatePickerPage(page);
  await datePicker.open();
  await datePicker.tryToTypeDate('01/01/2025');
  const value = await datePicker.getInputValue();
  expect(value).toBe(''); // Esto fallará porque el campo sí permite edición manual en la demo
});
*/

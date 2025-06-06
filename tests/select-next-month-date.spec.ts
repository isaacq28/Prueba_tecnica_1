import { test, expect } from '@playwright/test';
import { DatePickerPage } from './pages/DatePickerPage';

function formatDate(mm: number, dd: number, yyyy: number) {
  return `${mm.toString().padStart(2, '0')}/${dd.toString().padStart(2, '0')}/${yyyy}`;
}

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

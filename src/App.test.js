import { render, screen, fireEvent } from '@testing-library/react';
import App, { replaceCamelWithSpace } from './App';

test('button has correct initial color', () => {
  render(<App />);

  // find an element with a role of button and text of 'Change to MidnightBlue'
  const colorButton = screen.getByRole('button', { name: 'Change to Midnight Blue' });

  // expect the background color to be MediumVioletRed
  expect(colorButton).toHaveStyle({ backgroundColor: 'MediumVioletRed' });

  // click button
  fireEvent.click(colorButton);

  // expect the background color to be MidnightBlue
  expect(colorButton).toHaveStyle({ backgroundColor: 'MidnightBlue' });

  // expect the button text to be 'Change to MediumVioletRed'
  expect(colorButton.textContent).toBe('Change to Medium Violet Red');
});

test('initial conditions', () => {
  render(<App />);

  // check tht the button starts out enabled
  const colorButton = screen.getByRole('button', { name: 'Change to Midnight Blue' });
  expect(colorButton).toBeEnabled();

  // check that the checkbox starts out enabled
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked();
})

test('button turns disabled when checkbox is enabled', () => {
  render(<App />);

  const colorButton = screen.getByRole('button', { name: 'Change to Midnight Blue' });
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });

  fireEvent.click(checkbox);
  expect(colorButton).toBeDisabled();

  fireEvent.click(checkbox);
  expect(colorButton).toBeEnabled();
})

test('button turns gray when disabled', () => {
  render(<App />);

  const colorButton = screen.getByRole('button', { name: 'Change to Midnight Blue' });
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });

  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: 'gray' });

  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: 'MediumVioletRed' });

  fireEvent.click(colorButton);
  expect(colorButton).toHaveStyle({ backgroundColor: 'MidnightBlue' });

  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: 'gray' });

  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: 'MidnightBlue' });
})

describe('spaces before camel-case capital letters', () => {
  test('Worked for no inner capital letters', () => {
    expect(replaceCamelWithSpace('Red')).toBe('Red');
  })
  test('Worked for one inner capital letters', () => {
    expect(replaceCamelWithSpace('MidnightBlue')).toBe('Midnight Blue');
  })
  test('Worked for multiple inner capital letters', () => {
    expect(replaceCamelWithSpace('MediumVioletRed')).toBe('Medium Violet Red');
  })
})

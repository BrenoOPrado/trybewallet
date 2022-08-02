import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';

describe('Testes referentes a página `Wallet`', () => {
    it('a página wallet é renderizada e funciona corretamente', async () => {
        await renderWithRedux(<Wallet />, {
            initialState: {
                user: {email: 'exemplo@teste.com'},
                wallet: {
                    currencies: [
                      'USD',
                      'CAD',
                      'GBP',
                      'ARS',
                      'BTC',
                      'LTC',
                      'EUR',
                      'JPY',
                      'CHF',
                      'AUD',
                      'CNY',
                      'ILS',
                      'ETH',
                      'XRP',
                      'DOGE'
                    ],
                    expenses: [],
                    editor: false,
                    idToEdit: 0
                  }
            }
        });

        screen.getByText('exemplo@teste.com');
        //screen.getByRole('paragraph', { name: 'exemplo@teste.com' })

        const valueInput = screen.getByTestId('value-input');
        const currencyInput = await screen.findByTestId('currency-input');
        const methodInput = screen.getByTestId('method-input');
        const tagInput = screen.getByTestId('tag-input');
        const descriptionInput = screen.getByTestId('description-input');
        const addBtn = screen.getByRole('button', { name: /adicionar despesa/i });
        const total = screen.getByTestId('total-field');
        screen.getByRole('img', { name: /logo wallet/i });
        screen.getByText('BRL');

        expect(total.innerHTML).toBe('0.00');

        userEvent.type(valueInput, '10');
        expect(valueInput.value).toBe('10');

        // userEvent.selectOptions(currencyInput, 'CAD');

        userEvent.type(descriptionInput, 'primeiro exemplo');
        expect(descriptionInput.value).toBe('primeiro exemplo');
        userEvent.click(addBtn);
        expect(total.innerHTML).toBe('52.81');
    });
});
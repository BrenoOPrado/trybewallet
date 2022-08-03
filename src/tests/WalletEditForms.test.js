import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';
import WalletEditForms from '../components/WalletEditForms';

describe('Testes referentes a parte do `WalletForms`', () => {
    it('o form de edição é renderizado com os valores correspondentes', () => {
        renderWithRedux(<WalletEditForms />, { initialState: {
            user: {
              email: 'exemplo@teste.com'
            },
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
              expenses: [
                {
                  value: '10',
                  description: 'abc',
                  currency: 'BTC',
                  method: 'Dinheiro',
                  tag: 'Lazer',
                  exchangeRates: {
                    ...mockData,
                  },
                  id: 0
                }
              ],
              editor: true,
              idToEdit: 0
            }
        } });

        expect(screen.getByRole('spinbutton').value).toBe('10');
        expect(screen.getAllByRole('combobox')[0].value).toBe('BTC');
        expect(screen.getAllByRole('combobox')[1].value).toBe('Dinheiro');
        expect(screen.getAllByRole('combobox')[2].value).toBe('Lazer');
        expect(screen.getByRole('textbox').value).toBe('abc');
        screen.getByRole('button', { name: /editar despesa/i });
    });

    it('o forms de edição funciona corretamente', async () => {
        renderWithRedux(<WalletEditForms />, { initialState: {
            user: {
              email: 'exemplo@teste.com'
            },
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
              expenses: [
                {
                  value: '10',
                  description: 'abc',
                  currency: 'BTC',
                  method: 'Dinheiro',
                  tag: 'Lazer',
                  exchangeRates: {
                    ...mockData,
                  },
                  id: 0
                }
              ],
              editor: true,
              idToEdit: 0
            }
        } });

        const valueInput = screen.getByRole('spinbutton');
        const descriptionInput = screen.getByRole('textbox');
        const currencySelect = screen.queryByTestId('currency-input');
        const methodSelect = screen.queryByTestId('method-input');
        const tagSelect = screen.queryByTestId('tag-input');

        userEvent.type(valueInput, '100');
        userEvent.selectOptions(currencySelect, 'CAD');
        userEvent.selectOptions(methodSelect, 'Cartão de débito');
        userEvent.selectOptions(tagSelect, 'Trabalho');
        userEvent.type(descriptionInput, 'abcd');

        expect(valueInput.value).toBe('100');
        expect(currencySelect.value).toBe('CAD');
        expect(methodSelect.value).toBe('Cartão de débito');
        expect(tagSelect.value).toBe('Trabalho');
        expect(descriptionInput.value).toBe('abcd');

        const btn = await screen.findByRole('button', { name: /editar despesa/i });

        userEvent.click(btn);

        screen.findByRole('button', { name: /adicionar despesa/i });
    });
});
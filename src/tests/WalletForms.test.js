import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';
import WalletForms from '../components/WalletForm';

describe('Testes referentes a parte do `WalletForms`', () => {
    it('o forms é renderizado coretamente', () => {
        renderWithRedux(<WalletForms />);

        screen.getByText('Valor:');
        screen.getByText('Moeda:');
        screen.getByText('Método de pagamento:');
        screen.getByText('Categoria:');
        screen.getByText('Descrição:');
        screen.getByRole('spinbutton');
        expect(screen.getAllByRole('combobox')).toHaveLength(3);
        screen.getByRole('textbox');
        screen.getByRole('button', { name: /adicionar despesa/i });
    });

    it('o forms funciona corretamente', () => {
        renderWithRedux(<WalletForms />, { initialState: {
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
                  value: '',
                  description: '',
                  currency: 'USD',
                  method: 'Dinheiro',
                  tag: 'Alimentação',
                  exchangeRates: {
                    ...mockData,
                  },
                  id: 0
                }
              ],
              editor: false,
              idToEdit: 0
            }
        } });

        const valueInput = screen.getByRole('spinbutton');
        const descriptionInput = screen.getByRole('textbox');
        const currencySelect = screen.queryByTestId('currency-input');
        const methodSelect = screen.queryByTestId('method-input');
        const tagSelect = screen.queryByTestId('tag-input');
        const addBtn = screen.getByRole('button', { name: /adicionar despesa/i });

        userEvent.type(valueInput, '10');
        userEvent.selectOptions(currencySelect, 'BTC');
        userEvent.selectOptions(methodSelect, 'Cartão de crédito');
        userEvent.selectOptions(tagSelect, 'Transporte');
        userEvent.type(descriptionInput, 'abc');

        expect(valueInput.value).toBe('10');
        expect(currencySelect.value).toBe('BTC');
        expect(methodSelect.value).toBe('Cartão de crédito');
        expect(tagSelect.value).toBe('Transporte');
        expect(descriptionInput.value).toBe('abc');

        userEvent.click(addBtn);

        expect(valueInput.value).toBe('');
        expect(currencySelect.value).toBe('USD');
        expect(methodSelect.value).toBe('Dinheiro');
        expect(tagSelect.value).toBe('Alimentação');
        expect(descriptionInput.value).toBe('');
    });

    it('o form não é renderizado quando em modo de edição', () => {
        renderWithRedux(<WalletForms />, { initialState: {
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
                  value: '',
                  description: '',
                  currency: 'USD',
                  method: 'Dinheiro',
                  tag: 'Alimentação',
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

        const addBtn = screen.queryByRole('button', { name: /adicionar despesa/i });
        expect(addBtn).not.toBeDefined();
    });
});
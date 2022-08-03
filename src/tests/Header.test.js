import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';
import Header from '../components/Header';

describe('Testes referentes a parte do `Header`', () => {
    it('header é renderizado corretamente ao abrir a pagina', () => {
      renderWithRedux(<Header />, { initialState: {
            user: {
              email: 'exemplo@teste.com',
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

      screen.getByText('exemplo@teste.com');
      screen.getByRole('img', { name: /logo wallet/i });
      const total = screen.getByTestId('total-field');
      const brl = screen.getByTestId('header-currency-field');

      expect(total).toHaveTextContent('0.00');
      expect(brl).toHaveTextContent('BRL')
    });

    it ('o total é alterado de acordo com as despesas relatadas', () => {
      renderWithRedux(<Header />, { initialState: {
            user: {
              email: 'exemplo@teste.com',
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

      const total = screen.getByTestId('total-field');

      expect(total).toHaveTextContent('47.53');
      expect(total).toHaveProperty('className', 'total-field');
    });

    it ('o total muda sua coloração quando em modo de edição', () => {
      renderWithRedux(<Header />, { initialState: {
            user: {
              email: 'exemplo@teste.com',
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

      const total = screen.getByTestId('total-field');

      expect(total).toHaveProperty('className', 'total-field-edit');
    });
});
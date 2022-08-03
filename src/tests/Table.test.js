import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';
import Table from '../components/Table';

describe('Testes referentes a parte do `Table`', () => {
    it('thead é renderizado corretamente', () => {
        renderWithRedux(<Table />);
        
        screen.getByRole('columnheader', { name: /descrição/i });
        screen.getByRole('columnheader', { name: /tag/i });
        screen.getByRole('columnheader', { name: /método de pagamento/i });
        screen.getByRole('columnheader', { name: 'Valor' });
        screen.getByRole('columnheader', { name: 'Moeda' });
        screen.getByRole('columnheader', { name: /câmbio utilizado/i });
        screen.getByRole('columnheader', { name: /valor convertido/i });
        screen.getByRole('columnheader', { name: /moeda de conversão/i });
        screen.getByRole('columnheader', { name: /editar\/excluir/i });
    });

    it('tbody populado é renderizado corretamente', () => {
        renderWithRedux(<Table />, { initialState: {
            user: {
              email: 'breno.o.prado@hotmail.com'
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

        screen.getByRole('cell', { name: /abc/i });
        screen.getByRole('cell', { name: /alimentação/i });
        screen.getByRole('cell', { name: /dinheiro/i });
        screen.getByRole('cell', { name: /10\.00/i });
        screen.getByRole('cell', { name: /dólar americano\/real brasileiro/i });
        // screen.getByRole('cell', { name: /5\.26/i });
        // screen.getByRole('cell', { name: /52\.62/i });
        // screen.getByRole('cell', { name: /real/i });
        const edit = screen.getByRole('button', { name: /editar/i });
        const remove = screen.getByRole('button', { name: /excluir/i });

        userEvent.click(remove);

        screen.getByRole('cell', { name: /você não possui despesas/i });
    });

    it('tbody sem valor é renderizado corretamente e a funcionalidade de editar e excluir', () => {
        renderWithRedux(<Table />, { initialState: {
            user: {
              email: 'breno.o.prado@hotmail.com'
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

        // screen.getByRole('cell', { name: /0\.00/i });
        screen.getByRole('cell', { name: /sem descrição/i });

        const remove = screen.getByRole('button', { name: /excluir/i });
        const edit = screen.getByRole('button', { name: /editar/i });

        userEvent.click(edit);

        expect(remove).toHaveProperty('disabled');
    });
});
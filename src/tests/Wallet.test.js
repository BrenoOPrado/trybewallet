import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';

describe('Testes referentes a página `Wallet`', () => {
    it('a página wallet é renderizada e funciona corretamente', async () => {
        await renderWithRedux(<Wallet />, { initialState: {user: {email: 'exemplo@teste.com'}} });

        screen.getByText('exemplo@teste.com');
        //screen.getByRole('paragraph', { name: 'exemplo@teste.com' })

        const valueInput = screen.getByTestId('value-input');
        const currencyInput = screen.getByTestId('currency-input');
        const methodInput = screen.getByTestId('method-input');
        const tagInput = screen.getByTestId('tag-input');
        const descriptionInput = screen.getByTestId('description-input');
        const addBtn = screen.getByRole('button', { name: /adicionar despesa/i });
        const total = screen.getByTestId('total-field');
        screen.getByRole('img', { name: /logo wallet/i });
        screen.getByText('BRL');

        expect(total).toHaveTextContent('0.00');

        userEvent.type(valueInput, '10');
        expect(valueInput.value).toBe('10');

        userEvent.selectOptions(currencyInput, 'CAD');

        userEvent.type(descriptionInput, 'primeiro exemplo');
        userEvent.click(addBtn);
    });
});
import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testes referentes a página de login', () => {
    it('a pagina de login se comporta como deveria', () => {
        const { history } = renderWithRouterAndRedux(<App />);

        expect(history.location.pathname).toBe('/');

        const emailInput = screen.getByPlaceholderText(/email/i);
        const passwordInput = screen.getByPlaceholderText(/senha/i);
        const btn = screen.getByRole('button', { name: /entrar/i });

        expect(emailInput).toBeDefined();
        expect(passwordInput).toBeDefined();
        expect(btn).toBeDefined();

        expect(btn).toHaveProperty('disabled', true);

        userEvent.type(emailInput, 'exemplo@teste.com');
        userEvent.type(passwordInput, '123456');

        expect(btn).toHaveProperty('disabled', false);

        userEvent.click(btn);

        expect(history.location.pathname).toBe('/carteira');
    });
});
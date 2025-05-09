import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FormPage from './FormularioPrecisao';
import '@testing-library/jest-dom';

jest.mock('next/router', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(() => '123456789'),
    setItem: jest.fn(),
    clear: jest.fn(),
  },
  writable: true,
});

describe('FormPage', () => {
  it('renders loading then form', async () => {
    render(<FormPage />);
    expect(screen.getByText('Carregando...')).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText('Formulário de Documentos')).toBeInTheDocument());
  });

  it('renders next question if aluguel is Sim', async () => {
    render(<FormPage />);
    await waitFor(() => screen.getByLabelText(/1 - Sua empresa paga aluguel/i));
    fireEvent.change(screen.getByLabelText(/1 - Sua empresa paga aluguel/i), { target: { value: 'Sim' } });
    expect(screen.getByLabelText(/O pagamento inclui outras despesas/i)).toBeInTheDocument();
  });

  it('renders outro banco input if Outro is selected', async () => {
    render(<FormPage />);
    await waitFor(() => screen.getByLabelText(/2 - Sua empresa possui conta bancária/i));
    fireEvent.change(screen.getByLabelText(/2 - Sua empresa possui conta bancária/i), { target: { value: 'Sim' } });
    await waitFor(() => screen.getByText('Outro'));
    const outroCheckbox = screen.getByLabelText('Outro');
    fireEvent.click(outroCheckbox);
    expect(screen.getByPlaceholderText(/Informe o outro banco/i)).toBeInTheDocument();
  });

  it('redirects to / if identifier is missing', async () => {
    window.localStorage.getItem = jest.fn(() => null);
    const pushMock = jest.fn();
    jest.spyOn(require('next/router'), 'useRouter').mockReturnValue({ push: pushMock });
    render(<FormPage />);
    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith('/');
    });
  });
});

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const FormPage = () => {
  const [identifier, setIdentifier] = useState('');
  const [form, setForm] = useState({});
  const router = useRouter();

  useEffect(() => {
    const storedIdentifier = localStorage.getItem('identifier');
    if (!storedIdentifier) {
      router.push('/');
    } else {
      setIdentifier(storedIdentifier);
    }
  }, [router]);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', form);
  };

  if (!identifier) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1>Formulário de Documentos</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            1 - Sua empresa paga aluguel?
            <select name="aluguel" onChange={handleFormChange}>
              <option value="Sim">Sim</option>
              <option value="Não">Não</option>
            </select>
          </label>
        </div>
        
        {form.aluguel === 'Sim' && (
          <div>
            <label>
              O pagamento inclui outras despesas (condomínio, IPTU, etc)?
              <select name="despesas" onChange={handleFormChange}>
                <option value="Sim">Sim</option>
                <option value="Não">Não</option>
              </select>
            </label>
            {form.despesas === 'Sim' && (
              <div>
                <label>
                  Quais despesas? 
                  <input
                    type="text"
                    name="despesasDetalhes"
                    onChange={handleFormChange}
                    placeholder="Descreva as despesas"
                  />
                </label>
              </div>
            )}
          </div>
        )}
        
        <div>
          <label>
            2 - Sua empresa possui conta bancária?
            <select name="contaBancaria" onChange={handleFormChange}>
              <option value="Sim">Sim</option>
              <option value="Não">Não</option>
            </select>
          </label>
        </div>

        {form.contaBancaria === 'Sim' && (
          <div>
            <label>
              Quais bancos você possui conta?
              <select name="bancos" onChange={handleFormChange} multiple>
                <option value="Banco do Brasil">Banco do Brasil</option>
                <option value="Caixa Econômica Federal">Caixa Econômica Federal</option>
                <option value="Bradesco">Bradesco</option>
                <option value="Itaú">Itaú</option>
                <option value="Sicoob">Sicoob</option>
                <option value="Pagbank">Pagbank</option>
                <option value="Santander">Santander</option>
                <option value="Stone">Stone</option>
                <option value="Outro">Outro</option>
              </select>
            </label>
            {form.bancos?.includes('Outro') && (
              <div>
                <label>
                  Qual outro banco?
                  <input
                    type="text"
                    name="outroBanco"
                    onChange={handleFormChange}
                    placeholder="Descreva o outro banco"
                  />
                </label>
              </div>
            )}
          </div>
        )}

        <div>
          <label>
            3 - Sua empresa utiliza máquina de cartão?
            <select name="maquinaCartao" onChange={handleFormChange}>
              <option value="Sim">Sim</option>
              <option value="Não">Não</option>
            </select>
          </label>
          {form.maquinaCartao === 'Sim' && (
            <div>
              <label>
                Quais máquinas?
                <input
                  type="text"
                  name="maquinaDetalhes"
                  onChange={handleFormChange}
                  placeholder="Descreva as máquinas"
                />
              </label>
            </div>
          )}
        </div>

        <div>
          <label>
            4 - Quais contas básicas serão enviadas?
            <select name="contasBasicas" onChange={handleFormChange} multiple>
              <option value="Água">Água</option>
              <option value="Energia">Energia</option>
              <option value="Condomínio">Condomínio</option>
              <option value="IPTU">IPTU</option>
              <option value="Internet">Internet</option>
              <option value="Telefone">Telefone</option>
              <option value="Outras">Outras</option>
            </select>
            {form.contasBasicas?.includes('Outras') && (
              <div>
                <label>
                  Quais outras contas?
                  <input
                    type="text"
                    name="outrasContas"
                    onChange={handleFormChange}
                    placeholder="Descreva as outras contas"
                  />
                </label>
              </div>
            )}
          </label>
        </div>

        <button type="submit">Enviar Formulário</button>
      </form>
    </div>
  );
};

export default FormPage;

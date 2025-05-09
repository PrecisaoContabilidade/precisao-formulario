import { useState } from 'react';
import emailjs from 'emailjs-com';

export default function Formulario() {
  const [pagaAluguel, setPagaAluguel] = useState('');
  const [despesasExtras, setDespesasExtras] = useState('');
  const [descricaoDespesas, setDescricaoDespesas] = useState('');
  const [possuiConta, setPossuiConta] = useState('');
  const [bancosSelecionados, setBancosSelecionados] = useState([]);
  const [outroBanco, setOutroBanco] = useState('');
  const [usaMaquinaCartao, setUsaMaquinaCartao] = useState('');
  const [quaisMaquinas, setQuaisMaquinas] = useState('');
  const [contasSelecionadas, setContasSelecionadas] = useState([]);
  const [outrasContas, setOutrasContas] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const bancos = [
    'Banco do Brasil',
    'Caixa Econômica Federal',
    'Bradesco',
    'Itaú',
    'Sicoob',
    'Pagbank',
    'Santander',
    'Stone',
    'Outro',
  ];

  const contas = [
    'Água',
    'Energia',
    'Condomínio',
    'IPTU',
    'Internet',
    'Telefone',
    'Outras',
  ];

  const toggleBanco = (banco) => {
    if (bancosSelecionados.includes(banco)) {
      setBancosSelecionados(bancosSelecionados.filter((b) => b !== banco));
    } else {
      setBancosSelecionados([...bancosSelecionados, banco]);
    }
  };

  const toggleConta = (conta) => {
    if (contasSelecionadas.includes(conta)) {
      setContasSelecionadas(contasSelecionadas.filter((c) => c !== conta));
    } else {
      setContasSelecionadas([...contasSelecionadas, conta]);
    }
  };

  const handleSubmit = () => {
    const formData = {
      pagaAluguel,
      despesasExtras,
      descricaoDespesas,
      possuiConta,
      bancosSelecionados: bancosSelecionados.join(', '),
      outroBanco,
      usaMaquinaCartao,
      quaisMaquinas,
      contasSelecionadas: contasSelecionadas.join(', '),
      outrasContas,
    };

    emailjs.send('service_pr4o2nh', 'template_jkps8zu', formData, '2im7v2QcZ0nFHbepm')
      .then((response) => {
        console.log('Sucesso:', response);
        setShowPopup(true);
      })
      .catch((error) => {
        console.error('Erro:', error);
      });
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-md border mt-6">
      {/* Conteúdo omitido para brevidade */}
      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-6 rounded-2xl shadow"
        >
          Enviar Formulário
        </button>
      </div>
      {showPopup && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl text-center max-w-lg">
            <h3 className="text-xl font-semibold text-green-700 mb-4">
              A Precisão agradece seu comprometimento.
            </h3>
            <p className="text-gray-700 mb-4">
              Vamos juntos impulsionar seu negócio!
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-2xl"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState, useRef } from 'react';
import './App.css';

function App() {
  const [cpfValido, setCpfValido] = useState<boolean>();

  const inputCpfRef = useRef<HTMLInputElement>(null);

  let cpfArray = Array.from(String(inputCpfRef.current?.value), Number);

  const multiplicadores: number[] = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];

  const loop = (index: number): number => {
    let resultadoMultiplicacao = 0;
    let cpfIndex = 0;
    for (let i = index; i < multiplicadores.length; i++) {
      resultadoMultiplicacao += cpfArray[cpfIndex] * multiplicadores[i];
      cpfIndex++;
      index++;
    }
    return resultadoMultiplicacao;
  };

  const validarCpf = () => {
    cpfArray = Array.from(String(inputCpfRef.current?.value), Number);
    if (cpfArray.length < 10) {
      return;
    }
    const cpfSet = new Set(cpfArray);
    if (cpfSet.size === 1) {
      setCpfValido(false);
      return;
    }
    const resultadoEtapa1 = loop(1);
    let verificar1 = (resultadoEtapa1 * 10) % 11;
    if (verificar1.toString().length > 1) {
      verificar1 = Number(verificar1.toString()[1]);
    }
    console.log('Verificar1:' + verificar1);
    console.log('Comparar1:' + cpfArray[9]);
    if (verificar1 != cpfArray[9]) {
      setCpfValido(false);
      console.log('INVÁLIDO 1');
      return;
    }

    const resultadoEtapa2 = loop(0);

    let verificar2 = (resultadoEtapa2 * 10) % 11;

    if (verificar2.toString().length > 1) {
      verificar2 = Number(verificar2.toString()[1]);
    }
    console.log('Verificar2:' + verificar2);
    console.log('Comparar2:' + cpfArray[10]);
    if (verificar2 != cpfArray[10]) {
      console.log('INVÁLIDO 2');
      setCpfValido(false);
      return;
    }

    setCpfValido(true);
    console.log('CHEGOU AO FINAL');
  };

  const resultadoNaTela =
    cpfValido === undefined
      ? ''
      : cpfValido === true
      ? 'Cpf Válido'
      : 'Cpf Inválido';

  //multiplicadores.map((num) => );

  return (
    <div className="container">
      <div className="items">
        <h1>Validador de CPF</h1>
        <input type="number" ref={inputCpfRef} />
        <button onClick={validarCpf}>Validar</button>
        {resultadoNaTela}
      </div>
    </div>
  );
}

export default App;

import { useState } from 'react';
import styles from './App.module.css';
import poweredImage from './assets/powered.png';
import lefArrowImage from './assets/leftarrow.png';
import { GridItem } from './components/GridItem/'

import { levels, calculateImc, Level } from './helpers/imc';

const App = () => {
  const [heightField, setHeightField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0);
  const [toShow, setToShow] = useState<Level | null>(null);

  const handleCalculateButton = () => {
    if(heightField && weightField){
      setToShow(calculateImc(heightField, weightField));
    }else {
      alert('Preencha todos os campos!')
    }
  }

  const handlenBackButton = () => {
    setToShow(null);
    setHeightField(0);
    setWeightField(0);
  }

  return (
    <div className={styles.main}>
      <header>
        <div className= {styles.headerContainer}>
          <img src= {poweredImage} alt="" width={150} />
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC</h1>
          <p>
            O IMC é um cálculo simples que permite avaliar se a pessoa está dentro do peso que é considerado ideal para a sua altura.
          </p>
          
          <input
            type="number"
            placeholder="Digite sua altura. Ex 1.70 (em metros)"
            value={heightField > 0 ? heightField : '' }
            onChange={e => setHeightField(parseFloat(e.target.value))}
            disabled={toShow ? true : false}
          />
          <input
            type="number"
            placeholder="Digite seu peso. Ex 70.6 (em kg)"
            value={weightField > 0 ? weightField : '' }
            onChange={e => setWeightField(parseFloat(e.target.value))}
            disabled={toShow ? true : false}
          />
          <button onClick={handleCalculateButton}  disabled={toShow ? true : false} >Calcular</button>

        </div>
        <div className={styles.rightSide}>
          {!toShow &&
              <div className={styles.grid}>
              {levels.map((item, key) =>(
                <GridItem key={key} item={item}/>
             ))}
            </div>
          }
          {toShow &&
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={handlenBackButton} >
                <img src={lefArrowImage} alt="" width={25}/>
              </div>
              <GridItem item={toShow} />
            </div>
          }
        </div>
      </div>
    </div>
  );

}

export default App;
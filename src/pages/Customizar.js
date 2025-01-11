import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Typography, TextField,Card, CardContent,Snackbar} from '@mui/material';
import { ProjectContext } from '../elements/ProjectContext';
import Checkbox from '@mui/material/Checkbox';
import Sensores from '../elements/Sensores';
import { styled } from '@mui/system';
import Plot from "react-plotly.js";
import { matrix, multiply, inv, transpose } from 'mathjs';  // Importando funções necessárias



// Styled components
const StyledTextField1 = styled(TextField)`
  width: 3.5vw;
  margin-top: 0.4vh;
  & .MuiInputBase-input {
    height: 2.5vh;
    font-size: 0.8rem;
    padding: 0;
    background-color: white;
  }
`;

const StyledTextField2 = styled(TextField)`
  width: 5vw;
  margin-top: 0.4vh;
  & .MuiInputBase-input {
    height: 2.5vh;
    font-size: 0.8rem;
    padding: 0;
    background-color: white;
  }
`;

const StyledTypography = styled(Typography)`
  height: 2.88vh;
  margin-top: 0.03vh;
  margin-right: 0.3vw;
  padding: 0;
`;

const StyledCheckbox = styled(Checkbox)`
  margin-top: 0.03vh;
  border: 0;
  padding: 0;
  & .MuiSvgIcon-root {
    height: 2.88vh;
  }
`;

const StyledButton = styled(Button)`
  background-color: #FF5733;
  color: #FFF;
  margin-bottom: 2vh;
  width: 15vw;
  height: 5vh;
  font-size: 1vw;
  &:hover {
    background-color: #C70039;
  }
`;

function regressaoPolinomial(xValues, yValues, grau) {
  if (xValues.length !== yValues.length) {
    throw new Error("Os arrays de valores X e Y devem ter o mesmo comprimento.");
  }

  const n = xValues.length;

  // Matriz de Vandermonde (n x (grau+1))
  let A = [];
  for (let i = 0; i < n; i++) {
    A.push([]);
    for (let j = 0; j <= grau; j++) {
      A[i].push(Math.pow(xValues[i], j));
    }
  }

  // Convertendo A e Y para matrizes do Math.js
  const A_matrix = matrix(A);
  const Y_matrix = matrix(yValues);

  // Calcula (A^T * A)⁻¹ * A^T * Y
  try {
    const AT = transpose(A_matrix);
    const ATA = multiply(AT, A_matrix);
    const ATA_inv = inv(ATA);
    const coefficients = multiply(multiply(ATA_inv, AT), Y_matrix);

    return coefficients.toArray(); // Retorna os coeficientes como um array
  } catch (error) {
    console.error("Erro ao calcular os coeficientes:", error);
    return [];
  }
}

function regressaoPolynomialFormatted(coefficients) {
  return coefficients
    .map((coef, idx) => {
      if (Math.abs(coef) < 1e-6) return ""; // Ignora coeficientes muito pequenos
      const formattedCoef = coef.toFixed(4).replace(/\.?0+$/, ""); // Remove zeros desnecessários
      return idx === 0
        ? formattedCoef
        : `${formattedCoef}x${idx > 1 ? `^${idx}` : ""}`;
    })
    .filter(Boolean)
    .join(" + ");
}

function Customizar() {
  const [xValues, setXValues] = useState([]);
  const [yValues, setYValues] = useState([]);
  const [checked, setChecked] = useState(Array(20).fill(false)); // Controle dos checkboxes
  const [plotData, setPlotData] = useState([]);
  const [polynomial, setPolynomial] = useState(""); // Armazena o polinômio gerado
  const [grau, setGrau] = useState(3); // Grau do polinômio

  const handlePlot = () => {
    const validX = xValues.filter((_, i) => checked[i] && xValues[i] !== "");
    const validY = yValues.filter((_, i) => checked[i] && yValues[i] !== "");

    if (validX.length <= grau) {
      alert(`Forneça pelo menos ${grau + 1} pontos válidos para a regressão.`);
    } else {
      const xmin = Math.min(...validX);
      const xmax = Math.max(...validX);

      const interpolatedX = [];
      const step = (xmax - xmin) / 100;

      for (let x = xmin; x <= xmax; x += step) {
        interpolatedX.push(x);
      }

      const coefficients = regressaoPolinomial(validX, validY, grau);
      const polynomialY = interpolatedX.map((x) =>
        coefficients.reduce((acc, coef, idx) => acc + coef * Math.pow(x, idx), 0)
      );

      const polynomialStr = regressaoPolynomialFormatted(coefficients);

      setPlotData([
        {
          x: validX,
          y: validY,
          type: "scatter",
          mode: "markers",
          marker: { color: "red", size: 10 },
          name: "Pontos",
        },
        {
          x: interpolatedX,
          y: polynomialY,
          type: "scatter",
          mode: "lines",
          line: { color: "blue" },
          name: `Regressão Polinomial (grau ${grau})`,
        },
      ]);

      setPolynomial(polynomialStr);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", paddingLeft: "10vw", justifyContent: "center", alignItems: "center" }}>
      <div>
        {[...Array(20)].map((_, index) => (
          <Typography key={index} style={{ height: "2.88vh", marginTop: "0.03vh", marginRight: "0.3vw" }}>
            {index + 1}
          </Typography>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", marginTop: "0.2vh" }}>
        {[...Array(20)].map((_, index) => (
          <StyledCheckbox
            key={index}
            checked={checked[index]}
            onChange={(e) => {
              const updatedChecked = [...checked];
              updatedChecked[index] = e.target.checked;
              setChecked(updatedChecked);
            }}
          />
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {[...Array(20)].map((_, index) => (
          <StyledTextField1
            key={index}
            value={xValues[index] || ""}
            onChange={(e) => {
              const updatedXValues = [...xValues];
              updatedXValues[index] = e.target.value;
              setXValues(updatedXValues);
            }}
          />
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", paddingLeft: "0.4vw" }}>
        {[...Array(20)].map((_, index) => (
          <StyledTextField1
            key={index}
            value={yValues[index] || ""}
            onChange={(e) => {
              const updatedYValues = [...yValues];
              updatedYValues[index] = e.target.value;
              setYValues(updatedYValues);
            }}
          />
        ))}
      </div>

      <div style={{ marginLeft: "20px" }}>
        <Card style={{ maxHeight: "58vh", maxWidth: "30vw" }}>
          <CardContent>
            <Plot
              data={plotData}
              layout={{
                title: "Gráfico de Regressão Polinomial",
                xaxis: { title: "x" },
                yaxis: { title: "y" },
                width: 420,
                height: 420,
              }}
            />
          </CardContent>
        </Card>
        {polynomial && (
          <Typography variant="body1" style={{ marginTop: "10px", color: "green" }}>
            Função Ajustada: {polynomial}
          </Typography>
        )}
      </div>

      <div style={{ padding: "5vw", display: "flex", flexDirection: "column" }}>
        <StyledButton variant="contained" onClick={handlePlot}>
          Plotar
        </StyledButton>
      </div>
    </div>
  );
}

export default Customizar;

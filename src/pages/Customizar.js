import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Typography, TextField,Card, CardContent,Snackbar} from '@mui/material';
import { ProjectContext } from '../elements/ProjectContext';
import Checkbox from '@mui/material/Checkbox';
import Sensores from '../elements/Sensores';
import { styled } from '@mui/system';
import Plot from "react-plotly.js";
import { matrix, multiply, inv, ones } from 'mathjs';  // Importando funções necessárias



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


function lagrangePolynomialFormatted(xValues, yValues) {
  const n = xValues.length;
  let coefficients = Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    let termCoefficients = Array(n).fill(0);
    termCoefficients[0] = 1;

    let denominator = 1;
    for (let j = 0; j < n; j++) {
      if (i !== j) {
        denominator *= xValues[i] - xValues[j];
        for (let k = n - 1; k > 0; k--) {
          termCoefficients[k] -= termCoefficients[k - 1] * xValues[j];
        }
        termCoefficients[0] *= -xValues[j];
      }
    }

    const factor = yValues[i] / denominator;
    coefficients = coefficients.map(
      (coef, idx) => coef + termCoefficients[idx] * factor
    );
  }

  // Formata os coeficientes no estilo a0 + a1x + a2x^2 + ...
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

function lagrangeInterpolation(xValues, yValues, x) {
  let result = 0;
  const n = xValues.length;

  for (let i = 0; i < n; i++) {
    let term = yValues[i];
    for (let j = 0; j < n; j++) {
      if (i !== j) {
        term *= (x - xValues[j]) / (xValues[i] - xValues[j]);
      }
    }
    result += term;
  }

  return result;
}

function Customizar() {
  const [xValues, setXValues] = useState([]);
  const [yValues, setYValues] = useState([]);
  const [checked, setChecked] = useState(Array(20).fill(false)); // Controle dos checkboxes
  const [plotData, setPlotData] = useState([]);
  const [polynomial, setPolynomial] = useState(""); // Armazena o polinômio gerado

  const handleOpenSensor = async () => {
    try {
      // Abre o arquivo usando a API do Electron
      const { filePath, fileContent } = await window.electronAPI.openSensor();

      // Verifica se o conteúdo do arquivo foi retornado
      if (fileContent) {
        try {
          // Tenta analisar o conteúdo como JSON
          const jsonData = JSON.parse(fileContent);
          //fazer a logica de tratamento do sensor
        } catch (jsonError) {
          console.error("Erro ao parsear o conteúdo do arquivo como JSON:", jsonError);
        }
      } else {
        console.warn("O arquivo não contém conteúdo válido.");
      }
    } catch (error) {
      // Log de erros no processo de abertura do arquivo
      console.error("Erro ao abrir o arquivo:", error);
    }
  };

  const handlePlot = () => {
    const validX = xValues.filter((_, i) => checked[i] && xValues[i] !== "");
    const validY = yValues.filter((_, i) => checked[i] && yValues[i] !== "");

    if (validX.length < 2 || validY.length < 2) {
      alert("Forneça pelo menos dois pontos válidos para interpolação.");
    } else {
      const xmin = Math.min(...validX);
      const xmax = Math.max(...validX);

      const interpolatedX = [];
      const interpolatedY = [];
      const step = (xmax - xmin) / 100;

      for (let x = xmin; x <= xmax; x += step) {
        interpolatedX.push(x);
        interpolatedY.push(lagrangeInterpolation(validX, validY, x));
      }

      const polynomialStr = lagrangePolynomialFormatted(validX, validY);

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
          y: interpolatedY,
          type: "scatter",
          mode: "lines",
          line: { color: "blue" },
          name: "Interpolação",
        },
      ]);

      setPolynomial(polynomialStr);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", paddingTop: "8vh", paddingLeft: "10vw", justifyContent: "center", alignItems: "center" }}>
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
      value={xValues[index] !== undefined && xValues[index] !== null ? xValues[index] : ""}
      onChange={(e) => {
        const value = e.target.value; // Permite qualquer entrada do usuário
        const updatedXValues = [...xValues];
        updatedXValues[index] = value; // Armazena diretamente o valor
        setXValues(updatedXValues);
      }}
      onBlur={() => {
        // Converte para número após perder o foco (se for válido)
        const updatedXValues = xValues.map((val) =>
          val !== "" && !isNaN(parseFloat(val)) ? parseFloat(val) : ""
        );
        setXValues(updatedXValues);
      }}
    />
  ))}
</div>

<div style={{ display: "flex", flexDirection: "column", paddingLeft: "0.4vw" }}>
  {[...Array(20)].map((_, index) => (
    <StyledTextField1
      key={index}
      value={yValues[index] !== undefined && yValues[index] !== null ? yValues[index] : ""}
      onChange={(e) => {
        const value = e.target.value;
        const updatedYValues = [...yValues];
        updatedYValues[index] = value;
        setYValues(updatedYValues);
      }}
      onBlur={() => {
        const updatedYValues = yValues.map((val) =>
          val !== "" && !isNaN(parseFloat(val)) ? parseFloat(val) : ""
        );
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
                title: "Gráfico de Interpolação",
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
            Função Interpolada: {polynomial}
          </Typography>
        )}
      </div>

      <div style={{ padding: "5vw", display: "flex", flexDirection: "column" }}>
        <StyledButton variant="contained">Salvar sensor</StyledButton>
        <StyledButton variant="contained" onClick={handleOpenSensor}>
          Importar sensor
        </StyledButton>
        <StyledButton variant="contained">Exportar sensor</StyledButton>
        <StyledButton style={{ marginTop: "30vh" }} variant="contained" onClick={handlePlot}>
          Plotar
        </StyledButton>
      </div>
    </div>
  );
}

export default Customizar;

import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { ProjectContext } from '../elements/ProjectContext';
import MenuMaq from '../elements/MenuMaq.js'
import MaqSelecionar from '../elements/MaqSelecionar.js'
import MaqCanais from '../elements/MaqCanais.js'
import MaqConfig from '../elements/MaqConfig.js'
function Maq(){
    const [renderAtual, setRenderAtual] = useState(0); // Estado para controlar o render
    return(<div>
        <div><MenuMaq setRenderAtual={setRenderAtual}/></div>
        {renderAtual === 1 && <MaqSelecionar/>}
        {renderAtual === 2 && <MaqCanais/>}
        {renderAtual === 3 && <MaqConfig />}
    </div>)
}

export default Maq;
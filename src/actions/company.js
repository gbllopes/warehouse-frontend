import { ADD_COMPANY } from '../constants/company';
import { rest } from '../authentication/tokenConfig';

export const addCompany = (formValues) => async dispatch =>{
    try{
        await rest('').post('/api/empresa', {...formValues});
        dispatch({ type: ADD_COMPANY, msg: "Empresa cadastrada com Sucesso"});
    }catch(e){
        dispatch({ type: ADD_COMPANY, msg : "Erro ao cadastrar Empresa"});
    }
    
}
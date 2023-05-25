import React, {useState, useEffect, ChangeEvent} from 'react'
import './CadastroUsuario.css'
import { Button, Grid, TextField, Typography } from '@material-ui/core'
import Box from '@mui/material/Box'
import { Link, useNavigate } from 'react-router-dom'
import User from '../../models/User'
import { cadastroUsuario } from '../../services/Service'

function CadastroUsuario() {
    let navigate = useNavigate();
    // serve para o confirmar se as senhas digitadas são iguais 
    const [confirmarSenha, setConfirmarSenha] = useState<String>("")
    //contem as informações que estou enviando para cadastro enquanto n tem nada prenchido ele vida com esses valores padrões colocados em baixo
    const [user, setUser] = useState<User>(
        {
            id: 0,
            nome: '',
            usuario: '',
            senha: '',
            foto: ''
        })
        //serve para armazenar os valores de retorno da api quando eu envio os dados de cadastro e efetivo ela devolve um json com os dados cadastrados e eles eu gravo isso de userResult
    const [userResult, setUserResult] = useState<User>(
        {
            id: 0,
            nome: '',
            usuario: '',
            senha: '',
            foto: ''
        })

        //ele vai olhar para userResult se for o id for diferente de 0 ele te manda para tela de login 
    useEffect(() => {
        if (userResult.id != 0) {
            navigate('/login')
        }
    }, [userResult])

    // essa função ela ativa junto do State confirmar senha, ela pega o valor digitado lá  e compara
    function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>) {
        setConfirmarSenha(e.target.value)
    }

        //vai populando o objeto conforme os dados que eu vou preenchendo
    function updatedModel(e: ChangeEvent<HTMLInputElement>) {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        })

    }
    //aqui estou fazendo o cadastro estou enviado um create para api
    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault() // Não atualiza a pagina que é comportamento padrão do botão 
        if (confirmarSenha == user.senha) {
            cadastroUsuario(`/usuarios/cadastrar`, user, setUserResult)
            alert('Usuario cadastrado com sucesso')
        } else {
            alert('Dados inconsistentes. Favor verificar as informações de cadastro.')
        }
    }
    return (
        <Grid container direction='row' justifyContent='center' alignItems='center'>
            <Grid item xs={6} className='imagem2'></Grid>
            <Grid item xs={6} alignItems='center'>
                <Box paddingX={10}>
                    <form onSubmit={onSubmit}>
                        <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className='textos2'>Cadastrar</Typography>
                        <TextField value={user.nome} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='nome' label='nome' variant='outlined' name='nome' margin='normal' fullWidth />
                        <TextField value={user.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='usuario' label='usuario' variant='outlined' name='usuario' margin='normal'fullWidth />
                        <TextField value={user.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='senha' label='senha' variant='outlined' name='senha' margin='normal' type='password' fullWidth />
                        <TextField value={confirmarSenha} onChange={(e: ChangeEvent<HTMLInputElement>) => confirmarSenhaHandle(e)} id='confirmarSenha' label='confirmarSenha' variant='outlined' name='confirmarSenha' margin='normal' type='password' fullWidth />
                        <Box marginTop={2} textAlign='center'>
                            <Link to='/login' className='text-decorator-none'>
                                <Button variant='contained' color='secondary' className='btnCancelar'>
                                    Cancelar
                                </Button>
                            </Link>
                            <Button type='submit' variant='contained' color='primary'>
                                    Cadastrar
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Grid>



        </Grid>
    )
}

export default CadastroUsuario
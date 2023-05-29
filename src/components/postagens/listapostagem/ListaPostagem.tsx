import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { busca } from '../../../services/Service';

import { UserState } from '../../../store/token/Reducer';
import './ListaPostagem.css';

function Listapost() {
  let navigate = useNavigate();

  const [posts, setPosts] = useState<any[]>([]);

  const token = useSelector<UserState, UserState["tokens"]>(
    (state) => state.tokens
  )

  // const userId = useSelector<UserState, UserState["id"]>(
  //   (state) => state.id
  // )
  // let filter = props.inputText

  //   console.log()




  useEffect(() => {
    if (token === '') {
      alert('Ai não meu bom');
      navigate('/login');
    }
  }, [token]);

  async function getpost() {
    await busca('/postagens', setPosts, {
      headers: { Authorization: token },
    });
  }

  useEffect(() => {
    getpost();
  }, [posts.length]);

  // .filter((post) => {
  //   return(
  //     post.titulo.includes(filter)
  //   )
  // })

  return (
    <>
      {posts.length === 0 ? (<div className="spinner"></div>) : (
        posts.map((post) => (
          <Box marginX={20} m={2} className='boxPost' border={1} borderRadius={5} justifySelf='flex-start'>
            <Card className='cardPost'>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Postagens
                </Typography>
                <Typography variant="h5" component="h2">
                  {post.titulo}
                </Typography>
                <Typography variant="body2" component="p">
                  {post.texto}
                </Typography>
                <Typography variant="body2" component="p">
                  {post.tema?.descricao}
                </Typography>
                <Typography variant="body2" component="p">
                  Postado por: {post.usuario?.nome}
                </Typography>
                <Typography variant="body1" component="p">
                  Data: {Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'medium' }).format(new Date(post.data))}
                </Typography>
              </CardContent>
              <CardActions>
                <Box display="flex" justifyContent="center" mb={1.5}>

                  <Link to={`/formularioPostagem/${post.id}`} className="text-decorator-none" >
                    <Box mx={1}>
                      <Button variant="contained" className="marginLeft" size='small' color="primary" >
                        atualizar
                      </Button>
                    </Box>
                  </Link>
                  <Link to={`/deletarPostagem/${post.id}`} className="text-decorator-none">
                    <Box mx={1}>
                      <Button variant="contained" size='small' color="secondary">
                        deletar
                      </Button>
                    </Box>
                  </Link>
                </Box>
              </CardActions>
            </Card>
          </Box>
        ))
      )}
    </>
  );
}

export default Listapost;
import {Box, Button, Grid, Typography} from "@mui/material";
import {gql, useQuery, useMutation} from '@apollo/client';
import { useParams, useNavigate} from "react-router-dom";
import {QueryResult} from "../query-result/query-result";
import {formatDate} from "../../utils/utils";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DeleteIcon from '@mui/icons-material/Delete';
import {NEWS} from "../news-list/news-list";

const INCREMENT_LIKE = gql`
    mutation Like($uuid: String!) {
        like(uuid: $uuid) {
            likes
        }
    }

`

const DECREMENT_LIKE = gql`
    mutation Dislike($uuid: String!) {
        dislike(uuid: $uuid) {
            likes
        }
    }

`

const DELETE_NEWS = gql`
    mutation Delete($uuid: String!) {
        delete(uuid: $uuid) {
            uuid
        }
    }

`
const SINGLE_NEWS = gql`
    query SingleNews($uuid: String!) {
        singleNews(uuid: $uuid) {
            title
            date
            author
            likes
            text
        }
    }
`;
export const SingleNews = () => {
    const { uuid } = useParams()
    
    const { loading, error, data } = useQuery(SINGLE_NEWS, {
        variables: { uuid },
    });
    const [likeFunction] = useMutation(INCREMENT_LIKE, {
        variables: { uuid },
        refetchQueries: [
            SINGLE_NEWS, 
            NEWS,// Подумать как здесь лучше обновлять cache
        ],
    });
    const [dislikeFunction] = useMutation(DECREMENT_LIKE, {
        variables: { uuid },
        refetchQueries: [
            SINGLE_NEWS,
            NEWS,// Подумать как здесь лучше обновлять cache
        ],
    });

    const [deleteFunction] = useMutation(DELETE_NEWS, {
        variables: { uuid },
        refetchQueries: [
            SINGLE_NEWS,
            NEWS,// Подумать как здесь лучше обновлять cache
        ],
    });
    
    function likeHandler () {
        if(data.singleNews.likes) {
            dislikeFunction().then(r => console.log(r))
        } else likeFunction()
    }
    let navigate = useNavigate();
    
    function deleteHandler () {
        deleteFunction();
        return navigate("/")
    }
    
    return(
          <Box sx={{ padding: 5 }}>
              
              <Grid  
                  container
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="flex-start">
                  <QueryResult error={error} loading={loading} data={data}>
                      {data?
                          <>
                          <Typography gutterBottom variant="h5" component="h2"
                                      pb={"20px"}>
                              {data.singleNews.title}
                          </Typography>

                          <Typography pb={"20px"}>
                              {data.singleNews.text}
                          </Typography>
                          <Typography variant="caption">
                              {formatDate(data.singleNews.date)}
                          </Typography>
                          <Typography variant="caption">
                              {data.singleNews.author}
                          </Typography>
                          </>
                     :null }
                  </QueryResult>
                  <Button 
                      sx={{ marginTop: 3 }} 
                      variant="outlined" 
                      startIcon={<DeleteIcon />}
                      onClick={deleteHandler}
                  >
                      Delete
                  </Button>
                  <Grid item sx={{ marginTop: 3 }}>
                      {data ?
                          <Button 
                              variant={data.singleNews.likes>0?"contained":"outlined"} 
                              endIcon={<ThumbUpIcon />} 
                              onClick={likeHandler}
                          >
                              {data.singleNews.likes}
                              &nbsp; Like
                          </Button>
                      :null
                      }
                      
                  </Grid>
              </Grid>
          </Box>
  )
}
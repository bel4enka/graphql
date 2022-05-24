import {
  Button,
  Card,
  CardActions,
  CardContent, Grid,
  Typography
} from "@mui/material";
import {formatDate} from "../../../utils/utils";
import { Link } from "react-router-dom";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

export const NewsListItem = ({item}) => {
  const {title, date, author, likes, uuid} = item
  return (
      <Grid item xs={12} sm={6} md={4}>
        <Card
            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="h2" pb={"20px"}>
              {title}
            </Typography>
            <Typography pb={"20px"}>
              {formatDate(date)} 
            </Typography>
            <Typography variant="caption"> 
              {author}
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'space-between'}} >
            <Link to={{ pathname: `/${uuid}`}}><Button size="small">More...</Button></Link>
            <span><ThumbUpIcon />{likes>0?likes:null}</span>
          </CardActions>
        </Card>
      </Grid>
  )
}
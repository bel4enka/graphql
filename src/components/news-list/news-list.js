import {
    Container,
    Grid,
} from "@mui/material";
import {gql, useQuery} from '@apollo/client';
import {NewsListItem} from "./news-list-item/news-list-item";
import {QueryResult} from "../query-result/query-result";

export const NEWS = gql`
    query News {
        news {
            title
            date
            author
            uuid
            likes
        }
    }
`;

export const NewsList = () => {
    const {loading, error, data} = useQuery(NEWS);
    

    return (
        <Container sx={{ py: 8 }} maxWidth="md">
            <Grid container spacing={4}>
                <QueryResult error={error} loading={loading} data={data}>
                {data?.news?.map((item,i)=>
                    <NewsListItem key={i} item={item}/>
                )}
                </QueryResult>
            </Grid>
        </Container>
    )
}
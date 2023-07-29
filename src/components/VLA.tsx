import React from 'react';
import { useQuery, gql } from '@apollo/client'
import { ApolloClient, InMemoryCache } from '@apollo/client';
import IdentityScore from './IdentityScore';
import Grid from '@mui/material/Grid';
import Rank from './Rank';

const client = new ApolloClient({
    uri: "https://api.thegraph.com/subgraphs/name/sunagi/verylonganimals",
    cache: new InMemoryCache(),
})
const TOP_HOLDERS = gql`
{
    holders(first: 10, orderBy: tokenCount, orderDirection: desc) {
      id
      tokenCount
    }
  }
  `;
  
  const HOLDER_TOKENS = gql`
  query HolderTokens($id: ID!) {
    holder(id: $id) {
      id
      tokens {
        id
        acquisitionTime
      }
    }
  }
`;

export default function VLALeaderBoard() {
    const { loading: loadingTopHolders, error: errorTopHolders, data: dataTopHolders } = useQuery(TOP_HOLDERS);
  
    if (loadingTopHolders) return <p>Loading...</p>;
    if (errorTopHolders) return <p>Error : {errorTopHolders.message}</p>;
  
    const topHolders = dataTopHolders.holders;
  
    return (
      <div>
        <h2>Top 10 Holders by NFT Count</h2>
        {topHolders.map((holder, index) => (
          <HolderRanking key={holder.id} rank={index + 1} holderId={holder.id} />
        ))}
      </div>
    );
  }
  
  function HolderRanking({ rank, holderId }) {
    const { loading, error, data } = useQuery(HOLDER_TOKENS, {
      variables: { id: holderId },
    });
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
  
    const holder = data.holder;
    const currentTime = Date.now() / 3600000;
    const totalHoldingTime = holder.tokens.reduce((sum, token) => sum + (currentTime - token.acquisitionTime), 0);
  
    return (
      <div>
        <h3>Rank: {rank}</h3>
        <p>Holder ID: {holder.id}</p>
        <p>Total Holding Time: {totalHoldingTime} seconds</p>
      </div>
    );
  }

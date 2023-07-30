import React, { useEffect, useState } from 'react';
import Rank from '../components/Rank';
import VLA from '../pictures/VLA.png'
import Card from '../components/Card'
import { useQuery, gql, ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

// Add type for holder
type Holder = {
  id: string;
  tokenCount: number;
};

// Add type for token
type Token = {
  id: string;
  acquisitionTime: number;
};

const client = new ApolloClient({
    uri: "https://api.thegraph.com/subgraphs/name/sunagi/vla",
    cache: new InMemoryCache(),
});

const TOP_HOLDERS = gql`
{
    holders(first: 100, orderBy: tokenCount, orderDirection: desc) {
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

function HolderRanking({ rank, holder }: { rank: number; holder: Holder; }) {
    const { loading, error, data } = useQuery(HOLDER_TOKENS, {
      variables: { id: holder.id },
    });
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
  
    const currentTime = Date.now() / 1000; // Convert current time to seconds
    const totalHoldingTime = data.holder.tokens.reduce((sum: number, token: Token) => sum + (currentTime - token.acquisitionTime) / 3600, 0); // Convert the difference to hours
  
    const totalHoldingTimeRounded = Math.floor(totalHoldingTime); // Round down to the nearest whole number
  
    return (
      <div>
        <Rank n={rank} />
        <p>Holder ID: {holder.id}</p>
        <p>Total Holding Time: {totalHoldingTimeRounded} hours</p>
        <p>Token Count: {holder.tokenCount}</p>
      </div>
    );
}  

function VLALeaderBoard() {
    const { loading, error, data } = useQuery(TOP_HOLDERS);
  
    const [holders, setHolders] = useState<Holder[]>([]);
  
    useEffect(() => {
      if (data && data.holders) {
        // Fetch each holder's tokens and calculate the total holding time
        Promise.all(data.holders.map(async (holder: Holder) => {
          const result = await client.query({
            query: HOLDER_TOKENS,
            variables: { id: holder.id },
          });
  
          const currentTime = Date.now() / 1000; // Convert current time to seconds
          const totalHoldingTime = result.data.holder.tokens.reduce((sum: number, token: Token) => sum + (currentTime - token.acquisitionTime) / 3600, 0); // Convert the difference to hours
  
          return {
            ...holder,
            totalHoldingTime,
          };
        })).then(holdersWithHoldingTime => {
          // Sort holders by total holding time
          const sortedHolders = holdersWithHoldingTime.sort((a, b) => b.totalHoldingTime - a.totalHoldingTime);
          setHolders(sortedHolders);
        });
      }
    }, [data]);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
  
    if (!data || !data.holders) return <p>No data available</p>;
  
    return (
      <div>
        <h2>Top Holders by NFT Holding Time</h2>
        {holders.slice(0, 50).map((holder: Holder, index: number) => (
          <HolderRanking key={holder.id} rank={index + 1} holder={holder} />
        ))}
      </div>
    );
  }

export default function NFTForesightLanking() {
  return (
    <>
      <Card image={VLA} title="VeryLongAnimals" style={{ marginBottom: '20px' }} link={''} />
      <ApolloProvider client={client}>
        <VLALeaderBoard />
      </ApolloProvider>
    </>
  )
}

import { useState } from "react";
import { fetchCoinData } from "../../services/fetchCoinData";
import { useQuery } from "@tanstack/react-query";

function CoinTable({ currency }) {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["coins", page, currency],
    queryFn: () => fetchCoinData(page, currency),
    // retry: 2,
    // retryDelay: 1000,
    gcTime: 1000 * 60 * 2,
    staleTime: 1000 * 60 * 2,
  });

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="my-5 flex flex-col items-center justify-center gap-5 w-[80vw] mx-auto ">
      <div className="w-full bg-yellow-400 text-black flex py-4 px-2 font-semibold items-center justify-center">
        {/* header of the table */}
        <div className="basis-[35%]">Coin</div>
        <div className="basis-[25%]">Price</div>
        <div className="basis-[20%]">24hr Change</div>
        <div className="basis-[20%]">Market Cap</div>
      </div>

      <div className="flex flex-col w-[80vw] mx-auto">
        {isLoading && <div>Loading......</div>}
        {data &&
          data.map((coin) => {
            return (
              <div
                key={coin.id}
                className="w-full flex bg-transparent text-black py-4 px-2 font-semibold items-center justify-center"
              >
                <div className="flex items-center justify-start gap-3 basis-[35%]">
                  <div className="w-20 h-20">
                    <img src={coin.image} className="h-full w-full" />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-3xl">{coin.name}</div>
                    <div className="text-xl">{coin.symbol}</div>
                  </div>
                </div>

                <div className="basis-[25%] ">{coin.high_24h}</div>
                <div className="basis-[20%] ">{coin.price_change_24h}</div>
                <div className="basis-[20%] ">{coin.market_cap}</div>
              </div>
            );
          })}
      </div>

      <div className="flex items-center justify-center gap-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="btn btn-primary text-white btn-wide text-2xl"
        >
          Prev
        </button>

        <button
          onClick={() => setPage(page + 1)}
          className="btn btn-primary text-white btn-wide text-2xl"
        >
          Next
        </button>
      </div>
    </div>
  );
}
export default CoinTable;

import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { fetchCoinDetails } from "../services/fetchCoinDetails"
import { useContext, useEffect } from "react"
import parse from'html-react-parser'
import { CurrencyContext } from "../context/CurrencyContext"

function CoinDetailsPage(){
    const {currency} = useContext(CurrencyContext);
    const {coinId} = useParams()
   const { data:coin, isLoading, isError, error } = useQuery({
        queryKey :['coins', coinId],
        queryFn : ()=> fetchCoinDetails(coinId),
        gcTime: 1000 * 60 * 2,
        staleTime: 1000 * 60 * 2,
    })
    useEffect(()=>{
        console.log(coin,'date')
    },[coin])

    if(isLoading){
        return <div>Loading......</div>
    }
    if (isError) {
    return <div>{error.message}</div>;
  }
    
    return(
            <div className="flex flex-col md:flex-row">
               
               <div className="md:w-1/3 w-full flex flex-col  mt-6 md:mt-0 border-r-2 border-gray-500"> 
                <img className="w-52 mb-2"
                src={coin?.data?.image?.large} 
                alt={coin?.data?.name} />

                <h1 className="text-4xl font-bold mb-5 text-black">{coin?.data?.name}</h1>

                <p className="w-full px-4 py-6 text-justify">
                    {parse(coin?.data?.description?.en)}</p>
                <div className="w-full flex flex-col md:flex-row md:justify-around">
                    <div className="flex items-center mb-4 md:mb-0">
                            <h2 className="text-xl font-bold">Rank</h2>
                            <span className="ml-3 text-xl ">{coin?.data?.market_cap_rank}</span>
                    </div>

                     <div className="flex items-center mb-4 md:mb-0">
                            <h2 className="text-xl text-yellow-400 font-bold">Current Price</h2>
                            <span className="ml-3 text-xl ">{coin?.data?.market_data?.current_price[currency]}</span>
                    </div>
                </div>
               </div>

               <div className="md:w-2/3 w-full p-6">
                    Coin Information
               </div>
            </div>
    )
}

export default CoinDetailsPage
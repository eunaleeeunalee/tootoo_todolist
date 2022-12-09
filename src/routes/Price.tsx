import {useQuery} from "react-query";
import {fetchCoinHistory} from "../api";
import ApexChart from "react-apexcharts"
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";
import { useTheme } from "styled-components";

interface IHistory {
    time_open: number;
    time_close: number;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    market_cap: number;
};

interface ChartProps{
    coinId: string;
};

function Price({coinId}:ChartProps){
    const theme = useTheme();
    const isDark = useRecoilValue(isDarkAtom);  
    const{isLoading, data} =useQuery<IHistory[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId)
    );
    return <div>{isLoading ? "Loading chart...": <ApexChart
    type="candlestick" 
    options = {{
        chart:{
        height: 500,
        width: 500,
        toolbar: {
            show: false
        }
        },
        plotOptions: {
            candlestick: {
              colors: {
                upward: theme.accentColor,
                downward: '#FF6388'
              }
            }
        },
        theme: {
            mode: isDark ? "dark":"light",
        },
        xaxis:{
            type: "datetime",
            categories:  data?.map((price) =>
            new Date(price.time_close * 1000).toISOString()
            ),
        },
        tooltip: {
            y: {
                formatter: (value) => `$ ${value.toFixed(2)}`
            }
        }
        }}
        series = {[
            {data: data?.map((price) => {
                return{
                x: new Date(price.time_close * 1000).toISOString(),
                y: [parseFloat(price.open), parseFloat(price.high), parseFloat(price.low), parseFloat(price.close)]
                }
                })
                }] as any}
    
    />}</div>
}

export default Price;
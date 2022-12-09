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



function Chart({coinId}:ChartProps){
    const theme = useTheme();
    const isDark = useRecoilValue(isDarkAtom);  
    const{isLoading, data} =useQuery<IHistory[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId)
    );
    return <div>{isLoading ? "Loading chart...": <ApexChart 
        type="line" 
        options = {{
            chart:{
            height: 500,
            width: 500,
            toolbar: {
                show: false
            }
            },
            stroke: {
                curve: "smooth",
                width: 5,
            },
            theme: {
                mode: isDark ? "dark":"light",
            },
            // fill: {
                
            //     type:"solid", 
            //     // gradient: {gradientToColors: ["blue"], stops: [0, 100]}
            // },
            colors: [theme.accentColor],
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
            {
                name: "Price",
                data: data?.map((price) => parseFloat(price.close))??[]
            }
        ]}
        />}</div>
}

export default Chart;
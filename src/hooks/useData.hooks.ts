import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {IData} from "../services/contracts";
import {DataService} from "../services/data-service";

enum ArticleKeys {
    BIG_DATA = 'big_data',
    SMALL_DATA = 'less_data'
}

function useData(isBigData: boolean): UseQueryResult<IData[]> {
    return useQuery([isBigData ? ArticleKeys.BIG_DATA : ArticleKeys.SMALL_DATA],
        () => isBigData ? DataService.getData() : DataService.getLessData())
}

export { useData }
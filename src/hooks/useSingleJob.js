import {useQuery, } from '@tanstack/react-query';
import { getSingleJob } from '../service/job.api';


export const useSingleJobQuery = (id) => {
    const {data, error, isLoading, isSuccess, isError} = useQuery(['singleJob', id], getSingleJob);
    return {
        data,
        error,
        isLoading,
        isSuccess,
        isError,
    };
}
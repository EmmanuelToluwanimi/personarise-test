import {useQuery, useQueryClient, useMutation} from '@tanstack/react-query';
import { createJobs, getSingleJob, getJobs, } from '../service/job.api';

export const useJobQuery = () => {
    const {data, error, isLoading, isSuccess, isError} = useQuery(['jobs'], getJobs);
    return {
        data,
        error,
        isLoading,
        isSuccess,
        isError,
    };
}

export const createJobMutation = () => {
    const queryClient = useQueryClient();

    return useMutation (createJobs, {
        onSuccess: (data) => {
            queryClient.setQueryData(['jobs'], data);
        },
        onError: (error) => {
            // console.log(error);
            throw error;
        }
    })
}

export const deletePostMutation = () => {
    const queryClient = useQueryClient();

    return useMutation (deletePost, {
        onSuccess: (data) => {
            queryClient.setQueryData(['posts'], data);
        },
        onError: (error) => {
            // console.log(error);
            throw error;
        }
    })
}

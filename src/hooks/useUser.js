import {useQuery, useQueryClient, useMutation} from '@tanstack/react-query';
import {login, register} from '../service/auth.api';

const dummyUser = ()=>{
    const _x = localStorage.getItem('user');
    const user = _x ? JSON.parse(_x) : null;

    if(!user){
        throw 'User not found';
    }

    return user;
};


export const useUserQuery = () => {
    const {data, error, isLoading, isSuccess, isError} = useQuery(['user'], dummyUser);
    
    return {
        data,
        error,
        isLoading,
        isSuccess,
        isError,
    };
}

export const loginMutation = () => {
    const queryClient = useQueryClient();

    return useMutation (login, {
        onSuccess: (data) => {
            queryClient.setQueryData(['user'], data);
        },
        onError: (error) => {
            // console.log(error);
            throw error;
        }
    })
}

export const registerMutation = () => {
    const queryClient = useQueryClient();

    return useMutation (register, {
        onSuccess: (data) => {
            queryClient.setQueryData(['user'], data);
        },
        onError: (error) => {
            // console.log(error);
            throw error;
        }
    })
}
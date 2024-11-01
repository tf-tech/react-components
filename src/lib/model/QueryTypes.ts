export interface LazyUseQuery<TArgs, TResult> {
    (): [QueryTrigger<TArgs, TResult>, UseQueryResult<any>, LastQueryInfo<TArgs>]
}

export interface LastQueryInfo<TArgs> {
    lastArg?: TArgs
}

export interface QueryTrigger<TArgs, TResult> {
    (args?: TArgs): Promise<UseQueryResult<TResult>>
}

export interface UseQuery<TArgs, TResult> {
    (args?: TArgs): UseQueryDefinition<TResult>
}

export interface UseQueryDefinition<TResult> {
    data?: TResult
    error?: any
    isLoading: boolean
    isFetching: boolean
    refetch: (() => void)
}

export interface UseQueryResult<TResult> {
    data?: TResult
    isLoading: boolean
    isError: boolean
    error?: any
}

export interface MutationQuery<TArgs, TResult> {
    (): readonly [MutationQueryTrigger<TArgs, TResult>, MutationQueryResult<TResult>]
}

export interface MutationQueryTrigger<TArgs, TResult> {
    (args: TArgs): Promise<MutationQueryResult<TResult>>
}

export interface MutationQueryResult<TResult> {
    data?: TResult
    error?: any
}
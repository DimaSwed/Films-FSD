import { LoadingErrorState } from '@/shared/ui'

interface ILoadingOrErrorProps {
  isLoading: boolean
  isError: boolean
  error?: unknown
}

export const LoadingOrError = ({ isLoading, isError, error }: ILoadingOrErrorProps) => (
  <LoadingErrorState
    isLoading={isLoading}
    isError={isError}
    error={error}
    loadingText="Загружаем ваш список просмотра..."
    errorTitle="Ошибка загрузки списка"
    errorDescription="Не удалось загрузить ваш список фильмов к просмотру"
  />
)

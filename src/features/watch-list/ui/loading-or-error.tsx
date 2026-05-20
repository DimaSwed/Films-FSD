import { LoadingErrorState } from '@/shared/ui'

interface ILoadingOrErrorProps {
  isLoading: boolean
  isError: boolean
}

export const LoadingOrError = ({ isLoading, isError }: ILoadingOrErrorProps) => (
  <LoadingErrorState
    isLoading={isLoading}
    isError={isError}
    loadingText="Загружаем ваш список просмотра..."
    errorTitle="Ошибка загрузки списка"
    errorDescription="Не удалось загрузить ваш список фильмов к просмотру"
  />
)

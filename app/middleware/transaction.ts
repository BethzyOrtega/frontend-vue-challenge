export default defineNuxtRouteMiddleware(() => {
  const dataTransferStore = useDataTranfer()

  if (!dataTransferStore.accountNumber) {
    return navigateTo('/transactions')
  }
})
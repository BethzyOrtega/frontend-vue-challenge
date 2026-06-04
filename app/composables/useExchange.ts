interface ExchangeRateResponse {
  bid: number;
  bidChange: number;
  ask: number;
  askChange: number;
  date: string;
  author: string;
  created: string;
}

export interface ExchangeResponse {
  rate: number;
  exchange: number;
  savings: {
    amount: number;
    currency: string;
  };
}



export const useExchange = () => {
  const operationType = ref<"buy" | "sell">("buy");

  const exchangeRate = ref(0);
  const amountSent = ref(0);
  const amountReceived = ref(0);
  const coupon = ref("");
  const bid = ref(0);
  const ask = ref(0);
  const savingsAmount = ref(0);
  const savingsCurrency = ref("");

  const getCurrentExchangeRate = async () => {
    try {
      const response = await $fetch<ExchangeRateResponse>(
        "https://api.kambista.com/v1/exchange/kambista/current",
      );
      exchangeRate.value = response.ask;
      bid.value = response.bid;
      ask.value = response.ask;
      exchangeRate.value =
        operationType.value === "buy"
          ? response.ask
          : response.bid;
    } catch (error) {
      console.log(error);
    }
  };

  const calculateExchange = async () => {
    try {
      const originCurrency =
        operationType.value === "buy"
          ? "PEN"
          : "USD";

      const destinationCurrency =
        operationType.value === "buy"
          ? "USD"
          : "PEN";

      const response = await $fetch<ExchangeResponse>(
        `https://api.kambista.com/v1/exchange/calculates?originCurrency=${originCurrency}&destinationCurrency=${destinationCurrency}&amount=${amountSent.value}&active=S`
      );

      amountReceived.value = response.exchange;
      exchangeRate.value = response.rate;

      savingsAmount.value = response.savings.amount;
      savingsCurrency.value = response.savings.currency;
    }
    catch (error) {
      console.error(error);
    }
  };

  return {
    operationType,
    getCurrentExchangeRate,
    calculateExchange,
    exchangeRate,
    amountSent,
    amountReceived,
    coupon,
    bid,
    ask,
    savingsAmount,
    savingsCurrency,
  };
};

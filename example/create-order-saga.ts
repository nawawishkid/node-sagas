import { CreateOrderSagaParams } from './create-order-saga-params';
import { Saga, SagaBuilder, SagaCompensationFailed, SagaExecutionFailed } from "../";

export class CreateOrderSaga {

  public async execute(params: CreateOrderSagaParams): Promise<CreateOrderSagaParams> {
    const saga = this.getCreateOrderSagaDefinition();
    try {
      return await saga.execute(params);
    } catch (e) {
      if (e instanceof SagaExecutionFailed) {
        // Throws, when invocation flow was failed, but compensation has been completed
      }
      if (e instanceof SagaCompensationFailed) {
        // Throws, when compensation flow was failed
      }
    }
  }

  private getCreateOrderSagaDefinition(): Saga<CreateOrderSagaParams> {
    const sagaBuilder = new SagaBuilder<CreateOrderSagaParams>();
    return sagaBuilder
      .step()
      .invoke((params: CreateOrderSagaParams) => {
        // create order logic
      })
      .withCompensation((params: CreateOrderSagaParams) => {
        // reject order logic
      })
      .step()
      .invoke((params: CreateOrderSagaParams) => {
        // reserve credit
      })
      .step()
      .invoke((params: CreateOrderSagaParams) => {
        // approve order
      })
      .build();
  }
}

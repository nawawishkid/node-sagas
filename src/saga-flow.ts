import { SagaStepInvocationFailed } from './exceptions';
import { SagaStepCompensationFailed } from './exceptions/saga-step-compensation-failed';
import { Step } from './step';

export class SagaFlow<T> {
  private readonly steps: Step<T>[];
  private compensationSteps: Step<T>[] = [];

  constructor(steps: Step<T>[] = []) {
    this.steps = steps;
  }

  async invoke(params: T): Promise<void> {
    for (const step of this.steps) {
      this.compensationSteps.push(step);

      try {
        await step.invoke(params);
      } catch (e) {
        throw new SagaStepInvocationFailed(e, step.getName());
      }
    }
  }

  async compensate(params: T): Promise<void> {
    for (const step of this.compensationSteps.reverse()) {
      try {
        await step.compensate(params);
      } catch (e) {
        throw new SagaStepCompensationFailed(e, step.getName());
      }
    }
  }
}

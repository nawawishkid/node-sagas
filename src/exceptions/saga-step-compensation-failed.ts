export class SagaStepCompensationFailed extends Error {
  originalError: Error;
  stepName: string;

  constructor(e: Error, stepName: string = null) {
    super(e.message);
    this.stack = e.stack;
    this.originalError = e;
    this.stepName = stepName;
  }
}

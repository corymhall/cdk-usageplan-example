import * as cdk from '@aws-cdk/core';
import * as apigateway from '@aws-cdk/aws-apigateway';

export class CdkUsageplanExampleStack extends cdk.Construct {
  public readonly usagePlan: apigateway.UsagePlan;

  constructor(scope: cdk.Construct, id: string) {
    super(scope, id);

    this.usagePlan = new apigateway.UsagePlan(this, 'MyUsagePlan');
  }
}

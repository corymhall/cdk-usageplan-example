import * as cdk from '@aws-cdk/core';
import * as apigateway from '@aws-cdk/aws-apigateway';

export interface StageProps {
    usagePlan: apigateway.UsagePlan;
    restApi: apigateway.IRestApi;
    stageName: string;
}

export class ApiStage extends cdk.Construct {
  constructor(scope: cdk.Construct, id: string, props: StageProps) {
    super(scope, id);
    
    const stage = new apigateway.Stage(this, 'MyStage', {
      stageName: props.stageName,
      deployment: new apigateway.Deployment(this, 'Deployment', {
          api: props.restApi,
      }),
    });
    
    props.usagePlan.addApiStage({
      api: props.restApi,
      stage,
    });
  }
}

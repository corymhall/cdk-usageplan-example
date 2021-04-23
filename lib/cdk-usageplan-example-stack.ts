import * as cdk from '@aws-cdk/core';
import * as apigateway from '@aws-cdk/aws-apigateway';
import * as fs from 'fs';
import * as path from 'path';

export interface UsagePlanStage {
  readonly apiId: string;
  readonly stageName: string;
  
}

export class CdkUsageplanExampleStack extends cdk.Construct {
  public readonly usagePlan: apigateway.UsagePlan;

  private readonly apiStages = new Array<UsagePlanStage>();

  constructor(scope: cdk.Construct, id: string) {
    super(scope, id);

    this.usagePlan = new apigateway.UsagePlan(this, 'MyUsagePlan');
    
    const apiStages = cdk.Lazy.any({ produce: () => this.renderApiStages(this.apiStages) });
    
    // dynamically read stage json files
    const fileNames = fs.readdirSync(path.join(__dirname, './stages'));
    fileNames.forEach((file: string) => {
      let rawData = fs.readFileSync(path.join(__dirname, './stages', file));
      let data = JSON.parse(rawData.toString());
      this.apiStages.push({
        apiId: data.apiId,
        stageName: data.stageName,
      });
    });
    
    // escape hatch to update the underlying Cfn resource
    const cfnUsagePlan = this.usagePlan.node.defaultChild as apigateway.CfnUsagePlan;
    cfnUsagePlan.apiStages = apiStages;
  }
  
  public addApiStage(apiStage: UsagePlanStage) {
    this.apiStages.push(apiStage);
  }
  
  private renderApiStages(apiStages: UsagePlanStage[] | undefined): apigateway.CfnUsagePlan.ApiStageProperty[] | undefined {
    if (apiStages && apiStages.length > 0) {
      const stages: apigateway.CfnUsagePlan.ApiStageProperty[] = [];
      this.apiStages.forEach((apiStage: UsagePlanStage) => {
        stages.push({
          apiId: apiStage.apiId,
          stage: apiStage.stageName,
        });
      });
      return stages;
    }
    return undefined;
  }
}

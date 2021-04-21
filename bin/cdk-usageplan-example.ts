#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import * as apigateway from '@aws-cdk/aws-apigateway';
import { CdkUsageplanExampleStack } from '../lib/cdk-usageplan-example-stack';
import { ApiStage } from '../lib/stage';

// my cdk application
const app = new cdk.App();

// create a stack that I will use for all my resources
const stack = new cdk.Stack(app, 'MyUsagePlanStack');

// import or create my rest api
const restApi = apigateway.RestApi.fromRestApiId(stack, 'ImportedRestApi', 'REPLACE_WITH_API_ID');

// create a usage plan
const usagePlan = new CdkUsageplanExampleStack(stack, 'CdkUsageplanExampleStack');

// create any number of Stages and attach to the usage plan
new ApiStage(stack, 'Stage1', {
  restApi,
  usagePlan: usagePlan.usagePlan,
  stageName: 'stage1',
});

new ApiStage(stack, 'Stage2', {
  restApi,
  usagePlan: usagePlan.usagePlan,
  stageName: 'Stage2',
});

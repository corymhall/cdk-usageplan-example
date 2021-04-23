#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import * as apigateway from '@aws-cdk/aws-apigateway';
import { CdkUsageplanExampleStack } from '../lib/cdk-usageplan-example-stack';
import { stage } from '../lib/stage';

// my cdk application
const app = new cdk.App();

// create a stack that I will use for all my resources
const stack = new cdk.Stack(app, 'MyUsagePlanStack');

// create a usage plan
const usagePlan = new CdkUsageplanExampleStack(stack, 'CdkUsageplanExampleStack');

// option 1
usagePlan.addApiStage({
  apiId: 'api1',
  stageName: 'prod',
});

// option 2
usagePlan.addApiStage(stage);
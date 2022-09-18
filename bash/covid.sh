#!/bin/bash
# This script downloads covid data and displays it

DATA=$(curl https://api.covidtracking.com/v1/us/current.json)
POSITIVE=$(echo $DATA | jq '.[0].positive')
POSITIVE_INCREASE=$(echo $DATA | jq '.[0].positiveIncrease')
HOSPITALIZED_CURRENTLY=$(echo $DATA | jq '.[0].hospitalizedCurrently')
HOSPITALIZED_INCREASE=$(echo $DATA | jq '.[0].hospitalizedIncrease')


TODAY=$(date)

echo "On $TODAY, there were $POSITIVE positive COVID cases, which is an increase of $POSITIVE_INCREASE. There are currently $HOSPITALIZED_CURRENTLY hostpialized, which is an increase of $HOSPITALIZED_INCREASE."

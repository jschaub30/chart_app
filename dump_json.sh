#!/bin/bash

set -x 
python manage.py dumpdata --indent=2 auth.User > orgchart/fixtures/admin.json
#python manage.py dumpdata --indent=2 orgchart.org > orgchart/fixtures/orgs.json  <--NEVER DO THIS!!

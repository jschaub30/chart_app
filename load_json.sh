#!/bin/bash

python manage.py loaddata orgchart/fixtures/admin.json
python manage.py loaddata orgchart/fixtures/orgs.json

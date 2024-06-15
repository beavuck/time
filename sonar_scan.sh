#!/bin/bash
sonar-scanner \
  -Dsonar.projectKey=Beavuck-Time \
  -Dsonar.sources=. \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.token=sqp_92546c7cedcf11808a71d45ffb1731402e363a3e

# Local SonarQube server, so the token doesn't matter

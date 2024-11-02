#!/bin/bash

show_help() {
    echo "Usage: $0 -s source_file_path [-t test_file_path] [-c coverage] [-i iterations] [-m model]"
    echo ""
    echo "Options:"
    echo "  -s  Source file path (required)"
    echo "  -t  Test file path (optional)"
    echo "  -c  Desired coverage (default: 95)"
    echo "  -i  Maximum iterations (default: 5)"
    echo "  -m  Model to use (default: gpt-4o-mini)"
    echo "  -h  Show this help message"
}

coverage=95
iterations=5
model="gpt-4o-mini"
source_file_path=""
test_file_path=""

while getopts s:t:c:i:m:h flag
do
    case "${flag}" in
        s) source_file_path=${OPTARG};;
        t) test_file_path=${OPTARG};;
        c) coverage=${OPTARG};;
        i) iterations=${OPTARG};;
        m) model=${OPTARG};;
        h) show_help; exit 0;;
        *) echo "Invalid argument provided"; show_help; exit 1;;
    esac
done

if [ -z "$source_file_path" ]; then
    echo "Error: Source file path (-s) is required."
    show_help
    exit 1
fi

if [ -z "$test_file_path" ]; then
    test_file_path=$(echo "$source_file_path" | sed 's|src/|src/__tests__/|' | sed 's/\.ts$/.test.ts/')
    echo "Test file path (-t) not provided. Optional. Assuming test file path is $test_file_path"
fi

cover-agent \
--model="$model" \
--source-file-path "$source_file_path" \
--test-file-path "$test_file_path" \
--desired-coverage "$coverage" \
--max-iterations "$iterations" \
--code-coverage-report-path "coverage/cobertura-coverage.xml" \
--test-command "npm test" \
--test-command-dir "./" \
--coverage-type "cobertura" \
--additional-instructions "- Please make sure to write your tests within the test classes -- i.e., before the closing brace ('}') of the test class.
- Please do not comment your code unless it would be exceptionally useful.
- Please ignore the python snake_case style you may have been asked to follow, and instead follow the existing code style, with method names in camelCase.
- Please try to increase all coverage metrics, such as line coverage, branch coverage and complexity coverage."

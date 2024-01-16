# Bus-Factor-Analyzer
The bus factor measures the project's resistance to the sudden engineer turnover. It indicates the bare minimum of engineers that must be struck by a bus in order for a project to come to a standstill.


# Usage

Run **git log** as follows
```
git log --no-merges --name-status main > ~/gitlog.txt
```

## Summary
Key contributors, Least contributor bus factor based on threshold that can be customized.

## Extension Diversity Ratio
The extension diversity ratio of files, provides insights into the distribution of different file types within the
project. The process involves examining each project file to identify its file extension.

## Author Relevance
Author relevance, offers a meaningful perspective on the contribution of individual authors within the
project.

## Git status
It provides a descriptive overview of the commit status for the authors within the project. 
it Structured to convey insights into commit activities over time, here  a table is presented with author names, total commits, and dynamic weekly columns. 
It offers quick assessments of author-specific contributions.

## Hit by bus

Hit by Bus allows users to simulate the scenario where
a specific project contributor, denoted as an ”experienced developer,” is unexpectedly no longer available.
The primary goal is to identify and visualize the potential impact on project files and their respective edits.

## Limitations

-Detecting Developer Aliases
-Calculating Developer's Knowledge
-Bus Factor of Different Modules


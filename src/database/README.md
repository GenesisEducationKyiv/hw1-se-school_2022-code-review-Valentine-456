# Database folder

Ця папка має 2 підпапки:
- **/data/**, який зберігає дані програми у випадку зберігання файлової системи замість бази даних.
- **/models/** зберігає models/repos даних у логіці програми. У майбутньому до цієї папки будуть додані різні вкладені папки для models/repos для різних СУБД, щоб бути Database agnostic:

<!-- This folder has  2 subfolder:
- **/data/** which stores application data in case of file system storage instead of a database.
- **/models/** stores models/repos of data in application logic. In the future, to this folder will be added different subfolders for models/repos for different DBMS in order to be database-agnostic: -->

  - **/files/**
  - **/mongo/**
  - **/postgres/**
  - **/mysql/**
  - і т. д...
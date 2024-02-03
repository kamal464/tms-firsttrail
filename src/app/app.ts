import { loadCldr } from "@syncfusion/ej2-base";

declare var require: NodeRequire;

loadCldr(
      require('cldr-data/main/de/numbers.json'),
      require('cldr-data/main/de/currencies.json'),
      require('cldr-data/supplemental/numberingSystems.json'),
      require('cldr-data/supplemental/currencyData.json')
  );

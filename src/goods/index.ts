/* eslint-disable @typescript-eslint/no-var-requires */
import { Bike } from "../scripts/bike";

export function getBikes(): Array<Bike> {
  const bikes: Array<Bike> = [];
  bikes.push(
    new Bike(
      1,
      "Welt Rockfall 1.0 29 2022 Glossy Carrot Red",
      require("../assets/images/Welt Rockfall 1.0 29 2022 Glossy Carrot Red.jpg"),
      4690,
      "Welt",
      "red",
      "adult",
      2022,
      0,
      10
    )
  );
  bikes.push(
    new Bike(
      2,
      "Welt Freedom Plus 3.0 27 2022 Matt Black",
      require("../assets/images/Welt Freedom Plus 3.0 27 2022 Matt Black.jpg"),
      5890,
      "Welt",
      "black",
      "adult",
      2022,
      1,
      5
    )
  );
  bikes.push(
    new Bike(
      3,
      "Welt Rockfall 1.0 27 2022 Matt Indigo Blue",
      require("../assets/images/Welt Rockfall 1.0 27 2022 Matt Indigo Blue.jpg"),
      4690,
      "Welt",
      "blue",
      "adult",
      2022,
      1,
      17
    )
  );
  bikes.push(
    new Bike(
      4,
      "Aspect Borneo 3 20 2022",
      require("../assets/images/Aspect Borneo 3 20 2022.jpg"),
      4690,
      "Aspect",
      "black",
      "adult",
      2022,
      0,
      4
    )
  );
  bikes.push(
    new Bike(
      5,
      "Aspect Weekend 26 2021",
      require("../assets/images/Aspect Weekend 26 2021.jpg"),
      4490,
      "Aspect",
      "blue",
      "adult",
      2021,
      1,
      2
    )
  );
  bikes.push(
    new Bike(
      6,
      "BEARBIKE Sochi 700C 2021",
      require("../assets/images/BEARBIKE Sochi 700C 2021.jpg"),
      3790,
      "BEARBIKE",
      "green",
      "adult",
      2021,
      0,
      34
    )
  );
  bikes.push(
    new Bike(
      7,
      "SCOTT Speedster 50 2021",
      require("../assets/images/SCOTT Speedster 50 2021.jpg"),
      12470,
      "SCOTT",
      "black",
      "adult",
      2021,
      0,
      7
    )
  );
  bikes.push(
    new Bike(
      8,
      "Format 5222 700С 2021",
      require("../assets/images/Format 5222 700С 2021.jpg"),
      6640,
      "Format",
      "green",
      "adult",
      2021,
      1,
      6
    )
  );
  bikes.push(
    new Bike(
      9,
      "Rocky Mountain Solo 50 2021",
      require("../assets/images/Rocky Mountain Solo 50 2021.jpg"),
      19690,
      "Rocky Mountain",
      "blue",
      "adult",
      2021,
      1,
      1
    )
  );
  bikes.push(
    new Bike(
      10,
      "Welt Peak 24 D 2022 Red",
      require("../assets/images/Welt Peak 24 D 2022 Red.jpg"),
      3090,
      "Welt",
      "red",
      "teenager",
      2022,
      1,
      34
    )
  );
  bikes.push(
    new Bike(
      11,
      "Welt Dingo 18 2022 Deep Blue",
      require("../assets/images/Welt Dingo 18 2022 Deep Blue.jpg"),
      1690,
      "Welt",
      "blue",
      "child",
      2022,
      0,
      23
    )
  );
  bikes.push(
    new Bike(
      12,
      "Welt BMX Freedom 1.0 2022 Dark Red.jpg",
      require("../assets/images/Welt BMX Freedom 1.0 2022 Matt Dark Red.jpg"),
      2390,
      "Welt",
      "red",
      "adult",
      2022,
      1,
      9
    )
  );
  bikes.push(
    new Bike(
      13,
      "Royal Baby Space Shuttle 18 2022 Black",
      require("../assets/images/Royal Baby Space Shuttle 18 2022 Black.jpg"),
      1980,
      "Royal Baby",
      "black",
      "child",
      2022,
      1,
      2
    )
  );
  bikes.push(
    new Bike(
      14,
      "Welt Peak 24 D 2018 Dark Green",
      require("../assets/images/Welt Peak 24 D 2018 Dark Green.jpg"),
      3090,
      "Welt",
      "green",
      "child",
      2018,
      0,
      7
    )
  );
  bikes.push(
    new Bike(
      15,
      "Welt Floxy 26 Rigid 2019 Silver Blue",
      require("../assets/images/Welt Floxy 26 Rigid 2019 Silver Blue.jpg"),
      3090,
      "Welt",
      "blue",
      "teenager",
      2019,
      0,
      1
    )
  );
  bikes.push(
    new Bike(
      16,
      "Welt Peak 1.0 HD 24 2022 Matt Black",
      require("../assets/images/Welt Peak 1.0 HD 24 2022 Matt Black.jpg"),
      3990,
      "Welt",
      "black",
      "teenager",
      2022,
      0,
      10
    )
  );
  bikes.push(
    new Bike(
      17,
      "Rocky Mountain Altitude A50 27,5 2021",
      require("../assets/images/Rocky Mountain Altitude A50 27,5 2021 Black.jpg"),
      42990,
      "Rocky Mountain",
      "black",
      "adult",
      2021,
      0,
      5
    )
  );
  bikes.push(
    new Bike(
      18,
      "Rocky Mountain Slayer A30 27,5 2021",
      require("../assets/images/Rocky Mountain Slayer A30 27,5 2021 Blue.jpg"),
      36490,
      "Rocky Mountain",
      "blue",
      "adult",
      2021,
      0,
      8
    )
  );
  bikes.push(
    new Bike(
      19,
      "Welt Edelweiss 1.0 D 26 2022 Blue",
      require("../assets/images/Welt Edelweiss 1.0 D 26 2022 Dark Ocean Blue.jpg"),
      3490,
      "Welt",
      "blue",
      "adult",
      2022,
      0,
      14
    )
  );
  bikes.push(
    new Bike(
      20,
      "Felt QX75 2022 Black",
      require("../assets/images/Felt QX75 2022 Black.jpg"),
      5490,
      "Felt",
      "black",
      "adult",
      2022,
      0,
      20
    )
  );
  bikes.push(
    new Bike(
      21,
      "Welt Dingo 16 2022 Fire Red",
      require("../assets/images/Welt Dingo 16 2022 Fire Red.jpg"),
      1590,
      "Welt",
      "red",
      "child",
      2022,
      0,
      31
    )
  );
  bikes.push(
    new Bike(
      22,
      "Aspect Spark 16 2022",
      require("../assets/images/Aspect Spark 16 2022.jpg"),
      1690,
      "Aspect",
      "green",
      "child",
      2022,
      0,
      17
    )
  );
  return bikes;
}

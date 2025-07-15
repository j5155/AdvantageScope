# AdvantageScope Roadrunner Support

This is a fork of AdvantageScope adding support for Roadrunner's replay system. Install from the Releases tab as normal.

Roadrunner automatically logs your robot's current position, target position, and various other replay data each run.
This means you can use AdvantageScope immediately with **zero** robot code changes if you use Road Runner.

**Download these logs from 192.168.43.1:8080/logs.**
Then you can open or drag and drop them into AdvantageScope.

## Adding Custom Data

Roadrunner automatically logs position and following data.
However, you may also want to log your own fields, such as for motor control or sensor data.

You can add custom data using `FlightRecorder.write("LABEL",any object)`.
Roadrunner will automatically parse almost any object or type into a bit-efficient, custom format,
so you don't need to worry about splitting it up.
For most usages, the messages classes built into the QuickStart are helpful for easier parsing.

You can separate your log data by using / in the label.
Slashes divide the data into individual folders in AdvantageScope.

You can also use the DownsampledWriter class, as used in MecanumDrive, to log data at a lower interval.

If you want to automatically log your telemetry, a [LogTelemetry](https://github.com/jdhs-ftc/2024/blob/master/TeamCode/src/main/java/org/firstinspires/ftc/teamcode/helpers/LogTelemetry.kt) class is available.
You can use this in an OpMode like so: `telemetry = new MultipleTelemetry(telemetry, FtcDashboard.getInstance().telemetry, LogTelemetry())`

AdvantageScope assumes that you log timestamps as the direct output of System.nanoTime(), like the Roadrunner Quickstart does.
If you're logging something without using the QuickStart, make sure at some point in your loop you are logging System.nanoTime() to a log field called `TIMESTAMP`, or logging an object containg a `long` field called `timestamp` set to System.nanoTime().

# ![AdvantageScope](/docs/docs/img/banner.png)

[![Build](https://github.com/Mechanical-Advantage/AdvantageScope/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/Mechanical-Advantage/AdvantageScope/actions/workflows/build.yml)

AdvantageScope is a robot diagnostics, log review/analysis, and data visualization application for FIRST teams developed by Team 6328. It reads logs in WPILOG, DS log, Hoot (CTRE), RLOG, and Roadrunner file formats, plus live robot data viewing using NT4 or RLOG streaming. AdvantageScope can be used with any WPILib project, but is also optimized for use with our [AdvantageKit](https://docs.advantagekit.org) log replay framework. Note that **AdvantageKit is not required to use AdvantageScope**.

AdvantageScope includes the following tools:

- A wide selection of flexible graphs and charts
- 2D and 3D field visualizations of pose data, with customizable CAD-based robots
- Synchronized video playback from a separately loaded match video
- Joystick visualization, showing driver actions on customizable controller representations
- Swerve drive module vector displays
- Console message review
- Log statistics analysis
- Flexible export options, with support for CSV and WPILOG

**View the [online documentation](https://docs.advantagescope.org) or find it offline by clicking the 📖 icon in the tab bar.**

Feedback, feature requests, and bug reports are welcome on the [issues page](https://github.com/Mechanical-Advantage/AdvantageScope/issues). For non-public inquiries, please send a message to software@team6328.org.

![Example screenshot](/docs/docs/img/screenshot-light.png)

## Installation

1. Find the [latest release](https://github.com/Mechanical-Advantage/AdvantageScope/releases/latest) under "Releases".
2. Download the appropriate build based on the OS & architecture. AdvantageScope supports Windows, macOS, and Linux on both x86 and ARM architectures.

> [!IMPORTANT]
> Before running AppImage builds on Ubuntu 23.10 or later, you must download the AppArmor profile from the releases page and copy it to `/etc/apparmor.d`.

## Building

To install Node.js dependencies, run:

```bash
npm install
```

[Emscripten](https://emscripten.org) 3.1.74 also needs to be installed (instructions [here](https://emscripten.org/docs/getting_started/downloads.html)).

To build for the current platform, run:

```bash
npm run build
```

To build for another platform, run:

```bash
npm run build -- --win --x64 # For full list of options, run "npx electron-builder help"
```

To build the WPILib or Lite distributions, set the environment variable `ASCOPE_DISTRIBUTION` before building:

```bash
export ASCOPE_DISTRIBUTION=WPILIB
export ASCOPE_DISTRIBUTION=LITE
```

For development, run:

```bash
npm run watch
npm start
```

## Assets

For details on adding custom assets, see [Custom Assets](https://docs.advantagescope.org/more-features/custom-assets).

Bundled assets are stored under [`bundledAssets`](/bundledAssets/). Larger assets are downloaded automatically by AdvantageScope from the [AdvantageScopeAssets](https://github.com/Mechanical-Advantage/AdvantageScopeAssets/releases) repository.

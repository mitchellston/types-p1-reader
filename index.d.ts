declare module "p1-reader" {
  export default class P1Reader {
    /**
     * Set the serialport configuration for your specific type of Smart Meter.
     *
     * {@link https://github.com/ruudverheijden/node-p1-reader/tree/master#known-configurations-per-dutch-dsmr-smart-meter-type Link to known configurations per Dutch DSMR Smart Meter Type}
     * @example
     * ```ts
     * const p1Reader = new P1Reader({
     *  port: '/dev/tty-usbserial1',
     *  baudRate: 115200,
     *  parity: "even",
     *  dataBits: 7,
     *  stopBits: 1
     * });
     * ```
     */
    constructor(options: {
      /** @param port Path of the serial port to which the Smart Meter is connected */
      port: string;
      /** @param baudRate Baud rate of the serial port  */
      baudRate: number;
      /** @param parity Parity of the serial port */
      parity: ("none" | "even") | string;
      /** @param dataBits Number of data bits used for the serial port  */
      dataBits: number;
      /** @param stopBits Number of stop bits used for the serial port */
      stopBits: number;
      /** @param emulator The emulator will emit a reading event every 10 seconds just like an actual Smart Meter would do with the most important variables (timestamp, electricity.received.tariff1, electricity.received.actual, gas.timestamp and gas.reading) being incremented. */
      emulator?: boolean;
      /** @param debug In debug mode all raw and parsed packages are written to 2 separate log files (debug-data-raw.log and debug-data-parsed.log) and stored in the directory from which the module was triggered. */
      debug?: boolean;
    });

    public on(event: P1ReaderEvent, callback: (data: any) => void): void;

    /**
     * When a connection with the Smart Meter was successfully setup
     * @example
     * ```ts
     * p1Reader.on('connected', () => {
     *  console.log('Connected to Smart Meter');
     * });
     * ```
     */
    public on(event: "connected", callback: () => void): void;

    /**
     * When a reading is received via the serial connection (should be on a 10 second interval)
     * @example
     * ```ts
     * p1Reader.on('reading', (data) => {
     *  // Write electricity totals and actual value to CSV
     *  const csvOutput = '' +
     *  data.timestamp + ';' +
     *  data.electricity.received.tariff1.reading + ';' +
     *  data.electricity.received.tariff2.reading + ';' +
     *  data.electricity.received.actual.reading + ';' +
     *  data.electricity.tariffIndicator + ';' +
     *  data.electricity.numberOfPowerFailures + ';' +
     *  data.electricity.numberOfLongPowerFailures + ';' +
     *  data.gas.timestamp + ';' +
     *  data.gas.reading + '\n';
     *  fs.appendFile('p1-reader-log.csv', csvOutput, err => {});
     * });
     * ```
     */
    public on(
      event: "reading",
      callback: (data: P1ReaderData.P1ReaderReadingData) => void
    ): void;

    /**
     * Same as the reading event but instead returning the raw data as a string
     * @example
     * ```ts
     * p1Reader.on('reading-raw', (data) => {
     *  // If you are interested in viewing the unparsed raw data that was received at the serial port
     *  console.log(data);
     * });
     * ```
     */
    public on(event: "reading-raw", callback: (data: string) => void): void;

    /**
     * When the serial connection emits an error
     * @example
     * ```ts
     * p1Reader.on('error', (err) => {
     *  console.log(err);
     * });
     * ```
     */
    public on(event: "error", callback: (err: Error) => void): void;

    /**
     * When the serial connection closes for some reason
     * @example
     * ```ts
     * p1Reader.on('close', () => {
     *  console.log('Connection closed');
     * });
     * ```
     */
    public on(event: "close", callback: () => void): void;
  }
  export type P1ReaderEvent =
    | "connected"
    | "reading"
    | "reading-raw"
    | "error"
    | "close";

  export namespace P1ReaderData {
    export type P1ReaderReadingData = {
      meterType: string;
      version: string;
      timestamp: string;
      equipmentId: string;
      textMessage: {
        codes: string;
        message: string;
      };
      electricity: ElectricityData;
      gas: GasData;
    };
    type GasData = {
      deviceType: string;
      equipmentId: string;
      timestamp: string;
      reading: number | null;
      unit: "m3" | null;
      valvePosition: "1" | "2" | null;
    };
    export type ElectricityData = {
      received: Electricity;
      delivered: Electricity;
      tariffIndicator: number | null;
      threshold: {
        value: number | null;
        unit: "kW" | null;
      };
      fuseThreshold: {
        value: number | null;
        unit: "A" | null;
      };
      switchPosition: "1" | "2" | null;
      numberOfPowerFailures: number | null;
      numberOfLongPowerFailures: number | null;
      longPowerFailureLog: {
        count: number | null;
        log: {
          startOfFailure: string | null;
          endOfFailure: string | null;
          duration: number | null;
          unit: "s" | null;
        }[];
      };
      voltageSags: {
        L1: number | null;
        L2: number | null;
        L3: number | null;
      };
      voltageSwell: {
        L1: number | null;
        L2: number | null;
        L3: number | null;
      };
      instantaneous: {
        current: Phases<"A">;
        voltage: Phases<"V">;
        power: {
          positive: Phases<"kW">;
          negative: Phases<"kW">;
        };
      };
    };
    export type Electricity = {
      tariff1: {
        reading: number | null;
        unit: "kWh" | null;
      };
      tariff2: {
        reading: number | null;
        unit: "kWh" | null;
      };
      actual: {
        reading: number | null;
        unit: "kW" | null;
      };
    };
    export type Phases<Unit extends string> = {
      L1: {
        reading: number | null;
        unit: Unit | null;
      };
      L2: {
        reading: number | null;
        unit: Unit | null;
      };
      L3: {
        reading: number | null;
        unit: Unit | null;
      };
    };
  }
}

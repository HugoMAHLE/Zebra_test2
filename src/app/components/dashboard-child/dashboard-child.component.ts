import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Console } from 'console';
import ZebraBrowserPrintWrapper from 'zebra-browser-print-wrapper';

@Component({
  selector: 'app-dashboard-child',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './dashboard-child.component.html',
  styleUrl: './dashboard-child.component.css'
})
export class DashboardChildComponent implements OnInit{
  @Input() text: string = '';
  @Output() textChange = new EventEmitter<string>();

  ngOnchanges(changes: SimpleChanges): void {
    console.log('se cambio el dashboard child', changes)
  }

  ngOnInit(): void {
      console.log('se inicializa el dashChild')
  }

  handleClick() {
    this.text = 'Label Sent to printer'
    this.textChange.emit(this.text);
    this.printBarcode("0123456789")
  }


  printBarcode = async (serial: any) => {
    try {
        const browserPrint =  new ZebraBrowserPrintWrapper(); // Create a new instance of the object
        const defaultPrinter =  await browserPrint.getDefaultPrinter(); // Select default printer
        browserPrint.setPrinter(defaultPrinter); // Set the printer
        const printerStatus = await browserPrint.checkPrinterStatus();         // Check printer status

        if(printerStatus.isReadyToPrint) {
          // ZPL script to print a simple barcode
          const zpl = `^XA
                      ^BY2,2,100
                      ^FO20,20^BC^FD${serial}^FS
                      ^XZ`;

          browserPrint.print(zpl);
        } else {
          console.log("Error/s", printerStatus.errors);
        }

    } catch (e) {
        console.log(e);
        this.text = 'Error while printing';
        this.textChange.emit(this.text);
    }
  };

}


printBarcode = async (serial: any) => {
  try {
      const browserPrint = new ZebraBrowserPrintWrapper(); // Create wrapper instance
      const defaultPrinter = await browserPrint.getDefaultPrinter(); // Get default printer
      browserPrint.setPrinter(defaultPrinter); // Set printer

      console.log("Default Printer:", defaultPrinter);
      
      const printerStatus = await browserPrint.checkPrinterStatus(); // Check status
      console.log("Printer Status:", printerStatus);

      if (printerStatus.isReadyToPrint) {
          const zpl = `^XA
                       ^BY2,2,100
                       ^FO20,20^BC^FD${serial}^FS
                       ^XZ`;

          console.log("Sending ZPL to printer:", zpl);
          browserPrint.print(zpl);
      } else {
          console.error("Printer is not ready. Errors:", printerStatus.errors);
      }

  } catch (e: any) {
      console.error("Error while printing:", e.message || e);
      this.text = 'Error while printing';
      this.textChange.emit(this.text);
  }
};

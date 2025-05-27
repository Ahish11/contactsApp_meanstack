import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-datatable',
  standalone: true,
  imports: [],
  templateUrl: './datatable.component.html',
  styleUrl: './datatable.component.scss',
})
export class DatatableComponent {
  @Input() data: any[] = [];
  rowdata: { [key: string]: any }[] = [];
  headerData: string[] = [];

  ngOnInit(): void {
    if (this.data?.length !== 0 && this.data != undefined) {
      this.rowdata = this.data;
      console.log(this.data, 'datatable');
      this.headerData = this.dataKeys;
    } else {
      this.headerData = this.dataKeys;
    }
  }
  get dataKeys() {
    return this.data?.length ? Object.keys(this.data[0]) : [];
  }

  search(event: Event) {
    const searchVal = (event.target as HTMLInputElement).value.toLowerCase();
    this.rowdata = this.data.filter((item: any) => {
      return Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchVal)
      );
    });
  }
}

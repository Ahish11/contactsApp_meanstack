import { CommonModule } from "@angular/common";
import {
  Component,
  ContentChild,
  ElementRef,
  Input,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from "@angular/core";

@Component({
  selector: "app-datatable",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./datatable.component.html",
  styleUrl: "./datatable.component.scss",
})
export class DatatableComponent {
  @Input() data: any[] = [];
  @Input() searchbar: boolean = true;
  @ContentChild("actions") actionTemplateRef?: TemplateRef<any>;
  @ViewChild("searchInput", { static: false }) searchInput!: ElementRef<HTMLInputElement>;
  private searchTimeout: any;
  searchVal: string = "";

  rowdata: { [key: string]: any }[] = [];
  allData: any[] = [];
  headerData: string[] = [];
  totalRowData: number = 0;
  selectedLimit = 10;
  pageSplit: number = 0;
  currentPage: number = 1;
  endIndex!: number;
  startIndex!: number;
  visiblePages: number[] = [];
  windowSize = 5; // Number of visible page numbers
  disableLastpage: boolean = false;
  disableFirstpage: boolean = false;

  ngOnInit(): void {
    if (this.data?.length !== 0 && this.data != undefined) {
      this.rowdata = this.data;
      this.allData = this.data;
      this.headerData = this.dataKeys;
      this.totalRowData = this.allData?.length;
      this.paginationHandler();
      // this.updateVisiblePages();
      this.limitFn(1);
      // console.log(this.pageSplitList, "pagesplit");
    } else {
      this.headerData = this.dataKeys;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["data"] && changes["data"].currentValue) {
      this.rowdata = this.data;
      this.allData = this.data;
      this.totalRowData = this.allData?.length;
      this.paginationHandler();
      this.updateVisiblePages();
      this.limitFn(1);
      console.log(changes, "onchanges");
      this.searchVal = "";
      if (this.searchInput && this.searchInput.nativeElement) {
        this.searchInput.nativeElement.value = "";
      }
      // this.data = changes["data"].currentValue;
    }
  }

  get dataKeys() {
    return this.rowdata?.length ? Object.keys(this.rowdata[0]) : [];
  }

  limitFn(page: number) {
    this.startIndex = (page - 1) * this.selectedLimit;
    this.endIndex = page * this.selectedLimit;
    this.rowdata = this.allData?.slice(this.startIndex, this.endIndex);
    this.currentPage = page;
    this.updateVisiblePages();

    if (this.currentPage === 1) {
      this.disableFirstpage = true;
    } else {
      this.disableFirstpage = false;
    }
    if (this.currentPage === this.pageSplitList.length) {
      this.disableLastpage = true;
    } else {
      this.disableLastpage = false;
    }
  }

  toNext() {
    if (this.currentPage < this.pageSplit) {
      this.currentPage++;
      this.limitFn(this.currentPage);
    }
  }

  toPrev() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.limitFn(this.currentPage);
    }
  }

  updateVisiblePages() {
    const halfWindow = Math.floor(this.windowSize / 2); //middle
    let start = Math.max(1, this.currentPage - halfWindow);
    let end = Math.min(this.pageSplit, start + this.windowSize - 1);
    // Adjust start if we're at the end
    if (end === this.pageSplit) {
      start = Math.max(1, end - this.windowSize + 1);
    }
    this.visiblePages = Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }
  search(event: Event) {
    clearTimeout(this.searchTimeout);
    this.searchVal = (event.target as HTMLInputElement).value.toLowerCase();
    this.searchTimeout = setTimeout(() => {
      this.rowdata = this.data.filter((item: any) => {
        return Object.values(item).some(value =>
          String(value).toLowerCase().includes(this.searchVal)
        );
      });
      console.log(this.rowdata, "searchList");
      this.allData = this.rowdata;
      this.totalRowData = this.allData?.length;
      this.limitFn(1);
      this.paginationHandler();
      this.updateVisiblePages();
    }, 300); // 300ms debounce
  }

  onLimitChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedLimit = Number(target.value);
    this.currentPage = 1;
    this.paginationHandler();
    this.updateVisiblePages();
    this.limitFn(this.currentPage);
    console.log(this.pageSplitList, "getpageSplitList");
  }

  get pageSplitList() {
    return Array.from({ length: this.pageSplit }, (_, i) => i + 1);
    // return [...Array(this.pageSplit)].map((_, i) => i + 1)
  }

  paginationHandler() {
    this.pageSplit = Math.ceil(this.totalRowData / this.selectedLimit);
    console.log(this.pageSplit, "this.pageSplit");
  }

  goLast() {
    this.limitFn(this.pageSplitList.length);
  }
  goFirst() {
    this.limitFn(1);
  }
  jumpToHandler(event: any) {}
}

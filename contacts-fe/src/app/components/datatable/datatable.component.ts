import { CommonModule } from "@angular/common";
import {
  Component,
  ContentChild,
  ElementRef,
  Input,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  HostListener,
  OnInit,
  OnChanges,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SkeletonTableComponent } from "../common/skeleton-table/skeleton-table.component";

@Component({
  selector: "app-datatable",
  standalone: true,
  imports: [CommonModule, FormsModule, SkeletonTableComponent],
  templateUrl: "./datatable.component.html",
  styleUrl: "./datatable.component.scss",
})
export class DatatableComponent implements OnInit, OnChanges {
  @Input() data: any[] = [];
  @Input() searchbar: boolean = true;
  @Input() isLoading: boolean = true;
  @ContentChild("actions") actionTemplateRef?: TemplateRef<any>;
  @ViewChild("searchInput", { static: false }) searchInput!: ElementRef<HTMLInputElement>;

  private searchTimeout: any;
  searchVal: string = "";

  // Data state
  rowdata: { [key: string]: any }[] = []; // Currently visible page data
  filteredData: any[] = []; // Data after ALL filters and sorts are applied (before pagination)
  headerData: string[] = [];

  // Pagination state
  totalRowData: number = 0;
  selectedLimit = 10;
  pageSplit: number = 0;
  currentPage: number = 1;
  endIndex!: number;
  startIndex!: number;
  visiblePages: number[] = [];
  windowSize = 5;
  disableLastpage: boolean = false;
  disableFirstpage: boolean = false;

  // --- Sorting State ---
  sortColumn: string | null = null;
  sortDirection: "asc" | "desc" = "asc";

  // --- Filter State ---
  activeDropdownColumn: string | null = null;
  distinctValues: { [key: string]: string[] } = {};
  activeFilters: { [key: string]: Set<string> } = {};
  filterSearchText: { [key: string]: string } = {};
  hasLoaded = false;

  // Close dropdown when clicking outside
  @HostListener("document:click", ["$event"])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    // If the click is not inside a filter dropdown or the filter icon button, close the active dropdown.
    if (!target.closest(".custom-filter-dropdown") && !target.closest(".filter-icon-btn")) {
      this.activeDropdownColumn = null;
    }
  }

  ngOnInit(): void {
    if (this.data && this.data.length > 0) {
      this.initializeData();
    } else {
      this.headerData = this.dataKeys;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["data"] && changes["data"].currentValue) {
      if (!changes["data"].firstChange) {
        // Maintain state if possible, or reset
        this.resetFiltersAndSort();
      }
      this.initializeData();

      if (this.searchInput && this.searchInput.nativeElement) {
        this.searchInput.nativeElement.value = "";
      }
    }
    if (
      changes["isLoading"] &&
      changes["isLoading"].previousValue === true &&
      changes["isLoading"].currentValue === false
    ) {
      this.hasLoaded = true;
    }
  }

  private initializeData(): void {
    this.headerData = this.dataKeys;
    this.extractDistinctValues();
    this.applyAllFiltersAndSort();
  }

  get dataKeys() {
    return this.data?.length ? Object.keys(this.data[0]) : [];
  }

  // --- Sorting Logic ---
  onSort(column: string) {
    if (this.sortColumn === column) {
      // Toggle direction or remove sort
      if (this.sortDirection === "asc") {
        this.sortDirection = "desc";
      } else {
        this.sortColumn = null;
        this.sortDirection = "asc";
      }
    } else {
      this.sortColumn = column;
      this.sortDirection = "asc";
    }

    this.applyAllFiltersAndSort();
  }

  // --- Filter Logic ---
  extractDistinctValues() {
    this.distinctValues = {};
    if (!this.data) return;

    this.headerData.forEach(col => {
      if (col !== "_id") {
        const uniqueKeys = new Set(this.data.map(item => String(item[col] || "")));
        // Sort distinct values alphabetically for the dropdown list
        this.distinctValues[col] = Array.from(uniqueKeys).sort((a, b) => a.localeCompare(b));

        // Initialize active filters set if not exists
        if (!this.activeFilters[col]) {
          this.activeFilters[col] = new Set<string>();
        }
        if (!this.filterSearchText[col]) {
          this.filterSearchText[col] = "";
        }
      }
    });
  }

  toggleFilterDropdown(column: string, event: Event) {
    event.stopPropagation(); // Stop click from bubbling to document listener
    if (this.activeDropdownColumn === column) {
      this.activeDropdownColumn = null; // Toggle off if clicking the same icon
    } else {
      this.activeDropdownColumn = column;
      this.calculateDropdownPosition(event as MouseEvent);
    }
  }

  dropdownStyles: any = {};

  calculateDropdownPosition(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    if (!target) return;
    const rect = target.getBoundingClientRect();

    let styles: any = {};
    const dropdownWidth = 260; // Approximate dropdown width
    const dropdownHeight = 320; // Approximate dropdown height

    // Horizontal positioning
    if (rect.left + dropdownWidth > window.innerWidth) {
      styles["right"] = `${window.innerWidth - rect.right}px`;
      styles["left"] = "auto";
    } else {
      styles["left"] = `${rect.left}px`;
      styles["right"] = "auto";
    }

    // Vertical positioning
    if (rect.bottom + dropdownHeight > window.innerHeight && rect.top > dropdownHeight) {
      styles["bottom"] = `${window.innerHeight - rect.top + 8}px`;
      styles["top"] = "auto";
    } else {
      styles["top"] = `${rect.bottom + 8}px`;
      styles["bottom"] = "auto";
    }

    this.dropdownStyles = styles;
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  getFilteredDistinctValues(column: string): string[] {
    const searchText = (this.filterSearchText[column] || "").toLowerCase();
    const values = this.distinctValues[column] || [];
    if (!searchText) return values;
    return values.filter(v => v.toLowerCase().includes(searchText));
  }

  isFilterActive(column: string): boolean {
    return this.activeFilters[column] && this.activeFilters[column].size > 0;
  }

  isAllSelected(column: string): boolean {
    const visibleValues = this.getFilteredDistinctValues(column);
    if (!visibleValues.length) return false;
    // Check if every visible value is in the active filters set
    return visibleValues.every(val => this.activeFilters[column].has(val));
  }

  toggleAllFilter(column: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    const visibleValues = this.getFilteredDistinctValues(column);

    if (isChecked) {
      visibleValues.forEach(val => this.activeFilters[column].add(val));
    } else {
      visibleValues.forEach(val => this.activeFilters[column].delete(val));
    }
    this.applyAllFiltersAndSort();
  }

  toggleFilterValue(column: string, value: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.activeFilters[column].add(value);
    } else {
      this.activeFilters[column].delete(value);
    }
    this.applyAllFiltersAndSort();
  }

  clearFilter(column: string) {
    this.activeFilters[column].clear();
    this.filterSearchText[column] = "";
    this.applyAllFiltersAndSort();
  }

  // --- Central Data Processing Pipeline ---

  search(event: Event) {
    clearTimeout(this.searchTimeout);
    this.searchVal = (event.target as HTMLInputElement).value.toLowerCase();
    this.searchTimeout = setTimeout(() => {
      this.applyAllFiltersAndSort();
    }, 300); // 300ms debounce
  }

  resetFiltersAndSort() {
    this.searchVal = "";
    this.sortColumn = null;
    this.activeDropdownColumn = null;
    this.activeFilters = {};
    this.filterSearchText = {};
  }

  applyAllFiltersAndSort() {
    if (!this.data) return;

    let resultData = [...this.data];

    // 1. Global Search
    if (this.searchVal) {
      resultData = resultData.filter((item: any) => {
        return Object.values(item).some(value =>
          String(value || "")
            .toLowerCase()
            .includes(this.searchVal)
        );
      });
    }

    // 2. Set Filtering (Column constraints)
    this.headerData.forEach(col => {
      if (this.isFilterActive(col)) {
        resultData = resultData.filter(item => {
          const itemValue = String(item[col] || "");
          return this.activeFilters[col].has(itemValue);
        });
      }
    });

    // 3. Sorting
    if (this.sortColumn) {
      const col = this.sortColumn;
      const dirMult = this.sortDirection === "asc" ? 1 : -1;

      resultData.sort((a, b) => {
        const valA = String(a[col] || "").toLowerCase();
        const valB = String(b[col] || "").toLowerCase();
        if (valA < valB) return -1 * dirMult;
        if (valA > valB) return 1 * dirMult;
        return 0;
      });
    }

    // Finalize Array and trigger pagination
    this.filteredData = resultData;
    this.totalRowData = this.filteredData.length;
    this.currentPage = 1; // Reset to page 1 on filter/sort change
    this.paginationHandler();
    this.limitFn(this.currentPage);
  }

  // --- Pagination Logic ---

  limitFn(page: number) {
    this.startIndex = (page - 1) * this.selectedLimit;
    this.endIndex = Math.min(page * this.selectedLimit, this.totalRowData);
    this.rowdata = this.filteredData.slice(this.startIndex, this.endIndex);
    this.currentPage = page;
    this.updateVisiblePages();

    this.disableFirstpage = this.currentPage === 1 || this.totalRowData === 0;
    this.disableLastpage = this.currentPage === this.pageSplit || this.totalRowData === 0;
  }

  onLimitChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedLimit = Number(target.value);
    this.currentPage = 1;
    this.paginationHandler();
    this.limitFn(this.currentPage);
  }

  paginationHandler() {
    this.pageSplit = Math.ceil(this.totalRowData / this.selectedLimit);
  }

  updateVisiblePages() {
    const halfWindow = Math.floor(this.windowSize / 2); //middle
    let start = Math.max(1, this.currentPage - halfWindow);
    let end = Math.min(this.pageSplit, start + this.windowSize - 1);

    // Adjust start if we're at the end
    if (end === this.pageSplit) {
      start = Math.max(1, end - this.windowSize + 1);
    }

    if (this.pageSplit === 0) {
      this.visiblePages = [];
    } else {
      this.visiblePages = Array.from({ length: end - start + 1 }, (_, i) => start + i);
    }
  }

  get pageSplitList() {
    return Array.from({ length: this.pageSplit }, (_, i) => i + 1);
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

  goFirst() {
    if (this.currentPage > 1) {
      this.limitFn(1);
    }
  }

  goLast() {
    if (this.currentPage < this.pageSplit) {
      this.limitFn(this.pageSplit);
    }
  }
}
